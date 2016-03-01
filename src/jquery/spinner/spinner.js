/*
Copyright (c) 2015, salesforce.com, inc. All rights reserved.

Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:
Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
Neither the name of salesforce.com, inc. nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

// # Spinner Component --- SLDS for jQuery

// Implements the [Spinner design pattern](https://www.lightningdesignsystem.com/components/spinners) in jQuery.

// [<div class="slds-spinner--large"><img src="/assets/design-system/images/spinners/slds_spinner.gif" alt="See a live example of the Spinner component in action..."></div>](/jquery/spinner)

// > See a [live example](/jquery/spinner) of the Spinner component in action

// ## API

/* @todo Add a full API description of the control here. */

// ## Dependencies

// Bring in the [shared library functions](../../lib/lib.html).
import * as Lib                 from '../../lib/lib';

// Use the [shared core](../../core/spinner.html), which contains logic that is
// shared across SLDS for JavaScript.
import SpinnerCore, { CONTROL } from '../../core/spinner';

// ### jQuery
// jQuery is an external dependency of the project.
import $ from 'jquery';

// ### Mixins

// These are mixins that appear in all of SLDS for Javascript,
// bringing consistency to instantiation, events, and state.

// #### DOM
// [../dom](../dom.html)
import DOM                      from '../dom';

// #### State
// [../mixins/state](../mixins/state.html)
import State                    from '../state';

// ## Spinner Constructor
// Constructors are functions that are called by the `new` keyword and is the
// function that an options object is passed into.
let Spinner = function Spinner () {
	const options = this._getOptions(arguments);

	this._initialize(options);
};

// ## Spinner Object
export const SpinnerObject = {
	// ### Initializer
	_initializer () {
		this.element = this.$el = this.elements.control = $('<div />', {
			class: this.sizes[this.getProperty('size')]
		});
	},

	// ### Render
	_render () {
		const strings = this.getState('strings');

		this.element
			.append(
			$('<img />', {
				src: this.fileNames[this.getProperty('theme')],
				alt: strings.LOADING
			})
		);

		return this.element;
	}
};

// SLDS for jQuery **extends objects** by merging them together, rather than
// via the prototype chain or imitation of object-oriented inheritance.
// The important thing to remember is that _some methods will be available 
// to the component which are not declared in this file_.

// These are not magic methods, they're not black box methods, but you do need
// to trace the dependencies of the component to see where they are coming
// from. In particular, Pills extends its [core](../../core/pills.html),
// which in turn extends the base component.

Lib.merge(
	Spinner.prototype,
	SpinnerCore,
	DOM,
	State,
	SpinnerObject
);

// ### Run the helpers

// `Helpers` are a feature of SLDS for jQuery that allows anyone to register code that
// can manipulate the component before it is encapsulated in a React class.
//
// This allows flexibility for adding custom behavior without modifying the
// original source, or for adding optional behavior.
//
// For example, SLDS for jQuery uses this mechanism to optionally create
// jQuery plug-in versions of each component. Nothing in the component itself
// should ever depend on the presence of helpers, as they are completely
// optional.

Spinner = Lib.runHelpers('jquery', CONTROL, Spinner);

// Exporting
export default Spinner;
