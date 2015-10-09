// VANILLA JS DATA ADPATER

import * as Lib from '../lib/lib';
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
	
	indexOf (criteria) {
		let index = -1;
		
		this._data.forEach(function (item, i) {
			if (index < 0 && item === criteria._item) {
				index = i;
			}
		});
		
		return index;
	},
	
	length () {
		return this._data.length;
	},
	
	add (addition, options) {
		const itemAddition = Lib.isArray(addition) ? addition : [addition];

		itemAddition.forEach( (item, itemIndex) => {
			if (options && options.at) {
				this._data.splice(options.at + itemIndex, 0, item);
			} else {
				this._data.push(item._item);
			}
		});
		
		return this;
	},
	
	remove (removal) {
		const _remove = Lib.bind(function _remove (itemToRemove) {
			let indexToRemove;

			this.forEach(function (item, index) {
				if (indexToRemove === undefined && item._item === itemToRemove._item) {
					indexToRemove = index;
				}
			});

			if (indexToRemove !== undefined) {
				this._data.splice(indexToRemove, 1);
			}
		}, this);

		if (Lib.isArray(removal)) {
			removal.forEach( (item) => {
				_remove(item);
			});
		} else {
			_remove(removal);
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
	},
	
	clone () {
		this._data = this._data.slice(0);
		
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
