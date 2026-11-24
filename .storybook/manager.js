import { addons } from 'storybook/manager-api';
import { create } from 'storybook/theming';

addons.setConfig({
	// Keep the Storybook chrome (sidebar, toolbar, addon panel) light at all
	// times. Without a theme, Storybook follows the OS dark-mode setting. The
	// Color Scheme toolbar still switches the canvas (see preview-decorator.js).
	theme: create({
		base: 'light',
		// With no brandImage, Storybook renders brandTitle as HTML inside the
		// sidebar's home link, so "for" can be italic like the site's title. The
		// Salesforce cloud is drawn before it by .storybook/chrome/manager.css.
		brandTitle: '<span>Design System <i>for</i> React</span>',
		brandUrl: './',
	}),
	layoutCustomisations: {
		// Hide the addon panel on the Introduction landing page only; every
		// component story keeps the panel as the user last left it.
		showPanel: (state, defaultValue) =>
			state.storyId?.startsWith('introduction--') ? false : defaultValue,
	},
});
