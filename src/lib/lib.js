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
import isArray from 'lodash/lang/isArray';
export { isArray };

export { default as isBoolean } from 'lodash/lang/isBoolean';

import isFunction from 'lodash/lang/isFunction';
export { isFunction };

export { default as isNumber } from 'lodash/lang/isNumber';

import isObject from 'lodash/lang/isObject';
export { isObject };

export function isPromise (value) {
	return isObject(value) && isFunction(value.then);
}

export { default as isRegExp } from 'lodash/lang/isRegExp';

import isString from 'lodash/lang/isString';
export { isString };

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
		element.className = element.className.replace(new RegExp('(^|\\b)\\s?' + className.split(' ').join('|') + '(\\b|$)', 'gi'), '');
	}
}

export function toggleClass (element, className) {
	return element && typeof className === 'string' && hasClass(element, className) ? removeClass(element, className) : addClass(element, className);
}

export function getDocumentOffset (element) {
	const rect = element.getBoundingClientRect();
	
	return {
		top: rect.top + document.body.scrollTop,
		left: rect.left + document.body.scrollLeft
	};
}

// `elementOffset` provides the distance from the `baseElement` to the element. If the `baseElement` is comes before `element` the number will be positive.
export function getElementOffset (element, baseElement) {
	const elementDocumentOffset = getDocumentOffset(element);
	const baseElementDocumentOffset = getDocumentOffset(baseElement);

	return {
		top: elementDocumentOffset.top - baseElementDocumentOffset.top,
		left: elementDocumentOffset.left - baseElementDocumentOffset.left
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

export function isOffscreen (element, returnAttachmentKey) {
	const windowHeight = window.innerHeight || document.documentElement.clientHeight || 0;
	const scrollTop = window.pageYOffset || document.documentElement.scrollTop || 0;
	const elementOffset = getDocumentOffset(element);
	const topOffset = elementOffset.top;
	const bottomOffset = elementOffset.top + outerHeight(element, true);
	let results = false;

	if (returnAttachmentKey) {
		if (bottomOffset > windowHeight + scrollTop) {
			results = 'bottom';
		}
		if (!results && topOffset < scrollTop ) {
			results = 'top';
		}
	} else {
		results = bottomOffset > windowHeight + scrollTop || topOffset < scrollTop;
	}

	return results;
}

// This is a CSS feature detection function that returns a working CSS style.
export function getSupportedCSSTransformKey () {
	if (typeof document === 'undefined') {
		return '';
	}
	const element = document.createElement('div');

	const transforms = ['webkitTransform', 'OTransform', 'MozTransform', 'msTransform'];
	for (let i = 0; i < transforms.length; ++i) {
		const key = transforms[i];
		if (element.style[key] !== undefined) {
			return key;
		}
	}
}

export function isValidDate (strDate) {
	const myDateStr = new Date(strDate);

	return !isNaN(myDateStr.getMonth());
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
	this.toggleClass = partial(toggleClass, element);
	this.offset = partial(getDocumentOffset, element);
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

// Utility
export { default as uniqueId } from 'lodash/utility/uniqueId';

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
	if (/(_onBeforeInitialize|_initializer|_onInitialized|_onDestroy)/.test(key) && isFunction(a) && isFunction(b)) {
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
	
	if (isPromise(strings)) {
		Promise.resolve(strings).then(resolvedStrings => {
			_strings = resolvedStrings;
		});
	}
}

export function getStrings (callback) {
	if (isPromise(_strings)) {
		_strings.then(callback);
	} else {
		callback(_strings);
	}
	
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

export function getSVGPath (iconProperty) {
	// TODO: Evaluate best way to do this and clean this up more
	const iconPaths = getIconPaths();
	const icon = isString(iconProperty) && iconProperty.split('.');
	
	if (icon.length === 2) {
		const iconPath = iconPaths[icon[0]];
		
		if (iconPath) {
			return [iconPath, icon[1]].join('#');
		}
	}
	
	// TODO: For now, if an appropriate path is not found we are going to assume that we were given one
	return iconProperty;
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
