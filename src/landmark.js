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
};