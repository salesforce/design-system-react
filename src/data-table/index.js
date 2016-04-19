/*
Copyright (c) 2015, salesforce.com, inc. All rights reserved.

Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:
Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
Neither the name of salesforce.com, inc. nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

// # Data Table Component --- SLDS for React

// Implements the [Data Table design pattern](https://www.lightningdesignsystem.com/components/data-tables) in React.

// [![Data Table component example screenshot](/assets/images/component-examples/data-table.png "Data Table component example screenshot")](/react/data-table)

// > See a [live example](/react/data-table) of the Data Table component in action

// ## Dependencies

// This component's `checkProps` which issues warnings to developers about properties when in development mode (similar to React's built in development tools)
import checkProps from './check-props';

// ### React
// React is an external dependency of the project.
import React from 'react';

// ### classNames
// [github.com/JedWatson/classnames](https://github.com/JedWatson/classnames)
// SLDS for React uses `classnames`, "a simple javascript utility for conditionally
// joining classNames together." Because of the small size of the library, the
// default build includes the entire library rather than requiring it as an
// external dependency.
import classNames from 'classnames';

// ### isArray
import isArray from 'lodash/lang/isArray';

// ### isFunction
import isFunction from 'lodash/lang/isFunction';

// ### without
import without from 'lodash/array/without';

// ## Children

// ### Cell
import DataTableCell, { COMPONENT as DataTableCellComponent } from './cell';

// ### Column
import DataTableColumn from './column';

// ### Head
import DataTableHead from './head';

// ### Row
import DataTableRow from './row';

// ### Actions
import DataTableRowActions from './row-actions';

// Removes the need for `PropTypes`.
const { PropTypes } = React;

// Safely get the length of an array, returning 0 for invalid input.
const count = (array) => isArray(array) ? array.length : 0;

// The component name will be used as the `DisplayName` and exported along with
// the component itself.
export const COMPONENT = 'DataTable';

/**
 * DataTables support the display of structured data in rows and columns with an HTML table. To sort, filter or paginate the table, simply update the data passed in the collection to the table and it will re-render itself appropriately. The table will throw a sort event as needed, and helper components for paging and filtering are coming soon.
 */
const DataTable = React.createClass({
	// ### Display Name
	// Always use the canonical component name as the React display name.
	displayName: COMPONENT,

	// ### Prop Types
	propTypes: {
		bordered: PropTypes.bool,
		/**
		 * Provide children of the type `<DataTableColumn />` to define the structure of the data being represented and children of the type `<DataTableRowActions />` to define a menu which will be rendered for each item in the grid.
		 */
		children: PropTypes.node,
		/**
		 * Class names to be added to the table.
		 */
		className: PropTypes.oneOfType([PropTypes.array, PropTypes.object, PropTypes.string]),
		collection: PropTypes.array.isRequired,
		/**
		 * End of Life. Please provide one or more children of the type `<DataTableColumn />` instead:
		 * ```
		 * <DataTable>
		 *   <DataTableColumn />
		 * </DataTable>
		 * ```
		 */
		columns: PropTypes.arrayOf(
			PropTypes.shape({
				propertyName: PropTypes.string,
				displayName: PropTypes.string,
				sortable: PropTypes.bool,
				sortDirection: PropTypes.oneOf(['desc', 'asc'])
			})
		),
		/**
		 * Every table must have a unique ID in order to support keyboard navigation and ARIA support.
		 */
		id: PropTypes.string.isRequired,
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
		stacked: PropTypes.bool,
		stackedHorizontal: PropTypes.bool,
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
		checkProps(COMPONENT, this.props);
	},

	// ### Render
	render () {
		const numRows = count(this.props.collection);
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
				if (children && children.type.displayName === DataTableCellComponent) {
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
					onSort={this.handleSort}
					showRowActions={!!RowActions}
				/>
				<tbody>
					{numRows &&
						this.props.collection.map((item, index) => (
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
					}
				</tbody>
			</table>
		);
	},

	handleToggleAll (selected) {
		if (isFunction(this.props.onChange)) {
			const selection = selected ? [...this.props.collection] : [];

			this.props.onChange(selection);
		}
	},

	handleRowToggle (item, selected) {
		if (isFunction(this.props.onChange)) {
			let selection;

			if (selected) {
				selection = [...this.props.selection, item];
			} else {
				selection = without(this.props.selection, item);
			}

			this.props.onChange(selection);
		}
	},

	handleSort (sortColumn) {
		if (isFunction(this.props.onSort)) {
			this.props.onSort(sortColumn, sortColumn.sortDirection === 'asc' ? 'desc' : 'asc');
		}
	}
});

export default DataTable;
