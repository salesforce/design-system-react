/*
Copyright (c) 2015, salesforce.com, inc. All rights reserved.

Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:
Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
Neither the name of salesforce.com, inc. nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

// # Global Header Component

// Implements the [Global Header design pattern](https://www.lightningdesignsystem.com/components/global-header) in React.
// Based on SLDS v2.1.0-rc.2

// ## Dependencies

// ### React
import React from 'react';

// ### Event Helpers
import { EventUtil } from '../../utilities';

// ## Constants
import { GLOBAL_HEADER, GLOBAL_HEADER_PROFILE, GLOBAL_HEADER_SEARCH, GLOBAL_HEADER_TOOL } from '../../utilities/constants';

// Removes the need for `PropTypes`.
const { PropTypes } = React;

/**
 * The global header is the anchor for the Salesforce platform and spans all other parts of the UI. It accepts children to define the items displayed within.
 *
 * Example:
 * ```
 * <SLDSGlobalHeader>
 *   <SLDSGlobalHeaderSearch />
 *   <SLDSGlobalHeaderButton />
 *   <SLDSGlobalHeaderDropdown />
 *   <SLDSGlobalHeaderDropdown />
 *   <SLDSGlobalHeaderProfile />
 * </SLDSGlobalHeader>
 * ```
 */
const GlobalHeader = React.createClass({
	displayName: GLOBAL_HEADER,

	propTypes: {
		/**
		 * See the component description, this accepts some combination of `SLDSGlobalHeaderSearch`, `SLDSGlobalHeaderButton`, `SLDSGlobalHeaderDropdown`, and `SLDSGlobalHeaderProfile` components.
		 */
		children: PropTypes.node,
		/**
		 * The Salesforce logo to display in the header.
		 */
		logoSrc: PropTypes.string,
		/**
		 * Required for accessibility. Should jump the user to the primary content area.
		 */
		onSkipToContent: PropTypes.func,
		/**
		 * Required for accessibility. Should jump the user to the primary navigation.
		 */
		onSkipToNav: PropTypes.func,
		/**
		 * The localized text that will be read back for the "Skip to Main Content" accessibility link.
		 */
		skipToContentAssistiveText: PropTypes.string,
		/**
		 * The localized text that will be read back for the "Skip to Navigation" accessibility link.
		 */
		skipToNavAssistiveText: PropTypes.string
	},

	getDefaultProps () {
		return {
			logoSrc: '/assets/images/logo.svg',
			skipToNavAssistiveText: 'Skip to Navigation',
			skipToContentAssistiveText: 'Skip to Main Content'
		};
	},

	render () {
		let tools;
		let search;
		let profile;

		React.Children.forEach(this.props.children, (child) => {
			if (child && child.type.displayName === GLOBAL_HEADER_TOOL) {
				if (!tools) tools = [];
				tools.push(child);
			} else if (child && child.type.displayName === GLOBAL_HEADER_SEARCH) {
				search = child;
			} else if (child && child.type.displayName === GLOBAL_HEADER_PROFILE) {
				profile = child;
			}
		});

		/* eslint-disable max-len, no-script-url */
		return (
			<header className="slds-global-header_container">{
				this.props.onSkipToNav
					? <a href="javascript:void(0);" className="slds-assistive-text slds-assistive-text--focus" onClick={this.handleSkipToNav}>{this.props.skipToNavAssistiveText}</a>
					: null
			} {
				this.props.onSkipToContent
					? <a href="javascript:void(0);" className="slds-assistive-text slds-assistive-text--focus" onClick={this.handleSkipToContent}>{this.props.skipToContentAssistiveText}</a>
					: null
			}
				<div className="slds-global-header slds-grid slds-grid--align-spread">
					<div className="slds-global-header__item">
						<div className="slds-global-header__logo">
							<img src={this.props.logoSrc} alt="" />
						</div>
					</div>
					{search}
					<ul className="slds-global-header__item slds-grid slds-grid--vertical-align-center">
						{tools}
						{profile}
					</ul>
				</div>
			</header>
		);
		/* eslint-enable max-len, no-script-url */
	},

	handleSkipToContent (e) {
		EventUtil.trap(e);
		this.props.onSkipToContent(e);
	},

	handleSkipToNav (e) {
		EventUtil.trap(e);
		this.props.onSkipToNav(e);
	}
});

export default GlobalHeader;
