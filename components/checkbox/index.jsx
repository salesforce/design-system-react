/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

// # Checkbox Component

// Implements the [Checkbox design pattern](https://www.lightningdesignsystem.com/components/forms/#checkbox) in React.

import React from 'react';
import PropTypes from 'prop-types';

import classNames from 'classnames';

// ### shortid
// [npmjs.com/package/shortid](https://www.npmjs.com/package/shortid)
// shortid is a short, non-sequential, url-friendly, unique id generator
import shortid from 'shortid';

// ### Event Helpers
import KEYS from '../../utilities/key-code';
import EventUtil from '../../utilities/event';

// This component's `checkProps` which issues warnings to developers about properties when in development mode (similar to React's built in development tools)
import checkProps from './check-props';

import { FORMS_CHECKBOX } from '../../utilities/constants';

const propTypes = {
	/**
	 * An HTML ID that is shared with ARIA-supported devices with the
	 * `aria-controls` attribute in order to relate the input with
	 * another region of the page. An example would be a select box
	 * that shows or hides a panel.
	 */
	'aria-controls': PropTypes.string,
	/**
	 * The `aria-describedby` attribute is used to indicate the IDs of the elements that describe the object. It is used to establish a relationship between widgets or groups and text that described them. This is very similar to aria-labelledby: a label describes the essence of an object, while a description provides more information that the user might need.
	 */
	'aria-describedby': PropTypes.string,
	/**
	 * `aria-owns` indicate that an element depends on the current one when the relation can't be determined by the hierarchy structure.
	 */
	'aria-owns': PropTypes.string,
	/**
	 * The `aria-required` attribute is used to indicate that user input is required on an element before a form can be submitted.
	 */
	'aria-required': PropTypes.bool,
	/**
	 * **Assistive text for accessibility**
	 * This object is merged with the default props object on every render.
	 * * `label`: This is used as a visually hidden label if, no `labels.label` is provided.
	 */
	assistiveText: PropTypes.shape({
		label: PropTypes.string,
	}),
	/**
	 * The Checkbox should be a controlled component, and will always be in the state specified. If checked is not defined, the state of the uncontrolled native `input` component will be used.
	 */
	checked: PropTypes.bool,
	/**
	 * This is the initial value of an uncontrolled form element and is present only
	 * to provide compatibility with hybrid framework applications that are not
	 * entirely React. It should only be used in an application without centralized
	 * state (Redux, Flux). "Controlled components" with centralized state is highly recommended. See [Code Overview](https://github.com/salesforce/design-system-react/blob/master/docs/codebase-overview.md#controlled-and-uncontrolled-components) for more information.
	 */
	defaultChecked: PropTypes.bool,
	/**
	 * Class names to be added to the outer container of the Checkbox.
	 */
	className: PropTypes.oneOfType([
		PropTypes.array,
		PropTypes.object,
		PropTypes.string,
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
	 * **Text labels for internationalization**
	 * This object is merged with the default props object on every render.
	 * * `label`: Label for the _enabled_ state of the Toggle variant. Defaults to "Enabled".
	 * * `toggleDisabled`: Label for the _disabled_ state of the Toggle variant. Defaults to "Disabled". Note that this uses SLDS language, and meaning, of "Enabled" and "Disabled"; referring to the state of whatever the checkbox is _toggling_, not whether the checkbox itself is enabled or disabled.
	 * * `toggleEnabled`: Label for the _enabled_ state of the Toggle variant. Defaults to "Enabled".
	 */
	labels: PropTypes.shape({
		label: PropTypes.string,
		toggleDisabled: PropTypes.string,
		toggleEnabled: PropTypes.string,
	}),
	/**
	 * Name of the submitted form parameter.
	 */
	name: PropTypes.string,
	/**
	 * This event fires when the Checkbox looses focus. It passes in `{ event }`.
	 */
	onBlur: PropTypes.func,
	/**
	 * This event fires when the Checkbox changes. Passes in `event, { checked }`. This used to be `checked, event, { checked }`.
	 */
	onChange: PropTypes.func,
	/**
	 * This event fires when the Checkbox is focused. It passes in `{ event }`.
	 */
	onFocus: PropTypes.func,
	/**
	 * This event fires when a key is pressed down. It passes in `{ event }`.
	 */
	onKeyDown: PropTypes.func,
	/**
	 * This event fires when a character is typed. See [this article](http://www.bloggingdeveloper.com/post/KeyPress-KeyDown-KeyUp-The-Difference-Between-Javascript-Key-Events.aspx) for more information. It passes in `{ event }`.
	 */
	onKeyPress: PropTypes.func,
	/**
	 * This event fires when a pressed key is released. It passes in `{ event }`.
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
	 * Which UX pattern of checkbox? The default is `base` while other option is `toggle`. (**Note:** `toggle` variant does not support the `indeterminate` feature, because [SLDS does not support it](https://lightningdesignsystem.com/components/forms/#flavor-checkbox-toggle-checkbox-toggle).)
	 */
	variant: PropTypes.oneOf(['base', 'toggle', 'button-group']),
};

const defaultProps = {
	assistiveText: {},
	labels: {
		toggleDisabled: 'Disabled',
		toggleEnabled: 'Enabled',
	},
	variant: 'base',
};

/**
 * The ability to style checkboxes with CSS varies across browsers. Using this component ensures checkboxes look the same everywhere.
 */
class Checkbox extends React.Component {
	componentWillMount () {
		checkProps(FORMS_CHECKBOX, this.props);
		this.generatedId = shortid.generate();
	}

	getId = () => this.props.id || this.generatedId;

	handleChange = (event) => {
		const { checked, indeterminate, onChange } = this.props;

		if (typeof onChange === 'function') {
			// `target.checked` is present twice to maintain backwards compatibility. Please remove first parameter `value` on the next breaking change or when `forms/checkbox` is removed.
			if (this.props.oldEventParameterOrder) {
				onChange(event.target.checked, event, {
					checked: indeterminate ? true : !checked,
					indeterminate: false,
				});
			} else {
				// NEW API
				onChange(event, {
					checked: indeterminate ? true : !checked,
					indeterminate: false,
				});
			}
		}
	};

	handleKeyDown = (event) => {
		if (event.keyCode) {
			if (event.keyCode === KEYS.ENTER || event.keyCode === KEYS.SPACE) {
				EventUtil.trapImmediate(event);
				this.handleChange(event);
			}
		}
	};

	renderButtonGroupVariant = (props, assistiveText, labels) => (
		<span className="slds-button slds-checkbox--button">
			<input
				aria-controls={this.props['aria-controls']}
				aria-describedby={this.props['aria-describedby']}
				aria-owns={this.props['aria-owns']}
				aria-required={this.props['aria-required']}
				disabled={props.disabled}
				checked={props.checked}
				defaultChecked={props.defaultChecked}
				id={this.getId()}
				name={props.name}
				onBlur={props.onBlur}
				onChange={this.handleChange}
				onFocus={props.onFocus}
				onKeyDown={props.onKeyDown}
				onKeyPress={props.onKeyPress}
				onKeyUp={props.onKeyUp}
				ref={(component) => {
					this.input = component;
				}}
				role={props.role}
				required={props.required}
				type="checkbox"
			/>
			<label className="slds-checkbox--button__label" htmlFor={this.getId()}>
				<span className="slds-checkbox--faux">{labels.label}</span>
				{assistiveText.label ? (
					<span className="slds-assistive-text">{assistiveText.label}</span>
				) : null}
			</label>
		</span>
	);

	renderBaseVariant = (props, assistiveText, labels) => (
		<div
			className={classNames(
				'slds-form-element',
				{
					'is-required': props.required,
					'slds-has-error': props.errorText,
				},
				props.className
			)}
		>
			<div className="slds-form-element__control">
				<span className="slds-checkbox">
					{props.required ? (
						<abbr className="slds-required" title="required">
							*
						</abbr>
					) : null}
					<input
						aria-controls={this.props['aria-controls']}
						aria-describedby={this.props['aria-describedby']}
						aria-owns={this.props['aria-owns']}
						aria-required={this.props['aria-required']}
						disabled={props.disabled}
						checked={props.checked}
						defaultChecked={props.defaultChecked}
						id={this.getId()}
						name={props.name}
						onBlur={props.onBlur}
						onChange={this.handleChange}
						onFocus={props.onFocus}
						onKeyDown={props.onKeyDown}
						onKeyPress={props.onKeyPress}
						onKeyUp={props.onKeyUp}
						ref={(component) => {
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
						{labels.label ? (
							<span className="slds-form-element__label">{labels.label}</span>
						) : null}
						{assistiveText.label ? (
							<span className="slds-assistive-text">{assistiveText.label}</span>
						) : null}
					</label>
				</span>
			</div>
			{props.errorText ? (
				<div className="slds-form-element__help">{props.errorText}</div>
			) : null}
		</div>
	);

	renderToggleVariant = (props, assistiveText, labels) => (
		<div
			className={classNames(
				'slds-form-element',
				{
					'is-required': props.required,
					'slds-has-error': props.errorText,
				},
				props.className
			)}
		>
			<label className="slds-checkbox--toggle slds-grid" htmlFor={this.getId()}>
				{props.required ? (
					<abbr className="slds-required" title="required">
						*
					</abbr>
				) : null}
				{labels.label ? (
					<span className="slds-form-element__label slds-m-bottom--none">
						{labels.label}
					</span>
				) : null}
				{assistiveText.label ? (
					<span className="slds-assistive-text">{assistiveText.label}</span>
				) : null}
				<input
					aria-controls={this.props['aria-controls']}
					aria-describedby={`${this.getId()}-desc`}
					aria-owns={this.props['aria-owns']}
					aria-required={this.props['aria-required']}
					disabled={props.disabled}
					id={this.getId()}
					checked={props.checked}
					defaultChecked={props.defaultChecked}
					name={props.name}
					onBlur={props.onBlur}
					onChange={this.handleChange}
					onFocus={props.onFocus}
					onKeyDown={props.onKeyDown}
					onKeyPress={props.onKeyPress}
					onKeyUp={props.onKeyUp}
					ref={(component) => {
						this.input = component;
					}}
					role={props.role}
					required={props.required}
					type="checkbox"
				/>
				<span
					id={`${this.getId()}-desc`}
					className="slds-checkbox--faux_container"
					aria-live="assertive"
				>
					<span className="slds-checkbox--faux" />
					<span className="slds-checkbox--on">{labels.toggleEnabled}</span>
					<span className="slds-checkbox--off">{labels.toggleDisabled}</span>
				</span>
			</label>
			{props.errorText ? (
				<div className="slds-form-element__help">{props.errorText}</div>
			) : null}
		</div>
	);

	render () {
		const assistiveText = {
			...defaultProps.assistiveText,
			/* Remove backward compatibility at next breaking change */
			...(typeof this.props.assistiveText === 'string'
				? { label: this.props.assistiveText }
				: {}),
			...(typeof this.props.assistiveText === 'object'
				? this.props.assistiveText
				: {}),
		};
		const labels = {
			...defaultProps.labels,
			/* Remove backward compatibility at next breaking change */
			...(this.props.label ? { label: this.props.label } : {}),
			...this.props.labels,
		};

		const subRenders = {
			base: this.renderBaseVariant,
			'button-group': this.renderButtonGroupVariant,
			toggle: this.renderToggleVariant,
		};
		const variantExists = subRenders[this.props.variant];

		return variantExists
			? subRenders[this.props.variant](this.props, assistiveText, labels)
			: subRenders.base(this.props, assistiveText, labels);
	}
}

Checkbox.displayName = FORMS_CHECKBOX;
Checkbox.propTypes = propTypes;
Checkbox.defaultProps = defaultProps;

export default Checkbox;
