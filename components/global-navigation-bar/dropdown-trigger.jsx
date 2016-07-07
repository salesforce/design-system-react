/*
Copyright (c) 2015, salesforce.com, inc. All rights reserved.

Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:
Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
Neither the name of salesforce.com, inc. nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

// # ContextBar Dropdown Component

// ## Dependencies

// ### React
import React, { PropTypes } from 'react';

// ### classNames
import classNames from 'classnames';

// ### assign
import assign from 'lodash.assign';

// ### Dropdown
import Dropdown from '../menu-dropdown';
import Button from '../button';
import ContextBarTrigger from './dropdown-trigger';

// ## Constants
import { CONTEXT_BAR_DROPDOWN } from '../../utilities/constants';


/**
 * This component is an implementation of `MenuDropdown` with a custom trigger.
 */
/**
*  The Dropdown Button Trigger renders the default trigger button for the dropdown menu. If this component has children, it does not render itself to the DOM. Instead, it renders its child element, `Button`, and all that child's properties. This component may be used as a template to create custom triggers that do not use `Button`.
*/
const ContextBarDropdownTrigger = React.createClass({
	// ### Display Name
	// Always use the canonical component name (set in the core) as the React
	// display name.
	displayName: 'DropdownTrigger',

	// ### Prop Types
	propTypes: {
	},

	// ### Render
	render () {
		// const {
		// 	className,
		// 	label,
		// 	triggerIconCategory,
		// 	triggerIconName,
		// 	id,
		// 	menu,
		// 	onClick,
		// 	onKeyDown
		// } = this.props;

		return (
			<li
				aria-haspopup="true"
				className={classNames('slds-context-bar__item', 'slds-context-bar-action', 'slds-dropdown-trigger', this.props.className)}
				id={this.props.id}
				onClick={this.props.onClick}
			>
				<a className="slds-context-bar__label-action">{this.props.label}</a>
				<div className="slds-context-bar__icon-action slds-p-left--none">
					<Button
						aria-haspopup="true"
						assistiveText={this.props.label}
						className="slds-context-bar__button slds-context-bar-action__trigger"
						disabled={this.props.disabled}
						hint={this.props.hint}
						iconCategory={this.props.triggerIconCategory || 'utility'}
						iconName={this.props.triggerIconName || 'down'}
						iconVariant="bare"
						iconSize="x-small"
						id={this.props.id}
						onKeyDown={this.props.onKeyDown}

						style={this.props.style}
						tabIndex={this.props.tabIndex}
						variant="icon"
						tooltip={this.props.tooltip}
					/>
					{this.props.menu}
				</div>
			</li>
		);
	}
});

module.exports = ContextBarDropdownTrigger;
