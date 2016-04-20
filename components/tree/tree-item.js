/*
Copyright (c) 2015, salesforce.com, inc. All rights reserved.

Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:
Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
Neither the name of salesforce.com, inc. nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

// TREE ITEM - REACT FACADE

// Framework specific
import React from 'react';

// Third party
import classNames from 'classnames';

// Children
import Button from '../button';

export const COMPONENT = 'tree-item';

const TreeItem = React.createClass({
	displayName: COMPONENT,

	propTypes: {
		// TODO: Modify when tree data adapter gets set up
		autoOpenLevel: React.PropTypes.number.isRequired,
		item: React.PropTypes.shape({
			// getType: React.PropTypes.func.isRequired,
			// getDisabled: React.PropTypes.func.isRequired,
			// getIcon: React.PropTypes.func.isRequired,
			getId: React.PropTypes.func.isRequired,
			getText: React.PropTypes.func.isRequired
			// getValue: React.PropTypes.func.isRequired
		}).isRequired,
		getControlNodeId: React.PropTypes.func.isRequired,
		getControlNodeLabelId: React.PropTypes.func.isRequired,
		id: React.PropTypes.string,
		onClick: React.PropTypes.func.isRequired,
		_isItemSelected: React.PropTypes.func.isRequired
	},

	render () {
		const isSelected = this.props._isItemSelected(this.props.item);
		const labelId = this.props.getControlNodeLabelId(this.props.item.getId());

		return (
			<li id={this.props.id} onClick={this._handleItemClick.bind(this, this.props.item)} data-template="treeitem" role="treeitem" aria-level={this.props.autoOpenLevel}>
				<div className={classNames('slds-tree__item', { 'slds-is-selected': isSelected })} aria-selected={isSelected ? 'true' : 'false'} >
					<Button
						disabled
						className="slds-m-right--x-small slds-is-disabled"
						iconCategory="utility"
						iconName="chevronright"
						iconSize="small"
						iconStyle="icon-bare"
					/>
					<a id={labelId} dataItemId={this.getId} tabIndex="-1" role="presentation" className={classNames('slds-truncate', 'slds-size--1-of-1')}>
						{this.props.item.getText()}
					</a>
				</div>
			</li>
		);
	},

	_handleItemClick (item) {
		if (this.props.onClick) {
			this.props.onClick(item);
		}
	}
});

export default TreeItem;
