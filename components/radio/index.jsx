/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

import React from 'react';
import PropTypes from 'prop-types';
import shortid from 'shortid';
import classNames from 'classnames';

import { RADIO } from '../../utilities/constants';

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
	 * This is the initial value of an uncontrolled form element and is present only to provide compatibility
	 * with hybrid framework applications that are not entirely React. It should only be used in an application
	 * without centralized state (Redux, Flux). "Controlled components" with centralized state is highly recommended.
	 * See [Code Overview](https://github.com/salesforce/design-system-react/blob/master/docs/codebase-overview.md#controlled-and-uncontrolled-components) for more information.
	 */
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
	 * This event fires when the radio selection changes.
	 */
	onChange: PropTypes.func,
	/**
	 * The value of this radio input.
	 */
	value: PropTypes.string,
	/**
	 * Variant of the Radio button. Base is the default and button-group makes the radio button look like a normal button (should be a child of <RadioButtonGroup>).
	 */
	variant: PropTypes.oneOf(['base', 'button-group']),
};

const defaultProps = {
	variant: 'base',
};

/**
 * A radio input that can have a single input checked at any one time. Radios should be wrapped with
 * a [RadioGroup](/components/radio-group) or [RadioButtonGroup](/components/radio-button-group)
 */
class Radio extends React.Component {
	constructor (props) {
		super(props);
		this.generatedId = shortid.generate();
	}

	getId () {
		return this.props.id || this.generatedId;
	}

	render () {
		return (
			<span
				className={classNames({
					'slds-radio': this.props.variant === 'base',
					'slds-button slds-radio_button':
						this.props.variant === 'button-group',
				})}
			>
				<input
					type="radio"
					id={this.getId()}
					name={this.props.name}
					value={this.props.value}
					checked={this.props.checked}
					defaultChecked={this.props.defaultChecked}
					onChange={this.props.onChange}
					aria-describedby={this.props['aria-describedby']}
					disabled={this.props.disabled}
				/>
				{this.props.variant === 'button-group' ? (
					<label className="slds-radio_button__label" htmlFor={this.getId()}>
						<span className="slds-radio_faux">{this.props.label}</span>
					</label>
				) : (
					<label className="slds-radio__label" htmlFor={this.getId()}>
						<span className="slds-radio_faux" />
						<span className="slds-form-element__label">{this.props.label}</span>
					</label>
				)}
			</span>
		);
	}
}

Radio.displayName = RADIO;
Radio.propTypes = propTypes;
Radio.defaultProps = defaultProps;

export default Radio;
