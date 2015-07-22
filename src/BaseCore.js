import {Landmark} from './Landmark';

// CSS classes used across every control
var sharedCssClasses = {
		DISABLED: 'disabled'
	};

export var BaseCore = {	
	__constructor (options) {
		if (Landmark.isFunction(this.onBeforeInitialize)) this.onBeforeInitialize(options);
		
		if (Landmark.isFunction(this.__getInitialState)) this._state = this.__getInitialState();
		
		this.Landmark = Landmark;
		this._collection = {};
		
		this.cssClasses = Object.assign({}, this._cssClasses, sharedCssClasses);
		
		if (Landmark.isFunction(this.__initializeOptions)) this.__initializeOptions(options);
		
		if (Landmark.isFunction(this.onInitialized)) this.onInitialized(options);
	},
	
	__setState (values) {
		Object.assign(this._state, values);
		
		if (this.setState) {
			this.__setState = this.setState;
			this.__setState(this._state);
		}
	},
	
	__getState (key) {
		if (!key) return this.state || this._state;
		if (Landmark.isObject(this.state)) return this.state[key];
		if (Landmark.isObject(this._state)) return this._state[key];
		return null;
	}
};