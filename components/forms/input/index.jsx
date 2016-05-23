/*
Copyright (c) 2015, salesforce.com, inc. All rights reserved.

Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:
Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
Neither the name of salesforce.com, inc. nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/
/* eslint-disable indent */

// # Input Component

// Implements the [Input design pattern](https://www.lightningdesignsystem.com/components/forms/#input) in React.

// ### React
// React is an external dependency of the project.
import React from 'react';

// ### classNames
// [github.com/JedWatson/classnames](https://github.com/JedWatson/classnames)
// This project uses `classnames`, "a simple javascript utility for conditionally
// joining classNames together."
import classNames from 'classnames';

// ## Children
import InputIcon from '../../icon/input-icon';
// This component's `checkProps` which issues warnings to developers about properties when in development mode (similar to React's built in development tools)
import checkProps from './check-props';

// Remove the need for `React.PropTypes`
const { PropTypes } = React;

const COMPONENT = 'Input';

// ## InputDefinition
const Input = React.createClass({
	// ### Display Name
	// Always use the canonical component name as the React display name.
	displayName: COMPONENT,
	// ### Prop Types
	propTypes: {
		/**
		 * An HTML ID that is shared with ARIA-supported devices with the 
		 * `aria-controls` attribute in order to relate the input with 
		 * another region of the page. An example would be a select box  
		 * that shows or hides a panel.
		 */
		ariaControls: PropTypes.string,
		/**
		 * An HTML ID that is shared with ARIA-supported devices with the 
		 * `aria-controls` attribute in order to relate the input with 
		 * another region of the page. An example would be a search field  
		 * that shows search results.
		 */
		ariaOwns: PropTypes.string,
		/**
		 * If present, the label associated with this `input` is overwritten 
		 * by this text and is visually not shown.
		 */
		assistiveText: PropTypes.string,
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
		errorText: PropTypes.string,
		/**
		 * Category of the icon.
		 */
		iconCategory: PropTypes.oneOf([
			'action',
			'custom',
			'doctype',
			'standard',
			'utility'
		]),
		/**
		 * Name of the icon. Visit <a href='http://www.lightningdesignsystem.com/resources/icons'>Lightning Design System Icons</a> to reference icon names.
		 */
		iconName: PropTypes.string,
		/**
		 * Determines whether the input's icon will display that icon on the left or the right.
		 */
		iconPosition: PropTypes.oneOf([
			'left',
			'right'
		]),
		/**
		 * Every input must have a unique ID in order to support keyboard navigation and ARIA support.
		 */
		id: PropTypes.string.isRequired,
		/**
		 * This label appears above the input.
		 */
		label: PropTypes.string,
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
		type: PropTypes.oneOf([
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
		value: PropTypes.string
	},

	componentWillMount () {
		// `checkProps` issues warnings to developers about properties (similar to React's built in development tools)
		checkProps(COMPONENT, this.props);
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
			ariaControls,
			ariaOwns,
			assistiveText,
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

		// One of these is required to pass accessibility tests
		const labelText = assistiveText || label;

		return (
			<div className={classNames('slds-form-element', {
				'is-required': required,
				'slds-has-error': errorText
			},
			className)}
			>
				{labelText && !readOnly && <label className={classNames('slds-form-element__label', { 'slds-assistive-text': assistiveText})} htmlFor={id}>
					{required && <abbr className="slds-required" title="required">*</abbr>}
					{labelText}
				</label>}
				{labelText && readOnly && <span className={classNames('slds-form-element__label', { 'slds-assistive-text': assistiveText})}>
					{labelText}
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
						aria-controls={ariaControls}
						aria-owns={ariaOwns}
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
});

module.exports = Input;
module.exports.COMPONENT = COMPONENT;
