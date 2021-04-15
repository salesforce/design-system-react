declare module '@salesforce/design-system-react/components/data-table/cell' {
	import React from 'react';
	type Props = {
		/**
		 * The contents of the cell. This can be simple text or DOM nodes. Equivalent to `props.item[props.property]`
		 */
		children?: React.ReactNode | string;
		/**
		 * Class names to be added to the cell.
		 */
		className?: any[] | Record<string, any> | string;
		/**
		 * Use this if you are creating an advanced table (selectable, sortable, or resizable rows)
		 */
		fixedLayout?: boolean;
		/**
		 * The item from the items which represents this row.
		 */
		item?: Record<string, any>;
		/**
		 * The primary column for a row. This is almost always the first column.
		 */
		primaryColumn?: boolean;
		/**
		 * The property of this item to display.
		 */
		property?: string;
		/**
		 * Shows on hover. Useful for truncated cells.
		 */
		title?: string;
		/**
		 * Width of column. This is required for advanced/fixed layout tables. Please provide units. (`rems` are recommended)
		 */
		width?: string;
	};

	function Component(props: Props): JSX.Element;
	export default Component;
}
