// STATE - JQUERY FACADE

// Core
import * as Lib from '../core/lib';

const State = {
	_initializeState () {
		const defaultState = Lib.isFunction(this._getDefaultState) ? this._getDefaultState() : {};
		const defaultStore = Lib.isFunction(this._getDefaultStore) ? this._getDefaultStore() : {};
		const defaults = Lib.extend(defaultState, defaultStore);
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
