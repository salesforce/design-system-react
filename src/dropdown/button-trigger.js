/*
Copyright (c) 2015, salesforce.com, inc. All rights reserved.

Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:
Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
Neither the name of salesforce.com, inc. nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

// # Dropdown Trigger Component (Simple Button Flavor) --- SLDS for React

// > See a [live example](/react/dropdown) of the Dropdown component in action

// ## API

/* @todo A default trigger is provided that creates a SLDS Button wrapped in a `div`. */

// ## Dependencies

// Bring in the [shared library functions](../../lib/lib.html).
import { merge, runHelpers } from 'slds-for-js-core/lib';

// ### React
// React is an external dependency of the project.
import React from 'react';

// #### classNames
// [github.com/JedWatson/classnames](https://github.com/JedWatson/classnames)
// Façades uses `classnames`, "a simple javascript utility for conditionally
// joining classNames together." Because of the small size of the library, the
// default build includes the entire library rather than requiring it as an
// external dependency.
import classNames from 'classnames';

// [Button](../button.html)
import Button from '../button';

// Remove the need for `React.PropTypes`
const { PropTypes } = React;

// ## DropdownObject
export const TriggerDefinition = {
	// ### Display Name
	// Always use the canonical component name (set in the core) as the React
	// display name.
	displayName: 'Trigger',

	// ### Prop Types
	propTypes: {
		/**
		 * Takes a Button component as a child.
		 */
		children: PropTypes.element,
		/**
		 * Class names added to trigger wrapping tag.
		 */
		className: PropTypes.oneOfType([PropTypes.array, PropTypes.object, PropTypes.string]),
		/**
		 * For internal component use, so that the dropdown menu can pass icons to the trigger button through the dropdown parent component.
		 */
		triggerIcon: PropTypes.string
	},

	getDefaultProps () {
		return {
			ariaHaspopup: true,
			icon: 'utility.down',
			iconPosition: 'right',
			iconStyle: 'icon-border-filled',
			buttonClassName: null
		};
	},

	_handleButtonClicked (e) {
		this.props.onClick(e);
		// TriggerClicked is present to pass on the `onClick` prop from the Dropdown parent for backwards compatibility. Future implementations should just add `onClick` to the Trigger child.
		if (this.props.triggerClicked) {
			this.props.triggerClicked();
		}
	},

	_renderDefaultButton () {
		const {
			className,
			children,
			onClick,
			onKeyDown,
			onKeyPress,
			triggerIcon,
			triggerId,

			/* Deprecated */
			buttonClassName,
			buttonVariant,
			triggerClicked,
			label,

			// ### Additional properties
			// We allow allowing additional cleanly with [object destructuring](https://facebook.github.io/react/docs/transferring-props.html#transferring-with-...-in-jsx).
			...props
		} = this.props;

		let iconStyle = this.props.iconStyle;
		let theme = this.props.buttonVariant;
		if (this.props.buttonVariant) {
			iconStyle = null;
		}

		let iconPosition = 'left';
		if (this.props.label) {
			iconPosition = 'right';
			iconStyle = null;

			if (!this.props.buttonVariant) {
				theme = 'neutral';
			}
		}

		return (
			<Button
				{...props}
				aria-haspopup = "true"
				className     = {this.props.buttonClassName}
				id            = {triggerId}
				iconStyle     = {iconStyle}
				icon          = {triggerIcon}
				onClick       = {this._handleButtonClicked}
				onKeyDown     = {onKeyDown}
				onKeyPress    = {onKeyPress}
				/* deprecated */
				theme         = {theme}
				text          = {this.props.label}
				iconPosition  = {iconPosition}
			/>
			);
	},

	_renderButton () {
		const {
			onClick,
			onKeyDown,
			onKeyPress,
			renderArrow,
			triggerIcon,
			triggerId
			// ### Additional properties
			// We allow allowing additional cleanly with [object destructuring](https://facebook.github.io/react/docs/transferring-props.html#transferring-with-...-in-jsx).
		} = this.props;

		// Trigger manipulation
		let ChildButton = null;
		if (React.Children.count(this.props.children) === 0) {
			ChildButton = this._renderDefaultButton();
		} else {
			// Button Trigger can take a Button child
			React.Children.map(this.props.children, (child) => {
				if (child.type.displayName === Button.displayName) {
					ChildButton = React.cloneElement(child, {
						'aria-haspopup': 'true',
						icon: child.props.icon || triggerIcon,
						id: triggerId,
						onClick,
						onKeyDown,
						onKeyPress
					});
				}
			});
		}

		return ChildButton;
	},

	// ### Render
	render () {
		return (
			<div
				aria-expanded = {this.props.ariaExpanded}
				className     = {classNames(this.props.triggerClassName, this.props.className)}
				id            = {this.props.id}
				onKeyDown     = {this.props.onKeyDown}
				onKeyPress    = {this.props.onKeyPress}
			>
				{this._renderButton()}
				{this.props.menu}
			</div>
		);
	}
};

// Once everything has been merged together and all registered helpers have
// been run we can create the React class and export the result for
// consumption by our apps.
const Trigger = React.createClass(TriggerDefinition);

export default Trigger;
