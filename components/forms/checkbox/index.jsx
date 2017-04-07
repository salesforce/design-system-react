/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

// # Checkbox Component

// Implements the [Checkbox design pattern](https://www.lightningdesignsystem.com/components/forms/#checkbox) in React.

// ### React
import React from 'react';

// ### isFunction
import isFunction from 'lodash.isfunction';

// ### shortid
// [npmjs.com/package/shortid](https://www.npmjs.com/package/shortid)
// shortid is a short, non-sequential, url-friendly, unique id generator
import shortid from 'shortid';

// ### Event Helpers
import KEYS from '../../../utilities/key-code';
import EventUtil from '../../../utilities/event';

// ### classNames
import classNames from 'classnames';

// This component's `checkProps` which issues warnings to developers about properties when in development mode (similar to React's built in development tools)
import checkProps from './check-props';


// Remove the need for `React.PropTypes`
const { PropTypes } = React;

import { FORMS_CHECKBOX } from '../../../utilities/constants';

/**
 * The ability to style checkboxes with CSS varies across browsers. Using this component ensures checkboxes look the same everywhere.
 */
const Checkbox = React.createClass({
	// ### Display Name
	// Always use the canonical component name as the React display name.
	displayName: FORMS_CHECKBOX,

	// ### Prop Types
	propTypes: {
		'aria-controls': PropTypes.string,
		'aria-describedby': PropTypes.string,
		'aria-owns': PropTypes.string,
		'aria-required': PropTypes.bool,
		/**
		 * Text that is visually hidden but read aloud by screenreaders to tell the user what the Checkbox is for.
		 * If the Checkbox has a visible label, you can omit the <code>assistiveText</code> prop and use the <code>label</code> prop.
		 */
		assistiveText: PropTypes.string,
		/**
		 * The Checkbox is a controlled component, and will always be in this state. If checked is not defined, the state of the uncontrolled native `input` component will be used.
		 */
		checked: PropTypes.bool,
		/**
		 * Class names to be added to the outer container of the Checkbox.
		 */
		className: PropTypes.oneOfType([
			PropTypes.array,
			PropTypes.object,
			PropTypes.string
		]),
		/**
		 * Disables the Checkbox and prevents clicking it.
		 */
		disabled: PropTypes.bool,
		/**
		 * Message to display when the Checkbox is in an error state. When this is present, also visually highlights the component as in error.
		 */
		errorText: PropTypes.string,
		/**
		 * A unique ID is needed in order to support keyboard navigation and ARIA support. This ID is added to the `input` element
		 */
		id: PropTypes.string,
		/**
		 * The Checkbox will be indeterminate if its state can not be figured out or is partially checked. Once a checkbox is indeterminate, a click should cause it to be checked. Since a user cannot put a checkbox into an indeterminate state, it is assumed you are controlling the value of `checked` with the parent, also, and that this is a controlled component. **Note:** `indeterminate` proptype does nothing in the `toggle` variant, as [SLDS does not support it](https://lightningdesignsystem.com/components/forms/#flavor-checkbox-toggle-checkbox-toggle).
		 */
		indeterminate: PropTypes.bool,
		/**
		 * An optional label for the Checkbox.
		 */
		label: PropTypes.string,
		/**
		 * Label for the _enabled_ state of the Toggle variant. Defaults to "Enabled".
		 */
		labelToggleEnabled: PropTypes.string,
		/**
		 * Label for the _disabled_ state of the Toggle variant. Defaults to "Disabled". Note that this uses SLDS language, and meaning, of "Enabled" and "Disabled"; referring to the state of whatever the checkbox is _toggling_, not whether the checkbox itself is enabled or disabled.
		 */
		labelToggleDisabled: PropTypes.string,
		/**
		 * Name of the submitted form parameter.
		 */
		name: PropTypes.string,
		/**
		 * This event fires when the Checkbox focused is blurred.
		 */
		onBlur: PropTypes.func,
		/**
		 * This event fires when the Checkbox changes.
		 */
		onChange: PropTypes.func,
		/**
		 * This event fires when the Checkbox is focused.
		 */
		onFocus: PropTypes.func,
		/**
		 * This event fires when a key is pressed down.
		 */
		onKeyDown: PropTypes.func,
		/**
		 * This event fires when a character is typed. Probably. 👀 See [this article](http://www.bloggingdeveloper.com/post/KeyPress-KeyDown-KeyUp-The-Difference-Between-Javascript-Key-Events.aspx) for more information.
		 */
		onKeyPress: PropTypes.func,
		/**
		 * This event fires when a pressed key is released.
		 */
		onKeyUp: PropTypes.func,
		/**
		 * Displays the value of the input, but does not allow changes.
		 */
		readOnly: PropTypes.bool,
		/**
		 * Highlights the Checkbox as a required field (does not perform any validation).
		 */
		required: PropTypes.bool,
		/**
		 * The aria-role of the checkbox.
		 */
		role: PropTypes.string,
		/**
		 * Which flavor of checkbox? Default is `base` while other option is `toggle`. (**Note:** `toggle` variant does not support the `indeterminate` feature, because [SLDS does not support it](https://lightningdesignsystem.com/components/forms/#flavor-checkbox-toggle-checkbox-toggle).)
		 */
		variant: PropTypes.oneOf(['base', 'toggle'])
	},

	getDefaultProps () {
		return {
			variant: 'base',
			labelToggleEnabled: 'Enabled',
			labelToggleDisabled: 'Disabled'
		};
	},

	componentWillMount () {
		checkProps(FORMS_CHECKBOX, this.props);
		this.generatedId = shortid.generate();
	},

	getId () {
		return this.props.id || this.generatedId;
	},

	renderBaseVariant () {
		const {
			assistiveText,
			checked,
			className,
			disabled,
			errorText,
			indeterminate,
			label,
			name,
			onBlur,
			onChange, // eslint-disable-line no-unused-vars
			onFocus,
			onKeyDown,
			onKeyPress,
			onKeyUp,
			required,
			role
		} = this.props;

		return (
			<div
				className={classNames('slds-form-element', {
					'is-required': required,
					'slds-has-error': errorText
				},
				className)}
			>
				<div className="slds-form-element__control">
					<span className="slds-checkbox">
						{required ? <abbr className="slds-required" title="required">*</abbr> : null}
						<input
							aria-controls={this.props['aria-controls']}
							aria-describedby={this.props['aria-describedby']}
							aria-owns={this.props['aria-owns']}
							aria-required={this.props['aria-required']}
							disabled={disabled}
							checked={checked}
							id={this.getId()}
							name={name}
							onBlur={onBlur}
							onChange={this.handleChange}
							onFocus={onFocus}
							onKeyDown={onKeyDown}
							onKeyPress={onKeyPress}
							onKeyUp={onKeyUp}
							ref={
								(component) => {
									if (component) {
										component.indeterminate = indeterminate;
									}
									this.input = component;
								}}
							role={role}
							required={required}
							type="checkbox"
						/>
						<label className="slds-checkbox__label" htmlFor={this.getId()}>
							<span className="slds-checkbox--faux" />
							{label
								? <span className="slds-form-element__label">
									{label}
								</span>
							: null}
							{assistiveText
								? <span className="slds-assistive-text">
									{assistiveText}
								</span>
							: null}
						</label>
					</span>
				</div>
				{errorText ? <div className="slds-form-element__help">{errorText}</div> : null}
			</div>
		);
	},

	/* eslint-disable jsx-a11y/label-has-for */
	renderToggleVariant () {
		const {
			assistiveText,
			checked,
			className,
			disabled,
			errorText,
			label,
			labelToggleEnabled,
			labelToggleDisabled,
			name,
			onBlur,
			onFocus,
			onKeyDown,
			onKeyPress,
			onKeyUp,
			required,
			role
		} = this.props;

		return (
			<div
				className={classNames('slds-form-element', {
					'is-required': required,
					'slds-has-error': errorText
				},
				className)}
			>
				<label className="slds-checkbox--toggle slds-grid" htmlFor={this.getId()}>
					{required ? <abbr className="slds-required" title="required">*</abbr> : null}
					{label
						? <span className="slds-form-element__label slds-m-bottom--none">
							{label}
						</span>
					: null}
					{assistiveText
						? <span className="slds-assistive-text">
							{assistiveText}
						</span>
					: null}
					<input
						aria-controls={this.props['aria-controls']}
						aria-describedby={`${this.getId()}-desc`}
						aria-owns={this.props['aria-owns']}
						aria-required={this.props['aria-required']}
						disabled={disabled}
						id={this.getId()}
						checked={checked}
						name={name}
						onBlur={onBlur}
						onChange={this.handleChange}
						onFocus={onFocus}
						onKeyDown={onKeyDown}
						onKeyPress={onKeyPress}
						onKeyUp={onKeyUp}
						ref={
							(component) => {
								this.input = component;
							}}
						role={role}
						required={required}
						type="checkbox"
					/>
					<span id={`${this.getId()}-desc`} className="slds-checkbox--faux_container" aria-live="assertive">
						<span className="slds-checkbox--faux" />
						<span className="slds-checkbox--on">{labelToggleEnabled}</span>
						<span className="slds-checkbox--off">{labelToggleDisabled}</span>
					</span>
				</label>
				{errorText ? <div className="slds-form-element__help">{errorText}</div> : null}
			</div>
		);
	},
	/* eslint-enable jsx-a11y/label-has-for */

	// ### Render
	render () {
		return this.props.variant === 'toggle' ? this.renderToggleVariant() : this.renderBaseVariant();
	},

	handleChange (event) {
		const value = event.target.checked;
		const {
			checked,
			indeterminate,
			onChange
		} = this.props;

		if (isFunction(onChange)) {
			// `checked` is present twice to maintain backwards compatibility. Please remove first parameter `value` on the next breaking change.
			onChange(value, event, {
				checked: indeterminate ? true : !checked,
				indeterminate: false
			});
		}
	},

	handleKeyDown (event) {
		if (event.keyCode) {
			if (event.keyCode === KEYS.ENTER ||
					event.keyCode === KEYS.SPACE) {
				EventUtil.trapImmediate(event);
				this.handleChange(event);
			}
		}
	}
});

export default Checkbox;
