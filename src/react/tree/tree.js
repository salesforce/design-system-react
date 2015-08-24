// TREE CONTROL - REACT FACADE

// Core
import * as Lib from '../../core/lib';
import TreeCore from '../../core/tree';

// Framework specific
import React from 'react';
import State from '../mixins/state';
import Events from '../mixins/events';
import genericWillMount from '../mixins/generic-will-mount';

// Third party
import classNames from 'classnames';

// Children
import TreeBranch from './tree-branch';
import TreeItem from './tree-item';

const Tree = React.createClass(Lib.extend({}, TreeCore, {
	mixins: [State, Events, genericWillMount],
	
	propTypes: {
		disabled: React.PropTypes.bool,
		folderSelect: React.PropTypes.bool,
		multiSelect: React.PropTypes.bool,
		autoOpen: React.PropTypes.bool,
		autoOpenLimit: React.PropTypes.number,
		collection: React.PropTypes.any.isRequired,
		selection: React.PropTypes.any,
		open: React.PropTypes.any,
		onChanged: React.PropTypes.func,
		onOpened: React.PropTypes.func,
		onClosed: React.PropTypes.func
	},

	render () {
		const children = [];
		
		this._collection.forEach(model => {
			const id = this.accessors.getId(model);
			const selectable = this.getProperty('folderSelect');
			
			if (this.accessors.getType(model) === 'folder') {
				children.push(<TreeBranch key={id} item={model} selectable={selectable} autoOpenLevel={1} autoOpenLimit={this.props.autoOpen ? this.props.autoOpenLimit : 0} onItemClick={this._handleItemClick} onExpandClick={this._handleExpandClick} accessors={this.accessors} _getChildren={this._getChildren} _isFolderOpen={this._isFolderOpen} _isItemSelected={this._isItemSelected} />);
			} else {
				children.push(<TreeItem key={id} item={model} onClick={this._handleItemClick} accessors={this.accessors} _isItemSelected={this._isItemSelected} />);
			}
		});

		return (
			<ul className={classNames(this.cssClasses.CONTROL, this.cssClasses.BTN_GROUP)} role="tree">
				{children}
			</ul>
		);
	},

	_handleItemClick (item) {
		if (this.accessors.getType(item) !== 'folder' || this.getProperty('folderSelect')) {
			if (this._isItemSelected(item)) {
				this._deselectItem(item);
			} else {
				this._selectItem(item);
			}
		} else {
			this._toggleFolder(item);
		}
	},

	_handleExpandClick (item) {
		this._toggleFolder(item);
	}
}));

export default Tree;
