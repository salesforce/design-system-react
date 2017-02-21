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

// ## Children
import Checkbox from '../../forms/checkbox';
import HeaderCell from './header-cell';

// ## Constants
import { DATA_TABLE_HEAD } from '../../../utilities/constants';

// Removes the need for `PropTypes`.
const { PropTypes } = React;

/**
 * Used internally, provides header row rendering to the DataTable.
 */
const DataTableHead = React.createClass({
	// ### Display Name
	// Always use the canonical component name as the React display name.
	displayName: DATA_TABLE_HEAD,

	// ### Prop Types
	propTypes: {
		/**
		 * Text for heading of actions column
		 */
		assistiveTextForActionsHeader: PropTypes.string,
		/**
		 * Text for sort action on table column header
		 */
		assistiveTextForColumnSort: PropTypes.string,
		/**
		 * Text for select all checkbox within the table header
		 */
		assistiveTextForSelectAllRows: PropTypes.string,
		allSelected: PropTypes.bool,
		indeterminateSelected: PropTypes.bool,
		canSelectRows: PropTypes.bool,
		columns: PropTypes.arrayOf(
			PropTypes.shape({
				Cell: PropTypes.func,
				props: PropTypes.object
			})
		),
		id: PropTypes.string,
		onToggleAll: PropTypes.func,
		onSort: PropTypes.func,
		showRowActions: PropTypes.bool
	},

	componentWillMount () {
		
	},

	// ### Render
	render () {
		return (
			<thead>
				<tr className="slds-text-title--caps">
					{this.props.canSelectRows
						? <th className="slds-text-align--right" scope="col" style={{ width: '3.25rem' }}>
							<div className="slds-th__action slds-th__action--form">
								<Checkbox
									assistiveText={this.props.assistiveTextForSelectAllRows}
									checked={this.props.allSelected}
									indeterminate={this.props.indeterminateSelected}
									id={`${this.props.id}-SelectAll`}
									name="SelectAll"
									onChange={this.props.onToggleAll}
								/>
							</div>
						</th>
						: null
					}
					{this.props.columns.map((column) =>
						<HeaderCell
							assistiveTextForColumnSort={this.props.assistiveTextForColumnSort}
							id={`${this.props.id}-${column.props.property}`}
							key={`${this.props.id}-${column.props.property}`}
							onSort={this.props.onSort}
							{...column.props}
						/>
					)}
					{this.props.showRowActions
						? <th scope="col" style={{ width: '3.25rem' }}>
							<div className="slds-th__action">
								<span className="slds-assistive-text">{this.props.assistiveTextForActionsHeader}</span>
							</div>
						</th>
						: null
					}
				</tr>
			</thead>
		);
	}
});

module.exports = DataTableHead;
