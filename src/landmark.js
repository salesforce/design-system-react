// TO-DO: This currently imports the whole package. Surely we can somehow tell the compiler to only grab the relevant bit?
import {version} from '../package.json';
import _ from 'underscore';

export class Landmark extends _ {
	static get version () {
		return version;
	}
	
	static hasClass (element, className) {
		return (element.className.match(new RegExp('\\b' + className + '\\b')) !== null);
	}
	
	static log () {
		console.log(...arguments);
	}
};