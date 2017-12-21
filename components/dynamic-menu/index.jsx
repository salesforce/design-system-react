/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

// Implements the [Accordion design
// pattern](https://www.lightningdesignsystem.com/components/accordion/) in
// React. Based on SLDS v2.4.3

import React from 'react';
import PropTypes from 'prop-types';
import IconSettings from '../icon-settings';
import Popover from '../popover';

import { DYNAMIC_MENU } from '../../utilities/constants';


// ### Display Name Always use the canonical component name as the React display
// name.

const displayName = DYNAMIC_MENU;

// TODO: Add propType descriptions for documentation
const propTypes = {
	availableItems: PropTypes.array,
	children: PropTypes.node,
	onRemoveSelection: PropTypes.func,
	searchBoxPlaceholder: PropTypes.string,
	popoverOptions: PropTypes.arrayOf(PropTypes.node),
	popoverTriggerElement: PropTypes.node
};

const DynamicMenu = (props) => {
	const {
		children,
		popoverTriggerElement,
		popoverOptions
	} = props;

	return (
		<IconSettings iconPath="/assets/icons">
			<Popover
				align="bottom left"
				isOpen
				body={<div className="slds-form-element">
					<div className="slds-form-element__control">
						<div className="slds-combobox_container">
							{children}
						</div>
						<div>
							{popoverOptions.map((option) => option)}
						</div>
					</div>
				</div>}
				heading="Confirmation"
			>
				{popoverTriggerElement}
			</Popover>
		</IconSettings>
	);
};

export default DynamicMenu;

DynamicMenu.propTypes = propTypes;
DynamicMenu.displayName = displayName;

module.exports = DynamicMenu;
