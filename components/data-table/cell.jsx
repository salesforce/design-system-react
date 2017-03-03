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

// ### classNames
import classNames from 'classnames';

// ## Constants
import { DATA_TABLE_CELL } from '../../utilities/constants';

/**
 * The default Cell renderer for the DataTable. Pass in any React component with the same `displayName` which takes the same props to provide custom rendering.
 */
const DataTableCell = (props) => {
	const childText = typeof props.children === 'object' ? props.children.props.children : props.children;
	const contents = (
		<div
			className={classNames({
				'slds-truncate': props.fixedLayout
			})}
			title={props.title || childText}
		>
			{props.children}
		</div>
	);

	let cell = (<td
		className={props.className}
		role={props.fixedLayout ? 'gridcell' : null}
		style={props.width ? { width: props.width } : null}
	>
		{contents}
	</td>);

	if (props.primaryColumn) {
		cell = (<th
			className={props.className}
			role={props.fixedLayout ? 'gridcell' : null}
			style={props.width ? { width: props.width } : null}
		>
			{contents}
		</th>);
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
	className: PropTypes.oneOfType([PropTypes.array, PropTypes.object, PropTypes.string]),
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
	width: PropTypes.string
};

module.exports = DataTableCell;
