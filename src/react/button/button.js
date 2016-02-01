/*
Copyright (c) 2015, salesforce.com, inc. All rights reserved.

Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:
Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
Neither the name of salesforce.com, inc. nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

// # Button Control
// ### React Facade

// Implements the Button [design pattern](https://www.lightningdesignsystem.com/components/buttons) in React.

// Buttons are used within many other controls in this library. There are many variations, as well as stateful buttons. Buttons are made of one or more `ButtonViews`. Stateful buttons have three views, but most buttons only have one.

/* TODO: Add a full API description of the control here. */

// Bring in the [shared library functions](../lib/lib.html).
import * as Lib from '../../lib/lib';

// Use the [shared core](../../core/button.html), which contains logic that is the same in every facade.
import ButtonCore, {CONTROL} from '../../core/button';

// React is an external dependency.
import React from 'react';

// [State](../mixins/state.html), [Events](../mixins/events.html), and [genericWillMount](../mixins/generic-will-mount.html) are mixins that appear in every facade and bring some consistency between how each framework deals with instantiation, events, and state.
import State from '../mixins/state';
import Events from '../mixins/events';
import genericWillMount from '../mixins/generic-will-mount';

// Use the [shared button view core](../../core/button-view.html) and `isIcon` to check `propTypes` passed.
import ButtonViewCore from '../../core/button-view';
import isIcon from '../mixins/custom-prop-types/icon.js';

// `ButtonView` is a child control within `Button`.
import ButtonView from './button-view';

let Button = Lib.merge({}, ButtonCore, {
	// The React facade specifically is also extended via React's standard mixin model. These three mixins hook into native React lifecycle events and expose functionality needed for a cross-framework core. For example, some places in the core or traits a `setState` method is used. In React this is built in to the framework, and the other facades simply borrow the idea for their own use. Similarly, a `setProperties` method is available but in React it is actually a `noop` because React expects a one-way data flow, while in other Frameworks it typically does something very similar to `setState`.
	mixins: [State, Events, genericWillMount],

	// Always use the canonical control name (set in the core) as the React display name.
	displayName: CONTROL,

	propTypes: {
		assistiveText: React.PropTypes.string,
		icon: isIcon,
		iconPosition: React.PropTypes.oneOf(Object.keys(ButtonViewCore.iconPositions)),
		iconSize: React.PropTypes.oneOf(Object.keys(ButtonViewCore.buttonIconSizes)),
		iconStyle: React.PropTypes.oneOf(Object.keys(ButtonCore.iconButtonStyles)),
		selected: React.PropTypes.bool,
		selectable: React.PropTypes.bool,
		size: React.PropTypes.oneOf(Object.keys(ButtonCore.sizes)),
		text: React.PropTypes.string,
		theme: React.PropTypes.oneOf(Object.keys(ButtonCore.themes))

		/* TODO: Decide if this valid. Picklist needs spans and SVG as children.
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
		} */
	},
	
	// While some functionality moves into the core or traits, each facade typically provides its own rendering logic so that it can take advantage of the benefits offered by the framework and maintain appropriate patterns for that framework.
	render () {
		// The following props have special meaning to us, but we want to allow any props not listed (such as `onClick`) to be added to the `<button>`. We can do this more cleanly with [object destructuring](https://facebook.github.io/react/docs/transferring-props.html#transferring-with-...-in-jsx).
		const {assistiveText,
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
			...props} = this.props;

		// This button is a stateful button if it has any children or if we have flagged it as selectable.
		const isStateful = React.Children.count(this.props.children) || this.props.selectable;

		// If there are existing children (typically of type `ButtonView`), we need to clone them and pass them all the same `iconPosition` that is used by the button.
		const views = React.Children.map(this.props.children, (child, index) => {
			return React.cloneElement(child, { iconPosition: this.props.iconPosition, key: index });
		}) || [];

		// Whether or not there were existing children of this button, at least one `ButtonView` is always needed. If it's the only one it doesn't need a view type, but if it's one of several we'll give it the type `notSelected` to represent its role.
		const defaultView = views.length > 0 ? 'notSelected' : null;
		views.push(<ButtonView
					assistiveText={this.props.assistiveText}
					icon={this.props.icon}
					iconSize={this.props.iconSize}
					iconStyle={this.props.iconStyle}
					text={this.props.text}
					view={defaultView}
					iconPosition={this.props.iconPosition}
					key="default" />);
		
		// Time to put the button together using the props and views we configured above. `_getClassNames` can be found in the [shared core](../../core/button.html) as it is used by every facade.
		return (
			<button type="button"
				className={this._getClassNames(this.props.className, isStateful)}
				{...props}>{views}</button>
		);
	}
});

// `Helpers` are a feature of Facades that allows anyone to register code that can manipulate the control before it is encapsulated in a React class. This allows flexibility for adding custom behavior without modifying the original source, or for adding optional behavior. For example, the jQuery facade uses this mechanism to optionally create jQuery plugin versions of each control. Nothing in the control itself should ever depend on the presence of helpers, as they are completely optional.
Button = Lib.runHelpers('react', CONTROL, Button);

// Once everything has been merged together and all registered helpers have been run we can create the React class and export the result for consumption by our apps.
Button = React.createClass(Button);

export default Button;
