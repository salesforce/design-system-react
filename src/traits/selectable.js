// SELECTABLE

import Lib from '../core/lib';

const isNonDisabledItem = function isNonDisabledItem (item) {
	return !Lib.getProp(item, 'disabled') && (!Lib.getProp(item, '_itemType') || Lib.getProp(item, '_itemType') === 'item');
};

const Selectable = {
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
		const item = Lib.findWhere(this._collection, criteria);

		return this.__setSelection(item);
	},

	// Legacy Fuel UX functionality - select by position
	setSelectionByIndex (index) {
		let item;

		if (!this._collection) {
			return;
		}

		if (Lib.isFunction(this._collection.at)) {
			item = this._collection.at(index);
		} else {
			item = this._collection[index];
		}

		this.__setSelection(item);
	},

	getSelection () {
		return this.__getState('selection') || null;
	},

	clearSelection () {
		this.__setSelection();
	},

	// For keyboard nav
	__jumpToLetter (input) {
		let letter = input;
		let selection;

		if (Lib.isNumber(letter)) {
			letter = String.fromCharCode(letter);
		}

		if (letter.length !== 1) {
			return;
		}

		if (letter === '\\') {
			letter = '\\\\';
		}

		selection = Lib.findWhere(this._collection.filter(isNonDisabledItem), { name: new RegExp('^[' + letter + ']', 'i') }); // TODO: Cache the filter results

		if (selection) this.__setSelection(selection);
	}
};

export default Selectable;
