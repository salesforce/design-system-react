/*
Copyright (c) 2015, salesforce.com, inc. All rights reserved.

Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:
Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
Neither the name of salesforce.com, inc. nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

// # Button Component --- SLDS for jQuery

// Implements the [Button design pattern](https://www.lightningdesignsystem.com/components/buttons) in jQuery.

// Buttons are used within many other components in this library. There are many variations, as well as stateful buttons.

// Buttons are made of one or more [`ButtonViews`](./button-view.html).

// Stateful buttons have three views, but most buttons only have one.

// [![Button component example screenshot](/assets/demo-site/images/component-examples/button.png "See a live example of the Button component in action")](/jquery/button)

// > See a [live example](/jquery/button) of the Button component in action

// ## API

/* @todo Add a full API description of the control here. */

// ## Dependencies

// Bring in the [shared library functions](../../lib/lib.html).
import * as Lib                from '../../lib/lib';

// Use the [shared core](../../core/button.html), which contains logic that is
// shared across SLDS for JavaScript.
import ButtonCore, { CONTROL } from '../../core/button';

// ### jQuery
// jQuery is an external dependency of the project.
import $ from 'jquery';

// ### Mixins

// These are mixins that appear in all of SLDS for Javascript,
// bringing consistency to instantiation, events, and state.

// #### DOM
// [../dom](../dom.html)
import DOM                     from '../dom';

// #### Events
// [../mixins/events](../mixins/events.html)
import Events                  from '../events';

// #### State
// [../mixins/state](../mixins/state.html)
import State                   from '../state';

// ### Children

// #### Button View
// [./button-view](./button-view.html)
import ButtonView              from './button-view';

// ## Button Constructor
// Constructors are functions that are called by the `new` keyword and is the
// function that an options object is passed into.
let Button = function Button () {
	// `_getOptions` can be found in [State](../state.html) and determines if
	// a wrapper element is passed and also merges in the default properties
	// found in the [shared button core](../../core/button.html).
	const options = this._getOptions(arguments);

	// Specifies the options that get passed on (or "inherited") to the child
	// `ButtonViews`
	this.buttonViewOptions = {
		icon         : options.icon,
		iconPosition : options.iconPosition,
		iconSize     : options.iconSize,
		iconStyle    : options.iconStyle,
		text         : options.text,
		truncate     : options.truncate,
		selected     : options.selected
	};

	// If button has views, button is stateful.
	if (options.views.length > 0) {
		options.views = options.views.map((buttonView) => {
			return Lib.extend({}, this.buttonViewOptions, buttonView);
		});
	}

	// Handles setup tasks such as creating state, setting default properties,
	// and loading internationalization strings. The call stack eventually
	// triggers `render`. See [Base](../core/base.html).
	this._initialize(options);
};

// ## Button Object
// ***Private Methods***: Although not truly private methods, methods–that
// should only function as private–follow the convention of being prefixed
// with `_` (an underscore).
export const ButtonObject = {
	// ### Initializer
	_initializer () {
		// Triggered by `_initialize`. See [Base](../core/base.html).

		// Allows events to be be attached to the control before the
		// asynchronous `render` is complete.
		this.element = this.$el = this.elements.control = $('<button>');
	},

	// ### Bind Ui Events
	_bindUIEvents () {
		// Attaches events to the control and its children.

		// Typically, called from `onRendered` within the component.
		this.element.on('click', $.proxy(this._handleClick, this));
	},

	// ### Render Views
	_renderViews () {
		// While some functionality moves into the SLDS for JS core or traits,
		// SLDS for jQuery components typically provides their own rendering
		// logic so that they can take advantage of the benefits offered by
		// jQuery and maintain appropriate patterns for it.
		const viewOptions = this.getProperty('views');
		const viewElements = [];

		const buttonViewOptions = Lib.extend({
			assistiveText: this.getProperty('assistiveText')
		}, this.buttonViewOptions);

		if (viewOptions.length > 0) {
			buttonViewOptions.view = 'notSelected';
		}

		// Always render at least one view. If stateful, render more.
		let $buttonview = new ButtonView(buttonViewOptions);
		viewElements.push($buttonview.element);

		// Render additional views
		if (viewOptions.length > 0 ) {
			const children = [].concat(this.getProperty('children'));

			viewOptions.forEach((options) => {
				$buttonview = new ButtonView(options);
				children.push($buttonview);
				viewElements.push($buttonview.element);
			});

			this.setProperties({ children });
		}

		return viewElements;
	},

	// ### Render
	_render () {
		// Renders are asyncronous.

		// See [Base](../core/base.html) and [DOM](../dom.html) in order to
		// trace stack.
		const isStateful = (
			this.getProperty('views').length > 0 ||
			(
				typeof this.getProperty('selected') !== 'undefined' &&
				(
					this.getProperty('selected') === true ||
					this.getProperty('selected') === false
				)
			) ||
			(
				typeof this.getProperty('selectable') !== 'undefined' &&
				(
					this.getProperty('selectable') === true ||
					this.getProperty('selectable') === false
				)
			)
		);
		const className = this._getClassNames('', isStateful);

		this.element
			.addClass(className)
			.append(this._renderViews())
			.prop('disabled', this.getProperty('disabled'));

		return this.element;
	},

	// ### On Rendered
	_onRendered () {
		// Triggered when `render` is complete and elements have been addded
		// to the DOM.

		// See [DOM](../dom.html).
		this._bindUIEvents();
	},

	// ### Handle Click
	_handleClick () {
		// Toggles selected state if button is stateful.
		const isStateful = (
			this.getProperty('views').length > 0 ||
			(
				typeof this.getProperty('selected') !== 'undefined' &&
				(
					this.getProperty('selected') === true ||
					this.getProperty('selected') === false
				)
			) ||
			(
				typeof this.getProperty('selectable') !== 'undefined' &&
				(
					this.getProperty('selectable') === true ||
					this.getProperty('selectable') === false
				)
			)
		);
		if (isStateful) {
			this.toggle();
		}
	},

	// ### On Toggled
	_onToggled () {
		// Toggles selected state if button is stateful.

		// See the [shared button core](../../core/button.html).

		// const isStateful = this.getProperty('views').length > 0;
		const isStateful = (
			this.getProperty('views').length > 0 ||
			(
				typeof this.getProperty('selected') !== 'undefined' &&
				(
					this.getProperty('selected') === true ||
					this.getProperty('selected') === false
				)
			) ||
			(
				typeof this.getProperty('selectable') !== 'undefined' &&
				(
					this.getProperty('selectable') === true ||
					this.getProperty('selectable') === false
				)
			)
		);
		this.elements.control[0].className = this._getClassNames('', (isStateful || this.getProperty('selectable')));
	},

	// ### Enable
	enable () {
		this.setProperties({
			disabled: false
		});

		if (this.rendered) {
			this.elements.control.removeAttr('disabled');
		}
	},

	// ### Disable
	disable () {
		this.setProperties({
			disabled: true
		});

		if (this.rendered) {
			this.elements.control.attr('disabled', 'disabled');
		}
	},

	// ### Render View
	renderView (options) {
		// Public API method that will re-render a `ButtonView` with different
		// options. If the button is stateful, it only affects the first view.
		// See `this.buttonViewOptions` for options that can be updated.
		this.buttonViewOptions = Lib.extend({}, this.buttonViewOptions, options);
		this.element.empty();
		this.element.append(this._renderViews());
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
	Button.prototype,
	ButtonCore,
	Events,
	DOM,
	State,
	ButtonObject
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

Button = Lib.runHelpers('jquery', CONTROL, Button);

export default Button;
