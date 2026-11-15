/*
 * Delete the internal `.d.ts` files that no public declaration needs.
 *
 * `tsc -p tsconfig.dts.json` emits a declaration for every source file in the
 * program, including all of `utilities/` and every `private/` folder. Those
 * folders are blocked in the package `exports` map, so they are not entry
 * points, but a public declaration may still import one by relative path (a
 * `displayName` constant from `utilities/constants`, a private subcomponent's
 * type). Those files have to stay for the public types to resolve. Every other
 * internal declaration is deleted, with its `.d.ts.map`, so the package ships
 * no types for internals that nothing public uses.
 *
 * "Public" is every non-internal `.d.ts` under `dist/types/components/` (the
 * root barrel and every file a `./components/*` subpath can reach); TypeScript
 * follows their imports, so whatever it loads from `dist/types/` is kept.
 *
 * Run after `build:types` and before `build:shims` (`npm run build` does).
 */
import { globSync, rmSync } from 'fs';
import { join } from 'path';
import { fileURLToPath } from 'url';
import ts from 'typescript';

const root = fileURLToPath(new URL('..', import.meta.url));
const typesRoot = join(root, 'dist/types/');

const INTERNAL_RE = /^(utilities\/|.*\/private\/|.*check-props\.d\.ts$)/;

const all = globSync('**/*.d.ts', { cwd: typesRoot });
const publicFiles = all
	.filter((file) => file.startsWith('components/') && !INTERNAL_RE.test(file))
	.map((file) => join(typesRoot, file));

const program = ts.createProgram(publicFiles, {
	module: ts.ModuleKind.Preserve,
	moduleResolution: ts.ModuleResolutionKind.Bundler,
	jsx: ts.JsxEmit.ReactJSX,
	noEmit: true,
	skipLibCheck: true,
	types: [],
});
const needed = new Set(
	program
		.getSourceFiles()
		.map((sourceFile) => sourceFile.fileName)
		.filter((file) => file.startsWith(typesRoot))
		.map((file) => file.slice(typesRoot.length))
);

let removed = 0;
for (const file of all) {
	if (!INTERNAL_RE.test(file) || needed.has(file)) continue;
	rmSync(join(typesRoot, file));
	rmSync(join(typesRoot, `${file}.map`), { force: true });
	removed += 1;
}

// eslint-disable-next-line no-console
console.log(
	`prune-internal-types: removed ${removed} internal declaration(s); kept ${
		all.filter((file) => INTERNAL_RE.test(file) && needed.has(file)).length
	} that public declarations import.`
);
