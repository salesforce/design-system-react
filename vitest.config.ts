import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import { playwright } from '@vitest/browser-playwright';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const aliasEntries = [
	{ find: '~', replacement: path.resolve(__dirname, './') },
	{ find: '@components', replacement: path.resolve(__dirname, './components') },
	{ find: '@utilities', replacement: path.resolve(__dirname, './utilities') },
	{ find: '@types', replacement: path.resolve(__dirname, './types') },
];

const resolve = {
	// Force a single copy of React/ReactDOM. `react-highlighter-ts` declares
	// `react@^17` as a hard dependency (not a peer). A package.json `overrides`
	// entry now forces it onto the root React 19 (no nested copy), and deduping
	// keeps a single React instance regardless.
	dedupe: ['react', 'react-dom'],
	alias: aliasEntries,
};

// The `browser` project pre-bundles deps through vite 8's Rolldown optimizer,
// which mis-resolves `column-resizer`'s UMD default export (see
// test/shims/column-resizer.js). Alias the bare specifier to the shim using an
// anchored regex so the shim's own `column-resizer/dist/...` import is NOT
// rewritten. The jsdom project uses the SSR transform and doesn't need this.
const columnResizerShim = path.resolve(
	__dirname,
	'./test/shims/column-resizer.js'
);
const browserResolve = {
	dedupe: ['react', 'react-dom'],
	alias: [
		{ find: /^column-resizer$/, replacement: columnResizerShim },
		...aliasEntries,
	],
};

export default defineConfig({
	plugins: [react()],
	resolve,
	test: {
		coverage: {
			provider: 'v8',
			reporter: ['text', 'json', 'html'],
			exclude: [
				'node_modules/',
				'dist/',
				'**/__docs__/**',
				'**/__examples__/**',
				'**/*.d.ts',
				'vite.config.ts',
				'vitest.config.ts',
				'vitest.setup.ts',
				'vitest.setup.browser.ts',
			],
		},
		// Two projects:
		//  - `unit`    : the fast jsdom suite (the vast majority of tests).
		//  - `browser` : a small suite of `*.browser.test.*` files that need a real
		//                browser — focus traversal, text-truncation measurement, and
		//                real element widths — which jsdom cannot provide.
		projects: [
			{
				extends: true,
				test: {
					name: 'unit',
					globals: true,
					environment: 'jsdom',
					setupFiles: './vitest.setup.ts',
					include: [
						'components/**/__tests__/*.{test,spec}.{ts,tsx,js,jsx}',
					],
					// Browser-only specs live alongside as `*.browser.test.*`; keep
					// them out of the jsdom run.
					exclude: [
						'**/node_modules/**',
						'**/dist/**',
						'**/*.browser.test.{ts,tsx,js,jsx}',
					],
				},
			},
			{
				extends: true,
				resolve: browserResolve,
				// Pre-bundle the component runtime deps so the browser optimizer does
				// not discover them mid-run and reload the page (which flakes tests).
				optimizeDeps: {
					include: [
						'react',
						'react-dom',
						'react-dom/client',
						'react/jsx-dev-runtime',
						'@floating-ui/dom',
						'classnames',
						'dequal',
						'nanoid',
						'prop-types',
						'react-modal',
						'warning',
						'column-resizer',
						'lodash.reject',
						'memoize-one',
					],
				},
				test: {
					name: 'browser',
					globals: true,
					setupFiles: './vitest.setup.browser.ts',
					include: [
						'components/**/__tests__/*.browser.test.{ts,tsx,js,jsx}',
					],
					exclude: ['**/node_modules/**', '**/dist/**'],
					browser: {
						enabled: true,
						provider: playwright(),
						headless: true,
						instances: [{ browser: 'chromium' }],
					},
				},
			},
		],
	},
});
