import Lib from '../core/lib';

// CSS classes used across every control
var sharedCssClasses = {
		DISABLED: 'disabled'
	};

var Base = {
	__constructor (options) {
		if (Lib.isFunction(this.onBeforeInitialize)) this.onBeforeInitialize(options);
		
		// If this control has any sort of internal state, set it up here
		if (Lib.isFunction(this.__getInitialState)) this._state = this.__getInitialState();
		
		// Combine any classes defined on the child with global defaults
		this.cssClasses = Object.assign({}, sharedCssClasses, this._cssClasses);
		
		// If this controls does anything with options that are passed to it, do that now
		if (Lib.isFunction(this.__initializeOptions)) this.__initializeOptions(options);
		
		if (Lib.isFunction(this.onInitialized)) this.onInitialized(options);
	},
	
	__setState (values) {
		Object.assign(this._state, values);
		
		if (this.setState) {
			this.__setState = this.setState;
			this.__setState(this._state);
		}
	},
	
	__getState (key) {
		if (this.getState) {
			this.__getState = this.getState;
			return this.__getState(key);
		}
		
		if (!key) return this._state;
		if (Lib.isObject(this._state)) return this._state[key];
		
		return null;
	},
	
	version: Lib.version
};

export default Base;