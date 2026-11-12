/*
 * Classify public type changes against the base branch as breaking, possibly
 * breaking or additive. Advisory: CI runs it on pull requests next to
 * `api:check` and it always exits 0, reporting through GitHub annotations, the
 * job summary and a sticky PR comment instead of failing.
 *
 * Usage:
 *   tsx scripts/api-compat.ts [--base <ref>] [--head <ref>] [--json]
 *   tsx scripts/api-compat.ts --base-dir <dir> --head-dir <dir> [--json]
 *
 *   --base      Ref to compare against (default: `origin/$BASE_REF`, else
 *               `origin/master`). With no `--head`, compares the merge base
 *               with the working tree.
 *   --head      Compare against this ref instead of the working tree.
 *   --base-dir / --head-dir
 *               Already-emitted declaration trees (skips git and tsc). Used by
 *               the tests.
 *   --json      Print the findings as JSON instead of text.
 *
 * Both sides' declarations are emitted with `tsconfig.dts.json`. Every public
 * declaration file (see `api-declarations.ts`) is an entry point. For each
 * export both sides share, a generated probe file asks the checker:
 *
 *   - values (components, functions, constants): do the new types still accept
 *     old usage? Old props/first argument must be assignable to the new one,
 *     and the new value must be assignable to the old value's type.
 *   - types and interfaces: are old values assignable to the new type, and new
 *     values to the old type?
 *
 * plus a property-name diff to catch removed props (assignability alone allows
 * extra properties, but JSX rejects them). Removed exports and entry points
 * are breaking.
 */
import { execFileSync, spawnSync } from 'child_process';
import {
	appendFileSync,
	existsSync,
	mkdirSync,
	mkdtempSync,
	readFileSync,
	rmSync,
	writeFileSync,
} from 'fs';
import { tmpdir } from 'os';
import { join } from 'path';
import { fileURLToPath } from 'url';
import ts from 'typescript';
import {
	emitDeclarations,
	isPublic,
	reportFileOf,
	subpath,
	walk,
} from './api-declarations';

type Verdict = 'breaking' | 'possibly-breaking' | 'additive';

interface Finding {
	verdict: Verdict;
	/** Import path, e.g. `components/checkbox`. */
	entry: string;
	/** Export name, or `*` for the entry point itself. */
	symbol: string;
	/** Declared name, when it differs from the export name (`default`). */
	name?: string;
	/** Declaration identity, so re-exports of one declaration report once. */
	id?: string;
	/** Import path of the file that declares it. */
	declaredAt?: string;
	reason: string;
	/** Full checker message, when there is one. */
	detail?: string;
	/** Declared in a file compiled from JS, so its types are inferred. */
	lowConfidence?: boolean;
	/** Other entry points that export the same declaration. */
	alsoIn: string[];
	/** Where to annotate: a file under `api/` and a line in it. */
	file: string;
	line: number;
}

const root = fileURLToPath(new URL('..', import.meta.url));
const MARKER = '<!-- api-compat -->';
const ANNOTATION_LIMIT = 10;
const RANK: Record<Verdict, number> = {
	breaking: 0,
	'possibly-breaking': 1,
	additive: 2,
};
const TITLE: Record<Verdict, string> = {
	breaking: 'Breaking type change',
	'possibly-breaking': 'Possibly breaking type change',
	additive: 'Additive type change',
};

const args = process.argv.slice(2);
const option = (name: string): string | undefined => {
	const index = args.indexOf(name);
	return index === -1 ? undefined : args[index + 1];
};

const git = (...a: string[]): string =>
	execFileSync('git', a, { cwd: root, encoding: 'utf8' }).trim();

// --- Declarations ------------------------------------------------------------

/** Extract `ref`'s sources into `dir` (inside the repo, so node_modules resolves). */
const extract = (ref: string, dir: string): void => {
	mkdirSync(dir, { recursive: true });
	const tar = spawnSync('git', ['archive', '--format=tar', ref], {
		cwd: root,
		maxBuffer: 1024 * 1024 * 1024,
	});
	if (tar.status !== 0) throw new Error(`git archive ${ref} failed`);
	execFileSync('tar', ['-x', '-C', dir], { input: tar.stdout });
};

const emitOrThrow = (project: string, outDir: string): void => {
	if (!emitDeclarations(project, outDir)) {
		throw new Error(`declaration emit failed for ${project}`);
	}
};

const publicFiles = (dir: string): string[] =>
	walk(dir).filter((f) => f.endsWith('.d.ts') && isPublic(f));

/** Was this declaration compiled from a JS source (inferred, loose types)? */
const fromJs = (sourceRoot: string | undefined, file: string): boolean =>
	!!sourceRoot &&
	['.js', '.jsx'].some((ext) =>
		existsSync(join(sourceRoot, file.replace(/\.d\.ts$/, ext)))
	);

// --- Comparison --------------------------------------------------------------

const compilerOptions: ts.CompilerOptions = {
	target: ts.ScriptTarget.ES2022,
	module: ts.ModuleKind.ESNext,
	moduleResolution: ts.ModuleResolutionKind.Bundler,
	jsx: ts.JsxEmit.ReactJSX,
	strict: true,
	skipLibCheck: true,
	noEmit: true,
	types: [],
};

interface ExportInfo {
	isValue: boolean;
	callable: boolean;
	/** `<any, …>` when the type needs explicit type arguments. */
	typeArgs: string;
	/** Declaration file (relative to its tree) and name, to dedupe re-exports. */
	file: string;
	id: string;
	/** Declared name, e.g. `Checkbox` for a `default` export. */
	name: string;
}

const declaredIn = (dir: string, symbol: ts.Symbol): string | undefined => {
	const file = symbol.declarations?.[0]?.getSourceFile().fileName;
	return file?.startsWith(dir) ? file.slice(dir.length + 1) : undefined;
};

const exportsOf = (
	checker: ts.TypeChecker,
	program: ts.Program,
	dir: string,
	file: string
): Map<string, ExportInfo> => {
	const result = new Map<string, ExportInfo>();
	const source = program.getSourceFile(join(dir, file));
	const moduleSymbol = source && checker.getSymbolAtLocation(source);
	if (!moduleSymbol) return result;
	for (const symbol of checker.getExportsOfModule(moduleSymbol)) {
		const target =
			symbol.flags & ts.SymbolFlags.Alias
				? checker.getAliasedSymbol(symbol)
				: symbol;
		if (!target.declarations?.length) continue;
		const isValue = !!(target.flags & ts.SymbolFlags.Value);
		const type = isValue ? checker.getTypeOfSymbol(target) : undefined;
		const callable =
			!!type &&
			(type.getCallSignatures().length > 0 ||
				type.getConstructSignatures().length > 0);
		const params = target.declarations.flatMap((d) =>
			ts.isInterfaceDeclaration(d) ||
			ts.isTypeAliasDeclaration(d) ||
			ts.isClassDeclaration(d)
				? [...(d.typeParameters ?? [])]
				: []
		);
		const declFile = declaredIn(dir, target) ?? file;
		result.set(symbol.getName(), {
			isValue,
			callable,
			typeArgs:
				!isValue && params.some((p) => !p.default)
					? `<${params.map(() => 'any').join(', ')}>`
					: '',
			file: declFile,
			id: `${declFile}#${target.getName()}`,
			name: target.getName(),
		});
	}
	return result;
};

/** Property names across a type's union/intersection members, or undefined if open-ended. */
const propNames = (
	checker: ts.TypeChecker,
	type: ts.Type
): Set<string> | undefined => {
	if (type.flags & ts.TypeFlags.Any) return undefined;
	if (type.isUnion() || type.isIntersection()) {
		const names = new Set<string>();
		for (const member of type.types) {
			const memberNames = propNames(checker, member);
			if (member.flags & ts.TypeFlags.Object && !memberNames) return undefined;
			memberNames?.forEach((n) => names.add(n));
		}
		return names;
	}
	if (!(type.flags & ts.TypeFlags.Object)) return undefined;
	// `[key: string]` accepts any prop name, so a removed prop still compiles
	// and the name diff would be noise. Pattern indexes such as
	// `[key: `aria-${string}`]` only accept matching names, so removing
	// `requestFocus` is still a JSX error.
	if (
		checker
			.getIndexInfosOfType(type)
			.some((info) => info.keyType.flags & ts.TypeFlags.String)
	)
		return undefined;
	return new Set(checker.getPropertiesOfType(type).map((p) => p.getName()));
};

/**
 * Props whose old type no longer fits the new one, or that became required,
 * e.g. `label (now required)`.
 */
const changedProps = (
	checker: ts.TypeChecker,
	oldProps: ts.Type,
	newProps: ts.Type
): string[] => {
	const changed: string[] = [];
	for (const next of checker.getPropertiesOfType(newProps)) {
		const prev = checker.getPropertyOfType(oldProps, next.getName());
		const optional = (p: ts.Symbol) => !!(p.flags & ts.SymbolFlags.Optional);
		if (!prev) {
			if (!optional(next)) changed.push(`${next.getName()} (new, required)`);
		} else if (optional(prev) && !optional(next)) {
			changed.push(`${next.getName()} (now required)`);
		} else if (
			!checker.isTypeAssignableTo(
				checker.getTypeOfSymbol(prev),
				checker.getTypeOfSymbol(next)
			)
		) {
			changed.push(next.getName());
		}
	}
	return changed.sort();
};

const diffNames = (
	before: Set<string> | undefined,
	after: Set<string> | undefined
): { removed: string[]; added: string[] } => {
	if (!before || !after) return { removed: [], added: [] };
	return {
		removed: [...before].filter((n) => !after.has(n)).sort(),
		added: [...after].filter((n) => !before.has(n)).sort(),
	};
};

const list = (names: string[]): string =>
	names
		.slice(0, 8)
		.map((n) => `\`${n}\``)
		.join(', ') + (names.length > 8 ? `, … (${names.length} total)` : '');

interface Check {
	entry: string;
	symbol: string;
	base: ExportInfo;
	head: ExportInfo;
}

const compare = (baseDir: string, headDir: string, sourceRoot?: string) => {
	const baseFiles = publicFiles(baseDir);
	const headFiles = publicFiles(headDir);
	const workDir = mkdtempSync(join(tmpdir(), 'api-compat-probe-'));
	const probePath = join(workDir, 'probe.ts');
	const roots = [
		...baseFiles.map((f) => join(baseDir, f)),
		...headFiles.map((f) => join(headDir, f)),
	];

	try {
		const indexProgram = ts.createProgram(roots, compilerOptions);
		const indexChecker = indexProgram.getTypeChecker();
		const findings: Finding[] = [];
		const checks: Check[] = [];

		const headSet = new Set(headFiles);
		for (const file of baseFiles) {
			const entry = subpath(file);
			const baseExports = exportsOf(indexChecker, indexProgram, baseDir, file);
			if (!headSet.has(file)) {
				findings.push({
					verdict: 'breaking',
					entry,
					symbol: '*',
					reason: 'Import path removed.',
					alsoIn: [],
					file: reportFileOf(file),
					line: 1,
				});
				continue;
			}
			const headExports = exportsOf(indexChecker, indexProgram, headDir, file);
			for (const [name, base] of baseExports) {
				const head = headExports.get(name);
				if (!head) {
					findings.push({
						verdict: 'breaking',
						entry,
						symbol: name,
						reason: 'Export removed.',
						name: base.name,
						id: base.id,
						declaredAt: subpath(base.file),
						alsoIn: [],
						file: reportFileOf(file),
						line: 1,
						lowConfidence: fromJs(sourceRoot, base.file),
					});
				} else if (base.isValue && !head.isValue) {
					findings.push({
						verdict: 'breaking',
						entry,
						symbol: name,
						reason: 'Changed from a value to a type-only export.',
						alsoIn: [],
						file: reportFileOf(head.file),
						line: 1,
					});
				} else {
					checks.push({ entry, symbol: name, base, head });
				}
			}
			for (const name of headExports.keys()) {
				if (!baseExports.has(name)) {
					const head = headExports.get(name)!;
					findings.push({
						verdict: 'additive',
						entry,
						symbol: name,
						reason: 'Export added.',
						name: head.name,
						id: head.id,
						declaredAt: subpath(head.file),
						alsoIn: [],
						file: reportFileOf(head.file),
						line: 1,
					});
				}
			}
		}
		const baseSet = new Set(baseFiles);
		for (const file of headFiles) {
			if (!baseSet.has(file)) {
				findings.push({
					verdict: 'additive',
					entry: subpath(file),
					symbol: '*',
					reason: 'Import path added.',
					alsoIn: [],
					file: reportFileOf(file),
					line: 1,
				});
			}
		}

		// Each check is a few lines of the probe; record which line asks what.
		const lines = [
			'type Props<T> = T extends abstract new (props: infer P, ...rest: any) => any ? P : T extends (props: infer P, ...rest: any) => any ? P : never;',
		];
		const asks = new Map<number, { check: number; ask: string }>();
		const ask = (check: number, name: string, text: string): void => {
			asks.set(lines.length, { check, ask: name });
			lines.push(text);
		};
		checks.forEach((c, i) => {
			const spec = (dir: string, info: ExportInfo, file: string) => {
				const module = `import(${JSON.stringify(join(dir, file.replace(/\.d\.ts$/, '')))})`;
				return info.isValue
					? `typeof ${module}.${c.symbol}`
					: `${module}.${c.symbol}${info.typeArgs}`;
			};
			const entryFile = (dir: string) =>
				[`${c.entry}.d.ts`, `${c.entry}/index.d.ts`].find((f) =>
					existsSync(join(dir, f))
				)!;
			ask(
				i,
				'alias',
				`type __old_${i} = ${spec(baseDir, c.base, entryFile(baseDir))};`
			);
			ask(
				i,
				'alias',
				`type __new_${i} = ${spec(headDir, c.head, entryFile(headDir))};`
			);
			ask(
				i,
				'newToOld',
				`declare const n${i}: __new_${i}; const nx${i}: __old_${i} = n${i};`
			);
			ask(
				i,
				'oldToNew',
				`declare const o${i}: __old_${i}; const ox${i}: __new_${i} = o${i};`
			);
			if (c.base.callable && c.head.callable) {
				ask(
					i,
					'props',
					`declare const p${i}: Props<__old_${i}>; const px${i}: Props<__new_${i}> = p${i};`
				);
			}
		});
		writeFileSync(probePath, lines.join('\n') + '\n');

		const program = ts.createProgram(
			[...roots, probePath],
			compilerOptions,
			undefined,
			indexProgram
		);
		const checker = program.getTypeChecker();
		const probe = program.getSourceFile(probePath)!;
		const failed = new Map<string, string>(); // `${check}:${ask}` -> message
		for (const d of program.getSemanticDiagnostics(probe)) {
			const line = probe.getLineAndCharacterOfPosition(d.start ?? 0).line;
			const entry = asks.get(line);
			if (!entry) continue;
			const key = `${entry.check}:${entry.ask}`;
			if (!failed.has(key)) {
				failed.set(
					key,
					ts
						.flattenDiagnosticMessageText(d.messageText, '\n')
						.split(`import("${baseDir}/`)
						.join('import("old:')
						.split(`import("${headDir}/`)
						.join('import("new:')
						.replace(/import\("(old|new):[^"]*"\)\./g, '$1 ')
						// tsc truncates long types, sometimes mid-path.
						.replace(/import\("[^"']*\.\.\./g, '...')
						.replace(/__old_\d+/g, 'old type')
						.replace(/__new_\d+/g, 'new type')
						.replace(/Props<old type>/g, 'old props')
						.replace(/Props<new type>/g, 'new props')
				);
			}
		}

		const aliasTypes = new Map<string, ts.Type>();
		for (const statement of probe.statements) {
			if (ts.isTypeAliasDeclaration(statement)) {
				aliasTypes.set(
					statement.name.text,
					checker.getTypeAtLocation(statement.name)
				);
			}
		}
		const firstParam = (type: ts.Type): ts.Type | undefined => {
			const signature = [
				...type.getCallSignatures(),
				...type.getConstructSignatures(),
			][0];
			const param = signature?.getParameters()[0];
			return param && checker.getTypeOfSymbol(param);
		};

		let uncompared = 0;
		checks.forEach((c, i) => {
			if (failed.has(`${i}:alias`)) {
				uncompared++;
				return;
			}
			const oldType = aliasTypes.get(`__old_${i}`)!;
			const newType = aliasTypes.get(`__new_${i}`)!;
			if (
				oldType.flags & ts.TypeFlags.Any ||
				newType.flags & ts.TypeFlags.Any
			) {
				return;
			}
			const newToOld = failed.get(`${i}:newToOld`);
			const oldToNew = failed.get(`${i}:oldToNew`);
			const props = failed.get(`${i}:props`);
			const base = {
				entry: c.entry,
				symbol: c.symbol,
				name: c.head.name,
				id: c.head.id,
				declaredAt: subpath(c.head.file),
				alsoIn: [],
				file: reportFileOf(c.head.file),
				line: 1,
				lowConfidence:
					fromJs(sourceRoot, c.head.file) || fromJs(sourceRoot, c.base.file),
			};
			let finding: Omit<Finding, 'alsoIn' | 'file' | 'line'> | undefined;

			if (c.head.isValue) {
				const oldProps = c.head.callable ? firstParam(oldType) : undefined;
				const newProps = c.head.callable ? firstParam(newType) : undefined;
				const names = c.head.callable
					? diffNames(
							oldProps && propNames(checker, oldProps),
							newProps && propNames(checker, newProps)
						)
					: { removed: [], added: [] };
				if (props) {
					const changed =
						oldProps && newProps
							? changedProps(checker, oldProps, newProps)
							: [];
					finding = {
						...base,
						verdict: 'breaking',
						reason:
							(changed.length
								? `Incompatible props: ${list(changed)}`
								: 'Old props/arguments are no longer accepted') +
							(names.removed.length
								? `; removed: ${list(names.removed)}`
								: '') +
							'.',
						detail: props,
					};
				} else if (names.removed.length) {
					finding = {
						...base,
						verdict: 'breaking',
						reason: `Removed ${c.head.callable ? 'props' : 'properties'}: ${list(names.removed)}.`,
					};
				} else if (newToOld) {
					finding = {
						...base,
						verdict: 'breaking',
						reason: 'The new type is not compatible with the old one.',
						detail: newToOld,
					};
				} else if (names.added.length) {
					finding = {
						...base,
						verdict: 'additive',
						reason: `Added props: ${list(names.added)}.`,
					};
				} else if (oldToNew) {
					finding = {
						...base,
						verdict: 'additive',
						reason: 'Accepts more than before (widened).',
						detail: oldToNew,
					};
				}
			} else {
				const names = diffNames(
					propNames(checker, oldType),
					propNames(checker, newType)
				);
				if (newToOld && oldToNew) {
					finding = {
						...base,
						verdict: 'breaking',
						reason: 'Incompatible in both directions.',
						detail: oldToNew,
					};
				} else if (oldToNew || names.removed.length) {
					finding = {
						...base,
						verdict: 'possibly-breaking',
						reason:
							(names.removed.length
								? `Removed properties: ${list(names.removed)}. `
								: '') +
							'Narrowed: old values no longer fit, which breaks consumers who create values of this type.',
						detail: oldToNew,
					};
				} else if (newToOld) {
					finding = {
						...base,
						verdict: 'possibly-breaking',
						reason:
							'Widened: new values may not fit the old type, which breaks consumers who read values of this type.',
						detail: newToOld,
					};
				} else if (names.added.length) {
					finding = {
						...base,
						verdict: 'additive',
						reason: `Added properties: ${list(names.added)}.`,
					};
				}
			}
			if (finding)
				findings.push({ ...finding, alsoIn: [], file: base.file, line: 1 });
		});

		return { findings: dedupe(findings), uncompared };
	} finally {
		rmSync(workDir, { recursive: true, force: true });
	}
};

/** One finding per declaration: index re-exports repeat the same change. */
const dedupe = (findings: Finding[]): Finding[] => {
	// Prefer the declaring file's own import path, then the shortest.
	const rank = (f: Finding): number =>
		(f.declaredAt === f.entry ? 0 : 1000) + f.entry.length;
	const byKey = new Map<string, Finding>();
	for (const f of findings) {
		const key = f.id ? `${f.id}|${f.verdict}` : `${f.entry}#${f.symbol}`;
		const existing = byKey.get(key);
		if (!existing) {
			byKey.set(key, { ...f, alsoIn: [] });
		} else if (rank(f) < rank(existing)) {
			byKey.set(key, { ...f, alsoIn: [...existing.alsoIn, existing.entry] });
		} else {
			existing.alsoIn.push(f.entry);
		}
	}
	return [...byKey.values()]
		.map((f) => ({
			...f,
			alsoIn: [...new Set(f.alsoIn)].filter((e) => e !== f.entry).sort(),
		}))
		.sort(
			(a, b) =>
				RANK[a.verdict] - RANK[b.verdict] ||
				a.entry.localeCompare(b.entry) ||
				a.symbol.localeCompare(b.symbol)
		);
};

/** Point each finding at its declaration's line in the committed `api/` snapshot. */
const locate = (findings: Finding[], apiRoot: string): void => {
	for (const f of findings) {
		const path = join(apiRoot, 'api', f.file);
		if (!existsSync(path) || f.symbol === '*') continue;
		const lines = readFileSync(path, 'utf8').split('\n');
		const name = f.name ?? f.symbol;
		const declaration = new RegExp(
			`\\b(interface|type|class|function|const|let|var|enum)\\s+${name.replace(/\$/g, '\\$')}(?![\\w$])`
		);
		const index = lines.findIndex((l) => declaration.test(l));
		if (index !== -1) f.line = index + 1;
	}
};

// --- Commits -----------------------------------------------------------------

const BREAKING_MARK = /^\w+(\([^)]*\))?!:|^BREAKING[ -]CHANGE:/m;

const markedBreaking = (base: string, head: string): boolean => {
	const messages = git('log', `${base}..${head}`, '--format=%B');
	return (
		BREAKING_MARK.test(messages) ||
		BREAKING_MARK.test(process.env.PR_TITLE ?? '')
	);
};

// --- Reporting ---------------------------------------------------------------

const escapeAnnotation = (text: string): string =>
	text.replace(/%/g, '%25').replace(/\r/g, '%0D').replace(/\n/g, '%0A');
const escapeProperty = (text: string): string =>
	escapeAnnotation(text).replace(/:/g, '%3A').replace(/,/g, '%2C');

/** GitHub workflow commands; capped per level to stay under GitHub's limits. */
const annotations = (findings: Finding[], extra: string[] = []): string[] => {
	const out = extra.map(
		(message) => `::warning title=api-compat::${escapeAnnotation(message)}`
	);
	const warn = findings.filter((f) => f.verdict !== 'additive');
	const notice = findings.filter((f) => f.verdict === 'additive');
	const command = (level: string, f: Finding) =>
		`::${level} file=${escapeProperty(`api/${f.file}`)},line=${f.line},title=${escapeProperty(
			`${TITLE[f.verdict]}: ${f.entry}${f.symbol === '*' ? '' : ` → ${f.symbol}`}`
		)}::${escapeAnnotation(f.reason + (f.detail ? `\n${f.detail}` : ''))}`;
	out.push(
		...warn
			.slice(0, Math.max(0, ANNOTATION_LIMIT - out.length))
			.map((f) => command('warning', f))
	);
	out.push(
		...notice.slice(0, ANNOTATION_LIMIT).map((f) => command('notice', f))
	);
	return out;
};

const cell = (text: string): string =>
	text.replace(/\|/g, '\\|').replace(/\n/g, ' ');

/** GitHub rejects comment bodies over 65,536 characters. */
const COMMENT_LIMIT = 60000;

const markdown = (
	findings: Finding[],
	warnings: string[],
	uncompared: number,
	base: string,
	limit = Infinity,
	runUrl?: string
): string => {
	const counts = (['breaking', 'possibly-breaking', 'additive'] as Verdict[])
		.map((v) => `${findings.filter((f) => f.verdict === v).length} ${v}`)
		.join(', ');
	const out = [MARKER, '### Public type changes', ''];
	if (!findings.length) {
		out.push(`No public type changes compared with \`${base}\`.`);
		return out.join('\n');
	}
	out.push(
		`Compared with \`${base}\`: ${counts}. Advisory only; review the \`api/\` diff.`,
		''
	);
	for (const w of warnings) out.push(`> [!WARNING]\n> ${w}`, '');
	out.push('| | Import path | Export | Change |', '|---|---|---|---|');
	const icon: Record<Verdict, string> = {
		breaking: '🔴',
		'possibly-breaking': '🟠',
		additive: '🟢',
	};
	for (const f of findings) {
		const n = f.alsoIn.length;
		const also = n ? ` (+${n} re-export${n === 1 ? '' : 's'})` : '';
		const low = f.lowConfidence ? ' _(inferred from JS)_' : '';
		out.push(
			`| ${icon[f.verdict]} | \`${f.entry}\`${also} | ${f.symbol === '*' ? '' : `\`${f.symbol}\``} | ${cell(f.reason)}${low} |`
		);
	}
	const footer = [''];
	if (uncompared) {
		footer.push(`${uncompared} export(s) could not be compared.`, '');
	}
	footer.push(
		"_Types can't show everything in the [Breaking-Change Taxonomy](../blob/master/docs/codebase-overview.md#breaking-change-taxonomy): new defaults that change rendered output and removed styling hooks need review by hand._"
	);
	const details = findings.filter((f) => f.detail);
	const detailLines = details.length
		? [
				'',
				'<details><summary>Checker messages</summary>',
				'',
				...details.flatMap((f) => [
					`**\`${f.entry}\` → \`${f.symbol}\`**`,
					'',
					'```',
					f.detail!,
					'```',
					'',
				]),
				'</details>',
			]
		: [];
	const full = [...out, ...detailLines, ...footer].join('\n');
	if (full.length <= limit) return full;
	// Too long for a PR comment: drop the checker messages, then table rows.
	const more = runUrl ? `[the job summary](${runUrl})` : 'the job summary';
	const note = ['', `_Truncated; the full report is in ${more}._`];
	while ([...out, ...note, ...footer].join('\n').length > limit) {
		out.pop();
	}
	return [...out, ...note, ...footer].join('\n');
};

/** Create or update the single PR comment carrying MARKER. */
const comment = (body: string, hasFindings: boolean): void => {
	const repo = process.env.GITHUB_REPOSITORY;
	const pr = process.env.PR_NUMBER;
	if (!repo || !pr || process.env.API_COMPAT_COMMENT !== '1') return;
	const gh = (...a: string[]) =>
		execFileSync('gh', a, { encoding: 'utf8', input: '' }).trim();
	const existing = gh(
		'api',
		'--paginate',
		`repos/${repo}/issues/${pr}/comments`,
		'--jq',
		`.[] | select(.body | contains("${MARKER}")) | .id`
	)
		.split('\n')
		.filter(Boolean)[0];
	if (existing) {
		gh(
			'api',
			'-X',
			'PATCH',
			`repos/${repo}/issues/comments/${existing}`,
			'-f',
			`body=${body}`
		);
	} else if (hasFindings) {
		gh(
			'api',
			'-X',
			'POST',
			`repos/${repo}/issues/${pr}/comments`,
			'-f',
			`body=${body}`
		);
	}
};

// --- Main --------------------------------------------------------------------

/* eslint-disable no-console */
const main = (): void => {
	const json = args.includes('--json');
	const baseDirArg = option('--base-dir');
	const headDirArg = option('--head-dir');
	let result: ReturnType<typeof compare>;
	let baseLabel: string;
	const warnings: string[] = [];
	let baseRef: string | undefined;
	let headRef = 'HEAD';

	if (baseDirArg && headDirArg) {
		result = compare(baseDirArg, headDirArg);
		baseLabel = baseDirArg;
	} else {
		const requested =
			option('--base') ?? `origin/${process.env.BASE_REF || 'master'}`;
		headRef = option('--head') ?? 'HEAD';
		baseRef = git('merge-base', requested, headRef);
		baseLabel = `${requested} (${baseRef.slice(0, 9)})`;
		const work = join(root, '.tmp-api-compat');
		rmSync(work, { recursive: true, force: true });
		try {
			extract(baseRef, join(work, 'base-src'));
			emitOrThrow(join(work, 'base-src'), join(work, 'base'));
			let headSource = root;
			if (option('--head')) {
				headSource = join(work, 'head-src');
				extract(headRef, headSource);
			}
			emitOrThrow(headSource, join(work, 'head'));
			result = compare(join(work, 'base'), join(work, 'head'), headSource);
		} finally {
			rmSync(work, { recursive: true, force: true });
		}
	}

	const { findings, uncompared } = result;
	locate(findings, root);
	if (
		baseRef &&
		findings.some((f) => f.verdict === 'breaking') &&
		!markedBreaking(baseRef, headRef)
	) {
		warnings.push(
			'Breaking type change without `!` or a `BREAKING CHANGE:` footer in the commits or PR title.'
		);
	}

	if (json) {
		console.log(JSON.stringify({ findings, warnings, uncompared }, null, 2));
		return;
	}
	const runUrl =
		process.env.GITHUB_SERVER_URL &&
		`${process.env.GITHUB_SERVER_URL}/${process.env.GITHUB_REPOSITORY}/actions/runs/${process.env.GITHUB_RUN_ID}`;
	const body = markdown(findings, warnings, uncompared, baseLabel);
	if (process.env.GITHUB_ACTIONS) {
		for (const line of annotations(findings, warnings)) console.log(line);
		if (process.env.GITHUB_STEP_SUMMARY) {
			appendFileSync(process.env.GITHUB_STEP_SUMMARY, body + '\n');
		}
		comment(
			markdown(
				findings,
				warnings,
				uncompared,
				baseLabel,
				COMMENT_LIMIT,
				runUrl
			),
			findings.length > 0
		);
	} else {
		console.log(body.replace(MARKER + '\n', ''));
	}
};

try {
	main();
} catch (error) {
	// Advisory: never fail the job.
	console.log(
		`::warning title=api-compat::api-compat failed: ${escapeAnnotation(
			error instanceof Error ? error.message : String(error)
		)}`
	);
}
