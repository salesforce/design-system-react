/*
Copyright (c) 2015, salesforce.com, inc. All rights reserved.

Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:
Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
Neither the name of salesforce.com, inc. nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

// # Notification Component --- jQuery Facade

// Implements the [Notification design pattern](https://www.lightningdesignsystem.com/components/notifications) in jQuery.

// [![Notification component example screenshot](/assets/demo-site/images/component-examples/notification.png "See a live example of the Notification component in action")](/jquery/notification)

// > See a [live example](/jquery/notification) of the Notification component in action

// ## API

/* @todo Add a full API description of the control here. */

// ## Dependencies

// Bring in the [shared library functions](../../lib/lib.html).
import * as Lib                      from '../../lib/lib';

// Use the [shared core](../../core/notification.html), which contains logic that is
// the same in every facade.
import NotificationCore, { CONTROL } from '../../core/notification';

// ### jQuery
// jQuery is an external dependency of the project.
import $ from 'jquery';

// ### Mixins

// These are mixins that appear in every Façade, bringing consistency between
// how each framework deals with instantiation, events, and state.

// #### DOM
// [../dom](../dom.html)
import DOM                           from '../dom';

// #### Events
// [../mixins/events](../mixins/events.html)
import Events                        from '../events';

// #### State
// [../mixins/state](../mixins/state.html)
import State                         from '../state';

// ### Children

// #### Button
// [../button/button](../button/button.html)
import Button                        from '../button/button';

// #### Template
// [./template](./template.html)
import template                      from './template';

// ## Notification Constructor
// Constructors are functions that are called by the `new` keyword and is the
// function that an options object is passed into.
let Notification = function Notification () {
	const options = this._getOptions(arguments);

	this.template = $(template);

	this._initialize(options);
};

// ## Notification Object
export const NotificationObject = {
	// ### Initializer
	_initializer () {
		this.element = this.$el = this.elements.control = this.template.clone();
	},

	// TODO: Internationalize
	// TODO: The patterns here are a little different than the rest of our controls
	// ### Render
	_render () {
		const strings = this.getState('strings');
		const classNames = this._getClassNames();

		// Load template
		const $el = this.element;

		// Update theme
		$el.addClass(classNames);

		// Replace notification text
		// TODO: Should this also use the contents of the original? It's different in jQuery becasue in React 'Children' is actually just another prop
		$el.find('.notify-text').text(this.getProperty('text'));

		const $closeButton = new Button({
			assistiveText: strings.CLOSE,
			iconStyle: 'icon-inverse',
			icon: 'action.close'
		});
		$closeButton.element.addClass('slds-notify__close');
		$closeButton.replaceAll($el.find('x-close-button')[0]);

		// Events
		$closeButton.on('click', this.hide.bind(this));
	},

	// ### Show
	show: function () {
		this.element.removeClass(this.cssClasses.HIDDEN);
		this.trigger('shown');
	},

	// ### Hide
	hide: function () {
		this.element.addClass(this.cssClasses.HIDDEN);
		this.trigger('hidden');
	}
};

// Façades **extends objects** by merging them together, rather than via the
// prototype chain or imitation of object-oriented inheritance. The important
// thing to remember is that _some methods will be available to the component
// which are not declared in this file_.

// These are not magic methods, they're not black box methods, but you do need
// to trace the dependencies of the component to see where they are coming
// from. In particular, Notification extends its [core](../../core/notification.html),
// which in turn extends the base component.

Lib.merge(
	Notification.prototype,
	NotificationCore,
	Events,
	DOM,
	State,
	NotificationObject
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

Notification = Lib.runHelpers('jquery', CONTROL, Notification);

export default Notification;
