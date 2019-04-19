/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

import React from 'react';
import PropTypes from 'prop-types';

import Dropdown from '../../menu-dropdown';
/* eslint-disable react/no-did-update-set-state */

const displayName = 'Breadcrumbs-Overflow-Menu';
const propTypes = {
	/**
	 * Callback function for selection of the menu item
	 */
	onSelect: PropTypes.func,
	/**
	 * Array of items to be shown in the dropdown menu
	 */
	items: PropTypes.array,
};
const defaultProps = {};
const Menu = (props) => (
	<Dropdown
		id={`${props.id}-dropdown`}
		assistiveText={{ icon: 'Show More' }}
		threedots
		iconCategory="utility"
		iconName="threedots"
		iconVariant="bare"
		onSelect={props.onSelect}
		options={props.items}
	/>
);

Menu.displayName = displayName;
Menu.propTypes = propTypes;
Menu.defaultProps = defaultProps;

export default Menu;
