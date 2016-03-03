/*
Copyright (c) 2015, salesforce.com, inc. All rights reserved.

Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:
Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
Neither the name of salesforce.com, inc. nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

// # Radio --- SLDS for jQuery

// Helps implement the [Radios design pattern](https://www.lightningdesignsystem.com/components/forms#radio) in jQuery.

// Used by [Radios](./radios.html).

// ## API

/* @todo Add a full API description of the control here. */

// ## Dependencies

// Bring in the [shared library functions](../../lib/lib.html).
import * as Lib               from '../../lib/lib';

// Use the [shared core](../../core/radio.html)
import RadioCore, { CONTROL } from '../../core/radio';

// ### jQuery
// jQuery is an external dependency of the project.
import $ from 'jquery';

// ### Mixins

// These are mixins that appear in all of SLDS for Javascript,
// bringing consistency to instantiation, events, and state.

// #### DOM
// [../dom](../dom.html)
import DOM                    from '../dom';

// #### Events
// [../mixins/events](../mixins/events.html)
import Events                 from '../events';

// #### State
// [../mixins/state](../mixins/state.html)
import State                  from '../state';

// ### Children

// #### Checkbox Object
// [./checkbox/checkbox](./checkbox/checkbox.html)
import { CheckboxDefinition }     from '../checkbox/checkbox';

// #### Radio Template
// [./radio-template](./radio-template.html)
import template               from './radio-template';

// ## Radio Constructor
// Constructors are functions that are called by the `new` keyword and is the
// function that an options object is passed into.

let Radio = function Radio () {
	const options = this._getOptions(arguments);

	this.inputSelector = 'input[type="radio"]';
	this.template = $(template);

	this._initialize(options);
};

// ## Radio Object
// ***Private Methods***: Although not truly private methods, methods–that
// should only function as private–follow the convention of being prefixed
// with `_` (an underscore).
export const RadioDefinition = {
	// ### Bind Ui Events
	_bindUIEvents () {
		this.elements.input.on('change', $.proxy(this.check, this));
	},

	// ### Render
	render () {
		this.elements.input.attr('name', this.getProperty('name'));

		return CheckboxDefinition.render.call(this);
	},

	// ### On Destroy
	_onDestroy () {
		const self = this;
		const group = this._getGroup();
		const index = group.findIndex(function (item) {
			return (item === self);
		});

		if (index > -1) group.splice(index, 1);
	}
};


// SLDS for jQuery **extends objects** by merging them together, rather than
// via the prototype chain or imitation of object-oriented inheritance.
// The important thing to remember is that _some methods will be available 
// to the component which are not declared in this file_.

// These are not magic methods, they're not black box methods, but you do need
// to trace the dependencies of the component to see where they are coming
// from.

Lib.merge(
	Radio.prototype,
	RadioCore,
	Events,
	DOM,
	State,
	CheckboxDefinition,
	RadioDefinition
);

// Framework setup
Radio = Lib.runHelpers('jquery', CONTROL, Radio);

// Exporting
export default Radio;
