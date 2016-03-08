/*
Copyright (c) 2015, salesforce.com, inc. All rights reserved.

Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:
Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
Neither the name of salesforce.com, inc. nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

// # Button Component --- SLDS for React

// Implements the [Button design pattern](https://www.lightningdesignsystem.com/components/buttons) in React.

// Buttons are used within many other components in this library. There are many variations, as well as stateful buttons.

// Buttons are made of one or more [`ButtonViews`](./button-view.html).

// Stateful buttons have three views, but most buttons only have one.

// [![Button component example screenshot](/assets/demo-site/images/component-examples/button.png "See a live example of the Button component in action")](/react/button)

// > See a [live example](/react/button) of the Button component in action

// ## API
/* @todo Add a full API description of the component here. */


// ## Dependencies

// Bring in the [shared library functions](../../lib/lib.html).
import * as Lib from 'slds-for-js-core/lib';

// Use the [shared core](../../core/button.html), which contains logic that is shared across SLDS for JavaScript.
import ButtonCore, { CONTROL } from 'slds-for-js-core/components/button';

// ### React
// React is an external dependency of the project.
import React from 'react';

// ### Mixins

// These are mixins that appear in all of SLDS for Javascript,
// bringing consistency to instantiation, events, and state.

// #### Events
// [../mixins/events](../mixins/events.html)
import Events from '../mixins/events';

// #### Generic Will Mount
// [../mixins/generic-will-mount](../mixins/generic-will-mount.html)
import genericWillMount from '../mixins/generic-will-mount';

// #### State
// [../mixins/state](../mixins/state.html)
import State from '../mixins/state';

// Use the [shared button view core](../../core/button-view.html) and `isIcon` to check `propTypes` passed.
import ButtonViewCore from 'slds-for-js-core/components/button-view';
import isIcon from '../mixins/custom-prop-types/icon.js';

// ### Children

// #### Button View
// [./button-view](./button-view.html)
import ButtonView from './button-view';

// ## Button

// SLDS for React **extends objects** by merging them together, rather than
// via the prototype chain or imitation of object-oriented inheritance.
// The important thing to remember is that _some methods will be available 
// to the component which are not declared in this file_.

// These are not magic methods, they're not black box methods, but you do need
// to trace the dependencies of the component to see where they are coming
// from. In particular, Button extends its [core](../../core/button.html),
// which in turn extends the base component.

export const ButtonDefinition = {
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
		assistiveText : React.PropTypes.string,
		icon          : isIcon,
		iconPosition  : React.PropTypes.oneOf(Object.keys(ButtonViewCore.iconPositions)),
		iconSize      : React.PropTypes.oneOf(Object.keys(ButtonViewCore.buttonIconSizes)),
		iconStyle     : React.PropTypes.oneOf(Object.keys(ButtonCore.iconButtonStyles)),
		selected      : React.PropTypes.bool,
		selectable    : React.PropTypes.bool,
		size          : React.PropTypes.oneOf(Object.keys(ButtonCore.sizes)),
		text          : React.PropTypes.string,
		theme         : React.PropTypes.oneOf(Object.keys(ButtonCore.themes))
		// > @todo Decide if this valid. Picklist needs spans and SVG as children.
		/*
		children: function (props, propName, componentName) {
			const prop = props[propName];
			let error;
			React.Children.forEach(prop, child => {
				if (!error && child.type !== ButtonView) {
					error = new Error(
						'`' + componentName + '` ' +
						'should only contain children of the type `ButtonView`.'
					);
				}
			});
			if (error) {
				return error;
			}
		}
		*/
	},

	// ## Render
	render () {
		// While some functionality moves into the SLDS for JS core or traits,
		// SLDS for React components typically provides their own rendering
		// logic so that they can take advantage of the benefits offered by
		// React and maintain appropriate patterns for it.

		// ### Button Properties

		// The following props have special meaning to us, but we want to
		// allow any props not listed (such as `onClick`) to be added to the
		// `<Button/>`.
		const {
			assistiveText,
			className,
			icon,
			iconPosition,
			iconSize,
			iconStyle,
			selected,
			selectable,
			size,
			text,
			theme,
			// ### Additional properties
			// We allow allowing additional cleanly with [object destructuring](https://facebook.github.io/react/docs/transferring-props.html#transferring-with-...-in-jsx).
			...props
		} = this.props;

		// ### Stateful Buttons

		// This button is a stateful button if it has any children or if we have specifically flagged it as selectable.
		const isStateful = React.Children.count(this.props.children) || this.props.selectable;

		// If there are existing children (typically of type [`ButtonView`](./button-view.html).), we need to clone them and pass them all the same `iconPosition` that is used by the button.
		const views = React.Children.map(this.props.children, (child, index) => {
			return React.cloneElement(child, {
				iconPosition : this.props.iconPosition,
				key          : index
			});
		}) || [];

		// ### Default View

		// > At least one [`ButtonView`](./button-view.html). is always needed, regardless of whether there children of this button or not.

		// If there are no children, the Button does not need a view type.

		// However, if there are, we give it a view type of `notSelected`, to represent its ARIA role.
		const defaultView = views.length > 0 ? 'notSelected' : null;

		views.push(
			<ButtonView
				assistiveText = {this.props.assistiveText}
				icon          = {this.props.icon}
				iconSize      = {this.props.iconSize}
				iconStyle     = {this.props.iconStyle}
				text          = {this.props.text}
				view          = {defaultView}
				iconPosition  = {this.props.iconPosition}
				key           = "default"
			/>
		);

		// Time to put the button together using the props and views we
		// configured above. `_getClassNames` can be found in the [shared
		// core](../../core/button.html).
		return (
			<button
				type      = "button"
				className = {this._getClassNames(this.props.className, isStateful)}
				{...props}
			>{views}</button>
		);
	}
};

let Button = Lib.merge(
	{},
	ButtonCore,
	ButtonDefinition
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
Button = Lib.runHelpers('react', CONTROL, Button);

// Once everything has been merged together and all registered helpers have
// been run we can create the React class and export the result for
// consumption by our apps.
Button = React.createClass(Button);

export default Button;
