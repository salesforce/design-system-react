/*
Copyright (c) 2015, salesforce.com, inc. All rights reserved.

Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:
Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
Neither the name of salesforce.com, inc. nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

// # Popover Component --- SLDS for React

// Implements the [Popover design pattern](https://www.lightningdesignsystem.com/components/popovers#base) in React. This is similar to both the Picklist and the Pills, but currently there is no inheritance from either component.

// [![Popover component example screenshot](/assets/demo-site/images/component-examples/popover.png "Popover component example screenshot")](/react/popover)

// > See a [live example](/react/popover) of the Popover component in action

// ## API

/* @todo Add a full API description of the component here. */

// ## Dependencies

// Bring in the [shared library functions](../../lib/lib.html).
import * as Lib                 from '../../lib/lib';

// Use the [shared core](../../core/popover.html), which contains logic that is
// shared across SLDS for JavaScript.
import PopoverCore, { CONTROL } from '../../core/popover';

// ### Traits

// #### Openable
// [../../traits/openable](../../traits/openable.html)
import Openable                 from '../../traits/openable';

// #### Positionable
// [../../traits/positionable](../../traits/positionable.html)
import Positionable             from '../../traits/positionable';

// ### React and ReactDOM
// React and ReactDOM are external dependencies of the project.
import React                    from 'react';
import ReactDOM                 from 'react-dom';

// ### Mixins

// These are mixins that appear in all of SLDS for Javascript,
// bringing consistency to instantiation, events, and state.

// #### Events
// [../mixins/events](../mixins/events.html)
import Events                   from '../mixins/events';

// #### Generic Will Mount
// [../mixins/generic-will-mount](../mixins/generic-will-mount.html)
import genericWillMount         from '../mixins/generic-will-mount';

// #### Mountable
// [../mixins/generic-will-mount](../mixins/custom-prop-types/mountable.html)
import mountable                from '../mixins/custom-prop-types/mountable';

// #### State
// [../mixins/state](../mixins/state.html)
import State                    from '../mixins/state';

// ## PopoverObject
export const PopoverDefinition = {
	// ### Mixins

	// SLDS for React specifically is also extended via React's standard
	// mixin model. These three mixins hook into native React Wycliffe events
	// and expose functionality needed for a cross-framework core. For
	// example, some places in the core or traits a `setState` method is used.
	//
	// In React this is built in to the framework, while SLDS for jQuery
	// simply borrow the idea for its own use.
	//
	// Similarly, a `setProperties` method is available but in React it is
	// actually a `noop` because React expects a one-way data flow, while in
	// other Frameworks it typically does something very similar to
	// `setState`.
	mixins: [State, Events, genericWillMount],

	// ### Display Name
	// > Always use the canonical component name (set in the core) as the
	// > React display name.
	displayName: CONTROL,

	// ### Prop Types
	propTypes: {
		alignmentTarget                    : mountable,
		autoFlip                           : React.PropTypes.bool,
		container                          : mountable,
		modal                              : React.PropTypes.bool,
		positionedTargetVerticalAttachment : React.PropTypes.oneOf(Object.keys(Positionable.attatchmentOptions))
	},

	// ### Render Popover Content
	_renderPopoverContent () {
		return (
				<div className="slds-popover__content">
					<div className="slds-popover__body">{this.props.children}</div>
				</div>
		);
	},

	// ### Render Modal Popover
	_renderModalPopover () {
		// This function renders popover as an absolutely-positioned `div`
		// based on the target. If the property `modal` is true, then the
		// listeners will be created for scrolling and resizing.
		Positionable.setContainer(this, this.props.container || document.querySelector('body'));
		Positionable.setTarget(this, this.props.alignmentTarget || document.querySelector('body'));

		const isOpen = Openable.isOpen(this);
		if (this.props.modal && isOpen) {
			Positionable.addEventListeners(this);
		} else if (this.props.modal && !isOpen) {
			Positionable.removeEventListeners(this);
		}

		// `_setControlElement` is part of the `genericWillMount` mixin.
		this._setControlElement(Positionable.getElement(this));

		const popoverContent = this._renderPopoverContent();
		ReactDOM.render(popoverContent, Positionable.getElement(this));
		Positionable.position(this);
	},

	// ### Render
	render () {
		// The real render occurs within `_renderModalPopover`.
		return false;
	},

	// ### On Opened
	_onOpened () {
		Positionable.show(this);
	},

	// ### On Closed
	_onClosed () {
		Positionable.hide(this);
	},

	// ### Component Will Mount
	componentWillMount () {
		this.setState({
			isOpen: this.props.isOpen
		});

		Positionable.setElement(this, Positionable.attachPositionedElementToBody({attributes: [['role', 'dialog']]}));
	},

	// ### Component Will Unmount
	componentWillUnmount () {
		if (this.props.modal) {
			Positionable.removeEventListeners(this);
		}
	},

	// ### Component Will Receive Props
	componentWillReceiveProps (nextProps) {
		this.setState({
			isOpen: nextProps.isOpen
		});
	},

	// ### Component Did Update
	componentDidUpdate () {
		this._renderModalPopover();
	}
};

// ## Popover

// SLDS for React **extends objects** by merging them together, rather than
// via the prototype chain or imitation of object-oriented inheritance.
// The important thing to remember is that _some methods will be available 
// to the component which are not declared in this file_.

// These are not magic methods, they're not black box methods, but you do need
// to trace the dependencies of the component to see where they are coming
// from. In particular, Popover extends its [core](../../core/popover.html),
// which in turn extends the base component.

let Popover = Lib.merge(
	{},
	PopoverCore,
	PopoverDefinition
);

// ### Run the helpers

// `Helpers` are a feature of SLDS for React that allows anyone to register code that
// can manipulate the component before it is encapsulated in a React class.
//
// This allows flexibility for adding custom behavior without modifying the
// original source, or for adding optional behavior.
//
// Nothing in the component itself should ever depend on the presence
// of helpers, as they are completely optional.
Popover = Lib.runHelpers('react', CONTROL, Popover);

// Once everything has been merged together and all registered helpers have
// been run we can create the React class and export the result for
// consumption by our apps.
Popover = React.createClass(Popover);

export default Popover;
