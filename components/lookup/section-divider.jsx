/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

import React from 'react';
import PropTypes from 'prop-types';

const displayName = 'LookupDefaultSectionDivider';
const propTypes = {
	data: PropTypes.object,
};

const DefaultSectionDivider = (props) => (
	<li className="slds-p-around_x-small slds-lookup__divider" tabIndex="-1">
		<span className="slds-m-left_x-small">
			<strong>{props.data.label}</strong>
		</span>
	</li>
);

DefaultSectionDivider.displayName = displayName;
DefaultSectionDivider.propTypes = propTypes;

export default DefaultSectionDivider;
