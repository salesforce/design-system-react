import React from 'react';
import TreeItem from './tree-item';
import classNames from 'classnames';

let InnerTreeBranch;

const TreeBranch = React.createClass({
	propTypes: {
		item: React.PropTypes.object.isRequired,
		selectable: React.PropTypes.bool.isRequired,
		onItemClick: React.PropTypes.func.isRequired,
		onExpandClick: React.PropTypes.func.isRequired,
		accessors: React.PropTypes.shape({
			getText: React.PropTypes.func.isRequired,
			getType: React.PropTypes.func.isRequired,
			getChildren: React.PropTypes.func.isRequired
		}),
		_isFolderOpen: React.PropTypes.func.isRequired,
		_isItemSelected: React.PropTypes.func.isRequired
	},

	getInitialState () {
		return {
			loading: false
		};
	},

	componentWillMount () {
		if (!InnerTreeBranch) {
			InnerTreeBranch = require('./tree-branch');
		}
		
		this.setState({
			loading: true
		});
		
		// TO-DO: We should probably handle the rejected state as well
		this.props.accessors.getChildren(this.props.item).then(resolvedChildren => {
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

		this.getState('children').forEach(model => {
			if (accessors.getType(model) === 'folder') {
				children.push(<TreeBranch key={model.get('id')} item={model} selectable={this.props.selectable} onItemClick={this._handleItemClick} onExpandClick={this._handleExpandClick} accessors={accessors} _isFolderOpen={this.props._isFolderOpen} _isItemSelected={this.props._isItemSelected} />);
			} else {
				children.push(<TreeItem key={model.get('id')} item={model} onClick={this._handleItemClick.bind(this, model)} accessors={accessors} _isItemSelected={this.props._isItemSelected} />);
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
				<div className={classNames('tree-loader', {hidden: this.getState('loading')})} role="alert">Loading...</div>
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
