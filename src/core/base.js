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

	// We can't count on exactly how each facade will handle object construction, so instead we ask that this function be called at an appropriate point by the facade.
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

		// Many controls make use of a collection to define their contents (list items, table rows, etc). If one has been provided for this control we want to wrap it in a `dataAdapter` and save result to `this._collection`.
		const collection = this.getProperty('collection');
		if (collection) this._collection = this._getDataAdapter(collection);

		// Run any initializers provided by the control and/or the traits. The special merge function used to mix together controls allows multiple `_onBeforeInitialize`, `_initializer`, and `_onInitialized` hooks to be defined, which will then run in sequence. More information can be found in `Lib.merge`.
		if (Lib.isFunction(this._initializer)) this._initializer();

		// Kick off the internationalization logic.
		this._getStrings(strings => {
			this.setState({
				strings
			});

			// Any `_onInitialized` functions defined by the controls or traits will be executed asynchronously after internationalization completes.
			if (Lib.isFunction(this._onInitialized)) this._onInitialized();
		});
	},

	// `onInitialized` is part of the public API. If it has been provided, run it after initialization is complete.
	// TODO: Determine how to delineate and document API methods and options so that they can be easily collected and displayed together.
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
