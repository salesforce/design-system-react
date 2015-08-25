import * as Lib from './lib';
import '../data/vanilla';

const Base = {
	// CSS classes used across every control
	cssClasses: {
		NAMESPACE: 'fuelux',
		SR_ONLY: 'sr-only'
	},
	
	strings: {
		NONE_SELECTED: 'Select an Option',
		TOGGLE_DROPDOWN: 'Toggle Dropdown'
	},

	_initialize (options) {
		if (Lib.isFunction(this._onBeforeInitialize)) this._onBeforeInitialize(options);

		if (options && Lib.isObject(options.accessors)) {
			Lib.extend(this.accessors, options.accessors);
			delete options.accessors;
		}

		// If this controls does anything with options that are passed to it, do that now
		if (Lib.isFunction(this._initializer)) this._initializer(options);

		if (Lib.isFunction(this._onInitialized)) this._onInitialized(options);
	},
	
	_getItemAdapter (_item, _itemAdapter) {
		const itemAdapter = _itemAdapter || Lib.getItemAdapter;
		const item = itemAdapter(_item);
		
		if (this.accessors) {
			Object.keys(this.accessors).forEach(method => {
				item[method] = Lib.bind(this.accessors[method], this, item);
			});
		}
		
		return item;
	},
	
	_getDataAdapter (_data) {
		const data = Lib.getDataAdapter(_data);
		
		data.getItemAdapter = Lib.partialRight(Lib.bind(this._getItemAdapter, this), data.getItemAdapter);
		
		return data;
	},

	version: Lib.version
};

export default Base;
