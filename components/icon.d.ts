declare module '@salesforce/design-system-react/components/icon' {
	import React from 'react';
	type Props = {
		/**
		 * **Assistive text for accessibility.**
		 * This object is merged with the default props object on every render.
		 * * `label`: Text that is visually hidden but read aloud by screenreaders to tell the user what the icon means. Naked icons must have assistive text, however, if you also have visible descriptive text with the icon, declare this prop as <code>assistiveText=''</code>.
		 */
		assistiveText?: Partial<{
			label?: string;
		}>;
		/**
		 * Icon category from [lightningdesignsystem.com/icons/](https://www.lightningdesignsystem.com/icons/)
		 */
		category?:
			| 'action'
			| 'custom'
			| 'doctype'
			| 'standard'
			| 'utility' /*.isRequired*/;
		/**
		 * CSS classes that are applied to the SVG.
		 */
		className?: any[] | Record<string, any> | string;
		/**
		 * CSS classes that are applied to the span.
		 */
		containerClassName?: any[] | Record<string, any> | string;
		/**
		 * Styles that are applied to the span.
		 */
		containerStyle?: Record<string, any>;
		/**
		 * Icon color variants
		 */
		colorVariant?: 'base' | 'default' | 'success' | 'error' | 'light' | 'warning';
		/**
		 * A custom SVG object to use instead of the supplied SLDS icons, look in `design-system-react/icons` for examples and syntax.
		 */
		icon?: Record<string, any>;
		/**
		 * Setting `inverse` to true will switch the color of the icon: light to dark, dark to light.
		 */
		inverse?: boolean;
		/**
		 * Name of the icon. Visit <a href='http://www.lightningdesignsystem.com/resources/icons'>Lightning Design System Icons</a> to reference icon names.
		 */
		name?: string;
		/**
		 * Path to the icon. This will override any global icon settings
		 */
		path?: string;
		/**
		 * Background theme color for the icon. **Only compatible with icon category `standard`**
		 */
		productTheme?:
			| 'global-setup'
			| 'service-cloud'
			| 'industry-cloud'
			| 'sales-cloud'
			| 'commerce-cloud'
			| 'community-cloud'
			| 'marketing-cloud'
			| 'quip';
		/**
		 * Size of the icon. Visit [lightningdesignsystem.com/components/icons/#flavor-sizes](https://www.lightningdesignsystem.com/components/icons/#flavor-sizes)
		 */
		size?: 'xx-small' | 'x-small' | 'small' | 'medium' | 'large';
		/**
		 * Custom styles to be passed to the SVG. Could be used to change icon or background color.
		 */
		style?: Record<string, any>;
		/**
		 * Title attribute for the icon container
		 */
		title?: string;
	};

	function Component(props: Props): JSX.Element;
	export default Component;
}
