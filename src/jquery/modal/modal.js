/*
Copyright (c) 2015, salesforce.com, inc. All rights reserved.

Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:
Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
Neither the name of salesforce.com, inc. nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/


// # Modal Component --- jQuery Facade

// Implements the [Modal design pattern](https://www.lightningdesignsystem.com/components/modals) in jQuery.

// [![Modal component example screenshot](/assets/demo-site/images/component-examples/modal.png "See a live example of the Modal component in action")](/jquery/modal)

// > See a [live example](/jquery/modal) of the Modal component in action

// ## API

/* @todo Add a full API description of the control here. */

// ## Dependencies

// Bring in the [shared library functions](../../lib/lib.html).
import * as Lib               from '../../lib/lib';

// Use the [shared core](../../core/modal.html), which contains logic that is
// the same in every facade.
import ModalCore, { CONTROL } from '../../core/modal';

// ### Traits

// #### Openable
// * [../../traits/openable](../../traits/openable.html)
import Openable               from '../../traits/openable';

// ### jQuery
// jQuery is an external dependency of the project.
import $ from 'jquery';

// ### Mixins

// These are mixins that appear in every Façade, bringing consistency between
// how each framework deals with instantiation, events, and state.

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

// #### Default Renderers
// [./modal-default-renderers](./modal-default-renderers.html)
import DefaultRenderers       from './modal-default-renderers';

// #### Modal Template
// [./modal-template](./modal-template.html)
import template               from './modal-template';

// ## Modal Constructor

// Constructors are functions that are called by the `new` keyword and is the
// function that an options object is passed into.
let Modal = function Modal () {
	const options = this._getOptions(arguments);

	this.template = $(template);

	this.toggle = Openable.toggle.bind(undefined, this);
	this.open = Openable.open.bind(undefined, this);
	this.close = Openable.close.bind(undefined, this);

	this._initialize(options);
};

// Façades **extends objects** by merging them together, rather than via the
// prototype chain or imitation of object-oriented inheritance. The important
// thing to remember is that _some methods will be available to the component
// which are not declared in this file_.

// These are not magic methods, they're not black box methods, but you do need
// to trace the dependencies of the component to see where they are coming
// from. In particular, Modal extends its [core](../../core/modal.html),
// which in turn extends the base component.

Lib.merge(Modal.prototype, ModalCore, Events, DOM, State, {
	// ### Initializer
	_initializer () {
		this.element = this.$el = this.elements.control = this.template.clone();

		this._initElements();
	},

	// ### Set Default Properties
	_setDefaultProperties () {
		this.setProperties(DefaultRenderers);
	},

	// ### Init Elements
	_initElements () {
		this.elements.modal = this.element.find('.' + this.cssClasses.MODAL);
		this.elements.header = this.element.find('.' + this.cssClasses.HEADER);
		this.elements.backdrop = this.element.find('.' + this.cssClasses.BACKDROP);
	},

	// ### Bind Ui Events
	_bindUIEvents () {
		this.element.on('click', this._clickOutClose.bind(this));
	},

	// ### Render
	_render () {
		const $content = this.elements.wrapper.contents().detach();
		const $headerText = this.elements.header.find('h2');
		$headerText.addClass(this.headerTextSize[this.getProperty('headerTextSize')]);
		$headerText.text(this.getProperty('headerText'));

		this.element.find('.' + this.cssClasses.HEAD).append(this._props.renderHeader({
			headerTitle: this._props.headerText,
			headerTextSize: this._props.headerTextSize,
			headerTagline: this._props.headerTagline,
			closeClicked: this.close
		}));

		this.element.find('.' + this.cssClasses.FOOT).append(this._props.renderFooter({
			primaryText: this._props.primaryButtonText,
			secondaryText: this._props.secondaryButtonText,
			primaryClicked: this._onPrimaryClicked.bind(this),
			secondaryClicked: this._onSecondaryClicked.bind(this)
		}));

		this.element.find('.' + this.cssClasses.CONTENT).append($content);

		return this.element;
	},

	// ### On Rendered
	_onRendered () {
		this._bindUIEvents();
	},

	// ### On Primary Clicked
	_onPrimaryClicked () {
		this.element.trigger('primary');
	},

	// ### On Secondary Clicked
	_onSecondaryClicked () {
		this.element.trigger('secondary');
	},

	// ### On Opened
	_onOpened () {
		this.elements.modal.addClass(this.cssClasses.OPEN);
		this.elements.backdrop.addClass(this.cssClasses.OPENBACKDROP);
	},

	// ### On Closed
	_onClosed () {
		this.elements.modal.removeClass(this.cssClasses.OPEN);
		this.elements.backdrop.removeClass(this.cssClasses.OPENBACKDROP);
		this.element.trigger('close');
	},

	// ### Click Out Close
	_clickOutClose (e) {
		if (this.backgroundClicked(e.target)) {
			Openable.close(this);
		}
	}
});

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

Modal = Lib.runHelpers('jquery', CONTROL, Modal, {});

export default Modal;
