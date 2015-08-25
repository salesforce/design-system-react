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
		this.template = $html.find('.slds-tree');
		
		this._configureBranchSelect();
		
		this.elements.wrapper.on('click.fu.tree', 'li.slds-tree__item', $.proxy(this._handleItemClicked, this));
		
		this._render();
	},
	
	_configureBranchSelect () {
		const branchSelect = this.getProperty('folderSelect');
		
		// When folder selection is allowed...
		if (branchSelect) {
			// Branch name clicks act like item clicks
			this.elements.wrapper.on('click.fu.tree', '.slds-tree__branch button', $.proxy(this._handleBranchClicked, this));
			this.elements.wrapper.on('click.fu.tree', '.slds-tree__branch a', $.proxy(this._handleItemClicked, this));
		} else {
			this.elements.wrapper.on('click.fu.tree', 'div.slds-tree__item', $.proxy(this._handleBranchClicked, this));
		}
	},

	_handleBranchClicked ($event) {
		const $el = $($event.currentTarget).closest('li.slds-tree__item, li.slds-tree__branch');
		const branch = this._getItemAdapter($el.data('item'));
		
		this._toggleFolder(branch);
	},
	
	_onFolderToggled (branch) {
		const self = this;
		const id = branch.getId();
		const $branches = this.elements.wrapper.find('li.slds-tree__branch');
		
		$branches.each(function () {
			const $branch = $(this);
			
			if ($branch.data('id') === id) {
				$branch.replaceWith(self._renderBranch(branch));
			}
		});
	},
	
	_handleItemClicked ($event) {
		const $el = $($event.currentTarget).closest('li.slds-tree__item, li.slds-tree__branch');
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
		const $items = this.elements.wrapper.find('li.slds-tree__item, li.slds-tree__branch');
		
		$items.each(function () {
			const $item = $(this);
			const item = self._getItemAdapter($item.data('item'));
			
			self._renderSelection($item, item, selection);
		});
	},

	_render () {
		this.elements.wrapper.empty();
		
		const $el = this.template.clone().empty();

		if (this._collection.length()) {
			this._loopChildren(this._collection, $el, 1);
		}
		
		if (this.elements.wrapper.is('ul.slds-tree')) {
			this.elements.wrapper.append($el.children());
		} else {
			this.elements.wrapper.append($el);
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
		const $item = this.template.find('li.slds-tree__item').clone();
		
		$item.find('a').text(item.getText());
		$item.data({
			item: item._item
		});

		this._renderSelection($item, item);

		return $item;
	},
	
	_renderBranch (branch, level) {
		const self = this;
		const $branch = this.template.find('li.slds-tree__branch').clone();
		const $branchContent = $branch.find('.slds-tree__group');
		const $label = $branch.find('a');
		
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

		$branch.toggleClass('slds-is-open', isOpen);
		$branch.toggleClass('x-slds-is-open', !isOpen);
		$branch.attr('aria-expanded', isOpen);
		
		$branchContent.toggleClass('is-expanded', isOpen);

		if (isOpen) {
			branch._getChildren().then(function (children) {
				self._loopChildren(children, $branchContent, _level);
			});
		} else {
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
		
		$item.toggleClass('slds-is-selected', selected);
	}
});

// LEGACY METHODS

const legacyMethods = {
	discloseVisible () {
		const self = this;
		
		this.elements.wrapper.find('li.slds-tree__branch:not(.slds-is-open)').each(function () {
			const $branch = $(this);
			const _branch = $branch.data('item');
			
			self.toggleFolder(_branch);
		});
	}
};

createPlugin(CONTROL, Tree, legacyMethods);

export default Tree;
