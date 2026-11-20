import axe from 'axe-core';
import type { ElementContext, Result, RunOptions } from 'axe-core';
import { afterAll, beforeAll, expect, vi } from 'vitest';

// Shared axe check for the browser project (`*.browser.test.jsx`), where the
// real SLDS stylesheet is loaded, so visibility and color contrast are real.
//
// Run it on the open or expanded state. axe skips most of what an overlay
// renders while it is closed: the popup isn't in the DOM, and an
// `aria-expanded="false"` combobox needs no `aria-controls`. Story snapshots
// render closed, which is how a combobox with no `aria-controls` once shipped.

// The rulesets the Storybook a11y addon runs (`.storybook/preview.js`).
const tags = [
	'wcag2a',
	'wcag2aa',
	'wcag21a',
	'wcag21aa',
	'wcag22aa',
	'best-practice',
];

// Page-level rules. A test renders one component, not a page, so these
// would fail on every test.
const pageRules = ['region', 'landmark-one-main', 'page-has-heading-one'];

const formatViolations = (violations: Result[]) =>
	violations
		.map(({ id, impact, help, nodes }) => {
			const targets = nodes
				.map(
					({ target, html, failureSummary }) =>
						`    ${target.join(' ')}\n      ${html}\n      ${(failureSummary ?? '').replace(/\n/g, '\n      ')}`
				)
				.join('\n');
			return `${id} (${impact}): ${help}\n${targets}`;
		})
		.join('\n\n');

/**
 * Opts the calling test file out of React's act environment. Menus and
 * popovers render through Dialog, which positions itself when Floating UI's
 * `computePosition` promise resolves, outside any act() scope; waiting inside
 * act() would hold back that very update. Call at the top of a `describe`.
 */
export const notActEnvironment = () => {
	let previous: unknown;
	const scope = globalThis as { IS_REACT_ACT_ENVIRONMENT?: unknown };
	beforeAll(() => {
		previous = scope.IS_REACT_ACT_ENVIRONMENT;
		scope.IS_REACT_ACT_ENVIRONMENT = false;
	});
	afterAll(() => {
		scope.IS_REACT_ACT_ENVIRONMENT = previous;
	});
};

// Dialog renders with `position: absolute; pointer-events: none` until it has
// been positioned.
// Wait for that, so axe checks the overlay where the user sees it.
const waitForDialogsPositioned = () =>
	vi.waitFor(() => {
		const unpositioned = [
			...document.body.querySelectorAll<HTMLElement>('[style]'),
		].filter(
			({ style }) =>
				style.position === 'absolute' && style.pointerEvents === 'none'
		);
		expect(unpositioned).toEqual([]);
	});

/**
 * Asserts that axe finds no violations in `context` (all of `document.body`
 * by default, so portaled menus and dialogs are included). `rules` turns
 * further rules off for one test; give each a comment saying why.
 */
export const expectNoAxeViolations = async (
	context: ElementContext = document.body,
	{ rules = {} }: { rules?: RunOptions['rules'] } = {}
) => {
	await waitForDialogsPositioned();
	const { violations } = await axe.run(context, {
		runOnly: { type: 'tag', values: tags },
		rules: {
			...Object.fromEntries(
				pageRules.map((rule) => [rule, { enabled: false }])
			),
			...rules,
		},
		resultTypes: ['violations'],
	});
	if (violations.length > 0) {
		// A thrown message, not an `expect` diff, which Vitest would truncate
		throw new Error(`axe found violations:\n\n${formatViolations(violations)}`);
	}
};
