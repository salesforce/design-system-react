// TREE CONTROL - REACT FACADE

// Core
import * as Lib from '../../lib/lib';
import TreeCore, {CONTROL} from '../../core/tree';

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

let Tree = Lib.merge({}, TreeCore, {
	mixins: [State, Events, genericWillMount],

	propTypes: {
		autoOpen: React.PropTypes.bool,
		autoOpenLimit: React.PropTypes.number,
		// TODO: Type of collection unknown until parsed by Data Adapter
		collection: React.PropTypes.oneOfType([
			React.PropTypes.array,
			React.PropTypes.object
		]).isRequired,
		disabled: React.PropTypes.bool,
		folderSelect: React.PropTypes.bool,
		multiSelect: React.PropTypes.bool,
		onChanged: React.PropTypes.func,
		onClosed: React.PropTypes.func,
		onOpened: React.PropTypes.func,
		open: React.PropTypes.any,
		selection: React.PropTypes.any
	},

	render () {
		const children = [];

		this._collection.forEach(model => {
			const id = model.getId();
			const selectable = this.getProperty('folderSelect');

			if (model.getType() === 'folder') {
				children.push(<TreeBranch key={id} item={model} selectable={selectable} strings={this.state.strings} autoOpenLevel={1} autoOpenLimit={this.props.autoOpen ? this.props.autoOpenLimit : 0} onItemClick={this._handleItemClick} onExpandClick={this._handleExpandClick} _isFolderOpen={this._isFolderOpen} _isItemSelected={this._isItemSelected} />);
			} else {
				children.push(<TreeItem key={id} item={model} onClick={this._handleItemClick} _isItemSelected={this._isItemSelected} />);
			}
		});

		return (
			<div className={this.cssClasses.CONTAINER} role="application">
				<ul className={classNames(this.cssClasses.CONTROL, this.cssClasses.BTN_GROUP)} role="tree">
					{children}
				</ul>
			</div>
		);
	},

	_handleItemClick (item) {
		if (item.getType() !== 'folder' || this.getProperty('folderSelect')) {
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
});

Tree = Lib.runHelpers('react', CONTROL, Tree);
Tree = React.createClass(Tree);

export default Tree;
