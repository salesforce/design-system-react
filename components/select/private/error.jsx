/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
	/**
	 * Message to display when the input is in an error state. When this is present, also visually highlights the component as in error.
	 */
	errorText: PropTypes.oneOfType([PropTypes.node, PropTypes.string]) /**
	 * Every label must have a unique ID in order to support keyboard navigation and ARIA support.
	 */,
	id: PropTypes.string.isRequired,
};

/**
 * The error text for the Select component
 */
const Error = ({ errorText, id }) => (
	<div className="slds-form-element__help" id={id}>
		{errorText}
	</div>
);

Error.propTypes = propTypes;

export default Error;
