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
import React from 'react';

// ### classNames
import classNames from 'classnames';

// ### MenuDropdown
import MenuDropdown from '../menu-dropdown';

// ## Constants
import { GLOBAL_HEADER_TOOL } from '../../utilities/constants';

// Removes the need for `PropTypes`.
const { PropTypes } = React;

/**
 * A helper component that renders a MenuDropdown in the tools area of the Global Header. Currently defaults to a bare icon, but this can be overriden.
 */
const GlobalHeaderDropdown = (props) => {
	const {
		align,
		className,
		dropdownClassName,
		...rest
	} = props;

	return (
		<li className={classNames('slds-dropdown-trigger slds-dropdown-trigger--click', className)}>
			<MenuDropdown
				align={align}
				buttonVariant="icon"
				className={classNames(`slds-nubbin--top-${align}`, dropdownClassName)}
				iconVariant="bare"
				{...rest}
			/>
		</li>
	);
};

GlobalHeaderDropdown.displayName = GLOBAL_HEADER_TOOL;

GlobalHeaderDropdown.propTypes = {
	/**
	 * The side of the triggering element that the menu should align itself with.
	 */
	align: PropTypes.oneOf(['right', 'left']),
	/**
	 * Extra classnames to apply to the `<li />`.
	 */
	className: PropTypes.string,
	/**
	 * Extra classnames to apply to the dropdown.
	 */
	dropdownClassName: PropTypes.string
};

GlobalHeaderDropdown.defaultProps = {
	align: 'right'
};

export default GlobalHeaderDropdown;
