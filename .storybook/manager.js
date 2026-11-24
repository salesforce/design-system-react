import { addons } from 'storybook/manager-api';
import { GLOBALS_UPDATED, SET_GLOBALS } from 'storybook/internal/core-events';
import { darkTheme, isDarkScheme, lightTheme } from './storybook-themes';

// The Storybook chrome (sidebar, toolbar, addon panel) follows the canvas's
// Color Scheme toolbar global (light, dark or system; see preview.js), not
// Storybook's own OS-based default.

const osDark = window.matchMedia('(prefers-color-scheme: dark)');
let scheme = 'light';
let applied;

const apply = () => {
	const mode = isDarkScheme(scheme) ? 'dark' : 'light';
	// manager.css reads this for its own light/dark colors.
	document.documentElement.dataset.dsrScheme = scheme;
	if (mode !== applied) {
		applied = mode;
		addons.setConfig({ theme: mode === 'dark' ? darkTheme : lightTheme });
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
