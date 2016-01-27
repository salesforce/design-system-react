/*
Copyright (c) 2015, salesforce.com, inc. All rights reserved.

Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:
Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
Neither the name of salesforce.com, inc. nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

// CHECKBOX CONTROL - JQUERY FACADE

// Core
import * as Lib from '../../lib/lib';
import CheckboxCore, {CONTROL} from '../../core/checkbox';

// Framework specific
import DOM from '../dom';
import Events from '../events';
import State from '../state';

const $ = Lib.global.jQuery || Lib.global.$;

// Template imports
import template from './checkbox-template';

// Constructor
let Checkbox = function Checkbox () {
	const options = this._getOptions(arguments);
	
	this.inputSelector = 'input[type="checkbox"]';
	this.template = $(template);
	
	this._initialize(options);
};

// Prototype extension object
export const CheckboxObject = {
	_initializer () {
		this.element = this.$el = this.elements.control = this.template.clone();
		this.elements.input = this.element.find(this.inputSelector);
		this.elements.label = this.element.find('.' + this.cssClasses.LABEL);
	},

	_bindUIEvents () {
		this.elements.input.on('change', $.proxy(this.toggle, this));
	},

	_render () {
		this.elements.input.attr('value', this.getProperty('value'));
		this.elements.input.attr('checked', this.getProperty('checked'));
		this.elements.label.append(this.getProperty('text'));

		if (this.getProperty('disabled')) {
			this.elements.input.attr('disabled', 'disabled');
		}
		
		return this.element;
	},
	
	_onRendered () {
		this._bindUIEvents();
	},
	
	enable () {
		this.setProperties({
			disabled: false
		});

		if (this.rendered) {
			this.elements.input.removeAttr('disabled');
		}
	},

	disable () {
		this.setProperties({
			disabled: true
		});

		if (this.rendered) {
			this.elements.input.attr('disabled', 'disabled');
		}
	},

	_onToggled (checked) {
		this.elements.input.prop('checked', checked);
	}
};

// Merging into prototype
Lib.merge(Checkbox.prototype, CheckboxCore, Events, DOM, State, CheckboxObject);

// Framework setup
Checkbox = Lib.runHelpers('jquery', CONTROL, Checkbox);

// Exporting
export default Checkbox;
