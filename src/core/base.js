// Base Control
// ------------

// Inherited at the `core` level by all other controls.

// Bring in the shared library functions.
import * as Lib from '../lib/lib';

// Always include the "vanilla" data adapter, which allows controls to work with plain javascript arrays and objects. More about data adapters may be found in the data directory.
import '../data/vanilla';

// Declare the object which will be exported. This object is what will be mixed in to every other control.
const Base = {
	// Define shared CSS classes to be used across every control.
	cssClasses: {
		NAMESPACE: 'slds-',
		ASSISTIVE_TEXT: 'slds-assistive-text',
		LABEL: 'slds-form-element__label',
		CONTROL: 'slds-form-element__control'
	},

	// Define a default state with a strings object that is used by internationalization logic. The merge function used to mix Base into the other controls will allow this to be extended with additional defaults.
	_defaultState: {
		strings: {}
	},

	// We can count on exactly how each facade will handle object construction, so instead we ask that this function be called at an appropriate point by the facade.
	_initialize (options) {
		// `_onBeforeInitialize` is an optional lifecycle event that individual controls / facades may choose to implement. During this step the options are still available and still free to be modified.
		if (Lib.isFunction(this._onBeforeInitialize)) this._onBeforeInitialize(options);

		// If any accessors were passed in as objects during construction use them to override the defaults for this control. _Important: acessors cannot be updated after initialization._
		if (options && Lib.isObject(options.accessors)) {
			this.accessors = Lib.extend({}, this.accessors, options.accessors);
			delete options.accessors;
		}

		// Set the current value of the props based on the options passed in. After this point the options are no longer available and any future code should reference only the props.
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
	
	_onInitialized () {
		const onInitialized = this.getProperty('onInitialized');
		
		if (Lib.isFunction(onInitialized)) onInitialized.call(this, this);
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
