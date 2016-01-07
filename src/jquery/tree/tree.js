// # Tree Control
// ### jQuery Facade

// Implements the Tree [design pattern](https://www.lightningdesignsystem.com/components/trees) in jQuery.

/* TODO: Add a full API description of the control here. */

// Bring in the [shared library functions](../../lib/lib.html).
import * as Lib from '../../lib/lib';
import TreeCore, {CONTROL} from '../../core/tree';

// Traits
import Eventable from '../../traits/eventable';
import Multiselectable from '../../traits/multiselectable';

// Framework Specific
import DOM from '../dom';
// [State](../state.html) and [Events](../events.html) are mixins that appear in every facade and bring some consistency between how each framework deals with instantiation, events, and state.
import State from '../state';
import Events from '../events';
const $ = Lib.global.jQuery || Lib.global.$;

// Split out some rendering logic, just to make things easier to read, button and the template that the Tree control is built from.
import Button from '../button/button';

// Template imports
import template from './tree-template';

const legacyAccessors = {
	getText (item) {
		return item.get('name');
	},

	getChildren (item) {
		return new Promise((resolve) => {
			this.getProperty('dataSource')(item._item, (response) => {
				resolve(response.data);
			});
		});
	},

	getType (item) {
		return item.get('type');
	},

	getIconClass (item) {
		const dataAttributes = item.get('dataAttributes');

		return dataAttributes && dataAttributes['data-icon'];
	},

	getExpandable (item) {
		const dataAttributes = item.get('dataAttributes');

		return dataAttributes && dataAttributes.hasChildren;
	},

	getKey (item) {
		return item.get();
	},

	getId (item) {
		const dataAttributes = item.get('dataAttributes');

		return dataAttributes.id;
	}
};

let Tree = function Tree () {
	const options = Lib.extend({
		open: []
	}, this._getOptions(arguments));

	this.template = $(template);

	if (options.dataSource) {
		options.accessors = legacyAccessors;
	}

	console.log('[tree.js:78] options:', options);

	this._initialize(options);
};

Lib.merge(Tree.prototype, TreeCore, Events, DOM, State, {
	_initializer () {
		this.element = this.$el = this.elements.control = this.template.clone();
		this.elements.list = this.element.find('.' + this.cssClasses.CONTROL);
		
		Eventable.on(this, 'select', this._onSelect, this);
		Eventable.on(this, 'deselect', this._onDeselect, this);
	},

	_onInitialized () {
		const strings = this.getState('strings');
		this.template.find('[role="alert"] img').attr('alt', strings.LOADING);
		this.element.find('.slds-text-heading--label').text(this.getProperty('heading'));
		console.log('[tree.js:93] this.getState(\'id\'):', this.getState('id'));
		this.element.attr('id', this._getControlContainerId());
	},

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

	_renderItem (item, selection, level) {
		const $item = this.template.find('li[role="treeitem"]').last().clone();

		$item.find('[role="presentation"]').text(item.getText());
		$item.attr('aria-level', level);
		$item.attr('id', this._getControlNodeId(item._item.id));
		$item.data({
			item: item._item
		});
		// console.log('[tree.js:119] item:', item);

		this._renderSelection($item, item, selection);

		return $item;
	},

	_renderBranch (branch, selection, level) {
		const strings = this.getState('strings');
		const branchId = branch.getId();
		const domId = this._getControlNodeId(branchId);
		const labelId = this._getControlNodeLabelId(branchId);
		const togglerId = this._getControlNodeTogglerId(branchId);
		const $branch = this.template.find('[aria-expanded="true"]').clone();
		const $branchLabel = $branch.find('[role="presentation"]');
		const $branchContent = $branch.find('[role="group"]');
		const $button = new Button({
			assistiveText: strings.TOGGLE_TREE_BRANCH,
			icon: 'utility.chevronright',
			iconSize: 'small',
			iconStyle: 'icon-bare'
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

			$branchContent.append($loader);

			branch._getChildren().then(resolvedChildren => {
				this._loopChildren(resolvedChildren, $branchContent, _level);
			}, error => {
				Lib.log(error);
				this._loopChildren(Lib.getDataAdapter(), $branchContent, _level);
			});
		}

		return $branch;
	},

	_renderSelection ($item, item, selection) {
		const selected = Multiselectable.isItemSelected(item, selection);
		// $item.toggleClass('slds-is-selected', selected);
		$item.children('.slds-tree__item').toggleClass('slds-is-selected', selected);
		$item.children('.slds-tree__item').attr('aria-selected', selected);
	},

	_render (level) {
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

	_onRendered () {
		this._configureBranchSelect();
		this.element.on('click', 'li[role="treeitem"]', this._handleItemClicked.bind(this));
	},

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
	},

	_handleBranchClicked ($event) {
		$event.stopPropagation();
		const $el = $($event.currentTarget).closest('li[role="treeitem"]');
		const branch = this._getItemAdapter($el.data('item'));

		this._toggleFolder(branch);
	},

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

	_onFoldersClosed () {
		this.setProperties({ autoOpen: false });
		this._render();
	},

	_handleItemClicked ($event) {
		const $el = $($event.currentTarget).closest('[role="treeitem"]');

		Multiselectable.toggleItem(this, $el.data('item'), this.getProperty('selection'));
	},

	selectItem (item, index) {
		Multiselectable.selectItem(this, item, this.getProperty('selection'), index);
	},

	selectItems (items, index) {
		Multiselectable.selectItems(this, items, this.getProperty('selection'), index);
	},

	_onSelect (itemsToSelect, selection) {
		this.setProperties({ selection: selection._data });
		this._onSelectionUpdated(selection);
	
		this.trigger('selected', itemsToSelect, selection._data);
		this.trigger('changed', itemsToSelect, selection._data);
	},

	_onDeselect (itemsToDeselect, selection) {
		this.setProperties({ selection: selection._data });
		this._onSelectionUpdated(selection);
	
		this.trigger('deselected', itemsToDeselect, selection._data);
		this.trigger('changed', itemsToDeselect, selection._data);
	},

	_onSelectionUpdated (selection) {
		const self = this;
		const $items = this.element.find('li[role="treeitem"]');

		$items.each(function () {
			const $item = $(this);
			const item = self._getItemAdapter($item.data('item'));


			self._renderSelection($item, item, selection);
		});
	},

	_shouldAutoOpen (level) {
		const autoOpen = this.getProperty('autoOpen');
		const autoOpenLimit = this.getProperty('autoOpenLimit');

		return autoOpen && Lib.isNumber(level) && Lib.isNumber(autoOpenLimit) && level <= autoOpenLimit;
	}
});

Tree = Lib.runHelpers('jquery', CONTROL, Tree);

export default Tree;
