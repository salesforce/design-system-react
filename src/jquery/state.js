/*
Copyright (c) 2015, salesforce.com, inc. All rights reserved.

Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:
Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
Neither the name of salesforce.com, inc. nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

// STATE - JQUERY FACADE

// Core
import * as Lib from '../lib/lib';

const State = {
	_onBeforeInitialize () {
		this._initializeState();
	},
	
	_initializeState () {
		this._props = Lib.extend({}, this._defaultProperties);
		this._state = Lib.extend({}, this._defaultState);
	},
	
	// TODO: Determine whether this is the best place for this function to live
	_getOptions (args) {
		let wrapper;
		let options;
		
		if (args.length === 1) {
			// TODO: Possibly determine what type of argument this is?
			options = args[0];
		} else if (args.length > 1) {
			wrapper = args[0];
			options = args[1];
		}
		
		return Lib.extend({ wrapper }, this._defaultProperties, options);
	},

	getDefaultProps (properties) {
		this._props = Lib.extend(properties, this._props);
	},
	
	setProperties (values) {
		return Lib.extend(this._props, values);
	},

	getProperty (key) {
		return this._props[key];
	},

	getProperties () {
		return this._props;
	},
	
	setState (values) {
		return Lib.extend(this._state, values);
	},

	getState (key) {
		return this._state[key];
	}
};

export default State;
