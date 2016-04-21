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
// React is an external dependency of the project.
import React from 'react';

// ### isFunction
import isFunction from 'lodash/lang/isFunction';

// ## Children

// ### Button
import Button from '../button';

// ### Dropdown
import Dropdown from '../dropdown';

// ### Dropdown
import Trigger from '../dropdown/button-trigger';

// Removes the need for `PropTypes`.
const { PropTypes } = React;

// The component name will be used as the `DisplayName` and exported along with
// the component itself.
export const COMPONENT = 'DataTableRowActions';

/**
 * RowActions provide a mechanism for defining a menu to display alongside each row in the DataTable.
 */
const DataTableRowActions = React.createClass({
	// ### Display Name
	// Always use the canonical component name as the React display name.
	displayName: COMPONENT,

	// ### Prop Types
	propTypes: {
		assistiveText: PropTypes.string,
		className: PropTypes.oneOfType([PropTypes.array, PropTypes.object, PropTypes.string]),
		collection: PropTypes.array.isRequired,
		id: PropTypes.string,
		item: PropTypes.object,
		onAction: PropTypes.func
	},

	// ### Render
	render () {
		return (
			<td className="slds-cell-shrink" data-label="Actions">
				<Dropdown
					align="right"
					className={this.props.className}
					collection={this.props.collection}
					id={this.props.id}
					onChange={this.handleChange}
				>
					<Trigger>
						<Button
							assistiveText={this.props.assistiveText}
							className="slds-button--icon-x-small"
							iconSize="small"
							iconStyle="icon-border-filled-hint"
						/>
					</Trigger>
				</Dropdown>
			</td>
		);
	},

	handleChange (selection) {
		if (isFunction(this.props.onAction)) {
			this.props.onAction(this.props.item, selection);
		}
	}
});

export default DataTableRowActions;
