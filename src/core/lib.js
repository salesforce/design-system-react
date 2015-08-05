export default class Lib {
	static get version () {
		return '__VERSION__';
	}

	// DOM
	static hasClass (element, className) {
		return (element.className.match(new RegExp('\\b' + className + '\\b')) !== null);
	}

	// Logging
	static log () {
		if (window.console && window.console.log) {
			console.log(...arguments);
		}
	}

	// Type Helpers
	static isFunction (potentialFunction) {
		return typeof potentialFunction === 'function';
	}

	static isNumber (potentialNumber) {
		return toString.call(potentialNumber) === '[object Number]';
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
						if (criteria[key] !== innerItem[key]) {
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
};
