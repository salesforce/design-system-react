/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/no-access-state-in-setstate */
/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */

/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

// # App Launcher Section Component

// ## Dependencies

// ### React
import React from 'react';

import PropTypes from 'prop-types';

// ### isFunction
import isFunction from 'lodash.isfunction';

// ### classNames
// [github.com/JedWatson/classnames](https://github.com/JedWatson/classnames)
// A simple javascript utility for conditionally joining classNames together.
import classNames from 'classnames';

// This component's `checkProps` which issues warnings to developers about properties when in development mode (similar to React's built in development tools)
import checkProps from './check-props';
import componentDoc from './component.json';

// ## Children
import Button from '../button';

// ## Constants
import { APP_LAUNCHER_SECTION } from '../../utilities/constants';

const defaultProps = {
	assistiveText: {
		collapseSection: 'Toggle visibility of section',
	},
};

/**
 * App Launcher Sections allow users to categorize App Tiles as well as toggle their display
 */

class AppLauncherSection extends React.Component {
	// ### Display Name
	// Always use the canonical component name as the React display name.
	static displayName = APP_LAUNCHER_SECTION;

	// ### Prop Types
	static propTypes = {
		/**
		 * **Assistive text for accessibility.**
		 * This object is merged with the default props object on every render.
		 * * `collapseSection`: The assistive text for the section collapse icons.
		 */

		assistiveText: PropTypes.shape({
			collapseSection: PropTypes.string,
		}),
		/**
		 * The title for this section of apps
		 */

		title: PropTypes.string.isRequired,
		/**
		 * Allows the user to show/hide the section
		 */

		toggleable: PropTypes.bool,
		/**
		 * An array of applications to display
		 */

		children: PropTypes.node.isRequired,
		/**
		 * Controls the open/closed state of the section
		 */

		isOpen: PropTypes.bool,
		/**
		 * Callback for when section is toggled. Passes "isOpen" bool. Forces `toggleable` to true
		 */

		onToggleClick: PropTypes.func,
	};

	static defaultProps = defaultProps;

	state = {
		isOpen: true,
	};

	constructor(props) {
		super(props);

		checkProps(APP_LAUNCHER_SECTION, props, componentDoc);
	}

	toggleOpen = (event) => {
		this.setState({ isOpen: !this.state.isOpen });

		if (isFunction(this.props.onToggleClick)) {
			this.props.onToggleClick(event, {});
		}
	};

	render() {
		const isOpen =
			this.props.isOpen !== undefined ? this.props.isOpen : this.state.isOpen;
		const iconIsOpenClass = isOpen ? 'slds-is-open' : 'slds-is-close';
		const sectionIsOpenClass = isOpen
			? 'slds-is-expanded'
			: 'slds-is-collapsed';
		const assistiveText = {
			...defaultProps.assistiveText,
			...this.props.assistiveText,
		};

		return (
			<div className={classNames('slds-section', iconIsOpenClass)}>
				<div className="slds-section__title">
					{this.props.toggleable || this.props.onToggleClick ? (
						<Button
							assistiveText={{
								icon:
									this.props.collapseSectionAssistiveText ||
									assistiveText.collapseSection,
							}}
							iconCategory="utility"
							iconName="switch"
							onClick={this.toggleOpen}
							className={classNames({
								'slds-button__icon  slds-m-right_medium': true,
								'slds-button__icon_left': isOpen,
								'slds-accordion__summary-action-icon': !isOpen,
							})}
							variant="icon"
						/>
					) : null}
					<h3>{this.props.title}</h3>
				</div>
				<div className="slds-section__content">
					<ul
						className={classNames(
							'slds-grid slds-grid_pull-padded slds-wrap',
							sectionIsOpenClass
						)}
					>
						{React.Children.map(this.props.children, (child) => (
							<li
								className={classNames(
									'slds-col_padded slds-grow-none',
									child.props.size === 'small'
										? 'slds-size_xx-small'
										: 'slds-size_1-of-1 slds-medium-size_1-of-3'
								)}
							>
								{child}
							</li>
						))}
					</ul>
				</div>
			</div>
		);
	}
}

export default AppLauncherSection;
