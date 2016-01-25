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

// ===================================
// DOM Manipulation and Calculation
// ===================================

/* `returnFocusToPopupTrigger` returns the focus to an input or button from a modal or downdown menu. */
export function returnFocusToPopupTrigger (controlContext) {
	const trigger = controlContext.elements.control[0].querySelector('[aria-haspopup=true]');
	if (trigger) {
		trigger.focus();
	}
}

// CSS Classes & style
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

/* `isElementInDocument` will iterate through the ancestors of element to see if it is a child of a document. It will return false if the element is the document. */
export function isElementInDocument (element) {
	let _element = element;
	while (_element) {
		_element = _element.parentNode;
		if (_element === document) {
			return true;
		}
	}
	return false;
}

/* `getScrollingParent` iterates through the ancestors of an element in order to find a parent that has has overflow settings set to allow scroll. This is useful with modals. */
export function getScrollingParent (element) {
	// Firefox: If the element is in an `iframe` with `display: none;` `window.getComputedStyle()` will be `null`; https://bugzilla.mozilla.org/show_bug.cgi?id=548397
	const computedStyle = window.getComputedStyle(element) || {};
	const position = computedStyle.position;

	// If position is fixed, a scrolling parent does not matter.
	if (position === 'fixed') {
		return element;
	}

	// Loop through the parent nodes of the element and see if any have overflow or position CSS attributes. If no parents have these, the document element will be returned.
	let parent = element;
	while (parent) {
		parent = parent.parentNode;
		let style;
		try {
			style = window.getComputedStyle(parent);
		} catch (err) {
			/* Do nothing */
		}

		// Check to see if parent is the document element
		if (typeof style === 'undefined' || style === null) {
			return parent;
		}

		const {overflow, overflowX, overflowY} = style;
		if (/(auto|scroll|hidden)/.test(overflow + overflowY + overflowX)) {
			if (position !== 'absolute' || ['relative', 'absolute', 'fixed'].indexOf(style.position) >= 0) {
				return parent;
			}
		}
	}

	return document.body;
}

/* `getStyle` is a cross-browser method to get style properties. A `try`/`catch` is needed in case the node does not have a `getComputedStyle`. */
export function getStyle (element, property) {
	let style = undefined;
	try {
		style = getComputedStyle(element);
		return style[property];
	} catch (err) {
		/* Do nothing */
	}
}

/* `isStyleHidden` returns `false` if the element is invisible. */
export function isStyleHidden (element) {
	if (getStyle(element, 'opacity') === '0' ||
			getStyle(element, 'display') === 'none' ||
			getStyle(element, 'visibility') === 'hidden') {
		return true;
	}
}
/* When `includeMargin` is set to `true`, `outerHeight` returns the true height due to margin being counted. */
export function outerHeight (element, includeMargin) {
	let height = element.offsetHeight;
	
	if (includeMargin) {
		const style = getComputedStyle(element);
		height += parseInt(style.marginTop, 10) + parseInt(style.marginBottom, 10);
	}
	
	return height;
}

/* When `includeMargin` is set to `true`, `outerWidth` returns the true width due to margin being counted. */
export function outerWidth (element, includeMargin) {
	let width = element.offsetWidth;
	
	if (includeMargin) {
		const style = getComputedStyle(element);
		width += parseInt(style.marginLeft, 10) + parseInt(style.marginRight, 10);
	}
	
	return width;
}

/* `padOffsets` adds or substracts an arbitary amount of padding to offsets. This is useful for modifying document relative offsets. */
export function padOffsets (offsets, padding) {
	const _padding = padding || {top: 0, right: 0, bottom: 0, left: 0};
	return {
		top: offsets.top + _padding.top,
		right: offsets.right - _padding.right,
		bottom: offsets.bottom - _padding.bottom,
		left: offsets.left + _padding.left
	};
}

/* `getDocumentOffset` returns an element's boundaries. */
export function getDocumentOffset (element) {
	const rect = element.getBoundingClientRect();
	const top = rect.top + document.body.scrollTop;
	const	left = rect.left + document.body.scrollLeft;

	return {
		top: top,
		right: left + outerWidth(element, true),
		bottom: top + outerHeight(element, true),
		left: left
	};
}

// `elementOffset` provides the distance from the `baseElement` to the element. If the `baseElement` is above the `element` then the number will be positive.
export function getElementOffset (element, baseElement) {
	const elementDocumentOffset = getDocumentOffset(element);
	const baseElementDocumentOffset = getDocumentOffset(baseElement);

	return {
		top: elementDocumentOffset.top - baseElementDocumentOffset.top,
		left: elementDocumentOffset.left - baseElementDocumentOffset.left
	};
}

/* `viewportBounds` returns the document relative offsets of the viewport window. */
export function getViewportOffset () {
	const top = window.pageYOffset || document.documentElement.scrollTop || 0;
	const left = window.pageXOffset || document.documentElement.scrollLeft || 0;
	const bottom = top + (window.innerHeight || document.documentElement.clientHeight || 0);
	const right = left + (window.innerWidth || document.documentElement.clientWidth || 0);

	const bounds = {
		top: top,
		right: right,
		bottom: bottom,
		left: left
	};

	return bounds;
}

/* `isOutsideBounds` detects if the element is outside the  The parameter `padding` is an inside margin (padding) that changes the boundaries if boundaries need to be modified. */
export function isOutsideBounds (element, constrainingElement, padding) {
	const _padding = padding || {top: 0, right: 0, bottom: 0, left: 0};
	const elementBounds = getDocumentOffset(element);
	let bounds = {top: 0, right: 0, bottom: 0, left: 0};
	let isOutOfBounds = false;

	if (constrainingElement === window) {
		bounds = padOffsets(getViewportOffset(), _padding);
	} else {
		bounds = padOffsets(getDocumentOffset(constrainingElement), _padding);
	}

	const outOfBounds = {
		top: elementBounds.top < bounds.top,
		right: elementBounds.right > bounds.right,
		bottom: elementBounds.bottom > bounds.bottom,
		left: elementBounds.left < bounds.left
	};

	if (outOfBounds.top || outOfBounds.right || outOfBounds.bottom || outOfBounds.left) {
		isOutOfBounds = outOfBounds;
	}

	return isOutOfBounds;
}

/* `isVisible` detects if all or part of the element is hidden. */
export function isVisible (element) {
	const scrollingParent = getScrollingParent(element);
	const parentBoundaryPadding = {top: 5, right: 5, bottom: 5, left: 5};
	let _isVisible = true;

	// Try to catch edge cases before we do DOM element offset calculations
	if (!isElementInDocument(element) ||
		isStyleHidden(element) ||
		isOutsideBounds(element, scrollingParent, parentBoundaryPadding)) {
		_isVisible = false;
	}

	return _isVisible;
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
	if (!isFunction(wrapped.isVisible)) {
		wrapped.isVisible = partial(isVisible, wrapped[0]);
	}
	if (!isFunction(wrapped.isOffscreen)) {
		wrapped.isOffscreen = partial(isOutsideBounds, wrapped[0], window);
	}
	
	return wrapped;
}


export function isValidDate (strDate) {
	const myDateStr = new Date(strDate);

	return !isNaN(myDateStr.getMonth());
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
