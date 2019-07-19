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
const ListItemLabel = (props) => (
	<span className="slds-truncate" title={props.label}>
		{props.icon}
		{props.label}
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

ListItemLabel.defaultProps = {
	data: {},
	index: 0,
	inverted: false,
	isSelected: false,
	label: '',
	value: null,
};

export default ListItemLabel;
