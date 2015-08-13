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

export function isObject (potentialObject) {
	return isFunction(potentialObject) || (typeof potentialObject === 'object' && !!potentialObject);
}

// Model Helpers
export function getProp (obj, prop) {
	if (!obj) {
		return undefined;
	}

	if (isFunction(obj.get)) {
		return obj.get(prop);
	}

	return obj[prop];
}

// Collection Helpers
function _isRegexMatch (string, regex) {
	if (!isRegExp(regex) || !isString(string)) {
		return false;
	}

	return string.match(regex);
}

function _findMatch (collection, isMatch) {
	let found;

	if (!isFunction(isMatch)) {
		return null;
	}

	collection.forEach(function (item) {
		if (!found) {
			if (isMatch(item)) {
				found = item;
			}
		}
	});

	return found || null;
}

export function findWhere (collection, criteria) {
	const _criteria = (isObject(_criteria) && isFunction(_criteria.toJSON) && _criteria.toJSON()) || criteria;
	let _isMatch;

	if (isObject(_criteria) && !isFunction(_criteria)) {
		_isMatch = function (item) {
			let match = true;
			let innerItem = item;

			if (isFunction(innerItem.toJSON)) {
				innerItem = innerItem.toJSON();
			}

			Object.keys(_criteria).forEach(function (key) {
				if (_criteria[key] !== innerItem[key] && !_isRegexMatch(innerItem[key], _criteria[key])) {
					match = false;
				}
			});

			return match;
		};
	} else {
		_isMatch = _criteria;
	}

	return _findMatch(collection, _isMatch);
}

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
