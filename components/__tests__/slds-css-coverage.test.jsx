/*
 * Coverage check for css/components.json (scripts/build-slds-modules.ts).
 *
 * Renders every story and checks that each `slds-*` class in the markup is
 * styled by a module in that component's entry file (`css/<component>.css`),
 * or is listed in the entry's `unstyled` array: classes DSR renders that SLDS 2
 * has no rule for. An SLDS refresh that drops a class DSR renders fails here
 * (and in the refresh script) until it is handled; see the AGENTS.md
 * "Releasing" runbook.
 *
 * The glob and the generate-id mock are copied from story-snapshots.test.jsx.
 */
import { describe, it, expect, vi } from 'vitest';
import { readFileSync } from 'fs';
import { join } from 'path';
import { renderToStaticMarkup } from 'react-dom/server';
import { composeStories } from '@storybook/react-vite';

let idCounter = 0;
vi.mock('../../utilities/generate-id', () => ({
	default: () => `slds-snapshot-id-${(idCounter += 1)}`,
}));

const storyModules = import.meta.glob('../**/__docs__/*.stories.{jsx,tsx}', {
	eager: true,
});
const nestedStoryModules = import.meta.glob(
	'../**/__docs__/**/*.stories.{jsx,tsx}',
	{ eager: true }
);

// Vitest runs from the repo root (jsdom has no file: import.meta.url).
const root = process.cwd();
const css = join(root, 'css');
const manifest = JSON.parse(readFileSync(join(css, 'manifest.json'), 'utf8'));
const components = JSON.parse(
	readFileSync(join(css, 'components.json'), 'utf8')
);

// Classes (and `[class*=…]` prefixes) each module's rules mention.
const moduleClasses = {};
for (const key of manifest.order) {
	const text = readFileSync(join(css, manifest.modules[key].path), 'utf8');
	moduleClasses[key] = {
		classes: new Set([...text.matchAll(/\.(slds-[\w-]+)/g)].map((m) => m[1])),
		prefixes: [...text.matchAll(/\[class[*^]=['"]?(slds-[\w-]+)['"]?\]/g)].map(
			(m) => m[1]
		),
	};
}
const styledBy = (key, cls) =>
	moduleClasses[key].classes.has(cls) ||
	moduleClasses[key].prefixes.some((p) => cls.startsWith(p));

const isPortalError = (error) =>
	error instanceof Error &&
	/Portals are not currently supported by the server renderer/.test(
		error.message
	);

const componentDir = (filePath) => filePath.match(/^\.\.\/([^/]+)\//)[1];

describe('css/components.json covers every rendered SLDS class', () => {
	const allModules = { ...storyModules, ...nestedStoryModules };
	for (const [filePath, storyModule] of Object.entries(allModules)) {
		const dir = componentDir(filePath);
		const stories = Object.entries(composeStories(storyModule));
		if (!stories.length) continue;

		it(`${filePath.replace(/^\.\.\//, '')} → css/${dir}.css`, () => {
			const entry = components[dir];
			expect(
				entry,
				`css/components.json has no entry for ${dir}`
			).toBeDefined();
			const keys = ['foundation', ...entry.modules];
			const unstyled = new Set(entry.unstyled);
			const missing = new Set();
			for (const [, Story] of stories) {
				idCounter = 0;
				let markup;
				try {
					markup = renderToStaticMarkup(<Story />);
				} catch (error) {
					if (isPortalError(error)) continue;
					throw error;
				}
				for (const attr of markup.matchAll(/class="([^"]*)"/g)) {
					for (const cls of attr[1].split(/\s+/)) {
						if (!cls.startsWith('slds-') || unstyled.has(cls)) continue;
						if (!keys.some((key) => styledBy(key, cls))) missing.add(cls);
					}
				}
			}
			expect([...missing].sort()).toEqual([]);
		});
	}

	it('lists only classes that really have no SLDS rule as unstyled', () => {
		for (const [dir, entry] of Object.entries(components)) {
			for (const cls of entry.unstyled) {
				const owners = manifest.order.filter((key) => styledBy(key, cls));
				expect(owners, `${dir}: ${cls}`).toEqual([]);
			}
		}
	});
});
