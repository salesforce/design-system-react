declare module '@salesforce/design-system-react/components/utilities/menu-list' {
	import React from 'react';
	type Props = {
		/**
		 * Determines whether or not to show a checkmark for selected items.
		 */
		checkmark?: boolean;
		/**
		 * CSS classes to be added to `<ul />`.
		 */
		className?: string;
		/**
		 * Used internally to determine the id that will be used for list items.
		 */
		getListItemId?: (v: any) => any;
		/**
		 * Used internally to pass references to the individual menu items back up for focusing / scrolling.
		 */
		itemRefs?: (v: any) => any;
		/**
		 * If provided, this function will be used to render the contents of each menu item.
		 */
		itemRenderer?: (v: any) => any;
		/**
		 * Sets the height of the list based on the numeber of items.
		 */
		length?: null | '5' | '7' | '10' | 5 | 7 | 10;
		/**
		 * Triggered when a list item is selected (via mouse or keyboard).
		 */
		onSelect?: (v: any) => any;
		/**
		 * An array of items to render in the list.
		 */
		options?: any[];
		/**
		 * The index of the currently selected item in the list.
		 */
		selectedIndex?: number;
		/**
		 * Accepts a `Tooltip` component to be used as the template for menu item tooltips that appear via the `tooltipContent` options object attribute
		 */
		tooltipMenuItem?: React.ReactNode;
		/**
		 * The id of the element which triggered this list (in a menu context).
		 */
		triggerId?: string;
	};
	/**
	 * Component description.
	 */
	function Component(props: Props): JSX.Element;
	export default Component;
}
