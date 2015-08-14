import React from 'react';
import TreeCore from '../../core/tree';
import * as Lib from '../../core/lib';
import classNames from 'classnames';
import ReactHelpers from '../mixins/helpers';
import genericWillMount from '../mixins/generic-will-mount';
import TreeBranch from './tree-branch';
import TreeItem from './tree-item';

const Tree = React.createClass(Lib.extend({}, TreeCore, {
	mixins: [ReactHelpers, genericWillMount],
	getInitialState () {
		return Lib.extend(this.__getInitialState(), {
			wrapperClasses: {}
		});
	},

	render () {
		const contents = [];
		this._collection.forEach(model => {
			let result;
			if (this.accessors.getType(model) === 'folder') {
				result = <TreeBranch key={model.get('id')} item={model} onItemClick={this._handleItemClick} accessors={this.accessors} />;
			} else {
				result = <TreeItem key={model.get('id')} item={model} accessors={this.accessors} />;
			}
			contents.push(result);
		});
		// bind the context of the accessors so that the children don't have to worry about scope.
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
		if (this.accessors.getType(item) === 'folder') {
			this.__toggleFolder(item);
		}
	}
}));

export default Tree;
