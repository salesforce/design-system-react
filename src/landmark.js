// TO-DO: This currently imports the whole package. Surely we can somehow tell the compiler to only grab the relevant bit?
import {version} from '../package.json';

export class Landmark {
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
		return typeof potentialNumber === 'number' && +potentialNumber !== potentialNumber;
	}

	static isObject (potentialObject) {
		return typeof potentialObject === 'function' || typeof potentialObject === 'object' && !!potentialObject;
	}
};
