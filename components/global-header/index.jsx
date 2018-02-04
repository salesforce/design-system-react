/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

// # Global Header Component

// Implements the [Global Header design pattern](https://www.lightningdesignsystem.com/components/global-header) in React.
// Based on SLDS v2.1.0-rc.2

// ## Dependencies

// ### React
import React from 'react';
import createReactClass from 'create-react-class';
import PropTypes from 'prop-types';

// ### Event Helpers
import EventUtil from '../../utilities/event';

// ## Constants
import {
	GLOBAL_HEADER,
	GLOBAL_HEADER_PROFILE,
	GLOBAL_HEADER_SEARCH,
	GLOBAL_HEADER_TOOL,
} from '../../utilities/constants';

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
const GlobalHeader = createReactClass({
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
		 * Pass in the Global Navigation Bar component
		 */
		navigation: PropTypes.node,
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
		skipToNavAssistiveText: PropTypes.string,
	},

	getDefaultProps () {
		return {
			logoSrc: '/assets/images/logo.svg',
			skipToNavAssistiveText: 'Skip to Navigation',
			skipToContentAssistiveText: 'Skip to Main Content',
		};
	},

	handleSkipToContent (e) {
		EventUtil.trap(e);
		this.props.onSkipToContent(e);
	},

	handleSkipToNav (e) {
		EventUtil.trap(e);
		this.props.onSkipToNav(e);
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
			<header className="slds-global-header_container">
				{this.props.onSkipToNav ? (
					<a
						href="javascript:void(0);"
						className="slds-assistive-text slds-assistive-text--focus"
						onClick={this.handleSkipToNav}
					>
						{this.props.skipToNavAssistiveText}
					</a>
				) : null}
				{this.props.onSkipToContent ? (
					<a
						href="javascript:void(0);"
						className="slds-assistive-text slds-assistive-text--focus"
						onClick={this.handleSkipToContent}
					>
						{this.props.skipToContentAssistiveText}
					</a>
				) : null}
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
				{this.props.navigation}
			</header>
		);
		/* eslint-enable max-len, no-script-url */
	},
});

export default GlobalHeader;
