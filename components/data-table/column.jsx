/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

// ### React
import React from 'react';
import PropTypes from 'prop-types';

// ## Constants
import { DATA_TABLE_COLUMN } from '../../utilities/constants';

// extends is used below so that react-docgen can detect the component

/**
 * Columns define the structure of the data displayed in the DataTable.
 */
class DataTableColumn extends React.Component {}

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
	children: PropTypes.element,
	/**
	 * Selects this column as the currently sorted column.
	 */
	isSorted: PropTypes.bool,
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
	 * The current sort direction. If left out the component will track this internally. Required if `isSorted` is true.
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
	width: PropTypes.string,
};

export default DataTableColumn;
