/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

/* eslint-disable react/no-unused-prop-types */
/* deepscan-disable REACT_USELESS_PROP_TYPES */

// ### React
import React from 'react';
import PropTypes from 'prop-types';

import Icon from '../icon';
import Button from '../button';

// ## Constants
import { TREE_GRID_COLUMN } from '../../utilities/constants';

/**
 * Columns define the structure of the data displayed in the DataTable.
 */
const TreeGridColumn = (props) => (
	<th
		aria-label={props.label}
		aria-sort="none"
		className="slds-has-button-menu slds-is-resizable slds-is-sortable"
		scope="col"
		style={{
			width: props.initialWidth ? props.initialWidth : 'auto',
		}}
	>
		<a
			className="slds-th__action slds-text-link_reset"
			href="javascript:void(0);"
			role="button"
			tabIndex="-1"
		>
			<span className="slds-assistive-text">{props.assistiveText.sortBy}</span>
			<div className="slds-grid slds-grid_vertical-align-center slds-has-flexi-truncate">
				<span className="slds-truncate" title={props.title}>
					{props.label}
				</span>
				<Icon
					category="utility"
					name="arrowdown"
					className="slds-is-sortable__icon"
				/>
			</div>
		</a>
		<Button
			variant="base"
			className="slds-th__action-button"
			iconSize="small"
			iconCategory="utility"
			iconName="chevrondown"
			assistiveText={{
				icon: `Show ${props.label} column actions`,
			}}
		/>
		<div className="slds-resizable">
			<input
				type="range"
				aria-label={`${props.label} column width`}
				className="slds-resizable__input slds-assistive-text"
				max="1000"
				min="20"
				tabIndex="-1"
			/>
			<span className="slds-resizable__handle">
				<span className="slds-resizable__divider" />
			</span>
		</div>
	</th>
);

TreeGridColumn.displayName = TREE_GRID_COLUMN;

TreeGridColumn.defaultProps = {
	assistiveText: PropTypes.shape({
		sortBy: 'Sort By: ',
	}),
};

TreeGridColumn.propTypes = {
	assistiveText: PropTypes.shape({
		sortBy: PropTypes.string,
	}),
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
	 * Some columns, such as "date last viewed" or "date recently updated," should sort descending first, since that is what the user probably wants. How often does one want to see their oldest files first in a table? If sortable and the `DataTable`'s parent has not defined the sort order, then ascending (A at the top to Z at the bottom) is the default sort order on first click.
	 */
	isDefaultSortDescending: PropTypes.bool,
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

export default TreeGridColumn;
