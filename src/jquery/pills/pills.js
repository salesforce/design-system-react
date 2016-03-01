/*
Copyright (c) 2015, salesforce.com, inc. All rights reserved.

Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:
Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
Neither the name of salesforce.com, inc. nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

// # Pills Component --- SLDS for jQuery

// Implements the [Pills design pattern](https://www.lightningdesignsystem.com/components/pills) in jQuery.

// [![Pills component example screenshot](/assets/demo-site/images/component-examples/pills.png "Pills component example screenshot")](/jquery/pills)

// > See a [live example](/jquery/pills) of the Pills component in action

// ## API

/* @todo Add a full API description of the component here. */

// ## Dependencies

// Bring in the [shared library functions](../../lib/lib.html).
import * as Lib               from '../../lib/lib';

// Use the [shared core](../../core/pills.html)
import PillsCore, { CONTROL } from '../../core/pills';

// ### jQuery
// jQuery is an external dependency of the project.
import $ from 'jquery';

// ### Traits

// #### Eventable
// [../../traits/eventable](../../traits/eventable.html)
import Eventable              from '../../traits/eventable';

// #### Multiselectable
// [../../traits/multiselectable](../../traits/multiselectable.html)
import Multiselectable        from '../../traits/multiselectable';

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

// #### Button
// [../button/button](../button/button.html)
import Button                 from '../button/button';

// #### Pills Template
// [./pills-template](./pills-template.html)
import template               from './pills-template';


// ## Pills Constructor
// Constructors are functions that are called by the `new` keyword and is the
// function that an options object is passed into.

let Pills = function Pills () {
	const options = this._getOptions(arguments);

	this.template = $(template);

	this._initialize(options);
};

// SLDS for jQuery **extends objects** by merging them together, rather than
// via the prototype chain or imitation of object-oriented inheritance.
// The important thing to remember is that _some methods will be available 
// to the component which are not declared in this file_.

// These are not magic methods, they're not black box methods, but you do need
// to trace the dependencies of the component to see where they are coming
// from. In particular, Pills extends its [core](../../core/pills.html),
// which in turn extends the base component.

Lib.merge(Pills.prototype, PillsCore, Events, DOM, State, {
	cssClasses: {
		DISABLED: 'slds-disabled'
	},

	// ### Initializer
	_initializer () {
		this.element = this.$el = this.elements.control = this.template.clone();
		this.elements.pillTemplate = this.element.find('.slds-pill').remove();

		Eventable.on(this, 'select', this._onSelect, this);
		Eventable.on(this, 'deselect', this._onDeselect, this);
	},

	// ### Bind Ui Events
	_bindUIEvents () {
		this.element.on('click', '.slds-pill > .slds-button', this._itemClicked.bind(this));
	},

	// ### Render
	_render () {
		const strings = this.getState('strings');

		// TODO: Now that string rendering has been updated this should work
		// fine, but further analysis may be required to ensure that is the
		// case
		this.elements.button = new Button({
			assistiveText: strings.REMOVE,
			icon: 'utility.close',
			iconStyle: 'icon-bare'
		}).element;

		this._renderSelection();

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
			this.elements.removeClass(this.cssClasses.DISABLED);
		}
	},

	// ### Disable
	disable () {
		this.setProperties({
			disabled: true
		});

		if (this.rendered) {
			this.element.addClass(this.cssClasses.DISABLED);
		}
	},

	// ### Item Clicked
	_itemClicked (e) {
		const item = $(e.currentTarget).parent().data('item');

		if (!this.getProperty('disabled')) {
			Multiselectable.deselectItem(this, item, this.getProperty('selection'));
		}
	},

	// ### Select Pill
	selectPill (item, index) {
		Multiselectable.selectItem(this, item, this.getProperty('selection'), index);
	},

	// ### Select Pills
	selectPills (items, index) {
		Multiselectable.selectItems(this, items, this.getProperty('selection'), index);
	},

	// ### On Select
	_onSelect (itemsToSelect, selection) {
		this.setProperties({ selection: selection._data });

		this.trigger('selected', itemsToSelect, selection._data);
		this.trigger('changed', itemsToSelect, selection._data);
	},

	// ### On Deselect
	_onDeselect (itemsToDeselect, selection) {
		this.setProperties({ selection: selection._data });
		this._renderSelection();

		this.trigger('deselected', itemsToDeselect, selection._data);
		this.trigger('changed', itemsToDeselect, selection._data);
	},

	// ### Render Pill
	_renderPill (pill) {
		const $pill = this.elements.pillTemplate.clone();

		$pill.button = this.elements.button.clone();
		$pill.find('x-remove-button').replaceWith($pill.button);

		$pill.find('.slds-pill__label').text(pill.getText());
		$pill.data({
			item: pill.get()
		});

		return $pill;
	},

	// ### Render Selection
	_renderSelection () {
		// TODO: Fix this so that it doesn't flicker when a pill is removed
		const self = this;
		const elements = [];
		const selection = this._getDataAdapter(this.getProperty('selection'));

		selection.forEach(function (pill) {
			elements.push(self._renderPill(pill));
		});

		this.element.empty();
		this.element.prepend(elements);
	}
});

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

Pills = Lib.runHelpers('jquery', CONTROL, Pills);

export default Pills;
