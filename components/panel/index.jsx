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

function Panel(props) {
	return (
		<div
			className={classNames(
				'slds-panel',
				'slds-grid',
				'slds-grid_vertical',
				'slds-nowrap',
				{
					'slds-panel_filters': props.variant === 'filters',
				},
				props.className
			)}
		>
			<div className="slds-form_stacked slds-grow slds-scrollable_y slds-grid slds-grid_vertical">
				{props.children}
			</div>
		</div>
	);
}

Panel.displayName = PANEL;

Panel.propTypes = {
	/**
	 * The contents of the panel
	 */
	children: PropTypes.node,
	/**
	 * CSS classes to be added to `slds-panel`.
	 */
	className: PropTypes.oneOfType([
		PropTypes.array,
		PropTypes.object,
		PropTypes.string,
	]),
	/**
	 * The type of panel
	 */
	variant: PropTypes.oneOf(['filters']),
};

export default Panel;
