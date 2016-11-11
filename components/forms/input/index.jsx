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
		ariaActivedescendant: PropTypes.string,
		ariaAutocomplete: PropTypes.string,
		/**
		 * An HTML ID that is shared with ARIA-supported devices with the
		 * `aria-controls` attribute in order to relate the input with
		 * another region of the page. An example would be a select box
		 * that shows or hides a panel.
		 */
		ariaControls: PropTypes.string,
		ariaDescribedby: PropTypes.string,
		ariaExpanded: PropTypes.bool,
		ariaLabeledby: PropTypes.string,
		/**
		 * An HTML ID that is shared with ARIA-supported devices with the
		 * `aria-controls` attribute in order to relate the input with
		 * another region of the page. An example would be a search field
		 * that shows search results.
		 */
		ariaOwns: PropTypes.string,
		ariaRequired: PropTypes.bool,
		/**
		 * If present, the label associated with this `input` is overwritten
		 * by this text and is visually not shown.
		 */
		assistiveText: PropTypes.string,
		children: PropTypes.node,
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
		 * Left aligned icon, must be instace of `design-system-react/components/icon/input-icon`
		 */
		iconLeft: PropTypes.node,
		/**
		 * Right aligned icon, must be instace of `design-system-react/components/icon/input-icon`
		 */
		iconRight: PropTypes.node,
		/**
		 * Every input must have a unique ID in order to support keyboard navigation and ARIA support.
		 */
		id: PropTypes.string,
		/**
		 * This label appears above the input.
		 */
		label: PropTypes.string,
		onBlur: PropTypes.func,
		/**
		 * This callback fires when the input changes. The synthetic React event will be the first parameter to the callback. You will probably want to reference `event.target.value` in your callback. No custom data object is provided.
		 */
		onChange: PropTypes.func,
		/**
		 * This event fires when the input is clicked.
		 */
		onClick: PropTypes.func,
		onFocus: PropTypes.func,
		onInput: PropTypes.func,
		onInvalid: PropTypes.func,
		onKeyDown: PropTypes.func,
		onKeyPress: PropTypes.func,
		onKeyUp: PropTypes.func,
		onSelect: PropTypes.func,
		onSubmit: PropTypes.func,
		/**
		 * Text that will appear in an empty input.
		 */
		placeholder: PropTypes.string,
		minLength: PropTypes.string,
		maxLength: PropTypes.string,
		/**
		 * Name of the submitted form parameter.
		 */
		name: PropTypes.string,
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

	// This is convuluted to maintain backwards compatibility. Please remove deprecatedProps on next breaking change.
	getIconRender (position, iconPositionProp) {
		let icon;

		/* eslint-disable react/prop-types */
		const deprecatedProps = {
			assistiveText: this.props[iconPositionProp] && this.props[iconPositionProp].props.assistiveText
				|| this.props.iconAssistiveText,
			category: this.props[iconPositionProp] && this.props[iconPositionProp].props.category || this.props.iconCategory,
			name: this.props[iconPositionProp] && this.props[iconPositionProp].props.name || this.props.iconName,
			onClick: this.props[iconPositionProp] && this.props[iconPositionProp].props.onClick || this.props.onIconClick
		};
		/* eslint-enable react/prop-types */

		if (this.props[iconPositionProp] && position && this.props[iconPositionProp]) {
			icon = React.cloneElement(this.props[iconPositionProp], {
				iconPosition: `${position}`
			});
		} else if (deprecatedProps.name) {
			icon = <InputIcon iconPosition={position} {...deprecatedProps} />;
		}

		return icon;
	},

	// ### Render
	render () {
		const {
			ariaActivedescendant,
			ariaAutocomplete,
			ariaControls,
			ariaDescribedby,
			ariaExpanded,
			ariaOwns,
			ariaRequired,
			assistiveText,
			children,
			className,
			disabled,
			errorText,
			iconLeft,
			iconRight,
			inlineEditTrigger, // eslint-disable-line react/prop-types
			inputRef, // eslint-disable-line react/prop-types
			label,
			onBlur,
			onChange,
			onClick,
			onFocus,
			onInput,
			onInvalid,
			onKeyDown,
			onKeyPress,
			onKeyUp,
			onSelect,
			onSubmit,
			minLength,
			maxLength,
			name,
			placeholder,
			readOnly,
			required,
			role,
			type,
			value,

			// ### Additional properties
			// Using [object destructuring](https://facebook.github.io/react/docs/transferring-props.html#transferring-with-...-in-jsx) to pass on any properties which are not explicitly defined.
			...props
		} = this.props;

		const labelText = label || assistiveText; // One of these is required to pass accessibility tests

		// this is a hack to make left the default prop unless overwritten by `iconPosition="right"`
		const hasLeftIcon = !!iconLeft || (this.props.iconPosition === 'left' || this.props.iconPosition === undefined) && !!this.props.iconName;
		const hasRightIcon = !!iconRight || this.props.iconPosition === 'right' && !!this.props.iconName;

		return (
			<div
				className={classNames('slds-form-element', {
					'is-required': required,
					'slds-has-error': errorText
				},
				className)}
			>
				{labelText && (readOnly
					? <span className={classNames('slds-form-element__label', { 'slds-assistive-text': assistiveText && !label })}>
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
					className={classNames('slds-form-element__control', {
						'slds-input-has-icon': hasLeftIcon || hasRightIcon,
						'slds-input-has-icon--left': hasLeftIcon && !hasRightIcon,
						'slds-input-has-icon--right': !hasLeftIcon && hasRightIcon,
						'slds-input-has-icon--left-right': hasLeftIcon && hasRightIcon,
						'slds-has-divider--bottom': readOnly && !inlineEditTrigger
					})}
				>
					{hasLeftIcon ? this.getIconRender('left', 'iconLeft') : null}

					{!readOnly && <input
						aria-activedescendant={ariaActivedescendant}
						aria-autocomplete={ariaAutocomplete}
						aria-controls={ariaControls}
						aria-describedby={ariaDescribedby}
						aria-expanded={ariaExpanded}
						aria-owns={ariaOwns}
						aria-required={ariaRequired}
						className="slds-input"
						disabled={disabled}
						id={this.getId()}
						minLength={minLength}
						maxLength={maxLength}
						name={name}
						onBlur={onBlur}
						onChange={onChange}
						onClick={onClick}
						onFocus={onFocus}
						onInput={onInput}
						onInvalid={onInvalid}
						onKeyDown={onKeyDown}
						onKeyPress={onKeyPress}
						onKeyUp={onKeyUp}
						onSelect={onSelect}
						onSubmit={onSubmit}
						placeholder={placeholder}
						ref={inputRef}
						role={role}
						required={required}
						type={type}
						value={value}
					/>}

					{hasRightIcon ? this.getIconRender('right', 'iconRight') : null}

					{readOnly && <span className="slds-form-element__static" onClick={onClick}>
						{value}
						{inlineEditTrigger}
					</span>}
				</div>
				{errorText && <div className="slds-form-element__help">{errorText}</div>}
				{children}
			</div>
		);
	}
});

module.exports = Input;
