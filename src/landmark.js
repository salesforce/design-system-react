// TO-DO: This currently imports the whole package. Surely we can somehow tell the compiler to only grab the relevant bit?
import {version} from "../package.json";

var components = {};

export class Landmark {
	static get version () {
		return version;
	}
	
	static get components () {
		return components;
	}
	
	static log (val) {
		console.log(val);
	}
	
	static isFunction (obj) {
		return toString.call(obj) === '[object Function]';
	}
	
	static findWhere (collection, criteria) {
		// TO-DO: Implement this. Should it delegate to frameworks somehow or is a vanilla implementation best?
		return {};
	}
};