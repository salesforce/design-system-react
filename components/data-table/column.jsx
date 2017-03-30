/*
Copyright (c) 2015, salesforce.com, inc. All rights reserved.

Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:
Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
Neither the name of salesforce.com, inc. nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

// ### React
import React, { PropTypes } from 'react';

// ## Constants
import { DATA_TABLE_COLUMN } from '../../utilities/constants';

// extends is used below so that react-docgen can detect the component

/**
 * Columns define the structure of the data displayed in the DataTable.
 */
class DataTableColumn extends React.Component { }

// ### Display Name
// Always use the canonical component name as the React display name.
DataTableColumn.displayName = DATA_TABLE_COLUMN;

// ### Prop Types
DataTableColumn.propTypes = {
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
	children: React.PropTypes.element,
	/**
	 * The column label. If a `string` is not passed in, no `title` attribute will be rendered.
	 */
	label: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
	/**
	 * The primary column for a row. This is almost always the first column.
	 */
	primaryColumn: PropTypes.bool,
	/**
	 * The property which corresponds to this column.
	 */
	property: PropTypes.string,
	/**
	 * Whether or not the column is sortable.
	 */
	sortable: PropTypes.bool,
	/**
	 * The current sort direction. If left out the component will track this internally.
	 */
	sortDirection: PropTypes.oneOf(['desc', 'asc']),
	/**
	 * Title used for truncation div within the cell.
	 */
	title: PropTypes.string,
	/**
	 * Adds truncate to cell node.
	 */
	truncate: PropTypes.bool,
	/**
	 * Width of column. This is required for advanced/fixed layout tables. Please provide units. (`rems` are recommended)
	 */
	width: PropTypes.string
};

module.exports = DataTableColumn;
