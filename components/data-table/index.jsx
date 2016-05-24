/*
Copyright (c) 2015, salesforce.com, inc. All rights reserved.

Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:
Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
Neither the name of salesforce.com, inc. nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/
/* eslint-disable indent */

// # Data Table Component

// Implements the [Data Table design pattern](https://www.lightningdesignsystem.com/components/data-tables) in React.

// ## Dependencies

// ### React
import React from 'react';

// ### classNames
import classNames from 'classnames';

// ### isArray
import isArray from 'lodash.isarray';

// ### isFunction
import isFunction from 'lodash.isfunction';

// ### without
import reject from 'lodash.reject';

// This component's `checkProps` which issues warnings to developers about properties when in development mode (similar to React's built in development tools)
import checkProps from './check-props';

// ## Children
import DataTableCell from './cell';
import DataTableColumn from './column';
import DataTableHead from './head';
import DataTableRow from './row';
import DataTableRowActions from './row-actions';

// ## Constants
import { DATA_TABLE, DATA_TABLE_CELL } from '../../utilities/constants';

// Removes the need for `PropTypes`.
const { PropTypes } = React;

// Safely get the length of an array, returning 0 for invalid input.
const count = (array) => isArray(array) ? array.length : 0;

/**
 * DataTables support the display of structured data in rows and columns with an HTML table. To sort, filter or paginate the table, simply update the data passed in the items to the table and it will re-render itself appropriately. The table will throw a sort event as needed, and helper components for paging and filtering are coming soon.
 */
const DataTable = React.createClass({
	// ### Display Name
	// Always use the canonical component name as the React display name.
	displayName: DATA_TABLE,

	// ### Prop Types
	propTypes: {
		/**
		 * A variant which adds borders to the table.
		 */
		bordered: PropTypes.bool,
		/**
		 * Provide children of the type `<DataTableColumn />` to define the structure of the data being represented and children of the type `<DataTableRowActions />` to define a menu which will be rendered for each item in the grid. Custom `<DataTableCell />` implementations may also be passed in to override cell rendering.
		 * ```
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
		className: PropTypes.oneOfType([PropTypes.array, PropTypes.object, PropTypes.string]),
		/**
		 * Every table must have a unique ID in order to support keyboard navigation and ARIA support.
		 */
		id: PropTypes.string.isRequired,
    /**
 		 * The collection of items to render in the table.
 		 */
    items: PropTypes.array.isRequired,
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
		striped: PropTypes.bool
	},

	getDefaultProps () {
		return {
			bordered: false,
			selection: [],
			selectRows: false,
			stacked: false,
			stackedHorizontal: false,
			striped: false
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
		const columns = [];
		let RowActions = null;

		// Legacy Support
		if (isArray(this.props.columns)) {
			this.props.columns.forEach((column) => {
				columns.push({
					Cell: DataTableCell,
					props: {
						label: column.displayName,
						property: column.propertyName,
						sortable: column.sortable
					}
				});
			});
		}

		React.Children.forEach(this.props.children, (child) => {
			if (child && child.type === DataTableColumn) {
				const {
					children,
					...props
				} = child.props;

				let Cell;
				if (children && children.type.displayName === DATA_TABLE_CELL) {
					Cell = children.type;
				} else {
					Cell = DataTableCell;
				}

				columns.push({
					Cell,
					props
				});
			} else if (child && child.type === DataTableRowActions) {
				RowActions = child;
			}
		});

		return (
			<table
				className={classNames('slds-table', {
					'slds-table--bordered': this.props.bordered,
					'slds-max-medium-table--stacked': this.props.stacked,
					'slds-max-medium-table--stacked-horizontalviewports': this.props.stackedHorizontal,
					'slds-table--striped': this.props.striped
				}, this.props.className)}
			>
				<DataTableHead
					allSelected={allSelected}
					canSelectRows={canSelectRows}
					columns={columns}
					onToggleAll={this.handleToggleAll}
					onSort={this.props.onSort}
					showRowActions={!!RowActions}
				/>
				<tbody>
					{numRows > 0
						? this.props.items.map((item, index) => (
							<DataTableRow
								canSelectRows={canSelectRows}
								columns={columns}
								id={`${this.props.id}-${index}`}
								item={item}
								key={index}
								onToggle={this.handleRowToggle}
								selection={this.props.selection}
								rowActions={RowActions}
							/>
						))
						// Someday this should be an element to render when the table is empty
						: null
					}
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

module.exports = DataTable;
