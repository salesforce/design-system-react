// STATE - JQUERY FACADE

// Core
import * as Lib from '../core/lib';

const State = {
	__initializeState () {
		this.state = {};
	},
	
	setState (values) {
		return Lib.extend(this.state, values);
	},

	getState (key) {
		return this.state[key];
	}
};

export default State;
