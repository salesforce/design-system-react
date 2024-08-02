/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

// # List Item Label Component

// ## Dependencies

// ### React
import React from 'react';
import PropTypes from 'prop-types';

// ## Constants
import { LIST_ITEM_LABEL } from '../../../utilities/constants';

/**
 * Component description.
 */
const ListItemLabel = ({ label = '', icon }) => (
	<span className="slds-truncate" title={label}>
		{icon}
		{label}
	</span>
);

ListItemLabel.displayName = LIST_ITEM_LABEL;

ListItemLabel.propTypes = {
	data: PropTypes.object,
	icon: PropTypes.node,
	index: PropTypes.number,
	inverted: PropTypes.bool,
	isSelected: PropTypes.bool,
	label: PropTypes.string,
	value: PropTypes.any,
};

export default ListItemLabel;
