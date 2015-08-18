// TREE BRANCH - REACT FACADE

// Core
import * as Lib from '../../core/lib';

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
		autoOpenLevel: React.PropTypes.number.isRequired,
		autoOpenLimit: React.PropTypes.number.isRequired,
		onItemClick: React.PropTypes.func.isRequired,
		onExpandClick: React.PropTypes.func.isRequired,
		accessors: React.PropTypes.shape({
			getText: React.PropTypes.func.isRequired,
			getType: React.PropTypes.func.isRequired,
			getId: React.PropTypes.func.isRequired
		}),
		_getChildren: React.PropTypes.func.isRequired,
		_isFolderOpen: React.PropTypes.func.isRequired,
		_isItemSelected: React.PropTypes.func.isRequired
	},

	getInitialState () {
		return {
			children: Lib.getDataAdapter([]),
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
		
		// TO-DO: We should probably handle the rejected state as well
		this.props._getChildren(this.props.item).then(resolvedChildren => {
			this.setState({
				children: resolvedChildren,
				loading: false
			});
		});
	},

	render () {
		const accessors = this.props.accessors;
		const isOpen = this.props._isFolderOpen(this.props.item);
		const isSelected = this.props._isItemSelected(this.props.item);
		const children = [];

		this.state.children.forEach(model => {
			const id = accessors.getId(model);
			
			if (accessors.getType(model) === 'folder') {
				children.push(<TreeBranch key={id} item={model} selectable={this.props.selectable} autoOpenLevel={this.props.autoOpenLevel + 1} autoOpenLimit={this.props.autoOpenLimit} onItemClick={this._handleItemClick} onExpandClick={this._handleExpandClick} accessors={accessors} _getChildren={this.props._getChildren} _isFolderOpen={this.props._isFolderOpen} _isItemSelected={this.props._isItemSelected} />);
			} else {
				children.push(<TreeItem key={id} item={model} onClick={this._handleItemClick.bind(this, model)} accessors={accessors} _isItemSelected={this.props._isItemSelected} />);
			}
		});
		
		const caretClasses = 'glyphicon icon-caret glyphicon-play';
		const expandButton = (
			<button className={caretClasses} onClick={this._handleExpandClick.bind(this, this.props.item)}>
				<span className="sr-only">{isOpen ? 'Open' : 'Close'}</span>
			</button>
		);

		return (
			<li className={classNames('tree-branch', {'tree-open': isOpen, 'tree-selected': isSelected})} dataTemplate="treebranch" role="treeitem" aria-expanded={isOpen ? 'false' : 'true'}>
				<div className="tree-branch-header">
					{this.props.selectable ? expandButton : undefined}
					<button type="button" className="tree-branch-name" onClick={this._handleItemClick.bind(this, this.props.item)}>
						{!this.props.selectable ? <span className={caretClasses}></span> : undefined}
						<span className={classNames('glyphicon icon-folder', 'glyphicon-folder-' + (isOpen ? 'open' : 'close'))}></span>
						<span className="tree-label">{accessors.getText(this.props.item)}</span>
					</button>
				</div>
				<ul className={classNames('tree-branch-children', {hidden: !isOpen})} role="group">
					{isOpen ? children : undefined}
				</ul>
				<div className={classNames('tree-loader', {hidden: !this.state.loading || !isOpen})} role="alert">Loading...</div>
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
