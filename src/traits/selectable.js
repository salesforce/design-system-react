// SELECTABLE

import * as Lib from '../core/lib';

const isNonDisabledItem = function isNonDisabledItem (item) {
	return item.get('disabled') && !item.get('_itemType');
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
		if (this.getState('selection') !== newSelection) {
			this.setState({ selection: newSelection });
			if (Lib.isFunction(this._onSelected)) this._onSelected(newSelection);
			
			// Trigger the event using facade-native methods
			this.trigger('changed', newSelection);
		}
	},

	// Pass any combination of key / value pairs
	setSelection (criteria) {
		let item = this._collection.findWhere(criteria);
		
		if (item) {
			item = item._item;
		}

		return this.__setSelection(item);
	},
	
	setSelectionByIndex (index) {
		const item = this._collection.at(index);

		this.__setSelection(item);
	},

	getSelection () {
		return this.getState('selection');
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

		selection = Lib.findWhere(this._collection.filter(isNonDisabledItem), { text: new RegExp('^[' + letter + ']', 'i') }); // TODO: Cache the filter results

		if (selection) this.__setSelection(selection);
	}
};

export default Selectable;
