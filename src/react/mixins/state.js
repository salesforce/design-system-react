// STATE - REACT FACADE

// Core
import * as Lib from '../../core/lib';

const State = {
	getInitialState () {
		var defaultState = Lib.isFunction(this.__getDefaultState) ? this.__getDefaultState() : {};
		return defaultState;
	},
	
	getDefaultProps () {
		var defaultStore = Lib.isFunction(this.__getDefaultStore) ? this.__getDefaultStore() : {};
		return defaultStore;
	},
	
	getState (key) {
		return this.state[key];
	},
	
	setStore () {
		// Do nothing, intentionally. Perhaps throw an event here some day?
	},

	getStore (key) {
		return this.props[key];
	}
};

export default State;
