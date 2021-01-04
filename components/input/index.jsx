/* eslint-disable max-lines */
/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

// # Input Component

// Implements the [Input design pattern](https://lightningdesignsystem.com/components/forms/#flavor-input) in React. Does not yet implement [fixed text](https://lightningdesignsystem.com/components/forms/#flavor-input-input-fixed-text).
// Based on SLDS v2.2.1
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

import Button from '../button';

// ## Children
import InputIcon from '../icon/input-icon';
import InnerInput from './private/inner-input';
import Label from '../utilities/label';

// This component's `checkProps` which issues warnings to developers about properties when in development mode (similar to React's built in development tools)
import checkProps from './check-props';

import { INPUT } from '../../utilities/constants';
import componentDoc from './component.json';
import FieldLevelHelpTooltip from '../tooltip/private/field-level-help-tooltip';

const COUNTER = 'counter';
const DECREMENT = 'Decrement';
const INCREMENT = 'Increment';

const defaultProps = {
	assistiveText: {
		decrement: `${DECREMENT} ${COUNTER}`,
		increment: `${INCREMENT} ${COUNTER}`,
	},
	type: 'text',
};

/**
 * The HTML `input` with a label and error messaging.
 */
class Input extends React.Component {
	static displayName = INPUT;

	static propTypes = {
		/**
		 * The aria-activedescendant attribute contains the ID of the currently active child object that is part of a composite widget within the Document Object Model. It makes do with the overhead of having all or more than one child focusable. As the name specifies, it helps in managing the current active child of the composite widget.
		 */
		'aria-activedescendant': PropTypes.string,
		/**
		 * Indicates if the suggestions in a composite widget are values that complete the current textbox input.
		 */
		'aria-autocomplete': PropTypes.string,
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
		 * Use the `aria-expanded` state to indicate whether regions of the content are collapsible, and to expose whether a region is currently expanded or collapsed.
		 */
		'aria-expanded': PropTypes.bool,
		/**
		 * Indicates that the element has a popup context menu or sub-level menu.
		 */
		'aria-haspopup': PropTypes.bool,
		/**
		 * The aria-labelledby attribute contains the element IDs of labels in objects such as input elements, widgets, and groups. The attribute establishes relationships between objects and their labels. Assistive technology, such as screen readers, use this attribute to catalog the objects in a document so that users can navigate between them. Without an element ID, the assistive technology cannot catalog the object.
		 */
		'aria-labelledby': PropTypes.string,
		/**
		 * An HTML ID that is shared with ARIA-supported devices with the
		 * `aria-controls` attribute in order to relate the input with
		 * another region of the page. An example would be a search field
		 * that shows search results.
		 */
		'aria-owns': PropTypes.string,
		/**
		 * The `aria-required` attribute is used to indicate that user input is required on an element before a form can be submitted.
		 */
		'aria-required': PropTypes.bool,
		/**
		 * **Assistive text for accessibility**
		 * * `label`: Visually hidden label but read out loud by screen readers.
		 * * `spinner`: Text for loading spinner icon.
		 */
		assistiveText: PropTypes.shape({
			label: PropTypes.string,
			spinner: PropTypes.string,
		}),
		/**
		 * Disabled brower's autocomplete when "off" is used.
		 */
		autoComplete: PropTypes.string,
		/**
		 * Elements are added after the `input`.
		 */
		children: PropTypes.node,
		/**
		 * Class names to be added to the outer container of the input.
		 */
		className: PropTypes.oneOfType([
			PropTypes.array,
			PropTypes.object,
			PropTypes.string,
		]),
		/**
		 * This is the initial value of an uncontrolled form element and
		 * is present only to provide compatibility with hybrid framework
		 * applications that are not entirely React. It should only be used
		 * in an application without centralized state (Redux, Flux).
		 * "Controlled components" with centralized state is highly recommended.
		 * See [Code Overview](https://github.com/salesforce/design-system-react/blob/master/docs/codebase-overview.md#controlled-and-uncontrolled-components) for more information.
		 */
		defaultValue: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
		/**
		 * Disables the input and prevents editing the contents.
		 */
		disabled: PropTypes.bool,
		/**
		 * Message to display when the input is in an error state. When this is present, also visually highlights the component as in error.
		 */
		errorText: PropTypes.oneOfType([PropTypes.node, PropTypes.string]),
		/**
		 * A [Tooltip](https://react.lightningdesignsystem.com/components/tooltips/) component that is displayed next to the label.
		 */
		fieldLevelHelpTooltip: PropTypes.node,
		/**
		 * Displays text or node to the left of the input. This follows the fixed text input UX pattern.
		 */
		fixedTextLeft: PropTypes.oneOfType([PropTypes.node, PropTypes.string]),
		/**
		 * Displays text or node to the right of the input. This follows the fixed text input UX pattern.
		 */
		fixedTextRight: PropTypes.oneOfType([PropTypes.node, PropTypes.string]),
		/**
		 * If true, loading spinner appears inside input on right hand side.
		 */
		hasSpinner: PropTypes.bool,
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
		 * Displays help text under the input.
		 */
		inlineHelpText: PropTypes.oneOfType([PropTypes.node, PropTypes.string]),
		/**
		 * This callback exposes the input reference / DOM node to parent components. `<Parent inputRef={(inputComponent) => this.input = inputComponent} />
		 */
		inputRef: PropTypes.func,
		/**
		 * Displays the value of the input statically. This follows the static input UX pattern.
		 */
		isStatic: PropTypes.bool,
		/**
		 * This label appears above the input.
		 */
		label: PropTypes.string,
		/**
		 * Triggered when focus is removed.
		 */
		onBlur: PropTypes.func,
		/**
		 * This callback fires when the input changes. Passes in `event, { value }`.
		 */
		onChange: PropTypes.func,
		/**
		 * This event fires when the input is clicked.
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
		 * Triggered when a submittable `<input>` element is invalid.
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
		 * Text that will appear in an empty input.
		 */
		placeholder: PropTypes.string,
		/**
		 * Sets the minimum number of characters that an `<input>` can accept.
		 */
		minLength: PropTypes.string,
		/**
		 * Specifies minimum accepted value for a counter input
		 */
		minValue: PropTypes.number,
		/**
		 * Sets the maximum number of characters that an `<input>` can accept.
		 */
		maxLength: PropTypes.string,
		/**
		 * Specifies maximum accepted value for a counter input
		 */
		maxValue: PropTypes.number,
		/**
		 * Name of the submitted form parameter.
		 */
		name: PropTypes.string,
		/**
		 * Displays the value of the input as read-only. This is used in the inline edit UX pattern.
		 */
		readOnly: PropTypes.bool,
		/**
		 * Highlights the input as a required field (does not perform any validation).
		 */
		required: PropTypes.bool,
		/**
		 * ARIA role
		 */
		role: PropTypes.string,
		/**
		 * Determines the step size upon increment or decrement. Can be set to decimal values.
		 */
		step: PropTypes.number,
		/**
		 * styles to be added to input
		 */
		styleInput: PropTypes.object,
		/**
		 * Custom styles to be passed to the component container
		 */
		styleContainer: PropTypes.object,
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
			'color',
		]),
		/**
		 * The input is a controlled component, and will always display this value.
		 */
		value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
		/**
		 * Which UX pattern of input? The default is `base` while other option is `counter`
		 */
		variant: PropTypes.oneOf(['base', COUNTER]),
	};

	static defaultProps = defaultProps;

	constructor(props) {
		super(props);
		this.inputRef = null;
		this.stepping = {
			currentDelay: 500,
			initialDelay: 500,
			speedDelay: 75,
			timeout: {},
		};

		// `checkProps` issues warnings to developers about properties (similar to React's built in development tools)
		checkProps(INPUT, props, componentDoc);

		this.generatedId = shortid.generate();
		if (props.errorText) {
			this.generatedErrorId = shortid.generate();
		}
	}

	getId = () => this.props.id || this.generatedId;

	getErrorId = () => this.props['aria-describedby'] || this.generatedErrorId;

	getValueAsNumber = () => {
		let value = 0;

		if (this.props.value !== undefined) {
			value = Number(this.props.value);
		} else if (this.inputRef) {
			value = Number(this.inputRef.value);
		}

		return value;
	};

	getCounterButtonIcon = (direction) => {
		const value = this.getValueAsNumber();
		let disabled = false;

		if (
			this.props.disabled ||
			(direction === INCREMENT &&
				this.props.maxValue !== undefined &&
				value >= this.props.maxValue) ||
			(direction === DECREMENT &&
				this.props.minValue !== undefined &&
				value <= this.props.minValue)
		) {
			disabled = true;
		}

		return (
			<Button
				assistiveText={{
					icon: this.props.assistiveText[direction.toLowerCase()],
				}}
				className={classNames(
					'slds-button_icon-small',
					`slds-input__button_${direction.toLowerCase()}`
				)}
				disabled={disabled}
				iconCategory="utility"
				iconName={direction === DECREMENT ? 'ban' : 'new'}
				onKeyDown={(event) => {
					if (event.keyCode === 13) {
						this.performStep(direction, event);
					}
				}}
				onKeyUp={this.stopStepping}
				onMouseDown={(event) => {
					this.performStep(direction, event);
				}}
				onMouseLeave={this.stopStepping}
				onMouseUp={this.stopStepping}
				variant="icon"
			/>
		);
	};

	// This is convoluted to maintain backwards compatibility. Please remove deprecatedProps on next breaking change.
	getIconRender = (position, iconPositionProp) => {
		let icon;

		// Remove at next breaking change
		/* eslint-disable react/prop-types */
		const deprecatedProps = {
			assistiveText: {
				icon:
					(this.props[iconPositionProp] &&
						this.props[iconPositionProp].props.assistiveText) ||
					this.props.iconAssistiveText,
			},
			category:
				(this.props[iconPositionProp] &&
					this.props[iconPositionProp].props.category) ||
				this.props.iconCategory,
			name:
				(this.props[iconPositionProp] &&
					this.props[iconPositionProp].props.name) ||
				this.props.iconName,
			onClick:
				(this.props[iconPositionProp] &&
					this.props[iconPositionProp].props.onClick) ||
				this.props.onIconClick,
		};
		/* eslint-enable react/prop-types */

		if (
			this.props[iconPositionProp] &&
			position &&
			this.props[iconPositionProp]
		) {
			icon = React.cloneElement(this.props[iconPositionProp], {
				iconPosition: `${position}`,
			});
		} else if (deprecatedProps.name) {
			icon = <InputIcon iconPosition={position} {...deprecatedProps} />;
		}

		return icon;
	};

	setInputRef = (ref) => {
		this.inputRef = ref;
		if (this.props.inputRef) {
			this.props.inputRef(ref);
		}
	};

	handleChange = (event) => {
		if (this.props.onChange) {
			const data = {
				value: event.target.value,
			};

			if (this.props.variant === COUNTER) {
				data.number = Number(data.value);
			}

			this.props.onChange(event, data);
		}
	};

	performStep = (direction, event) => {
		clearTimeout(this.stepping.timeout);

		const { maxValue } = this.props;
		const { minValue } = this.props;
		const step = this.props.step !== undefined ? Number(this.props.step) : 1;
		let value = this.getValueAsNumber();
		let valueChanged = false;

		if (direction === DECREMENT && maxValue !== undefined && value > maxValue) {
			value = Number(maxValue);
			valueChanged = true;
		} else if (
			direction === INCREMENT &&
			minValue !== undefined &&
			value < minValue
		) {
			value = Number(minValue);
			valueChanged = true;
		} else {
			const decimalPlaces =
				String(step).search(/\./) >= 0 ? String(step).split('.')[1].length : 0;
			let minOverflow = 0;

			if (minValue !== undefined) {
				minOverflow = (value - minValue) % step;
			}

			if (minOverflow > 0) {
				// Default browser inputs of type number with a min attribute alter the value upon change as needed so
				// that with enough decrements it can reach the exact min value. This behavior is reflected here
				value =
					direction === DECREMENT
						? value - minOverflow
						: value + (step - minOverflow);
			} else {
				value = direction === DECREMENT ? value - step : value + step;
			}

			value = Number(value.toFixed(decimalPlaces));

			if (
				!(maxValue !== undefined && value > maxValue) &&
				!(minValue !== undefined && value < minValue)
			) {
				valueChanged = true;
			}
		}

		if (valueChanged) {
			/*
			 * Use of `this.forceUpdate` is an anti-pattern. This code only executes if this `input` element is uncontrolled which this library believes is an anti-pattern, also. This code is only present to allow for the edge case of uncontrolled use of an `input`.
			 */
			if (this.props.value === undefined && this.inputRef) {
				this.inputRef.value = String(value);
				this.forceUpdate();
			} else if (this.props.onChange) {
				this.props.onChange(event, {
					number: value,
					value: String(value),
				});
			}
		}

		if (
			(direction === INCREMENT &&
				maxValue !== undefined &&
				value >= maxValue) ||
			(direction === DECREMENT && minValue !== undefined && value <= minValue)
		) {
			this.stopStepping();
		} else {
			this.stepping.timeout = setTimeout(() => {
				this.stepping.currentDelay = this.stepping.speedDelay;
				this.performStep(direction);
			}, this.stepping.currentDelay);
		}
	};

	stopStepping = () => {
		clearTimeout(this.stepping.timeout);
		this.stepping.currentDelay = this.stepping.initialDelay;
	};

	render() {
		const assistiveText = {
			...defaultProps.assistiveText,
			...this.props.assistiveText,
		};
		const inputRef =
			this.props.variant === COUNTER ? this.setInputRef : this.props.inputRef;
		let iconLeft = null;
		let iconRight = null;

		const hasRenderedLabel =
			this.props.label || (assistiveText && assistiveText.label);

		// Remove at next breaking change
		// this is a hack to make left the default prop unless overwritten by `iconPosition="right"`
		if (
			!!this.props.iconLeft ||
			((this.props.iconPosition === 'left' ||
				this.props.iconPosition === undefined) &&
				!!this.props.iconName)
		) {
			iconLeft = this.getIconRender('left', 'iconLeft');
		} else if (
			this.props.variant === COUNTER &&
			!this.props.isStatic &&
			!this.props.readOnly
		) {
			iconLeft = this.getCounterButtonIcon(DECREMENT);
		}

		if (
			!!this.props.iconRight ||
			(this.props.iconPosition === 'right' && !!this.props.iconName)
		) {
			iconRight = this.getIconRender('right', 'iconRight');
		} else if (
			this.props.variant === COUNTER &&
			!this.props.isStatic &&
			!this.props.readOnly
		) {
			iconRight = this.getCounterButtonIcon(INCREMENT);
		}

		return (
			<div
				className={classNames(
					'slds-form-element',
					{
						'slds-has-error': this.props.errorText,
					},
					this.props.className
				)}
				style={this.props.styleContainer}
			>
				<Label
					assistiveText={assistiveText}
					htmlFor={this.props.isStatic ? undefined : this.getId()}
					label={this.props.label}
					required={this.props.required}
					variant={this.props.isStatic ? 'static' : 'base'}
				/>
				{this.props.fieldLevelHelpTooltip && hasRenderedLabel ? (
					<FieldLevelHelpTooltip
						assistiveText={{
							triggerLearnMoreIcon: assistiveText.fieldLevelHelpButton,
						}}
						fieldLevelHelpTooltip={this.props.fieldLevelHelpTooltip}
					/>
				) : null}
				<InnerInput
					aria-activedescendant={this.props['aria-activedescendant']}
					aria-autocomplete={this.props['aria-autocomplete']}
					aria-controls={this.props['aria-controls']}
					aria-labelledby={this.props['aria-labelledby']}
					aria-describedby={this.getErrorId()}
					aria-expanded={this.props['aria-expanded']}
					aria-owns={this.props['aria-owns']}
					aria-required={this.props['aria-required']}
					autoComplete={this.props.autoComplete}
					className={classNames({
						'slds-input_counter': this.props.variant === COUNTER,
						'slds-p-horizontal_none':
							this.props.variant === COUNTER && this.props.readOnly,
					})}
					containerProps={{
						className: 'slds-form-element__control',
					}}
					defaultValue={this.props.defaultValue}
					disabled={this.props.disabled}
					fixedTextLeft={this.props.fixedTextLeft}
					fixedTextRight={this.props.fixedTextRight}
					hasSpinner={this.props.hasSpinner}
					id={this.getId()}
					iconLeft={iconLeft}
					iconRight={iconRight}
					inlineEditTrigger={this.props.inlineEditTrigger}
					isStatic={this.props.isStatic}
					minLength={this.props.minLength}
					minValue={this.props.minValue}
					maxLength={this.props.maxLength}
					maxValue={this.props.maxValue}
					name={this.props.name}
					onBlur={this.props.onBlur}
					onChange={this.handleChange}
					onClick={this.props.onClick}
					onFocus={this.props.onFocus}
					onInput={this.props.onInput}
					onInvalid={this.props.onInvalid}
					onKeyDown={this.props.onKeyDown}
					onKeyPress={this.props.onKeyPress}
					onKeyUp={this.props.onKeyUp}
					onSelect={this.props.onSelect}
					onSubmit={this.props.onSubmit}
					placeholder={this.props.placeholder}
					inputRef={inputRef}
					readOnly={this.props.readOnly}
					required={this.props.required}
					role={this.props.role}
					assistiveText={this.props.assistiveText}
					type={this.props.variant === COUNTER ? 'number' : this.props.type}
					value={this.props.value}
					variant={this.props.variant}
					step={this.props.step}
					style={this.props.styleInput}
				/>
				{this.props.inlineHelpText && (
					<div className="slds-form-element__help">
						{this.props.inlineHelpText}
					</div>
				)}
				{this.props.errorText && (
					<div id={this.getErrorId()} className="slds-form-element__help">
						{this.props.errorText}
					</div>
				)}
				{this.props.children}
			</div>
		);
	}
}

export default Input;
