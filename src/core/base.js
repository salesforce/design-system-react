import FuelUX from '../fuelux';

// CSS classes used across every control
var sharedCssClasses = {
		DISABLED: 'disabled'
	};

var Base = {	
	__constructor (options) {
		if (FuelUX.isFunction(this.onBeforeInitialize)) this.onBeforeInitialize(options);
		
		// If this control has any sort of internal state, set it up here
		if (FuelUX.isFunction(this.__getInitialState)) this._state = this.__getInitialState();
		
		// Combine any classes defined on the child with global defaults
		this.cssClasses = Object.assign({}, sharedCssClasses, this._cssClasses);
		
		// If this controls does anything with options that are passed to it, do that now
		if (FuelUX.isFunction(this.__initializeOptions)) this.__initializeOptions(options);
		
		if (FuelUX.isFunction(this.onInitialized)) this.onInitialized(options);
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
		if (FuelUX.isObject(this._state)) return this._state[key];
		
		return null;
	}
};

export default Base;