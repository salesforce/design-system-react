// TREE CONTROL - JQUERY FACADE

// Core
import * as Lib from '../../core/lib';
import TreeCore, {CONTROL} from '../../core/tree';

// Framework Specific
import createPlugin from '../createPlugin';
import Events from '../events';
import State from '../state';

const $ = Lib.global.jQuery || Lib.global.Zepto || Lib.global.ender || Lib.global.$;

// Template imports
const fs = require('fs');

const Tree = function Tree (element, options) {
	this.options = Lib.extend({
		open: []
	}, options);
	
	this.elements = {
		wrapper: $(element)
	};

	this._initializeState();
	this._initialize(this.options);
};

Lib.extend(Tree.prototype, TreeCore, Events, State, {
	_onInitialized () {
		const $html = $('<i />').append(fs.readFileSync(__dirname + '/tree.html', 'utf8'));
		this.template = $html.find('.tree');
		
		this._configureBranchSelect();
		
		this.elements.wrapper.on('click.fu.tree', '.tree-item', $.proxy(this._handleItemClicked, this));
		
		this._render();
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
		const branch = Lib.getItemAdapter($el.data('item'));
		
		this._toggleFolder(branch);
	},
	
	_onFolderToggled (branch) {
		const self = this;
		const id = this.accessors.getId(branch);
		const $branches = this.elements.wrapper.find('.tree-branch');
		
		$branches.each(function () {
			const $branch = $(this);
			
			if ($branch.data('id') === id) {
				$branch.replaceWith(self._renderBranch(branch));
			}
		});
	},
	
	_handleItemClicked ($event) {
		const $el = $($event.currentTarget).closest('.tree-item, .tree-branch');
		const item = Lib.getItemAdapter($el.data('item'));
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
			const item = Lib.getItemAdapter($item.data('item'));
			
			self._renderSelection($item, item, selection);
		});
	},

	_render () {
		this.elements.wrapper.empty();
		
		const $el = this.template.clone().empty();

		if (this._collection.length()) {
			this._loopChildren(this._collection, $el, 1);
		}
		
		if (this.elements.wrapper.is('ul.tree')) {
			this.elements.wrapper.append($el.children());
		} else {
			this.elements.wrapper.append($el);
		}
	},

	_loopChildren (children, $el, level)  {
		const self = this;
		const elements = [];

		children.forEach(function buildBranch (item) {
			const isBranch = self.accessors.getType(item) === 'folder';

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
		
		$item.find('.tree-label').text(this.accessors.getText(item));
		$item.data({
			item: item._item
		});

		this._renderSelection($item, item);

		return $item;
	},
	
	_renderBranch (branch, level) {
		const self = this;
		const $branch = this.template.find('.tree-branch').clone();
		const $branchContent = $branch.find('.tree-branch-children');
		const $branchIcon = $branch.find('> .tree-branch-header .icon-folder');
		const $label = $branch.find('.tree-label');
		
		$label.text(this.accessors.getText(branch));
		$branch.data({
			item: branch._item,
			id: this.accessors.getId(branch)
		});
		
		this._renderSelection($branch, branch);
		
		// Expandable?
		const isExpandable = this.accessors.getExpandable(branch);
		
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
			
			this._getChildren(branch).then(function (children) {
				self._loopChildren(children, $branchContent, _level);
			});
		} else {
			// TO-DO: Possibly cache children
			$branchContent.empty();
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
	discloseVisible () {
		const self = this;
		
		this.elements.wrapper.find('.tree-branch:not(.tree-open)').each(function () {
			const $branch = $(this);
			const _branch = $branch.data('item');
			
			self.toggleFolder(_branch);
		});
	}
};

createPlugin(CONTROL, Tree, legacyMethods);

export default Tree;
