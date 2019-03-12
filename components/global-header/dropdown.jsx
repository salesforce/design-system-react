/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

// # Global Header Dropdown Component
// NOTE: THIS COMPONENT HAS BEEN DEPRECATED AND WILL BE REMOVED IN FUTURE MAJOR RELEASES

// ## Dependencies

// ### React
import React from 'react';
import PropTypes from 'prop-types';

// ### Dropdown
import MenuDropdown from '../menu-dropdown';
import GlobalHeaderTrigger from './private/dropdown-trigger';

// This component's `checkProps` which issues warnings to developers about properties
// when in development mode (similar to React's built in development tools)
import checkProps from './check-props';

// ## Constants
import {
	GLOBAL_HEADER_DROPDOWN,
	GLOBAL_HEADER_TOOL,
} from '../../utilities/constants';

/**
 * This component is an implementation of `MenuDropdown` with a custom trigger. All the properties listed below are provided to the `MenuDropdown` component. Any additional properties are provided to the Custom Trigger (that is the `Button` or `li` tag).
 */
const GlobalHeaderDropdown = (props) => {
	checkProps(GLOBAL_HEADER_DROPDOWN, props);

	const { globalAction, iconVariant, ...rest } = props;
	let iconVariantOverride;

	if (globalAction) {
		iconVariantOverride = 'container';
	}

	return (
		<MenuDropdown nubbinPosition="top right" {...rest}>
			<GlobalHeaderTrigger
				globalAction={globalAction}
				iconSize={globalAction && 'small'}
				iconVariant={iconVariantOverride || iconVariant}
			/>
		</MenuDropdown>
	);
};

// ### Display Name
// Always use the canonical component name (set in the core) as the React
// display name.
GlobalHeaderDropdown.displayName = GLOBAL_HEADER_TOOL;

// ### Prop Types
GlobalHeaderDropdown.propTypes = {
	/**
	 * Aligns the right or left side of the menu with the respective side of the trigger. This is not intended for use with `nubbinPosition`.
	 */
	align: PropTypes.oneOf(['left', 'right']),
	/**
	 * Extra classnames to apply to the dropdown menu.
	 */
	className: PropTypes.string,
	/**
	 * CSS classes to be added to `li` element.
	 */
	buttonClassName: PropTypes.oneOfType([
		PropTypes.array,
		PropTypes.object,
		PropTypes.string,
	]),
	/**
	 * Name of the icon. Visit <a href="http://www.lightningdesignsystem.com/resources/icons">Lightning Design System Icons</a> to reference icon names.
	 */
	iconName: PropTypes.string,
	/**
	 * For icon variants, please reference <a href="http://www.lightningdesignsystem.com/components/buttons/#icon">Lightning Design System Icons</a>.
	 */
	iconVariant: PropTypes.oneOf([
		'bare',
		'container',
		'border',
		'border-filled',
		'more',
		'global-header',
	]),
	/**
	 * A unique ID is needed in order to support keyboard navigation, ARIA support, and connect the dropdown to the triggering button.
	 */
	id: PropTypes.string,
	/**
	 * Adds custom styling such as inverse fill and special sizing/spacing
	 */
	globalAction: PropTypes.bool,
	/**
	 * Positions dropdown menu with a nubbin--that is the arrow notch. The placement options correspond to the placement of the nubbin. This is implemeted with CSS classes and is best used with a `Button` with "icon container" styling. Dropdown menus will still be contained to the closest scrolling parent.
	 */
	nubbinPosition: PropTypes.oneOf([
		'top left',
		'top',
		'top right',
		'bottom left',
		'bottom',
		'bottom right',
	]),
	/**
	 *  Offset adds pixels to the absolutely positioned dropdown menu in the format: ([vertical]px [horizontal]px).
	 */
	offset: PropTypes.string,
	/**
	 * Triggered when an item in the menu is clicked.
	 */
	onSelect: PropTypes.func,
	/**
	 * An array of menu item.
	 */
	options: PropTypes.array.isRequired,
};

// ### Default Props
GlobalHeaderDropdown.defaultProps = {
	align: 'right',
	buttonVariant: 'icon',
	iconVariant: 'global-header',
	nubbinPosition: 'top right',
};

export default GlobalHeaderDropdown;
