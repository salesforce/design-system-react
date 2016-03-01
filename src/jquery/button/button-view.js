/*
Copyright (c) 2015, salesforce.com, inc. All rights reserved.

Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:
Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
Neither the name of salesforce.com, inc. nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

// # Button View --- SLDS for jQuery

// Helps implement the [Button design pattern](https://www.lightningdesignsystem.com/components/buttons) in jQuery.

// Used by [Button](./button.html).

// ## API

/* @todo Add a full API description of the control here. */

// ## Dependencies

// Bring in the [shared library functions](../../lib/lib.html).
import * as Lib                    from '../../lib/lib';

// Use the [shared core](../../core/button.html), which contains logic that is
// shared across SLDS for JavaScript.
import ButtonViewCore, { CONTROL } from '../../core/button-view';

// ### jQuery
// jQuery is an external dependency of the project.
import $ from 'jquery';

// ### Mixins

// These are mixins that appear in all of SLDS for Javascript,
// bringing consistency to instantiation, events, and state.

// #### DOM
// [../dom](../dom.html)
import DOM                         from '../dom';

// #### State
// [../mixins/state](../mixins/state.html)
import State                       from '../state';

// ## Button View Constructor
// Constructors are functions that are called by the `new` keyword and is the
// function that an options object is passed into.
let ButtonView = function ButtonView () {
	const options = this._getOptions(arguments);

	this._initialize(options);
};

// #### Button View Object
// ***Private Methods***: Although not truly private methods, methods–that
// should only function as private–follow the convention of being prefixed
// with `_` (an underscore).
export const ButtonViewObject = {
	// ### Initializer
	_initializer () {
		// Triggered by `_initialize`. See [Base](../core/base.html). Allows
		// events to be be attached to the control before the asynchronous
		// `render` is complete.
		this.element = this.$el = this.elements.control = $('<span>');
	},

	// ### Render Assistive Text
	_renderAssistiveText () {
		if (this.getProperty('assistiveText')) {
			return $('<span>').addClass(this.cssClasses.ASSISTIVE_TEXT).text(this.getProperty('assistiveText'));
		}
	},

	// ### Render Icon
	_renderIcon (position) {
		let $icon;
		if (
			this.getProperty('icon') &&
			this.getProperty('iconPosition') === position
		) {
			$icon = $('<svg ' + 'class="' + this._getIconClassNames() + '"><use xlink:href="' + Lib.getSVGPath(this.getProperty('icon')) + '"></use></svg>').attr('aria-hidden', 'true');
		} else if (
			position === 'right' &&
			this.getProperty('iconStyle'
		) === 'icon-more') {
			$icon = $('<svg ' + 'class="' + this._getIconClassNames(this.buttonIconSizes['x-small']) + '"><use xlink:href="' + Lib.getSVGPath(this.moreIcon) + '"></use></svg>').attr('aria-hidden', 'true');
		}

		return $icon;
	},

	// ### Render
	_render () {
		// Truncating text limits the width of the button and adds ellipses
		// (...) if the text extends farther.
		if (this.getProperty('truncate')) {
			this.element.prepend('<span>').addClass(this.cssClasses.TRUNCATE).text(this.getProperty('text'));
		} else {
			this.element.text(this.getProperty('text'));
		}

		this.element
			.addClass(this.buttonStatefulViewStyles[this.getProperty('view')])
			.append(this._renderAssistiveText());

		this.element
			.append(this._renderIcon('right'))
			.prepend(this._renderIcon('left'));

		return this.element;
	}
};

// SLDS for jQuery **extends objects** by merging them together, rather than
// via the prototype chain or imitation of object-oriented inheritance.
// The important thing to remember is that _some methods will be available 
// to the component which are not declared in this file_.

// These are not magic methods, they're not black box methods, but you do need
// to trace the dependencies of the component to see where they are coming
// from. In particular, Button extends its [core](../../core/button.html),
// which in turn extends the base component.

Lib.merge(
	ButtonView.prototype,
	ButtonViewCore,
	DOM,
	State,
	ButtonViewObject
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
ButtonView = Lib.runHelpers('jquery', CONTROL, ButtonView);

export default ButtonView;
