export const version = '__VERSION__';

export const global = (typeof self === 'object' && self.self === self && self) ||
			(typeof global === 'object' && global.global === global && global);

// DOM
export function hasClass (element, className) {
	return (element.className.match(new RegExp('\\b' + className + '\\b')) !== null);
}

// Browser
export function log () {
	if (global.console && global.console.log) {
		console.log(...arguments);
	}
}

// Type Helpers
export function isFunction (potentialFunction) {
	return typeof potentialFunction === 'function';
}

export function isNumber (potentialNumber) {
	return toString.call(potentialNumber) === '[object Number]';
}

export function isString (potentialString) {
	return toString.call(potentialString) === '[object String]';
}

export function isRegExp (potentialRegExp) {
	return toString.call(potentialRegExp) === '[object RegExp]';
}

export function isArray (potentialArray) {
	return toString.call(potentialArray) === '[object Array]';
}

export function isObject (potentialObject) {
	return isFunction(potentialObject) || (typeof potentialObject === 'object' && !!potentialObject);
}

// Data Helpers
export function extend (target) {
	for (let i = 1; i < arguments.length; i++) {
		const source = arguments[i];

		for (const key in source) {
			if (Object.prototype.hasOwnProperty.call(source, key)) {
				if (Object.prototype.hasOwnProperty.call(target, key) &&
					target[key] && typeof target[key] === 'object' &&
					source[key] && typeof source[key] === 'object') {
					target[key] = extend({}, target[key], source[key]); // Combine objects
				} else {
					target[key] = source[key];
				}
			}
		}
	}

	return target;
}

const _adapters = [];

export function registerAdapter (name, Adapter) {
	if (!_adapters.name) {
		_adapters[name] = Adapter;
		_adapters.unshift(Adapter);
	}
}

export function getItemAdapter (item) {
	let _item;
	
	_adapters.forEach(function (Adapter) {
		if (!_item && item instanceof Adapter.Item) {
			_item = item;
		} else if (!_item && Adapter.Item.isTypeOf(item)) {
			_item = new Adapter.Item(item);
		}
	});
	
	return _item;
}

export function getDataAdapter (data) {
	let _data;
	
	_adapters.forEach(function (Adapter) {
		if (!_data && data instanceof Adapter.Data) {
			_data = data;
		} else if (!_data && Adapter.Data.isTypeOf(data)) {
			_data = new Adapter.Data(data);
		}
	});
	
	return _data;
}
