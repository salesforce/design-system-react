/*
Copyright (c) 2015, salesforce.com, inc. All rights reserved.

Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:
Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
Neither the name of salesforce.com, inc. nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

// STRING DATA ADPATER

import * as Lib from '../lib/lib';
import Base from './base';

const Item = Base.Item.extend({
	// Instance methods
	get (key) {
		let result;
		
		if (!Lib.isFunction(this.textProp) || this.textProp() === key) {
			result = this._item;
		}
		
		return result;
	},

	keys () {
		const keys = [];
		
		if (Lib.isFunction(this.textProp)) {
			keys.push(this.textProp());
		}
		
		return keys;
	}
});

// Static methods
Item.isTypeOf = function isTypeOf (item) {
	return (Lib.isString(item));
};

const Data = Base.Data.extend({
	ItemType: Item
});

Data.isTypeOf = function isTypeOf () {
	return false;
};

const Adapter = {
	Data,
	Item
};

Lib.registerAdapter('String', Adapter);

export default Adapter;
