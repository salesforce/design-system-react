// Interop shim for `column-resizer`, aliased in via `resolve.alias` by both the
// Storybook dev server (`.storybook/main.ts`) and the Vitest `browser` project
// (`vitest.config.ts`) — the contexts that pre-bundle deps through vite 8's
// Rolldown optimizer.
//
// `column-resizer` ships a UMD bundle whose `module.exports` is
// `{ __esModule: true, default: ColumnResizer }`. Vite 5's esbuild optimizer
// honored the `__esModule` flag and exposed the constructor as the ESM default,
// but vite 8's Rolldown optimizer does not — a default import resolves to the
// wrapper object instead, so DataTable's `new ColumnResizer(...)` throws
// "ColumnResizer is not a constructor" (and, if the dep is left unbundled, the
// raw UMD IIFE has no ESM default at all → "does not provide an export named
// default"). The library build and the jsdom test project (SSR transform)
// resolve the interop correctly and don't need this.
//
// Import the real module by its explicit dist subpath. The alias that routes
// here is exact-anchored (`/^column-resizer$/`), so this bare subpath specifier
// is NOT rewritten and Vite serves the actual UMD file. Then unwrap nested
// `default`s until we reach the constructor, so this is robust to however the
// optimizer wraps it.
import * as columnResizerModule from 'column-resizer/dist/column-resizer.js';

let ColumnResizer = columnResizerModule.default ?? columnResizerModule;
while (
	ColumnResizer &&
	typeof ColumnResizer !== 'function' &&
	ColumnResizer.default
) {
	ColumnResizer = ColumnResizer.default;
}

export default ColumnResizer;
