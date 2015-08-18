// SELECTLIST CONTROL - REACT FACADE

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

	render () {
		const contents = [];
		this._collection.forEach(model => {
			let result;
			
			if (this.accessors.getType(model) === 'folder') {
				// TO-DO: Using model.get('id') won't work here now that ids are no longer required
				result = <TreeBranch key={model.get('id')} item={model} selectable={this.getStore('folderSelect')} onItemClick={this._handleItemClick} onExpandClick={this._handleExpandClick} accessors={this.accessors} _isFolderOpen={this._isFolderOpen.bind(this)} _isItemSelected={this._isItemSelected.bind(this)} />;
			} else {
				result = <TreeItem key={model.get('id')} item={model} onClick={this._handleItemClick} accessors={this.accessors} _isItemSelected={this._isItemSelected.bind(this)} />;
			}
			
			contents.push(result);
		});

		return (
			<ul className={classNames(this.cssClasses.CONTROL, this.cssClasses.BTN_GROUP)} role="tree">
				{contents}
			</ul>
		);
	},

	_handleItemClick (item) {
		if (this.accessors.getType(item) === 'folder' && !this.getStore('folderSelect')) {
			this._toggleFolder(item);
		} else {
			this._selectItem(item);
		}
	},

	_handleExpandClick (item) {
		this._toggleFolder(item);
	}
}));

export default Tree;
