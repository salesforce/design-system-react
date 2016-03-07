/*
Copyright (c) 2015, salesforce.com, inc. All rights reserved.

Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:
Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
Neither the name of salesforce.com, inc. nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

// TREE BRANCH - REACT FACADE

// Core
import * as Lib from 'slds-for-js-core/lib';

// Framework specific
import React from 'react';

// Third party
import classNames from 'classnames';

// Children
import TreeItem from './tree-item';
import Button from '../button/button';

let InnerTreeBranch;

export const CONTROL = 'tree-branch';

const TreeBranch = React.createClass({
	displayName: CONTROL,

	propTypes: {
		autoOpenLevel: React.PropTypes.number.isRequired,
		autoOpenLimit: React.PropTypes.number.isRequired,
		_isFolderOpen: React.PropTypes.func.isRequired,
		_isItemSelected: React.PropTypes.func.isRequired,
		// TODO: Modify when tree data adapter gets set up
		item: React.PropTypes.shape({
			// getType: React.PropTypes.func.isRequired,
			_getChildren: React.PropTypes.func.isRequired,
			// getDisabled: React.PropTypes.func.isRequired,
			// getIcon: React.PropTypes.func.isRequired,
			getId: React.PropTypes.func.isRequired,
			getText: React.PropTypes.func.isRequired
			// getValue: React.PropTypes.func.isRequired
		}).isRequired,
		getControlNodeId: React.PropTypes.func.isRequired,
		getControlNodeLabelId: React.PropTypes.func.isRequired,
		getControlNodeTogglerId: React.PropTypes.func.isRequired,
		id: React.PropTypes.string,
		onItemClick: React.PropTypes.func.isRequired,
		onExpandClick: React.PropTypes.func.isRequired,
		selectable: React.PropTypes.bool.isRequired,
		strings: React.PropTypes.object.isRequired
	},

	getInitialState () {
		return {
			children: Lib.getDataAdapter(),
			loading: true
		};
	},

	componentWillMount () {
		if (!InnerTreeBranch) {
			InnerTreeBranch = require('./tree-branch');
		}

		if (this.props.autoOpenLevel <= this.props.autoOpenLimit && !this.props._isFolderOpen(this.props.item)) {
			this._handleExpandClick(this.props.item);
		}

		this.props.item._getChildren().then(resolvedChildren => {
			this.setState({
				children: resolvedChildren,
				loading: false
			});
		}, error => {
			this.setState({
				loading: false,
				error
			});
		});
	},

	render () {
		const isOpen = this.props._isFolderOpen(this.props.item);
		const isSelected = this.props._isItemSelected(this.props.item);
		const children = [];
		const labelId = this.props.getControlNodeLabelId(this.props.item.getId());
		const togglerId = this.props.getControlNodeTogglerId(this.props.item.getId());

		this.state.children.forEach(model => {
			const modelId = model.getId();
			const domId = this.props.getControlNodeId(modelId);

			if (model.getType() === 'folder') {
				children.push(<TreeBranch
								key={modelId}
								item={model}
								id={domId}
								selectable={this.props.selectable}
								strings={this.props.strings}
								autoOpenLevel={this.props.autoOpenLevel + 1}
								autoOpenLimit={this.props.autoOpenLimit}
								onItemClick={this._handleItemClick}
								onExpandClick={this._handleExpandClick}
								getControlNodeId={this.props.getControlNodeId}
								getControlNodeLabelId={this.props.getControlNodeLabelId}
								getControlNodeTogglerId={this.props.getControlNodeTogglerId}
								_isFolderOpen={this.props._isFolderOpen}
								_isItemSelected={this.props._isItemSelected}/>);
			} else {
				children.push(<TreeItem
								key={modelId}
								item={model}
								id={domId}
								getControlNodeId={this.props.getControlNodeId}
								getControlNodeLabelId={this.props.getControlNodeLabelId}
								autoOpenLevel={this.props.autoOpenLevel + 1}
								onClick={this._handleItemClick.bind(this, model)}
								_isItemSelected={this.props._isItemSelected}/>);
			}
		});

		return (
			<li id={this.props.id} role="treeitem" aria-expanded={isOpen ? 'true' : 'false'} aria-level={this.props.autoOpenLevel}>
				<div className={classNames('slds-tree__item', {'slds-is-selected': isSelected})} aria-selected={isSelected ? 'true' : 'false'} >
					<Button
						id={togglerId}
						aria-controls={this.props.id}
						className="slds-m-right--x-small"
						icon="utility.chevronright"
						iconSize="small"
						assistiveText={this.props.strings.TOGGLE_TREE_BRANCH}
						iconStyle="icon-bare"
						onClick={this._handleExpandClick.bind(this, this.props.item)} />
						<a id={labelId} aria-controls={this.props.id} tabIndex="-1" role="presentation" className={classNames('slds-truncate', 'slds-size--1-of-1')} onClick={this._handleItemClick.bind(this, this.props.item)}>
							{this.props.item.getText()}
						</a>
				</div>
				<ul className={classNames({'slds-is-expanded': isOpen}, {'slds-is-collapsed': !isOpen}, )} role="group" aria-labelledby={labelId} aria-aria-controlledby={togglerId}>
					{isOpen ? children : undefined}
				</ul>
				<div className={classNames('slds-spinner', 'slds-spinner--small', {'slds-hide': !this.state.loading || !isOpen})} role="alert">Loading</div>
			</li>
		);
	},

	_handleItemClick (item) {
		if (this.props.onItemClick) {
			this.props.onItemClick(item);
		}
	},

	_handleExpandClick (item) {
		if (this.props.onExpandClick) {
			this.props.onExpandClick(item);
		}
	}
});

export default TreeBranch;
