// TO-DO: This currently imports the whole package. Surely we can somehow tell the compiler to only grab the relevant bit?
import {version} from '../package.json';

export default class FuelUX {
	static get version () {
		return version;
	}

	static hasClass (element, className) {
		return (element.className.match(new RegExp('\\b' + className + '\\b')) !== null);
	}

	static log () {
		if (window.console && window.console.log) {
			console.log(...arguments);
		}
	}

	static isFunction (potentialFunction) {
		return typeof potentialFunction === 'function';
	}

	static isNumber (potentialNumber) {
		return toString.call(potentialNumber) === '[object Number]';
	}

	static isObject (potentialObject) {
		return typeof potentialObject === 'function' || (typeof potentialObject === 'object' && !!potentialObject);
	}
	
	static findWhere (collection, criteria) {
		var found;
		
		if (!criteria) {
			return null;
		}
		
		if (FuelUX.isFunction(criteria.toJSON)) {
			criteria = criteria.toJSON();
		}

		if (FuelUX.isFunction(collection.findWhere)) {
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
	
	static getProp (obj, prop) {
		if (!obj) {
			return undefined;
		}
		
		if (FuelUX.isFunction(obj.get)) {
			return obj.get(prop);
		}
		
		return obj[prop];
	}
};
