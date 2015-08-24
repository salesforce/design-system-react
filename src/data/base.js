import * as Lib from '../core/lib';

// TO-DO: this function can probably be cleaned up a little, and maybe inherit some implementation from lodash
function _extend (protoProps) {
	const parent = this;
	const child = function () {
		return parent.apply(this, arguments);
	};
	const Surrogate = function () {
		this.constructor = child;
	};

	Lib.extend(child, parent);

	Surrogate.prototype = parent.prototype;
	child.prototype = new Surrogate;

	if (protoProps) {
		Lib.extend(child.prototype, protoProps);
	}

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
			const _callback = function (item, ...callbackArgs) {
				const _item = new instance.prototype.ItemType(item);
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

		if (Lib.isObject(criteria) && !Lib.isFunction(criteria)) {
			const _criteria = Lib.getItemAdapter(criteria);

			_isMatch = function (item) {
				let match = true;

				_criteria.keys().forEach(function (key) {
					if (_criteria.get(key) !== item.get(key)) {
						match = false;
					}
				});

				return match;
			};
		} else {
			_isMatch = criteria;
		}

		return _findMatch(this, _isMatch);
	},

	get () {
		return undefined;
	}
});

['at', 'length', 'add', 'remove', 'reset', 'clone', 'forEach', 'filter', 'map', 'every'].forEach(function (method) {
	Data.prototype[method] = Lib.noop;
});

// Static methods
Data.isTypeOf = function isTypeOf () {
	return true;
};

Data._addDefaultImplementations = _addMethods;

Data.extend = Item.extend = _extend;

const Adapter = {
	Data,
	Item
};

Lib.registerAdapter('Base', Adapter);

export default Adapter;
