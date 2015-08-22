export const version = '__VERSION__';

export const global = (typeof self === 'object' && self.self === self && self) ||
			(typeof global === 'object' && global.global === global && global);

// Helpers
import partial from 'lodash/function/partial';
export { partial };

import partialRight from 'lodash/function/partialRight';
export { partialRight };

export { default as noop } from 'lodash/utility/noop';

// DOM
export function hasClass (element, className) {
	return element.className.match(new RegExp('\\b' + className + '\\b')) !== null;
}

export function outerWidth (element) {
	return element.offsetWidth;
}

export function setWidth (element, width) {
	element.setAttribute('style', 'width:' + width + 'px');
	element.style.width = width + 'px';
}

export function wrapElement (element) {
	this[0] = element;
	this.element = element;
	this.hasClass = partial(hasClass, element);
	this.outerWidth = partial(outerWidth, element);
	this.width = partial(setWidth, element);
	
	return this;
}

// Browser
export function log () {
	if (global.console && global.console.log) {
		console.log(...arguments);
	}
}

// Type Helpers
import isFunction from 'lodash/lang/isFunction';
export { isFunction };

export { default as isNumber } from 'lodash/lang/isNumber';

export { default as isString } from 'lodash/lang/isString';

export { default as isRegExp } from 'lodash/lang/isRegExp';

import isArray from 'lodash/lang/isArray';
export { isArray };

export { default as isBoolean } from 'lodash/lang/isBoolean';

export { default as isObject } from 'lodash/lang/isObject';

// Data Helpers
export { default as extend } from 'lodash/object/extend';

import merge from 'lodash/object/merge';
const customMerge = partialRight(merge, function (a, b, key) {
	if (key === '_initializer' && isFunction(a) && isFunction(b)) {
		return function () {
			b.apply(this, arguments);
			a.apply(this, arguments);
		};
	}
});
export { customMerge as merge };

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
