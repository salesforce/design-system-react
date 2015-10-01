// TREE CONTROL - JQUERY FACADE

// Core
import * as Lib from '../../lib/lib';
import TreeCore, {CONTROL} from '../../core/tree';

// Framework Specific
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

let Tree = function Tree (element, options) {
	this.options = Lib.extend({
		open: []
	}, options);

	this.elements = {
		wrapper: $(element)
	};

	const $html = $('<i />').append(template);
	this.template = $html.find('.' + this.cssClasses.CONTROL);
	
	if (this.options.dataSource) {
		this.options.accessors = legacyAccessors;
	}

	this._initializeState();
	this._initialize(this.options);
};

Lib.extend(Tree.prototype, TreeCore, Events, State, {
	_onInitialized () {
		const strings = this.getState('strings');
		this.template.find('.tree-loader').text(strings.LOADING);

		this._configureBranchSelect();

		this.elements.wrapper.on('click.fu.tree', '.tree-item', $.proxy(this._handleItemClicked, this));

		this._render();

		this.trigger('initialized');
	},

	selectItem (item) {
		this._selectItem( this._getItemAdapter(item.jquery ? item.data('item') : item) );
	},

	_configureBranchSelect () {
		const branchSelect = this.getProperty('folderSelect');

		// This class is copied from the example code but I'm not sure it does anything
		this.template.toggleClass('tree-folder-select', branchSelect);

		// When folder selection is allowed...
		if (branchSelect) {
			// Show the button instead of the span
			this.template.find('span.icon-caret').remove();

			// Branch name clicks act like item clicks
			this.elements.wrapper.on('click.fu.tree', 'button.icon-caret', $.proxy(this._handleBranchClicked, this));
			this.elements.wrapper.on('click.fu.tree', '.tree-branch-name', $.proxy(this._handleItemClicked, this));
		} else {
			this.template.find('button.icon-caret').remove();

			this.elements.wrapper.on('click.fu.tree', '.tree-branch-name', $.proxy(this._handleBranchClicked, this));
		}
	},

	_handleBranchClicked ($event) {
		const $el = $($event.currentTarget).closest('.tree-item, .tree-branch');
		const branch = this._getItemAdapter($el.data('item'));

		this._toggleFolder(branch);
	},

	_onFolderToggled (branch) {
		const self = this;
		const id = branch.getId();
		const $branches = this.elements.wrapper.find('.tree-branch');

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
		const $el = $($event.currentTarget).closest('.tree-item, .tree-branch');
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
		const $items = this.elements.wrapper.find('.tree-branch, .tree-item');

		$items.each(function () {
			const $item = $(this);
			const item = self._getItemAdapter($item.data('item'));

			self._renderSelection($item, item, selection);
		});
	},

	_render () {
		const self = this;
		const $el = this.template.clone().empty();

		if (this._collection.length()) {
			this._loopChildren(this._collection, $el, 1);
		} else if (this.options.dataSource) {
			this.options.dataSource({}, (response) => {
				self._collection = self._getDataAdapter(response.data);
				self._loopChildren(self._collection, $el, 1);
			});
		}

		// Prep for append
		this.elements.wrapper.empty();

		if (this.elements.wrapper.is('ul')) {
			this.elements.wrapper.attr('class', $el.attr('class'));
			this.elements.wrapper.attr('role', $el.attr('role'));
			this.elements.wrapper.append($el.children());
		} else {
			this.elements.wrapper.append($el);
			this.elements.wrapper = $el;
		}
	},

	_loopChildren (children, $el, level)  {
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

	_renderItem (item) {
		const $item = this.template.find('.tree-item').clone();

		$item.find('.tree-label').text(item.getText());
		$item.data({
			item: item._item
		});

		this._renderSelection($item, item);

		return $item;
	},

	_renderBranch (branch, level) {
		const $branch = this.template.find('.tree-branch').clone();
		const $branchContent = $branch.find('.tree-branch-children');
		const $branchIcon = $branch.find('> .tree-branch-header .icon-folder');
		const $label = $branch.find('.tree-label');

		$label.text(branch.getText());
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

		$branch.toggleClass('tree-open', isOpen);
		$branch.attr('aria-expanded', isOpen);

		$branchContent.toggleClass('hidden', !isOpen);

		$branchIcon
			.toggleClass('glyphicon-folder-open', isOpen)
			.toggleClass('glyphicon-folder-close', !isOpen);

		if (isOpen) {
			const $loader = this.template.find('.tree-loader').clone();

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

	_shouldAutoOpen (level) {
		const autoOpen = this.getProperty('autoOpen');
		const autoOpenLimit = this.getProperty('autoOpenLimit');

		return autoOpen && Lib.isNumber(level) && Lib.isNumber(autoOpenLimit) && level <= autoOpenLimit;
	},

	_renderSelection ($item, item, selection) {
		const selected = this._isItemSelected(item, selection);
		const $icon = $item.find('.icon-item');

		$item.toggleClass('tree-selected', selected);
		$icon.toggleClass('glyphicon-ok', selected);
		$icon.toggleClass('fueluxicon-bullet', !selected);
	}
});

// LEGACY METHODS

const legacyMethods = {

	destroy () {
		this.elements.wrapper.remove();

		return template;
	},

	selectedItems () {
		const selection = this._getSelectedItems();

		return selection.get();
	},

	selectFolder ($folder) {
		this.selectItem($folder);
	},

	openFolder ($folder) {
		if (!$folder.hasClass('tree-open')) {
			this.toggleFolder($folder);
		}
	},

	closeFolder ($folder) {
		if ($folder.hasClass('tree-open')) {
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

		this.elements.wrapper.find('.tree-branch:not(.tree-open)').each(function () {
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
