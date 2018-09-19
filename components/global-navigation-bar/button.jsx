/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

// # Global Navigation Bar Button Component

// ## Dependencies

// ### React
import React from 'react';
import PropTypes from 'prop-types';

// ### classNames
import classNames from 'classnames';

// ### Button
import Button from '../button';

// ## Constants
import { GLOBAL_NAVIGATION_BAR_BUTTON } from '../../utilities/constants';

/**
 * A helper component that renders a Button as an item in the Global Navigation Bar. All props are passed onto `Button` except `active` and `dividerPosition`.
 */
const GlobalNavigationButton = ({ active, dividerPosition, ...props }) => (
	<li
		className={classNames('slds-context-bar__item', {
			'slds-is-active': active,
			[`slds-context-bar__item_divider-${dividerPosition}`]: dividerPosition,
		})}
	>
		<Button {...props} />
	</li>
);

GlobalNavigationButton.displayName = GLOBAL_NAVIGATION_BAR_BUTTON;

// ### Prop Types
GlobalNavigationButton.propTypes = {
	/**
	 * Whether the item is active or not.
	 */
	active: PropTypes.bool,
	/**
	 * Determines position of separating bar.
	 */
	dividerPosition: PropTypes.oneOf(['left', 'right']),
};

// ### Default Props
GlobalNavigationButton.defaultProps = {
	className: 'slds-context-bar__label-action slds-text-body_regular',
	// This is a hack since buttons are not supported by Global Navigation
	// Bar and have different `font-size` and `line-height` than links or
	// dropdowns.
	style: { lineHeight: 'inherit' },
	variant: 'base',
};

export default GlobalNavigationButton;
