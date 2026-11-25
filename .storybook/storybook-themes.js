import { create } from 'storybook/theming';

// Storybook UI themes for the light and dark Color Scheme toolbar values.
// Shared by the manager chrome (manager.js) and the docs pages (preview.js),
// so the sidebar, toolbar, addon panel and docs blocks all match the canvas.

const brand = {
	// With no brandImage, Storybook renders brandTitle as HTML inside the
	// sidebar's home link, so "for" can be italic like the site's title. The
	// Salesforce cloud is drawn before it by .storybook/chrome/manager.css.
	brandTitle: '<span>Design System <i>for</i> React</span>',
	brandUrl: './',
};

export const lightTheme = create({ base: 'light', ...brand });

// Surfaces and text from the SLDS 2 dark tokens (surface-1/2, on-surface-1/2,
// accent-2/3, border-1), matching the canvas in dark mode.
export const darkTheme = create({
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
});

/** Whether a Color Scheme value (light, dark or system) resolves to dark. */
export const isDarkScheme = (scheme) =>
	scheme === 'dark' ||
	(scheme === 'system' &&
		window.matchMedia('(prefers-color-scheme: dark)').matches);
