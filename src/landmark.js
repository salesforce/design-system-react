// TO-DO: This currently imports the whole package. Surely we can somehow tell the compiler to only grab the relevant bit?
import {version} from "../package.json"

export class landmark {
	constructor () {
		this.version = version;
		this.utilities.log('Create the base class here');
	}
	
	static utilities = {
		log (val) {
			console.log(val);
		}
	}
}