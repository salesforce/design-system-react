// STATE - REACT FACADE

// Core
import * as Lib from '../core/lib';

const State = {
	__initializeState (initialState) {
		var defaultState = Lib.isFunction(this.__getDefaultState) ? this.__getDefaultState() : {};
		var defaults = Lib.extend(defaultState, initialState);
		return defaults;
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
