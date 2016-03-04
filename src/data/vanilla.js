/*
Copyright (c) 2015, salesforce.com, inc. All rights reserved.

Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:
Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
Neither the name of salesforce.com, inc. nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

// VANILLA JS DATA ADPATER

import * as Lib from '../lib/lib';
import Base from './base';

const Item = Base.Item.extend({
	// Instance methods
	get (key) {
		let result;

		if (key !== undefined) {
			result = this._item[key];
		} else {
			result = this._item;
		}

		return result;
	},

	keys () {
		return Object.keys(this._item);
	}
});

// Static methods
Item.isTypeOf = function isTypeOf (item) {
	return (Lib.isObject(item));
};

const Data = Base.Data.extend({
	ItemType: Item,

	// Instance methods
	get (criteria) {
		let result;

		if (criteria !== undefined) {
			result = this.findWhere(this._data, criteria);
		} else {
			result = this._data;
		}

		return result;
	},

	at (index) {
		let result;

		if (this._data && Lib.isNumber(index)) {
			result = this._data[index];
		}

		return result;
	},
	
	indexOf (criteria) {
		let index = -1;
		
		this._data.forEach(function (item, i) {
			if (index < 0 && item === criteria._item) {
				index = i;
			}
		});
		
		return index;
	},
	
	length () {
		return this._data.length;
	},
	
	add (items, options) {
		const addition = Lib.isArray(items) ? items : [items];

		if (options && Lib.isNumber(options.at)) {
			this._data.splice(options.at, 0, ...addition);
		} else {
			this._data.push(...addition);
		}
		
		return this;
	},
	
	remove (items) {
		const removal = Lib.isArray(items) ? items : [items];

		removal.forEach((itemToRemove) => {
			let indexToRemove;

			this.forEach(function (item, index) {
				if (indexToRemove === undefined && item._item === itemToRemove) {
					indexToRemove = index;
				}
			});

			if (indexToRemove !== undefined) {
				this._data.splice(indexToRemove, 1);
			}
		});
		
		return this;
	},
	
	reset (item) {
		this._data.length = 0;

		if (item) {
			this.add(item);
		}

		return this;
	},
	
	clone () {
		this._data = this._data.slice(0);
		
		return this;
	}
});

Data._addDefaultImplementations(Data, ['forEach', 'filter', 'map', 'every']);

// Static methods
Data.isTypeOf = function isTypeOf (data) {
	return (Lib.isArray(data));
};

const Adapter = {
	Data,
	Item
};

Lib.registerAdapter('Vanilla', Adapter);

export default Adapter;
