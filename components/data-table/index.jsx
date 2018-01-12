/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

// # Data Table Component

// Implements the [Data Table design pattern](https://www.lightningdesignsystem.com/components/data-tables) in React.

// ## Dependencies

// ### React
import React from 'react';
import createReactClass from 'create-react-class';
import PropTypes from 'prop-types';

// ### shortid
// [npmjs.com/package/shortid](https://www.npmjs.com/package/shortid)
// shortid is a short, non-sequential, url-friendly, unique id generator
import shortid from 'shortid';

// ### classNames
import classNames from 'classnames';

// ### assign
import assign from 'lodash.assign';

// ### isFunction
import isFunction from 'lodash.isfunction';

// ### reject
import reject from 'lodash.reject';

// This component's `checkProps` which issues warnings to developers about properties when in development mode (similar to React's built in development tools)
import checkProps from './check-props';

// ## Children
import DataTableCell from './cell';
import DataTableColumn from './column';
import DataTableHead from './private/head';
import DataTableRow from './private/row';
import DataTableRowActions from './row-actions';

// ## Constants
import {
	DATA_TABLE,
	DATA_TABLE_CELL,
	DATA_TABLE_HEAD,
	DATA_TABLE_ROW
} from '../../utilities/constants';

// Safely get the length of an array, returning 0 for invalid input.
const count = (array) => (Array.isArray(array) ? array.length : 0);

/**
 * DataTables support the display of structured data in rows and columns with an HTML table. To sort, filter or paginate the table, simply update the data passed in the items to the table and it will re-render itself appropriately. The table will throw a sort event as needed, and helper components for paging and filtering are coming soon.
 *
 */
const DataTable = createReactClass({
	// ### Display Name
	// Always use the canonical component name as the React display name.
	displayName: DATA_TABLE,

	// ### Prop Types
	propTypes: {
		/**
		 * Text for heading of actions column
		 */
		assistiveTextForActionsHeader: PropTypes.string,
		/**
		 * Text for sort action on table column header
		 */
		assistiveTextForColumnSort: PropTypes.string,
		/**
		 * Text announced once a column is sorted in ascending order
		 */
		assistiveTextForColumnSortedAscending: PropTypes.string,
		/**
		 * Text announced once a column is sorted in descending order
		 */
		assistiveTextForColumnSortedDescending: PropTypes.string,
		/**
		 * Text for select all checkbox within the table header
		 */
		assistiveTextForSelectAllRows: PropTypes.string,
		/**
		 * Text for select row
		 */
		assistiveTextForSelectRow: PropTypes.string,
		/**
		 * Provide children of the type `<DataTableColumn />` to define the structure of the data being represented and children of the type `<DataTableRowActions />` to define a menu which will be rendered for each item in the grid. Use a _higher-order component_ to customize a data table cell that will override the default cell rendering. `CustomDataTableCell` must have the same `displayName` as `DataTableCell` or it will be ignored. If you want complete control of the HTML, including the wrapping `td`, you don't have to use `DataTableCell`.
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
		children: PropTypes.node,
		/**
		 * Class names to be added to the table.
		 */
		className: PropTypes.oneOfType([
			PropTypes.array,
			PropTypes.object,
			PropTypes.string
		]),
		/**
		 * A variant which adds border to the vertical columns.
		 */
		columnBordered: PropTypes.bool,
		/**
		 * A variant which decreases padding and allows more items and columns to be viewed.
		 */
		compact: PropTypes.bool,
		/**
		 * A unique ID is needed in order to support keyboard navigation and ARIA support.
		 */
		id: PropTypes.string,
		/**
		 * Use this if you are creating an advanced table (selectable, sortable, or resizable rows)
		 */
		fixedLayout: PropTypes.bool,
		/**
		 * The collection of items to render in the table.
		 */
		items: PropTypes.array.isRequired,
		/**
		 * A variant which removes hover style on rows
		 */
		noRowHover: PropTypes.bool,
		/**
		 * This function fires when the selection of rows changes.
		 */
		onChange: PropTypes.func,
		/**
		 * This function fires when the table should be sorted.
		 */
		onSort: PropTypes.func,
		/**
		 * The selected rows.
		 */
		selection: PropTypes.array,
		/**
		 * True if rows should be selectable.
		 */
		selectRows: PropTypes.bool,
		/**
		 * A variant which modifies table layout by stacking cells to accommodate smaller viewports. Should not be used at the same time as `stackedHorizontal`.
		 */
		stacked: PropTypes.bool,
		/**
		 * A variant which modifies table layout by displaying the header and row data side by side for smaller viewports. Should not be used at the same time as `stacked`.
		 */
		stackedHorizontal: PropTypes.bool,
		/**
		 * A variant which adds stripes to alternating rows.
		 */
		striped: PropTypes.bool,
		/**
		 * Tables have horizontal borders by default. This removes them.
		 */
		unborderedRow: PropTypes.bool,
		/**
		 * A variant which removes horizontal padding. CSS class will be removed if `fixedLayout==true`.
		 */
		unbufferedCell: PropTypes.bool
	},

	getDefaultProps () {
		return {
			assistiveTextForActionsHeader: 'Actions',
			assistiveTextForColumnSort: 'Sort',
			assistiveTextForColumnSortedAscending: 'Sorted Ascending',
			assistiveTextForColumnSortedDescending: 'Sorted Descending',
			assistiveTextForSelectAllRows: 'Select all rows',
			assistiveTextForSelectRow: 'Select row',
			id: shortid.generate(),
			selection: []
		};
	},

	componentWillMount () {
		// `checkProps` issues warnings to developers about properties (similar to React's built in development tools)
		checkProps(DATA_TABLE, this.props);
	},

	// ### Render
	render () {
		const numRows = count(this.props.items);
		const numSelected = count(this.props.selection);
		const canSelectRows = this.props.selectRows && numRows > 0;
		const allSelected = canSelectRows && numRows === numSelected;
		const indeterminateSelected =
			canSelectRows && numRows !== numSelected && numSelected !== 0;
		const columns = [];
		let RowActions = null;

		React.Children.forEach(this.props.children, (child) => {
			if (child && child.type.displayName === DataTableColumn.displayName) {
				const { children, ...columnProps } = child.props;

				const props = assign({}, this.props);
				delete props.children;
				assign(props, columnProps);

				let Cell;
				if (children && children.type.displayName === DATA_TABLE_CELL) {
					Cell = children.type;
					assign(props, children.props);
				} else {
					Cell = DataTableCell;
				}

				columns.push({
					Cell,
					props,
					dataTableProps: this.props
				});
			} else if (
				child &&
				child.type.displayName === DataTableRowActions.displayName
			) {
				RowActions = child;
			}
		});

		return (
			<table
				className={classNames(
					'slds-table',
					{
						'slds-table--compact': this.props.compact,
						'slds-table--fixed-layout': this.props.fixedLayout,
						'slds-table--bordered': !this.props.unborderedRow,
						'slds-table--cell-buffer':
							!this.props.fixedLayout && !this.props.unbufferedCell,
						'slds-max-medium-table--stacked': this.props.stacked,
						'slds-max-medium-table--stacked-horizontalviewports': this.props
							.stackedHorizontal,
						'slds-table--striped': this.props.striped,
						'slds-table--col-bordered': this.props.columnBordered,
						'slds-no-row-hover': this.props.noRowHover
					},
					this.props.className
				)}
				id={this.props.id}
				role={this.props.fixedLayout ? 'grid' : null}
			>
				<DataTableHead
					assistiveTextForActionsHeader={
						this.props.assistiveTextForActionsHeader
					}
					assistiveTextForSelectAllRows={
						this.props.assistiveTextForSelectAllRows
					}
					assistiveTextForColumnSortedAscending={
						this.props.assistiveTextForColumnSortedAscending
					}
					assistiveTextForColumnSortedDescending={
						this.props.assistiveTextForColumnSortedDescending
					}
					assistiveTextForColumnSort={this.props.assistiveTextForColumnSort}
					allSelected={allSelected}
					indeterminateSelected={indeterminateSelected}
					canSelectRows={canSelectRows}
					columns={columns}
					id={`${this.props.id}-${DATA_TABLE_HEAD}`}
					onToggleAll={this.handleToggleAll}
					onSort={this.props.onSort}
					showRowActions={!!RowActions}
				/>
				<tbody>
					{numRows > 0
						? this.props.items.map((item) => {
							const rowId =
									`${this.props.id}-${DATA_TABLE_ROW}-${item.id}` ||
									shortid.generate();
							return (
								<DataTableRow
									assistiveTextForSelectRow={
										this.props.assistiveTextForSelectRow
									}
									canSelectRows={canSelectRows}
									columns={columns}
									fixedLayout={this.props.fixedLayout}
									id={rowId}
									item={item}
									key={rowId}
									onToggle={this.handleRowToggle}
									selection={this.props.selection}
									rowActions={RowActions}
								/>
							);
						})
						: // Someday this should be an element to render when the table is empty
						null}
				</tbody>
			</table>
		);
	},

	handleToggleAll (selected, e) {
		if (isFunction(this.props.onChange)) {
			const selection = selected ? [...this.props.items] : [];

			this.props.onChange(selection, e);
		}
	},

	handleRowToggle (item, selected, e) {
		if (isFunction(this.props.onChange)) {
			let selection;

			if (selected) {
				selection = [...this.props.selection, item];
			} else {
				selection = reject(this.props.selection, item);
			}

			this.props.onChange(selection, e);
		}
	}
});

export default DataTable;
