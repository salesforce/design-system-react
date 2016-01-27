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
import Base from '../../core/base';

// Framework specific
import DOM from '../dom';
import Events from '../events';
import State from '../state';
import Radio from './radio';


const $ = Lib.global.jQuery || Lib.global.$;

// Template imports
import template from './radios-template';

const CONTROL = 'Radios';

// Constructor
let Radios = function Radios () {
	const options = this._getOptions(arguments);
	
	this.radios = options.radios.map((radio) => {
		radio.name = options.name;
		return new Radio(radio);
	});
	
	this.template = $(template);
	
	this._initialize(options);
};

// Prototype extension object
const RadiosObject = {
	_initializer () {
		this.element = this.$el = this.elements.control = this.template.clone();
		this.elements.label = this.element.find('.' + this.cssClasses.LABEL);
		this.elements.radios = this.radios.map(function (radio) {
			return radio.element;
		});
	},

	_bindUIEvents () {
		this.elements.radios.forEach((radio) => {
			radio.on('change', $.proxy(this._handleInputChange, this));
		});
	},

	_render () {
		this.elements.label.append(this.getProperty('labelText'));
		this.element.find('.' + this.cssClasses.CONTROL).append(this.elements.radios);

		return this.element;
	},
	
	_onRendered () {
		this._bindUIEvents();
		// Only run if all need disabled. Otherwise it will incorrectly enable explicitly disabled radios on init.
		if (this.getProperty('disabled')) {
			this.element.attr('disabled', 'disabled');
			this.radios.map(function (radio) {
				radio.disable();
			});
		}
	},
	
	_handleInputChange (e) {
		let targetI = null;

		this.radios.forEach((radio, i) => {
			if (radio.getProperty('value') === e.target.value) {
				targetI = i;
			}
		});

		this.check(targetI);
	},

	enable () {
		this.setProperties({
			disabled: false
		});

		if (this.rendered) {
			this.element.removeAttr('disabled');
			this.radios.map( function (radio) {
				radio.enable();
			});
		}
	},

	disable () {
		this.setProperties({
			disabled: true
		});

		if (this.rendered) {
			this.element.attr('disabled', 'disabled');
			this.radios.map(function (radio) {
				radio.disable();
			});
		}
	},

	toggle (i) {
		if (this.radios[i].checked()) {
			this.uncheck(i);
		} else {
			this.check(i);
		}
	},

	// returns the Radio object at the specified index.
	// UNTESTED EXPERIMENTAL: If you pass in a new radio object, it will set it to the specified index.
	radio (i, radio) {
		if (typeof radio !== 'undefined') {
			radio.on('change', $.proxy(self._handleInputChange, self));
			this.radios[i] = radio;
			this.render();
		} else {
			return this.radios[i];
		}
	},

	check (i) {
		const target = this.radios[i];

		if (target.getProperty('disabled')) {return;}

		// Must set all checked to false first before you set desired checked to true. If you don't, if there is already one set to true further on
		// in the map, it will ignore you trying to set your target to true.
		this.radios.forEach(function (radio) {
			if (radio.getProperty('value') !== target.getProperty('value')) {
				radio.uncheck();
			}
		});

		target.check();
	},

	uncheck (i) {
		if (this.radios[i].getProperty('disabled')) {return;}

		this.radios[i].uncheck();
	},

	getChecked () {
		for (const radio of this.radios) {
			if (radio.checked()) {
				return radio;
			}
		}
	},

	getValue () {
		for (const radio of this.radios) {
			if (radio.checked()) {
				return radio.getProperty('value');
			}
		}
	}
};

// Merging into prototype
Lib.merge(Radios.prototype, Base, Events, DOM, State, RadiosObject);

// Framework setup
Radios = Lib.runHelpers('jquery', CONTROL, Radios);

// Exporting
export default Radios;
