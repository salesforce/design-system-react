// TO-DO: This currently imports the whole package. Surely we can somehow tell the compiler to only grab the relevant bit?
import {version} from "../package.json";

export class Landmark {
	constructor () {
		Landmark.log('Running version ' + this.version);
	}
	
	get version () {
		return version;
	}
	
	static log (val) {
		console.log(val);
	}
};