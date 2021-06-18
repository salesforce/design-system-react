declare module '@salesforce/design-system-react/components/global-header/dropdown' {
	import React from 'react';
	type Props = {
		/**
		 * Aligns the right or left side of the menu with the respective side of the trigger. This is not intended for use with `nubbinPosition`.
		 */
		align?: 'left' | 'right';
		/**
		 * Extra classnames to apply to the dropdown menu.
		 */
		className?: string;
		/**
		 * CSS classes to be added to `li` element.
		 */
		buttonClassName?: any[] | Record<string, any> | string;
		/**
		 * Name of the icon. Visit <a href="http://www.lightningdesignsystem.com/resources/icons">Lightning Design System Icons</a> to reference icon names.
		 */
		iconName?: string;
		/**
		 * For icon variants, please reference <a href="http://www.lightningdesignsystem.com/components/buttons/#icon">Lightning Design System Icons</a>.
		 */
		iconVariant?:
			| 'bare'
			| 'container'
			| 'border'
			| 'border-filled'
			| 'more'
			| 'global-header';
		/**
		 * A unique ID is needed in order to support keyboard navigation, ARIA support, and connect the dropdown to the triggering button.
		 */
		id?: string;
		/**
		 * Adds custom styling such as inverse fill and special sizing/spacing
		 */
		globalAction?: boolean;
		/**
		 * Positions dropdown menu with a nubbin--that is the arrow notch. The placement options correspond to the placement of the nubbin. This is implemeted with CSS classes and is best used with a `Button` with "icon container" styling. Dropdown menus will still be contained to the closest scrolling parent.
		 */
		nubbinPosition?:
			| 'top left'
			| 'top'
			| 'top right'
			| 'bottom left'
			| 'bottom'
			| 'bottom right';
		/**
		 *  Offset adds pixels to the absolutely positioned dropdown menu in the format: ([vertical]px [horizontal]px).
		 */
		offset?: string;
		/**
		 * Triggered when an item in the menu is clicked.
		 */
		onSelect?: (v: any) => any;
		/**
		 * An array of menu item.
		 */
		options: any[] /*.isRequired*/;
	};

	function Component(props: Props): JSX.Element;
	export default Component;
}
