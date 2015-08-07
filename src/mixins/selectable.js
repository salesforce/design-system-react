// SELECTABLE

import Lib from '../core/lib';

var isNonDisabledItem = function isNonDisabledItem (item) {
	var isNonDisabledItem = !Lib.getProp(item, 'disabled') && (!Lib.getProp(item, '_itemType') || Lib.getProp(item, '_itemType') === 'item');
	return isNonDisabledItem;
};

var Selectable = {
	cssClasses: {
		SELECTED: 'selected'
	},

	__initializeSelectable (options) {
		if (options && Lib.isObject(options.selection)) {
			this.setSelection(options.selection);
		} else {
			this.clearSelection();
		}
	},

	__setSelection (newSelection) {
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
	},

	// For keyboard nav
	__jumpToLetter (letter) {
		if (Lib.isNumber(letter)) {
			letter = String.fromCharCode(letter);
		}

		if (letter.length !== 1) {
			return;
		}

		if (letter === '\\') {
			letter = '\\\\';
		}

		var selection = Lib.findWhere(this._collection.filter(isNonDisabledItem), { name: new RegExp('^[' + letter + ']', 'i') });//TODO: Cache the filter results

		if (selection) this.__setSelection(selection);
	}
};

export default Selectable;