import * as Lib from './lib';
import '../data/vanilla';

const Base = {
	// CSS classes used across every control
	cssClasses: {
		NAMESPACE: 'fuelux'
	},

	__constructor (options) {
		if (Lib.isFunction(this.onBeforeInitialize)) this.onBeforeInitialize(options);

		// If this control has any sort of internal state, set it up here
		if (Lib.isFunction(this.__getInitialState)) this.setState(this.__getInitialState());

		// If this controls does anything with options that are passed to it, do that now
		if (Lib.isFunction(this.__initializeOptions)) this.__initializeOptions(options);

		if (Lib.isFunction(this.onInitialized)) this.onInitialized(options);
	},

	version: Lib.version
};

export default Base;
