/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

import React from 'react';
import PropTypes from 'prop-types';
import shortid from 'shortid';
import classNames from 'classnames';

import KEYS from '../../utilities/key-code';
import { RADIO } from '../../utilities/constants';
import getAriaProps from '../../utilities/get-aria-props';
import getDataProps from '../../utilities/get-data-props';
import Swatch from '../../components/color-picker/private/swatch';
import Icon from '../icon';

// This component's `checkProps` which issues warnings to developers about properties when in development mode (similar to React's built in development tools)
import checkProps from './check-props';
import componentDoc from './component.json';

const propTypes = {
	/**
	 * **Assistive text for accessibility**
	 * This object is merged with the default props object on every render.
	 * * `label`: This is used as a visually hidden label if, no `labels.label` is provided.
	 */
	assistiveText: PropTypes.shape({
		label: PropTypes.string,
	}),
	/**
	 * The ID of an element that describes this radio input. Often used for error messages.
	 */
	'aria-describedby': PropTypes.string,
	/**
	 * The aria-labelledby attribute establishes relationships between objects and their label(s), and its value should be one or more element IDs, which refer to elements that have the text needed for labeling. List multiple element IDs in a space delimited fashion.
	 */
	'aria-labelledby': PropTypes.string,
	/**
	 * This is a controlled component. This radio is checked according to this value.
	 */
	checked: PropTypes.bool,
	/**
	 * Class name to be passed to radio input wrapper ( `span` element)
	 */
	className: PropTypes.oneOfType([
		PropTypes.array,
		PropTypes.object,
		PropTypes.string,
	]),
	/**
	 * This is the initial value of an uncontrolled form element and is present only to provide compatibility
	 * with hybrid framework applications that are not entirely React. It should only be used in an application
	 * without centralized state (Redux, Flux). "Controlled components" with centralized state is highly recommended.
	 * See [Code Overview](https://github.com/salesforce/design-system-react/blob/master/docs/codebase-overview.md#controlled-and-uncontrolled-components) for more information.
	 */ defaultChecked: PropTypes.bool,
	/**
	 * Disable this radio input.
	 */
	disabled: PropTypes.bool,
	/**
	 * A unique ID that is used to associating a label to the `input` element. This ID is added to the `input` element.
	 */
	id: PropTypes.string,
	/**
	 * **Text labels for internationalization**
	 * This object is merged with the default props object on every render.
	 * * `heading`: Heading for the visual picker variant
	 * * `label`: Label for the radio input
	 */
	labels: PropTypes.shape({
		heading: PropTypes.string,
		label: PropTypes.string,
	}),
	/**
	 * The name of the radio input group.
	 */
	name: PropTypes.string,
	/**
	 * This event fires when the radio selection changes. Passes in `event, { checked }`.
	 */
	onChange: PropTypes.func,
	/**
	 * This event fires when the Checkbox is focused. It passes in `{ event }`.
	 */
	onFocus: PropTypes.func,
	/**
	 * Triggered to indicate that this component should receive focus.
	 */
	onRequestFocus: PropTypes.func,
	/**
	 * If true, will trigger `onRequestFocus`.
	 */
	requestFocus: PropTypes.bool,
	/**
	 * Write <code>"-1"</code> if you don't want the user to tab to the button.
	 */
	tabIndex: PropTypes.string,
	/**
	 * The value of this radio input.
	 */
	value: PropTypes.string,
	/**
	 * Variant of the Radio button. Base is the default and button-group makes the radio button look like a normal button (should be a child of <RadioButtonGroup>).
	 */
	variant: PropTypes.oneOf(['base', 'button-group', 'swatch', 'visual-picker']),
	/**
	 * Determines whether visual picker is coverable when selected (only for visual picker variant)
	 */
	coverable: PropTypes.bool,
	/**
	 * Determines whether the visual picker should be vertical or horizontal (only for visual picker variant)
	 */
	vertical: PropTypes.bool,
	/**
	 * Allows icon to shown if radio is not selected (only for non-coverable visual picker variant)
	 */
	onRenderVisualPicker: PropTypes.func,
	/**
	 * Allows icon to shown if radio is not selected (only for visual picker variant)
	 */
	onRenderVisualPickerSelected: PropTypes.func,
	/**
	 * Allows icon to shown if radio is not selected (only for visual picker variant)
	 */
	onRenderVisualPickerNotSelected: PropTypes.func,
	/**
	 * Shows description for radio option (only for visual picker variant)
	 */
	description: PropTypes.string,
	/**
	 * Allows icon to shown if radio is not selected (only for visual picker variant)
	 */
	size: PropTypes.oneOf(['medium', 'large']),
	/**
	 * Ref callback that will pass in the radio's `input` tag
	 */
	refs: PropTypes.shape({
		input: PropTypes.func,
	}),
};

const defaultProps = {
	assistiveText: {},
	variant: 'base',
	coverable: false,
};

/**
 * A radio input that can have a single input checked at any one time. Radios should be wrapped with
 * a [RadioGroup](/components/radio-group) or [RadioButtonGroup](/components/radio-button-group)
 */
class Radio extends React.Component {
	constructor(props) {
		super(props);
		this.preventDuplicateChangeEvent = false;
		checkProps(RADIO, this.props, componentDoc);
		this.generatedId = shortid.generate();
	}

	getId() {
		return this.props.id || this.generatedId;
	}

	handleChange = (event, preventDuplicateChangeEvent) => {
		if (!this.preventDuplicateChangeEvent) {
			this.preventDuplicateChangeEvent = Boolean(preventDuplicateChangeEvent);
			if (this.props.onChange) {
				this.props.onChange(event, {
					checked: !this.props.checked,
				});
			}
		} else {
			this.preventDuplicateChangeEvent = false;
		}
	};

	render() {
		const ariaProps = getAriaProps(this.props);
		const dataProps = getDataProps(this.props);

		let radio;

		const labels = {
			...defaultProps.labels,
			/* Remove backward compatibility at next breaking change */
			...(this.props.label ? { label: this.props.label } : {}),
			...this.props.labels,
		};

		if (this.props.variant === 'swatch') {
			radio = (
				<label
					style={{ border: '1px' }}
					className="slds-radio_button__label"
					htmlFor={this.getId()}
				>
					<span>
						<Swatch
							label={labels.label}
							style={this.props.style}
							color={this.props.value}
						/>
					</span>
				</label>
			);
		} else if (this.props.variant === 'button-group') {
			radio = (
				<label className="slds-radio_button__label" htmlFor={this.getId()}>
					<span className="slds-radio_faux">{labels.label}</span>
				</label>
			);
		} else if (this.props.variant === 'visual-picker') {
			radio = (
				<label htmlFor={this.getId()}>
					{this.props.coverable ? (
						<div className="slds-visual-picker__figure slds-visual-picker__icon slds-align_absolute-center">
							<span className="slds-is-selected">
								{this.props.onRenderVisualPickerSelected()}
							</span>
							<span className="slds-is-not-selected">
								{this.props.onRenderVisualPickerNotSelected()}
							</span>
						</div>
					) : (
						<span className="slds-visual-picker__figure slds-visual-picker__text slds-align_absolute-center">
							{this.props.onRenderVisualPicker()}
						</span>
					)}
					{!this.props.vertical ? (
						<span className="slds-visual-picker__body">
							{labels.heading ? (
								<span className="slds-text-heading_small">
									{labels.heading}
								</span>
							) : null}
							<span className="slds-text-title">{labels.label}</span>
						</span>
					) : null}
					{!this.props.coverable ? (
						<span className="slds-icon_container slds-visual-picker__text-check">
							<Icon
								assistiveText={this.props.assistiveText}
								category="utility"
								name="check"
								colorVariant="base"
								size="x-small"
							/>
						</span>
					) : null}
				</label>
			);
		} else {
			radio = (
				<label
					className="slds-radio__label"
					htmlFor={this.getId()}
					id={this.props.labelId}
				>
					<span className="slds-radio_faux" />
					<span className="slds-form-element__label">{labels.label}</span>
					{this.props.assistiveText.label ? (
						<span className="slds-assistive-text">
							{this.props.assistiveText.label}
						</span>
					) : null}
				</label>
			);
		}

		return (
			<span
				className={classNames(
					this.props.variant === 'visual-picker'
						? `slds-visual-picker_${this.props.size}`
						: null,
					{
						'slds-radio':
							this.props.variant === 'base' || this.props.variant === 'swatch',
						'slds-button slds-radio_button':
							this.props.variant === 'button-group',
						'slds-visual-picker': this.props.variant === 'visual-picker',
						'slds-visual-picker_vertical':
							this.props.variant === 'visual-picker' && this.props.vertical,
					},
					this.props.className
				)}
			>
				<input
					type="radio"
					id={this.getId()}
					name={this.props.name}
					value={this.props.value}
					/* A form element should not have both checked and defaultChecked props. */
					{...(this.props.checked !== undefined
						? { checked: this.props.checked }
						: { defaultChecked: this.props.defaultChecked })}
					onFocus={this.props.onFocus}
					onChange={(event) => {
						this.handleChange(event);
					}}
					onClick={(event) => {
						if (this.props.checked && this.props.deselectable) {
							this.handleChange(event);
						}
					}}
					onKeyPress={(event) => {
						const { charCode } = event;

						if (
							charCode === KEYS.SPACE &&
							this.props.checked &&
							this.props.deselectable
						) {
							this.handleChange(event, true);
						} else if (
							(charCode === KEYS.ENTER &&
								this.props.checked &&
								this.props.deselectable) ||
							!this.props.checked
						) {
							this.handleChange(event);
						}
					}}
					disabled={this.props.disabled}
					tabIndex={this.props.tabIndex}
					{...ariaProps}
					{...dataProps}
					ref={(input) => {
						if (this.props.refs && this.props.refs.input) {
							this.props.refs.input(input);
						}
						if (input && this.props.requestFocus && this.props.onRequestFocus) {
							this.props.onRequestFocus(input);
						}
					}}
				/>
				{radio}
			</span>
		);
	}
}

Radio.displayName = RADIO;
Radio.propTypes = propTypes;
Radio.defaultProps = defaultProps;

export default Radio;
