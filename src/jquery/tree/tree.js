/*
Copyright (c) 2015, salesforce.com, inc. All rights reserved.

Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:
Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
Neither the name of salesforce.com, inc. nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

// # Tree Component --- SLDS for jQuery

// Implements the [Tree design pattern](http://www.lightningdesignsystem.com/components/trees) in jQuery.

// [![Tree component example screenshot](/assets/demo-site/images/component-examples/tree.png "See a live example of the Tree component in action")](/jquery/tree)

// > See a [live example](/jquery/tree) of the Tree component in action

// ## API

/* @todo Add a full API description of the control here. */

// ## Dependencies

// Bring in the [shared library functions](../../lib/lib.html).
import * as Lib              from '../../lib/lib';

// Use the [shared core](../../core/tree.html), which contains logic that is
// shared across SLDS for JavaScript.
import TreeCore, { CONTROL } from '../../core/tree';

// ### Traits

// #### Eventable
// * [../../traits/eventable](../../traits/eventable.html)
import Eventable             from '../../traits/eventable';

// #### Multiselectable
// * [../../traits/multiselectable](../../traits/multiselectable.html)
import Multiselectable       from '../../traits/multiselectable';

// ### jQuery
// jQuery is an external dependency of the project.
import $ from 'jquery';

// ### Mixins

// These are mixins that appear in all of SLDS for Javascript,
// bringing consistency to instantiation, events, and state.

// #### DOM
// [../dom](../dom.html)
import DOM                   from '../dom';

// #### Events
// [../mixins/events](../mixins/events.html)
import Events                from '../events';

// #### State
// [../mixins/state](../mixins/state.html)
import State                 from '../state';

// ### Children

// #### Button
// [../button/button](../button/button.html)
import Button                from '../button/button';

// #### Tree Template
// [./tree-template](./tree-template.html)
import template              from './tree-template';

// ## Legacy Accessors
const legacyAccessors = {
	// ### Get Text
	getText (item) {
		return item.get('name');
	},

	// ### Get Children
	getChildren (item) {
		return new Promise((resolve) => {
			this.getProperty('dataSource')(item._item, (response) => {
				resolve(response.data);
			});
		});
	},

	// ### Get Type
	getType (item) {
		return item.get('type');
	},

	// ### Get Icon Class
	getIconClass (item) {
		const dataAttributes = item.get('dataAttributes');

		return dataAttributes && dataAttributes['data-icon'];
	},

	// ### Get Expandable
	getExpandable (item) {
		const dataAttributes = item.get('dataAttributes');

		return dataAttributes && dataAttributes.hasChildren;
	},

	// ### Get Key
	getKey (item) {
		return item.get();
	},

	// ### Get Id
	getId (item) {
		const dataAttributes = item.get('dataAttributes');

		return dataAttributes.id;
	}
};

// ## Tree Constructor
// Constructors are functions that are called by the `new` keyword and is the
// function that an options object is passed into.

let Tree = function Tree () {
	const options = Lib.extend({
		open: []
	}, this._getOptions(arguments));

	this.template = $(template);

	if (options.dataSource) {
		options.accessors = legacyAccessors;
	}

	this._initialize(options);
};

export const TreeDefinition = {
	// ### Initializer
	_initializer () {
		this.element = this.$el = this.elements.control = this.template.clone();
		this.elements.list = this.element.find('.' + this.cssClasses.CONTROL);

		Eventable.on(this, 'select', this._onSelect, this);
		Eventable.on(this, 'deselect', this._onDeselect, this);
	},

	// ### On Initialized
	_onInitialized () {
		const strings = this.getState('strings');
		this.setState({loading: true});
		this.template.find('[role="alert"] img').attr('alt', strings.LOADING);
		this.element.find('.slds-text-heading--label').text(this.getProperty('heading'));
		this.element.attr('id', this._getControlContainerId());
	},

	// ### Configure Branch Select
	_configureBranchSelect () {
		const branchSelect = this.getProperty('folderSelect');

		// When folder selection is allowed...
		if (branchSelect) {
			// Branch name clicks act like item clicks
			this.element.on('click', 'li[aria-expanded] > .slds-tree__item', this._handleItemClicked.bind(this));
			this.element.on('click', 'li[aria-expanded] > .slds-tree__item button', this._handleBranchClicked.bind(this));
		} else {
			this.element.on('click', 'li[aria-expanded] > .slds-tree__item', this._handleBranchClicked.bind(this));
		}
	},

	// ### Render Item
	_renderItem (item, selection, level) {
		const $item = this.template.find('li[role="treeitem"]').last().clone();

		$item.find('[role="presentation"]').text(item.getText());
		$item.attr('aria-level', level);
		$item.attr('id', this._getControlNodeId(item._item.id));
		$item.data({
			item: item._item
		});

		this._renderSelection($item, item, selection);

		return $item;
	},

	// ### Render Branch
	_renderBranch (branch, selection, level) {
		const strings        = this.getState('strings');
		const branchId       = branch.getId();
		const domId          = this._getControlNodeId(branchId);
		const labelId        = this._getControlNodeLabelId(branchId);
		const togglerId      = this._getControlNodeTogglerId(branchId);
		const $branch        = this.template.find('[aria-expanded="true"]').clone();
		const $branchLabel   = $branch.find('[role="presentation"]');
		const $branchContent = $branch.find('[role="group"]');
		const $button        = new Button({
			assistiveText : strings.TOGGLE_TREE_BRANCH,
			icon          : 'utility.chevronright',
			iconSize      : 'small',
			iconStyle     : 'icon-bare'
		});

		$button.element.addClass('slds-m-right--x-small');
		$button.element.attr('id', togglerId);
		$button.element.attr('aria-controls', domId);
		$button.element.replaceAll($branch.find('x-branch-button')[0]);

		$branchLabel.text(branch.getText());
		$branchLabel.attr('id', labelId);

		$branchContent.attr('aria-labelledby', labelId);
		$branchContent.attr('aria-controlledby', togglerId);

		// Add the ID attribute to the branch
		$branch.attr('id', domId);
		$branch.data({
			item: branch._item,
			id: branch.getId()
		});

		this._renderSelection($branch, branch, selection);

		// Expandable?
		const isExpandable = branch.getExpandable();

		$branch.attr('data-has-children', isExpandable ? undefined : 'false');

		// Take care of the state
		let isOpen = this._isFolderOpen(branch);

		let _level = level || 1;


		if (!isOpen && this._shouldAutoOpen(level)) {
			this._toggleFolder(branch, {
				silent: true
			});

			isOpen = this._isFolderOpen(branch);
			_level = level + 1;
		}
		_level = level + 1;


		$branchContent.toggleClass('slds-is-expanded', isOpen);
		$branchContent.toggleClass('slds-is-collapsed', !isOpen);
		$branch.attr('aria-level', level);
		$branch.attr('aria-expanded', isOpen);

		if (isOpen) {
			const $loader = this.template.find('[role="alert"]').parents('[role="treeitem"]').clone();
			$loader.addClass('slds-hide');
			$branchContent.append($loader);

			branch._getChildren().then(resolvedChildren => {
				this._loopChildren(resolvedChildren, $branchContent, _level);
			}, error => {
				Lib.log(error);
				this._loopChildren(Lib.getDataAdapter(), $branchContent, _level);
			});
		}
		$branch.find('[role="alert"]').addClass('slds-hide');
		return $branch;
	},

	// ### Render Selection
	_renderSelection ($item, item, selection) {
		const selected = Multiselectable.isItemSelected(item, selection);
		$item.children('.slds-tree__item').toggleClass('slds-is-selected', selected);
		$item.children('.slds-tree__item').attr('aria-selected', selected);
	},

	// ### Render
	render (level) {
		const dataSource = this.getProperty('dataSource');
		let _level = level || 0;
		_level += 1;

		if (this._collection.length()) {
			this._loopChildren(this._collection, this.elements.list, _level);
		} else if (dataSource) {
			dataSource({}, (response) => {
				this._collection = this._getDataAdapter(response.data);
				this._loopChildren(this._collection, this.elements.list, _level);
			});
		}
		this.template.find('.text-heading--label').text('Um.....');
		return this.element;
	},

	// ### On Rendered
	_onRendered () {
		this._configureBranchSelect();
		this.element.on('click', 'li[role="treeitem"]', this._handleItemClicked.bind(this));
	},

	// ### Loop Children
	_loopChildren (children, $el, level) {
		const self = this;
		const elements = [];
		const selection = this._getDataAdapter(this.getProperty('selection'));

		children.forEach(function buildBranch (item) {
			const isBranch = item.getType() === 'folder';

			if (!isBranch) {
				elements.push(self._renderItem(item, selection, level));
			} else {
				elements.push(self._renderBranch(item, selection, level));
			}
		});

		$el.empty();
		$el.append(elements);
		self.setState({loading: false});
	},

	// ### Handle Branch Clicked
	_handleBranchClicked ($event) {
		$event.stopPropagation();
		const $el = $($event.currentTarget).closest('li[role="treeitem"]');
		const branch = this._getItemAdapter($el.data('item'));

		this._toggleFolder(branch);
	},

	// ### On Folder Toggled
	_onFolderToggled (branch) {
		const self = this;
		const id = branch.getId();
		const $branches = this.element.find('li[aria-level][aria-expanded]');
		const selection = this._getDataAdapter(this.getProperty('selection'));

		$branches.each(function () {
			const $branch = $(this);
			const $parents = $branch.parents('li[aria-level][aria-expanded]');
			const _level = $parents.length + 1;
			if ($branch.data('id') === id) {
				if ($($branch).attr('aria-expanded') === 'true') {
					$($branch).attr('aria-expanded', false);
				} else {
					$($branch).attr('aria-expanded', true);
				}
				$($branch).children('ul').replaceWith($(self._renderBranch(branch, selection, _level)).children('ul'));
			}
		});
	},

	// ### On Folders Closed
	_onFoldersClosed () {
		this.setProperties({ autoOpen: false });
		this.render();
	},

	// ### Handle Item Clicked
	_handleItemClicked ($event) {
		const $el = $($event.currentTarget).closest('[role="treeitem"]');

		Multiselectable.toggleItem(this, $el.data('item'), this.getProperty('selection'));
	},

	// ### Select Item
	selectItem (item, index) {
		Multiselectable.selectItem(this, item, this.getProperty('selection'), index);
	},

	// ### Select Items
	selectItems (items, index) {
		Multiselectable.selectItems(this, items, this.getProperty('selection'), index);
	},

	// ### On Select
	_onSelect (itemsToSelect, selection) {
		this.setProperties({ selection: selection._data });
		this._onSelectionUpdated(selection);

		this.trigger('selected', itemsToSelect, selection._data);
		this.trigger('changed', itemsToSelect, selection._data);
	},

	// ### On Deselect
	_onDeselect (itemsToDeselect, selection) {
		this.setProperties({ selection: selection._data });
		this._onSelectionUpdated(selection);

		this.trigger('deselected', itemsToDeselect, selection._data);
		this.trigger('changed', itemsToDeselect, selection._data);
	},

	// ### On Selection Updated
	_onSelectionUpdated (selection) {
		const self = this;
		const $items = this.element.find('li[role="treeitem"]');

		$items.each(function () {
			const $item = $(this);
			const item = self._getItemAdapter($item.data('item'));


			self._renderSelection($item, item, selection);
		});
	},

	// ### Should Auto Open
	_shouldAutoOpen (level) {
		const autoOpen = this.getProperty('autoOpen');
		const autoOpenLimit = this.getProperty('autoOpenLimit');

		return autoOpen && Lib.isNumber(level) && Lib.isNumber(autoOpenLimit) && level <= autoOpenLimit;
	}
};

// SLDS for jQuery **extends objects** by merging them together, rather than
// via the prototype chain or imitation of object-oriented inheritance.
// The important thing to remember is that _some methods will be available 
// to the component which are not declared in this file_.

// These are not magic methods, they're not black box methods, but you do need
// to trace the dependencies of the component to see where they are coming
// from.

Lib.merge(
	Tree.prototype, 
	TreeCore, 
	Events, 
	DOM, 
	State,
	TreeDefinition
);

// ### Run the helpers

// `Helpers` are a feature of SLDS for jQuery that allows anyone to register code that
// can manipulate the component before it is encapsulated in a React class.
//
// This allows flexibility for adding custom behavior without modifying the
// original source, or for adding optional behavior.
//
// For example, SLDS for jQuery uses this mechanism to optionally create
// jQuery plug-in versions of each component. Nothing in the component itself
// should ever depend on the presence of helpers, as they are completely
// optional.

Tree = Lib.runHelpers('jquery', CONTROL, Tree);

export default Tree;
