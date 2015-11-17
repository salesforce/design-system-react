// TREE BRANCH - REACT FACADE

// Core
import * as Lib from '../../lib/lib';

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
			// getId: React.PropTypes.func.isRequired,
			getText: React.PropTypes.func.isRequired
			// getValue: React.PropTypes.func.isRequired
		}).isRequired,
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

		this.state.children.forEach(model => {
			const id = model.getId();
			
			if (model.getType() === 'folder') {
				children.push(<TreeBranch
												key={id}
												item={model}
												selectable={this.props.selectable}
												strings={this.props.strings}
												autoOpenLevel={this.props.autoOpenLevel + 1}
												autoOpenLimit={this.props.autoOpenLimit}
												onItemClick={this._handleItemClick}
												onExpandClick={this._handleExpandClick}
												_isFolderOpen={this.props._isFolderOpen}
												_isItemSelected={this.props._isItemSelected}/>);
			} else {
				children.push(<TreeItem
												key={id}
												item={model}
												onClick={this._handleItemClick.bind(this, model)}
												_isItemSelected={this.props._isItemSelected}/>);
			}
		});

		return (
			<li className={classNames('slds-tree__branch', {'slds-is-open': isOpen, 'slds-is-selected': isSelected})} role="treeitem" aria-expanded={isOpen ? 'false' : 'true'}>
				<div className="slds-tree__branch--header slds-tree__item">
					<Button
						className="slds-m-right--x-small"
						icon="utility.chevronright"
						iconSize="small"
						assistiveText={this.props.strings.TOGGLE_TREE_BRANCH}
						iconStyle="icon-bare"
						onClick={this._handleExpandClick.bind(this, this.props.item)} />
					<div className="slds-tree__branch--name" role="presentation" onClick={this._handleItemClick.bind(this, this.props.item)}>{this.props.item.getText()}</div>
				</div>
				<ul className="slds-tree__group slds-nested" role="group">
					{isOpen ? children : undefined}
				</ul>
				<div className={classNames('slds-tree__loader', {'slds-hide': !this.state.loading || !isOpen})} role="alert">Loading</div>
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
