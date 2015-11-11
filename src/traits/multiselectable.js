// MULTISELECTABLE
// TODO: Combine this with Selectable
// TODO: Clean up all of the "multipleItems" ternaries below

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

	_areItemsSelected (items, selection, returnCollection) {
		const itemsNotSelected = [];
		let anItemWasSelected = false;

		items.forEach( (item) => {
			if (this._isItemSelected(item, selection)) {
				anItemWasSelected = true;
			} else {
				itemsNotSelected.push(item);
			}
		});

		return returnCollection ? itemsNotSelected : anItemWasSelected;
	},
	
	_selectItem (item, selectIndex) {
		const selection = this._getSelectedItems();
		const multipleItems = Lib.isArray(item);
		const itemsPreviouslySelected = multipleItems ? this._areItemsSelected(item, selection, true) : !this._isItemSelected(item, selection);

		const _select = Lib.bind(function _select () {
			const itemsToSelect = multipleItems ? itemsPreviouslySelected : item;

			if (this.getProperty('multiSelect')) {
				if (selectIndex || selectIndex === 0) {
					selection.add(itemsToSelect, { at: selectIndex });
				} else {
					selection.add(itemsToSelect);
				}
			} else {
				selection.reset(itemsToSelect);
			}

			if (Lib.isFunction(this._onBeforeSelect)) this._onBeforeSelect(selection);
			
			this.setProperties({ selection: selection._data });

			this.trigger('changed', multipleItems ? item : item._item, selection._data);
			this.trigger('selected', multipleItems ? item : item._item, selection._data);
			
			if (Lib.isFunction(this._onSelected)) this._onSelected(selection);
		}, this);

		if ( multipleItems ? itemsPreviouslySelected.length : itemsPreviouslySelected ) {
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
		const itemsPreviouslySelected = multipleItems ? this._areItemsSelected(item, selection, true) : this._isItemSelected(item, selection);

		const _deSelect = Lib.bind(function _deSelect () {
			const itemsToDeselect = multipleItems ? itemsPreviouslySelected : item;

			selection.remove(itemsToDeselect);

			this.setProperties({ selection: selection._data });
			if (Lib.isFunction(this._onDeselected)) this._onDeselected(selection);

			this.trigger('changed', multipleItems ? item : item._item, selection._data);
			this.trigger('deselected', multipleItems ? item : item._item, selection._data);
		}, this);
		
		if (multipleItems ? itemsPreviouslySelected.length : itemsPreviouslySelected) {
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
