/*
Copyright (c) 2015, salesforce.com, inc. All rights reserved.

Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:
Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
Neither the name of salesforce.com, inc. nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

// # GlobalNavigationBar Dropdown Component

// ## Dependencies

// ### React
import React from 'react';

// ### classNames
import classNames from 'classnames';

// ### assign
import assign from 'lodash.assign';

// ### Dropdown
import Dropdown, { defaultProps as dropdownDefaultProps } from '../menu-dropdown';
import Popover from '../popover';

// ## Children
import SLDSButton from '../button';

// ## Constants
import { GLOBAL_NAVIGATION_BAR_DROPDOWN } from '../../utilities/constants';

const defaultProps = assign({}, dropdownDefaultProps, { align: 'right' });

/**
 * This component extends `MenuDropdown` and modifies the `render` function to allow the markup to work within `GlobalNavigationBar`. See the complete `MenuDropdown` for context.
 */
class GlobalNavigationBarDropdown extends Dropdown {
	getModalPopover () {
		return (
			!this.props.disabled && this.state.isOpen ?
				<Popover
					className={classNames('slds-dropdown',
						'slds-dropdown--menu',
						`slds-dropdown--${this.props.align}`,
						this.props.className
					)}
					closeOnTabKey
					dropClass="slds-picklist" // TODO: in next SLDS release, remove slds-picklist class because slds-dropdown--length-5 will be active.
					horizontalAlign={this.props.align}
					flippable
					onMouseEnter={(this.props.openOn === 'hover') ? this.handleMouseEnter.bind(this) : null}
					onMouseLeave={(this.props.openOn === 'hover') ? this.handleMouseLeave.bind(this) : null}
					onClose={() => this.handleCancel()}
					targetElement={this.refs.trigger}
				>
					{this.getPopoverContent()}
				</Popover> : null
		);
	}

	render () {
		const {
			className,
			label,
			triggerIconCategory,
			triggerIconName
		} = this.props;

		// If no trigger was passed in, add the default GlobalNavigationBar trigger so that
		// it overrides the button trigger that Dropdown usually defaults to.
		return (
			<li
				className={classNames('slds-context-bar__item', 'slds-context-bar-action', 'slds-dropdown-trigger', className)}
				onBlur={this.props.openOn === 'hover' ? this.handleBlur.bind(this) : null}
				onClick={this.props.openOn === 'click' ? this.handleClick.bind(this) : null}
				onFocus={this.props.openOn === 'hover' ? this.handleFocus.bind(this) : null}
				/* TODO: Fix this when dropdown is updated to not use bind. */
				/* eslint-disable react/jsx-no-bind */
				onMouseDown={this.props.openOn === 'click' ? this.handleMouseDown.bind(this) : null}
				onMouseEnter={this.props.openOn === 'hover' ? this.handleMouseEnter.bind(this) : null}
				onMouseLeave={this.props.openOn === 'hover' ? this.handleMouseLeave.bind(this) : null}
				ref="trigger"
			>
				<a className="slds-context-bar__label-action">{label}</a>
				<div className="slds-context-bar__icon-action slds-p-left--none">
					<SLDSButton
						aria-haspopup="true"
						assistiveText={label}
						className="slds-context-bar__button slds-context-bar-action__trigger"
						disabled={this.props.disabled}
						hint={this.props.hint}
						iconCategory={triggerIconCategory || 'utility'}
						iconName={triggerIconName || 'down'}
						iconVariant="bare"
						iconSize="x-small"
						id={this.state.triggerId}
						onKeyDown={this.handleKeyDown.bind(this)}
						ref="button"
						style={this.props.style}
						tabIndex={this.state.isOpen ? '-1' : '0'}
						variant="icon"
						tooltip={this.props.tooltip}
					>
						{this.props.modal ? this.getModalPopover() : this.getSimplePopover()}
					</SLDSButton>
				</div>
			</li>
		);
	}
}

GlobalNavigationBarDropdown.defaultProps = defaultProps;
GlobalNavigationBarDropdown.displayName = GLOBAL_NAVIGATION_BAR_DROPDOWN;

export default GlobalNavigationBarDropdown;
