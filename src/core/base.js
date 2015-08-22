import * as Lib from './lib';
import '../data/vanilla';

const Base = {
	// CSS classes used across every control
	cssClasses: {
		NAMESPACE: 'fuelux'
	},

	_initialize (options) {
		if (Lib.isFunction(this._onBeforeInitialize)) this._onBeforeInitialize(options);

		// If this controls does anything with options that are passed to it, do that now
		if (Lib.isFunction(this._initializer)) this._initializer(options);

		if (Lib.isFunction(this._onInitialized)) this._onInitialized(options);
	},

	version: Lib.version
};

export default Base;
