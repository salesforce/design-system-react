// STATE - JQUERY FACADE

// Core
import * as Lib from '../core/lib';

const State = {
	_initializeState () {
		var defaultState = Lib.isFunction(this._getDefaultState) ? this._getDefaultState() : {};
		var defaultStore = Lib.isFunction(this._getDefaultStore) ? this._getDefaultStore() : {};
		var defaults = Lib.extend(defaultState, defaultStore);
		this._state = defaults;
	},
	
	setState (values) {
		return Lib.extend(this.state, values);
	},

	getState (key) {
		return this.state[key];
	}
};

// Alias
State.setStore = State.setState;
State.getStore = State.getState;

export default State;
