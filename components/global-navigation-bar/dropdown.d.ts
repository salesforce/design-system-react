declare module '@salesforce/design-system-react/components/global-navigation-bar/dropdown' {
	import React from 'react';
	type Props = {
		/**
		 * Whether the item is active or not.
		 */
		active?: boolean;
		/**
		 * Allows alignment of active item with active application background color.
		 */
		activeBackgroundColor?: string;
		/**
		 * **Assistive text for accessibility.**
		 * This object is merged with the default props object on every render.
		 * * `icon`: Text that is visually hidden but read aloud by screenreaders to tell the user what the icon means. If the button has an icon and a visible label, you can omit the <code>assistiveText.icon</code> prop and use the <code>label</code> prop.
		 */
		assistiveText?: Partial<{
			icon?: string;
		}>;
		/**
		 * Aligns the right or left side of the menu with the respective side of the trigger. This is not intended for use with `nubbinPosition`.
		 */
		align?: 'left' | 'right';
		/**
		 * Extra classnames to apply to the dropdown menu.
		 */
		className?: string;
		/**
		 * Determines position of separating bar.
		 */
		dividerPosition?: 'left' | 'right';
		/**
		 * CSS classes to be added to `li` element.
		 */
		buttonClassName?: any[] | Record<string, any> | string;
		/**
		 * A unique ID is needed in order to support keyboard navigation, ARIA support, and connect the dropdown to the triggering button.
		 */
		id?: string;
		/**
		 * Provided to List to indicate number of items visible in the List. Pass `null` to display all items, or a string containing one of the numeric option values listed under [Dropdown Height](https://www.lightningdesignsystem.com/components/menus/#flavor-dropdown-height) at the right (eg. '5').
		 */
		length?: null | '5' | '7' | '10';
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
