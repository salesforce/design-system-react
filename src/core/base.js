// # Base Control
// ### Core

// Inherited at the `core` level by all other controls.

// Bring in the [shared library functions](../lib/lib.html).
import * as Lib from '../lib/lib';

// Always include the ["vanilla" data adapter](../data/vanilla.html), which allows controls to work with plain javascript arrays and objects. More about data adapters may be found in the data directory.
import '../data/vanilla';

// Declare the object which will be exported. This object is what will be mixed in to every other control.
const Base = {
	// Define shared CSS classes to be used across every control.
	cssClasses: {
		ASSISTIVE_TEXT: 'slds-assistive-text',
		LABEL: 'slds-form-element__label',
		CONTROL: 'slds-form-element__control'
	},

	// Define a default state with a strings object that is used by internationalization logic. The merge function used to mix `Base` into the other controls will allow this to be extended with additional defaults.
	_defaultState: {
		strings: {}
	},

	// We can't count on exactly how each facade will handle object construction, so instead we ask that this function be called at an appropriate point by the facade.
	_initialize (originalOptions) {
		const options = Lib.extend({}, originalOptions);
		
		// `_onBeforeInitialize` is an optional lifecycle event that individual controls / facades may choose to implement. During this step the options are still available and still free to be modified.
		if (Lib.isFunction(this._onBeforeInitialize)) this._onBeforeInitialize(options);

		// If any accessors were passed in as objects during construction use them to override the defaults for this control. _Important: acessors cannot be updated after initialization._
		if (Lib.isObject(options.accessors)) {
			this.accessors = Lib.extend({}, this.accessors, options.accessors);
			delete options.accessors;
		}

		if (Lib.isFunction(this._setDefaultProperties)) this._setDefaultProperties();

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
	
	_initializer () {
		this.setState({
			id: this.getProperty('id') || Lib.uniqueId(this.CONTROL + '-')
		});
	},

	// `onInitialized` is part of the public API. If it has been provided, run it after initialization is complete.
	/* TODO: Determine how to delineate and document API methods and options so that they can be easily collected and displayed together. */
	_onInitialized () {
		const onInitialized = this.getProperty('onInitialized');
		
		if (Lib.isFunction(onInitialized)) onInitialized.call(this, this);
	},

	// Item adapters are a key piece of functionality that allow Facades to work seamlessly with many different data sources. For example, an "item" might be a plain javascript object with key/value pairs or it might be a Backbone.js model.
	_getItemAdapter (_item, _itemAdapter) {
		// If a specific item adapter was passed in (typically this would be the one used provided by the data adapter we are using) then we want to use that one. Otherwise we'll fall back on a `Lib` function that walks all of the registered item adapters and chooses the first one that matches.
		const itemAdapter = _itemAdapter || Lib.getItemAdapter;
		const item = itemAdapter(_item);

		// When this function is used to wrap an item in an item adapter it has the added benefit of including the accessors for you. Accessors typically provide methods like `getText` or `getChildren` that provide flexibility in the structure of the data provided, while the adapter itself provides flexibility in the type of data.
		if (this.accessors) {
			Object.keys(this.accessors).forEach(method => {
				item[method] = Lib.bind(this.accessors[method], this, item);
			});
		}

		return item;
	},

	// Like item adapters, data adpaters help Facades work with many different types of data. Data adapters work with the collections of data, like plain javascript arrays of objects or Backbone.js collections of models.
	_getDataAdapter (_data) {
		const data = Lib.getDataAdapter(_data);

		// This `Base` version of `getDataAdapter` largely delegates to the one in `Lib` with one key difference: this one uses the version of `getItemAdapter` defined above to ensure that the accessors are properly bound to each item.
		data.getItemAdapter = Lib.partialRight(Lib.bind(this._getItemAdapter, this), data.getItemAdapter);

		return data;
	},

	// Facades comes with support for internationalization of strings out of the box. Strings may be provided globally to `Lib` as either a js object or as a promise which resolves as such (see more details in that file), and overrides for a specific instance of a control may be passed in as properties.
	_getStrings (callback) {
		Lib.getStrings(globalStrings => {
			const strings = this.getProperty('strings');

			callback(Lib.extend({}, globalStrings, strings));
		});
	},

	// Every control inherits the current version of the library.
	version: Lib.version
};

export default Base;
