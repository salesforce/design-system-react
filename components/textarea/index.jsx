/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

/* eslint-disable jsx-a11y/no-autofocus */

// # Textarea Component

// Implements the [Textarea design pattern](https://lightningdesignsystem.com/components/textarea).
// Based on SLDS v2.4.0
//

// ### React
import React from 'react';

import PropTypes from 'prop-types';

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
// This component's `checkProps` which issues warnings to developers about properties when in development mode (similar to React's built in development tools)
import checkProps from './check-props';

import { TEXTAREA } from '../../utilities/constants';

import componentDoc from './docs.json';
import getAriaProps from '../../utilities/get-aria-props';

/**
 * A multi-line plain-text editing control. Although not listed in the prop table, all `aria-*` props will be added to the `textarea` element if passed in.
 */
class Textarea extends React.Component {
	static displayName = TEXTAREA;

	static propTypes = {
		autoFocus: PropTypes.bool,
		/**
		 * **Assistive text for accessibility.**
		 * * `label`: If present, the label associated with this `textarea` is overwritten by this text and is visually not shown.
		 */
		assistiveText: PropTypes.shape({
			label: PropTypes.string,
		}),
		/**
		 * Elements are added after the `textarea`.
		 */
		children: PropTypes.node,
		/**
		 * Class names to be added to the textarea component.
		 */
		className: PropTypes.oneOfType([
			PropTypes.array,
			PropTypes.object,
			PropTypes.string,
		]),
		/** Allows for ability to apply classNames to outer textarea div.
		 */
		classNameContainer: PropTypes.oneOfType([
			PropTypes.array,
			PropTypes.object,
			PropTypes.string,
		]),
		/**
		 * Disables the textarea and prevents editing the contents.
		 */
		disabled: PropTypes.bool,
		/**
		 * Message to display when the textarea is in an error state. When this is present, also visually highlights the component as in error.
		 */
		errorText: PropTypes.string,
		/**
		 * Every textarea must have a unique ID in order to support keyboard navigation and ARIA support.
		 */
		id: PropTypes.string,
		/**
		 * This callback exposes the textarea reference / DOM node to parent components. `<Parent textareaRef={(textareaComponent) => this.textarea = textareaComponent} />
		 */
		textareaRef: PropTypes.func,
		/**
		 * This label appears above the textarea.
		 */
		label: PropTypes.string,
		/**
		 * Triggered when focus is removed.
		 */
		onBlur: PropTypes.func,
		/**
		 * This callback fires when the textarea changes. The synthetic React event will be the first parameter to the callback. You will probably want to reference `event.target.value` in your callback. No custom data object is provided.
		 */
		onChange: PropTypes.func,
		/**
		 * This event fires when the textarea is clicked.
		 */
		onClick: PropTypes.func,
		/**
		 * Triggered when component is focused.
		 */
		onFocus: PropTypes.func,
		/**
		 * Similar to `onchange`. Triggered when an element gets user input.
		 */
		onInput: PropTypes.func,
		/**
		 * Triggered when a submittable <input> element is invalid.
		 */
		onInvalid: PropTypes.func,
		/**
		 * Triggered when a key is pressed down
		 */
		onKeyDown: PropTypes.func,
		/**
		 * Triggered when a key is pressed and released
		 */
		onKeyPress: PropTypes.func,
		/**
		 * Triggered when a key is released
		 */
		onKeyUp: PropTypes.func,
		/**
		 * Triggered after some text has been selected in an element.
		 */
		onSelect: PropTypes.func,
		/**
		 * Fires when a form is submitted.
		 */
		onSubmit: PropTypes.func,
		/**
		 * Maximum number of characters allowed.
		 */
		maxLength: PropTypes.string,
		/**
		 * Name of the submitted form parameter.
		 */
		name: PropTypes.string,
		/**
		 * Text that will appear in an empty textarea.
		 */
		placeholder: PropTypes.string,
		/**
		 * Highlights the textarea as a required field (does not perform any validation).
		 */
		required: PropTypes.bool,
		/**
		 * The textarea is a controlled component, and will always display this value.
		 */
		value: PropTypes.string,
		/**
		 * The textarea is a uncontrolled component, and this will be the initial value.
		 */
		defaultValue: PropTypes.string,
		/**
		 * Specifies how the text in a text area is to be wrapped when submitted in a form.
		 */
		wrap: PropTypes.oneOf(['soft', 'hard']),
	};

	componentWillMount() {
		// `checkProps` issues warnings to developers about properties (similar to React's built in development tools)
		checkProps(TEXTAREA, this.props, componentDoc);

		this.generatedId = shortid.generate();
		if (this.props.errorText) {
			this.generatedErrorId = shortid.generate();
		}
	}

	getId = () => this.props.id || this.generatedId;

	getErrorId = () => this.props['aria-describedby'] || this.generatedErrorId;

	// ### Render
	render() {
		const {
			autoFocus,
			children,
			className,
			classNameContainer,
			disabled,
			errorText,
			textareaRef, // eslint-disable-line react/prop-types
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
			maxLength,
			name,
			placeholder,
			required,
			role,
			value,
			defaultValue,
			wrap,

			// ### Additional properties
			// Using [object destructuring](https://facebook.github.io/react/docs/transferring-props.html#transferring-with-...-in-jsx) to pass on any properties which are not explicitly defined.
			// ...props // Uncomment this if you actually need to send the rest of the props to other elements
		} = this.props;

		const assistiveText =
			typeof this.props.assistiveText === 'string'
				? this.props.assistiveText
				: {
						...this.props.assistiveText,
					}.label;

		const labelText = label || assistiveText; // One of these is required to pass accessibility tests
		const ariaProps = getAriaProps(this.props);
		return (
			<div
				className={classNames(
					'slds-form-element',
					{
						'slds-has-error': errorText,
					},
					classNameContainer
				)}
			>
				{labelText && (
					<label
						className={classNames('slds-form-element__label', {
							'slds-assistive-text': assistiveText && !label,
						})}
						htmlFor={this.getId()}
					>
						{required && (
							<abbr className="slds-required" title="required">
								*
							</abbr>
						)}
						{labelText}
					</label>
				)}
				<div className={classNames('slds-form-element__control')}>
					<textarea
						aria-describedby={this.getErrorId()}
						{...ariaProps}
						className={classNames('slds-textarea', className)}
						autoFocus={autoFocus}
						disabled={disabled}
						id={this.getId()}
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
						ref={textareaRef}
						role={role}
						required={required}
						wrap={wrap}
						value={value}
						defaultValue={defaultValue}
					/>
				</div>
				{errorText && (
					<div id={this.getErrorId()} className="slds-form-element__help">
						{errorText}
					</div>
				)}
				{children}
			</div>
		);
	}
}

export default Textarea;
