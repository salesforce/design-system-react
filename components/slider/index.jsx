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

const propTypes = {
	/**
	 * Set the HTML `id` of the card. This also sets the `id` of the filter and the header actions.
	 */
	id: PropTypes.string,
	/**
	 * Name of the submitted form parameter.
	 */
	name: PropTypes.string,
	/**
	 * This label appears above the Slider.
	 */
	label: PropTypes.string,
	/**
	 * The Slider is a controlled component, and will always display this value.
	 */
	value: PropTypes.number,
	/**
	 * Minimum value of a specified range.
	 */
	min: PropTypes.number,
	/**
	 * Maximum value of a specified range.
	 */
	max: PropTypes.number,
	/**
	 * Indicates the granularity that is expected by limiting the allowed values.
	 */
	step: PropTypes.number,
	/**
	 * Disables the Slider and prevents clicking it.
	 */
	disabled: PropTypes.bool,
	/**
	 * Size of the slider.
	 */
	size: PropTypes.oneOf(['x-small', 'small', 'medium', 'large']),
	/**
	 * Modifier that makes the slider vertical
	 */
	vertical: PropTypes.bool,
	/**
	 * Class names to be added to the outer container of the Slider.
	 */
	className: PropTypes.oneOfType([
		PropTypes.array,
		PropTypes.object,
		PropTypes.string,
	]),
	/**
	 * Message to display when the Slider is in an error state. When this is present, also visually highlights the component as in error.
	 */
	errorText: PropTypes.string,
	/**
	 * The `aria-describedby` attribute is used to indicate the IDs of the elements that describe the object. It is used to establish a relationship between widgets or groups and text that described them. This is very similar to aria-labelledby: a label describes the essence of an object, while a description provides more information that the user might need.
	 */
	'aria-describedby': PropTypes.string,
	/**
	 * Text that is visually hidden but read aloud by screenreaders to tell the user what the Slider is for.
	 * If the Slider has a visible label, you can omit the <code>assistiveText</code> prop and use the <code>label</code> prop.
	 */
	assistiveText: PropTypes.object,
	/**
	 * This event fires whenever the user has modified the data of the control.
	 */
	onChange: PropTypes.func,
	/**
	 * This event fires when the value is committed.
	 */
	onInput: PropTypes.func
};

const defaultProps = {
	value: 0,
	min: 0,
	max: 100,
	step: 1
};

/**
 * The ability to style sliders with CSS varies across browsers. Using this component ensures sliders look the same everywhere.
 */
class Slider extends React.Component {
	static displayName = SLIDER;
	static propTypes = propTypes;
	static defaultProps = defaultProps;


	constructor (props) {
		super(props);

		this.generatedId = shortid.generate();

		if (this.props.errorText) {
			this.generatedErrorId = shortid.generate();
		}

		this.state = {
			value: props.value
		};
	}

	getId () {
		return this.props.id || this.generatedId;
	}

	getErrorId () {
		return this.props['aria-describedby'] || this.generatedErrorId;
	}

	handleChange = (event) => {
		this.setState(({ value: event.target.value }));

		if (isFunction(this.props.onChange)) {
			this.props.onChange(event.target.value, event);
		}
	}

	handleInput = (event) => {
		if (isFunction(this.props.onInput)) {
			this.props.onInput(event.target.value, event);
		}
	}

	render () {
		const labelText =
			this.props.label || (this.props.assistiveText && this.props.assistiveText.label);

		return (
			<div className={classNames('slds-form-element', {
				'slds-has-error': this.props.errorText,
			},
			this.props.className
			)}>
				<label
					className={classNames('slds-form-element__label', {
						'slds-assistive-text': this.props.assistiveText && !this.props.label
					})}
					htmlFor={this.getId()}
				>
					<span className="slds-slider-label">
						{labelText ? (
							<span className="slds-slider-label__label">{labelText}</span>
						) : null}
						<span className="slds-slider-label__range">{this.props.min} - {this.props.max}</span>
					</span>
				</label>
				<div className="slds-form-element__control">
					<div className={classNames('slds-slider', {
						'slds-slider_vertical': this.props.vertical,
						'slds-size_x-small': this.props.size === 'x-small',
						'slds-size_small': this.props.size === 'small',
						'slds-size_medium': this.props.size === 'medium',
						'slds-size_large': this.props.size === 'large'
					})}>
						<input
							type="range"
							id={this.getId()}
							name={this.props.name}
							className="slds-slider__range"
							value={this.state.value}
							min={this.props.min}
							max={this.props.max}
							step={this.props.step}
							aria-describedby={this.getErrorId()}
							disabled={this.props.disabled}
							onChange={this.handleChange}
							onInput={this.handleInput}
						/>
						<span
							className="slds-slider__value"
							aria-hidden="true"
						>
							{this.state.value}
						</span>
					</div>
					{this.props.errorText ? (
						<div
							id={this.getErrorId()}
							className="slds-form-element__help"
						>
							{this.props.errorText}
						</div>
					) : null}
				</div>
			</div>
		);
	}
};

export default Slider;
