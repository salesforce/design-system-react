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
 * `href`      → the base stylesheet swapped into <link id="slds2-theme">.
 * `themeHref` → the modular theme file, used when the CSS toolbar is set to
 *               one of the DSR module modes (css/, served from /dsr).
 * `overlay`   → optional second stylesheet appended after the base (Pearl only).
 *
 * Modeled on the upstream SLDS 2 Storybook's `themes.ts`.
 */
export const THEMES = {
	'lightning-blue': {
		title: 'Lightning Blue',
		href: '/slds2/bundled/slds2.lightning-blue.css',
		themeHref: '/slds2/modular/slds2.theme.lightning-blue.css',
	},
	cosmos: {
		title: 'Cosmos (SLDS2)',
		href: '/slds2/bundled/slds2.cosmos.css',
		themeHref: '/slds2/modular/slds2.theme.cosmos.css',
	},
	pearl: {
		title: 'Pearl (Alpha)',
		href: '/slds2/bundled/slds2.cosmos.css',
		themeHref: '/slds2/modular/slds2.theme.cosmos.css',
		overlay: '/assets/pearl-theme/pearl.css',
	},
};

export const DEFAULT_THEME = 'lightning-blue';

/**
 * How the SLDS 2 CSS is loaded (the "CSS" toolbar), to compare the monolith
 * against the per-component CSS in css/:
 *
 * - `monolith`: the bundled SLDS file, as consumers load it today.
 * - `entry`: per-component CSS. Only the story's own css/<component>.css and the
 *   modular theme, which shows what a component-scoped import renders.
 * - `modules`: debugging only, not a supported way to load css/.
 *   css/slds2.foundation.css, every module in manifest order, and the modular
 *   theme, which is byte-equivalent to the monolith. If an entry renders
 *   wrong but this matches the monolith, the component map is missing a
 *   module; if this differs too, the splitter is wrong.
 */
export const CSS_MODES = ['monolith', 'entry', 'modules'];
export const DEFAULT_CSS_MODE = 'monolith';
