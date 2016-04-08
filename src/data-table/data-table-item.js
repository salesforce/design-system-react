/*
Copyright (c) 2015, salesforce.com, inc. All rights reserved.

Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:
Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
Neither the name of salesforce.com, inc. nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

// DATA TABLE ITEM - REACT FACADE

// Framework specific
import React from 'react';

export const CONTROL = 'data-table-item';

const DataTableItem = React.createClass({
	displayName: CONTROL,

	// TODO: Break TD cell out into it's own child component, so that the shape of the headers object can be tested
	propTypes: {
		bordered: React.PropTypes.bool,
		item: React.PropTypes.object.isRequired,
		headers: React.PropTypes.arrayOf(React.PropTypes.shape({
			propertyName: React.PropTypes.string,
			displayName: React.PropTypes.string,
			sortable: React.PropTypes.bool,
			hintParent: React.PropTypes.bool
		})).isRequired,
		onSelect: React.PropTypes.func.isRequired,
		selected: React.PropTypes.bool.isRequired,
		selectRows: React.PropTypes.bool
	},

	render () {
		const self = this;

		return (
			<tr className=".slds-hint-parent" onClick={this._handleItemClick}>
				{this.props.headers.map((header, index) => (
					<td key={index} data-label={header.propertyName}>
						{self._renderContent(header, index)}
					</td>
				))}
			</tr>
		);
	},

	_handleItemClick () {
		this.props.onSelect(this.props.item._item);
	},

	_handleCheckClick (ev) {
		ev.stopPropagation();
	},

	_renderContent (header, index) {
		let content;

		if (index === 0 && this.props.selectRows) {
			content = (
				<label className="slds-checkbox">
					<input type="checkbox" checked={this.props.selected}></input>
					<span className="slds-checkbox--faux" onClick={this._handleCheckClick}></span>
					<span className="slds-form-element__label slds-assistive-text" >select</span>
				</label>
			);
		} else {
			content = <span className="slds-truncate">{this.props.item.get(header.propertyName)}</span>;
		}

		return content;
	},

	handleClicked (e) {		// TODO: feature.selection
		e.preventDefault();
		// this.props.onSelect(this.props.item);
	}
});

export default DataTableItem;
