/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

import React from 'react';
import PropTypes from 'prop-types';
import isEqual from 'lodash.isequal';

import MenuItem from './menu-item';

const propTypes = {
	/*
	 * Active descendant in menu
	 */
	activeOption: PropTypes.object,
	/*
	 * Index of active descendant in menu
	 */
	activeOptionIndex: PropTypes.number,
	/*
	 * Id used for assistive technology
	 */
	id: PropTypes.string,
	/*
	 * Menu options
	 */
	options: PropTypes.array,
	/*
	 * Callback to remove active descendent
	 */
	resetActiveOption: PropTypes.func,
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
	let hasAValidActiveDescendent;

	const menuItems = props.options.map((optionData, index) => {
		const active = index === props.activeOptionIndex && isEqual(optionData, props.activeOption);
		if (!hasAValidActiveDescendent) {
			hasAValidActiveDescendent = active;
		}
		return (
			<li
				className="slds-listbox__item"
				key={`pill-${optionData.label}`}
				role="presentation"
			>
				<MenuItem
					active={active}
					option={optionData}
					onSelect={props.onSelect}
					selection={props.selection}
				/>
			</li>
		);
	});

	if (props.activeOption && !hasAValidActiveDescendent) {
		props.clearActiveOption();
	}

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
