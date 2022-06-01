declare module '@salesforce/design-system-react/components/icon/button-icon' {
	import React from 'react';
	type Props = {
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
		 * Associates an icon button with another element on the page by changes the color of the SVG. Please reference <a href="http://www.lightningdesignsystem.com/components/buttons/#hint">Lightning Design System Buttons > Hint</a>.
		 */
		hint?: boolean;
		/**
		 * An SVG object to use instead of name / category, look in `design-system-react/icons` for examples
		 */
		icon?: Record<string, any>;
		/**
		 * Class names to be added to the SVG.
		 */
		className?: any[] | Record<string, any> | string;
		/**
		 * Setting `inverse` to true will switch the color of the icon: light to dark, dark to light.
		 */
		inverse?: boolean;
		/**
		 * Name of the icon. Visit <a href='http://www.lightningdesignsystem.com/resources/icons'>Lightning Design System Icons</a> to reference icon names.
		 */
		name?: string;
		/**
		 * Path to the icon. This will override any global icon settings.
		 */
		path?: string;
		/**
		 * Adds additional spacing on the opposite side specified between button icon and the button label
		 */
		position?: 'left' | 'right';
		/**
		 * Size of the icon. Visit [lightningdesignsystem.com/components/icons/#flavor-sizes](https://www.lightningdesignsystem.com/components/icons/#flavor-sizes)
		 */
		size?: 'x-small' | 'small' | 'medium' | 'large';
	};

	function Component(props: Props): JSX.Element;
	export default Component;
}
