/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

// # Global Header Component

// Implements the [Global Header design pattern](https://www.lightningdesignsystem.com/components/global-header) in React.
// Based on SLDS v2.1.0-rc.2

// ## Dependencies

// ### React
import React from 'react';
import PropTypes from 'prop-types';

// This component's `checkProps` which issues warnings to developers about properties when in development mode (similar to React's built in development tools)
import checkProps from './check-props';
import componentDoc from './component.json';

// ### Event Helpers
import EventUtil from '../../utilities/event';

// ## Constants
import {
	GLOBAL_HEADER,
	GLOBAL_HEADER_FAVORITES,
	GLOBAL_HEADER_HELP,
	GLOBAL_HEADER_NOTIFICATIONS,
	GLOBAL_HEADER_PROFILE,
	GLOBAL_HEADER_SEARCH,
	GLOBAL_HEADER_SETUP,
	GLOBAL_HEADER_TASK,
	GLOBAL_HEADER_TOOL,
} from '../../utilities/constants';

const defaultProps = {
	assistiveText: {
		skipToNav: 'Skip to Navigation',
		skipToContent: 'Skip to Main Content',
	},
	logoSrc: '/assets/images/logo-noname.svg',
};

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
class GlobalHeader extends React.Component {
	static displayName = GLOBAL_HEADER;

	static propTypes = {
		/**
		 * **Assistive text for accessibility.**
		 * This object is merged with the default props object on every render.
		 * * `skipToNav`: The localized text that will be read back for the "Skip to Navigation" accessibility link.
		 * * `skipToContent`: The localized text that will be read back for the "Skip to Main Content" accessibility link.
		 */
		assistiveText: PropTypes.shape({
			skipToNav: PropTypes.string,
			skipToContent: PropTypes.string,
		}),
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
	};

	static defaultProps = defaultProps;

	constructor(props) {
		super(props);

		checkProps(GLOBAL_HEADER, props, componentDoc);
	}

	handleSkipToContent = (e) => {
		EventUtil.trap(e);
		this.props.onSkipToContent(e);
	};

	handleSkipToNav = (e) => {
		EventUtil.trap(e);
		this.props.onSkipToNav(e);
	};

	render() {
		const assistiveText = {
			...defaultProps.assistiveText,
			...this.props.assistiveText,
		};
		let actions = {
			[GLOBAL_HEADER_FAVORITES]: [],
			[GLOBAL_HEADER_HELP]: [],
			[GLOBAL_HEADER_NOTIFICATIONS]: [],
			[GLOBAL_HEADER_PROFILE]: [],
			[GLOBAL_HEADER_SETUP]: [],
			[GLOBAL_HEADER_TASK]: [],
			[GLOBAL_HEADER_TOOL]: [], // support for deprecated GlobalHeaderButton and GlobalHeaderDropdown
		};
		let search;

		React.Children.forEach(this.props.children, (child) => {
			if (child) {
				if (child.type.displayName === GLOBAL_HEADER_SEARCH) {
					search = child;
				} else if (actions[child.type.displayName]) {
					// eslint-disable-next-line fp/no-mutating-methods
					actions[child.type.displayName].push(child);
				}
			}
		});

		actions = [].concat(
			actions[GLOBAL_HEADER_FAVORITES],
			actions[GLOBAL_HEADER_TASK],
			actions[GLOBAL_HEADER_HELP],
			actions[GLOBAL_HEADER_SETUP],
			actions[GLOBAL_HEADER_NOTIFICATIONS],
			actions[GLOBAL_HEADER_TOOL], // support for deprecated GlobalHeaderButton and GlobalHeaderDropdown
			actions[GLOBAL_HEADER_PROFILE]
		);

		/* eslint-disable max-len */
		return (
			<header className="slds-global-header_container">
				{this.props.onSkipToNav ? (
					<a
						href="#"
						className="slds-assistive-text slds-assistive-text_focus"
						onClick={this.handleSkipToNav}
					>
						{this.props.skipToNavAssistiveText || assistiveText.skipToNav}
					</a>
				) : null}
				{this.props.onSkipToContent ? (
					<a
						href="#"
						className="slds-assistive-text slds-assistive-text_focus"
						onClick={this.handleSkipToContent}
					>
						{this.props.skipToContentAssistiveText ||
							assistiveText.skipToContent}
					</a>
				) : null}
				<div className="slds-global-header slds-grid slds-grid_align-spread">
					<div className="slds-global-header__item">
						<div
							className="slds-global-header__logo"
							style={{ backgroundImage: `url(${this.props.logoSrc})` }}
						/>
					</div>
					{search}
					<div className="slds-global-header__item">
						<ul className="slds-global-actions">
							{actions.map((actionItem, index) => (
								<li
									className="slds-global-actions__item"
									key={`actions-item-${index}`} /* eslint-disable-line react/no-array-index-key */
								>
									{actionItem}
								</li>
							))}
						</ul>
					</div>
				</div>
				{this.props.navigation}
			</header>
		);
		/* eslint-enable max-len */
	}
}

export default GlobalHeader;
