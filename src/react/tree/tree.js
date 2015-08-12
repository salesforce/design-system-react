// SELECTLIST CONTROL - REACT FACADE

// Core
import Landmark from '../landmark';
import TreeCore from '../core/tree';

// Framework specific
import React from 'react';
import classNames from 'classnames';

// Children
//import SelectlistItem from './selectlist-item';

var Tree = React.createClass(Object.assign({}, TreeCore, {

	getInitialState () {
		return Object.assign(this.__getInitialState(), {});
	},

	getState (key) {
		return this.state[key];
	},

	render () {
		var self = this;

		return (
			<ul className="tree" role="tree">
				{ this.state.treeNodesDeep.map(function(item, i){
					if( item.type === 'folder' ){
						return <TreeBranch key={i} index={i} branch={item} parent={self}/>
					} else {
						return <TreeItem key={i} index={i} item={item} parent={self}/>
					}
				}) }
			</ul>
		);
	},

	componentWillMount () {

	},

	componentDidMount () {
		this.__constructor(this.props);

		this.__retrieveData();
	}
}));

var TreeBranch = React.createClass({

	render () {
		var childrenClass = "tree-branch-children hidden";
		var treeBranchClass = "tree-branch";
		var treeFolderClass = "glyphicon icon-folder glyphicon-folder-close";

		if ( this.props.branch._state.open ) {
			childrenClass = "tree-branch-children";
			treeBranchClass = "tree-branch tree-open";
			treeFolderClass = "glyphicon icon-folder glyphicon-folder-open";
		}


		return (
			<li className={treeBranchClass} role="treeitem" aria-expanded="false">
				<div className="tree-branch-header">
					<button type="button" className="tree-branch-name" onClick={this._selectBranch}>
						<span className="glyphicon icon-caret glyphicon-play"></span>
						<span className={treeFolderClass}></span>
						<span className="tree-label">{this.props.branch.name}</span>
					</button>
				</div>
				<ul className={childrenClass} role="group">
					{ this.renderChildren() }
				</ul>
				<div className="tree-loader hidden" role="alert">Loading...</div>
			</li>
		)
	},

	renderChildren () {
		var self = this;

		if ( this.props.branch._children ) {
			return this.props.branch._children.map(function(item, i){
				//If it is an item return one thing if not it is a branch return another
				if( item.type === 'folder' ){
					return <TreeBranch key={i} index={i} branch={item}  parent={self.props.parent}/>
				} else {
					return <TreeItem key={i} index={i} item={item}  parent={self.props.parent}/>
				}
			});
		} else {
			return false
		}
	},

	_selectBranch () {
		this.props.parent.__toggleFolder(this.props.branch);
	}
});

var TreeItem = React.createClass({
	render () {
		var icon = "glyphicon icon-item";
		var itemClass = this.props.item._state.selected ? "tree-item tree-selected" : "tree-item";

		return (
			<li className={itemClass} role="treeitem" onClick={this._selectItem}>
				<button type="button" className="tree-item-name">
					<span className={icon}></span>
					<span className="tree-label">{this.props.item.name}</span>
				</button>
			</li>
		)
	},

	_selectItem () {
		this.props.parent.__toggleItem(this.props.item);
	}
});

export default Tree;