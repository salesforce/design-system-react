/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

// # FIlter List Heading

// Implements the [Panel design pattern](https://www.lightningdesignsystem.com/components/panels) in React.
// Based on SLDS v2.2.0-rc.1

// ## Dependencies

// ### React
import React from 'react';
import PropTypes from 'prop-types';

// ### classNames
import classNames from 'classnames';

import Icon from '../../icon';

// ## Constants
import { PANEL_FILTER_LIST_HEADING } from '../../../utilities/constants';

/**
 * A filtering panel contextual filtering options.
 */
const PanelFilterListHeading = ({ heading, isLocked, lockedHeading }) => (
	<h3
		className={classNames('slds-text-body_small', 'slds-m-vertical_x-small', {
			'slds-grid': isLocked,
		})}
	>
		{isLocked ? lockedHeading : heading}
		{isLocked ? (
			<Icon
				className="slds-m-left_x-small"
				assistiveText={{ label: 'locked' }}
				category="utility"
				name="lock"
				size="x-small"
			/>
		) : null}
	</h3>
);

PanelFilterListHeading.displayName = PANEL_FILTER_LIST_HEADING;

PanelFilterListHeading.propTypes = {
	/**
	 * Heading for following PanelFilterList
	 */
	heading: PropTypes.oneOfType([PropTypes.node, PropTypes.string]),
	/**
	 * Displayed a heading for a locked list of filters
	 */
	isLocked: PropTypes.bool,
	/**
	 * Heading for a group of filters that are locked
	 */
	lockedHeading: PropTypes.string,
};

PanelFilterListHeading.defaultProps = {
	heading: 'Matching all these filters',
	lockedHeading: 'Locked filters',
};

export default PanelFilterListHeading;
