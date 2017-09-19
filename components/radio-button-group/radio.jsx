/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

import React from 'react';
import PropTypes from 'prop-types';
import shortid from 'shortid';

import { RADIO } from '../../utilities/constants';

const propTypes = {
	/**
	 * A unique ID that is used to associating a label to the `input` element. This ID is added to the `input` element.
	 */
	id: PropTypes.string,
	/**
	 * The string or element that is shown as both the title and the label for this radio input.
	 */
	label: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
	/**
	 * The value of this radio input.
	 */
	value: PropTypes.string,
	/**
	 * The name of the radio input group.
	 */
	name: PropTypes.string,
	/**
	 * This is a controlled component. This radio is checked according to this value.
	 */
	checked: PropTypes.bool,
	/**
	 * This event fires when the radio selection changes.
	 */
	onChange: PropTypes.func,
	/**
	 * The ID of an element that describe this radio input.
	 */
	'aria-describedby': PropTypes.string,
	/**
	 * Disable this radio input.
	 */
	disabled: PropTypes.bool
};

/**
 * A radio input that is nested inside a RadioButtonGroup.
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
			<span className="slds-button slds-radio_button">
				<input
					type="radio"
					id={this.getId()}
					name={this.props.name}
					value={this.props.value}
					checked={!this.props.disabled && this.props.checked}
					onChange={this.props.onChange}
					aria-describedby={this.props['aria-describedby']}
					disabled={this.props.disabled}
				/>
				<label className="slds-radio_button__label" htmlFor={this.getId()}>
					<span className="slds-radio_faux">{this.props.label}</span>
				</label>
			</span>
		);
	}

}

Radio.displayName = RADIO;
Radio.propTypes = propTypes;

module.exports = Radio;
