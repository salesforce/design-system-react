declare module '@salesforce/design-system-react/components/split-view/listbox' {
	import React from 'react';
	type Props = {
		/**
		 * **Assistive text for accessibility**
		 * * `list`: aria label for the list
		 * * `sort`
		 *    * `sortedBy`: Clickable sort header for the list.
		 *    * `descending`: Descending sorting.
		 *    * `ascending`: Ascending sorting.
		 */
		assistiveText?: Partial<{
			list?: string;
			sort?: Partial<{
				sortedBy?: string;
				descending?: string;
				ascending?: string;
			}>;
			unreadItem?: string;
		}>;
		/**
		 * CSS classes to be added to the parent `div` tag.
		 */
		className?: any[] | Record<string, any> | string;
		/**
		 * Event Callbacks
		 * * `onSelect`: Called when a list item is selected. Previously, this event was called when an item was focused. The UX pattern has changed and this event is now called on pressing enter or mouse click.
		 *    * event {object} List item click event
		 *    * Meta {object}
		 *       * selectedItems {array} List of selected items.
		 *       * item {object} Last selected item.
		 * * `onSort`: Called when the list is sorted.
		 *    * event {object} Sort click event
		 */
		events?: Partial<{
			onSelect: (v: any) => any /*.isRequired*/;
			onSort?: (v: any) => any;
		}>;
		/**
		 * HTML id for component.
		 */
		id?: string;
		/**
		 * **Text labels for internationalization**
		 * * `header`: This is the header of the list.
		 */
		labels?: Partial<{
			header?: string;
		}>;
		/**
		 * The direction of the sort arrow. Option are:
		 * * SORT_OPTIONS.UP: `up`
		 * * SORT_OPTIONS.DOWN: `down`
		 */
		sortDirection?: SORT_OPTIONS.UP | SORT_OPTIONS.DOWN;
		/**
		 * Allows multiple item to be selection
		 */
		multiple?: boolean;
		/**
		 * The list of items.
		 * It is recommended that you have a unique `id` for each item.
		 */
		options: any[] /*.isRequired*/;
		/**
		 * Accepts an array of item objects. For single selection, pass in an array of one object.
		 */
		selection?: any[];
		/**
		 * Accepts an array of item objects. For single unread, pass in an array of one object.
		 */
		unread?: any[];
		/**
		 * Custom list item template for the list item content. The select and unread functionality wraps the custom list item.
		 * This should be a React component that accepts props.
		 */
		listItem?: (v: any) => any;
	};
	/**
	 * The menu with the ARIA role of a listbox.
	 */
	function Component(props: Props): JSX.Element;
	export default Component;
}
