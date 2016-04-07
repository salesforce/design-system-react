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
		triggerIcon: PropTypes.string,
		/**
		 * For internal component use, so that the dropdown menu can pass icons to the trigger button through the dropdown parent component.
		 */
		triggerIconCategory: PropTypes.string,
		/**
		 * For internal component use, so that the dropdown menu can pass icons to the trigger button through the dropdown parent component.
		 */
		triggerIconName: PropTypes.string
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
		/* eslint-disable no-unused-vars */
		const {
			/* Used by Dropdown */
			className,

			/* Used internally, but not passed on directly */
			ariaExpanded,
			children,
			onClick,

			/* Explicitly used and/or renamed */
			onKeyDown,
			onKeyPress,
			triggerIcon,
			triggerIconCategory,
			triggerIconName,
			triggerId,

			/* Deprecated */
			buttonClassName,
			buttonVariant,
			triggerClicked,
			label,

			// ### Additional properties
			// Using [object destructuring](https://facebook.github.io/react/docs/transferring-props.html#transferring-with-...-in-jsx) to pass on any properties which are not explicitly defined.
			...props
		} = this.props;
		/* eslint-enable no-unused-vars */

		let iconStyle = this.props.iconStyle;
		let theme = buttonVariant;
		if (buttonVariant) {
			iconStyle = null;
		}

		let iconPosition = 'left';
		if (label) {
			iconPosition = 'right';
			iconStyle = null;

			if (!buttonVariant) {
				theme = 'neutral';
			}
		}

		return (
			<Button
				{...props}
				aria-haspopup = "true"
				className = {buttonClassName}
				id = {triggerId}
				iconStyle = {iconStyle}
				iconCategory = {triggerIconCategory}
				iconName = {triggerIconName}
				onClick = {this._handleButtonClicked}
				/* Deprecated */
				icon = {triggerIcon}
				theme = {theme}
				text = {label}
				iconPosition = {iconPosition}
			/>
			);
	},

	_renderButton () {
		const {
			children,
			onClick,
			triggerIcon,
			triggerIconCategory,
			triggerIconName,
			triggerId
		} = this.props;

		// Trigger manipulation
		let ChildButton = null;
		if (React.Children.count(children) === 0) {
			ChildButton = this._renderDefaultButton();
		} else {
			// Button Trigger can take a Button child
			React.Children.map(children, (child) => {
				if (child.type.displayName === Button.displayName) {
					ChildButton = React.cloneElement(child, {
						'aria-haspopup': 'true',
						icon: child.props.icon || triggerIcon,
						iconCategory: child.props.iconCategory || triggerIconCategory,
						iconName: child.props.iconName || triggerIconName,
						id: triggerId,
						onClick
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
				className = {classNames(this.props.triggerClassName, this.props.className)}
				id = {this.props.id}
				onKeyDown = {this.props.onKeyDown}
				onKeyPress = {this.props.onKeyPress}
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
