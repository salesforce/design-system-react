import * as Lib from '../core/lib';

function _extend (protoProps) {
	var parent = this;
	var child = function () {
		return parent.apply(this, arguments);
	};
	var Surrogate = function () {
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

function _isRegexMatch (string, regex) {
	if (!Lib.isRegExp(regex) || !isString(string)) {
		return false;
	}

	return string.match(regex);
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

function Item (item) {
	this._item = item;
}

Lib.extend(Item.prototype, {
	// Instance methods
	get () {
		return undefined;
	},
	
	keys () {
		return undefined;
	}
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
					if (_criteria.get(key) !== item.get(key) && !_isRegexMatch(item.get(key), _criteria.get(key))) {
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
	},
	
	at () {
		return undefined;
	},
	
	forEach () { }
});

// Static methods
Data.isTypeOf = function isTypeOf () {
	return true;
};

Data.extend = Item.extend = _extend;

const Adapter = {
	Data,
	Item
};

Lib.registerAdapter('Base', Adapter);

export default Adapter;
