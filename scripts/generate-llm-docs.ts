/*
 * Generate machine-readable docs for the public components, for LLM agents:
 *
 *   dist/llms/llms.txt              index in the llmstxt.org shape
 *   dist/llms/llms-full.txt         every component file, concatenated
 *   dist/llms/components/<name>.md  one per public component directory
 *
 * Each component file has the description, import lines, a props table and
 * 1-3 examples. The props come from the emitted `.d.ts` (JSDoc included), read
 * with the TypeScript compiler API, so they are exactly what consumers type
 * against. The examples are the first `site-stories` of `component.json`,
 * copied verbatim.
 *
 * Public components are the default exports re-exported from the package root
 * (`components/index`), grouped by their top-level directory under
 * `components/`. A directory without a `component.json` (`utilities/`, the
 * root `settings` module) is not a component and is skipped, as is `private/`.
 *
 * Usage (after `npm run build:types`; `npm run build` runs it):
 *   tsx scripts/generate-llm-docs.ts [--types <dir>] [--out <dir>]
 *
 *   --types  Emitted declarations (default: dist/types)
 *   --out    Output directory (default: dist/llms)
 */
import { existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from 'fs';
import { dirname, join, resolve } from 'path';
import { fileURLToPath } from 'url';
import ts from 'typescript';

const root = fileURLToPath(new URL('..', import.meta.url));

const argValue = (flag: string): string | undefined => {
	const index = process.argv.indexOf(flag);
	return index === -1 ? undefined : process.argv[index + 1];
};
const typesDir = resolve(argValue('--types') ?? join(root, 'dist/types'));
const outDir = resolve(argValue('--out') ?? join(root, 'dist/llms'));

const pkg = JSON.parse(readFileSync(join(root, 'package.json'), 'utf8')) as {
	name: string;
	version: string;
	description: string;
};

/** Hand-written guides to ship alongside the component files. */
const GUIDES: { path: string; title: string; description: string }[] = [];

const MAX_EXAMPLES = 3;
/** How many references deep the Types block follows from a prop or props type */
const MAX_TYPE_DEPTH = 4;

const warnings: string[] = [];
const warn = (message: string) => warnings.push(message);

// --- Public components -------------------------------------------------------

interface ComponentJson {
	component: string;
	classKey?: string;
	'display-name'?: string;
	'site-stories'?: { heading: string; path: string }[];
}

interface Entry {
	/** Module path relative to `components/`, e.g. `accordion/panel` */
	modulePath: string;
	/** Names the package root exports it as, primary name first */
	names: string[];
}

interface Component {
	dir: string;
	json: ComponentJson;
	entries: Entry[];
}

const rootIndex = join(typesDir, 'components/index.d.ts');
if (!existsSync(rootIndex)) {
	console.error(
		`generate-llm-docs: ${rootIndex} not found. Run \`npm run build:types\` first.`
	);
	process.exit(1);
}

const EXPORT_RE = /export \{ default as (\w+) \} from '\.\/([^']+)';/g;
const byModule = new Map<string, string[]>();
for (const [, name, modulePath] of readFileSync(rootIndex, 'utf8').matchAll(
	EXPORT_RE
)) {
	byModule.set(modulePath, [...(byModule.get(modulePath) ?? []), name]);
}

const components = new Map<string, Component>();
for (const [modulePath, names] of byModule) {
	const [dir] = modulePath.split('/');
	if (modulePath.split('/').includes('private')) continue;
	const jsonPath = join(root, 'components', dir, 'component.json');
	if (!existsSync(jsonPath)) continue;
	if (!components.has(dir)) {
		components.set(dir, {
			dir,
			json: JSON.parse(readFileSync(jsonPath, 'utf8')) as ComponentJson,
			entries: [],
		});
	}
	const component = components.get(dir)!;
	// `SLDS<Name>` aliases are legacy spellings; list them after the plain names.
	const isLegacy = (name: string) => /^SLDS[A-Z]/.test(name);
	const ordered = [
		...names.filter((name) => name === component.json.classKey),
		...names.filter(
			(name) => name !== component.json.classKey && !isLegacy(name)
		),
		...names.filter(isLegacy),
	];
	component.entries.push({ modulePath, names: ordered });
}

// The directory's own index first, then sub-modules in export order.
for (const component of components.values()) {
	component.entries.sort(
		(a, b) =>
			Number(b.modulePath === component.dir) -
			Number(a.modulePath === component.dir)
	);
}

const declarationFile = (modulePath: string): string | undefined =>
	[
		join(typesDir, 'components', `${modulePath}.d.ts`),
		join(typesDir, 'components', modulePath, 'index.d.ts'),
	].find(existsSync);

// --- Type information ----------------------------------------------------------

const files = [...components.values()]
	.flatMap((component) => component.entries)
	.map((entry) => declarationFile(entry.modulePath))
	.filter((file): file is string => Boolean(file));

const program = ts.createProgram(files, {
	module: ts.ModuleKind.Preserve,
	moduleResolution: ts.ModuleResolutionKind.Bundler,
	jsx: ts.JsxEmit.ReactJSX,
	strict: true,
	skipLibCheck: true,
	noEmit: true,
});
const checker = program.getTypeChecker();

const isExternal = (node: ts.Node) =>
	node.getSourceFile().fileName.includes('/node_modules/');

const docText = (symbol: ts.Symbol) =>
	ts.displayPartsToString(symbol.getDocumentationComment(checker)).trim();

const tagText = (tag: ts.JSDocTagInfo) =>
	ts.displayPartsToString(tag.text ?? []).trim();

/** Collapse a `.d.ts` type to one line. */
const oneLine = (text: string) => text.replace(/\s+/g, ' ').trim();

/** Markdown table cell: one line, pipes escaped. */
const cell = (text: string) =>
	text
		.split(/\n\s*\n/)
		.map((paragraph) => oneLine(paragraph))
		.join('<br><br>')
		.replace(/\n/g, ' ')
		.replace(/\|/g, '\\|');

/** Relative links pointed at the 0.10.x docs site; keep the text only. */
const stripSiteLinks = (text: string) =>
	text.replace(/\[([^\]]+)\]\(\/[^)]*\)/g, '$1');

const withoutUndefined = (type: ts.Type): ts.Type[] =>
	(type.isUnion() ? type.types : [type]).filter(
		(member) => !(member.flags & ts.TypeFlags.Undefined)
	);

/**
 * The allowed values of a literal-union prop (`'top' | 'bottom'`), or
 * `undefined` when the type is not made only of literals.
 */
const literalValues = (types: ts.Type[]): string[] | undefined => {
	const members = [...new Set(types.flatMap(withoutUndefined))];
	const isLiteral = (member: ts.Type) =>
		member.isLiteral() || Boolean(member.flags & ts.TypeFlags.BooleanLiteral);
	if (members.length < 2 || !members.every(isLiteral)) return undefined;
	const values = [
		...new Set(
			members.map((member) =>
				checker.typeToString(member).replace(/^"(.*)"$/, "'$1'")
			)
		),
	];
	if (values.every((value) => value === 'true' || value === 'false'))
		return undefined;
	return values;
};

interface Prop {
	name: string;
	/** Declared type, as written in the `.d.ts` (one entry per distinct declaration) */
	type: string[];
	/** Allowed values, when the type is a union of literals */
	values?: string[];
	/** Resolved types, one per union member that declares the prop */
	types: ts.Type[];
	required: boolean;
	description: string;
	deprecated?: string;
	defaultValue?: string;
	/** Type aliases and interfaces the prop's declared type references */
	references: ts.Declaration[];
}

/** Interfaces and type aliases a type node names, declared in our `.d.ts`. */
const referencedDeclarations = (
	node: ts.Node | undefined
): ts.Declaration[] => {
	const found: ts.Declaration[] = [];
	const visit = (child: ts.Node) => {
		if (ts.isTypeReferenceNode(child)) {
			let symbol = checker.getSymbolAtLocation(child.typeName);
			if (symbol && symbol.flags & ts.SymbolFlags.Alias)
				symbol = checker.getAliasedSymbol(symbol);
			for (const declaration of symbol?.declarations ?? []) {
				if (
					!isExternal(declaration) &&
					(ts.isInterfaceDeclaration(declaration) ||
						ts.isTypeAliasDeclaration(declaration))
				)
					found.push(declaration);
			}
		}
		ts.forEachChild(child, visit);
	};
	if (node) visit(node);
	return found;
};

const describeProp = (symbol: ts.Symbol): Prop => {
	const declaration = symbol.declarations?.[0];
	const typeNode =
		declaration &&
		(ts.isPropertySignature(declaration) ||
			ts.isPropertyDeclaration(declaration))
			? declaration.type
			: undefined;
	const type = checker.getTypeOfSymbol(symbol);
	const declared = typeNode
		? oneLine(typeNode.getText())
		: withoutUndefined(type)
				.map((member) => checker.typeToString(member))
				.join(' | ');
	const tags = symbol.getJsDocTags(checker);
	const deprecated = tags.find((tag) => tag.name === 'deprecated');
	const defaultTag = tags.find(
		(tag) => tag.name === 'default' || tag.name === 'defaultValue'
	);
	return {
		name: symbol.getName(),
		// `undefined`/`never` mark a prop a union member rules out; the union's
		// other members carry its real type.
		type: declared === 'undefined' || declared === 'never' ? [] : [declared],
		types: [type],
		required: !(symbol.flags & ts.SymbolFlags.Optional),
		description: stripSiteLinks(docText(symbol)),
		deprecated: deprecated ? tagText(deprecated) || 'Deprecated.' : undefined,
		defaultValue: defaultTag ? tagText(defaultTag) : undefined,
		references: referencedDeclarations(typeNode),
	};
};

interface PropsInfo {
	props: Prop[];
	/** Interfaces from `@types/react` whose props pass through (HTML attributes) */
	passThrough: string[];
	/** The `ref` type, when the component forwards one */
	ref?: string;
	/** The props type is a union: some props only apply to some members */
	isUnion: boolean;
}

/**
 * Merge the props of each member of a union props type (Button's `variant`
 * union). A prop is required only when every member requires it.
 */
const collectProps = (propsType: ts.Type): PropsInfo => {
	const members = propsType.isUnion() ? propsType.types : [propsType];
	const merged = new Map<string, Prop>();
	const counts = new Map<string, number>();
	const passThrough = new Set<string>();
	let ref: string | undefined;
	for (const member of members) {
		for (const symbol of checker.getPropertiesOfType(member)) {
			const name = symbol.getName();
			const declaration = symbol.declarations?.[0];
			if (declaration && isExternal(declaration)) {
				if (name === 'ref') {
					const refType = withoutUndefined(
						checker.getTypeOfSymbol(symbol)
					).find(
						(t) =>
							t.aliasSymbol?.getName() === 'Ref' ||
							t.getSymbol()?.getName() === 'RefObject'
					);
					const target =
						refType?.aliasTypeArguments?.[0] ??
						(refType &&
							checker.getTypeArguments(refType as ts.TypeReference)[0]);
					ref = target
						? `Ref<${withoutUndefined(target)
								.filter((t) => !(t.flags & ts.TypeFlags.Null))
								.map((t) => checker.typeToString(t))
								.join(' | ')}>`
						: 'Ref';
				} else if (name !== 'key') {
					const parent = declaration.parent;
					if (ts.isInterfaceDeclaration(parent))
						passThrough.add(parent.name.text);
				}
				continue;
			}
			counts.set(name, (counts.get(name) ?? 0) + 1);
			const prop = describeProp(symbol);
			const existing = merged.get(name);
			if (!existing) {
				merged.set(name, prop);
				continue;
			}
			for (const text of prop.type)
				if (!existing.type.includes(text)) existing.type.push(text);
			existing.types.push(...prop.types);
			existing.required &&= prop.required;
			existing.description ||= prop.description;
			existing.deprecated ??= prop.deprecated;
			existing.defaultValue ??= prop.defaultValue;
			existing.references.push(...prop.references);
		}
	}
	for (const [name, prop] of merged) {
		if ((counts.get(name) ?? 0) < members.length) prop.required = false;
		prop.values = literalValues(prop.types);
	}
	return {
		props: [...merged.values()].sort((a, b) => a.name.localeCompare(b.name)),
		passThrough: [...passThrough].sort(),
		ref,
		isUnion: members.length > 1,
	};
};

interface EntryInfo {
	/** JSDoc on the default export */
	description: string;
	kind: 'component' | 'function' | 'untyped';
	/** Signature, for non-component exports */
	signature?: string;
	props?: PropsInfo;
	/** Name of the props type, when it has one */
	propsTypeName?: string;
	propsDeclaration?: ts.Declaration;
}

const describeEntry = (file: string, exportName: string): EntryInfo => {
	const source = program.getSourceFile(file);
	const moduleSymbol = source && checker.getSymbolAtLocation(source);
	const moduleExports = moduleSymbol
		? checker.getExportsOfModule(moduleSymbol)
		: [];
	let symbol = moduleExports.find((s) => s.getName() === 'default');
	if (!symbol) return { description: '', kind: 'untyped' };
	if (symbol.flags & ts.SymbolFlags.Alias)
		symbol = checker.getAliasedSymbol(symbol);
	const description = stripSiteLinks(docText(symbol));
	const type = checker.getTypeOfSymbol(symbol);
	if (type.flags & ts.TypeFlags.Any) return { description, kind: 'untyped' };
	const signature =
		type.getConstructSignatures()[0] ?? type.getCallSignatures()[0];
	const parameter = signature?.getParameters()[0];
	const isComponent =
		/^[A-Z_]/.test(symbol.getName()) ||
		symbol.getName() === 'default' ||
		symbol.getName() === '_default' ||
		type.getConstructSignatures().length > 0;
	if (!signature || !parameter || !isComponent) {
		return {
			description,
			kind: 'function',
			signature: signature ? checker.signatureToString(signature) : undefined,
		};
	}
	const propsType = checker.getTypeOfSymbol(parameter);
	// The props alias name (`ButtonProps`), without `& RefAttributes<...>`.
	const propsParts = propsType.isIntersection() ? propsType.types : [propsType];
	// A union props type (Button) is distributed over `& RefAttributes`, which
	// loses its alias, so fall back to the `<Name>Props` naming convention.
	const named =
		propsParts
			.map((part) => part.aliasSymbol ?? part.getSymbol())
			.find((s) => s && s.declarations?.some((d) => !isExternal(d))) ??
		moduleExports.find((s) => s.getName() === `${exportName}Props`);
	const resolve = (s: ts.Symbol) =>
		s.flags & ts.SymbolFlags.Alias ? checker.getAliasedSymbol(s) : s;
	const target = named && resolve(named);
	const exported = moduleExports.find((s) => target && resolve(s) === target);
	return {
		description,
		kind: 'component',
		props: collectProps(propsType),
		propsTypeName: exported?.getName(),
		propsDeclaration: target?.declarations?.[0],
	};
};

// --- Markdown ----------------------------------------------------------------

const subpath = (modulePath: string) => `${pkg.name}/components/${modulePath}`;

const fence = (code: string, lang = '') => {
	const longest = Math.max(
		2,
		...(code.match(/`+/g) ?? []).map((m) => m.length)
	);
	const ticks = '`'.repeat(longest + 1);
	return `${ticks}${lang}\n${code.replace(/\n$/, '')}\n${ticks}`;
};

/** The component directory a declaration lives in, e.g. `input`. */
const componentDirOf = (declaration: ts.Declaration) =>
	declaration
		.getSourceFile()
		.fileName.slice(typesDir.length)
		.match(/^\/components\/([^/.]+)/)?.[1];

const declarationName = (declaration: ts.Declaration) =>
	(declaration as ts.InterfaceDeclaration | ts.TypeAliasDeclaration).name.text;

/**
 * The declarations a component's props reference, each printed once. Another
 * component's props type (Combobox's `input` takes `InputProps`) is linked to
 * that component's file instead of inlined, and a `*BaseProps` interface is
 * skipped, since its members are the rows of the props table.
 */
const typesBlock = (entries: EntryInfo[], dir: string): string => {
	const seen = new Set<ts.Declaration>();
	const ordered: ts.Declaration[] = [];
	const linked = new Map<string, string>();
	const add = (declaration: ts.Declaration, depth: number) => {
		if (seen.has(declaration) || depth > MAX_TYPE_DEPTH) return;
		seen.add(declaration);
		const name = declarationName(declaration);
		const owner = componentDirOf(declaration);
		if (
			/Props$/.test(name) &&
			owner &&
			owner !== dir &&
			components.has(owner)
		) {
			linked.set(name, owner);
			return;
		}
		if (/BaseProps$/.test(name)) return;
		ordered.push(declaration);
		const nested: ts.Declaration[] = [];
		ts.forEachChild(declaration, (child) => {
			nested.push(...referencedDeclarations(child));
		});
		for (const child of nested) add(child, depth + 1);
	};
	for (const entry of entries) {
		// A union props type says which props go with which variant: print it.
		if (entry.propsDeclaration && !entry.props?.isUnion)
			seen.add(entry.propsDeclaration);
		else if (entry.propsDeclaration) add(entry.propsDeclaration, 0);
		for (const prop of entry.props?.props ?? []) {
			for (const declaration of prop.references) add(declaration, 0);
		}
	}
	const links = [...linked]
		.sort(([a], [b]) => a.localeCompare(b))
		.map(([name, owner]) => `- \`${name}\`: see [${owner}.md](${owner}.md)`);
	if (!ordered.length) return links.join('\n');
	const text = ordered
		.map((declaration) => {
			const source = declaration.getSourceFile();
			const start = ts.getLeadingCommentRanges(
				source.text,
				declaration.pos
			)?.[0]?.pos;
			return source.text
				.slice(start ?? declaration.getStart(), declaration.end)
				.trim();
		})
		.join('\n\n');
	return [fence(text, 'ts'), ...(links.length ? ['', ...links] : [])].join(
		'\n'
	);
};

const propsTable = (info: PropsInfo): string => {
	if (!info.props.length) return 'This component takes no props of its own.';
	const rows = info.props.map((prop) => {
		const notes: string[] = [];
		if (prop.deprecated) {
			const replacement = prop.deprecated.replace(/^Deprecated\.?\s*/, '');
			notes.push(`**Deprecated.** ${replacement}`.trim());
		}
		if (prop.description) notes.push(prop.description);
		if (prop.defaultValue) notes.push(`Default: \`${prop.defaultValue}\``);
		const type = prop.type.join(' | ') || 'undefined';
		const values =
			prop.values && prop.values.join(' | ') !== type
				? ` (\`${cell(prop.values.join(' | '))}\`)`
				: '';
		return `| \`${prop.name}\` | \`${cell(type)}\`${values} | ${prop.required ? 'Yes' : ''} | ${cell(notes.join('\n\n'))} |`;
	});
	return [
		'| Prop | Type | Required | Description |',
		'| --- | --- | --- | --- |',
		...rows,
	].join('\n');
};

const firstSentence = (text: string) => {
	const line = oneLine(text);
	const match = line.match(/^(.+?[.!?])(\s|$)/);
	return (match ? match[1] : line).replace(/\s*\*+$/, '');
};

const componentDescriptions = JSON.parse(
	readFileSync(join(root, 'components/component-docs.json'), 'utf8')
) as Record<string, { description?: string }>;

interface Rendered {
	dir: string;
	title: string;
	/** Primary names of the other modules in the directory */
	related: string[];
	summary: string;
	markdown: string;
}

const renderComponent = (component: Component): Rendered => {
	const { dir, json } = component;
	const infos = component.entries.map((entry) => {
		const file = declarationFile(entry.modulePath);
		if (!file) warn(`${entry.modulePath}: no declaration file in ${typesDir}`);
		return file
			? describeEntry(file, entry.names[0])
			: ({ description: '', kind: 'untyped' } as EntryInfo);
	});
	const [main] = component.entries;
	const title = main.names[0];
	// The `.d.ts` JSDoc is the v11 contract; component-docs.json (generated for
	// 0.10.x) is the fallback for a component whose default export has none.
	const description =
		infos[0].description ||
		stripSiteLinks(
			componentDescriptions[json.component]?.description ?? ''
		).trim() ||
		`${json['display-name'] ?? title}.`;

	const lines: string[] = [`# ${title}`, '', description, ''];

	lines.push('## Import', '');
	const named = component.entries.map((entry) => entry.names[0]);
	lines.push(
		fence(
			[
				`import { ${named.join(', ')} } from '${pkg.name}';`,
				'// or, one entry point per module:',
				...component.entries.map(
					(entry) =>
						`import ${entry.names[0]} from '${subpath(entry.modulePath)}';`
				),
			].join('\n'),
			'tsx'
		),
		''
	);
	const aliases = component.entries.filter((entry) => entry.names.length > 1);
	if (aliases.length) {
		lines.push(
			...aliases.map(
				(entry) =>
					`\`${entry.names[0]}\` is also exported as ${entry.names
						.slice(1)
						.map((name) => `\`${name}\``)
						.join(', ')}.`
			),
			''
		);
	}

	component.entries.forEach((entry, index) => {
		const info = infos[index];
		const name = entry.names[0];
		lines.push(`## ${name}${info.kind === 'component' ? ' props' : ''}`, '');
		if (index > 0 && info.description) lines.push(info.description, '');
		if (info.kind === 'untyped') {
			lines.push('Its props are not typed (`any`) in this release.', '');
			return;
		}
		if (info.kind === 'function') {
			if (info.signature)
				lines.push(fence(`${name}${info.signature}`, 'ts'), '');
			return;
		}
		const props = info.props!;
		if (info.propsTypeName)
			lines.push(
				fence(
					`import type { ${info.propsTypeName} } from '${subpath(entry.modulePath)}';`,
					'ts'
				),
				''
			);
		if (props.isUnion)
			lines.push(
				'The props type is a union: some props only apply to some variants (see the Types block). A prop is marked required only when every variant requires it.',
				''
			);
		lines.push(propsTable(props), '');
		if (props.ref) lines.push(`Accepts a \`ref\`: \`${props.ref}\`.`, '');
		if (props.passThrough.length)
			lines.push(
				`Other props from ${props.passThrough
					.map((name) => `\`${name}\``)
					.join(', ')} (\`@types/react\`) pass through to the element.`,
				''
			);
	});

	const types = typesBlock(infos, dir);
	if (types)
		lines.push(
			'## Types',
			'',
			'Declarations the props above refer to, from the package `.d.ts`:',
			'',
			types,
			''
		);

	const stories = json['site-stories'] ?? [];
	const examples = stories
		.filter((story) => {
			const exists = existsSync(join(root, 'components', dir, story.path));
			if (!exists)
				warn(`${dir}: site-stories path ${story.path} does not exist`);
			return exists;
		})
		.slice(0, MAX_EXAMPLES);
	if (examples.length) {
		lines.push(
			'## Examples',
			'',
			`Copied verbatim from \`components/${dir}/__examples__\`. In these files, \`~/components/<name>\` stands for \`${pkg.name}/components/<name>\`, and icons are served from \`/assets/icons\` (see \`IconSettings\`).`,
			''
		);
		for (const story of examples) {
			const code = readFileSync(
				join(root, 'components', dir, story.path),
				'utf8'
			);
			lines.push(`### ${story.heading}`, '', fence(code, 'jsx'), '');
		}
	}

	return {
		dir,
		title,
		related: component.entries.slice(1).map((entry) => entry.names[0]),
		summary: firstSentence(description),
		markdown: `${lines.join('\n').trimEnd()}\n`,
	};
};

// --- Output --------------------------------------------------------------------

const rendered = [...components.values()]
	.sort((a, b) => a.dir.localeCompare(b.dir))
	.map(renderComponent);

const guides = GUIDES.filter((guide) => existsSync(join(root, guide.path)));

rmSync(outDir, { recursive: true, force: true });
mkdirSync(join(outDir, 'components'), { recursive: true });
for (const component of rendered) {
	writeFileSync(
		join(outDir, 'components', `${component.dir}.md`),
		component.markdown
	);
}
for (const guide of guides) {
	const target = join(outDir, guide.path);
	mkdirSync(dirname(target), { recursive: true });
	writeFileSync(target, readFileSync(join(root, guide.path)));
}

const header = [
	`# ${pkg.name} ${pkg.version}`,
	'',
	`> React 19 components for the Salesforce Lightning Design System (SLDS 2), written in TypeScript. These docs are generated from the package's \`.d.ts\` files and examples for version ${pkg.version}. The 0.10.x API differs: when this file and your memory of the library disagree, this file is right.`,
	'',
	'Install (v11 is published under the `alpha` tag; a plain install gives 0.10.x):',
	'',
	fence(`npm install ${pkg.name}@alpha`, 'bash'),
	'',
	'Import from the package root, or from one component entry point:',
	'',
	fence(
		[
			`import { Button, IconSettings } from '${pkg.name}';`,
			`import Button from '${pkg.name}/components/button';`,
		].join('\n'),
		'tsx'
	),
	'',
	"Wrap the app in `IconSettings` with the path to the SLDS icon sprites (`@salesforce-ux/design-system/assets/icons`), and load an SLDS 2 stylesheet from `@salesforce-ux/design-system-2` (for example `dist/css/bundled/slds2.cosmos.css`). The components don't ship CSS. Types are the contract: props marked deprecated still work but have a replacement.",
	'',
	`Inside a project that installs the package, these files are also at \`node_modules/${pkg.name}/dist/llms/\`.`,
	'',
];

const llmsTxt = [
	...header,
	'## Components',
	'',
	...rendered.map(
		(component) =>
			`- [${component.title}](components/${component.dir}.md): ${component.summary}${
				component.related.length
					? ` Also: ${component.related.join(', ')}.`
					: ''
			}`
	),
	'',
	...(guides.length
		? [
				'## Guides',
				'',
				...guides.map(
					(guide) => `- [${guide.title}](${guide.path}): ${guide.description}`
				),
				'',
			]
		: []),
	'## Optional',
	'',
	'- [llms-full.txt](llms-full.txt): every component file in this index, in one file',
	'',
].join('\n');

const llmsFull = [
	...header,
	...guides.map(
		(guide) => readFileSync(join(root, guide.path), 'utf8').trimEnd() + '\n'
	),
	...rendered.map((component) => component.markdown),
].join('\n');

writeFileSync(join(outDir, 'llms.txt'), llmsTxt);
writeFileSync(join(outDir, 'llms-full.txt'), llmsFull);

/* eslint-disable no-console */
for (const message of warnings)
	console.warn(`generate-llm-docs: warning: ${message}`);
console.log(
	`generate-llm-docs: wrote ${rendered.length} component files to ${outDir.slice(root.length) || outDir}.`
);
