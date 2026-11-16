import { createLogger, defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { globSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Every `components/<name>/index` is a published bare-directory entry
// (`.../components/tree`). They must be explicit entries:
// an index that only re-exports (`export { default } from './tree'`) is not
// emitted under `preserveModules` when it is merely reachable from the barrel,
// because Rollup binds the barrel's import straight through to `./tree`. With
// no built `index.js` the shim script has nothing to point at and the import
// fails. Entries also pull in components the barrel doesn't export (`grid`).
const directoryEntries = globSync('components/*/index.{js,jsx,ts,tsx}', {
	cwd: __dirname,
}).map((file) => path.resolve(__dirname, file));

// Externalize React and any bare (node_modules) dependency — a component library
// should not bundle its deps. Relative/aliased source is kept in the build.
const external = (id: string) =>
	/^react($|\/)/.test(id) ||
	/^react-dom($|\/)/.test(id) ||
	(!id.startsWith('.') &&
		!id.startsWith('/') &&
		!id.startsWith('~') &&
		!id.startsWith('@components') &&
		!id.startsWith('@utilities') &&
		!id.startsWith('@types'));

// Fail the build on any warning, so a new one is fixed rather than scrolling
// past in CI. Vite reports its own warnings (config conflicts) through the
// logger and bundler warnings through `onwarn`, so both throw.
const logger = createLogger();
const failOnWarning = (message: string) => {
	throw new Error(`Build warning: ${message}`);
};
logger.warn = failOnWarning;
logger.warnOnce = failOnWarning;

// Storybook's `build-storybook` also loads this file with `command: 'build'`,
// but only the library build should fail on warnings. Storybook sets
// `STORYBOOK=true` before loading it.
const isLibraryBuild = (command: string) =>
	command === 'build' && process.env.STORYBOOK !== 'true';

export default defineConfig(({ command }) => ({
	// `vite dev` and Storybook keep Vite's default logger.
	customLogger: isLibraryBuild(command) ? logger : undefined,
	plugins: [react()],
	resolve: {
		// Force a single copy of React/ReactDOM. `react-highlighter-ts` declares
		// `react@^17` as a hard dependency (not a peer); a package.json `overrides`
		// entry pins it to the root React 19 so no nested copy is installed, and
		// deduping keeps a single React instance regardless.
		dedupe: ['react', 'react-dom'],
		alias: {
			'~': path.resolve(__dirname, './'),
			'@components': path.resolve(__dirname, './components'),
			'@utilities': path.resolve(__dirname, './utilities'),
			'@types': path.resolve(__dirname, './types'),
		},
	},
	build: {
		commonjsOptions: {
			include: [/node_modules/],
			transformMixedEsModules: true,
		},
		lib: {
			// The barrel and every directory index are the graph roots;
			// `preserveModules` (below) then emits every reachable source module as
			// its own file, mirroring the components/ tree, so consumers can
			// deep-import `@salesforce/design-system-react/components/accordion`
			// (and `.../accordion/panel`, etc.) as they always could.
			entry: [
				path.resolve(__dirname, 'components/index.ts'),
				...directoryEntries,
			],
		},
		rollupOptions: {
			external,
			// The plugin-timings hint depends on how fast the machine is, not on the
			// code, so it would make the build fail at random on a slow runner.
			checks: { pluginTimings: false },
			onwarn(warning) {
				failOnWarning(warning.message);
			},
			output: [
				{
					format: 'es',
					preserveModules: true,
					preserveModulesRoot: '.',
					dir: 'dist/es',
					entryFileNames: '[name].js',
				},
				{
					format: 'cjs',
					preserveModules: true,
					preserveModulesRoot: '.',
					dir: 'dist/cjs',
					entryFileNames: '[name].cjs',
					exports: 'named',
				},
			],
		},
		sourcemap: true,
	},
}));
