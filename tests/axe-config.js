/*
	A place to store aXe static markup config
 */

const axeConfig = {
	rules: [
		// Added due to autocomplete bug in browsers. Invalid value of "test" is passed into `autoComplete` intentionally.
		{
			id: 'aria-hidden-focus',
			enabled: false,
			selector: '#root',
		},
		{
			id: 'autocomplete-valid',
			enabled: false,
		},
		// .slds-combobox[aria-haspopup="dialog" is not currently supported by aXe-core
		// See issue https://github.com/dequelabs/axe-core/issues/1009
		{
			id: 'aria-required-children',
			enabled: false,
			selector: '.slds-combobox[aria-haspopup="dialog"]',
		},
		{
			id: 'color-contrast',
			enabled: false,
		},
		{
			id: 'html-has-lang',
			enabled: false,
		},
		{
			id: 'landmark-one-main',
			enabled: false,
		},
		{
			id: 'region',
			enabled: false,
		},
		// Exclude specific examples in Storybook Stories
		{
			id: 'duplicate-id',
			enabled: false,
			selector: '.div[data-ignore-axe-duplicate-id="true"]',
		},
		{
			id: 'duplicate-id-active',
			enabled: false,
			selector: '.div[data-ignore-axe-duplicate-id-active="true"]',
		},
		{
			id: 'duplicate-id-aria',
			enabled: false,
			selector: '.div[data-ignore-axe-duplicate-id-aria="true"]',
		},
	],
};

export default axeConfig;
