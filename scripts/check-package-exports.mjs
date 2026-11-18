/*
 * Verify, against the built `dist/`, that the package `exports` map publishes
 * exactly the public surface, for all three consumer shapes (types, ESM, CJS).
 *
 * Positive: every published bare-directory import — `<pkg>` and
 * `<pkg>/components/<name>` — resolves and is complete:
 *
 *   - types: TypeScript (`moduleResolution: bundler`, as in our tsconfig)
 *     resolves the subpath under both the `import` and `require` conditions
 *     and finds value exports;
 *   - ESM:   `import()` succeeds and provides every value export the types declare;
 *   - CJS:   `require()` succeeds and provides every value export the types declare.
 *
 * Negative: internals are not entry points. Every module under `utilities/`,
 * every module and folder under a `private/` folder in `components/`, and every
 * `check-props` module must fail to resolve for types (`bundler` and `node16`,
 * `import` and `require`), and `import()`/`require()` must throw
 * `ERR_PACKAGE_PATH_NOT_EXPORTED`.
 *
 * Type surface: every type a public value export's signature refers to (its
 * props and other parameters, followed through the types they reference) must
 * be declared in a public file, not under `utilities/` or a `private/` folder,
 * and so must every type-only export of a public entry point. A shared type
 * declared in `types/` must also be exported by name from a public entry point,
 * so a consumer can name it without a deep import.
 *
 * The subpath lists come from the source tree, not from `dist/`, so a component
 * the build fails to emit is reported rather than silently skipped. Imports go
 * through the package's own name (self-reference), so Node and TypeScript apply
 * the real `exports` map, as a consumer's would.
 *
 * Regression check for alpha.4, where `components/color-picker`, `filter` and
 * `tree` had types but no JS: their re-export-only `index` was not emitted, so
 * no bare-directory shim was generated for them.
 *
 * Run after a full build: `npm run build` (which runs this as its last step).
 */
import { readFileSync, globSync } from 'fs';
import { createRequire } from 'module';
import { join } from 'path';
import { fileURLToPath } from 'url';
import ts from 'typescript';

import {
	IGNORED,
	componentDirSubpaths,
	toSubpath,
	valueExportNames,
} from './package-entry-points.ts';

const root = fileURLToPath(new URL('..', import.meta.url));
const { name: pkg } = JSON.parse(
	readFileSync(join(root, 'package.json'), 'utf8')
);
const require = createRequire(import.meta.url);

const subpaths = [
	pkg,
	...componentDirSubpaths(root).map((subpath) => `${pkg}/${subpath}`),
];

// Internal subpaths that must NOT resolve: every source module under
// `utilities/` (and its folders), every module and folder under a `private/`
// folder in `components/`, and every `check-props` module.
const blocked = new Set();
for (const file of globSync('utilities/**/*.{js,jsx,ts,tsx}', {
	cwd: root,
	exclude: IGNORED,
})) {
	const sub = toSubpath(file);
	blocked.add(sub);
	// The bare folder (`utilities/hooks`) and the shim-style `index` path
	if (sub.endsWith('/index')) blocked.add(sub.slice(0, -'/index'.length));
}
for (const file of globSync(
	[
		'components/**/private/**/*.{js,jsx,ts,tsx}',
		'components/**/*check-props.{js,ts}',
	],
	{ cwd: root, exclude: IGNORED }
)) {
	const sub = toSubpath(file);
	blocked.add(sub);
	if (sub.endsWith('/index')) blocked.add(sub.slice(0, -'/index'.length));
}
for (const dir of globSync('components/**/private', { cwd: root })) {
	blocked.add(dir);
}
const blockedSpecs = [...blocked].sort().map((sub) => `${pkg}/${sub}`);

const failures = [];
const fail = (spec, message) => failures.push(`${spec}: ${message}`);

// --- Types -----------------------------------------------------------------

const compilerOptions = {
	module: ts.ModuleKind.Preserve,
	moduleResolution: ts.ModuleResolutionKind.Bundler,
	jsx: ts.JsxEmit.ReactJSX,
	strict: true,
	skipLibCheck: true,
	noEmit: true,
};
// Any file inside the package scope works as the importer for self-reference.
const importer = join(root, 'scripts', 'check-package-exports.ts');
const resolveTypes = (spec, mode) =>
	ts.resolveModuleName(
		spec,
		importer,
		compilerOptions,
		ts.sys,
		undefined,
		undefined,
		mode
	).resolvedModule?.resolvedFileName;

const node16Options = {
	...compilerOptions,
	module: ts.ModuleKind.Node16,
	moduleResolution: ts.ModuleResolutionKind.Node16,
};
const resolveTypesNode16 = (spec, mode) =>
	ts.resolveModuleName(
		spec,
		importer,
		node16Options,
		ts.sys,
		undefined,
		undefined,
		mode
	).resolvedModule?.resolvedFileName;

for (const spec of blockedSpecs) {
	for (const [label, resolve] of [
		['bundler', resolveTypes],
		['node16', resolveTypesNode16],
	]) {
		for (const [condition, mode] of [
			['import', ts.ModuleKind.ESNext],
			['require', ts.ModuleKind.CommonJS],
		]) {
			const file = resolve(spec, mode);
			if (file) {
				fail(
					spec,
					`internal module resolves for types (${label}, "${condition}"): ${file.slice(root.length)}`
				);
			}
		}
	}
}

/** @type {Map<string, string>} subpath -> resolved `.d.ts` (import condition) */
const typeFiles = new Map();
for (const spec of subpaths) {
	const esm = resolveTypes(spec, ts.ModuleKind.ESNext);
	const cjs = resolveTypes(spec, ts.ModuleKind.CommonJS);
	if (!esm) fail(spec, 'types do not resolve under the "import" condition');
	if (!cjs) fail(spec, 'types do not resolve under the "require" condition');
	if (esm) typeFiles.set(spec, esm);
}

const program = ts.createProgram([...typeFiles.values()], compilerOptions);
const checker = program.getTypeChecker();

/** @type {Map<string, string[]>} subpath -> value (non-type-only) export names */
const declaredValues = new Map();
for (const [spec, file] of typeFiles) {
	const names = valueExportNames(checker, program.getSourceFile(file));
	if (names.length === 0) {
		fail(spec, `types (${file.slice(root.length)}) declare no value exports`);
	}
	declaredValues.set(spec, names);
}

// --- Type surface ----------------------------------------------------------

// Every public module a consumer can import types from: the bare-directory
// entries above plus each public file subpath (`components/accordion/panel`).
const publicTypeFiles = new Map(typeFiles);
for (const file of globSync('components/**/*.{js,jsx,ts,tsx}', {
	cwd: root,
	exclude: [...IGNORED, '**/private/**', '**/*check-props.*', '**/*.d.ts'],
})) {
	const spec = `${pkg}/${toSubpath(file)}`;
	const resolved = resolveTypes(spec, ts.ModuleKind.ESNext);
	if (resolved && !publicTypeFiles.has(spec))
		publicTypeFiles.set(spec, resolved);
}

const surface = ts.createProgram(
	[...new Set(publicTypeFiles.values())],
	compilerOptions
);
const surfaceChecker = surface.getTypeChecker();
const unalias = (symbol) =>
	symbol.flags & ts.SymbolFlags.Alias
		? surfaceChecker.getAliasedSymbol(symbol)
		: symbol;

/** Symbols exported by name from a public entry point */
const publicSymbols = new Set();
/** @type {Array<[string, ts.Symbol]>} `<spec>#<name>` -> value export */
const publicValues = [];
for (const [spec, file] of publicTypeFiles) {
	const moduleSymbol = surfaceChecker.getSymbolAtLocation(
		surface.getSourceFile(file)
	);
	for (const symbol of moduleSymbol
		? surfaceChecker.getExportsOfModule(moduleSymbol)
		: []) {
		const target = unalias(symbol);
		publicSymbols.add(target);
		if (target.flags & ts.SymbolFlags.Value && target.declarations?.length) {
			publicValues.push([`${spec}#${symbol.getName()}`, target]);
		}
	}
}

const typesRoot = join(root, 'dist/types/');
// Public types must be declared in a public file: a component's own files or
// `types/`. `utilities/` and `private/` hold implementation only.
const INTERNAL_DECL_RE = /^utilities\/|\/private\//;
const isInternalDecl = (file) =>
	INTERNAL_DECL_RE.test(file.slice(typesRoot.length));
const isSharedDecl = (file) =>
	file.slice(typesRoot.length).startsWith('types/');
const typeName = (symbol, file) =>
	`${symbol.getName()} (${file.slice(root.length)})`;
/** @type {Map<string, string>} type -> first public export that names or uses it */
const misplaced = new Map();
/** @type {Map<string, string>} shared type -> first public export using it */
const unnamed = new Map();
const visited = new Set();

// A type exported by name must be declared in a public file, not merely
// re-exported from an internal one.
for (const [spec, file] of publicTypeFiles) {
	const moduleSymbol = surfaceChecker.getSymbolAtLocation(
		surface.getSourceFile(file)
	);
	for (const symbol of moduleSymbol
		? surfaceChecker.getExportsOfModule(moduleSymbol)
		: []) {
		const target = unalias(symbol);
		// Only type-only exports: a value (component, class) may be implemented
		// in a private file, and its props are checked below.
		if (!(target.flags & ts.SymbolFlags.Type)) continue;
		if (target.flags & ts.SymbolFlags.Value) continue;
		for (const decl of target.declarations ?? []) {
			const declFile = decl.getSourceFile().fileName;
			if (declFile.startsWith(typesRoot) && isInternalDecl(declFile)) {
				const key = typeName(target, declFile);
				if (!misplaced.has(key))
					misplaced.set(key, `${spec}#${symbol.getName()}`);
			}
		}
	}
}

// Follow a symbol's declarations through every type they reference. Only our
// own declarations are followed: React's and other dependencies' types are
// importable from those packages.
const visitSymbol = (symbol, via) => {
	if (!symbol) return;
	const target = unalias(symbol);
	if (visited.has(target) || target.flags & ts.SymbolFlags.TypeParameter) {
		return;
	}
	visited.add(target);
	for (const decl of target.declarations ?? []) {
		const file = decl.getSourceFile().fileName;
		if (!file.startsWith(typesRoot)) continue;
		const isTypeDecl =
			target.flags & (ts.SymbolFlags.Type | ts.SymbolFlags.Class);
		if (isTypeDecl && isInternalDecl(file)) {
			const key = typeName(target, file);
			if (!misplaced.has(key)) misplaced.set(key, via);
		} else if (isTypeDecl && isSharedDecl(file) && !publicSymbols.has(target)) {
			const key = typeName(target, file);
			if (!unnamed.has(key)) unnamed.set(key, via);
		}
		// A class's members are its implementation; only its heritage is surface.
		visitNode(ts.isClassDeclaration(decl) ? decl.heritageClauses : decl, via);
	}
};
const visitNode = (node, via) => {
	if (!node) return;
	const visit = (child) => {
		if (ts.isTypeReferenceNode(child)) {
			visitSymbol(surfaceChecker.getSymbolAtLocation(child.typeName), via);
		} else if (ts.isExpressionWithTypeArguments(child)) {
			visitSymbol(surfaceChecker.getSymbolAtLocation(child.expression), via);
		} else if (ts.isTypeQueryNode(child)) {
			visitSymbol(surfaceChecker.getSymbolAtLocation(child.exprName), via);
		}
		ts.forEachChild(child, visit);
	};
	if (Array.isArray(node)) node.forEach(visit);
	else visit(node);
};
const visitType = (type, via) => {
	if (type.aliasSymbol) visitSymbol(type.aliasSymbol, via);
	else if (type.isUnionOrIntersection()) {
		type.types.forEach((member) => visitType(member, via));
	} else if (type.symbol) visitSymbol(type.symbol, via);
};

for (const [via, symbol] of publicValues) {
	const type = surfaceChecker.getTypeOfSymbol(symbol);
	for (const signature of [
		...type.getCallSignatures(),
		...type.getConstructSignatures(),
	]) {
		for (const parameter of signature.getParameters()) {
			visitType(surfaceChecker.getTypeOfSymbol(parameter), via);
		}
	}
}
for (const [type, via] of [...misplaced].sort()) {
	fail(
		via,
		`names or uses ${type}, which is declared in an internal file; declare it in a public one`
	);
}
for (const [type, via] of [...unnamed].sort()) {
	fail(via, `uses ${type}, which no public entry point exports by name`);
}

// --- Runtime ---------------------------------------------------------------

const checkRuntime = (spec, kind, mod) => {
	const missing = (declaredValues.get(spec) ?? []).filter(
		(name) => mod[name] === undefined
	);
	if (missing.length) {
		fail(
			spec,
			`${kind} is missing exports declared in its types: ${missing.join(', ')}`
		);
	}
};

for (const spec of subpaths) {
	try {
		checkRuntime(spec, 'ESM', await import(spec));
	} catch (error) {
		fail(spec, `ESM import failed: ${error.message.split('\n')[0]}`);
	}
	try {
		checkRuntime(spec, 'CJS', require(spec));
	} catch (error) {
		fail(spec, `CJS require failed: ${error.message.split('\n')[0]}`);
	}
}

for (const spec of blockedSpecs) {
	for (const [kind, load] of [
		['ESM import', () => import(spec)],
		['CJS require', () => require(spec)],
	]) {
		try {
			await load();
			fail(spec, `internal module loads through ${kind}`);
		} catch (error) {
			if (error.code !== 'ERR_PACKAGE_PATH_NOT_EXPORTED') {
				fail(
					spec,
					`${kind} failed with ${error.code ?? error.message}, not ERR_PACKAGE_PATH_NOT_EXPORTED`
				);
			}
		}
	}
}

/* eslint-disable no-console */
if (failures.length) {
	console.error(
		`check-package-exports: ${failures.length} problem(s):\n` +
			failures.map((line) => `  - ${line}`).join('\n')
	);
	process.exit(1);
}
console.log(
	`check-package-exports: ${subpaths.length} entry points resolve for types, ESM and CJS; ` +
		`${blockedSpecs.length} internal subpaths are blocked; ` +
		`${publicValues.length} public value exports name their signature types publicly.`
);
