// SELECTABLE

import * as Lib from '../lib/lib';

const Selectable = {
	cssClasses: {
		SELECTED: 'slds-is-selected'
	},
	
	_defaultProperties: {
		selection: null
	},
	
	_selectableProperty: 'selection',

	_setSelection (selection) {
		const _select = Lib.bind(function _select () {
			const props = {};
				
			props[this._selectableProperty] = selection;
			
			this.setProperties(props);
			
			if (Lib.isFunction(this._onSelected)) this._onSelected(this._getItemAdapter(selection));
			
			// Trigger the event using facade-native methods
			this.trigger('changed', selection);
		}, this);
		
		if (this.getProperty(this._selectableProperty) !== selection) {
			if (!Lib.isFunction(this._canSelect)) {
				_select();
			} else {
				this._canSelect(selection, _select);
			}
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

		if (item) {
			this._setSelection(item);
		}
	},

	getSelection () {
		return this._getSelection()._item;
	},

	_getSelection () {
		const selection = this.getProperty(this._selectableProperty);
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

export function customSelectable (property, overrides) {
	const CustomSelectable = {};
	const lowercase = property.toLowerCase();
	const camelCase = lowercase.charAt(0).toUpperCase() + lowercase.slice(1);
	
	Object.keys(Selectable).forEach(function (key) {
		let newKey = key;
		
		if (newKey.charAt(0) !== '_') {
			newKey = newKey.replace('Selection', camelCase);
		}
		
		CustomSelectable[newKey] = Selectable[key];
	});
	
	CustomSelectable._selectableProperty = lowercase;
	CustomSelectable._defaultProperties = {};
	CustomSelectable._defaultProperties[lowercase] = null;
	
	return Lib.extend(CustomSelectable, overrides);
}

export default Selectable;
