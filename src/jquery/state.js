// STATE - JQUERY FACADE

// Core
import * as Lib from '../core/lib';

const State = {
	_initializeState () {
		this._props = Lib.extend({}, this._defaultProperties);
		this._state = Lib.extend({}, this._defaultState);
	},
	
	setProperties (values) {
		return Lib.extend(this._props, values);
	},

	getProperty (key) {
		return this._props[key];
	},
	
	setState (values) {
		return Lib.extend(this._state, values);
	},

	getState (key) {
		return this._state[key];
	}
};

export default State;
