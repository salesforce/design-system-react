/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

// # Checkbox Component

// Implements the [Checkbox design pattern](https://www.lightningdesignsystem.com/components/forms/#checkbox) in React.

// ### React
import React from 'react';
import createReactClass from 'create-react-class';
import PropTypes from 'prop-types';

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

import { FORMS_CHECKBOX } from '../../../utilities/constants';

/**
 * The ability to style checkboxes with CSS varies across browsers. Using this component ensures checkboxes look the same everywhere.
 */
const Checkbox = createReactClass({
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
		variant: PropTypes.oneOf(['base', 'toggle', 'button-group'])
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

	renderButtonGroupVariant (props) {
		return (
			<span className="slds-button slds-checkbox--button">
				<input
					aria-controls={this.props['aria-controls']}
					aria-describedby={this.props['aria-describedby']}
					aria-owns={this.props['aria-owns']}
					aria-required={this.props['aria-required']}
					disabled={props.disabled}
					checked={props.checked}
					id={this.getId()}
					name={props.name}
					onBlur={props.onBlur}
					onChange={this.handleChange}
					onFocus={props.onFocus}
					onKeyDown={props.onKeyDown}
					onKeyPress={props.onKeyPress}
					onKeyUp={props.onKeyUp}
					ref={
						(component) => {
							this.input = component;
						}}
					role={props.role}
					required={props.required}
					type="checkbox"
				/>
				<label className="slds-checkbox--button__label" htmlFor={this.getId()}>
					<span className="slds-checkbox--faux">{props.label}</span>
					{props.assistiveText
						? <span className="slds-assistive-text">
							{props.assistiveText}
						</span>
					: null}
				</label>
			</span>
		);
	},

	renderBaseVariant (props) {
		return (
			<div
				className={classNames('slds-form-element', {
					'is-required': props.required,
					'slds-has-error': props.errorText
				},
				props.className)}
			>
				<div className="slds-form-element__control">
					<span className="slds-checkbox">
						{props.required ? <abbr className="slds-required" title="required">*</abbr> : null}
						<input
							aria-controls={this.props['aria-controls']}
							aria-describedby={this.props['aria-describedby']}
							aria-owns={this.props['aria-owns']}
							aria-required={this.props['aria-required']}
							disabled={props.disabled}
							checked={props.checked}
							id={this.getId()}
							name={props.name}
							onBlur={props.onBlur}
							onChange={this.handleChange}
							onFocus={props.onFocus}
							onKeyDown={props.onKeyDown}
							onKeyPress={props.onKeyPress}
							onKeyUp={props.onKeyUp}
							ref={
								(component) => {
									if (component) {
										component.indeterminate = props.indeterminate;
									}
									this.input = component;
								}}
							role={props.role}
							required={props.required}
							type="checkbox"
						/>
						<label className="slds-checkbox__label" htmlFor={this.getId()}>
							<span className="slds-checkbox--faux" />
							{props.label
								? <span className="slds-form-element__label">
									{props.label}
								</span>
							: null}
							{props.assistiveText
								? <span className="slds-assistive-text">
									{props.assistiveText}
								</span>
							: null}
						</label>
					</span>
				</div>
				{props.errorText ? <div className="slds-form-element__help">{props.errorText}</div> : null}
			</div>
		);
	},

	renderToggleVariant (props) {
		return (
			<div
				className={classNames('slds-form-element', {
					'is-required': props.required,
					'slds-has-error': props.errorText
				},
				props.className)}
			>
				<label className="slds-checkbox--toggle slds-grid" htmlFor={this.getId()}>
					{props.required ? <abbr className="slds-required" title="required">*</abbr> : null}
					{props.label
						? <span className="slds-form-element__label slds-m-bottom--none">
							{props.label}
						</span>
					: null}
					{props.assistiveText
						? <span className="slds-assistive-text">
							{props.assistiveText}
						</span>
					: null}
					<input
						aria-controls={this.props['aria-controls']}
						aria-describedby={`${this.getId()}-desc`}
						aria-owns={this.props['aria-owns']}
						aria-required={this.props['aria-required']}
						disabled={props.disabled}
						id={this.getId()}
						checked={props.checked}
						name={props.name}
						onBlur={props.onBlur}
						onChange={this.handleChange}
						onFocus={props.onFocus}
						onKeyDown={props.onKeyDown}
						onKeyPress={props.onKeyPress}
						onKeyUp={props.onKeyUp}
						ref={
							(component) => {
								this.input = component;
							}}
						role={props.role}
						required={props.required}
						type="checkbox"
					/>
					<span id={`${this.getId()}-desc`} className="slds-checkbox--faux_container" aria-live="assertive">
						<span className="slds-checkbox--faux" />
						<span className="slds-checkbox--on">{props.labelToggleEnabled}</span>
						<span className="slds-checkbox--off">{props.labelToggleDisabled}</span>
					</span>
				</label>
				{props.errorText ? <div className="slds-form-element__help">{props.errorText}</div> : null}
			</div>
		);
	},

	// ### Render
	render () {
		let renderer;
		switch (this.props.variant) {
			case 'toggle':
				renderer = this.renderToggleVariant(this.props);
				break;
			case 'button-group':
				renderer = this.renderButtonGroupVariant(this.props);
				break;
			default:
				renderer = this.renderBaseVariant(this.props);
		}
		return renderer;
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
