/*
 * No component may render a <style> element.
 *
 * A Content-Security-Policy without 'unsafe-inline' in style-src blocks
 * <style> elements; inline `style` props are set through the CSSOM and
 * aren't blocked. This mounts every story into jsdom and checks the whole
 * document, so portal-rendered output and open menus are covered too; the
 * story HTML snapshots use ReactDOMServer, which misses both.
 *
 * The story glob and `generate-id` mock are copied from
 * story-snapshots.test.jsx.
 */
import { describe, it, expect, vi, afterEach } from 'vitest';
import { act, cleanup, render } from '@testing-library/react';
import { composeStories } from '@storybook/react-vite';

let idCounter = 0;
vi.mock('../../utilities/generate-id', () => ({
	default: () => `slds-style-test-id-${(idCounter += 1)}`,
}));

// Mounting runs effects, and some examples fetch assets by relative URL (the
// IconSettings `onRequestIconPath` sprite), which Node's fetch rejects.
vi.stubGlobal(
	'fetch',
	vi.fn(() => Promise.resolve(new Response('', { status: 200 })))
);

const storyModules = import.meta.glob('../**/__docs__/*.stories.{jsx,tsx}', {
	eager: true,
});

const componentName = (filePath) => {
	const match = filePath.match(/\/([^/]+)\.stories\.[jt]sx$/);
	return match ? match[1] : filePath;
};

describe('Stories render no <style> elements', () => {
	afterEach(() => {
		cleanup();
		idCounter = 0;
	});

	for (const [filePath, storyModule] of Object.entries(storyModules)) {
		const stories = Object.entries(composeStories(storyModule));
		if (!stories.length) continue;

		describe(componentName(filePath), () => {
			for (const [storyName, Story] of stories) {
				it(storyName, async () => {
					render(<Story />);
					// Let effects and timers that open menus or tooltips run.
					await act(() => new Promise((resolve) => setTimeout(resolve, 0)));
					expect(document.querySelectorAll('style')).toHaveLength(0);
				});
			}
		});
	}
});
