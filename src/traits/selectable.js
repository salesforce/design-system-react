// SELECTABLE

import * as Lib from '../lib/lib';

const Selectable = {
	cssClasses: {
		SELECTED: 'selected'
	},
	
	_defaultProperties: {
		selection: null
	},

	_setSelection (newSelection) {
		if (this.getSelection() !== newSelection && (!Lib.isFunction(this._canSelect) || this._canSelect(newSelection))) {
			this.setProperties({ selection: newSelection });
			if (Lib.isFunction(this._onSelected)) this._onSelected(this._getItemAdapter(newSelection));
			
			// Trigger the event using facade-native methods
			this.trigger('changed', newSelection);
		}
	},

	// Pass any combination of key / value pairs
	setSelection (criteria) {
		let item = this._collection.findWhere(criteria);
		
		if (item) {
			item = item._item;
		} else {
			item = criteria;
		}

		return this._setSelection(item);
	},
	
	setSelectionByIndex (index) {
		const item = this._collection.at(index);

		this._setSelection(item);
	},

	getSelection () {
		return this.getProperty('selection');
	},

	_getSelection () {
		const selection = this.getSelection();
		let item = this._collection.findWhere(selection);
		
		if (!item) {
			item = this._getItemAdapter(selection);
		}
		
		return item;
	},

	clearSelection () {
		this._setSelection();
	}
};

export default Selectable;
