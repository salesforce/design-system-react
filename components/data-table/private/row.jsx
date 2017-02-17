/*
Copyright (c) 2015, salesforce.com, inc. All rights reserved.

Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:
Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
Neither the name of salesforce.com, inc. nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

// ### React
import React from 'react';

// ### classNames
import classNames from 'classnames';

// ### find
import find from 'lodash.find';

// ## Children
import Checkbox from '../../forms/checkbox';

// ## Constants
import { DATA_TABLE_ROW, DATA_TABLE_ROW_ACTIONS, DATA_TABLE_CELL } from '../../../utilities/constants';

// Removes the need for `PropTypes`.
const { PropTypes } = React;

/**
 * Used internally, provides row rendering to the DataTable.
 */
const DataTableRow = React.createClass({
	// ### Display Name
	// Always use the canonical component name as the React display name.
	displayName: DATA_TABLE_ROW,

	// ### Prop Types
	propTypes: {
		/**
		 * Text for select row
		 */
		assistiveTextForSelectRow: PropTypes.string,
		canSelectRows: PropTypes.bool,
		columns: PropTypes.arrayOf(
			PropTypes.shape({
				Cell: PropTypes.func,
				props: PropTypes.object
			})
		),
		/**
		 * Use this if you are creating an advanced table (selectable, sortable, or resizable rows)
		 */
		fixedLayout: PropTypes.bool,
		id: PropTypes.string.isRequired,
		item: React.PropTypes.object.isRequired,
		onToggle: PropTypes.func,
		rowActions: PropTypes.element,
		selection: PropTypes.array
	},

	// ### Render
	render () {
		const isSelected = this.isSelected();

		// i18n
		return (
			<tr
				className={classNames({
					'slds-hint-parent': this.props.rowActions,
					'slds-is-selected': this.props.canSelectRows && isSelected
				})}
			>
				{this.props.canSelectRows ? (
					<td
						role={this.props.fixedLayout ? 'gridcell' : null}
						className="slds-text-align--right"
						data-label="Select Row"
						style={{ width: '3.25rem' }}
					>
						<Checkbox
							assistiveText={this.props.assistiveTextForSelectRow}
							checked={isSelected}
							id={`${this.props.id}-SelectRow`}
							name="SelectRow"
							onChange={this.handleToggle}
						/>
					</td>
				) : null}
				{this.props.columns.map((column, index) => {
					const Cell = column.Cell;

					return (
						<Cell
							{...column.props}
							className={column.props.truncate ? 'slds-truncate' : null}
							fixedLayout={this.props.fixedLayout}
							rowHeader={column.props.primaryColumn}
							id={`${this.props.id}-${DATA_TABLE_CELL}-${index}`}
							item={this.props.item}
							key={column.props.property}
							width={column.props.width}
						>
							{this.props.item[column.props.property]}
						</Cell>
					);
				})}
				{this.props.rowActions ?
					React.cloneElement(this.props.rowActions, {
						id: `${this.props.id}-${DATA_TABLE_ROW_ACTIONS}`,
						item: this.props.item
					}) : null
				}
			</tr>
		);
	},

	isSelected () {
		return !!find(this.props.selection, this.props.item);
	},

	handleToggle (selected, e) {
		return this.props.onToggle(this.props.item, selected, e);
	}
});

module.exports = DataTableRow;
