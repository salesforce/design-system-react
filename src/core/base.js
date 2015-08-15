import * as Lib from './lib';
import '../data/vanilla';

const Base = {
	// CSS classes used across every control
	cssClasses: {
		NAMESPACE: 'fuelux'
	},

	__initialize (options) {
		if (Lib.isFunction(this.__onBeforeInitialize)) this.__onBeforeInitialize(options);

		// If this controls does anything with options that are passed to it, do that now
		if (Lib.isFunction(this.__initializeOptions)) this.__initializeOptions(options);

		if (Lib.isFunction(this.__onInitialized)) this.__onInitialized(options);
	},

	version: Lib.version
};

export default Base;
