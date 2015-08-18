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
	this.options = Lib.extend({}, options);
	this.elements = {
		wrapper: $(element)
	};

	this._initializeState();
	
	this.setStore({ selection: [] });
	this.setStore({ open: [] });
	
	this._initialize(this.options);
};

Lib.extend(Tree.prototype, TreeCore, Events, State, {
	_onInitialized () {
		if (!this.rendered) {
			this._render();
		}

		this.elements.wrapper.on('click.fu.tree', '.tree-branch-name', $.proxy(this._handleItemClicked, this));
		this.elements.wrapper.on('click.fu.tree', 'button.icon-caret', $.proxy(this._handleFolderClicked, this));
		this.elements.wrapper.on('click.fu.tree', '.tree-item', $.proxy(this._handleItemClicked, this));
	},

	_render () {
		this.elements.wrapper.empty();
		
		const $html = $('<i />').append(fs.readFileSync(__dirname + '/tree.html', 'utf8'));

		if (this.getState('folderSelect')) {
			this.$html = $html.find('.tree.tree-folder-select').clone();
		} else {
			this.$html = $html.find('.tree:not(.tree-folder-select)').clone();
		}

		const $el = this.$html.clone().empty();

		if (this._collection.length()) {
			this._loopChildren(this._collection, $el);
		}

		this.elements.wrapper.append($el);
	},

	_renderItem (item) {
		const template = this.accessors.getType(item) === 'folder' ? '.tree-branch' : '.tree-item';
		const $item = this.$html.find(template).clone();

		$item.find('.tree-label').text(this.accessors.getText(item));
		$item.data({
			item: item._item,
			id: this.accessors.getId(item)
		});

		this._styleNode($item, item);

		return $item;
	},

	_loopChildren (children, $el)  {
		const self = this;
		const elements = [];

		children.forEach(function buildBranch (item) {
			const $li = self._renderItem(item);

			elements.push($li);
		});
		
		$el.empty();
		$el.append(elements);
	},
	
	_handleFolderClicked ($event) {
		const $el = $($event.currentTarget).closest('.tree-item, .tree-branch');
		const item = Lib.getItemAdapter($el.data('item'));
		
		this._toggleFolder(item);
	},
	
	_onFolderToggled (folder, state) {
		const self = this;
		const id = this.accessors.getId(folder);
		const $branches = this.elements.wrapper.find('.tree-branch');
		
		$branches.each(function () {
			const $branch = $(this);
			
			if ($branch.data('id') === id) {
				const $treeFolderContent = $branch.find('.tree-branch-children');
				const $treeFolderContentFirstChild = $treeFolderContent.eq(0);
		
				// Take care of the styles
				$branch.toggleClass('tree-open', state);
				$branch.attr('aria-expanded', state);
				$treeFolderContentFirstChild.toggleClass('hidden', !state);
				$branch.find('> .tree-branch-header .icon-folder').eq(0)
					.toggleClass('glyphicon-folder-open', state)
					.toggleClass('glyphicon-folder-close', !state);

				if (state) {
					$treeFolderContentFirstChild.append('<div class="tree-loader" role="alert">Loading...</div>');
					
					self._getChildren(folder).then(function (children) {
						self._loopChildren(children, $treeFolderContentFirstChild);
					});
				} else {
					// TO-DO: Possibly cache children
					$treeFolderContentFirstChild.empty();
				}
			}
		});
	},
	
	_handleItemClicked ($event) {
		const $el = $($event.currentTarget).closest('.tree-item, .tree-branch');
		const item = Lib.getItemAdapter($el.data('item'));
		
		if (this.accessors.getType(item) === 'folder' && !this.getStore('folderSelect')) {
			this._handleFolderClicked($event);
		} else {
			const selected = this._isItemSelected(item);
			
			if (selected) {
				this._deselectItem(item);
			} else {
				this._selectItem(item);
			}
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
