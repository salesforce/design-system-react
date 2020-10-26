/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

/* eslint-disable jsx-a11y/no-redundant-roles */

// # Global Navigation Bar Region Component

// ## Dependencies

// ### React
import React from 'react';

import PropTypes from 'prop-types';

// ### classNames
import classNames from 'classnames';

// ## Constants
import { GLOBAL_NAVIGATION_BAR_REGION } from '../../utilities/constants';

// List regions for export
const regions = ['primary', 'secondary', 'tertiary'];

/* eslint-disable react/display-name */
const renderPrimary = (dividerClass, className, children) => (
	<div
		className={classNames('slds-context-bar__primary', dividerClass, className)}
	>
		{children}
	</div>
);

const renderSecondary = (dividerClass, className, children, navigation) => {
	let region;

	if (navigation) {
		region = (
			<nav
				className={classNames(
					'slds-context-bar__secondary',
					dividerClass,
					className
				)}
				role="navigation"
			>
				<ul className="slds-grid">{children}</ul>
			</nav>
		);
	} else {
		region = (
			<div
				className={classNames(
					'slds-context-bar__secondary',
					dividerClass,
					className
				)}
			>
				<ul className="slds-grid">{children}</ul>
			</div>
		);
	}
	return region;
};

const renderTertiary = (dividerClass, className, children) => (
	<div
		className={classNames(
			'slds-context-bar__tertiary',
			'slds-col_bump-left',
			dividerClass,
			className
		)}
	>
		<ul className="slds-grid">{children}</ul>
	</div>
);

function Region(props) {
	let region;
	const dividerClass = props.dividerPosition
		? `slds-context-bar__item_divider-${props.dividerPosition}`
		: null;

	switch (props.region) {
		case 'primary':
			region = renderPrimary(dividerClass, props.className, props.children);
			break;
		case 'secondary':
			region = renderSecondary(
				dividerClass,
				props.className,
				props.children,
				props.navigation
			);
			break;
		case 'tertiary':
			region = renderTertiary(dividerClass, props.className, props.children);
			break;
		default:
		// do nothing
	}

	return region;
}

Region.displayName = GLOBAL_NAVIGATION_BAR_REGION;

Region.propTypes = {
	/**
	 * Contents of region. Expects `GlobalNavigationBarLink`, `GlobalNavigationBarDropdown`, `GlobalNavigationBarApplicationName`, `AppSwitcher`, but could be any component. This is the place to pass in an Object Switcher until that is supported.
	 */
	children: PropTypes.node,
	/**
	 * Determines position of separating bar.
	 */
	dividerPosition: PropTypes.oneOf(['left', 'right']),
	/**
	 * CSS classes to be added to the region
	 */
	className: PropTypes.oneOfType([
		PropTypes.array,
		PropTypes.object,
		PropTypes.string,
	]),
	/**
	 * Wraps the `secondary` region in a `nav` and adds a role attribute
	 */
	navigation: PropTypes.bool,
	/**
	 * Region wrap children in styling specific to that region. When `tertiary`
	 * region is used, secondary region only supports four list items.
	 */
	region: PropTypes.oneOf(['primary', 'secondary', 'tertiary']).isRequired,
};

export default Region;
export { regions };
