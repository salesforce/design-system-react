/*
Copyright (c) 2015, salesforce.com, inc. All rights reserved.

Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:
Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
Neither the name of salesforce.com, inc. nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/
/* eslint-disable indent */

// ## Dependencies

// ### React
import React from 'react';

// ### classNames
import classNames from 'classnames';

// ## Children

// ### Dropdown
import Dropdown from '../menu-dropdown';
import SLDSButton from '../button';

// ## Constants
import { CONTEXT_BAR_DROPDOWN } from './constants';

// Remove the need for `PropTypes`
const { PropTypes } = React;

/**
 * Component description.
 */
class ContextBarDropdown extends Dropdown {
	constructor(props) {
		super(props);
	}

	render () {
		const {
			className,
			label,
			triggerIconCategory,
			triggerIconName,
			...dropdownProps
		} = this.props;

		// If no trigger was passed in, add the default ContextBar trigger so that
		// it overrides the button trigger that Dropdown usually defaults to.
		return (
			<li
				className={classNames('slds-context-bar-action', 'slds-grid', 'slds-dropdown-trigger', className)}
				onBlur={this.props.openOn === "hover" ? this.handleBlur.bind(this) : null}
				onClick={this.props.openOn === "click" ? this.handleClick.bind(this) : null}
				onFocus={this.props.openOn === "hover" ? this.handleFocus.bind(this) : null}
				onKeyDown={this.handleKeyDown.bind(this)}
				onMouseDown={this.props.openOn === "click" ? this.handleMouseDown.bind(this) : null}
				onMouseEnter={this.props.openOn === "hover" ? this.handleMouseEnter.bind(this) : null}
				onMouseLeave={this.props.openOn === "hover" ? this.handleMouseLeave.bind(this) : null}
				ref="button"
			>
				<a
					className="slds-context-bar-action__label
								slds-context-bar-action__label--expand
								slds-text-link--reset slds-grid
								slds-grid--vertical-align-center"
				>
					{label}
					<SLDSButton
		        aria-haspopup="true"
		        assistiveText={label}
		        className="slds-context-bar-action__trigger"
		        disabled={this.props.disabled}
		        hint={this.props.hint}
						iconCategory={triggerIconCategory || "utility"}
		        iconName={triggerIconName || "down"}
		        iconVariant="bare"
		        id={this.state.triggerId}
		        style={this.props.style}
		        tabIndex={this.state.isOpen ? "-1" : "0"}
		        variant="icon"
		        tooltip={this.props.tooltip}
		      >
		        {this.props.modal ? this.getModalPopover() : this.getSimplePopover()}
		      </SLDSButton>
				</a>
			</li>
		);
	}
}

export default ContextBarDropdown;
