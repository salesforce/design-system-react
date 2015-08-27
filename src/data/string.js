// STRING DATA ADPATER

import * as Lib from '../core/lib';
import Base from './base';

const Item = Base.Item.extend({
	// Instance methods
	get () {
		return this._item;
	},

	keys () {
		return ['text'];
	}
});

// Static methods
Item.isTypeOf = function isTypeOf (item) {
	return (Lib.isString(item));
};

const Data = Base.Data.extend({
	ItemType: Item
});

Data.isTypeOf = function isTypeOf () {
	return false;
};

const Adapter = {
	Data,
	Item
};

Lib.registerAdapter('String', Adapter);

export default Adapter;
