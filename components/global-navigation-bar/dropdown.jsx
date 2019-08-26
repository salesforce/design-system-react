/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

// # Global Navigation Dropdown Component

// ## Dependencies

// ### React
import React from 'react';
import PropTypes from 'prop-types';

import checkProps from './check-props';
import componentDoc from './component.json';

// ### Dropdown
import MenuDropdown from '../menu-dropdown';
import GlobalNavigationTrigger from './dropdown-trigger';

// ## Constants
import { GLOBAL_NAVIGATION_BAR_DROPDOWN } from '../../utilities/constants';

/**
 * This component is an implementation of `MenuDropdown` with a custom trigger. All the properties listed below are provided to the `MenuDropdown` component. Any additional properties are provided to the Custom Trigger (that is the `Button` or `li` tag).
 */
const GlobalNavigationBarDropdown = (props) => {
	checkProps(GLOBAL_NAVIGATION_BAR_DROPDOWN, props, componentDoc);

	// Separate props we care about in order to pass others along passively to the dropdown component
	const {
		active,
		activeBackgroundColor,
		assistiveText,
		dividerPosition,
		...rest
	} = props;

	return (
		<MenuDropdown
			align="right"
			hasStaticAlignment
			// only need if using hybrid or hover
			hoverCloseDelay={400}
			length={props.length}
			menuPosition="relative"
			{...rest}
		>
			<GlobalNavigationTrigger
				active={active}
				assistiveText={assistiveText}
				activeBackgroundColor={activeBackgroundColor}
				dividerPosition={dividerPosition}
			/>
		</MenuDropdown>
	);
};

// ### Display Name
// Always use the canonical component name (set in the core) as the React
// display name.
GlobalNavigationBarDropdown.displayName = GLOBAL_NAVIGATION_BAR_DROPDOWN;

// ### Prop Types
GlobalNavigationBarDropdown.propTypes = {
	/**
	 * Whether the item is active or not.
	 */
	active: PropTypes.bool,
	/**
	 * Allows alignment of active item with active application background color.
	 */
	activeBackgroundColor: PropTypes.string,
	/**
	 * **Assistive text for accessibility.**
	 * This object is merged with the default props object on every render.
	 * * `icon`: Text that is visually hidden but read aloud by screenreaders to tell the user what the icon means. If the button has an icon and a visible label, you can omit the <code>assistiveText.icon</code> prop and use the <code>label</code> prop.
	 */
	assistiveText: PropTypes.shape({
		icon: PropTypes.string,
	}),
	/**
	 * Aligns the right or left side of the menu with the respective side of the trigger. This is not intended for use with `nubbinPosition`.
	 */
	align: PropTypes.oneOf(['left', 'right']),
	/**
	 * Extra classnames to apply to the dropdown menu.
	 */
	className: PropTypes.string,
	/**
	 * Determines position of separating bar.
	 */
	dividerPosition: PropTypes.oneOf(['left', 'right']),
	/**
	 * CSS classes to be added to `li` element.
	 */
	buttonClassName: PropTypes.oneOfType([
		PropTypes.array,
		PropTypes.object,
		PropTypes.string,
	]),
	/**
	 * A unique ID is needed in order to support keyboard navigation, ARIA support, and connect the dropdown to the triggering button.
	 */
	id: PropTypes.string,
	/**
	 * Provided to List to indicate number of items visible in the List. Pass `null` to display all items, or a string containing one of the numeric option values listed under [Dropdown Height](https://www.lightningdesignsystem.com/components/menus/#flavor-dropdown-height) at the right (eg. '5').
	 */
	length: PropTypes.oneOf([null, '5', '7', '10']),
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
GlobalNavigationBarDropdown.defaultProps = {
	align: 'right',
	length: null,
};

export default GlobalNavigationBarDropdown;
