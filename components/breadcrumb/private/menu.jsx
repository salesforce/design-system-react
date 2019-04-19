/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

import React from 'react';
import PropTypes from 'prop-types';

import Dropdown from '../../menu-dropdown';
/* eslint-disable react/no-did-update-set-state */

const displayName = 'Breadcrumbs-Overflow-Menu';
const propTypes = {
	items: PropTypes.array,
};
const defaultProps = {};
const Menu = (props) => (
	<Dropdown
		assistiveText={{ icon: 'Show More' }}
		threedots
		iconCategory="utility"
		iconName="threedots"
		iconVariant="bare"
		onSelect={(value) => {
			console.log('selected: ', value);
		}}
		options={props.items}
	/>
);

Menu.displayName = displayName;
Menu.propTypes = propTypes;
Menu.defaultProps = defaultProps;

export default Menu;
