// STATE - JQUERY FACADE

// Core
import * as Lib from '../lib/lib';

const State = {
	_onBeforeInitialize () {
		this._initializeState();
	},
	
	_initializeState () {
		this._props = Lib.extend({}, this._defaultProperties);
		this._state = Lib.extend({}, this._defaultState);
	},
	
	// TODO: Determine whether this is the best place for this function to live
	_getOptions (args) {
		let wrapper;
		let options;
		
		if (args.length === 1) {
			// TODO: Possibly determine what type of argument this is?
			options = args[0];
		} else if (args.length > 1) {
			wrapper = args[0];
			options = args[1];
		}
		
		return Lib.extend({ wrapper }, this._defaultProperties, options);
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
