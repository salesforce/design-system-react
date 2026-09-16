/**
 * Per-theme SLDS 2 stylesheet paths for Storybook.
 *
 * All files are shipped by the npm package `@salesforce-ux/design-system-2`,
 * served from `/slds2` (see main.ts staticDirs).
 *
 * - Lightning Blue and Cosmos are single bundled builds (tokens + everything).
 * - Pearl is a *sub-theme*: an overlay of brand-token overrides layered ON TOP of
 *   the Cosmos base, matching how the upstream SLDS 2 Storybook loads it.
 *
 * `href`    → the base stylesheet swapped into <link id="slds2-theme">.
 * `overlay` → optional second stylesheet appended after the base (Pearl only).
 *
 * Modeled on the upstream SLDS 2 Storybook's `themes.ts`.
 */
export const THEMES = {
	'lightning-blue': {
		title: 'Lightning Blue',
		href: '/slds2/bundled/slds2.lightning-blue.css',
	},
	cosmos: {
		title: 'Cosmos (SLDS2)',
		href: '/slds2/bundled/slds2.cosmos.css',
	},
	pearl: {
		title: 'Pearl (Alpha)',
		href: '/slds2/bundled/slds2.cosmos.css',
		overlay: '/assets/pearl-theme/pearl.css',
	},
};

export const DEFAULT_THEME = 'lightning-blue';
