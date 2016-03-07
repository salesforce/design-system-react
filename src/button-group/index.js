/*
Copyright (c) 2015, salesforce.com, inc. All rights reserved.

Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:
Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
Neither the name of salesforce.com, inc. nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

// # Button Groups Component --- SLDS for React

// Implements the [Button Groups design pattern](https://www.lightningdesignsystem.com/components/button-groups) in React.

// Button Groups collect one or more [`Button`](../button.html) into a group.

// [![Button Groups component example screenshot](/assets/demo-site/images/component-examples/button-group.png "See a live example of the Button Groups component in action")](/react/button-group)

// > See a [live example](/react/button-group) of the Button Group component in action

// ## API
/* @todo Add a full API description of the component here. */

// ## Dependencies

// Bring in the [shared library functions](../../lib/lib.html).
import * as Lib from 'slds-for-js-core/lib';

// ### React
// React is an external dependency of the project.
import React from 'react';

// ### Mixins
// These are mixins that appear in all of SLDS for Javascript,
// bringing consistency to instantiation, events, and state.

// #### Generic Will Mount
// [../mixins/generic-will-mount](../mixins/generic-will-mount.html)
import genericWillMount from '../mixins/generic-will-mount';

// #### Events
// [../mixins/events](../mixins/events.html)
import Events from '../mixins/events';

// #### State
// [../mixins/state]](../mixins/state.html)
import State from '../mixins/state';

// ### Children

// #### Button
// [../button](../button.html)
import Button from '../button';

// #### Dropdown
// [../dropdown/dropdown](../dropdown/dropdown.html)
import Dropdown from '../dropdown/dropdown';

// Since Button Groups are just a collection of `<Button>` in a wrapper, there is
// no need for a common core in SLDS for JavaScript. Therefore we must set `CONTROL`
// manually here.
export const CONTROL = 'slds-button-group';

// ## Button Group Object
export const ButtonGroupDefinition = {
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
	// Always use the canonical component name (set in the core) as the React
	// display name.
	displayName: CONTROL,

	// ### Prop Types
	propTypes: {
		children: function (props, propName, componentName) {
			const prop = props[propName];
			let error;
			React.Children.forEach(prop, child => {
				if (!error && ( child.type !== Button && child.type !== Dropdown ) ) {
					error = new Error(
						'`' + componentName + '` ' +
						'should only contain children of the type `Button` or `Dropdown`.'
					);
				}
			});

			if (error) {
				return error;
			}
		}
	},

	// ### Render
	render () {
		return (
			<div className="slds-button-group" role="group">{this.props.children}</div>
		);
	}
};

// ## Button Group

// SLDS for React **extends objects** by merging them together, rather than
// via the prototype chain or imitation of object-oriented inheritance.
// The important thing to remember is that _some methods will be available 
// to the component which are not declared in this file_.

// These are not magic methods, they're not black box methods, but you do need
// to trace the dependencies of the component to see where they are coming
// from.

let ButtonGroup = Lib.merge(
	{},
	ButtonGroupDefinition
);

ButtonGroup = React.createClass(ButtonGroup);

export default ButtonGroup;
