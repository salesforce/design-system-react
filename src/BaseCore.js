import {Landmark} from './Landmark';

// CSS classes used across every control
var sharedCssClasses = {
		DISABLED: 'disabled'
	};

export var BaseCore = {	
	__constructor (options) {
		if (Landmark.isFunction(this.onBeforeInitialize)) this.onBeforeInitialize(options);
		
		// If this control has any sort of internal state, set it up here
		if (Landmark.isFunction(this.__getInitialState)) this._state = this.__getInitialState();
		
		// Add an internal reference to Landmark for the child to use
		this.Landmark = Landmark;
		
		// Combine any classes defined on the child with global defaults
		this.cssClasses = Object.assign({}, sharedCssClasses, this._cssClasses);
		
		// If this controls does anything with options that are passed to it, do that now
		if (Landmark.isFunction(this.__initializeOptions)) this.__initializeOptions(options);
		
		if (Landmark.isFunction(this.onInitialized)) this.onInitialized(options);
	},
	
	// If this is a React control there is built in state management that we want to use instead
	__setState (values) {
		Object.assign(this._state, values);
		
		if (this.setState) {
			this.__setState = this.setState;
			this.__setState(this._state);
		}
	},
	
	// If this is a React control there is a built in state store that we want to use instead
	__getState (key) {
		if (!key) return this.state || this._state;
		if (Landmark.isObject(this.state)) return this.state[key];
		if (Landmark.isObject(this._state)) return this._state[key];
		return null;
	}
};