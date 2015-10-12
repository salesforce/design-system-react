// TREE BRANCH - REACT FACADE

// Core
import * as Lib from '../../lib/lib';

// Framework specific
import React from 'react';

// Third party
import classNames from 'classnames';

// Children
import TreeItem from './tree-item';

let InnerTreeBranch;

const TreeBranch = React.createClass({
	propTypes: {
		item: React.PropTypes.object.isRequired,
		selectable: React.PropTypes.bool.isRequired,
		strings: React.PropTypes.object.isRequired,
		autoOpenLevel: React.PropTypes.number.isRequired,
		autoOpenLimit: React.PropTypes.number.isRequired,
		onItemClick: React.PropTypes.func.isRequired,
		onExpandClick: React.PropTypes.func.isRequired,
		_isFolderOpen: React.PropTypes.func.isRequired,
		_isItemSelected: React.PropTypes.func.isRequired
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
				children.push(<TreeBranch key={id} item={model} selectable={this.props.selectable} strings={this.props.strings} autoOpenLevel={this.props.autoOpenLevel + 1} autoOpenLimit={this.props.autoOpenLimit} onItemClick={this._handleItemClick} onExpandClick={this._handleExpandClick} _isFolderOpen={this.props._isFolderOpen} _isItemSelected={this.props._isItemSelected} />);
			} else {
				children.push(<TreeItem key={id} item={model} onClick={this._handleItemClick.bind(this, model)} _isItemSelected={this.props._isItemSelected} />);
			}
		});

		return (
			<li className={classNames('slds-tree__branch', {'slds-tree__branch--open': isOpen, 'slds-tree__item--selected': isSelected})} role="treeitem" aria-expanded={isOpen ? 'false' : 'true'}>
				<div className="slds-tree__branch--header slds-tree__item">
					<button className="slds-button slds-button--icon-bare slds-m-right--x-small" onClick={this._handleExpandClick.bind(this, this.props.item)}>
						<svg
							aria-hidden="true"
							className="slds-button__icon slds-button__icon--small"
							dangerouslySetInnerHTML={{__html: '<use xlink:href="/examples/symbols.svg#chevronright"></use>'}} >
						</svg>
						<span className="slds-assistive-text">Toggle</span>
					</button>
					<div className="slds-tree__branch--name" role="presentation">Tree Branch</div>
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
