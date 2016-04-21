/*
Copyright (c) 2015, salesforce.com, inc. All rights reserved.

Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:
Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
Neither the name of salesforce.com, inc. nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/
/* eslint-disable indent */

// ### React
import React from 'react';

// ### classNames
import classNames from 'classnames';

// ## Children

// ### Button
import Button from '../SLDSButton';

// ### Checkbox
import Checkbox from '../checkbox';

// Removes the need for `PropTypes`.
const { PropTypes } = React;

// The component name will be used as the `DisplayName` and exported along with
// the component itself.
export const COMPONENT = 'DataTableHead';

/**
 * Used internally, provides header row rendering to the DataTable.
 */
const DataTableHead = React.createClass({
	// ### Display Name
	// Always use the canonical component name as the React display name.
	displayName: COMPONENT,

	// ### Prop Types
	propTypes: {
		allSelected: PropTypes.bool.isRequired,
		canSelectRows: PropTypes.bool.isRequired,
		columns: PropTypes.arrayOf(
			PropTypes.shape({
				Cell: PropTypes.func,
				props: PropTypes.object
			})
		),
		onToggleAll: PropTypes.func.isRequired,
		onSort: PropTypes.func.isRequired,
		showRowActions: PropTypes.bool.isRequired
	},

	// ### Render
	render () {
		return (
			<thead>
				<tr className="slds-text-heading--label">
					{this.props.canSelectRows && (
						<th className="slds-cell-shrink" scope="col">
							<Checkbox
								assistiveText="Select All"
								checked={this.props.allSelected}
								name="SelectAll"
								onChange={this.handleChange}
							/>
						</th>
					)}
					{this.props.columns.map((column, index) => {
						const {
							label,
							property,
							sortable,
							sortDirection
						} = column.props;

						return (
							<th
								scope="col"
								key={property}
								className={classNames({
									'slds-is-sortable': sortable
								})}
								onClick={this.getSortHandler(sortable, column.props, index)}
							>
								<div className="slds-truncate">{label}
									{sortable && (
										<Button
											assistiveText="Sort"
											iconCategory="utility"
											iconName={sortDirection === 'desc' ? 'arrowdown' : 'arrowup'}
											iconSize="small"
											iconVariant="bare"
											variant="base"
										/>
									)}
								</div>
							</th>
						);
					})}
					{this.props.showRowActions && <th className="slds-cell-shrink"></th>}
				</tr>
			</thead>
		);
	},

	handleChange () {
		this.props.onToggleAll(!this.props.allSelected);
	},

	getSortHandler (sortable, props, index) {
		if (sortable) {
			return () => this.props.onSort(props, index);
		}

		return null;
	}
});

export default DataTableHead;
