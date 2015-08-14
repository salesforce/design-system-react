import React from 'react';
import TreeItem from './tree-item';
import classNames from 'classnames';

let InnerTreeBranch;

const TreeBranch = React.createClass({
	propTypes: {
		onItemClick: React.PropTypes.func.isRequired,
		onExpandClick: React.PropTypes.func.isRequired,
		accessors: React.PropTypes.shape({
			getText: React.PropTypes.func.isRequired,
			getType: React.PropTypes.func.isRequired,
			getItemState: React.PropTypes.func.isRequired,
			getChildren: React.PropTypes.func.isRequired
		}),
		item: React.PropTypes.object.isRequired,
		selectable: React.PropTypes.bool.isRequired
	},

	getInitialState () {
		return {
			children: []
		};
	},

	componentWillMount () {
		if (!InnerTreeBranch) {
			InnerTreeBranch = require('./tree-branch');
		}
		this.props.accessors.getChildren(this.props.item).then(resolvedChildren => {
			this.setState({
				children: resolvedChildren
			});
		});
	},

	render () {
		const accessors = this.props.accessors;
		const itemState = (accessors.getItemState(this.props.item));
		const children = [];

		this.state.children.forEach(model => {
			if (accessors.getType(model) === 'folder') {
				children.push(<TreeBranch selectable={this.props.selectable} key={model.get('id')} item={model} accessors={accessors} onExpandClick={this._handleExpandClick} onItemClick={this._handleItemClick}/>);
			} else {
				children.push(<TreeItem onClick={this._handleItemClick.bind(this, model)} key={model.get('id')} item={model} accessors={accessors} />);
			}
		});
		const caretClasses = 'glyphicon icon-caret glyphicon-play';
		const expandButton = (
			<button className={caretClasses} onClick={this._handleExpandClick.bind(this, this.props.item)}>
				<span className="sr-only">{itemState.open ? 'Open' : 'Close'}</span>
			</button>
		);

		return (
			<li className={classNames('tree-branch', itemState.open ? 'tree-open' : '', itemState.selected ? 'tree-selected' : '')} dataTemplate="treebranch" role="treeitem" aria-expanded={itemState.open ? 'false' : 'true'}>
				<div className="tree-branch-header">
					{this.props.selectable ? expandButton : undefined}
					<button type="button" className="tree-branch-name" onClick={this._handleItemClick.bind(this, this.props.item)}>
						{!this.props.selectable ? <span className={caretClasses}></span> : undefined}
						<span className={classNames('glyphicon icon-folder', 'glyphicon-folder-' + (itemState.open ? 'open' : 'close'))}></span>
						<span className="tree-label">{accessors.getText(this.props.item)}</span>
					</button>
				</div>
				<ul className={classNames('tree-branch-children', {hidden: !itemState.open})} role="group">
					{itemState.open ? children : undefined}
				</ul>
				<div className={classNames('tree-loader', {hidden: !itemState.loading})} role="alert">Loading...</div>
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
