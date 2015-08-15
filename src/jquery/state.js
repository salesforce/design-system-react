// STATE - JQUERY FACADE

// Core
import * as Lib from '../core/lib';

const State = {
	__initializeState () {
		var defaultState = Lib.isFunction(this.__getDefaultState) ? this.__getDefaultState() : {};
		var defaultStore = Lib.isFunction(this.__getDefaultStore) ? this.__getDefaultStore() : {};
		var defaults = Lib.extend(defaultState, defaultStore);
		this._state = defaults;
	},
	
	setState (values) {
		return Lib.extend(this._state, values);
	},

	getState (key) {
		return this._state[key];
	}
};

// Alias
State.setStore = State.setState;
State.getStore = State.getState;

export default State;
