/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

// ### React
import React from 'react';
import PropTypes from 'prop-types';

import classNames from 'classnames';

const propTypes = {
	'aria-activedescendant': PropTypes.string,
	'aria-autocomplete': PropTypes.string,
	/**
	 * An HTML ID that is shared with ARIA-supported devices with the
	 * `aria-controls` attribute in order to relate the input with
	 * another region of the page. An example would be a select box
	 * that shows or hides a panel.
	 */
	'aria-controls': PropTypes.string,
	'aria-describedby': PropTypes.string,
	'aria-expanded': PropTypes.bool,
	'aria-haspopup': PropTypes.bool,
	'aria-labelledby': PropTypes.string,
	/**
	 * An HTML ID that is shared with ARIA-supported devices with the
	 * `aria-controls` attribute in order to relate the input with
	 * another region of the page. An example would be a search field
	 * that shows search results.
	 */
	'aria-owns': PropTypes.string,
	'aria-required': PropTypes.bool,
	/**
	 * Class names to be added to the `input` element.
	 */
	className: PropTypes.oneOfType([
		PropTypes.array,
		PropTypes.object,
		PropTypes.string
	]),
	/**
	 * Class names to be added to the outer container of the input.
	 */
	containerClassName: PropTypes.oneOfType([
		PropTypes.array,
		PropTypes.object,
		PropTypes.string
	]),
	/**
	 * Disables the input and prevents editing the contents.
	 */
	disabled: PropTypes.bool,
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
	id: PropTypes.string.isRequired,
	/**
	 * This callback exposes the input reference / DOM node to parent components. `<Parent inputRef={(inputComponent) => this.input = inputComponent} />
	 */
	inputRef: PropTypes.func,
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
	 * Specifies `readOnly` for `input` node. For the read-only input UX pattern, see `variant` prop.
	 */
	readOnly: PropTypes.bool,
	/**
	 * Highlights the input as a required field (does not perform any validation).
	 */
	required: PropTypes.bool,
	/**
	 * `role` to be added to `input` node
	 */
	role: PropTypes.string,
	/**
	 * Style object to be added to `input` node
	 */
	style: PropTypes.object,
	/**
	 * Specifies `tabIndex` for `input` node
	 */
	tabIndex: PropTypes.string,
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
	value: PropTypes.string,
	/**
	 * UX pattern variants. `inputReadOnly` is for the read-only input UX pattern.
	 */
	variant: PropTypes.oneOf(['base', 'inputReadOnly'])
};

const defaultProps = {
	type: 'text',
	variant: 'base'
};

/*
 * This component was created to allow the DIV wrapped input to be used within other components such as combobox. This components API is not public.
 */
const InnerInput = (props) => (
	<div
		className={classNames(props.containerClassName, {
			'slds-input-has-icon': props.iconLeft || props.iconRight,
			'slds-input-has-icon--left': props.iconLeft && !props.iconRight,
			'slds-input-has-icon--right': !props.iconLeft && props.iconRight,
			'slds-input-has-icon--left-right': props.iconLeft && props.iconRight,
			'slds-has-divider--bottom': props.variant === 'inputReadOnly' && !props.inlineEditTrigger
		})}
	>
		{props.iconLeft ? props.iconLeft : null}

		{props.variant !== 'inputReadOnly' && <input
			aria-activedescendant={props['aria-activedescendant']}
			aria-autocomplete={props['aria-autocomplete']}
			aria-controls={props['aria-controls']}
			aria-labelledby={props['aria-labelledby']}
			aria-describedby={props['aria-describedby']}
			aria-expanded={props['aria-expanded']}
			aria-owns={props['aria-owns']}
			aria-required={props['aria-required']}
			className={classNames('slds-input', props.className)}
			disabled={props.disabled}
			id={props.id}
			minLength={props.minLength}
			maxLength={props.maxLength}
			name={props.name}
			onBlur={props.onBlur}
			onChange={props.onChange}
			onClick={props.onClick}
			onFocus={props.onFocus}
			onInput={props.onInput}
			onInvalid={props.onInvalid}
			onKeyDown={props.onKeyDown}
			onKeyPress={props.onKeyPress}
			onKeyUp={props.onKeyUp}
			onSelect={props.onSelect}
			onSubmit={props.onSubmit}
			placeholder={props.placeholder}
			ref={props.inputRef}
			role={props.role}
			required={props.required}
			style={props.style}
			tabIndex={props.tabIndex}
			type={props.type}
			value={props.value}
		/>}

		{props.iconRight ? props.iconRight : null}

		{/* eslint-disable jsx-a11y/no-static-element-interactions */}
		{props.variant === 'inputReadOnly' && <span className="slds-form-element__static" onClick={props.onClick}>
			{props.value}
			{props.inlineEditTrigger}
		</span>}
		{/* eslint-enable jsx-a11y/no-static-element-interactions */}

	</div>
);

InnerInput.displayName = 'SLDSInnerInput';
InnerInput.propTypes = propTypes;
InnerInput.defaultProps = defaultProps;

export default InnerInput;
