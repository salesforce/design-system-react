// MULTISELECTABLE
// TODO: Combine this with Selectable

import * as Lib from '../lib/lib';

const Multiselectable = {
	cssClasses: {
		SELECTED: 'selected'
	},
	
	_defaultProperties: {
		selection: []
	},

	getSelectedItems () {
		return this.getProperty('selection');
	},
	
	_getSelectedItems () {
		return this._getDataAdapter(this.getSelectedItems()).clone();
	},
	
	_isItemSelected (item, selection) {
		const _selection = selection || this._getDataAdapter(this.getSelectedItems());
		const key = Lib.isFunction(item.getKey) ? item.getKey() : item._item;
		return !!_selection.findWhere(key);
	},

	_areItemsSelected (items, selection) {
		let itemIsSelected;

		items.forEach( (item) => {
			if (this._isItemSelected(item, selection)) {
				itemIsSelected = true;
			}
		});

		return !!itemIsSelected;
	},
	
	_selectItem (item, selectIndex) {
		const selection = this._getSelectedItems();
		const multipleItems = Lib.isArray(item);

		const _select = Lib.bind(function _select () {
			if (this.getProperty('multiSelect')) {
				if (selectIndex || selectIndex === 0) {
					selection.add(item, { at: selectIndex });
				} else {
					selection.add(item);
				}
			} else {
				selection.reset(item);
			}

			if (Lib.isFunction(this._onBeforeSelect)) this._onBeforeSelect(selection);
			
			this.setProperties({ selection: selection._data });

			this.trigger('changed', [item._item, selection._data]);
			this.trigger('selected', [item._item, selection._data]);
			
			if (Lib.isFunction(this._onSelected)) this._onSelected(selection);
		}, this);

		if ( multipleItems ? !this._areItemsSelected(item, selection) : !this._isItemSelected(item, selection) ) {
			if (!Lib.isFunction(this._canSelect)) {
				_select();
			} else {
				this._canSelect(item, _select);
			}
		}
	},
	
	selectItem (_item) {
		this._selectItem(this._getItemAdapter(_item));
	},

	selectItems (_items, index) {
		const itemsForAdapter = [];

		_items.forEach( (item) => {
			itemsForAdapter.push(this._getItemAdapter(item));
		});

		this._selectItem(itemsForAdapter, index);
	},
	
	_deselectItem (item) {
		const selection = this._getSelectedItems();
		const multipleItems = Lib.isArray(item);

		const _deSelect = Lib.bind(function _deSelect () {
			selection.remove(item);

			this.setProperties({ selection: selection._data });
			if (Lib.isFunction(this._onDeselected)) this._onDeselected(selection);

			this.trigger('changed', [item._item, selection._data]);
			this.trigger('deselected', [item._item, selection._data]);
		}, this);
		
		if (multipleItems ? this._areItemsSelected(item, selection) : this._isItemSelected(item, selection)) {
			if (!Lib.isFunction(this._canDeselect)) {
				_deSelect();
			} else {
				this._canDeselect(item, _deSelect);
			}
		}
	},
	
	deselectItem (_item) {
		this._deselectItem(this._getItemAdapter(_item));
	},

	deselectItems (_items) {
		const itemsForAdapter = [];

		_items.forEach( (item) => {
			itemsForAdapter.push(this._getItemAdapter(item));
		});

		this._deselectItem(itemsForAdapter);
	},

	deselectAll () {
		const selection = this._getSelectedItems();
		
		selection.reset(null);

		this.setProperties({ selection: selection._data });
		if (Lib.isFunction(this._onDeselected)) this._onDeselected(selection);
			
		this.trigger('changed', null, selection._data);
	}
};

export default Multiselectable;
