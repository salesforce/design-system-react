/*
 * Make the published declarations resolve under `moduleResolution: node16`
 * (and `nodenext`), not only `bundler`.
 *
 * `tsc` keeps each relative import as written, extensionless
 * (`export * from './button/index'`). The package is `"type": "module"`, so
 * under node16 every `.d.ts` is an ES module, and an ES module's relative
 * imports need explicit extensions: each one fails to resolve, and with
 * `skipLibCheck` the import silently becomes `any`. And the `require`
 * condition resolved the same ESM `.d.ts`, so a CommonJS consumer got
 * TS1479 ("…the referenced file is an ECMAScript module…") for every entry
 * point, though the runtime it loads is CommonJS (`dist/cjs/**.cjs`).
 *
 * So, for every `.d.ts` under `dist/types/`:
 *   - rewrite each relative specifier to the explicit `.js` path of the file it
 *     resolves to (`./button/index` -> `./button/index.js`);
 *   - write a `.d.cts` twin whose specifiers end in `.cjs`, for the `require`
 *     condition of the `exports` map.
 *
 * Run after `build:shims` (whose `.d.ts` shims it rewrites too) and before
 * `test:exports`; `npm run build` does. `check-packed-install` type-checks the
 * result under node16 from the packed tarball.
 */
import { existsSync, globSync, readFileSync, writeFileSync } from 'fs';
import { dirname, join, resolve } from 'path';
import { fileURLToPath, pathToFileURL } from 'url';
import ts from 'typescript';

/**
 * Rewrite every relative module specifier in a declaration file. `resolveSpecifier`
 * returns the replacement for a specifier, or `undefined` to keep it. Comments
 * and strings that are not imports are left alone.
 */
export const rewriteRelativeSpecifiers = (
	source: string,
	resolveSpecifier: (specifier: string) => string | undefined
): string => {
	const sourceFile = ts.createSourceFile(
		'file.d.ts',
		source,
		ts.ScriptTarget.Latest,
		true
	);
	const literals: ts.StringLiteral[] = [];
	const visit = (node: ts.Node) => {
		if (
			(ts.isImportDeclaration(node) || ts.isExportDeclaration(node)) &&
			node.moduleSpecifier &&
			ts.isStringLiteral(node.moduleSpecifier)
		) {
			literals.push(node.moduleSpecifier);
		} else if (
			// `import('./x').Y` in a type position
			ts.isImportTypeNode(node) &&
			ts.isLiteralTypeNode(node.argument) &&
			ts.isStringLiteral(node.argument.literal)
		) {
			literals.push(node.argument.literal);
		}
		ts.forEachChild(node, visit);
	};
	visit(sourceFile);

	let output = source;
	// Back to front, so earlier positions stay valid.
	for (const literal of literals.sort((a, b) => b.getStart() - a.getStart())) {
		const specifier = literal.text;
		if (!specifier.startsWith('./') && !specifier.startsWith('../')) continue;
		const replacement = resolveSpecifier(specifier);
		if (replacement === undefined) continue;
		// Inside the quotes, so the original quote style is kept.
		output =
			output.slice(0, literal.getStart() + 1) +
			replacement +
			output.slice(literal.getEnd() - 1);
	}
	return output;
};

/**
 * The explicit-extension form of `specifier` from the declaration file in
 * `fromDir`: the file it names (`./x` -> `./x.js`) or that folder's index
 * (`./x` -> `./x/index.js`), or `undefined` if neither declaration exists.
 */
export const withExtension = (
	specifier: string,
	fromDir: string,
	extension: '.js' | '.cjs',
	exists: (file: string) => boolean = existsSync
): string | undefined => {
	const base = specifier.replace(/\.(c|m)?js$/, '');
	const target = resolve(fromDir, base);
	if (exists(`${target}.d.ts`)) return `${base}${extension}`;
	if (exists(join(target, 'index.d.ts'))) {
		return `${base.replace(/\/$/, '')}/index${extension}`;
	}
	return undefined;
};

const main = () => {
	const root = fileURLToPath(new URL('..', import.meta.url));
	const typesRoot = join(root, 'dist/types');
	const files = globSync('**/*.d.ts', { cwd: typesRoot }).map((file) =>
		join(typesRoot, file)
	);
	const unresolved: string[] = [];
	for (const file of files) {
		const source = readFileSync(file, 'utf8');
		const fromDir = dirname(file);
		const rewrite = (extension: '.js' | '.cjs') =>
			rewriteRelativeSpecifiers(source, (specifier) => {
				const replacement = withExtension(specifier, fromDir, extension);
				if (replacement === undefined && extension === '.js') {
					unresolved.push(`${file.slice(root.length)}: '${specifier}'`);
				}
				return replacement;
			});
		writeFileSync(file, rewrite('.js'));
		// The source map points at the `.d.ts`'s source, not at this twin.
		writeFileSync(
			file.replace(/\.d\.ts$/, '.d.cts'),
			rewrite('.cjs').replace(/\n\/\/# sourceMappingURL=.*\n?$/, '\n')
		);
	}
	if (unresolved.length) {
		console.error(
			`emit-node16-types: ${unresolved.length} relative import(s) name no declaration file:\n` +
				unresolved.map((line) => `  - ${line}`).join('\n')
		);
		process.exit(1);
	}
	console.log(
		`emit-node16-types: added explicit extensions to ${files.length} declaration(s) and wrote their .d.cts twins.`
	);
};

if (import.meta.url === pathToFileURL(process.argv[1] ?? '').href) main();
