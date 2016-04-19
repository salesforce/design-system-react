/*
Copyright (c) 2015, salesforce.com, inc. All rights reserved.

Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:
Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
Neither the name of salesforce.com, inc. nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

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

// ### includes
import includes from 'lodash/collection/includes';

// ## Children

// ### Checkbox
import Checkbox from '../checkbox';

// Removes the need for `PropTypes`.
const { PropTypes } = React;

// The component name will be used as the `DisplayName` and exported along with
// the component itself.
export const COMPONENT = 'DataTableRow';

/**
 * Used internally, provides row rendering to the DataTable.
 */
const DataTableRow = React.createClass({
	// ### Display Name
	// Always use the canonical component name as the React display name.
	displayName: COMPONENT,

	// ### Prop Types
	propTypes: {
		canSelectRows: PropTypes.bool.isRequired,
		columns: PropTypes.arrayOf(
			PropTypes.shape({
				Cell: PropTypes.func,
				props: PropTypes.object
			})
		),
		id: PropTypes.string.isRequired,
		item: React.PropTypes.object.isRequired,
		onToggle: PropTypes.func.isRequired,
		rowActions: PropTypes.element,
		selection: PropTypes.array.isRequired
	},

	// ### Render
	render () {
		const isSelected = this.isSelected();

		return (
			<tr className={classNames('slds-hint-parent', { 'slds-is-selected': isSelected })}>
				{this.props.canSelectRows && (
					<td className="slds-cell-shrink" data-label="Select Row">
						<Checkbox
							assistiveText="Select Row"
							checked={isSelected}
							name="SelectRow"
							onChanged={this.handleToggle}
						/>
					</td>
				)}
				{this.props.columns.map((column) => {
					const Cell = column.Cell;

					return (
						<td className="slds-truncate" data-label={column.props.label} key={column.props.property}>
							<Cell
								{...column.props}
								item={this.props.item}
							/>
						</td>
					);
				})}
				{this.props.rowActions &&
					React.cloneElement(this.props.rowActions, {
						id: `${this.props.id}-DataTableRowActions`,
						item: this.props.item
					})
				}
			</tr>
		);
	},

	isSelected () {
		return includes(this.props.selection, this.props.item);
	},

	handleToggle (selected) {
		return this.props.onToggle(this.props.item, selected);
	}
});

export default DataTableRow;
