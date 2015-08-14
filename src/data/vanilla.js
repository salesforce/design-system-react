// VANILLA JS DATA ADPATER

import * as Lib from '../core/lib';
import Base from './base';

const Item = Base.Item.extend({
	// Instance methods
	get (key) {
		let result;

		if (this._item && key) {
			result = this._item[key];
		} else {
			result = this._item;
		}

		return result;
	},

	keys () {
		let result;

		if (this._item) {
			result = Object.keys(this._item);
		} else {
			result = [];
		}

		return result;
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

		if (this._data && criteria) {
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

	forEach (callback, thisArg) {
		const self = this;

		this._data.forEach(function (item) {
			const _item = new self.ItemType(item);
			callback.call(thisArg || self, _item);
		});
	},

	length () {
		return this._data.length;
	}
});

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
