// STATE - MARIONETTE FACADE

// Core
import * as Lib from '../core/lib';

// Framework specific
import Backbone from 'backbone';

const State = {
	_initializeState () {
		var defaultState = Lib.isFunction(this._getDefaultState) ? this._getDefaultState() : {};
		var defaultStore = Lib.isFunction(this._getDefaultStore) ? this._getDefaultStore() : {};
		var defaults = Lib.extend(defaultState, defaultStore);
		
		if (this.model) {
			this.model.set(Lib.extend(defaults, this.model.toJSON()));
		} else {
			this.model = new Backbone.Model(defaults);
		}
	},
	
	setState (values) {
		return this.model.set(values);
	},

	getState (key) {
		return this.model.get(key);
	}
};

// Alias
State.setStore = State.setState;
State.getStore = State.getState;

export default State;
