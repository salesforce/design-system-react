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
			this.render();
		}

		this.elements.wrapper.on('click.fu.tree', '.tree-branch-name', $.proxy(this._handleFolderClicked, this));
		this.elements.wrapper.on('click.fu.tree', '.tree-item', $.proxy(this._handleItemClicked, this));
	},

	render () {
		this.elements.wrapper.empty();
		
		const $html = $('<i />').append( fs.readFileSync(__dirname + '/tree.html', 'utf8') );

		if (this.getState('folderSelect')) {
			this.$html = $html.find('.tree.tree-folder-select').clone();
		} else {
			this.$html = $html.find('.tree:not(.tree-folder-select)').clone();
		}

		this.$html.clone().empty();

		if (this._collection.length()) {
			this._loopChildren(this._collection, this.$html);
		}

		this.elements.wrapper.append(this.$html);
	},

	renderItem (item, template) {
		const $item = this.$html.find(template).clone();
		const id = this.accessors.getId(item);

		$item.find('.tree-label').text(this.accessors.getText(item));
		$item.data({ item: item._item });
		$item.data({ id });

		this._styleNode($item, item);

		return $item;
	},

	_loopChildren (children, $el)  {
		const self = this;

		children.forEach(function buildBranch (item) {
			const type = self.accessors.getType(item);

			let $li;

			if (type === 'folder') {
				$li = self.renderItem(item, '.tree-branch');
			} else if (type === 'item') {
				$li = self.renderItem(item, '.tree-item');
			}

			$el.append($li);
		});
	},

	populate (el) {
		const $el = $(el);
		const item = Lib.getItemAdapter($el.data('item'));
		const self = this;
		let resp;

		resp = this.accessors.getChildren( item );

		resp.then(function (children) {
			self._loopChildren(children, $el.find('.tree-branch-children'));
		});
	},
	
	_handleFolderClicked ($event) {
		const $el = $($event.currentTarget);
		const item = $el.closest('.tree-branch').data('item');
		
		if (this.getStore('folderSelect')) {
			this.selectItem(item);
		} else {
			this.toggleFolder(item);
		}
	},
	
	_onFolderToggled (folder, state) {
		const id = this.accessors.getId(folder);
		const $branch = this.elements.wrapper.find('.tree-branch[data-id="' + id + '"]');
		const $treeFolderContent = $branch.find('.tree-branch-children');
		const $treeFolderContentFirstChild = $treeFolderContent.eq(0);

		// Take care of the styles
		$branch.toggleClass('tree-open', state);
		$branch.attr('aria-expanded', state);
		$treeFolderContentFirstChild.toggleClass('hidden', !state);
		$branch.find('> .tree-branch-header .icon-folder').eq(0)
			.toggleClass('glyphicon-folder-open', state)
			.toggleClass('glyphicon-folder-close', !state);

		// Remove chidren if no cache
		if (!state && !this.getStore('cacheItems')) {
			$treeFolderContentFirstChild.empty();
		}
	},
	
	_handleItemClicked ($event) {
		const $el = $($event.currentTarget);
		const item = $el.data('item');
		
		this.selectItem(item);
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
