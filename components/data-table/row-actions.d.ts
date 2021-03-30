declare module '@salesforce/design-system-react/components/data-table/row-actions' {
	import React from 'react';
	type Props = {
		/**
		 * Description of the menu for screenreaders.
		 */
		assistiveText?: Record<string, any>;
		/**
		 * Class names to be added to the actions menu.
		 */
		className?: string;
		/**
		 * HTML ID to be added to the actions menu.
		 */
		id?: string;
		/**
		 * `DataTable` row item
		 */
		item?: Record<string, any>;
		/**
		 * Disable hint styling which changes the color of the dropdown svg on hover over.
		 */
		noHint?: boolean;
		/**
		 * Triggered when an item is selected.
		 */
		onAction?: (v: any) => any;
		/**
		 * `Dropdown` options. See `Dropdown`.
		 */
		options?: any[];
		/**
		 * A [Dropdown](http://react.lightningdesignsystem.com/components/dropdown-menus/) component. The props from this drop will be merged and override any default props.
		 * **Note:** onAction will not be overridden, both `DropDown`'s onSelect(dropDownActionOption) and onAction(rowItem, dropdownActionOption) will be called with appropriate parameters
		 */
		dropdown?: React.ReactNode;
	};
	/**
	 * RowActions provide a mechanism for defining a menu to display alongside each row in the DataTable.
	 */
	function Component(props: Props): JSX.Element;
	export default Component;
}
