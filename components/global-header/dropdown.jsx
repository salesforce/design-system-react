/*
Copyright (c) 2015, salesforce.com, inc. All rights reserved.

Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:
Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
Neither the name of salesforce.com, inc. nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

// # Global Header Dropdown Component

// ## Dependencies

// ### React
import React, { PropTypes } from 'react';

// ### Dropdown
import MenuDropdown from '../menu-dropdown';
import GlobalHeaderTrigger from './dropdown-trigger';

// ## Constants
import { GLOBAL_HEADER_TOOL } from '../../utilities/constants';

/**
 * This component is an implementation of `MenuDropdown` with a custom trigger. All the properties listed below are provided to the `MenuDropdown` component. Any additional properties are provided to the Custom Trigger (that is the `Button` or `li` tag).
 */
const GlobalHeaderDropdown = (props) => {
	// The following props are provided to the `li`, all others are passed into the `Button`
	const {
		dropdownClassName,
		id,
		offset,
		options,
		...rest
	} = props;

	return (
		<MenuDropdown
			align="right"
			dropdownClassName={dropdownClassName}
			id={id}
			nubbinPosition="top right"
			offset={offset}
			options={options}
		>
			<GlobalHeaderTrigger {...rest} />
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
	 * Extra classnames to apply to the dropdown menu.
	 */
	dropdownClassName: PropTypes.string,
	/**
	* A unique ID is needed in order to support keyboard navigation, ARIA support, and connect the dropdown to the triggering button.
	*/
	id: PropTypes.string,
	/**
	 *  Offset adds pixels to the absolutely positioned dropdown menu in the format: ([vertical]px [horizontal]px).
	 */
	offset: PropTypes.string,
	/**
	 * An array of menu item.
	 */
	options: PropTypes.array.isRequired
};

// ### Default Props
GlobalHeaderDropdown.defaultProps = { offset: '-12px -15px' };

module.exports = GlobalHeaderDropdown;
