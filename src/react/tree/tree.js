// TREE CONTROL - REACT FACADE

// Core
import * as Lib from '../../lib/lib';
import TreeCore, {CONTROL} from '../../core/tree';

// Traits
import Eventable from '../../traits/eventable';
import Multiselectable from '../../traits/multiselectable';

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
import TreeHeading from './tree-heading';

// Facades **extends objects** by merging them together, rather than via the prototype chain or imititation of object-oriented inheritance. The important thing to remember is that _some methods will be available to the control which are not declared in this file_. These are not magic methods, they're not black box methods, but you do need to trace the depencies of the control to see where they are coming from. In particular, Tree extends its [core](../../core/tree.html), which in turn extends the base control and a series of traits.
let Tree = Lib.merge({}, TreeCore, {
	// The React facade specifically is also extended via React's standard mixin model. These three mixins hook into native React lifecycle events and expose functionality needed for a cross-framework core. For example, some places in the core or traits a `setState` method is used. In React this is built in to the framework, and the other facades simply borrow the idea for their own use. Similarly, a `setProperties` method is available but in React it is actually a `noop` because React expects a one-way data flow, while in other Frameworks it typically does something very similar to `setState`.
	mixins: [State, Events, genericWillMount],

	// Always use the canonical control name (set in the core) as the React display name.
	displayName: CONTROL,

	propTypes: {
		autoOpen: React.PropTypes.bool,
		autoOpenLimit: React.PropTypes.number,
		// TODO: Type of collection unknown until parsed by Data Adapter
		collection: React.PropTypes.oneOfType([
			React.PropTypes.array,
			React.PropTypes.object
		]).isRequired,
		heading: React.PropTypes.string,
		id: React.PropTypes.string,
		disabled: React.PropTypes.bool,
		folderSelect: React.PropTypes.bool,
		multiSelect: React.PropTypes.bool,
		onChanged: React.PropTypes.func,
		onClosed: React.PropTypes.func,
		onOpened: React.PropTypes.func,
		open: React.PropTypes.any,
		selection: React.PropTypes.any
	},

	componentWillMount () {
		Eventable.on(this, 'select', this._onSelect);
		Eventable.on(this, 'deselect', this._onDeselect);
	},

	render () {
		const children = [];
		let heading;
		if (this.props.heading.length !== 0) {
			heading = (<TreeHeading heading={this.props.heading} />);
		}

		this._collection.forEach(model => {
			const modelId = model.getId();
			const domId = this._getControlNodeId(modelId);
			const selectable = this.props.folderSelect;
			const selection = this._getDataAdapter(this.props.selection);
			const _isItemSelected = Lib.partialRight(Multiselectable.isItemSelected, selection);

			if (model.getType() === 'folder') {
				children.push(<TreeBranch
					id={domId}
					key={modelId}
					item={model}
					getControlNodeId={this._getControlNodeId}
					getControlNodeLabelId={this._getControlNodeLabelId}
					getControlNodeTogglerId={this._getControlNodeTogglerId}
					selectable={selectable}
					strings={this.state.strings}
					autoOpenLevel={1}
					autoOpenLimit={this.props.autoOpen ? this.props.autoOpenLimit : 0}
					onItemClick={this._handleItemClick}
					onExpandClick={this._handleExpandClick}
					_isFolderOpen={this._isFolderOpen}
					_isItemSelected={_isItemSelected} />);
			} else {
				children.push(<TreeItem
					id={domId}
					key={modelId}
					item={model}
					getControlNodeId={this._getControlNodeId}
					getControlNodeLabelId={this._getControlNodeLabelId}
					autoOpenLevel={1}
					onClick={this._handleItemClick}
					_isItemSelected={_isItemSelected} />);
			}
		});

		return (
			<div id={this._getControlContainerId()} className={this.cssClasses.CONTAINER} role="application">
				{heading}
				<ul id={this._getControlId()} className={classNames(this.cssClasses.CONTROL, this.cssClasses.BTN_GROUP)} role="tree">
					{children}
				</ul>
			</div>
		);
	},

	_handleItemClick (item) {
		if (item.getType() !== 'folder' || this.props.folderSelect) {
			Multiselectable.toggleItem(this, item._item, this.props.selection);
		} else {
			this._toggleFolder(item);
		}
	},

	_handleExpandClick (item) {
		this._toggleFolder(item);
	},

	_onSelect (itemsToSelect, selection) {
		if (Lib.isFunction(this.props.onSelect)) {
			this.props.onSelect(itemsToSelect, selection._data);
		}

		if (Lib.isFunction(this.props.onChange)) {
			this.props.onChange(selection._data);
		}
	},

	_onDeselect (itemsToDeselect, selection) {
		if (Lib.isFunction(this.props.onDeselect)) {
			this.props.onDeselect(itemsToDeselect, selection._data);
		}

		if (Lib.isFunction(this.props.onChange)) {
			this.props.onChange(selection._data);
		}
	}
});

Tree = Lib.runHelpers('react', CONTROL, Tree);
Tree = React.createClass(Tree);

export default Tree;
