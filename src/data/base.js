// Base Item & Data Adapter
// ------------------------

// Bring in the [shared library functions](../lib/lib).
import * as Lib from '../lib/lib';

// "Children" of the base adapter will use this extend method as a form of prototypical inheritance. This differs from the mix in system used by the controls themselves, and is more similar to Backbone's `extend`.
/* TODO: this function can probably be cleaned up a little, and maybe inherit some implementation from lodash */
function _extend (protoProps) {
	const parent = this;

	// Create a new function to apply the props to. This will be the "subclass."
	const child = function () {
		// The constructor of this subclass should call the constructor of the base control (which is the parent).
		return parent.apply(this, arguments);
	};

	// Pass on static properties of the parent if there are any.
	Lib.extend(child, parent);

	// Set the prototype chain to inherit from the parent, without calling the parent's constructor function.
	const Surrogate = function () {
		this.constructor = child;
	};

	Surrogate.prototype = parent.prototype;
	child.prototype = new Surrogate;

	// Add in the new instance properties.
	if (protoProps) {
		Lib.extend(child.prototype, protoProps);
	}

	// Set a convenience property in case the parent’s prototype is needed later.
	child.__super__ = parent.prototype;

	return child;
}

function _findMatch (data, isMatch) {
	let found;

	if (Lib.isFunction(isMatch)) {
		data.forEach(function (item) {
			if (!found) {
				if (isMatch(item)) {
					found = item;
				}
			}
		});
	}

	return found;
}

function _addMethods (instance, methods) {
	methods.forEach(function (method) {
		instance.prototype[method] = function (callback, ...funcArgs) {
			const self = this;
			
			const _callback = function (item, ...callbackArgs) {
				const _item = self.getItemAdapter(item);
				return callback(_item, ...callbackArgs);
			};
			
			return this._data[method](_callback, ...funcArgs);
		};
	});
}

function Item (item) {
	this._item = item;
}

Lib.extend(Item.prototype, {
	// Instance methods
	get () {
		return undefined;
	}
});

['keys'].forEach(function (method) {
	Item.prototype[method] = Lib.noop;
});

// Static methods
Item.isTypeOf = function isTypeOf () {
	return true;
};

function Data (data) {
	this._data = data;
}

Lib.extend(Data.prototype, {
	// Instance methods
	findWhere (criteria) {
		let _isMatch;

		if (!Lib.isFunction(criteria)) {
			const _criteria = Lib.getItemAdapter(criteria);

			_isMatch = function (item) {
				const keys = _criteria.keys();
				let match = keys && keys.length > 0;

				if (match) {
					keys.forEach(function (key) {
						if (!match || _criteria.get(key) !== item.get(key)) {
							match = false;
						}
					});
				}

				return match;
			};
		} else {
			_isMatch = criteria;
		}

		return _findMatch(this, _isMatch);
	},

	get () {
		return undefined;
	},
	
	clone () {
		return this;
	}
});

['at', 'indexOf', 'length', 'add', 'remove', 'reset', 'forEach', 'filter', 'map', 'every'].forEach(function (method) {
	Data.prototype[method] = Lib.noop;
});

// Static methods
Data.isTypeOf = function isTypeOf () {
	return true;
};

Data.getItemAdapter = function (_item) {
	return new this.ItemType(_item);
};

Data._addDefaultImplementations = _addMethods;

Data.extend = Item.extend = _extend;

const Adapter = {
	Data,
	Item
};

Lib.registerAdapter('Base', Adapter);

export default Adapter;
