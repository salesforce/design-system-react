import * as Lib from './lib';
import '../data/vanilla';

const Base = {
	// CSS classes used across every control
	cssClasses: {
		NAMESPACE: 'fuelux',
		SR_ONLY: 'sr-only',
		OPEN: 'open'
	},
	
	_defaultState: {
		strings: {}
	},

	_initialize (options) {
		if (Lib.isFunction(this._onBeforeInitialize)) this._onBeforeInitialize(options);

		// Accessors cannot be updated after initialization
		if (options && Lib.isObject(options.accessors)) {
			Lib.extend(this.accessors, options.accessors);
			delete options.accessors;
		}
		
		this.setProperties(options);
		
		const collection = this.getProperty('collection');
		if (collection) this._collection = this._getDataAdapter(collection);

		// Run any initializers provided by the control and/or the traits
		if (Lib.isFunction(this._initializer)) this._initializer();

		this._getStrings(strings => {
			this.setState({
				strings
			});
			
			if (Lib.isFunction(this._onInitialized)) this._onInitialized();
		});
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
	
	_getStrings (callback) {
		Lib.getStrings().then(_strings => {
			let strings = this.getProperty('strings');
			
			if (strings) {
				strings = Lib.extend({}, _strings, strings);
			} else {
				strings = _strings;
			}
			
			return strings;
		}).then(callback);
	},

	version: Lib.version
};

export default Base;
