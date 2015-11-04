// Backbone Item & Data Adapter
// ----------------------------

// The Backbone adapter is _optional_. It is included by default with the Marionette facade, but any project may choose to include it and register it with `Lib` when compatibility with Backbone collections and models is desired, no matter which facade is in use.

// Bring in the [shared library functions](../lib/lib).
import * as Lib from '../lib/lib';

// Inherit from the [base adapter](base).
import Base from './base';

// This adapter is _optional_, and it depends on Backbone, so it should only be brought into environments in which Backbone data is going to be used.
import Backbone from 'backbone';

// ### Item Adapter
// The base item adapter already includes a custom extend method that allows for a sort of inheritance. We extend it with the following *instance methods*.
const Item = Base.Item.extend({
	// Probably the most important method provided by an item adapter is `get`, as it standardizes the approach to getting a particular property from the item. In Backbone this mostly just passes through to the standard Backbone `get`, with the difference that if you don't pass an argument you'll get the plain object json-style representation of your entire item back.
	get (key) {
		let result;

		if (key !== undefined) {
			result = this._item.get(key);
		} else {
			result = this._item.toJSON();
		}

		return result;
	},

	// Returns all of the availble property keys (passes through to an internal Backbone method in this case).
	keys () {
		return this._item.keys();
	}
});

// Item adapters also provide the *static method* `isTypeOf` which is used by `Lib` to determine if a given item should use the adapter or not.
Item.isTypeOf = function isTypeOf (item) {
	return (item instanceof Backbone.Model);
};

// ### Data Adapter
// The base data adapter already includes a custom extend method that allows for a sort of inheritance.
const Data = Base.Data.extend({
	// Data adapters generally default to working with a specific type of item, so we're storing a reference to our very own item adapter here.
	ItemType: Item,

	// We're going to extend the base data adapter with the following *instance methods*, the first of which is `get`.
	get (criteria) {
		let result;

		if (criteria !== undefined) {
			// When an item or a set of key/value pairs to match on is passed in, `get` searches the collection and returns the matching item if it finds one.
			result = this.findWhere(this._data, criteria);
		} else {
			// Like the `get` method exposed by the item adapter, this one returns a plain javascript version of the collection when invoked with no arguments. In this case it will be an array of objects.
			result = this._data.toJSON();
		}

		return result;
	},

	// We'll defer to Backbone's native methods on our internal Backbone collection (`_data`) for most methods.
	at (index) {
		let result;

		// Our implementation of `at` does a small sanity check, but is otherwise just Backbone's `at`.
		if (this._data && Lib.isNumber(index)) {
			result = this._data.at(index);
		}

		return result;
	},

	indexOf (criteria) {
		return this._data.indexOf(criteria._item);
	},

	length () {
		return this._data.length;
	},

	add (item) {
		this._data.add(item._item);
		
		return this;
	},

	remove (item) {
		this._data.remove(item._item);
		
		return this;
	},

	/* TODO: This should probably use item._item like the other methods, shouldn't it? */
	reset (item) {
		this._data.reset(item);
		
		return this;
	},

	// Calling `clone` keeps the same data adapter, but makes a copy of the internal collection so that modifications to it don't alter the original one passed in by reference.
	clone () {
		this._data = this._data.clone();
		
		return this;
	}
});

// For methods that apply to the collection and call a callback or iterator on some set of items we want the items passed to those callbacks to be wrapper in the appropriate item adapter. The helper function `_addDefaultImplementations` in the base data adapter makes it easy to register methods like this when they already exist on the internal collection.
Data._addDefaultImplementations(Data, ['forEach', 'filter', 'map', 'every']);

// Like item adapters, data adapters also provide the *static method* `isTypeOf` which is used by `Lib` to determine if a given collection should use the adapter or not.
Data.isTypeOf = function isTypeOf (data) {
	return (data instanceof Backbone.Collection);
};

// ### Output
// We only want to export a single adapter, with both item & data bundled in.
const Adapter = {
	Data,
	Item
};

Lib.registerAdapter('Backbone', Adapter);

export default Adapter;
