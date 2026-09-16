/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

import React, { ReactNode } from 'react';
import { DATA_TABLE_COLUMN } from '../../utilities/constants';

export interface DataTableColumnProps {
	/**
	 * Use a _higher-order component_ to customize a data table cell that will
	 * override the default cell rendering. `CustomDataTableCell` must have the
	 * same `displayName` as `DataTableCell` or it will be ignored.
	 */
	children?: ReactNode;
	/**
	 * Some columns should sort descending first (e.g., "date last viewed").
	 * If sortable and the parent has not defined sort order, ascending is default.
	 */
	isDefaultSortDescending?: boolean;
	/**
	 * Selects this column as the currently sorted column.
	 */
	isSorted?: boolean;
	/**
	 * The column label. If a `string` is not passed in, no `title` attribute
	 * will be rendered.
	 */
	label?: string | ReactNode;
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
	 * The current sort direction. Required if `isSorted` is true.
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
	 * Width of column. Required for advanced/fixed layout tables.
	 * Please provide units (`rems` are recommended).
	 */
	width?: string;
}

/**
 * Columns define the structure of the data displayed in the DataTable.
 * This component doesn't render anything - it's used for configuration.
 */
const DataTableColumn: React.FC<DataTableColumnProps> = () => {
	// This component doesn't render anything.
	// It's used as a configuration element parsed by DataTable.
	return null;
};

DataTableColumn.displayName = DATA_TABLE_COLUMN;

export default DataTableColumn;
