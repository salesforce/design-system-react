declare module '@salesforce/design-system-react/components/data-table' {
	import React from 'react';
	interface DataItem {
		id: string /*.isRequired*/;
		classNameRow?: string;
	}
	type Props = {
		/**
		 * **Assistive text for accessibility.**
		 * This object is merged with the default props object on every render.
		 * * `actionsHeader`: Text for heading of actions column
		 * * `columnSort`: Text for sort action on table column header
		 * * `columnSortedAscending`: Text announced once a column is sorted in ascending order
		 * * `columnSortedDescending`: Text announced once a column is sorted in descending order
		 * * `selectAllRows`: Text for select all checkbox within the table header
		 * * `selectRow`: Text for select row. Default: "Select row 1"
		 * * `selectRowGroup`: This is an input group label and is attached to each checkbox or radio. Default is "Choose a row to select"
		 */
		assistiveText?: Partial<{
			actionsHeader?: string;
			columnSort?: string;
			columnSortedAscending?: string;
			columnSortedDescending?: string;
			selectAllRows?: string;
			selectRow?: string;
			selectRowGroup?: string;
		}>;
		/**
		 * Provide children of the type `<DataTableColumn />` to define the structure of the data being represented and children of the type `<DataTableRowActions />` to define a menu which will be rendered for each item in the grid. Use a _higher-order component_ to customize a data table cell that will override the default cell rendering. `CustomDataTableCell` must have the same `displayName` as `DataTableCell` or it will be ignored. If you want complete control of the HTML, including the wrapping `td`, you don't have to use `DataTableCell`.
		 * ```
		 * import DataTableCell from 'design-system-react/data-table/cell';
		 * const CustomDataTableCell = ({ children, ...props }) => (
		 *   <DataTableCell {...props} >
		 *   <a href="javascript:void(0);">{children}</a>
		 *   </DataTableCell>
		 * );
		 * CustomDataTableCell.displayName = DataTableCell.displayName;
		 *
		 * <DataTable>
		 *   <DataTableColumn />
		 *   <DataTableColumn>
		 *   <DataTableCustomCell />
		 *   </DataTableColumn>
		 *   <DataTableRowActions />
		 * </DataTable>
		 * ```
		 */
		children?: React.ReactNode;
		/**
		 * Class names to be added to the table.
		 */
		className?: any[] | Record<string, any> | string;
		/**
		 * A variant which adds border to the vertical columns.
		 */
		columnBordered?: boolean;
		/**
		 * Use this to enable fixed headers and scrolling columns / rows. Appearance / behavior is consistent only if used in combination with `fixedLayout`. Since scrolling is enabled, columns are not truncated unless a width is set. Due to `overflow:hidden` elements, any dialog components will need a separate render tree (portal) such as with `menuPosition: overflowBoundaryElement` in order to break out of the container.
		 */
		fixedHeader?: boolean;
		/**
		 * Use this if you are creating an advanced table (selectable, sortable, or resizable rows). Columns widths will be truncate based on width and DOM ancestors. See `fixedHeader` to enable horizontal and vertical scrolling.
		 */
		fixedLayout?: boolean;
		/**
		 * When fixedHeader is true, specifies whether there's more data to be loaded and displays a spinner at the bottom of the table if so.
		 */
		hasMore?: boolean,
		/**
		 * A unique ID is needed in order to support keyboard navigation and ARIA support.
		 */
		id?: string;
		/**
		 * Removes the header from the data table
		 */
		isHeadless?: boolean,
		/**
		 * The collection of items to render in the table. This is an array of objects with each object having keys that correspond with the  `property` prop of each `DataTableColumn`.
		 *
		 * Use the key `classNameRow` to add a custom class to the item's `<tr>` element.
		 */
		items?: DataItem[] /*.isRequired*/;
		/**
		 * Makes DataTable joinable with PageHeader by adding appropriate classes/styling
		 */
		joined?: boolean;
		/**
		 * A variant which removes hover style on rows
		 */
		noRowHover?: boolean;
		/**
		 * By default this function resizes the display headers when fixedHeader is `true`, but this behavior can be overridden. Passes an event and a data object with properties `headerRefs`, an array of DOM nodes referencing the `thead th` elements and `scrollerRef`, a DOM node referencing `.slds-table_header-fixed_scroller`
		 */
		onFixedHeaderResize?: (
			e: any,
			opts: {
				headerRefs: HTMLDivElement[];
				scrollerRef: HTMLDivElement;
			}
		) => any;
		/**
		 * This function fires when the selection of rows changes. This component passes in `event, { selection }` to the function. `selection` is an array of objects from the `items` prop.
		 *
		 * This used to be `onChange` which is deprecated now, so that the parameters can be consistent with other components. `onChange` passed in the selection first and the event wtihout a data object.
		 */
		onRowChange?: (e: any, item: { selection: DataItem }) => any;
		/**
		 * This function fires when the table should be sorted.
		 */
		onSort?: (props: {
			sortDirection: 'asc' | 'desc';
			property: string;
		}) => any;
		/**
		 * By default this function attaches/detaches listeners for window resize and tbody scrolling when fixedHeader is `true`, but this behavior can be overridden. Passes an event and a data object with an `attach` boolean property to determine whether listeners should be attached, a `resizeHandler` function property that can be called as-needed, and a `scrollerRef` DOM node property that serves as a reference to `.slds-table_header-fixed_scroller`
		 */
		onToggleFixedHeaderListeners?: (
			e: any,
			opts: {
				attach: boolean;
				resizeHandler: (e: any) => void;
				scrollerRef: HTMLDivElement;
			}
		) => any;
		/**
		 * An array of objects of selected rows. See `items` prop for shape of objects.
		 */
		selection?: Record<string, any>[];
		/**
		 * Specifies a row selection UX pattern.
		 * * `checkbox`: Multiple row selection.
		 * * `radio`: _Required_ single row selection.
		 * _This prop used to be a `boolean`, a `true` value will be considered `checkbox` for backwards compatibility._
		 */
		selectRows?: boolean | 'checkbox' | 'radio';
		/**
		 * A variant which modifies table layout by stacking cells to accommodate smaller viewports. Should not be used at the same time as `stackedHorizontal`.
		 */
		stacked?: boolean;
		/**
		 * A variant which modifies table layout by displaying the header and row data side by side for smaller viewports. Should not be used at the same time as `stacked`.
		 */
		stackedHorizontal?: boolean;
		/**
		 * A variant which adds stripes to alternating rows.
		 */
		striped?: boolean;
		/**
		 * Custom styles to be passed to the table.
		 * NOTE: for horizontal scrolling in `fixedHeader`-enabled DataTables, apply a `minWidth` style here. If the containing element width is less than the `minWidth` value, horizontal scrolling will occur
		 */
		style?: Record<string, any>;
		/**
		 * Tables have horizontal borders by default. This removes them.
		 */
		unborderedRow?: boolean;
		/**
		 * A variant which removes horizontal padding. CSS class will be removed if `fixedLayout==true`.
		 */
		unbufferedCell?: boolean;
	};
	/**
	 * DataTables support the display of structured data in rows and columns with an HTML table. To sort, filter or paginate the table, simply update the data passed in the items to the table and it will re-render itself appropriately. The table will throw a sort event as needed, and helper components for paging and filtering are coming soon.
	 *
	 * NOTE: for horizontal scrolling with `fixedHeader`-enabled DataTables, see the `style` property description
	 */
	function Component(props: Props): JSX.Element;
	export default Component;
}
