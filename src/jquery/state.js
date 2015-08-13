// STATE - JQUERY FACADE

// Core
import * as Lib from '../core/lib';

const State = {
	__initializeState () {
		this._state = {};
	},
	
	setState (values) {
		return Lib.extend(this._state, values);
	},

	getState (key) {
		return this._state[key];
	}
};

export default State;
