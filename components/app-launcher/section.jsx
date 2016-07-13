/*
Copyright (c) 2015, salesforce.com, inc. All rights reserved.

Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:
Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
Neither the name of salesforce.com, inc. nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

// # App Launcher Section Component

// ## Dependencies

// ### React
import React from 'react';

// Removes the need for `React.PropTypes.prop`
const { PropTypes } = React;

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

const AppLauncherSection = React.createClass({
	// ### Display Name
	// Always use the canonical component name as the React display name.
	displayName: APP_LAUNCHER_SECTION,

	// ### Prop Types
	propTypes: {
		/**
		 * The title for this section of apps.
		 */
		title: PropTypes.string.isRequired,
		/**
		 * The assistive text for the section collapse icons
		 */
		collapseSectionAssistiveText: PropTypes.string,
		/**
		 * An array of applications to display
		 */
		children: PropTypes.node.isRequired,
		/**
		 * Sets the sections inital open state
		 */
		isOpen: PropTypes.bool,
		/**
		 * Callback for when section is toggled. Passes "isOpen" bool
		 */
		onToggleClick: PropTypes.func
	},


	getDefaultProps () {
		return {
			collapseSectionAssistiveText: 'Toggle visibility of section',
			isOpen: true
		};
	},

	getInitialState () {
		return {
			isOpen: this.props.isOpen
		};
	},

	toggleOpen () {
		this.setState({ isOpen: !this.state.isOpen });

		if (isFunction(this.props.onToggleClick)) {
			this.props.onToggleClick(!this.state.isOpen);
		}
	},

	render () {
		const iconIsOpen = this.state.isOpen ? 'slds-is-open' : 'slds-is-close';
		const sectionIsOpen = this.state.isOpen ? 'slds-is-expanded' : 'slds-is-collapsed';

		return (
			<div className={classNames('slds-section', iconIsOpen)}>
				<div className="slds-section__title">
					<Button
						assistiveText={this.props.collapseSectionAssistiveText}
						iconName="switch"
						onClick={this.toggleOpen}
						className="slds-button--icon slds-m-right--small slds-is-open"
						variant="icon"
					/>
					<h3>{this.props.title}</h3>
				</div>
				<div className="slds-section__content">
					<ul className={classNames('slds-grid slds-grid--pull-padded slds-wrap', sectionIsOpen)}>
						{React.Children.map(this.props.children, (child) => (
							<li className="slds-col--padded slds-grow-none slds-size--1-of-1 slds-medium-size--1-of-3">
								{child}
							</li>
						))}
					</ul>
				</div>
			</div>
		);
	}
});

module.exports = AppLauncherSection;
