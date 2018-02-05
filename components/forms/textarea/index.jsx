/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

/* eslint-disable jsx-a11y/no-autofocus */

// # Textarea Component

// Implements the [Textarea design pattern](https://lightningdesignsystem.com/components/textarea).
// Based on SLDS v2.4.0
//

// ### React
import React from 'react';
import createReactClass from 'create-react-class';
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

import { FORMS_TEXTAREA } from '../../../utilities/constants';

// ## TextareaDefinition
const Textarea = createReactClass({
	// ### Display Name
	// Always use the canonical component name as the React display name.
	displayName: FORMS_TEXTAREA,
	// ### Prop Types
	propTypes: {
		'aria-activedescendant': PropTypes.string,
		/**
		 * An HTML ID that is shared with ARIA-supported devices with the
		 * `aria-controls` attribute in order to relate the textarea with
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
		 * `aria-controls` attribute in order to relate the textarea with
		 * another region of the page. An example would be a search field
		 * that shows search results.
		 */
		'aria-owns': PropTypes.string,
		'aria-required': PropTypes.bool,
		/**
		 * Specifies is the textarea should automatically get focus when the page loads.
		 */
		autoFocus: PropTypes.bool,
		/**
		 * If present, the label associated with this `textarea` is overwritten
		 * by this text and is visually not shown.
		 */
		assistiveText: PropTypes.string,
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
		onBlur: PropTypes.func,
		/**
		 * This callback fires when the textarea changes. The synthetic React event will be the first parameter to the callback. You will probably want to reference `event.target.value` in your callback. No custom data object is provided.
		 */
		onChange: PropTypes.func,
		/**
		 * This event fires when the textarea is clicked.
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
		 * Disables the textarea and prevents editing the contents.
		 */
		disabled: PropTypes.bool,
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
		 * Specifies how the text in a text area is to be wrapped when submitted in a form.
		 */
		wrap: PropTypes.oneOf(['soft', 'hard']),
	},

	componentWillMount () {
		// `checkProps` issues warnings to developers about properties (similar to React's built in development tools)
		checkProps(FORMS_TEXTAREA, this.props);

		this.generatedId = shortid.generate();
		if (this.props.errorText) {
			this.generatedErrorId = shortid.generate();
		}
	},

	getId () {
		return this.props.id || this.generatedId;
	},

	getErrorId () {
		return this.props['aria-describedby'] || this.generatedErrorId;
	},

	// ### Render
	render () {
		const {
			autoFocus,
			assistiveText,
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
			wrap,

			// ### Additional properties
			// Using [object destructuring](https://facebook.github.io/react/docs/transferring-props.html#transferring-with-...-in-jsx) to pass on any properties which are not explicitly defined.
			// ...props // Uncomment this if you actually need to send the rest of the props to other elements
		} = this.props;

		const labelText = label || assistiveText; // One of these is required to pass accessibility tests

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
						aria-activedescendant={this.props['aria-activedescendant']}
						aria-controls={this.props['aria-controls']}
						aria-labelledby={this.props['aria-labelledby']}
						aria-describedby={this.getErrorId()}
						aria-expanded={this.props['aria-expanded']}
						aria-owns={this.props['aria-owns']}
						aria-required={this.props['aria-required']}
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
	},
});

export default Textarea;
