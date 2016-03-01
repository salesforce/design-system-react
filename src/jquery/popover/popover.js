/*
Copyright (c) 2015, salesforce.com, inc. All rights reserved.

Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:
Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
Neither the name of salesforce.com, inc. nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

// # Popover Component --- SLDS for jQuery

// Implements the [Popover design pattern](https://www.lightningdesignsystem.com/components/popovers#base) in jQuery.

// [![Popover component example screenshot](/assets/demo-site/images/component-examples/popover.png "Popover component example screenshot")](/jquery/popover)

// > See a [live example](/jquery/popover) of the Popover component in action

// ## API

/* @todo Add a full API description of the component here. */

// ## Dependencies

// Bring in the [shared library functions](../../lib/lib.html).
import * as Lib                 from '../../lib/lib';

// Use the [shared core](../../core/popover.html)
import PopoverCore, { CONTROL } from '../../core/popover';

// ### jQuery
// jQuery is an external dependency of the project.
import $ from 'jquery';

// ### Traits

// #### Openable
// [../../traits/openable](../../traits/openable.html)
import Openable                 from '../../traits/openable';

// #### Positionable
// [../../traits/positionable](../../traits/positionable.html)
import Positionable             from '../../traits/positionable';

// ### Mixins

// These are mixins that appear in all of SLDS for Javascript,
// bringing consistency to instantiation, events, and state.

// #### DOM
// [../dom](../dom.html)
import DOM                      from '../dom';

// #### Events
// [../mixins/events](../mixins/events.html)
import Events                   from '../events';

// #### State
// [../mixins/state](../mixins/state.html)
import State                    from '../state';

// ### Children

// #### Popover Template
// [./popover-template](./popover-template.html)
import template                 from './popover-template';


// ## Popover Constructor
// Constructors are functions that are called by the `new` keyword and is the
// function that an options object is passed into.

let Popover = function Popover () {
	const options = this._getOptions(arguments);
	this.template = $(template);
	this.toggle   = Openable.toggle.bind(undefined, this);
	this.open     = Openable.open.bind(undefined, this);
	this.close    = Openable.close.bind(undefined, this);

	this._initialize(options);
};

// ## Popover Methods
export const PopoverMethods = {
	// ### Initializer
	_initializer () {
		this.element = this.$el = this.elements.control = this.template.clone();
		Positionable.setElement(this, this.element);
	},

	// ### On Rendered
	_onRendered () {
		this._setElements();
		this._setTrigger();

		// TODO: This is probably not the best way to do this or the best place for it to be
		this.appendTo($(Positionable.getContainer(this)));
	},

	// ### Set Elements
	_setElements () {
		const triggerElement = this.getProperty('target');
		const align = this.getProperty('align');

		this.elements.triggerElement = Lib.wrapElement(triggerElement || this.elements.wrapper);
		Positionable.setContainer(this, this.getProperty('container') || document.querySelector('body'));
		Positionable.setTarget(this, align || this.elements.triggerElement);
	},

	// ### Set Trigger
	_setTrigger () {
		const trigger = this.getProperty('trigger');

		if (trigger === 'click') {
			this.elements.triggerElement.on( 'click', $.proxy(this.toggle, this));
		} else if (trigger === 'hover') {
			this.elements.triggerElement.on( 'mouseover', $.proxy(this.open, this));
			this.elements.triggerElement.on( 'mouseout', $.proxy(this.close, this));
		} else if (trigger === 'focus') {
			this.elements.triggerElement.on( 'focus', $.proxy(this.open, this));
			this.elements.triggerElement.on( 'focusout', $.proxy(this.close, this));
		}
	},

	// ### On Opened
	_onOpened () {
		Positionable.position(this);
		Positionable.show(this);
	},

	// ### On Closed
	_onClosed () {
		Positionable.position(this);
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

Lib.merge(Popover.prototype, PopoverCore, Events, DOM, State, PopoverMethods, {
	// ### Render
	_render () {
		const body = this.element.find('.slds-popover__body');

		if (this.getProperty('content')) {
			body.append(this.getProperty('content'));
		}

		return this.element;
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

Popover = Lib.runHelpers('jquery', CONTROL, Popover, {});

export default Popover;
