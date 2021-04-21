declare module '@salesforce/design-system-react/components/data-table/column' {
	import React from 'react';
	type Props = {
		/**
		 * Use a _higher-order component_ to customize a data table cell that will override the default cell rendering. `CustomDataTableCell` must have the same `displayName` as `DataTableCell` or it will be ignored. If you want complete control of the HTML, including the wrapping `td`, you don't have to use `DataTableCell`.
		 * ```
		 * import DataTableCell from 'design-system-react/data-table/cell';
		 * const CustomDataTableCell = ({ children, ...props }) => (
		 *   <DataTableCell {...props} >
		 *     <a href="javascript:void(0);">{children}</a>
		 *   </DataTableCell>
		 * );
		 * CustomDataTableCell.displayName = DataTableCell.displayName;
		 *
		 * <DataTable>
		 *   <DataTableColumn />
		 *   <DataTableColumn>
		 *     <DataTableCustomCell />
		 *   </DataTableColumn>
		 *   <DataTableRowActions />
		 * </DataTable>
		 * ```
		 */
		children?: React.ReactElement;
		/**
		 * Some columns, such as "date last viewed" or "date recently updated," should sort descending first, since that is what the user probably wants. How often does one want to see their oldest files first in a table? If sortable and the `DataTable`'s parent has not defined the sort order, then ascending (A at the top to Z at the bottom) is the default sort order on first click.
		 */
		isDefaultSortDescending?: boolean;
		/**
		 * Selects this column as the currently sorted column.
		 */
		isSorted?: boolean;
		/**
		 * The column label. If a `string` is not passed in, no `title` attribute will be rendered.
		 */
		label?: string | React.ReactNode;
		/**
		 * The primary column for a row. This is almost always the first column.
		 */
		primaryColumn?: boolean;
		/**
		 * The property which corresponds to this column.
		 */
		property?: string;
		/**
		 * Whether or not the column is sortable.
		 */
		sortable?: boolean;
		/**
		 * The current sort direction. If left out the component will track this internally. Required if `isSorted` is true.
		 */
		sortDirection?: 'desc' | 'asc';
		/**
		 * Title used for truncation div within the cell.
		 */
		title?: string;
		/**
		 * Adds truncate to cell node.
		 */
		truncate?: boolean;
		/**
		 * Width of column. This is required for advanced/fixed layout tables. Please provide units. (`rems` are recommended)
		 */
		width?: string;
	};
	// extends is used below so that react-docgen can detect the component

	/**
	 * Columns define the structure of the data displayed in the DataTable.
	 */
	function Component(props: Props): JSX.Element;
	export default Component;
}
