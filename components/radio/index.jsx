/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

import React from 'react';
import PropTypes from 'prop-types';
import shortid from 'shortid';
import classNames from 'classnames';

import KEYS from '../../utilities/key-code';
import { RADIO } from '../../utilities/constants';
import getDataProps from '../../utilities/get-data-props';
import Swatch from '../../components/color-picker/private/swatch';

const propTypes = {
	/**
	 * The ID of an element that describes this radio input. Often used for error messages.
	 */
	'aria-describedby': PropTypes.string,
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
	]) /**
	 * This is the initial value of an uncontrolled form element and is present only to provide compatibility
	 * with hybrid framework applications that are not entirely React. It should only be used in an application
	 * without centralized state (Redux, Flux). "Controlled components" with centralized state is highly recommended.
	 * See [Code Overview](https://github.com/salesforce/design-system-react/blob/master/docs/codebase-overview.md#controlled-and-uncontrolled-components) for more information.
	 */,
	defaultChecked: PropTypes.bool,
	/**
	 * Disable this radio input.
	 */
	disabled: PropTypes.bool,
	/**
	 * A unique ID that is used to associating a label to the `input` element. This ID is added to the `input` element.
	 */
	id: PropTypes.string,
	/**
	 * The string or element that is shown as both the title and the label for this radio input.
	 */
	label: PropTypes.oneOfType([PropTypes.string, PropTypes.element]).isRequired,
	/**
	 * The name of the radio input group.
	 */
	name: PropTypes.string,
	/**
	 * This event fires when the radio selection changes. Passes in `event, { checked }`.
	 */
	onChange: PropTypes.func,
	/**
	 * The value of this radio input.
	 */
	value: PropTypes.string,
	/**
	 * Variant of the Radio button. Base is the default and button-group makes the radio button look like a normal button (should be a child of <RadioButtonGroup>).
	 */
	variant: PropTypes.oneOf(['base', 'button-group', 'swatch']),
	/**
	 * Ref callback that will pass in the radio's `input` tag
	 */
	refs: PropTypes.shape({
		input: PropTypes.func,
	}),
};

const defaultProps = {
	variant: 'base',
};

/**
 * A radio input that can have a single input checked at any one time. Radios should be wrapped with
 * a [RadioGroup](/components/radio-group) or [RadioButtonGroup](/components/radio-button-group)
 */
class Radio extends React.Component {
	constructor(props) {
		super(props);
		this.generatedId = shortid.generate();
		this.preventDuplicateChangeEvent = false;
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
		const dataProps = getDataProps(this.props);

		let radio;

		if (this.props.variant === 'swatch') {
			radio = (
				<label
					style={{ border: '1px' }}
					className="slds-radio_button__label"
					htmlFor={this.getId()}
				>
					<span>
						<Swatch
							label={this.props.label}
							style={this.props.style}
							color={this.props.value}
						/>
					</span>
				</label>
			);
		} else if (this.props.variant === 'button-group')
			radio = (
				<label className="slds-radio_button__label" htmlFor={this.getId()}>
					<span className="slds-radio_faux">{this.props.label}</span>
				</label>
			);
		else {
			radio = (
				<label className="slds-radio__label" htmlFor={this.getId()}>
					<span className="slds-radio_faux" />
					<span className="slds-form-element__label">{this.props.label}</span>
				</label>
			);
		}

		return (
			<span
				className={classNames(
					{
						'slds-radio':
							this.props.variant === 'base' || this.props.variant === 'swatch',
						'slds-button slds-radio_button':
							this.props.variant === 'button-group',
					},
					this.props.className
				)}
			>
				<input
					type="radio"
					id={this.getId()}
					name={this.props.name}
					value={this.props.value}
					checked={this.props.checked}
					defaultChecked={this.props.defaultChecked}
					onChange={(event) => {
						this.handleChange(event);
					}}
					onClick={(event) => {
						if (this.props.checked && this.props.deselectable) {
							this.handleChange(event);
						}
					}}
					onKeyPress={(event) => {
						const charCode = event.charCode;

						if (
							charCode === KEYS.SPACE &&
							this.props.checked &&
							this.props.deselectable
						) {
							this.handleChange(event, true);
						} else if (
							(charCode === KEYS.ENTER &&
								(this.props.checked && this.props.deselectable)) ||
							!this.props.checked
						) {
							this.handleChange(event);
						}
					}}
					aria-describedby={this.props['aria-describedby']}
					disabled={this.props.disabled}
					{...dataProps}
					ref={(input) => {
						if (this.props.refs && this.props.refs.input) {
							this.props.refs.input(input);
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
