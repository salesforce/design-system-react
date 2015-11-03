// TREE CONTROL - JQUERY FACADE

// Core
import * as Lib from '../../lib/lib';
import TreeCore, {CONTROL} from '../../core/tree';

// Framework Specific
import DOM from '../dom';
import Events from '../events';
import State from '../state';

const $ = Lib.global.jQuery || Lib.global.$;

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
	
	this._initialize(options);
};

Lib.merge(Tree.prototype, TreeCore, Events, DOM, State, {
	_initializer () {
		this.element = this.$el = this.elements.control = this.template.clone();
		this.elements.list = this.element.find('.' + this.cssClasses.CONTROL);
	},
	
	_onInitialized () {
		const strings = this.getState('strings');
		this.template.find('.slds-tree__loader').text(strings.LOADING);
	},

	selectItem (item) {
		this._selectItem(this._getItemAdapter(item.jquery ? item.data('item') : item));
	},

	_configureBranchSelect () {
		const branchSelect = this.getProperty('folderSelect');

		// When folder selection is allowed...
		if (branchSelect) {
			// Branch name clicks act like item clicks
			this.element.on('click.fu.slds-tree', 'button.slds-button', $.proxy(this._handleBranchClicked, this));
			this.element.on('click.fu.slds-tree', '.slds-tree__branch--name', $.proxy(this._handleItemClicked, this));
		} else {
			this.element.on('click.fu.slds-tree', '.slds-tree__branch--name', $.proxy(this._handleBranchClicked, this));
		}
	},
	
	_renderItem (item) {
		const $item = this.template.find('li.slds-tree__item').clone();

		$item.find('.slds-tree__item-label').text(item.getText());
		$item.data({
			item: item._item
		});

		this._renderSelection($item, item);

		return $item;
	},

	_renderBranch (branch, level) {
		const $branch = this.template.find('.slds-tree__branch').clone();
		const $branchContent = $branch.find('.slds-tree__group');

		$branch.find('.slds-tree__branch--name').text(branch.getText());

		$branch.data({
			item: branch._item,
			id: branch.getId()
		});

		this._renderSelection($branch, branch);

		// Expandable?
		const isExpandable = branch.getExpandable();

		$branch.attr('data-has-children', isExpandable ? undefined : 'false');

		// Take care of the state
		let isOpen = this._isFolderOpen(branch);
		let _level;

		if (!isOpen && this._shouldAutoOpen(level)) {
			this._toggleFolder(branch, {
				silent: true
			});

			isOpen = this._isFolderOpen(branch);
			_level = level + 1;
		}

		$branch.toggleClass('slds-is-open', isOpen);
		$branch.attr('aria-expanded', isOpen);

		if (isOpen) {
			const $loader = this.template.find('.slds-tree__loader').clone();

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
		const selected = this._isItemSelected(item, selection);

		$item.toggleClass('slds-is-selected', selected);
	},

	_render () {
		const dataSource = this.getProperty('dataSource');

		if (this._collection.length()) {
			this._loopChildren(this._collection, this.elements.list, 1);
		} else if (dataSource) {
			dataSource({}, (response) => {
				this._collection = this._getDataAdapter(response.data);
				this._loopChildren(this._collection, this.elements.list, 1);
			});
		}
		
		return this.element;
	},
	
	_onRendered () {
		this._configureBranchSelect();

		this.element.on('click.fu.slds-tree', 'li.slds-tree__item', $.proxy(this._handleItemClicked, this));
	},

	_loopChildren (children, $el, level) {
		const self = this;
		const elements = [];

		children.forEach(function buildBranch (item) {
			const isBranch = item.getType() === 'folder';

			if (!isBranch) {
				elements.push(self._renderItem(item));
			} else {
				elements.push(self._renderBranch(item, level));
			}
		});

		$el.empty();
		$el.append(elements);
	},
	
	_handleBranchClicked ($event) {
		const $el = $($event.currentTarget).closest('li.slds-tree__item, .slds-tree__branch');
		const branch = this._getItemAdapter($el.data('item'));

		this._toggleFolder(branch);
	},

	_onFolderToggled (branch) {
		const self = this;
		const id = branch.getId();
		const $branches = this.element.find('.slds-tree__branch');

		$branches.each(function () {
			const $branch = $(this);

			if ($branch.data('id') === id) {
				$branch.replaceWith(self._renderBranch(branch));
			}
		});
	},

	_onFoldersClosed () {
		this.setProperties({ autoOpen: false });
		this._render();
	},

	_handleItemClicked ($event) {
		const $el = $($event.currentTarget).closest('li.slds-tree__item, .slds-tree__branch');
		const item = this._getItemAdapter($el.data('item'));
		const selected = this._isItemSelected(item);

		if (selected) {
			this._deselectItem(item);
		} else {
			this._selectItem(item);
		}
	},

	_onSelected (selection) {
		this._onSelectionUpdated(selection);
	},

	_onDeselected (selection) {
		this._onSelectionUpdated(selection);
	},

	_onSelectionUpdated (selection) {
		const self = this;
		const $items = this.element.find('.slds-tree__branch, li.slds-tree__item');

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

// LEGACY METHODS

const legacyMethods = {
	selectedItems () {
		const selection = this._getSelectedItems();

		return selection.get();
	},

	selectFolder ($folder) {
		this.selectItem($folder);
	},

	openFolder ($folder) {
		if (!$folder.hasClass('slds-is-open')) {
			this.toggleFolder($folder);
		}
	},

	closeFolder ($folder) {
		if ($folder.hasClass('slds-is-open')) {
			this.toggleFolder($folder);
		}
	},

	toggleFolder ($folder) {
		this._toggleFolder(this._getItemAdapter($folder.data('item')));
	},

	closeAll () {
		this.closeAllFolders();
	},

	discloseAll () {
		this.setProperties({
			autoOpen: true,
			autoOpenLimit: 100
		});
		this._render();
	},

	discloseVisible () {
		const self = this;

		this.element.find('.slds-tree__branch:not(.slds-is-open)').each(function () {
			const $branch = $(this);
			const _branch = $branch.data('item');

			self.toggleFolder(_branch);
		});
	},

	refresh () {
		this._render();
	},

	render () {
		this._render();
	}
};

Tree = Lib.runHelpers('jquery', CONTROL, Tree, {
	legacyMethods
});

export default Tree;
