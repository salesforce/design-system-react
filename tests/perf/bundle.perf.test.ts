/*
 * Bundle checks (plan D3), run in Node against the built `dist/`. Run
 * `npm run build` first.
 *
 * For every published entry, a one-line consumer is bundled in-process with
 * Rolldown (the bundler Vite 8 uses), importing through the package name so
 * the real `exports` map and `sideEffects` apply. React stays external (it's
 * a peer); every other dependency is bundled, so the gzip size is what a
 * consumer ships.
 */
import { existsSync, readdirSync, readFileSync } from 'fs';
import { join } from 'path';
import { fileURLToPath } from 'url';
import { gzipSync } from 'zlib';
import { rolldown } from 'rolldown';
import { describe, it, expect } from 'vitest';

import { checkBudget, isUpdatingBudgets, recordPerf } from './budget';
import budgetFile from './budgets.json';

const root = fileURLToPath(new URL('../..', import.meta.url));
const pkg = JSON.parse(readFileSync(join(root, 'package.json'), 'utf8')) as {
	name: string;
	sideEffects: boolean | string[];
	dependencies: Record<string, string>;
};
const hasDist = existsSync(join(root, 'dist/es/components/index.js'));

// Runtime dependencies each entry may pull in. A new one fails the test until
// it's added here, so a dependency can't land unreviewed (see "Runtime
// Dependency Budget" in docs/codebase-overview.md). The extra names are
// transitive: `@floating-ui/core` and `@floating-ui/utils` come in through
// `@floating-ui/dom`, `exenv` and `react-lifecycles-compat` through
// `react-modal`.
const ALLOWED_DEPENDENCIES = new Set([
	...Object.keys(pkg.dependencies),
	'@floating-ui/core',
	'@floating-ui/utils',
	'exenv',
	'react-lifecycles-compat',
]);

// Component directories that are shared plumbing rather than components a
// consumer chose: any entry may include them.
const SHARED = new Set(['utilities', 'icon-settings', 'portal-settings']);

const INDEX_RE = /^index\.(js|jsx|ts|tsx)$/;
const entries = readdirSync(join(root, 'components'), { withFileTypes: true })
	.filter(
		(entry) =>
			entry.isDirectory() &&
			readdirSync(join(root, 'components', entry.name)).some((file) =>
				INDEX_RE.test(file)
			)
	)
	.map((entry) => entry.name)
	.sort();

interface BundleResult {
	gzipBytes: number;
	components: string[];
	dependencies: string[];
}

const bundle = async (code: string): Promise<BundleResult> => {
	const build = await rolldown({
		input: 'consumer',
		cwd: root,
		external: (id) => /^react(-dom)?($|\/)/.test(id),
		plugins: [
			{
				name: 'consumer',
				resolveId: (id) => (id === 'consumer' ? '\0consumer' : undefined),
				load: (id) => (id === '\0consumer' ? code : undefined),
			},
		],
		transform: { define: { 'process.env.NODE_ENV': '"production"' } },
		logLevel: 'silent',
	});
	const { output } = await build.generate({ format: 'es', minify: true });
	await build.close();
	const chunks = output.filter((item) => item.type === 'chunk');
	const moduleIds = chunks.flatMap((chunk) => chunk.moduleIds);
	const unique = (pattern: RegExp) =>
		[
			...new Set(moduleIds.map((id) => id.match(pattern)?.[1]).filter(Boolean)),
		].sort() as string[];
	return {
		gzipBytes: chunks.reduce(
			(sum, chunk) => sum + gzipSync(chunk.code).length,
			0
		),
		components: unique(/dist\/es\/components\/([^/.]+)/),
		dependencies: unique(/node_modules\/((?:@[^/]+\/)?[^/]+)/),
	};
};

// Component sets recorded by the last `npm run perf:budgets`. A component an
// entry didn't pull in before is an unrelated import (e.g. button starting to
// import combobox), so it fails until the budgets are re-recorded on purpose.
const recordedComponents = (key: string) =>
	(budgetFile as { components?: Record<string, string[]> }).components?.[key] ??
	[];

describe.skipIf(!hasDist)('bundle size and tree-shaking', () => {
	it.each(entries)('components/%s', async (name) => {
		const specifier = `${pkg.name}/components/${name}`;
		const result = await bundle(
			`import * as entry from '${specifier}'; console.log(entry);`
		);
		const key = `bundle:components/${name}`;

		checkBudget(key, { gzipBytes: result.gzipBytes });
		recordPerf(
			key,
			{
				components: result.components.length,
				dependencies: result.dependencies.length,
			},
			{ components: result.components }
		);

		const unlisted = result.dependencies.filter(
			(dep) => !ALLOWED_DEPENDENCIES.has(dep)
		);
		expect(unlisted, `${specifier} pulls in unlisted dependencies`).toEqual([]);

		if (!isUpdatingBudgets) {
			const recorded = recordedComponents(key);
			const unrelated = result.components.filter(
				(component) =>
					component !== name &&
					!SHARED.has(component) &&
					!recorded.includes(component)
			);
			expect(
				unrelated,
				`${specifier} pulls in components it didn't before; if intended, run \`npm run perf:budgets\``
			).toEqual([]);
		}
	});
});

describe.skipIf(!hasDist)('sideEffects', () => {
	// TODO(restack): the per-component CSS (asks-3) changes `sideEffects` to
	// `["**/*.css"]`, so CSS imports survive tree-shaking. Accept exactly that
	// once restacked.
	it('package.json declares no JS side effects', () => {
		expect(
			pkg.sideEffects === false ||
				(Array.isArray(pkg.sideEffects) &&
					pkg.sideEffects.every((glob) => glob.endsWith('.css')))
		).toBe(true);
	});

	it.each(['', ...entries.map((name) => `/components/${name}`)])(
		'importing %s without using it leaves nothing',
		async (subpath) => {
			const result = await bundle(`import '${pkg.name}${subpath}';`);
			expect(result.components).toEqual([]);
			expect(result.dependencies).toEqual([]);
		}
	);
});

// TODO(restack): the per-component CSS (asks-3) adds `css/manifest.json` and
// `css/components.json`. Until then this report is skipped.
const cssManifest = join(root, 'css/components.json');

describe.skipIf(!existsSync(cssManifest))('CSS size (report-only)', () => {
	it('records per-component and foundation CSS sizes', () => {
		const components = JSON.parse(readFileSync(cssManifest, 'utf8')) as Record<
			string,
			{ modules: string[] }
		>;
		const manifest = JSON.parse(
			readFileSync(join(root, 'css/manifest.json'), 'utf8')
		) as { modules: Record<string, { path: string; bytes: number }> };
		const size = (module: string) => manifest.modules[module]?.bytes ?? 0;

		recordPerf('css:foundation', { cssBytes: size('foundation') });
		for (const [name, { modules }] of Object.entries(components)) {
			recordPerf(`css:${name}`, {
				cssBytes: ['foundation', ...modules].reduce(
					(sum, module) => sum + size(module),
					0
				),
			});
		}
		expect(Object.keys(components).length).toBeGreaterThan(0);
	});
});
