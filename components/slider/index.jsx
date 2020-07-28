/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

// # Slider Component

// Implements the [Slider design pattern](https://www.lightningdesignsystem.com/components/slider/) in React.

// ### React
import React from 'react';
import PropTypes from 'prop-types';

// ### isFunction
import isFunction from 'lodash.isfunction';

// ### classNames
import classNames from 'classnames';

// ### shortid
// [npmjs.com/package/shortid](https://www.npmjs.com/package/shortid)
// shortid is a short, non-sequential, url-friendly, unique id generator
import shortid from 'shortid';

import { SLIDER } from '../../utilities/constants';

import getAriaProps from '../../utilities/get-aria-props';

const propTypes = {
	/**
	 * The `aria-describedby` attribute is used to indicate the IDs of the elements that describe the object. It is used to establish a relationship between widgets or groups and text that described them. This is very similar to aria-labelledby: a label describes the essence of an object, while a description provides more information that the user might need.
	 */
	'aria-describedby': PropTypes.string,
	/**
	 * Assistive text for accessibility**
	 * `disabled`: Read by screen readers to indicate a disabled slider
	 * `label`: Visually hidden label but read out loud by screen readers.
	 */
	assistiveText: PropTypes.shape({
		disabled: PropTypes.string,
		label: PropTypes.string,
	}),
	/**
	 * Class names to be added to the outer container of the Slider.
	 */
	classNameContainer: PropTypes.oneOfType([
		PropTypes.array,
		PropTypes.object,
		PropTypes.string,
	]),
	/**
	 * This is the initial value of an uncontrolled form element and is present
	 * only to provide compatibility with hybrid framework applications that
	 * are not entirely React. It should only be used in an application without
	 * centralized state (Redux, Flux). "Controlled components" with centralized
	 * state is highly recommended. See [Code Overview](https://github.com/salesforce/design-system-react/blob/master/docs/codebase-overview.md#controlled-and-uncontrolled-components) for more information.
	 */
	defaultValue: PropTypes.number,
	/**
	 * Disables the Slider and prevents clicking it. Only available on the horizontal view.
	 */
	disabled: PropTypes.bool,
	/**
	 * Message to display when the Slider is in an error state. When this is present, also visually highlights the component as in error.
	 */
	errorText: PropTypes.string,
	/**
	 * Set the HTML `id` of the slider.
	 */
	id: PropTypes.string,
	/**
	 * This label appears above the Slider.
	 */
	label: PropTypes.string,
	/**
	 * Maximum value of a specified range. Defaults to 100.
	 */
	max: PropTypes.number,
	/**
	 * Minimum value of a specified range. Defaults to 0.
	 */
	min: PropTypes.number,
	/**
	 * Name of the submitted form parameter.
	 */
	name: PropTypes.string,
	/**
	 * This event fires whenever the user has modified the data of the control. This callback recieves the following parameters `event, { value: [string] }`.
	 */
	onChange: PropTypes.func,
	/**
	 * This event fires when the value is committed. This callback recieves the following parameters `event, { value: [string] }`.
	 */
	onInput: PropTypes.func,
	/**
	 * Size of the slider.
	 */
	size: PropTypes.oneOf(['x-small', 'small', 'medium', 'large']),
	/**
	 * By default, the granularity is 1 and the value is always an integer. For example, If you need a value between 5 and 10, accurate to two decimal places, you should set the value of step to 0.01
	 */
	step: PropTypes.number,
	/**
	 * The Slider should be a controlled component, and will always display this value. This should always be used if you are using a Flux/Redux framework.
	 */
	value: PropTypes.number,
	/**
	 * Modifier that makes the slider vertical
	 */
	vertical: PropTypes.bool,
};

const defaultProps = {
	assistiveText: { disabled: 'Disabled' },
	min: 0,
	max: 100,
	step: 1,
};

/**
 * The ability to style sliders with CSS varies across browsers. Using this component ensures sliders look the same everywhere.
 */
class Slider extends React.Component {
	static displayName = SLIDER;

	static propTypes = propTypes;

	static defaultProps = defaultProps;

	constructor(props) {
		super(props);

		this.generatedId = shortid.generate();

		if (this.props.errorText) {
			this.generatedErrorId = shortid.generate();
		}
	}

	getId() {
		return this.props.id || this.generatedId;
	}

	getErrorId() {
		return this.props['aria-describedby'] || this.generatedErrorId;
	}

	handleChange = (event) => {
		if (isFunction(this.props.onChange)) {
			this.props.onChange(event, { value: Number(event.target.value) });
		}
	};

	handleInput = (event) => {
		if (isFunction(this.props.onInput)) {
			this.props.onInput(event, { value: Number(event.target.value) });
		}
	};

	render() {
		const ariaProps = getAriaProps(this.props);
		ariaProps['aria-describedby'] = this.getErrorId();

		const assistiveText = {
			...defaultProps.assistiveText,
			...this.props.assistiveText,
		};
		const labelText =
			this.props.label ||
			(this.props.assistiveText && this.props.assistiveText.label);

		return (
			<div
				className={classNames(
					'slds-form-element',
					{
						'slds-has-error': this.props.errorText,
					},
					this.props.classNameContainer
				)}
			>
				<label
					className={classNames('slds-form-element__label', {
						'slds-assistive-text':
							this.props.assistiveText && !this.props.label,
					})}
					htmlFor={this.getId()}
				>
					<span className="slds-slider-label">
						{labelText ? (
							<span className="slds-slider-label__label">{labelText}</span>
						) : null}
						<span className="slds-slider-label__range">
							{this.props.min}
							{' - '}
							{this.props.max}
						</span>
						{this.props.disabled ? (
							<span className="slds-assistive-text">
								{' '}
								{assistiveText.disabled}
							</span>
						) : null}
					</span>
				</label>
				<div className="slds-form-element__control">
					<div
						className={classNames('slds-slider', {
							'slds-slider_vertical': this.props.vertical,
							'slds-size_x-small': this.props.size === 'x-small',
							'slds-size_small': this.props.size === 'small',
							'slds-size_medium': this.props.size === 'medium',
							'slds-size_large': this.props.size === 'large',
						})}
					>
						<input
							type="range"
							id={this.getId()}
							name={this.props.name}
							className="slds-slider__range"
							min={this.props.min}
							max={this.props.max}
							step={this.props.step}
							disabled={this.props.disabled}
							onChange={this.handleChange}
							onInput={this.handleInput}
							{...ariaProps}
							/* A form element should not have both value and defaultValue props. */
							{...(this.props.value !== undefined
								? { value: this.props.value }
								: { defaultValue: this.props.defaultValue })}
						/>
						<span className="slds-slider__value" aria-hidden="true">
							{this.props.value || this.props.defaultValue || '0'}
						</span>
					</div>
					{this.props.errorText ? (
						<div id={this.getErrorId()} className="slds-form-element__help">
							{this.props.errorText}
						</div>
					) : null}
				</div>
			</div>
		);
	}
}

export default Slider;
