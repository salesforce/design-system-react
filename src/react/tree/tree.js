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
				result = <TreeBranch key={model.get('id')} item={model} selectable={this.state.folderSelect} onItemClick={this._handleItemClick} onExpandClick={this._handleExpandClick} accessors={this.accessors} />;
			} else {
				result = <TreeItem key={model.get('id')} item={model} onClick={this._handleItemClick} accessors={this.accessors} />;
			}
			contents.push(result);
		});
		
		// Bind the context of the accessors so that the children don't have to worry about scope
		// TO-DO: This probably needs to move to a more logical place than render
		Object.keys(this.accessors).forEach(accessorName => {
			this.accessors[accessorName] = this.accessors[accessorName].bind(this);
		});

		return (
			<ul className={classNames(this.cssClasses.CONTROL, this.cssClasses.BTN_GROUP, this.state.wrapperClasses)} role="tree">
				{contents}
			</ul>
		);
	},

	_handleItemClick (item) {
		if (this.accessors.getType(item) === 'folder' && !this.state.folderSelect) {
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
