/*
Copyright (c) 2015, salesforce.com, inc. All rights reserved.

Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:
Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
Neither the name of salesforce.com, inc. nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

// # Tree Component --- SLDS for React

// Implements the [Tree design pattern](https://www.lightningdesignsystem.com/components/trees) in React. This is similar to both the Picklist and the Pills, but currently there is no inheritance from either component.

// [![Tree component example screenshot](/assets/demo-site/images/component-examples/tree.png "Tree component example screenshot")](/react/tree)

// > See a [live example](/react/tree) of the Tree component in action

// ## API

/* @todo Add a full API description of the component here. */

// ## Dependencies

// Bring in the [shared library functions](../../lib/lib.html).
import * as Lib from 'slds-for-js-core/lib';
import isFunction from 'lodash/lang/isFunction';
import partialRight from 'lodash/function/partialRight';

// Use the [shared core](../../core/tree.html), which contains logic that is
// shared across SLDS for JavaScript.
import TreeCore, { CONTROL } from 'slds-for-js-core/components/tree';

// ### Traits

// #### Eventable
// [../../traits/eventable](../../traits/eventable.html)
import Eventable from 'slds-for-js-core/traits/eventable';

// #### Multiselectable
// [../../traits/multiselectable](../../traits/multiselectable.html)
import Multiselectable from 'slds-for-js-core/traits/multiselectable';

// ### React
// React is an external dependency of the project.
import React from 'react';

// ### classNames
// [github.com/JedWatson/classnames](https://github.com/JedWatson/classnames)
// SLDS for React uses `classnames`, "a simple javascript utility for conditionally
// joining classNames together." Because of the small size of the library, the
// default build includes the entire library rather than requiring it as an
// external dependency.
import classNames from 'classnames';

// ### Mixins

// These are mixins that appear in all of SLDS for Javascript,
// bringing consistency to instantiation, events, and state.

// #### Events
// [../mixins/events](../mixins/events.html)
import Events from '../mixins/events';

// #### Generic Will Mount
// [../mixins/generic-will-mount](../mixins/generic-will-mount.html)
import genericWillMount from '../mixins/generic-will-mount';

// #### State
// [../mixins/state](../mixins/state.html)
import State from '../mixins/state';

// ### Children

// Split out some rendering logic, just to make things easier to read.

// #### Tree Branch
// [./tree-branch](./tree-branch.html)
import TreeBranch from './tree-branch';
// #### Tree Item
// [./tree-item](./tree-item.html)
import TreeItem from './tree-item';
// #### Tree Heading
// [./tree-heading](./tree-heading.html)
import TreeHeading from './tree-heading';

// ## Tree

// SLDS for React **extends objects** by merging them together, rather than
// via the prototype chain or imitation of object-oriented inheritance.
// The important thing to remember is that _some methods will be available
// to the component which are not declared in this file_.

// These are not magic methods, they're not black box methods, but you do need
// to trace the dependencies of the component to see where they are coming
// from. In particular, Tree extends its [core](../../core/tree.html),
// which in turn extends the base component and a series of traits.

export const TreeDefinition = {
	// ### Mixins

	// SLDS for React specifically is also extended via React's standard
	// mixin model. These three mixins hook into native React Wycliffe events
	// and expose functionality needed for a cross-framework core. For
	// example, some places in the core or traits a `setState` method is used.
	//
	// In React this is built in to the framework, while SLDS for jQuery
	// simply borrow the idea for its own use.
	//
	// Similarly, a `setProperties` method is available but in React it is
	// actually a `noop` because React expects a one-way data flow, while in
	// other Frameworks it typically does something very similar to
	// `setState`.
	mixins: [State, Events, genericWillMount],

	// ### Display Name
	// > Always use the canonical component name (set in the core) as the
	// > React display name.
	displayName: CONTROL,

	// ### Prop Types
	propTypes: {
		/* > @todo Type of collection unknown until parsed by Data Adapter */
		collection: React.PropTypes.oneOfType([
			React.PropTypes.array,
			React.PropTypes.object
		]).isRequired,
		
		autoOpen     : React.PropTypes.bool,
		autoOpenLimit: React.PropTypes.number,
		heading      : React.PropTypes.string,
		id           : React.PropTypes.string,
		disabled     : React.PropTypes.bool,
		folderSelect : React.PropTypes.bool,
		multiSelect  : React.PropTypes.bool,
		onChanged    : React.PropTypes.func,
		onClosed     : React.PropTypes.func,
		onOpened     : React.PropTypes.func,
		open         : React.PropTypes.any,
		selection    : React.PropTypes.any
	},

	// ### Component Will Mount
	componentWillMount () {
		Eventable.on(this, 'select', this._onSelect);
		Eventable.on(this, 'deselect', this._onDeselect);
	},

	// ### Render
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
			const _isItemSelected = partialRight(Multiselectable.isItemSelected, selection);

			if (model.getType() === 'folder') {
				children.push(
					<TreeBranch
						id                      = {domId}
						key                     = {modelId}
						item                    = {model}
						getControlNodeId        = {this._getControlNodeId}
						getControlNodeLabelId   = {this._getControlNodeLabelId}
						getControlNodeTogglerId = {this._getControlNodeTogglerId}
						selectable              = {selectable}
						strings                 = {this.state.strings}
						autoOpenLevel           = {1}
						autoOpenLimit           = {this.props.autoOpen ? this.props.autoOpenLimit : 0}
						onItemClick             = {this._handleItemClick}
						onExpandClick           = {this._handleExpandClick}
						_isFolderOpen           = {this._isFolderOpen}
						_isItemSelected         = {_isItemSelected}
					/>
				);
			} else {
				children.push(
					<TreeItem
						id                    = {domId}
						key                   = {modelId}
						item                  = {model}
						getControlNodeId      = {this._getControlNodeId}
						getControlNodeLabelId = {this._getControlNodeLabelId}
						autoOpenLevel         = {1}
						onClick               = {this._handleItemClick}
						_isItemSelected       = {_isItemSelected}
					/>
				);
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

	// ### Handle Item Click
	_handleItemClick (item) {
		if (item.getType() !== 'folder' || this.props.folderSelect) {
			Multiselectable.toggleItem(this, item._item, this.props.selection);
		} else {
			this._toggleFolder(item);
		}
	},

	// ### Handle Expand Click
	_handleExpandClick (item) {
		this._toggleFolder(item);
	},

	// ### On Select
	_onSelect (itemsToSelect, selection) {
		if (isFunction(this.props.onSelect)) {
			this.props.onSelect(itemsToSelect, selection._data);
		}

		if (isFunction(this.props.onChange)) {
			this.props.onChange(selection._data);
		}
	},

	// ### On Deselect
	_onDeselect (itemsToDeselect, selection) {
		if (isFunction(this.props.onDeselect)) {
			this.props.onDeselect(itemsToDeselect, selection._data);
		}

		if (isFunction(this.props.onChange)) {
			this.props.onChange(selection._data);
		}
	}
};

let Tree = Lib.merge(
	{},
	TreeCore,
	TreeDefinition
);

// ### Run the helpers

// `Helpers` are a feature of SLDS for React that allows anyone to register code that
// can manipulate the component before it is encapsulated in a React class.
//
// This allows flexibility for adding custom behavior without modifying the
// original source, or for adding optional behavior.
//
// Nothing in the component itself should ever depend on the presence
// of helpers, as they are completely optional.
Tree = Lib.runHelpers('react', CONTROL, Tree);

// Once everything has been merged together and all registered helpers have
// been run we can create the React class and export the result for
// consumption by our apps.
Tree = React.createClass(Tree);

export default Tree;
