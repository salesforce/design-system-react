/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */


// # List Item Label Component

// ## Dependencies

// ### React
import React from 'react';

// ## Constants
import { LIST_ITEM_LABEL } from '../../../utilities/constants';

/**
 * Component description.
 */
const ListItemLabel = (props) => (
	<span className="slds-truncate">
		{props.icon}
		{props.label}
	</span>
);

ListItemLabel.displayName = LIST_ITEM_LABEL;

ListItemLabel.propTypes = {
	data: React.PropTypes.object,
	icon: React.PropTypes.node,
	index: React.PropTypes.number,
	inverted: React.PropTypes.bool,
	isSelected: React.PropTypes.bool,
	label: React.PropTypes.string,
	value: React.PropTypes.any
};

ListItemLabel.defaultProps = {
	data: {},
	index: 0,
	inverted: false,
	isSelected: false,
	label: '',
	value: null
};

module.exports = ListItemLabel;
