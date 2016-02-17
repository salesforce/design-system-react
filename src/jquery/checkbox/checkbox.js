/*
Copyright (c) 2015, salesforce.com, inc. All rights reserved.

Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:
Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
Neither the name of salesforce.com, inc. nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

// # Checkbox Component --- jQuery Facade

// Implements the [Checkbox design pattern](https://www.lightningdesignsystem.com/components/forms#checkboxs) in jQuery.

// [![Checkbox component example screenshot](/assets/demo-site/images/component-examples/checkbox.png "See a live example of the Checkbox component in action")](/jquery/checkbox)

// > See a [live example](/jquery/checkbox) of the Checkbox component in action

// ## API

/* @todo Add a full API description of the control here. */

// ## Dependencies

// Bring in the [shared library functions](../../lib/lib.html).
import * as Lib                  from '../../lib/lib';

// Use the [shared core](../../core/checkbox.html), which contains logic that is
// the same in every facade.
import CheckboxCore, { CONTROL } from '../../core/checkbox';

// ### jQuery
// jQuery is an external dependency of the project.
const $ = Lib.global.jQuery || Lib.global.$;

// ### Mixins

// These are mixins that appear in every Façade, bringing consistency between
// how each framework deals with instantiation, events, and state.

// #### DOM
// [../dom](../dom.html)
import DOM                       from '../dom';

// #### Events
// [../mixins/events](../mixins/events.html)
import Events                    from '../events';

// #### State
// [../mixins/state](../mixins/state.html)
import State                     from '../state';

// ### Children

// #### Checkbox Template
// [./checkbox-template](./checkbox-template.html)
import template                  from './checkbox-template';

// ## Checkbox Constructor
// Constructors are functions that are called by the `new` keyword and is the
// function that an options object is passed into.
let Checkbox = function Checkbox () {
	const options = this._getOptions(arguments);

	this.inputSelector = 'input[type="checkbox"]';
	this.template = $(template);

	this._initialize(options);
};

// ## Checkbox Object
// ***Private Methods***: Although not truly private methods, methods–that
// should only function as private–follow the convention of being prefixed
// with `_` (an underscore).
export const CheckboxObject = {
	// ### Initializer
	_initializer () {
		this.element = this.$el = this.elements.control = this.template.clone();
		this.elements.input = this.element.find(this.inputSelector);
		this.elements.label = this.element.find('.' + this.cssClasses.LABEL);
	},

	// ### Bind Ui Events
	_bindUIEvents () {
		this.elements.input.on('change', $.proxy(this.toggle, this));
	},

	// ### Render
	_render () {
		this.elements.input.attr('value', this.getProperty('value'));
		this.elements.input.attr('checked', this.getProperty('checked'));
		this.elements.label.append(this.getProperty('text'));

		if (this.getProperty('disabled')) {
			this.elements.input.attr('disabled', 'disabled');
		}

		return this.element;
	},

	// ### On Rendered
	_onRendered () {
		this._bindUIEvents();
	},

	// ### Enable
	enable () {
		this.setProperties({
			disabled: false
		});

		if (this.rendered) {
			this.elements.input.removeAttr('disabled');
		}
	},

	// ### Disable
	disable () {
		this.setProperties({
			disabled: true
		});

		if (this.rendered) {
			this.elements.input.attr('disabled', 'disabled');
		}
	},

	// ### On Toggled
	_onToggled (checked) {
		this.elements.input.prop('checked', checked);
	}
};

// Façades **extends objects** by merging them together, rather than via the
// prototype chain or imitation of object-oriented inheritance. The important
// thing to remember is that _some methods will be available to the component
// which are not declared in this file_.

// These are not magic methods, they're not black box methods, but you do need
// to trace the dependencies of the component to see where they are coming
// from. In particular, Checkbox extends its [core](../../core/checkbox.html),
// which in turn extends the base component.

Lib.merge(
	Checkbox.prototype,
	CheckboxCore,
	Events,
	DOM,
	State,
	CheckboxObject
);

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

Checkbox = Lib.runHelpers('jquery', CONTROL, Checkbox);

export default Checkbox;
