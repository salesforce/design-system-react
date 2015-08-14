// BACKBONE DATA ADPATER

import * as Lib from '../core/lib';
import Base from './base';

// Framework specific
import Backbone from 'backbone';

const Item = Base.Item.extend({
	// Instance methods
	get (key) {
		let result;

		if (this._item && key) {
			result = this._item.get(key);
		} else {
			result = this._item.toJSON();
		}

		return result;
	},

	keys () {
		let result;

		if (this._item) {
			result = this._item.keys();
		} else {
			result = [];
		}

		return result;
	}
});

// Static methods
Item.isTypeOf = function isTypeOf (item) {
	return (item instanceof Backbone.Model);
};

const Data = Base.Data.extend({
	ItemType: Item,

	// Instance methods
	get (criteria) {
		let result;

		if (this._data && criteria) {
			result = this.findWhere(this._data, criteria);
		} else {
			result = this._data.toJSON();
		}

		return result;
	},

	at (index) {
		let result;

		if (this._data && index) {
			result = this._data.at(index);
		}

		return result;
	},

	forEach (callback, thisArg) {
		const self = this;

		this._data.forEach(function (item) {
			const _item = new self.ItemType(item);
			callback.call(thisArg || self, _item);
		});
	}
});

// Static methods
Data.isTypeOf = function isTypeOf (data) {
	return (data instanceof Backbone.Collection);
};

const Adapter = {
	Data,
	Item
};

Lib.registerAdapter('Backbone', Adapter);

export default Adapter;
