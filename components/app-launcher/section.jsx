/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

// # App Launcher Section Component

// ## Dependencies

// ### React
import React from 'react';
import createReactClass from 'create-react-class';

import PropTypes from 'prop-types';

// ### isFunction
import isFunction from 'lodash.isfunction';

// ### classNames
// [github.com/JedWatson/classnames](https://github.com/JedWatson/classnames)
// A simple javascript utility for conditionally joining classNames together.
import classNames from 'classnames';

// ## Children
import Button from '../button';

// ## Constants
import { APP_LAUNCHER_SECTION } from '../../utilities/constants';

/**
 * App Launcher Sections allow users to categorize App Tiles as well as toggle their display
 */
const AppLauncherSection = createReactClass({
	// ### Display Name
	// Always use the canonical component name as the React display name.
	displayName: APP_LAUNCHER_SECTION,

	// ### Prop Types
	propTypes: {
		/**
		 * The title for this section of apps
		 */
		title: PropTypes.string.isRequired,
		/**
		 * Allows the user to show/hide the section
		 */
		toggleable: PropTypes.bool,
		/**
		 * The assistive text for the section collapse icons
		 */
		collapseSectionAssistiveText: PropTypes.string,
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
		onToggleClick: PropTypes.func
	},


	getDefaultProps () {
		return {
			collapseSectionAssistiveText: 'Toggle visibility of section'
		};
	},

	getInitialState () {
		return {
			isOpen: true
		};
	},

	toggleOpen (event) {
		this.setState({ isOpen: !this.state.isOpen });

		if (isFunction(this.props.onToggleClick)) {
			this.props.onToggleClick(event);
		}
	},

	render () {
		const isOpen = this.props.isOpen !== undefined ? this.props.isOpen : this.state.isOpen;
		const iconIsOpenClass = isOpen ? 'slds-is-open' : 'slds-is-close';
		const sectionIsOpenClass = isOpen ? 'slds-is-expanded' : 'slds-is-collapsed';

		return (
			<div className={classNames('slds-section', iconIsOpenClass)}>
				<div className="slds-section__title">

					{this.props.toggleable || this.props.onToggleClick
						?	<Button
							assistiveText={this.props.collapseSectionAssistiveText}
							iconName="switch"
							onClick={this.toggleOpen}
							className="slds-m-right--small"
							variant="icon"
						/>
						: null
					}
					<h3>{this.props.title}</h3>
				</div>
				<div className="slds-section__content">
					<ul className={classNames('slds-grid slds-grid--pull-padded slds-wrap', sectionIsOpenClass)}>
						{React.Children.map(this.props.children, (child) => (
							<li
								className={classNames(
									'slds-col--padded slds-grow-none',
									child.props.size === 'small'
									? 'slds-size--xx-small'
									: 'slds-size--1-of-1 slds-medium-size--1-of-3'
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
});

export default AppLauncherSection;
