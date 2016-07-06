/*
Copyright (c) 2015, salesforce.com, inc. All rights reserved.

Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:
Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
Neither the name of salesforce.com, inc. nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

// # Dropdown Trigger Component (Simple Button Flavor) --- SLDS for React

// ### React
// React is an external dependency of the project.
import React, { PropTypes } from 'react';

// ### classNames
// [github.com/JedWatson/classnames](https://github.com/JedWatson/classnames)
// This project uses `classnames`, "a simple javascript utility for conditionally
// joining classNames together."
import classNames from 'classnames';

// [Button](../button.html)
import Button from '../button';

// ## DropdownObject
const Trigger = React.createClass({
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
		id: PropTypes.string
	},

	getDefaultProps () {
		return {
			ariaHaspopup: true,
			iconCategory: 'utility',
			iconName: 'down',
			iconPosition: 'right',
			iconStyle: 'icon-border-filled',
			buttonClassName: null
		};
	},

	renderDefaultButton (customProps = {}) {
		return (
			<Button
				aria-haspopup="true"
				assistiveText={this.props.assistiveText}
				className={this.props.className}
				disabled={this.props.disabled}
				hint={this.props.hint}
				iconName={this.props.iconName}
				iconVariant={this.props.iconVariant}
				id={this.props.id}
				label={this.props.label}
				onBlur={this.props.onBlur}
				onClick={this.props.onClick}
				onFocus={this.props.onFocus}
				onKeyDown={this.props.onKeyDown}
				onMouseDown={this.props.onMouseDown}
				onMouseEnter={this.props.onMouseEnter}
				onMouseLeave={this.props.onMouseLeave}
				ref="button"
				style={this.props.style}
				tabIndex={this.props.tabIndex}
				variant={this.props.variant}
				tooltip={this.props.tooltip}
				{...customProps}
			>
				{this.props.menu}
			</Button>
			);
	},

	renderButton () {
		// Trigger manipulation
		let ChildButton = null;
		if (React.Children.count(this.props.children) === 0) {
			ChildButton = this.renderDefaultButton();
		} else {
			// Button Trigger can take a Button child
			React.Children.forEach(this.props.children, (child) => {
				if (child && child.type.displayName === Button.displayName) {
					ChildButton = this.renderDefaultButton(child.props);
				}
			});
		}

		return ChildButton;
	},

	// ### Render
	render () {
		return this.renderButton();
	}
});

module.exports = Trigger;
