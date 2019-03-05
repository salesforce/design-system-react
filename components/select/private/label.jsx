/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
	/**
	 * The label for the select component.
	 */
	label: PropTypes.string.isRequired /**
	 * Every label must have a unique ID in order to support keyboard navigation and ARIA support.
	 */,
	id: PropTypes.string.isRequired /**
	 * Highlights the input as a required field (does not perform any validation).
	 */,
	required: PropTypes.bool,
};

const defaultProps = {
	required: 'false',
};

/**
 * The label for the Select component
 */
const Label = ({ label, id, required }) => (
	<label className="slds-form-element__label" htmlFor={id}>
		{required === true ? (
			<abbr className="slds-required" title="required">
				*
			</abbr>
		) : (
			''
		)}
		{label}
	</label>
);

Label.propTypes = propTypes;
Label.defaultProps = defaultProps;

export default Label;
