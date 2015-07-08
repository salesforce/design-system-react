// This doesn't work, still need to figure out how to do proper named imports
import {Landmark} from "./landmark";

export class Selectlist {
	constructor () {
		this.Landmark = Landmark;
		Landmark.log('I am a Selectlist');
	}
};