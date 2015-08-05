// SELECTABLE

import Lib from '../core/lib';

var Selectable = {
	__setSelection (newSelection) {
		if (Lib.getProp(newSelection, 'disabled')) {
			return;
		}
		
		if (this.__getState('selection') !== newSelection) {
			if (Lib.isFunction(this.onBeforeSelection)) this.onBeforeSelection(this.__getState('selection'), newSelection);
			this.__setState({ selection: newSelection });
			if (Lib.isFunction(this.onSelected)) this.onSelected(newSelection);
		}
	},

	// Pass any combination of key / value pairs
	setSelection (criteria) {
		var item = Lib.findWhere(this._collection, criteria);

		return this.__setSelection(item);
	},

	// Legacy Fuel UX functionality - select by position
	setSelectionByIndex (index) {
		if (!this._collection) {
			return;
		}

		var item;

		if (Lib.isFunction(this._collection.at)) {
			item = this._collection.at(index);
		} else {
			item = this._collection[index];
		}

		return this.__setSelection(item);
	},
	
	getSelection () {
		return this.__getState('selection') || null;
	},

	clearSelection () {
		this.__setSelection();
	}
};

export default Selectable;