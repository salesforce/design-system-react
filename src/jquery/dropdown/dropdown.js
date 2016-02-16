/*
Copyright (c) 2015, salesforce.com, inc. All rights reserved.

Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:
Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
Neither the name of salesforce.com, inc. nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

// # Dropdown Component --- jQuery Facade

// Implements the [Dropdown design pattern](https://www.lightningdesignsystem.com/components/menus#dropdown) in jQuery.

// [![Dropdown component example screenshot](/assets/demo-site/images/component-examples/dropdown.png "See a live example of the Dropdown component in action")](/jquery/dropdown)

// > See a [live example](/jquery/dropdown) of the Dropdown component in action

// ## API

/* @todo Add a full API description of the control here. */

// ## Dependencies

// Bring in the [shared library functions](../../lib/lib.html).
import * as Lib                from '../../lib/lib';

// Use the [shared core](../../core/dropdown.html), which contains logic that is
// the same in every facade.
import DropdownCore, { CONTROL } from '../../core/dropdown';

// ### Traits

// #### Openable
// * [../../traits/openable](../../traits/openable.html)
import Openable         from '../../traits/openable';

// #### Positionable
// * [../../traits/positionable](../../traits/positionable.html)
import Positionable         from '../../traits/positionable';

// ### jQuery
// jQuery is an external dependency of the project.
const $ = Lib.global.jQuery || Lib.global.$;

// ### Mixins

// These are mixins that appear in every Façade, bringing consistency between
// how each framework deals with instantiation, events, and state.

// #### DOM
// [../dom](../dom.html)
import DOM                     from '../dom';

// #### Events
// [../mixins/events](../mixins/events.html)
import Events                  from '../events';

// #### State
// [../mixins/state](../mixins/state.html)
import State                   from '../state';

// #### Svg
// [../svg](../svg.html)
import Svg                   from '../svg';

// ### Children

// #### Picklist
// [../picklist/picklist](../picklist/picklist.html)
import Picklist from '../picklist/picklist';

// #### Button
// [../button/button](../button/button.html)
import Button from '../button/button';

// #### Dropdown Template
// [./dropdown-template](./dropdown-template.html)
import template              from './dropdown-template';

// ## Dropdown Constructor
// Constructors are functions that are called by the `new` keyword and is the
// function that an options object is passed into.let Dropdown = function Dropdown () {
	const options = this._getOptions(arguments);

	this.template = $(template);

	this._initialize(options);
};

export const DropdownObject = {
	_initializer () {
		this.element = this.$el = this.elements.control = this.template.clone();
		this._initElements();
	},

	_render () {
		// Configure the button
		let icon;

		if (this.getProperty('swapIcon')) {
			const selection = this._getSelection();
			icon = !!selection && selection.getIcon();
		}

		icon = icon || this.getProperty('icon');

		this.button = new Button({
			icon,
			iconStyle: 'icon-more'
		});

		this.elements.button = this.button.element;

		this.elements.button.attr('aria-haspopup', true);

		this.button.prependTo(this.element);

		// Render the menu
		this._renderMenu(this.elements);

		if (this._collection._data.length === 0) {
			this.disable();
		}

		return this.element;
	},

	_onChanged () {
		const item = this._getSelection();

		if (this.rendered) {
			this._addCheckmark(this.elements);
			this._swapIcon(item.getIcon());
		}
	},

	_swapIcon (iconString) {
		const icon = iconString || this.getProperty('icon');

		if (Lib.isString(icon) && icon.length > 0 && this.getProperty('swapIcon')) {
			this.button.renderView({
				icon: icon
			});
		}
	}
};

// Façades **extends objects** by merging them together, rather than via the
// prototype chain or imitation of object-oriented inheritance. The important
// thing to remember is that _some methods will be available to the component
// which are not declared in this file_.

// These are not magic methods, they're not black box methods, but you do need
// to trace the dependencies of the component to see where they are coming
// from. In particular, Dropdown extends its [core](../../core/dropdown.html),
// which in turn extends the base component.

Lib.merge(
	Dropdown.prototype,
	DropdownCore,
	Events,
	DOM,
	State,
	Svg,
	PicklistObject,
	DropdownObject
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

Dropdown = Lib.runHelpers('jquery', CONTROL, Dropdown);

export default Dropdown;
