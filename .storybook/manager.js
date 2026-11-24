import { addons } from 'storybook/manager-api';
import { GLOBALS_UPDATED, SET_GLOBALS } from 'storybook/internal/core-events';
import { create } from 'storybook/theming';

// The Storybook chrome (sidebar, toolbar, addon panel) follows the canvas's
// Color Scheme toolbar global (light, dark or system; see preview.js), not
// Storybook's own OS-based default.
const brand = {
	// With no brandImage, Storybook renders brandTitle as HTML inside the
	// sidebar's home link, so "for" can be italic like the site's title. The
	// Salesforce cloud is drawn before it by .storybook/chrome/manager.css.
	brandTitle: '<span>Design System <i>for</i> React</span>',
	brandUrl: './',
};

const themes = {
	light: create({ base: 'light', ...brand }),
	// Surfaces and text from the SLDS 2 dark tokens, matching the canvas.
	dark: create({
		base: 'dark',
		...brand,
		appBg: '#242424',
		appContentBg: '#242424',
		appPreviewBg: '#242424',
		barBg: '#242424',
		appBorderColor: '#444',
		textColor: '#e5e5e5',
		textMutedColor: '#aeaeae',
		colorSecondary: '#7cb1fe',
		barSelectedColor: '#7cb1fe',
		barHoverColor: '#a8cbff',
		inputBg: '#181818',
		inputBorder: '#444',
		inputTextColor: '#e5e5e5',
	}),
};

const osDark = window.matchMedia('(prefers-color-scheme: dark)');
let scheme = 'light';
let applied;

const apply = () => {
	const mode =
		scheme === 'dark' || (scheme === 'system' && osDark.matches)
			? 'dark'
			: 'light';
	// manager.css reads this for its own light/dark colors.
	document.documentElement.dataset.dsrScheme = scheme;
	if (mode !== applied) {
		applied = mode;
		addons.setConfig({ theme: themes[mode] });
	}
};

const fromGlobals = ({ globals } = {}) => {
	scheme = globals?.theme || 'light';
	apply();
};

// The Color Scheme global can also come from the URL (&globals=theme:dark),
// so read it before the first paint rather than waiting for the preview.
const urlScheme = new URLSearchParams(window.location.search)
	.get('globals')
	?.match(/(?:^|;)theme:(light|dark|system)(?:;|$)/)?.[1];
if (urlScheme) scheme = urlScheme;

addons.setConfig({
	layoutCustomisations: {
		// Hide the addon panel on the Get started landing page only; every
		// component story keeps the panel as the user last left it.
		showPanel: (state, defaultValue) =>
			state.storyId?.startsWith('introduction--') ? false : defaultValue,
	},
});
apply();

addons.register('dsr/color-scheme', (api) => {
	api.on(SET_GLOBALS, fromGlobals);
	api.on(GLOBALS_UPDATED, fromGlobals);
	osDark.addEventListener('change', apply);
});
