declare module '@salesforce/design-system-react/components/icon/input-icon' {
	import React from 'react';
	type Props = {
		/**
		 * Icon category from [lightningdesignsystem.com/icons/](https://www.lightningdesignsystem.com/icons/)
		 */
		category?: string;
		/**
		 * This is only needed if an input contains two icons, the Input component handles this prop for you.
		 */
		iconPosition?: 'left' | 'right';
		/**
		 * Name of the icon. Visit <a href='http://www.lightningdesignsystem.com/resources/icons'>Lightning Design System Icons</a> to reference icon names.
		 */
		name?: string;
		/**
		 * Path to the icon. This will override any global icon settings.
		 */
		path?: string;
		/**
		 * This event fires when the icon is clicked.
		 */
		onClick?: (v: any) => any;
		/**
		 * Changes styles of the InputIcon.
		 */
		variant?: 'base' | 'combobox';
	};

	function Component(props: Props): JSX.Element;
	export default Component;
}
