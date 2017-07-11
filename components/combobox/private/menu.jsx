/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

import React from 'react';
import PropTypes from 'prop-types';

import MenuItem from './menu-item';

const propTypes = {
	/*
	 * Id used for assistive technology
	 */
	id: PropTypes.string,
	/*
	 * Menu options
	 */
	options: PropTypes.array,
	/*
	 * Callback when item is selected with keyboard or mouse
	 */
	onSelect: PropTypes.func,
	/*
	 * Selected options
	 */
	selection: PropTypes.array
};

const defaultProps = {
	labels: {},
	events: {}
};

const Menu = (props) => {
	const menuItems = props.options.map((optionData) => {
		return (
			<li
				className="slds-listbox__item"
				key={`pill-${optionData.label}`}
				role="presentation"
			>
				<MenuItem
					option={optionData}
					onSelect={props.onSelect}
					selection={props.selection}
				/>
			</li>
		);
	});

	return (
		<div id={`listbox-${props.id}`} role="listbox">
			<ul className="slds-listbox slds-listbox_vertical slds-dropdown slds-dropdown_fluid" role="presentation">
				{menuItems}
			</ul>
		</div>
	);
};

Menu.displayName = 'Menu';
Menu.propTypes = propTypes;
Menu.defaultProps = defaultProps;

export default Menu;
