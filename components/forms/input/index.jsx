/*
Copyright (c) 2015, salesforce.com, inc. All rights reserved.

Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:
Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
Neither the name of salesforce.com, inc. nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

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

// ### shortid
// [npmjs.com/package/shortid](https://www.npmjs.com/package/shortid)
// shortid is a short, non-sequential, url-friendly, unique id generator
import shortid from 'shortid';

// ## Children
import InputIcon from '../../icon/input-icon';
// This component's `checkProps` which issues warnings to developers about properties when in development mode (similar to React's built in development tools)
import checkProps from './check-props';

// ### isFunction
import isFunction from 'lodash.isfunction';

import Button from '../../button';

// Remove the need for `React.PropTypes`
const { PropTypes } = React;

import { FORMS_INPUT } from '../../../utilities/constants';

// ## InputDefinition
const Input = React.createClass({
	// ### Display Name
	// Always use the canonical component name as the React display name.
	displayName: FORMS_INPUT,
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
		 * Set the assistive text for a clickable icon
		 */
		iconAssistiveText: PropTypes.string,
		/**
		 * Every input must have a unique ID in order to support keyboard navigation and ARIA support.
		 */
		id: PropTypes.string,
		/**
		 * This label appears above the input.
		 */
		label: PropTypes.string,
		/**
		 * This event fires when the input changes.
		 */
		onChange: PropTypes.func,
		/**
		 * This event fires when the input is clicked.
		 */
		onClick: PropTypes.func,
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

	getDefaultProps () {
		return {
			iconPosition: 'left',
			type: 'text'
		};
	},

	componentWillMount () {
		// `checkProps` issues warnings to developers about properties (similar to React's built in development tools)
		checkProps(FORMS_INPUT, this.props);

		this.generatedId = shortid.generate();
	},

	getId () {
		return this.props.id || this.generatedId;
	},

	getIconRender (position) {
		if (position !== this.props.iconPosition) return '';

		return isFunction(this.props.onIconClick)
		? (<Button
			iconVariant="small"
			variant="icon"
			className="slds-input__icon slds-button--icon"
			assistiveText={this.props.iconAssistiveText}
			iconName={this.props.iconName}
			iconCategory={this.props.iconCategory}
			onClick={this.props.onIconClick}
		/>)
		: (<InputIcon
			name={this.props.iconName}
			category={this.props.iconCategory}
		/>);
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
			inlineEditTrigger, // eslint-disable-line react/prop-types
			label,
			onChange,
			onClick,
			onIconClick, // eslint-disable-line no-unused-vars
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
		const labelText = label || assistiveText;

		return (
			<div
				className={classNames('slds-form-element', {
					'is-required': required,
					'slds-has-error': errorText
				},
				className)}
			>
				{labelText && (readOnly
					? <span
						className={classNames('slds-form-element__label', { 'slds-assistive-text': assistiveText && !label })}
					>
						{labelText}
					</span>
					: <label
						className={classNames('slds-form-element__label', { 'slds-assistive-text': assistiveText && !label })}
						htmlFor={this.getId()}
					>
						{required && <abbr className="slds-required" title="required">*</abbr>}
						{labelText}
					</label>
				)}
				<div
					className={classNames('slds-form-element__control', hasIcon && [
						'slds-input-has-icon',
						`slds-input-has-icon--${iconPosition}`
					], {
						'slds-has-divider--bottom': readOnly && !inlineEditTrigger
					})}
				>
					{hasIcon && this.getIconRender('left')}

					{!readOnly && <input
						{...props}
						aria-controls={ariaControls}
						aria-owns={ariaOwns}
						className="slds-input"
						disabled={disabled}
						id={this.getId()}
						onChange={onChange}
						onClick={onClick}
						placeholder={placeholder}
						required={required}
						type={type}
						value={value}
					/>}
					{hasIcon && this.getIconRender('right')}

					{readOnly && <span className="slds-form-element__static" onClick={onClick}>
						{value}
						{inlineEditTrigger}
					</span>}
				</div>
				{errorText && <div className="slds-form-element__help">{errorText}</div>}
			</div>
		);
	}
});

module.exports = Input;
