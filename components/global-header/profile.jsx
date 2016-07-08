/*
Copyright (c) 2015, salesforce.com, inc. All rights reserved.

Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:
Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
Neither the name of salesforce.com, inc. nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

// # Global Header Button Component

// ## Dependencies

// ### React
import React, { PropTypes } from 'react';

// ### classnames
import classnames from 'classnames';

// ### Dropdown
import MenuDropdown from '../menu-dropdown';
import GlobalHeaderTrigger from './dropdown-trigger';

// ## Constants
import { GLOBAL_HEADER_PROFILE } from '../../utilities/constants';

/**
 * A helper component that renders a MenuDropdown for the user profile.
 */
const GlobalHeaderProfile = (props) => {
	const {
		avatar,
		className,
		...rest
	} = props;

	// Use user SVG if no avatar is provided
	const tempProfileIcon = {};
	if (!props.avatar) {
		tempProfileIcon.iconCategory = 'utility';
		tempProfileIcon.iconName = 'user';
		tempProfileIcon.iconSize = 'large';
	}

	return (
		// `slds-m-right--x-small` is present to prevent dropdown menu with a
		// "top right" nubbin from jumping offscreen
		<MenuDropdown iconVarient={null} {...tempProfileIcon} {...rest}>
			<GlobalHeaderTrigger
				avatar={avatar}
				className={classnames('slds-m-left--x-small', 'slds-m-right--x-small', className)}
			/>
		</MenuDropdown>
	);
};

// ### Display Name
// Always use the canonical component name (set in the core) as the React
// display name.
GlobalHeaderProfile.displayName = GLOBAL_HEADER_PROFILE;

// ### Prop Types
GlobalHeaderProfile.propTypes = {
	/**
	 * Aligns the right or left side of the menu with the respective side of the trigger. This is not intended for use with `nubbinPosition`.
	 */
	align: PropTypes.oneOf(['left', 'right']),
	/**
	 * Extra classnames to apply to the dropdown menu.
	 */
	dropdownClassName: PropTypes.string,
	/**
	 * An image URL to display for the user profile.
	 */
	avatar: React.PropTypes.string,
	/**
	 * CSS classes to be added to `li` element.
	 */
	className: PropTypes.oneOfType([PropTypes.array, PropTypes.object, PropTypes.string]),
	/**
	* A unique ID is needed in order to support keyboard navigation, ARIA support, and connect the dropdown to the triggering button.
	*/
	id: PropTypes.string,
	/**
	 * Positions dropdown menu with a nubbin--that is the arrow notch. The placement options correspond to the placement of the nubbin. This is implemeted with CSS classes and is best used with a `Button` with "icon container" styling. Dropdown menus will still be contained to the closest scrolling parent.
	 */
	nubbinPosition: React.PropTypes.oneOf([
		'top left',
		'top',
		'top right',
		'bottom left',
		'bottom',
		'bottom right'
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
	options: PropTypes.array.isRequired
};

// ### Default Props
GlobalHeaderProfile.defaultProps = {
	align: 'right',
	nubbinPosition: 'top right',
	// TODO: Use design tokens to remove "magic numbers" that center nubbin under button
	offset: '-12px -18px'
};

export default GlobalHeaderProfile;
