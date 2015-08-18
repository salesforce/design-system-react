import * as Lib from './lib';
import '../data/vanilla';

const Base = {
	// CSS classes used across every control
	cssClasses: {
		NAMESPACE: 'fuelux'
	},

	_initialize (options) {
		if (Lib.isFunction(this._onBeforeInitialize)) this._onBeforeInitialize(options);
		
		// Bind the context of the accessors so that children don't have to worry about scope
		if (Lib.isObject(this.accessors)) {
			Object.keys(this.accessors).forEach(accessorName => {
				this.accessors[accessorName] = this.accessors[accessorName].bind(this);
			});
		}

		// If this controls does anything with options that are passed to it, do that now
		if (Lib.isFunction(this._initializeOptions)) this._initializeOptions(options);

		if (Lib.isFunction(this._onInitialized)) this._onInitialized(options);
	},

	version: Lib.version
};

export default Base;
