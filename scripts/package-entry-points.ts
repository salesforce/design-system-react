/*
 * Helpers shared by the package checks: `check-package-exports.mjs` (against
 * the built `dist/`) and `check-packed-install.ts` (against the `npm pack`
 * tarball installed into fixture consumers).
 *
 * Entry points are listed from the source tree, not from `dist/` or the
 * tarball, so a module the build or the `files` field drops is reported
 * rather than silently skipped.
 */
import { existsSync, globSync, readdirSync } from 'fs';
import { join } from 'path';
import ts from 'typescript';

const INDEX_RE = /^index\.(js|jsx|ts|tsx)$/;
const SOURCE_RE = /\.(js|jsx|ts|tsx)$/;
export const IGNORED = [
	'**/__tests__/**',
	'**/__docs__/**',
	'**/__examples__/**',
];

const hasIndex = (dir: string) =>
	existsSync(dir) && readdirSync(dir).some((file) => INDEX_RE.test(file));

/** `components/accordion/panel.tsx` -> `components/accordion/panel` */
export const toSubpath = (file: string) =>
	file.replace(SOURCE_RE, '').replace(/\.d$/, '');

/** Every `components/<name>` folder with an `index` (a bare-directory import) */
export const componentDirSubpaths = (root: string): string[] =>
	readdirSync(join(root, 'components'), { withFileTypes: true })
		.filter(
			(entry) =>
				entry.isDirectory() && hasIndex(join(root, 'components', entry.name))
		)
		.map((entry) => `components/${entry.name}`);

/**
 * Every source module under `components/` as a subpath, including internals
 * (`private/`, `check-props`); the `exports` map decides which are public.
 */
export const componentFileSubpaths = (root: string): string[] =>
	globSync('components/**/*.{js,jsx,ts,tsx}', {
		cwd: root,
		exclude: [...IGNORED, '**/*.d.ts'],
	}).map(toSubpath);

type ExportsMap = Record<string, unknown>;

/**
 * The `exports` target for `subpath` (`./components/x`), with Node's
 * precedence: an exact key wins, then the pattern key with the longest prefix
 * before its `*`, then the longest key. `null` means the subpath is blocked;
 * `undefined` means no key matches.
 */
export const matchExport = (
	exportsMap: ExportsMap,
	subpath: string
): unknown => {
	if (!subpath.includes('*') && Object.hasOwn(exportsMap, subpath)) {
		return exportsMap[subpath];
	}
	let best: string | undefined;
	for (const key of Object.keys(exportsMap)) {
		const star = key.indexOf('*');
		if (star === -1 || key.indexOf('*', star + 1) !== -1) continue;
		const prefix = key.slice(0, star);
		const suffix = key.slice(star + 1);
		if (
			subpath.length >= key.length &&
			subpath.startsWith(prefix) &&
			subpath.endsWith(suffix)
		) {
			const bestStar = best?.indexOf('*') ?? -1;
			if (
				best === undefined ||
				star > bestStar ||
				(star === bestStar && key.length > best.length)
			) {
				best = key;
			}
		}
	}
	return best === undefined ? undefined : exportsMap[best];
};

/**
 * Every importable specifier of the package: each exact `exports` key that is
 * not blocked, and each candidate subpath a pattern key exports. JSON keys
 * (`./package.json`) are left out: they are not modules.
 */
export const entryPointSpecifiers = (
	pkg: string,
	exportsMap: ExportsMap,
	candidates: string[]
): string[] => {
	const subpaths = new Set<string>();
	for (const key of Object.keys(exportsMap)) {
		if (!key.includes('*') && exportsMap[key] !== null) subpaths.add(key);
	}
	for (const candidate of candidates) {
		const subpath = `./${candidate}`;
		const target = matchExport(exportsMap, subpath);
		if (target !== null && target !== undefined) subpaths.add(subpath);
	}
	return [...subpaths]
		.filter((subpath) => !subpath.endsWith('.json'))
		.map((subpath) => (subpath === '.' ? pkg : `${pkg}/${subpath.slice(2)}`))
		.sort();
};

/**
 * The value (non-type-only) export names a module's types declare. A re-export
 * whose target doesn't resolve aliases TypeScript's declaration-less `unknown`
 * symbol, which carries a value flag, so it is not counted.
 */
export const valueExportNames = (
	checker: ts.TypeChecker,
	sourceFile: ts.SourceFile | undefined
): string[] => {
	const moduleSymbol = sourceFile && checker.getSymbolAtLocation(sourceFile);
	return (moduleSymbol ? checker.getExportsOfModule(moduleSymbol) : [])
		.filter((symbol) => {
			const target =
				symbol.flags & ts.SymbolFlags.Alias
					? checker.getAliasedSymbol(symbol)
					: symbol;
			return target.declarations?.length && target.flags & ts.SymbolFlags.Value;
		})
		.map((symbol) => symbol.getName());
};

/**
 * A TypeScript consumer that imports every specifier as a namespace and uses
 * each, so an unresolved or broken import is a type error.
 */
export const typesFixtureSource = (specs: string[]): string =>
	specs
		.map((spec, i) => `import * as entry${i} from '${spec}';`)
		.concat(
			'',
			`export const entries = [${specs.map((_, i) => `entry${i}`).join(', ')}];`,
			''
		)
		.join('\n');

/**
 * A runtime consumer that loads every specifier in `expected` with `import()`
 * (ESM) or `require()` (CJS) and checks each has the value exports its types
 * declare. It prints a JSON array of failures.
 */
export const runtimeFixtureSource = (
	kind: 'esm' | 'cjs',
	expected: Record<string, string[]>
): string => {
	const load = kind === 'esm' ? 'await import(spec)' : 'require(spec)';
	return `const expected = ${JSON.stringify(expected, null, '\t')};
const failures = [];
for (const [spec, names] of Object.entries(expected)) {
	let mod;
	try {
		mod = ${load};
	} catch (error) {
		failures.push(\`\${spec}: ${kind.toUpperCase()} load failed: \${String(error.message).split('\\n')[0]}\`);
		continue;
	}
	const missing = names.filter((name) => mod[name] === undefined);
	if (missing.length) {
		failures.push(\`\${spec}: ${kind.toUpperCase()} is missing exports declared in its types: \${missing.join(', ')}\`);
	}
}
process.stdout.write(JSON.stringify(failures));
`;
};
