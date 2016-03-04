/*
Copyright (c) 2015, salesforce.com, inc. All rights reserved.

Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:
Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
Neither the name of salesforce.com, inc. nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

// Base Item & Data Adapter
// ------------------------

// Bring in the [shared library functions](../lib/lib.html).
import * as Lib from '../lib/lib';

// "Children" of the base adapter will use this extend method as a form of prototypical inheritance. This differs from the mix in system used by the controls themselves, and is more similar to Backbone's `extend`.
/* TODO: this function can probably be cleaned up a little, and maybe inherit some implementation from lodash */
function _extend (protoProps) {
	const parent = this;

	// Create a new function to apply the props to. This will be the child (or "subclass").
	const child = function () {
		// The constructor of this child should call the constructor of the base control (which is the parent).
		return parent.apply(this, arguments);
	};

	// Pass on static properties of the parent if there are any.
	Lib.extend(child, parent);

	// Set the prototype chain to inherit from the parent, without calling the parent's constructor function.
	const Surrogate = function () {
		this.constructor = child;
	};

	Surrogate.prototype = parent.prototype;
	child.prototype = new Surrogate;

	// Add in the new instance properties.
	if (protoProps) {
		Lib.extend(child.prototype, protoProps);
	}

	// Set a convenience property in case the parent’s prototype is needed later.
	child.__super__ = parent.prototype;

	return child;
}

// This method is used internally by `findWhere` to search for matches in the collection.
function _findMatch (data, isMatch) {
	let found;

	// `isMatch` should be a function that returns true or false based on whether the item matches the current criteria.
	if (Lib.isFunction(isMatch)) {
		data.forEach(function (item) {
			// Only return the first match.
			if (!found) {
				// Note that `item` here will be wrapped in an item adapter.
				if (isMatch(item)) {
					found = item;
				}
			}
		});
	}

	return found;
}

// Lots of methods that operate on collections follow the same callback/iterator pattern and we need a way to easily wire up existing ones so that they can make use of item adapters. This is aliased on the base data adapter as `_addDefaultImplementations`.
function _addMethods (instance, methods) {
	// For each method passed in we want to add a method on the instance (that is, the data adapter).
	methods.forEach(function (method) {
		instance.prototype[method] = function (callback, ...funcArgs) {
			const self = this;
			
			// The first argument to the method will be the callback or iterator, which we'll wrap so that we can call `getItemAdapter` before calling it.
			const _callback = function (item, ...callbackArgs) {
				const _item = self.getItemAdapter(item);
				return callback(_item, ...callbackArgs);
			};
			
			return this._data[method](_callback, ...funcArgs);
		};
	});
}

function Item (item) {
	this._item = item;
}

Lib.extend(Item.prototype, {
	// Instance methods
	get () {
		return undefined;
	}
});

['keys'].forEach(function (method) {
	Item.prototype[method] = Lib.noop;
});

// Static methods
Item.isTypeOf = function isTypeOf () {
	return true;
};

function Data (data) {
	this._data = data;
}

Lib.extend(Data.prototype, {
	// Instance methods
	findWhere (criteria) {
		let _isMatch;

		if (!Lib.isFunction(criteria)) {
			const _criteria = Lib.getItemAdapter(criteria);

			_isMatch = function (item) {
				const keys = _criteria.keys();
				let match = keys && keys.length > 0;

				if (match) {
					keys.forEach(function (key) {
						if (!match || _criteria.get(key) !== item.get(key)) {
							match = false;
						}
					});
				}

				return match;
			};
		} else {
			_isMatch = criteria;
		}

		return _findMatch(this, _isMatch);
	},

	get () {
		return undefined;
	},
	
	clone () {
		return this;
	}
});

['at', 'indexOf', 'length', 'add', 'remove', 'reset', 'forEach', 'filter', 'map', 'every'].forEach(function (method) {
	Data.prototype[method] = Lib.noop;
});

// Static methods
Data.isTypeOf = function isTypeOf () {
	return true;
};

Data.getItemAdapter = function (_item) {
	return new this.ItemType(_item);
};

Data._addDefaultImplementations = _addMethods;

Data.extend = Item.extend = _extend;

const Adapter = {
	Data,
	Item
};

Lib.registerAdapter('Base', Adapter);

export default Adapter;
