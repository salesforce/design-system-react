/*
Copyright (c) 2015, salesforce.com, inc. All rights reserved.

Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:
Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
Neither the name of salesforce.com, inc. nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

// # Tool

// ## Dependencies

// ### React
import React from 'react';

// ### Button
import Button from '../button';

// ### Icon
import MenuDropdown from '../menu-dropdown';

// ## Constants
import { GLOBAL_HEADER_TOOL } from '../../utilities/constants';

// Removes the need for `PropTypes`.
const { PropTypes } = React;

/**
 * Component description.
 */
const Tool = (props) => (
	<Dropdown
		collection={props.collection}
		selection={props.collection[0]}
		nubbinPosition="top right"
		position="top left"
		iconPosition="left"
		id={'slds-global-nav__header__tool-' + new Date().getTime()}
		onChange={props.onChange}
	>
		<DropdownTrigger>
			<Button
				className="slds-global-nav__header__shortcut"
				iconCategory={props.iconCategory}
				iconName={props.iconName}
				iconStyle="icon-container"
				iconSize="large"
				assistiveText="{props.assistiveText}"
			/>
		</DropdownTrigger>
	</Dropdown>
);

Tool.displayName = GLOBAL_HEADER_TOOL;

export default Tool;
