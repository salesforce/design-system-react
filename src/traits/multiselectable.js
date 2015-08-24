// MULTISELECTABLE
// TO-DO: Combine this with Selectable

import * as Lib from '../core/lib';

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
		return Lib.getDataAdapter(this.getSelectedItems()).clone();
	},
	
	_isItemSelected (item, selection) {
		const _selection = selection || Lib.getDataAdapter(this.getSelectedItems());
		const key = this.accessors && this.accessors.getKey ? this.accessors.getKey(item) : item._item;
		return !!_selection.findWhere(key);
	},
	
	_selectItem (item) {
		const selection = this._getSelectedItems();
		
		if (!this._isItemSelected(item, selection) && this._canSelect(item)) {
			if (this.getProperty('multiSelect')) {
				selection.add(item);
			} else {
				selection.reset(item);
			}
			
			this.setProperties({ selection: selection._data });
			if (Lib.isFunction(this._onSelected)) this._onSelected(selection);
			
			this.trigger('changed', item._item, selection._data);
		}
	},
	
	selectItem (_item) {
		this._selectItem(Lib.getItemAdapter(_item));
	},
	
	_deselectItem (item) {
		const selection = this._getSelectedItems();
		
		if (this._isItemSelected(item, selection)) {
			selection.remove(item);
			
			this.setProperties({ selection: selection._data });
			if (Lib.isFunction(this._onDeselected)) this._onDeselected(selection);
			
			this.trigger('changed', selection._item, selection._data);
		}
	},
	
	deselectItem (_item) {
		this._deselectItem(Lib.getItemAdapter(_item));
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
