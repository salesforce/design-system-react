export default class Lib {
	static get version () {
		return '__VERSION__';
	}

	// DOM
	static hasClass (element, className) {
		return (element.className.match(new RegExp('\\b' + className + '\\b')) !== null);
	}

	// Browser
	static log () {
		if (Lib.global.console && Lib.global.console.log) {
			console.log(...arguments);
		}
	}
	
	static get global () {
		return (typeof self == 'object' && self.self == self && self) ||
			(typeof global == 'object' && global.global == global && global);
	}

	// Type Helpers
	static isFunction (potentialFunction) {
		return typeof potentialFunction === 'function';
	}

	static isNumber (potentialNumber) {
		return toString.call(potentialNumber) === '[object Number]';
	}
	
	static isString (potentialString) {
		return toString.call(potentialString) === '[object String]';
	}
	
	static isRegExp (potentialRegExp) {
		return toString.call(potentialRegExp) === '[object RegExp]';
	}

	static isObject (potentialObject) {
		return Lib.isFunction(potentialObject) || (typeof potentialObject === 'object' && !!potentialObject);
	}

	// Model Helpers
	static getProp (obj, prop) {
		if (!obj) {
			return undefined;
		}
		
		if (Lib.isFunction(obj.get)) {
			return obj.get(prop);
		}
		
		return obj[prop];
	}

	// Collection Helpers
	static findWhere (collection, criteria) {
		var found;
		
		function isRegexMatch(string, regex) {
			if (!Lib.isRegExp(regex) || !Lib.isString(string)) {
				return false;
			}
			
			return string.match(regex);
		}
		
		if (!criteria) {
			return null;
		}
		
		if (Lib.isFunction(criteria.toJSON)) {
			criteria = criteria.toJSON();
		}

		if (Lib.isFunction(collection.findWhere)) {
			found = collection.findWhere(criteria);
		} else {
			collection.forEach(function(item) {
				if (!found) {
					var match = true;
					var innerItem = item.attributes ? item.attributes : item;
					Object.keys(criteria).forEach(function(key) {
						if (criteria[key] !== innerItem[key] && !isRegexMatch(innerItem[key], criteria[key])) {
							match = false;
						}
					});

					if (match) {
						found = item;
					}
				}
			});
		}
		
		return found || null;
	}
	
	static extend (target) {
		for (var i = 1; i < arguments.length; i++) {
			var source = arguments[i];
			
			for (var key in source) {
				if (Object.prototype.hasOwnProperty.call(source, key)) {
					if (Object.prototype.hasOwnProperty.call(target, key) &&
						target[key] && typeof target[key] === 'object' &&
						source[key] && typeof source[key] === 'object') {
						target[key] = Lib.extend(target[key], source[key]); // Combine objects
					} else {
						target[key] = source[key];
					}
				}
			}
		}
		
		return target;
	}
};
