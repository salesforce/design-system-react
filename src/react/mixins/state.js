// STATE - REACT FACADE

// Core
import * as Lib from '../../lib/lib';

const State = {
	getDefaultProps () {
		return Lib.extend({}, this.prototype._defaultProperties);
	},

	getInitialState () {
		return Lib.extend({}, this._defaultState);
	},
	
	setProperties: Lib.noop,

	getProperty (key) {
		return this.props[key];
	},

	getState (key) {
		return this.state[key];
	}
};

export default State;
