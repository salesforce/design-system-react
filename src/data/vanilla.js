// VANILLA JS DATA ADPATER

import * as Lib from '../core/lib';
import Base from './base';

const Item = Base.Item.extend({
	// Instance methods
	get (key) {
		let result;

		if (key !== undefined) {
			result = this._item[key];
		} else {
			result = this._item;
		}

		return result;
	},

	keys () {
		return Object.keys(this._item);
	}
});

// Static methods
Item.isTypeOf = function isTypeOf (item) {
	return (Lib.isObject(item));
};

const Data = Base.Data.extend({
	ItemType: Item,

	// Instance methods
	get (criteria) {
		let result;

		if (criteria !== undefined) {
			result = this.findWhere(this._data, criteria);
		} else {
			result = this._data;
		}

		return result;
	},

	at (index) {
		let result;

		if (this._data && Lib.isNumber(index)) {
			result = this._data[index];
		}

		return result;
	},
	
	length () {
		return this._data.length;
	},
	
	add (item) {
		this._data.push(item._item);
		
		return this;
	},
	
	remove (itemToRemove) {
		let indexToRemove;
		
		this.forEach(function (item, index) {
			if (indexToRemove === undefined && item._item === itemToRemove._item) {
				indexToRemove = index;
			}
		});
		
		if (indexToRemove !== undefined) {
			this._data.splice(indexToRemove, 1);
		}
		
		return this;
	},
	
	reset (item) {
		if (!item) {
			this._data.length = 0;
		} else {
			this.reset().add(item);
		}
		
		return this;
	}
});

Data._addDefaultImplementations(Data, ['forEach', 'filter', 'map', 'every']);

// Static methods
Data.isTypeOf = function isTypeOf (data) {
	return (Lib.isArray(data));
};

const Adapter = {
	Data,
	Item
};

Lib.registerAdapter('Vanilla', Adapter);

export default Adapter;
