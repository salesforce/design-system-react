/*
Copyright (c) 2015, salesforce.com, inc. All rights reserved.

Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:
Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
Neither the name of salesforce.com, inc. nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

// RADIO CONTROL - JQUERY FACADE

// Core
import * as Lib from '../../lib/lib';
import RadioCore, {CONTROL} from '../../core/radio';

// Framework specific
import DOM from '../dom';
import Events from '../events';
import State from '../state';
import { CheckboxObject } from '../checkbox/checkbox';

const $ = Lib.global.jQuery || Lib.global.$;

// Template imports
import template from './radio-template';

// Constructor
let Radio = function Radio () {
	const options = this._getOptions(arguments);
	
	this.inputSelector = 'input[type="radio"]';
	this.template = $(template);
	
	this._initialize(options);
};

// Prototype extension object
const RadioObject = {
	_bindUIEvents () {
		this.elements.input.on('change', $.proxy(this.check, this));
	},
	
	_render () {
		this.elements.input.attr('name', this.getProperty('name'));
		
		return CheckboxObject._render.call(this);
	},

	_onDestroy () {
		const self = this;
		const group = this._getGroup();
		const index = group.findIndex(function (item) {
			return (item === self);
		});

		if (index > -1) group.splice(index, 1);
	}
};

// Merging into prototype
Lib.merge(Radio.prototype, RadioCore, Events, DOM, State, CheckboxObject, RadioObject);

// Framework setup
Radio = Lib.runHelpers('jquery', CONTROL, Radio);

// Exporting
export default Radio;
