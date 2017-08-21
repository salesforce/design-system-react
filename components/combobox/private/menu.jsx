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
	inputId: PropTypes.string,
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
	selection: PropTypes.array,
	/**
	 * Changes styles of the menu option
	 */
	variant: PropTypes.oneOf(['combobox-base', 'combobox-readonly'])
};

const defaultProps = {};

const Menu = (props) => {
	// let hasAValidActiveDescendent;

	const menuItems = props.options.map((optionData, index) => {
		const active = (index === props.activeOptionIndex
			&& isEqual(optionData, props.activeOption));
		return (
			<li
				className="slds-listbox__item"
				key={`menu-item-${optionData.id}`}
				role="presentation"
			>
				<MenuItem
					inputId={props.inputId}
					active={active}
					option={optionData}
					onSelect={props.onSelect}
					selection={props.selection}
					variant={props.variant}
				/>
			</li>
		);
	});

	return (
		<div id={`${props.inputId}-listbox`} role="listbox">
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
