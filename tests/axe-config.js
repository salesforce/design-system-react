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
		// Not in ARIA 1.2 spec, temporary for SLDS styles
		{
			id: 'aria-required-attr',
			enabled: false,
			selector: '.slds-combobox',
		},
		// Not in ARIA 1.2 spec, temporary for SLDS styles
		{
			id: 'aria-required-children',
			enabled: false,
			selector: '.slds-combobox',
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
		// TODO: Re-enable
		{ id: 'aria-input-field-name', enabled: false },
		{ id: 'scrollable-region-focusable', enabled: false },
	],
};

export default axeConfig;
