// STRING DATA ADPATER

import * as Lib from '../core/lib';
import Base from './base';

const Item = Base.Item.extend({
	// Instance methods
	get (key) {
		let result;
		
		if (!Lib.isFunction(this.textProp) || this.textProp() === key) {
			result = this._item;
		}
		
		return result;
	},

	keys () {
		const keys = [];
		
		if (Lib.isFunction(this.textProp)) {
			keys.push(this.textProp());
		}
		
		return keys;
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
