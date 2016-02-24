/*
Copyright (c) 2015, salesforce.com, inc. All rights reserved.

Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:
Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
Neither the name of salesforce.com, inc. nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

// # Tooltip Component --- jQuery Facade

// Implements the [Tooltip design pattern](http://www.lightningdesignsystem.com/components/popovers/#tooltips) in jQuery.

// [![Tooltip component example screenshot](/assets/demo-site/images/component-examples/tooltip.png "See a live example of the Tooltip component in action")](/jquery/tooltip)

// > See a [live example](/jquery/tooltip) of the Tooltip component in action

// ## API

/* @todo Add a full API description of the control here. */

// ## Dependencies

// Bring in the [shared library functions](../../lib/lib.html).
import * as Lib                 from '../../lib/lib';

// Use the [shared core](../../core/tooltip.html), which contains logic that is
// the same in every facade.
import TooltipCore, { CONTROL } from '../../core/tooltip';

// ### Traits

// #### Openable
// * [../../traits/openable](../../traits/openable.html)
import Openable                 from '../../traits/openable';

// #### Positionable
// * [../../traits/positionable](../../traits/positionable.html)
import Positionable             from '../../traits/positionable';

// ### jQuery
// jQuery is an external dependency of the project.
import $ from 'jquery';

// ### Mixins

// These are mixins that appear in every Façade, bringing consistency between
// how each framework deals with instantiation, events, and state.

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

// #### Popover Methods
// [./../popover/popover](./../popover/popover.html#popoverobject)
import { PopoverMethods }       from '../popover/popover';

// #### Tooltip Template
// [./tooltip-template](./tooltip-template.html)
import template                 from './tooltip-template';

// ## Tooltip Constructor
// Constructors are functions that are called by the `new` keyword and is the
// function that an options object is passed into.
let Tooltip = function Tooltip () {
	const options = this._getOptions(arguments);

	this.template = $(template);

	this.toggle   = Openable.toggle.bind(undefined, this);
	this.open     = Openable.open.bind(undefined, this);
	this.close    = Openable.close.bind(undefined, this);

	this._initialize(options);
};

// Façades **extends objects** by merging them together, rather than via the
// prototype chain or imitation of object-oriented inheritance. The important
// thing to remember is that _some methods will be available to the component
// which are not declared in this file_.

// These are not magic methods, they're not black box methods, but you do need
// to trace the dependencies of the component to see where they are coming
// from. In particular, Tooltip extends its [core](../../core/tooltip.html),
// which in turn extends the base component.

Lib.merge(Tooltip.prototype, TooltipCore, Events, DOM, State, PopoverMethods, {
	// ### Render
	_render () {
		const body = $(Positionable.getElement(this)).find('.slds-popover__body');

		if (this.getProperty('content')) {
			body.append(this.getProperty('content'));
		}

		return this.element;
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

Tooltip = Lib.runHelpers('jquery', CONTROL, Tooltip, {});

export default Tooltip;
