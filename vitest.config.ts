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
		// Projects:
		//  - `unit`    : the fast jsdom suite (the vast majority of tests).
		//  - `browser` : a small suite of `*.browser.test.*` files that need a real
		//                browser — focus traversal and text-truncation measurement
		//                — which jsdom cannot provide.
		//  - `scripts` : Node tests for repo tooling.
		//  - `perf`, `perf-bundle` : performance checks, excluded from `npm test`
		//                (see the `test` script) and run by `npm run test:perf`.
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
						'utilities/**/__tests__/*.{test,spec}.{ts,tsx,js,jsx}',
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
				// Node-only tests for repo tooling in `scripts/` (they spawn git).
				test: {
					name: 'scripts',
					environment: 'node',
					include: ['scripts/__tests__/*.test.mjs'],
					testTimeout: 30000,
				},
			},
			{
				extends: true,
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
						'lodash.reject',
						'memoize-one',
					],
				},
				test: {
					name: 'browser',
					globals: true,
					setupFiles: './vitest.setup.browser.ts',
					include: ['components/**/__tests__/*.browser.test.{ts,tsx,js,jsx}'],
					exclude: ['**/node_modules/**', '**/dist/**'],
					browser: {
						enabled: true,
						provider: playwright(),
						headless: true,
						instances: [{ browser: 'chromium' }],
					},
				},
			},
			{
				extends: true,
				optimizeDeps: {
					include: [
						'react',
						'react-dom',
						'react-dom/client',
						'react-dom/server',
						'react/jsx-dev-runtime',
						'@floating-ui/dom',
						'@storybook/react-vite',
						'classnames',
						'dequal',
						'nanoid',
						'prop-types',
						'react-modal',
						'warning',
						'lodash.reject',
						'memoize-one',
					],
				},
				// Performance checks (see tests/perf/README.md). Deterministic counts
				// (commits, renders, DOM nodes, listeners, timers, observers, layout
				// reads) checked against `tests/perf/budgets.json`, plus report-only
				// `*.bench.tsx` timings. Real Chromium, so layout, observers and
				// memory are real; `--expose-gc` lets the leak check force a GC.
				// Not part of `npm test`; run with `npm run test:perf`.
				test: {
					name: 'perf',
					globals: true,
					setupFiles: './vitest.setup.browser.ts',
					include: [
						'components/**/__perf__/*.perf.test.{jsx,tsx}',
						'tests/perf/*.perf.test.tsx',
					],
					exclude: ['**/node_modules/**', '**/dist/**'],
					benchmark: {
						include: [
							'components/**/__perf__/*.bench.tsx',
							'tests/perf/*.bench.tsx',
						],
					},
					testTimeout: 60000,
					browser: {
						enabled: true,
						provider: playwright({
							launchOptions: {
								args: [
									'--js-flags=--expose-gc',
									'--enable-precise-memory-info',
								],
							},
						}),
						headless: true,
						instances: [{ browser: 'chromium' }],
					},
				},
			},
			{
				extends: true,
				// Bundle checks (D3) against the built `dist/`. Run `npm run build`
				// first; `npm run test:perf` assumes it.
				test: {
					name: 'perf-bundle',
					environment: 'node',
					include: ['tests/perf/*.perf.test.ts'],
					testTimeout: 120000,
				},
			},
		],
	},
});
