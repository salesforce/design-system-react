import { addons } from 'storybook/manager-api';
import { themes } from 'storybook/theming';

addons.setConfig({
	// Keep the Storybook chrome (sidebar, toolbar, addon panel) light at all
	// times. Without a theme, Storybook follows the OS dark-mode setting. The
	// Color Scheme toolbar still switches the canvas (see preview-decorator.js).
	theme: themes.light,
	layoutCustomisations: {
		// Hide the addon panel on the Introduction landing page only; every
		// component story keeps the panel as the user last left it.
		showPanel: (state, defaultValue) =>
			state.storyId?.startsWith('introduction--') ? false : defaultValue,
	},
});
