/*
Copyright (c) 2015, salesforce.com, inc. All rights reserved.

Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:
Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
Neither the name of salesforce.com, inc. nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

// # Radios Component --- jQuery Facade

// Implements the [Radio design pattern](https://www.lightningdesignsystem.com/components/forms#radio) in jQuery.

// [![Radios component example screenshot](/assets/demo-site/images/component-examples/radio.png "See a live example of the Radios component in action")](/jquery/radio)

// > See a [live example](/jquery/radio) of the Radios component in action

// ## API

/* @todo Add a full API description of the control here. */

// ## Dependencies

// Bring in the [shared library functions](../../lib/lib.html).
import * as Lib from '../../lib/lib';

// Bring in the [core's base](../../core/base.html).
import Base     from '../../core/base';

// ### jQuery
// jQuery is an external dependency of the project.
import $ from 'jquery';

// ### Mixins

// These are mixins that appear in every Façade, bringing consistency between
// how each framework deals with instantiation, events, and state.

// #### DOM
// [../dom](../dom.html)
import DOM      from '../dom';

// #### Events
// [../mixins/events](../mixins/events.html)
import Events   from '../events';

// #### State
// [../mixins/state](../mixins/state.html)
import State    from '../state';

// ### Children

// #### Radio
// [./radio](./radio.html)
import Radio    from './radio';

// #### Radios Template
// [./radios-template](./radios-template.html)
import template from './radios-template';

// Since Radios are just a collection of `<Radio>` in a wrapper, there is
// no need for a common core between Façades. Therefore we must set `CONTROL`
// manually here.

const CONTROL = 'Radios';

// ## Radios Constructor
// Constructors are functions that are called by the `new` keyword and is the
// function that an options object is passed into.
let Radios = function Radios () {
	const options = this._getOptions(arguments);

	this.radios = options.radios.map((radio) => {
		radio.name = options.name;
		return new Radio(radio);
	});

	this.template = $(template);

	this._initialize(options);
};

// ## Radios Object
// ***Private Methods***: Although not truly private methods, methods–that
// should only function as private–follow the convention of being prefixed
// with `_` (an underscore).
const RadiosObject = {
	// ### Initializer
	_initializer () {
		this.element = this.$el = this.elements.control = this.template.clone();
		this.elements.label = this.element.find('.' + this.cssClasses.LABEL);
		this.elements.radios = this.radios.map(function (radio) {
			return radio.element;
		});
	},

	// ### Bind Ui Events
	_bindUIEvents () {
		this.elements.radios.forEach((radio) => {
			radio.on('change', $.proxy(this._handleInputChange, this));
		});
	},

	// ### Render
	_render () {
		this.elements.label.append(this.getProperty('labelText'));
		this.element.find('.' + this.cssClasses.CONTROL).append(this.elements.radios);

		return this.element;
	},

	// ### On Rendered
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

	// ### Handle Input Change
	_handleInputChange (e) {
		let targetI = null;

		this.radios.forEach((radio, i) => {
			if (radio.getProperty('value') === e.target.value) {
				targetI = i;
			}
		});

		this.check(targetI);
	},

	// ### Enable
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

	// ### Disable
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

	// ### Toggle
	toggle (i) {
		if (this.radios[i].checked()) {
			this.uncheck(i);
		} else {
			this.check(i);
		}
	},

	// ### Radio
	radio (i, radio) {
		// returns the Radio object at the specified index.
		// UNTESTED EXPERIMENTAL: If you pass in a new radio object, it will set it to the specified index.
		if (typeof radio !== 'undefined') {
			radio.on('change', $.proxy(self._handleInputChange, self));
			this.radios[i] = radio;
			this.render();
		} else {
			return this.radios[i];
		}
	},

	// ### Check
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

	// ### Uncheck
	uncheck (i) {
		if (this.radios[i].getProperty('disabled')) {return;}

		this.radios[i].uncheck();
	},

	// ### Get Checked
	getChecked () {
		for (const radio of this.radios) {
			if (radio.checked()) {
				return radio;
			}
		}
	},

	// ### Get Value
	getValue () {
		for (const radio of this.radios) {
			if (radio.checked()) {
				return radio.getProperty('value');
			}
		}
	}
};

// Façades **extends objects** by merging them together, rather than via the
// prototype chain or imitation of object-oriented inheritance. The important
// thing to remember is that _some methods will be available to the component
// which are not declared in this file_.

// These are not magic methods, they're not black box methods, but you do need
// to trace the dependencies of the component to see where they are coming
// from.

Lib.merge(Radios.prototype, Base, Events, DOM, State, RadiosObject);

// ### Run the helpers

// `Helpers` are a feature of Façades that allows anyone to register code that
// can manipulate the component before it is encapsulated in a React class.
//
// This allows flexibility for adding custom behavior without modifying the
// original source, or for adding optional behavior.
//
// For example, in jQuery facade uses this mechanism to optionally create
// jQuery plug-in versions of each component. Nothing in the component itself
// should ever depend on the presence of helpers, as they are completely
// optional.

Radios = Lib.runHelpers('jquery', CONTROL, Radios);

// Exporting
export default Radios;
