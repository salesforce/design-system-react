/*
 * Story-based HTML snapshots.
 *
 * Replaces the original Jest + Storyshots `dom-snapshot` suite (Storyshots was
 * removed in Storybook 8). Every story in every `*.stories.{jsx,tsx}` file is
 * composed with its decorators/args via `composeStories`, rendered to static
 * markup with ReactDOMServer, beautified, and compared to a committed snapshot.
 *
 * This tests the rendered markup closely (the old Mocha tests leaned on these
 * snapshots for that) and gives a diffable record of every component's output.
 */
import { describe, it, expect, vi } from 'vitest';
import { renderToStaticMarkup } from 'react-dom/server';
import { html as beautify } from 'js-beautify';
import { composeStories } from '@storybook/react-vite';

// Make generated ids deterministic. `utilities/generate-id` wraps `nanoid`, so
// every component id is random per render — which would make these snapshots
// flake on every run. Replace it with a stable, call-order-based counter. (All
// 20 id-consuming components go through this single util.)
vi.mock('../../utilities/generate-id', () => {
	let counter = 0;
	return {
		default: () => `slds-snapshot-id-${(counter += 1)}`,
	};
});

// Eagerly import every story module (Vite glob, resolved at build time).
const storyModules = import.meta.glob('../**/__docs__/*.stories.{jsx,tsx}', {
	eager: true,
});

const componentName = (filePath) => {
	// ../badge/__docs__/Badge.stories.jsx -> Badge
	const match = filePath.match(/\/([^/]+)\.stories\.[jt]sx$/);
	return match ? match[1] : filePath;
};

// Stories whose components render through a React portal (Modal, and anything
// that opens one) cannot be captured by ReactDOMServer — it throws "Portals are
// not currently supported by the server renderer." Their markup is covered by
// the component unit tests (and, for focus behavior, the browser project); the
// static-HTML snapshot simply doesn't apply to portal output.
const isPortalError = (error) =>
	error instanceof Error &&
	/Portals are not currently supported by the server renderer/.test(
		error.message
	);

describe('Story HTML snapshots', () => {
	for (const [filePath, storyModule] of Object.entries(storyModules)) {
		const composed = composeStories(storyModule);
		const stories = Object.entries(composed);
		if (!stories.length) continue;

		describe(componentName(filePath), () => {
			for (const [storyName, Story] of stories) {
				it(storyName, () => {
					let markup;
					try {
						markup = renderToStaticMarkup(<Story />);
					} catch (error) {
						if (isPortalError(error)) {
							// Portal-rendered stories can't be server-rendered; skip
							// the snapshot rather than fail (see note above).
							return;
						}
						throw error;
					}
					expect(beautify(markup, { indent_size: 2 })).toMatchSnapshot();
				});
			}
		});
	}
});
