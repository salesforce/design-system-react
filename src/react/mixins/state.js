// STATE - REACT FACADE

// Core
import * as Lib from '../../core/lib';

const State = {
	getInitialState () {
		const defaultState = Lib.isFunction(this._getDefaultState) ? this._getDefaultState() : {};
		return defaultState;
	},
	
	getDefaultProps () {
		const defaultStore = Lib.isFunction(this.prototype._getDefaultStore) ? this.prototype._getDefaultStore() : {};
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
