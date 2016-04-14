/*
Copyright (c) 2015, salesforce.com, inc. All rights reserved.

Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:
Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
Neither the name of salesforce.com, inc. nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

// # Input Component --- SLDS for React

// Implements the [Input design pattern](https://www.lightningdesignsystem.com/components/forms/#input) in React.

// [![Input component example screenshot](/assets/demo-site/images/component-examples/input.png "Input component example screenshot")](/react/input)

// > See a [live example](/react/input) of the Input component in action

// ### React
// React is an external dependency of the project.
import React from 'react';

// ### classNames
// [github.com/JedWatson/classnames](https://github.com/JedWatson/classnames)
// Façades uses `classnames`, "a simple javascript utility for conditionally
// joining classNames together." Because of the small size of the library, the
// default build includes the entire library rather than requiring it as an
// external dependency.
import classNames from 'classnames';

import InputIcon from '../icon/input-icon';

// Remove the need for `React.PropTypes`
const { PropTypes } = React;

export const COMPONENT = 'Input';

// ## InputDefinition
export const InputDefinition = {
	// ### Display Name
	// Always use the canonical component name as the React display name.
	displayName: COMPONENT,

	// ### Prop Types
	propTypes: {
		/**
		 * Class names to be added to the outer container of the input.
		 */
		className: PropTypes.oneOfType([
			PropTypes.array,
			PropTypes.object,
			PropTypes.string
		]),
		/**
		 * Disables the input and prevents editing the contents.
		 */
		disabled: PropTypes.bool,
		/**
		 * Message to display when the input is in an error state. When this is present, also visually highlights the component as in error.
		 */
		errorText: React.PropTypes.string,
		/**
		 * Category of the icon.
		 */
		iconCategory: React.PropTypes.oneOf([
			'action',
			'custom',
			'doctype',
			'standard',
			'utility'
		]),
		/**
		 * Name of the icon. Visit <a href='http://www.lightningdesignsystem.com/resources/icons'>Lightning Design System Icons</a> to reference icon names.
		 */
		iconName: React.PropTypes.string,
		/**
		 * Determines whether the input's icon will display that icon on the left or the right.
		 */
		iconPosition: React.PropTypes.oneOf([
			'left',
			'right'
		]),
		/**
		 * Every input must have a unique ID in order to support keyboard navigation and ARIA support.
		 */
		id: PropTypes.string.isRequired,
		/**
		 * An optional label appearing above the input.
		 */
		label: React.PropTypes.string,
		/**
		 * This event fires when the input changes.
		 */
		onChange: PropTypes.func,
		/**
		 * This event fires when the icon is clicked.
		 */
		onIconClick: PropTypes.func,
		/**
		 * Text that will appear in an empty input.
		 */
		placeholder: PropTypes.string,
		/**
		 * Displays the value of the input statically.
		 */
		readOnly: PropTypes.bool,
		/**
		 * Highlights the input as a required field (does not perform any validation).
		 */
		required: PropTypes.bool,
		/**
		 * The `<Input>` element includes support for all HTML5 types.
		 */
		type: React.PropTypes.oneOf([
			'text',
			'password',
			'datetime',
			'datetime-local',
			'date',
			'month',
			'time',
			'week',
			'number',
			'email',
			'url',
			'search',
			'tel',
			'color'
		]),
		/**
		 * The input is a controlled component, and will always display this value.
		 */
		value: React.PropTypes.string
	},

	getDefaultProps () {
		return {
			iconPosition: 'left',
			type: 'text'
		};
	},

	// ### Render
	render () {
		const {
			className,
			disabled,
			errorText,
			iconCategory,
			iconName,
			iconPosition,
			id,
			label,
			onChange,
			onIconClick,
			placeholder,
			readOnly,
			required,
			type,
			value,

			// ### Additional properties
			// Using [object destructuring](https://facebook.github.io/react/docs/transferring-props.html#transferring-with-...-in-jsx) to pass on any properties which are not explicitly defined.
			...props
		} = this.props;

		const hasIcon = iconCategory && iconName;

		return (
			<div className={classNames('slds-form-element', {
				'is-required': required,
				'slds-has-error': errorText
			},
			className)}
			>
				{label && !readOnly && <label className="slds-form-element__label" htmlFor={id}>
					{required && <abbr className="slds-required" title="required">*</abbr>}
					{label}
				</label>}
				{label && readOnly && <span className="slds-form-element__label">
					{label}
				</span>}
				<div className={classNames('slds-form-element__control', hasIcon && [
					'slds-input-has-icon',
					`slds-input-has-icon--${iconPosition}`
				], {
					'slds-has-divider--bottom': readOnly
				})}
				>
					{hasIcon && <InputIcon
						name={iconName}
						category={iconCategory}
						onClick={onIconClick}
					/>}
					{!readOnly && <input
						{...props}
						className="slds-input"
						disabled={disabled}
						id={id}
						onChange={onChange}
						placeholder={placeholder}
						required={required}
						type={type}
						value={value}
					/>}
					{readOnly && <span className="slds-form-element__static">
						{value}
					</span>}
				</div>
				{errorText && <div className="slds-form-element__help">{errorText}</div>}
			</div>
		);
	}
};

const Input = React.createClass(InputDefinition);

export default Input;
