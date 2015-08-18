// BACKBONE DATA ADPATER

import * as Lib from '../core/lib';
import Base from './base';

// Framework specific
import Backbone from 'backbone';

const Item = Base.Item.extend({
	// Instance methods
	get (key) {
		let result;

		if (key !== undefined) {
			result = this._item.get(key);
		} else {
			result = this._item.toJSON();
		}

		return result;
	},

	keys () {
		return this._item.keys();
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

		if (criteria !== undefined) {
			result = this.findWhere(this._data, criteria);
		} else {
			result = this._data.toJSON();
		}

		return result;
	},

	at (index) {
		let result;

		if (this._data && Lib.isNumber(index)) {
			result = this._data.at(index);
		}

		return result;
	},
	
	add (item) {
		this._data.add(item._item);
		
		return this;
	},
	
	remove (item) {
		this._data.remove(item._item);
		
		return this;
	},
	
	reset (item) {
		this._data.reset(item);
		
		return this;
	}
});

Data._addDefaultImplementations(Data, ['forEach', 'filter', 'map', 'every']);

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
