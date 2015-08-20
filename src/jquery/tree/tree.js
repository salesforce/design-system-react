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
		selection: [],
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
		
		this._configureFolderSelect();
		
		this.elements.wrapper.on('click.fu.tree', '.tree-item', $.proxy(this._handleItemClicked, this));
		
		this._render();
	},
	
	_configureFolderSelect () {
		const folderSelect = this.getStore('folderSelect');
		
		// This class is copied from the example code but I'm not sure it does anything
		this.template.toggleClass('tree-folder-select', folderSelect);
		
		// When folder selection is allowed...
		if (folderSelect) {
			// Show the button instead of the span
			this.template.find('span.icon-caret').remove();
			
			// Branch name clicks act like item clicks
			this.elements.wrapper.on('click.fu.tree', 'button.icon-caret', $.proxy(this._handleFolderClicked, this));
			this.elements.wrapper.on('click.fu.tree', '.tree-branch-name', $.proxy(this._handleItemClicked, this));
		} else {
			this.template.find('button.icon-caret').remove();
			
			this.elements.wrapper.on('click.fu.tree', '.tree-branch-name', $.proxy(this._handleFolderClicked, this));
		}
	},

	_handleFolderClicked ($event) {
		const $el = $($event.currentTarget).closest('.tree-item, .tree-branch');
		const folder = Lib.getItemAdapter($el.data('item'));
		
		this._toggleFolder(folder);
	},
	
	_onFolderToggled (folder) {
		if (!this.getStore('autoOpen')) {
			const self = this;
			const id = this.accessors.getId(folder);
			const $branches = this.elements.wrapper.find('.tree-branch');
			
			$branches.each(function () {
				const $branch = $(this);
				
				if ($branch.data('id') === id) {
					self._renderBranch($branch, folder);
				}
			});
		}
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
			
			self._styleNode($item, item, selection);
		});
	},

	_render () {
		this.elements.wrapper.empty();
		
		const $el = this.template.clone().empty();

		if (this._collection.length()) {
			this._loopChildren(this._collection, $el, 1);
		}

		this.elements.wrapper.append($el);
		
		this.setStore({
			autoOpen: false
		});
	},

	_loopChildren (children, $el, level)  {
		const self = this;
		const elements = [];

		children.forEach(function buildBranch (item) {
			const $li = self._renderItem(item, level);

			elements.push($li);
		});
		
		$el.empty();
		$el.append(elements);
	},

	_renderItem (item, level) {
		const isFolder = this.accessors.getType(item) === 'folder';
		const template = isFolder ? '.tree-branch' : '.tree-item';
		const $item = this.template.find(template).clone();

		$item.find('.tree-label').text(this.accessors.getText(item));
		$item.data({
			item: item._item,
			id: this.accessors.getId(item),
			level
		});

		this._styleNode($item, item);
		
		if (isFolder) {
			this._renderBranch($item, item);
		}

		return $item;
	},
	
	_renderBranch ($branch, folder) {
		const level = $branch.data('level');
		let isOpen = this._isFolderOpen(folder);
		
		if (!isOpen && (this.getStore('autoOpen') && level <= this.getStore('autoOpenLimit'))) {
			this._toggleFolder(folder);
			isOpen = this._isFolderOpen(folder);
		}
		
		const self = this;
		
		const $treeFolderContent = $branch.find('.tree-branch-children');
		const $treeFolderContentFirstChild = $treeFolderContent.eq(0);
		
		// Take care of the state
		$branch.toggleClass('tree-open', isOpen);
		$branch.attr('aria-expanded', isOpen);
		
		$treeFolderContentFirstChild.toggleClass('hidden', !isOpen);
		
		$branch.find('> .tree-branch-header .icon-folder').eq(0)
			.toggleClass('glyphicon-folder-open', isOpen)
			.toggleClass('glyphicon-folder-close', !isOpen);

		if (isOpen) {
			$treeFolderContentFirstChild.append('<div class="tree-loader" role="alert">Loading...</div>');
			
			self._getChildren(folder).then(function (children) {
				self._loopChildren(children, $treeFolderContentFirstChild, level + 1);
			});
		} else {
			// TO-DO: Possibly cache children
			$treeFolderContentFirstChild.empty();
		}
		
		return $branch;
	},

	_styleNode ($item, item, selection) {
		const selected = this._isItemSelected(item, selection);
		const type = this.accessors.getType(item);
		const $icon = $item.find('.icon-' + type);
		
		$item.toggleClass('tree-selected', selected);
		
		if (type === 'item') {
			$icon.toggleClass('fueluxicon-bullet', !selected);
			$icon.toggleClass('glyphicon-ok', selected);
		}
	}
});

createPlugin(CONTROL, Tree);

export default Tree;
