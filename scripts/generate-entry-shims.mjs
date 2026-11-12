/*
 * Generate flat re-export shims for every directory that has an `index` module,
 * in each build output (es/cjs/types).
 *
 * Why: the package `exports` map uses a single wildcard per output —
 * `"./components/*": "./dist/es/components/*.js"` — and Node expands `*` to the
 * ENTIRE remainder of the specifier. That elegantly handles file subpaths
 * (`components/accordion/panel` -> `.../accordion/panel.js`) but NOT bare
 * directory imports (`components/accordion` -> `.../accordion.js`, which doesn't
 * exist; `exports` maps do no directory-index fallback). The historical package
 * supported bare-directory imports, so we emit `accordion.js` next to
 * `accordion/index.js` that simply re-exports the index. One star pattern then
 * resolves every historical import shape.
 */
import {
	readdirSync,
	readFileSync,
	statSync,
	existsSync,
	writeFileSync,
} from 'fs';
import { join, relative } from 'path';
import { fileURLToPath } from 'url';

const root = fileURLToPath(new URL('..', import.meta.url));

/** @type {Array<{ dir: string, ext: string, indexBase: string }>} */
const OUTPUTS = [
	{ dir: 'dist/es', ext: 'js', kind: 'esm' },
	{ dir: 'dist/cjs', ext: 'cjs', kind: 'cjs' },
	{ dir: 'dist/types', ext: 'd.ts', kind: 'dts' },
];

// `export *` never forwards `default`, so it is re-exported explicitly — but only
// when the index has one (e.g. `utilities/hooks` is named-exports only), since
// re-exporting a missing `default` is a link error in ESM.
const DEFAULT_EXPORT_RE =
	/\bexport\s+default\b|\bas\s+default\b|\bexport\s*\{\s*default\b/;

const shimBody = (kind, indexSpecifier, indexSource) => {
	if (kind === 'cjs') {
		return `module.exports = require('${indexSpecifier}.cjs');\n`;
	}
	const spec = kind === 'dts' ? indexSpecifier : `${indexSpecifier}.js`;
	const body = `export * from '${spec}';\n`;
	return DEFAULT_EXPORT_RE.test(indexSource)
		? `${body}export { default } from '${spec}';\n`
		: body;
};

let created = 0;

/** Recursively walk a build output dir, emitting a shim beside every `index.*`. */
const walk = (outDir, ext, kind, absDir) => {
	for (const entry of readdirSync(absDir)) {
		const abs = join(absDir, entry);
		if (!statSync(abs).isDirectory()) continue;

		const indexFile = join(abs, `index.${ext}`);
		if (existsSync(indexFile)) {
			// e.g. dist/es/components/accordion.js -> re-export ./accordion/index
			const shimPath = `${abs}.${ext}`;
			if (!existsSync(shimPath)) {
				const name = entry;
				writeFileSync(
					shimPath,
					shimBody(kind, `./${name}/index`, readFileSync(indexFile, 'utf8'))
				);
				created += 1;
			}
		}
		walk(outDir, ext, kind, abs);
	}
};

for (const { dir, ext, kind } of OUTPUTS) {
	const abs = join(root, dir);
	if (!existsSync(abs)) continue;
	// Only shim under components/ and utilities/ (the published deep-import roots).
	for (const sub of ['components', 'utilities']) {
		const subAbs = join(abs, sub);
		if (existsSync(subAbs)) walk(dir, ext, kind, subAbs);
	}
}

// eslint-disable-next-line no-console
console.log(
	`generate-entry-shims: wrote ${created} bare-directory re-export shim(s).`
);
