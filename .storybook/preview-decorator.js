import { THEMES, DEFAULT_THEME } from './themes';

/**
 * Preview decorator that owns both theming axes for the SLDS 2 canvas,
 * modeled on the upstream SLDS 2 Storybook's `preview-decorator.ts`.
 *
 * It runs INSIDE the preview iframe, so it applies styling to the iframe's own
 * document — which is why it can reliably drive dark mode (the bundled SLDS 2
 * CSS activates dark tokens via `html:has(body.slds-color-scheme--dark)`, so the
 * class must land on the iframe's <body>, not the manager chrome).
 *
 *   themeName  → Lightning Blue | Cosmos  → swaps the SLDS 2 stylesheet <link>
 *   theme      → light | dark | system    → sets the slds-color-scheme--* body class
 */

const THEME_LINK_ID = 'slds2-theme';
const OVERLAY_LINK_ID = 'slds2-theme-overlay';

/** Ensure a managed <link> exists with the given id, appended after any prior one. */
function ensureLink(id) {
	let link = document.getElementById(id);
	if (!link) {
		link = document.createElement('link');
		link.id = id;
		link.rel = 'stylesheet';
		document.head.appendChild(link);
	}
	return link;
}

/**
 * Swap the managed <link> to the selected theme's base CSS, and apply/remove the
 * optional sub-theme overlay (Pearl layers on top of the Cosmos base). No flicker,
 * no duplicate links.
 */
function applyTheme(themeName) {
	const theme = THEMES[themeName] || THEMES[DEFAULT_THEME];

	const base = ensureLink(THEME_LINK_ID);
	if (base.getAttribute('href') !== theme.href) {
		base.setAttribute('href', theme.href);
	}

	if (theme.overlay) {
		// Append after the base link so the overlay wins the cascade.
		const overlay = ensureLink(OVERLAY_LINK_ID);
		if (overlay.getAttribute('href') !== theme.overlay) {
			overlay.setAttribute('href', theme.overlay);
		}
	} else {
		document.getElementById(OVERLAY_LINK_ID)?.remove();
	}
}

/** Toggle the SLDS color-scheme class on <body> (light | dark | system). */
function applyColorScheme(scheme) {
	const body = document.body;
	body.classList.remove(
		'slds-color-scheme--light',
		'slds-color-scheme--dark',
		'slds-color-scheme--system'
	);
	body.classList.add(`slds-color-scheme--${scheme || 'light'}`);
}

export const themeDecorator = (story, context) => {
	applyTheme(context.globals.themeName);
	applyColorScheme(context.globals.theme);
	return story();
};
