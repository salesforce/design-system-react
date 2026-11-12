/*
 * Verify, against the built `dist/`, that every published bare-directory
 * import — `<pkg>`, `<pkg>/components/<name>`, `<pkg>/utilities/<name>` —
 * resolves through the package `exports` map and is complete, for all three
 * consumer shapes:
 *
 *   - types: TypeScript (`moduleResolution: bundler`, as in our tsconfig)
 *     resolves the subpath under both the `import` and `require` conditions
 *     and finds value exports;
 *   - ESM:   `import()` succeeds and provides every value export the types declare;
 *   - CJS:   `require()` succeeds and provides every value export the types declare.
 *
 * The subpath list comes from the source tree (every `<name>/index.*`), not
 * from `dist/`, so a component the build fails to emit is reported rather than
 * silently skipped. Imports go through the package's own name (self-reference),
 * so Node and TypeScript apply the real `exports` map, as a consumer's would.
 *
 * Regression check for alpha.4, where `components/color-picker`, `filter` and
 * `tree` had types but no JS: their re-export-only `index` was not emitted, so
 * no bare-directory shim was generated for them.
 *
 * Run after a full build: `npm run build` (which runs this as its last step).
 */
import { readdirSync, readFileSync, existsSync } from 'fs';
import { createRequire } from 'module';
import { join } from 'path';
import { fileURLToPath } from 'url';
import ts from 'typescript';

const root = fileURLToPath(new URL('..', import.meta.url));
const { name: pkg } = JSON.parse(
	readFileSync(join(root, 'package.json'), 'utf8')
);
const require = createRequire(import.meta.url);

const INDEX_RE = /^index\.(js|jsx|ts|tsx)$/;
const hasIndex = (dir) =>
	existsSync(dir) && readdirSync(dir).some((file) => INDEX_RE.test(file));

const subpaths = [pkg];
for (const sub of ['components', 'utilities']) {
	for (const entry of readdirSync(join(root, sub), { withFileTypes: true })) {
		if (entry.isDirectory() && hasIndex(join(root, sub, entry.name))) {
			subpaths.push(`${pkg}/${sub}/${entry.name}`);
		}
	}
}

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
	const moduleSymbol = checker.getSymbolAtLocation(program.getSourceFile(file));
	const names = (moduleSymbol ? checker.getExportsOfModule(moduleSymbol) : [])
		.filter((symbol) => {
			const target =
				symbol.flags & ts.SymbolFlags.Alias
					? checker.getAliasedSymbol(symbol)
					: symbol;
			// A re-export whose target doesn't resolve aliases TypeScript's
			// declaration-less `unknown` symbol, which carries a value flag.
			return target.declarations?.length && target.flags & ts.SymbolFlags.Value;
		})
		.map((symbol) => symbol.getName());
	if (names.length === 0) {
		fail(spec, `types (${file.slice(root.length)}) declare no value exports`);
	}
	declaredValues.set(spec, names);
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

/* eslint-disable no-console */
if (failures.length) {
	console.error(
		`check-package-exports: ${failures.length} problem(s) across ${subpaths.length} entry points:\n` +
			failures.map((line) => `  - ${line}`).join('\n')
	);
	process.exit(1);
}
console.log(
	`check-package-exports: ${subpaths.length} entry points resolve for types, ESM and CJS.`
);
