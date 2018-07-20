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
	DATA_TABLE_ROW,
} from '../../utilities/constants';

// Safely get the length of an array, returning 0 for invalid input.
const count = (array) => (Array.isArray(array) ? array.length : 0);

const defaultProps = {
	assistiveText: {
		actionsHeader: 'Actions',
		columnSort: 'Sort by: ',
		columnSortedAscending: 'Sorted Ascending',
		columnSortedDescending: 'Sorted Descending',
		selectAllRows: 'Select all rows',
		selectRow: 'Select row',
	},
	id: shortid.generate(),
	selection: [],
};

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
		 * **Assistive text for accessibility.**
		 * This object is merged with the default props object on every render.
		 * * `actionsHeader`: Text for heading of actions column
		 * * `columnSort`: Text for sort action on table column header
		 * * `columnSortedAscending`: Text announced once a column is sorted in ascending order
		 * * `columnSortedDescending`: Text announced once a column is sorted in descending order
		 * * `selectAllRows`: Text for select all checkbox within the table header
		 * * `selectRow`: Text for select row
		 */
		assistiveText: PropTypes.shape({
			actionsHeader: PropTypes.string,
			columnSort: PropTypes.string,
			columnSortedAscending: PropTypes.string,
			columnSortedDescending: PropTypes.string,
			selectAllRows: PropTypes.string,
			selectRow: PropTypes.string,
		}),
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
		children: PropTypes.node,
		/**
		 * Class names to be added to the table.
		 */
		className: PropTypes.oneOfType([
			PropTypes.array,
			PropTypes.object,
			PropTypes.string,
		]),
		/**
		 * A variant which adds border to the vertical columns.
		 */
		columnBordered: PropTypes.bool,
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
		unbufferedCell: PropTypes.bool,
	},

	getDefaultProps () {
		return defaultProps;
	},

	componentWillMount () {
		// `checkProps` issues warnings to developers about properties (similar to React's built in development tools)
		checkProps(DATA_TABLE, this.props);
	},

	handleToggleAll (e, { checked }) {
		if (typeof this.props.onChange === 'function') {
			const selection = checked ? [...this.props.items] : [];

			this.props.onChange(selection, e);
		}
	},

	handleRowToggle (item, selected, e) {
		if (typeof this.props.onChange === 'function') {
			let selection;

			if (selected) {
				selection = [...this.props.selection, item];
			} else {
				selection = reject(this.props.selection, item);
			}

			this.props.onChange(selection, e);
		}
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
					dataTableProps: this.props,
				});
			} else if (
				child &&
				child.type.displayName === DataTableRowActions.displayName
			) {
				RowActions = child;
			}
		});

		const assistiveText = {
			...defaultProps.assistiveText,
			...this.props.assistiveText,
		};
		if (this.props.assistiveTextForActionsHeader) {
			assistiveText.actionsHeader = this.props.assistiveTextForActionsHeader;
		}
		if (this.props.assistiveTextForSelectAllRows) {
			assistiveText.selectAllRows = this.props.assistiveTextForSelectAllRows;
		}
		if (this.props.assistiveTextForColumnSortedAscending) {
			assistiveText.columnSortedAscending = this.props.assistiveTextForColumnSortedAscending;
		}
		if (this.props.assistiveTextForColumnSortedDescending) {
			assistiveText.columnSortedDescending = this.props.assistiveTextForColumnSortedDescending;
		}
		if (this.props.assistiveTextForColumnSort) {
			assistiveText.columnSort = this.props.assistiveTextForColumnSort;
		}
		if (this.props.assistiveTextForSelectRow) {
			assistiveText.selectRow = this.props.assistiveTextForSelectRow;
		}

		return (
			<table
				className={classNames(
					'slds-table',
					{
						'slds-table--fixed-layout': this.props.fixedLayout,
						'slds-table_resizable-cols': this.props.fixedLayout,
						'slds-table_bordered': !this.props.unborderedRow,
						'slds-table_cell-buffer':
							!this.props.fixedLayout && !this.props.unbufferedCell,
						'slds-max-medium-table_stacked': this.props.stacked,
						'slds-max-medium-table_stacked-horizontalviewports': this.props
							.stackedHorizontal,
						'slds-table_striped': this.props.striped,
						'slds-table_col-bordered': this.props.columnBordered,
						'slds-no-row-hover': this.props.noRowHover,
					},
					this.props.className
				)}
				id={this.props.id}
				role={this.props.fixedLayout ? 'grid' : null}
			>
				<DataTableHead
					assistiveText={assistiveText}
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
									assistiveText={assistiveText}
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
});

export default DataTable;
