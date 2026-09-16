/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

import React, { useContext, ReactNode } from 'react';
import classNames from 'classnames';

import CellContext from './private/cell-context';
import TableContext from './private/table-context';
import useContextHelper from './private/context-helper';

import { DATA_TABLE_CELL } from '../../utilities/constants';

export interface DataTableCellProps {
	/** The contents of the cell */
	children?: ReactNode;
	/** Class names to be added to the cell */
	className?: string | string[] | Record<string, boolean>;
	/** Use this for advanced table (selectable, sortable, or resizable rows) */
	fixedLayout?: boolean;
	/** The item from the items which represents this row */
	item?: Record<string, unknown>;
	/** The primary column for a row. This is almost always the first column. */
	primaryColumn?: boolean;
	/** The property of this item to display */
	property?: string;
	/** Shows on hover. Useful for truncated cells. */
	title?: string;
	/** Width of column. Required for advanced/fixed layout tables. */
	width?: string;
	/** Data label for stacked layout */
	label?: string;
	/** Header ID for accessibility */
	headerId?: string;
}

/**
 * The default Cell renderer for the DataTable. Pass in any React component
 * with the same `displayName` which takes the same props to provide custom rendering.
 */
const DataTableCell: React.FC<DataTableCellProps> = (props) => {
	const tableContext = useContext(TableContext);
	const cellContext = useContext(CellContext);
	const { tabIndex, hasFocus, handleFocus, handleKeyDown } = useContextHelper(
		tableContext,
		cellContext,
		props.fixedLayout
	);

	const childText = React.isValidElement(props.children)
		? (props.children.props as { children?: string }).children
		: props.children;

	const contents = (
		<div
			className={classNames({
				'slds-truncate': props.fixedLayout,
			})}
			title={props.title || (typeof childText === 'string' ? childText : undefined)}
		>
			{props.children}
		</div>
	);

	const className = classNames(props.className, {
		'slds-has-focus': hasFocus,
	});

	const ref = (node: HTMLTableCellElement | null) => {
		if (node && hasFocus) {
			node.focus();
		}
	};

	if (props.primaryColumn) {
		return (
			<th
				className={className}
				ref={ref}
				data-label={props.label}
				role={props.fixedLayout ? 'gridcell' : undefined}
				tabIndex={tabIndex}
				style={props.width ? { width: props.width } : undefined}
				onFocus={handleFocus}
				onKeyDown={handleKeyDown}
			>
				{contents}
			</th>
		);
	}

	return (
		<td
			className={className}
			data-label={props.label}
			onFocus={handleFocus}
			onKeyDown={handleKeyDown}
			ref={ref}
			role={props.fixedLayout ? 'gridcell' : undefined}
			style={props.width ? { width: props.width } : undefined}
			tabIndex={tabIndex}
			headers={props.headerId}
		>
			{contents}
		</td>
	);
};

DataTableCell.displayName = DATA_TABLE_CELL;

export default DataTableCell;
