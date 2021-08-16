declare module '@salesforce/design-system-react/components/data-table/private/header-cell' {
	import React from 'react';
	type Props = {
		assistiveText?: Partial<{
			actionsHeader?: string;
			columnSort?: string;
			columnSortedAscending?: string;
			columnSortedDescending?: string;
			selectAllRows?: string;
			selectRow?: string;
		}>;
		cellRef?: (v: any) => any;
		fixedHeader?: boolean;
		id: string /*.isRequired*/;
		/**
		 * Some columns, such as "date last viewed" or "date recently updated," should sort descending first, since that is what the user probably wants. How often does one want to see their oldest files first in a table? If sortable and the `DataTable`'s parent has not defined the sort order, then ascending (A at the top to Z at the bottom) is the default sort order on first click.
		 */
		isDefaultSortDescending?: boolean;
		/**
		 * Indicates if column is sorted.
		 */
		isSorted?: boolean;
		/**
		 * The column label.
		 */
		label?: string | React.ReactNode;
		/**
		 * The function to execute on sort.
		 */
		onSort?: (v: any) => any;
		/**
		 * The property which corresponds to this column.
		 */
		property?: string;
		/**
		 * Whether or not the column is sortable.
		 */
		sortable?: boolean;
		/**
		 * The current sort direction.
		 */
		sortDirection?: 'desc' | 'asc';
		/**
		 * Width of column. This is required for advanced/fixed layout tables. Please provide units. (`rems` are recommended)
		 */
		width?: string;
	};
	/**
	 * Used internally, renders each individual column heading.
	 */
	function Component(props: Props): JSX.Element;
	export default Component;
}
