/*
 * Verify, against the emitted `dist/types`, that every public prop has JSDoc
 * and that every deprecated prop is tagged `@deprecated`.
 *
 *   - Docs: every property of every props type reachable from a published
 *     entry point (`components/index`, `components/<name>/index`,
 *     `utilities/<name>/index`) has a JSDoc comment. Props types are exported
 *     `*Props` types and the first parameter of exported components.
 *     Intersections and unions are resolved, and the members of `labels` and
 *     `assistiveText` objects are checked too. Props declared outside this
 *     package (React's HTML attributes) and `never` members (which only rule a
 *     prop out of one branch of a union) are skipped. A prop declared more than
 *     once in an intersection needs JSDoc on one declaration, since editors
 *     merge them.
 *   - Deprecations: every `deprecatedProperty(control, value, 'oldProp', ...)`
 *     call in `components/` whose `oldProp` is still a prop in that
 *     component's types has a `@deprecated` tag on it. Calls for props the
 *     types no longer declare are skipped (the compiler already rejects them),
 *     as are calls whose `oldProp` is not a plain prop name
 *     (`'steps[].assistiveText (string)'`), which describe a value shape.
 *
 * The JSDoc flows into the `.d.ts` that consumers (and agents) read, so it is
 * the contract for a prop. Gaps listed in the allowlist are tolerated; an
 * allowlist entry that is no longer a gap is an error, so the list only
 * shrinks.
 *
 * Usage (after `npm run build`):
 *   tsx scripts/check-prop-docs.ts [--root <dir>] [--allowlist <file>] [--write-allowlist]
 */
import {
	existsSync,
	readdirSync,
	readFileSync,
	realpathSync,
	writeFileSync,
} from 'fs';
import { join, relative, sep } from 'path';
import { fileURLToPath } from 'url';
import ts from 'typescript';

const args = process.argv.slice(2);
const option = (name: string): string | undefined => {
	const i = args.indexOf(name);
	return i === -1 ? undefined : args[i + 1];
};
const root = realpathSync(
	option('--root') ?? fileURLToPath(new URL('..', import.meta.url))
);
const allowlistPath =
	option('--allowlist') ??
	join(root, 'scripts', 'check-prop-docs.allowlist.json');
const writeAllowlist = args.includes('--write-allowlist');
const typesRoot = join(root, 'dist', 'types');

if (!existsSync(join(typesRoot, 'components', 'index.d.ts'))) {
	console.error(
		`check-prop-docs: ${typesRoot} not found; run \`npm run build\` first.`
	);
	process.exit(2);
}

// Nested objects whose members are user-facing text, documented like props.
const NESTED = new Set(['labels', 'assistiveText']);

// --- Entry points -------------------------------------------------------------

const entries = [join(typesRoot, 'components', 'index.d.ts')];
for (const sub of ['components', 'utilities']) {
	const dir = join(typesRoot, sub);
	if (!existsSync(dir)) continue;
	for (const entry of readdirSync(dir, { withFileTypes: true })) {
		const index = join(dir, entry.name, 'index.d.ts');
		if (entry.isDirectory() && existsSync(index)) entries.push(index);
	}
}

const program = ts.createProgram(entries, {
	module: ts.ModuleKind.ESNext,
	moduleResolution: ts.ModuleResolutionKind.Bundler,
	jsx: ts.JsxEmit.ReactJSX,
	strict: true,
	skipLibCheck: true,
	noEmit: true,
});
const checker = program.getTypeChecker();

// TypeScript reports file names with `/` separators.
const typesPrefix = `${typesRoot.split(sep).join('/')}/`;
const isExternal = (file: ts.SourceFile) =>
	!file.fileName.startsWith(typesPrefix);

const location = (file: ts.SourceFile) =>
	file.fileName.slice(typesPrefix.length).replace(/\.d\.ts$/, '');

const hasDocs = (decl: ts.Node) =>
	ts.getJSDocCommentsAndTags(decl).some((doc) => {
		if (ts.isJSDoc(doc))
			return Boolean(doc.comment) || Boolean(doc.tags?.length);
		return true;
	});

// `heading?: never` only rules a prop out of one branch of a union; it is not
// a prop a consumer can pass, so it needs no docs.
const isNever = (decl: ts.Node) =>
	ts.isPropertySignature(decl) &&
	decl.type?.kind === ts.SyntaxKind.NeverKeyword;

// Name of the interface or type alias a member is declared in, for messages
// and allowlist keys: `TreeProps`, or `TreeProps.labels` for an inline object.
const ownerName = (decl: ts.Node): string => {
	const names: string[] = [];
	let node: ts.Node | undefined = decl.parent;
	while (node && !ts.isSourceFile(node)) {
		if (ts.isInterfaceDeclaration(node) || ts.isTypeAliasDeclaration(node)) {
			names.unshift(node.name.text);
			break;
		}
		if (
			(ts.isPropertySignature(node) || ts.isPropertyDeclaration(node)) &&
			node.name &&
			ts.isIdentifier(node.name)
		) {
			names.unshift(node.name.text);
		}
		node = node.parent;
	}
	return names.join('.') || '<anonymous>';
};

const constituents = (type: ts.Type, seen = new Set<ts.Type>()): ts.Type[] => {
	if (seen.has(type)) return [];
	seen.add(type);
	if (type.isUnion()) return type.types.flatMap((t) => constituents(t, seen));
	return [type];
};

// --- Collect props types --------------------------------------------------------

const propsTypes: ts.Type[] = [];
for (const entry of entries) {
	const file = program.getSourceFile(entry);
	const moduleSymbol = file && checker.getSymbolAtLocation(file);
	if (!moduleSymbol) continue;
	for (const exported of checker.getExportsOfModule(moduleSymbol)) {
		const symbol =
			exported.flags & ts.SymbolFlags.Alias
				? checker.getAliasedSymbol(exported)
				: exported;
		if (
			symbol.flags & (ts.SymbolFlags.Interface | ts.SymbolFlags.TypeAlias) &&
			/Props$/.test(exported.name)
		) {
			propsTypes.push(checker.getDeclaredTypeOfSymbol(symbol));
		}
		if (symbol.flags & ts.SymbolFlags.Value && symbol.valueDeclaration) {
			const type = checker.getTypeOfSymbolAtLocation(
				symbol,
				symbol.valueDeclaration
			);
			// Components are declared PascalCase. Use the declared name, not the
			// export name: combobox's `filter` helper is also exported as
			// `SLDSComboboxFilterAndLimit`.
			if (!/^[A-Z]/.test(symbol.name)) continue;
			for (const signature of type.getCallSignatures()) {
				const [param] = signature.getParameters();
				if (param) {
					propsTypes.push(
						checker.getTypeOfSymbolAtLocation(param, symbol.valueDeclaration)
					);
				}
			}
		}
	}
}

// --- Check docs -------------------------------------------------------------------

const undocumented = new Set<string>();
const visitedTypes = new Set<ts.Type>();
const visitedDecls = new Set<ts.Node>();

const checkType = (type: ts.Type, nested: boolean) => {
	for (const part of constituents(type)) {
		if (visitedTypes.has(part)) continue;
		visitedTypes.add(part);
		if (!(part.flags & ts.TypeFlags.Object) && !part.isIntersection()) continue;
		if (part.getCallSignatures().length) continue;
		for (const prop of checker.getPropertiesOfType(part)) {
			const decls = (prop.declarations ?? []).filter(
				(d) => !isExternal(d.getSourceFile())
			);
			if (!decls.length || decls.every(isNever)) continue;
			// Editors merge the JSDoc of every declaration of an intersected
			// prop, so one documented declaration documents it.
			const [decl] = decls;
			if (!decls.some(hasDocs) && !visitedDecls.has(decl)) {
				visitedDecls.add(decl);
				undocumented.add(
					`${location(decl.getSourceFile())}: ${ownerName(decl)}.${prop.name}`
				);
			}
			if (!nested && NESTED.has(prop.name)) {
				const propType = checker.getNonNullableType(
					checker.getTypeOfSymbolAtLocation(prop, decls[0])
				);
				checkType(propType, true);
			}
		}
	}
};
for (const type of propsTypes) checkType(type, false);

// --- Check @deprecated parity --------------------------------------------------------

const SOURCE_RE = /\.(js|jsx|ts|tsx)$/;
const SKIP_DIRS = new Set([
	'__tests__',
	'__docs__',
	'__examples__',
	'node_modules',
]);
const sourceFiles = (dir: string): string[] =>
	readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
		const path = join(dir, entry.name);
		if (entry.isDirectory())
			return SKIP_DIRS.has(entry.name) ? [] : sourceFiles(path);
		return SOURCE_RE.test(entry.name) && !entry.name.endsWith('.d.ts')
			? [path]
			: [];
	});

// `components/<name>` -> prop names declared in its emitted types, and those
// of them tagged `@deprecated`.
const declaredProps = new Map<string, Set<string>>();
const deprecatedProps = new Map<string, Set<string>>();
const namesFor = (map: Map<string, Set<string>>, key: string) => {
	if (!map.has(key)) map.set(key, new Set());
	return map.get(key)!;
};
for (const file of program.getSourceFiles()) {
	if (isExternal(file)) continue;
	const component = location(file).split('/').slice(0, 2).join('/');
	const visit = (node: ts.Node) => {
		if (
			(ts.isPropertySignature(node) || ts.isPropertyDeclaration(node)) &&
			ts.isIdentifier(node.name)
		) {
			namesFor(declaredProps, component).add(node.name.text);
			if (
				ts.getJSDocTags(node).some((tag) => tag.tagName.text === 'deprecated')
			) {
				namesFor(deprecatedProps, component).add(node.name.text);
			}
		}
		ts.forEachChild(node, visit);
	};
	visit(file);
}

const untagged = new Set<string>();
const componentsDir = join(root, 'components');
for (const path of existsSync(componentsDir)
	? sourceFiles(componentsDir)
	: []) {
	const text = readFileSync(path, 'utf8');
	if (!text.includes('deprecatedProperty(')) continue;
	const file = ts.createSourceFile(path, text, ts.ScriptTarget.Latest, true);
	const component = relative(root, path).split(sep).slice(0, 2).join('/');
	const visit = (node: ts.Node) => {
		if (
			ts.isCallExpression(node) &&
			ts.isIdentifier(node.expression) &&
			node.expression.text === 'deprecatedProperty'
		) {
			const oldProp = node.arguments[2];
			if (
				oldProp &&
				ts.isStringLiteralLike(oldProp) &&
				/^[A-Za-z_$][\w$]*$/.test(oldProp.text) &&
				declaredProps.get(component)?.has(oldProp.text) &&
				!deprecatedProps.get(component)?.has(oldProp.text)
			) {
				untagged.add(`${component}: ${oldProp.text}`);
			}
		}
		ts.forEachChild(node, visit);
	};
	visit(file);
}

// --- Report ------------------------------------------------------------------------------

interface Allowlist {
	undocumented: string[];
	deprecated: string[];
}
const found: Allowlist = {
	undocumented: [...undocumented].sort(),
	deprecated: [...untagged].sort(),
};

if (writeAllowlist) {
	writeFileSync(allowlistPath, `${JSON.stringify(found, null, '\t')}\n`);
	console.log(
		`check-prop-docs: wrote ${found.undocumented.length} undocumented and ${found.deprecated.length} untagged deprecated props to ${relative(root, allowlistPath)}.`
	);
	process.exit(0);
}

const allowed: Allowlist = existsSync(allowlistPath)
	? JSON.parse(readFileSync(allowlistPath, 'utf8'))
	: { undocumented: [], deprecated: [] };

const problems: string[] = [];
const compare = (kind: keyof Allowlist, message: string) => {
	const allow = new Set(allowed[kind]);
	const actual = new Set(found[kind]);
	for (const item of found[kind]) {
		if (!allow.has(item)) problems.push(`${message}: ${item}`);
	}
	for (const item of allowed[kind]) {
		if (!actual.has(item)) {
			problems.push(`fixed, remove from the allowlist: ${item}`);
		}
	}
};
compare('undocumented', 'no JSDoc');
compare('deprecated', 'deprecatedProperty() call without a @deprecated tag');

if (problems.length) {
	console.error(problems.join('\n'));
	console.error(
		`\ncheck-prop-docs: ${problems.length} problem(s). Add JSDoc (what the prop does, its default, the (event, data) shape for callbacks) or a \`@deprecated Use \\\`x\\\`.\` tag.`
	);
	process.exit(1);
}
const pending = found.undocumented.length + found.deprecated.length;
console.log(
	`check-prop-docs: ${propsTypes.length} props types checked${pending ? `, ${pending} allowlisted gap(s) remain` : ''}.`
);
