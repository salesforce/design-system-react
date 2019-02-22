/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

// ### React
import React from 'react';
import PropTypes from 'prop-types';

// ### classNames
import classNames from 'classnames';

import CellContext from './private/cell-context';

// ## Constants
import { DATA_TABLE_CELL } from '../../utilities/constants';

const isActive = (props) => props.activeCell.rowIndex === props.rowIndex && props.activeCell.columnIndex === props.columnIndex

const hasFocus = (props) => props.tableHasFocus && isActive(props);

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

	const className = classNames(props.className, {
		'slds-has-focus': hasFocus(props)
	});
	const cellContext = {
		rowIndex: props.rowIndex,
		columnIndex: props.columnIndex,
		activeElement: props.activeElement,
		mode: props.mode,
		changeActiveElement: props.changeActiveElement,
		registerInteractiveElement: props.registerInteractiveElement
	};
	const tabIndex = isActive(props) && !props.activeElement ? '0' : undefined;
	let cell = (
		// eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
		<td
			className={className}
			ref={(node) => {
				if (node && hasFocus(props)) {
					node.focus();
				}
			}}
			role={props.fixedLayout ? 'gridcell' : null }
			tabIndex={tabIndex}
			style={props.width ? { width: props.width } : null}
			onFocus={() => props.changeActiveCell(props.rowIndex, props.columnIndex)}
			onKeyDown={(event) => props.handleKeyDown(event)}
		>
			<CellContext.Provider value={cellContext}>
				{contents}
			</CellContext.Provider>
		</td>
	);

	if (props.primaryColumn) {
		cell = (
			<th
				className={className}
				ref={(node) => {
					if (node && hasFocus(props)) {
						node.focus();
					}
				}}
				role={props.fixedLayout ? 'gridcell' : null}
				tabIndex={tabIndex}
				style={props.width ? { width: props.width } : null}
				onFocus={() => props.changeActiveCell(props.rowIndex, props.columnIndex)}
				onKeyDown={(event) => props.handleKeyDown(event)}
			>
				<CellContext.Provider value={cellContext}>
					{contents}
				</CellContext.Provider>
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
