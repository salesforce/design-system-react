/*
Copyright (c) 2015, salesforce.com, inc. All rights reserved.

Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:
Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
Neither the name of salesforce.com, inc. nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

// # Button Groups Component --- SLDS for jQuery

// Implements the [Button Groups design pattern](https://www.lightningdesignsystem.com/components/button-groups) in jQuery.

// Button Groups collect one or more [`Button`](../button/button.html) into a group.

// [![Button Groups component example screenshot](/assets/demo-site/images/component-examples/button-group.png "See a live example of the Button Groups component in action")](/jquery/button-group)

// > See a [live example](/jquery/button-group) of the Button Group component in action

// ## API

/* @todo Add a full API description of the control here. */

// ## Dependencies

// Bring in the [shared library functions](../../lib/lib.html).
import * as Lib   from '../../lib/lib';

// Bring in the [base](../../core/base.html).
import Base       from '../../core/base';


// ### jQuery
// jQuery is an external dependency of the project.
import $ from 'jquery';

// ### Mixins

// These are mixins that appear in all of SLDS for Javascript,
// bringing consistency to instantiation, events, and state.

// #### DOM
// [../dom](../dom.html)
import DOM        from '../dom';

// #### Events
// [../mixins/events](../mixins/events.html)
import Events     from '../events';

// #### State
// [../mixins/state](../mixins/state.html)
import State      from '../state';

// ### Children

// #### Button
// [../button/button](../button/button.html)
import Button     from '../button/button';

// #### Button Core
// [../../core/button](../../core/button.html)
import ButtonCore from '../../core/button';

// Since Button Groups are just a collection of `<Button>` in a wrapper, there is
// no need for a common core in SLDS for JavaScript. Therefore we must set `CONTROL`
// manually here.
const CONTROL = 'slds-button-group';

// ## Button Group Constructor
// Constructors are functions that are called by the `new` keyword and is the
// function that an options object is passed into.
let ButtonGroup = function ButtonGroup () {
	// `_getOptions` can be found in [State](../state.html) and determines if
	// a wrapper element is passed and also merges in the default properties
	// found in the [shared button core](../../core/button.html).
	const options = this._getOptions(arguments);

	this.childOptions = {
		icon         : options.icon,
		iconPosition : options.iconPosition,
		iconStyle    : options.iconStyle,
		text         : options.text,
		theme        : options.theme
	};

	this._initialize(options);
};

// ## Button Group Object
// ***Private Methods***: Although not truly private methods, methods–that
// should only function as private–follow the convention of being prefixed
// with `_` (an underscore).
export const ButtonGroupDefinition = {
	_defaultProperties: ButtonCore._defaultProperties,

	// ### Initializer
	_initializer () {
		this.element = this.$el = this.elements.control = $('<div>');
	},

	// ### Render Buttons
	_renderButtons () {
		// TODO: Support dropdowns also
		const buttonOptions = this.getProperty('buttons');
		let children;

		children = [].concat(this.getProperty('children'));

		if (Lib.isArray(buttonOptions)) {
			children = children.concat(buttonOptions.map((child) => {
				return new Button(Lib.extend({}, this.childOptions, child));
			}));
		}

		this.setProperties({
			children,
			buttons: null
		});

		return children.map((button) => {
			return button.element;
		});
	},

	// ### Render
	render () {
		this.element
			.addClass('slds-button-group')
			.append(this._renderButtons());

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
	ButtonGroup.prototype,
	Base,
	Events,
	DOM,
	State,
	ButtonGroupDefinition
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

ButtonGroup = Lib.runHelpers('jquery', CONTROL, ButtonGroup);

export default ButtonGroup;
