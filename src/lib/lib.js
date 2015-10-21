export const version = '__VERSION__';

export const global = (typeof self === 'object' && self.self === self && self) ||
			(typeof global === 'object' && global.global === global && global);

// Functions
import partial from 'lodash/function/partial';
export { partial };

import partialRight from 'lodash/function/partialRight';
export { partialRight };

export { default as noop } from 'lodash/utility/noop';

export { default as bind } from 'lodash/function/bind';

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

// DOM
export function hasClass (element, className) {
	return element.className.match(new RegExp('\\b' + className + '\\b')) !== null;
}

export function addClass (element, className) {
	if (element && typeof className === 'string' && !hasClass(element, className)) {
		element.className += ' ' + className;
	}
}

export function removeClass (element, className) {
	if (element && typeof className === 'string') {
		element.className = element.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
	}
}

export function offset (element) {
	const rect = element.getBoundingClientRect();
	
	return {
		top: rect.top + document.body.scrollTop,
		left: rect.left + document.body.scrollLeft
	};
}

export function offsetFromParent (element, parent) {
	const elementOffset = offset(element);
	const parentOffset = offset(parent);

	return {
		top: elementOffset.top - parentOffset.top,
		left: elementOffset.left - parentOffset.left
	};
}

export function outerHeight (element, includeMargin) {
	let height = element.offsetHeight;
	
	if (includeMargin) {
		const style = getComputedStyle(element);
		height += parseInt(style.marginTop, 10) + parseInt(style.marginBottom, 10);
	}
	
	return height;
}

export function outerWidth (element, includeMargin) {
	let width = element.offsetWidth;
	
	if (includeMargin) {
		const style = getComputedStyle(element);
		width += parseInt(style.marginLeft, 10) + parseInt(style.marginRight, 10);
	}
	
	return width;
}

export function isOffscreen (element, details) {
	const windowHeight = window.innerHeight || document.documentElement.clientHeight || 0;
	const scrollTop = window.pageYOffset || document.documentElement.scrollTop || 0;
	const elmentOffset = offset(element);
	const top = elmentOffset.top;
	const bottom = elmentOffset.top + outerHeight(element, true);
	let results = false;

	if (details) {
		results = bottom > windowHeight + scrollTop ? 'bottom' : false;
		if (!results) {
			results = top < scrollTop ? 'top' : false;
		}
	} else {
		results = bottom > windowHeight + scrollTop || top < scrollTop;
	}

	return results;
}

export function setWidth (element, width) {
	element.setAttribute('style', 'width:' + width + 'px');
	element.style.width = width + 'px';
}

function WrappedElement (element) {
	this[0] = element;
	this.element = element;
	this.hasClass = partial(hasClass, element);
	this.addClass = partial(addClass, element);
	this.removeClass = partial(removeClass, element);
	this.offset = partial(offset, element);
	this.outerHeight = partial(outerHeight, element);
	this.outerWidth = partial(outerWidth, element);
	this.width = partial(setWidth, element);

	return this;
}

export function wrapElement (element) {
	let wrapped = element;
	
	// Don't re-wrap if this is already a jQuery $el or has already been wrapped
	if (!isFunction(wrapped.hasClass)) {
		wrapped = new WrappedElement(element);
	}
	
	// Special function to check if the element is offScreen (not a jQuery method clone)
	if (!isFunction(wrapped.isOffscreen)) {
		wrapped.isOffscreen = partial(isOffscreen, wrapped[0]);
	}
	
	return wrapped;
}

// Browser
export function log () {
	if (global.console && global.console.log) {
		console.log(...arguments);
	}
}

// Data
import extend from 'lodash/object/extend';
export { extend };

import merge from 'lodash/object/merge';
const customMerge = partialRight(merge, function (a, b, key) {
	if (/(_onBeforeInitialize|_initializer|_onInitialized)/.test(key) && isFunction(a) && isFunction(b)) {
		return function () {
			b.apply(this, arguments);
			a.apply(this, arguments);
		};
	}
});
export { customMerge as merge };

const _adapters = [];

export function registerAdapter (name, Adapter) {
	if (!_adapters[name]) {
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

// Strings
let _strings;

export function registerStrings (strings) {
	_strings = strings;
}

export function getStrings () {
	return Promise.resolve(_strings);
}

import defaultStrings from './strings';
registerStrings(defaultStrings);

// Icons
const _icons = {};

export function registerIconPaths (icons) {
	customMerge(_icons, icons);
}

export function getIconPaths () {
	return _icons;
}

// TODO: Generate JS icon module, currently one manually created file. Advise against multiple JS files due to need to register/modify if they change
import defaultIcons from './iconPaths';
registerIconPaths(defaultIcons);

// Helpers
const _controlHelpers = {};

export function registerHelper (name, helper, frameworks) {
	if (isArray(frameworks)) {
		frameworks.forEach(framework => {
			if (!_controlHelpers[framework]) {
				_controlHelpers[framework] = [];
			}

			if (!_controlHelpers[framework][name]) {
				_controlHelpers[framework][name] = helper;
				_controlHelpers[framework].unshift(helper);
			}
		});
	}
}

export function runHelpers (framework, name, Control, options) {
	const helpers = _controlHelpers[framework];
	let _control = Control;

	if (isArray(helpers)) {
		helpers.forEach(helper => _control = helper(name, _control, options));
	}

	return _control;
}
