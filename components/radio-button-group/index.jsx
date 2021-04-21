/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

// Implements the [Radio Button Group design pattern](https://lightningdesignsystem.com/components/radio-button-group/) in React.
// Based on SLDS v2.5.0

import React from 'react';
import PropTypes from 'prop-types';

import RadioGroup from '../radio-group';

import { RADIO_BUTTON_GROUP } from '../../utilities/constants';

const propTypes = {
	/**
	 * **Assistive text for accessibility**
	 * * `label`: This label appears in the legend.
	 */
	assistiveText: PropTypes.shape({
		label: PropTypes.string,
	}),
	/**
	 * Children are expected to be Radio components.
	 */
	children: PropTypes.node.isRequired,
	/**
	 * Custom CSS classes added to `slds-radio_button-group` node.
	 */
	className: PropTypes.oneOfType([
		PropTypes.array,
		PropTypes.object,
		PropTypes.string,
	]),
	/**
	 * **Text labels for internationalization**
	 * This object is merged with the default props object on every render.
	 * * `error`: Message to display when any of Checkboxes are in an error state.
	 * * `label`: This label appears above the button group.
	 */
	labels: PropTypes.shape({
		error: PropTypes.string,
		label: PropTypes.string,
	}),
	/**
	 * This event fires when the radio selection changes.
	 */
	onChange: PropTypes.func,
	/**
	 * Disable all radio inputs.
	 */
	disabled: PropTypes.bool,
	/**
	 * Adds an indicator that this field is required.
	 */
	required: PropTypes.bool,
	/**
	 * The name of this radio group.
	 */
	name: PropTypes.string,
	/**
	 * The ID of the error message, for linking to radio inputs with aria-describedby.
	 */
	errorId: PropTypes.string,
};

const defaultProps = { labels: {}, assistiveText: {} };

/**
 * A styled select list that can have a single entry checked at any one time.
 * The RadioButtonGroup component wraps [Radio](/components/radios) components, which should be used as children.
 */
const RadioButtonGroup = (props) => {
	// Separate props we care about in order to pass others along passively to the dropdown component
	const { variant, ...rest } = props;

	return <RadioGroup variant="button-group" {...rest} />;
};

RadioButtonGroup.displayName = RADIO_BUTTON_GROUP;
RadioButtonGroup.propTypes = propTypes;
RadioButtonGroup.defaultProps = defaultProps;

export default RadioButtonGroup;
