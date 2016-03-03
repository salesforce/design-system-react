/*
Copyright (c) 2015, salesforce.com, inc. All rights reserved.

Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:
Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
Neither the name of salesforce.com, inc. nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

// # Combobox Component --- SLDS for jQuery

// A Combobox is similiar to the [Lookup component](/jquery/lookup). It is a dropdown menu paired with a text input form element, but allows any input.

// [![Combobox component example screenshot](/assets/demo-site/images/component-examples/combobox.png "See a live example of the Combobox component in action")](/jquery/combobox)

// > See a [live example](/jquery/combobox) of the Combobox component in action

// ## API

/* @todo Add a full API description of the control here. */

// ## Dependencies

// Bring in the [shared library functions](../../lib/lib.html).
import * as Lib                  from '../../lib/lib';

// Use the [shared core](../../core/combobox.html), which contains logic that is
// shared across SLDS for JavaScript.
import ComboboxCore, { CONTROL } from '../../core/combobox';

// ### Traits

// #### Multiselectable
// * [../../traits/multiselectable](../../traits/multiselectable.html)
import Multiselectable           from '../../traits/multiselectable';

// #### Picklist Object
// [../picklist/picklist](../picklist/picklist.html)
import { PicklistDefinition }        from '../picklist/picklist';

// ### jQuery
// jQuery is an external dependency of the project.
import $ from 'jquery';

// ### Mixins

// These are mixins that appear in all of SLDS for Javascript,
// bringing consistency to instantiation, events, and state.

// #### DOM
// [../dom](../dom.html)
import DOM                       from '../dom';

// #### Events
// [../mixins/events](../mixins/events.html)
import Events                    from '../events';

// #### State
// [../mixins/state](../mixins/state.html)
import State                     from '../state';

// #### Svg
// [../svg](../svg.html)
import Svg                       from '../svg';

// ### Children

// #### Combobox Template
// [./combobox-template](./combobox-template.html)
import template                  from './combobox-template';

// ## Combobox Constructor
// Constructors are functions that are called by the `new` keyword and is the
// function that an options object is passed into.
let Combobox = function Combobox () {
	const options = this._getOptions(arguments);

	this.template = $(template);
	this._initialize(options);
};

// ## Combobox Object
// ***Private Methods***: Although not truly private methods, methods–that
// should only function as private–follow the convention of being prefixed
// with `_` (an underscore).
export const ComboboxDefinition = {
	// ### Initializer
	_initializer () {
		this.element = this.$el = this.elements.control = this.template.clone();
		this._initElements();
	},

	// ### Init Elements
	_initElements () {
		this.elements.button = this.element.find('.' + this.cssClasses.TOGGLE);
		this.elements.input = this.element.find('.' + this.cssClasses.INPUT);
		this.elements.dropdown = this.element.find('.' + this.cssClasses.MENU);
		this.elements.dropdownMenu = this.element.find('.' + this.cssClasses.LIST);

		/* TODO: icon is not perfectly centered */
		const $icon = this._renderIcon('utility.down');
		$icon.replaceAll(this.elements.button.find('x-button-svg')[0]);
	},

	// ### Bind Ui Events
	_bindUIEvents () {
		this.elements.button.on('click', this._handleClicked.bind(this));
		this.elements.dropdownMenu.on('click', 'a', this._handleMenuItemSelected.bind(this));
		this.elements.input.on('change', this._handleChanged.bind(this));
		// TODO: Find the right element for these keypress triggers
		this.elements.dropdown.on('keydown', this._handleKeyDown.bind(this));
		this.elements.dropdown.on('keypress', this._handleKeyPressed.bind(this));
	},

	// ### Render
	render () {
		const selection = this._getSelection();

		if (this.getProperty('disabled')) {
			this.elements.input.attr('disabled', 'disabled');
			this.elements.button.attr('disabled', 'disabled');
		}

		// Show the current selection if there is one
		this.elements.input.val(selection.getText());

		this._renderMenu(this.elements);

		return this.element;
	},

	// ### On Changed
	_onChanged () {
		const item = this._getSelection();

		if (this.rendered) {
			this.elements.input.val(item.getText());

			this._addCheckmark(this.elements);
		}
	},

	// ### Enable
	enable () {
		this.setProperties({
			disabled: false
		});

		if (this.rendered) {
			this.elements.input.removeAttr('disabled');
			this.elements.button.removeAttr('disabled');
		}
	},

	// ### Disable
	disable () {
		this.setProperties({
			disabled: true
		});

		if (this.rendered) {
			this.elements.input.attr('disabled', 'disabled');
			this.elements.button.attr('disabled', 'disabled');
		}
	},
	// ### On Enabled Or Disabled
	_onEnabledOrDisabled () {
		if (this.rendered) {
			const disabled = !!this.getProperty('disabled');

			this.elements.input.prop('disabled', disabled);
			this.elements.button.prop('disabled', disabled);
		}
	},

	// ### Reset Width
	_resetWidth (width) {
		if (this.rendered) {
			this.elements.dropdownMenu.width(width);
		}
	},

	// ### Handle Changed
	_handleChanged () {
		const value = {};

		// TODO: Not SLDS related, I've realized this model won't work perfectly with all data accessor types - might want to consider this
		value[this.accessors.textProp()] = this.elements.input.val();

		Multiselectable.selectItem(this, value);
	}
};

// SLDS for jQuery **extends objects** by merging them together, rather than
// via the prototype chain or imitation of object-oriented inheritance.
// The important thing to remember is that _some methods will be available 
// to the component which are not declared in this file_.

// These are not magic methods, they're not black box methods, but you do need
// to trace the dependencies of the component to see where they are coming
// from. In particular, Combobox extends its [core](../../core/combobox.html),
// which in turn extends the base component.

Lib.merge(
	Combobox.prototype,
	ComboboxCore,
	Events,
	DOM,
	State,
	Svg,
	PicklistDefinition,
	ComboboxDefinition
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

Combobox = Lib.runHelpers('jquery', CONTROL, Combobox);

export default Combobox;
