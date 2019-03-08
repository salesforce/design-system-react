/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

// ### React
import React from 'react';
import PropTypes from 'prop-types';

// ### classNames
import classNames from 'classnames';

// ## Constants
import { DATA_TABLE_CELL } from '../../utilities/constants';

/**
 * The default Cell renderer for the DataTable. Pass in any React component with the same `displayName` which takes the same props to provide custom rendering.
 */
const DataTableCell = (props) => {
	const childText = React.isValidElement(props.children)
		? props.children.props.children
		: props.children;
	const contents = (
		<div
			className={classNames({
				'slds-truncate': props.fixedLayout,
			})}
			title={props.title || childText}
		>
			{props.children}
		</div>
	);

	let cell = (
		<td
			className={props.className}
			role={props.fixedLayout ? 'gridcell' : null}
			style={props.width ? { width: props.width } : null}
		>
			{contents}
		</td>
	);

	if (props.primaryColumn) {
		cell = (
			<th
				className={props.className}
				role={props.fixedLayout ? 'gridcell' : null}
				style={props.width ? { width: props.width } : null}
			>
				{contents}
			</th>
		);
	}

	return cell;
};

// ### Display Name
// Always use the canonical component name as the React display name.
DataTableCell.displayName = DATA_TABLE_CELL;

// ### Prop Types
DataTableCell.propTypes = {
	/**
	 * The contents of the cell. This can be simple text or DOM nodes. Equivalent to `props.item[props.property]`
	 */
	children: PropTypes.oneOfType([PropTypes.node, PropTypes.string]),
	/**
	 * Class names to be added to the cell.
	 */
	className: PropTypes.oneOfType([
		PropTypes.array,
		PropTypes.object,
		PropTypes.string,
	]),
	/**
	 * Use this if you are creating an advanced table (selectable, sortable, or resizable rows)
	 */
	fixedLayout: PropTypes.bool,
	/**
	 * The item from the items which represents this row.
	 */
	item: PropTypes.object,
	/**
	 * The primary column for a row. This is almost always the first column.
	 */
	primaryColumn: PropTypes.bool,
	/**
	 * The property of this item to display.
	 */
	property: PropTypes.string,
	/**
	 * Shows on hover. Useful for truncated cells.
	 */
	title: PropTypes.string,
	/**
	 * Width of column. This is required for advanced/fixed layout tables. Please provide units. (`rems` are recommended)
	 */
	width: PropTypes.string,
};

export default DataTableCell;
