/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

// # Panel - Filter variant

// Implements the [Panel design pattern](https://www.lightningdesignsystem.com/components/panels) in React.
// Based on SLDS v2.2.0-rc.1

// ## Dependencies

// ### React
import React from 'react';
import PropTypes from 'prop-types';

// ### classNames
import classNames from 'classnames';

// ## Constants
import { PANEL } from '../../utilities/constants';

/**
 * A panel provides detailed contextual information or contextual filtering options. [Filter](/components/filters/) component should be used as children. Menus within a Filter Popover will need to not have "portal mounts" and be inline. */
const Panel = ({ children, variant }) => (
	<div
		className={classNames(
			'slds-panel',
			'slds-grid',
			'slds-grid--vertical',
			'slds-nowrap', {
				'slds-panel--filters': variant === 'filters'
			})}
	>
		<div className="slds-form--stacked slds-grow slds-scrollable--y slds-grid slds-grid--vertical">
			{children}
		</div>
	</div>
);

Panel.displayName = PANEL;

Panel.propTypes = {
	/**
	 * The contents of the panel
	 */
	children: PropTypes.node,
	/**
	 * The type of panel
	 */
	variant: PropTypes.oneOf(['filters'])
};

export default Panel;
