import manifest from '../css/manifest.json';
import { THEMES, DEFAULT_THEME, DEFAULT_CSS_MODE } from './themes';

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
 *   cssMode    → monolith | modules | entry → bundled SLDS, or DSR css/ modules
 *                plus the modular theme file (see CSS_MODES in themes.js)
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

const MODULE_LINK_ATTR = 'data-dsr-css';

/** The css/ files a CSS mode loads, in cascade order (none for the monolith). */
function moduleHrefs(cssMode, fileName) {
	if (cssMode === 'entry') {
		const dir = /components\/([^/]+)\//.exec(fileName || '')?.[1];
		if (dir && manifest.entries[dir]) return [`/dsr/${manifest.entries[dir]}`];
	}
	if (cssMode === 'entry' || cssMode === 'modules') {
		return manifest.order.map((key) => `/dsr/${manifest.modules[key].path}`);
	}
	return [];
}

/**
 * Point the managed <link> at the selected theme's CSS, and apply/remove the
 * optional sub-theme overlay (Pearl layers on top of the Cosmos base). In the
 * module modes the css/ links go before it, in the order SLDS's bundled files
 * use (foundation and modules, then the theme). Links
 * are only replaced when the set changes, so there's no flicker.
 */
function applyTheme(themeName, cssMode, fileName) {
	const theme = THEMES[themeName] || THEMES[DEFAULT_THEME];
	const hrefs = moduleHrefs(cssMode || DEFAULT_CSS_MODE, fileName);

	const base = ensureLink(THEME_LINK_ID);
	const href = hrefs.length ? theme.themeHref : theme.href;
	if (base.getAttribute('href') !== href) {
		base.setAttribute('href', href);
	}

	const current = [...document.querySelectorAll(`link[${MODULE_LINK_ATTR}]`)];
	if (current.map((l) => l.getAttribute('href')).join() !== hrefs.join()) {
		current.forEach((l) => l.remove());
		for (const moduleHref of hrefs) {
			const link = document.createElement('link');
			link.rel = 'stylesheet';
			link.href = moduleHref;
			link.setAttribute(MODULE_LINK_ATTR, '');
			base.before(link);
		}
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
	applyTheme(
		context.globals.themeName,
		context.globals.cssMode,
		context.parameters.fileName
	);
	applyColorScheme(context.globals.theme);
	return story();
};
