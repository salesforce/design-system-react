/*
Copyright (c) 2015, salesforce.com, inc. All rights reserved.

Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:
Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
Neither the name of salesforce.com, inc. nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

// # App Launcher

// ## Dependencies

// ### React
import React from 'react';

// Removes the need for `React.PropTypes.prop`
const { PropTypes } = React;

// ### isFunction
import isFunction from 'lodash.isfunction';

// ## Children
import Button from '../button';
import Icon from '../icon';
import Modal from '../modal';
import Search from '../forms/input/search';

// ## Constants
import { APP_LAUNCHER } from '../../utilities/constants';

const AppLauncher = React.createClass({
	// ### Display Name
	// Always use the canonical component name as the React display name.
	displayName: APP_LAUNCHER,

	// ### Prop Types
	propTypes: {
		/*
		 * Assistive text for app launcher icon
		 */
		appLauncherIconAssistiveText: PropTypes.string,
		/*
		 * Set the header button's text
		 */
		buttonLabel: PropTypes.string,
		/*
		 * Callback fired when button is clicked
		 */
		buttonOnClick: PropTypes.func,
		/*
		 * All of the App Launcher's children
		 */
		children: PropTypes.node.isRequired,
		/*
		 * Callback fired when search value changes
		 */
		onSearch: PropTypes.func.isRequired,
		/*
		 * Set the App Launcher's title text (for localization)
		 */
		title: PropTypes.string,
		/*
		 * Callback when the App Launcher icon is clicked
		 */
		onAppLauncherIconClick: PropTypes.func,
		/*
		 * Callback when the App Launcher Modal is closed
		 */
		onAppLauncherModalClose: PropTypes.func,
		/*
		 * Set the search input's placeholder text (for localization)
		 */
		searchPlaceholderText: PropTypes.string,
		/*
		 * Set initial open state
		 */
		isOpen: PropTypes.bool
	},

	getDefaultProps () {
		return {
			appLauncherIconAssistiveText: 'Open App Launcher',
			buttonLabel: 'App Exchange',
			isOpen: false,
			searchPlaceholderText: 'Find an app',
			title: 'App Launcher'
		};
	},

	getInitialState () {
		return {
			isOpen: this.props.isOpen
		};
	},

	openAppLauncher () {
		this.setState({ isOpen: true });

		if (isFunction(this.props.onAppLauncherIconClick)) {
			this.props.onAppLauncherIconClick();
		}
	},

	closeAppLauncher () {
		this.setState({ isOpen: false });

		if (isFunction(this.props.onAppLauncherModalClose)) {
			this.props.onAppLauncherModalClose();
		}
	},

	render () {
		return (
			<div className="app-launcher-wrapper">
				<div className="slds-context-bar__icon-action">
					<a
						href="#"
						aria-haspopup="true"
						className="slds-button slds-button--icon slds-context-bar__button"
						onClick={this.openAppLauncher}
					>
						<Icon
							category="utility"
							name="apps"
							size="medium"
							inverse={false}
							assistiveText={this.props.appLauncherIconAssistiveText}
						/>
					</a>
				</div>

				<Modal
					isOpen={this.state.isOpen}
					onRequestClose={this.closeAppLauncher}
					containerClassName="app-launcher"
					size="large"
				>
					<div className="slds-modal__header slds-app-launcher__header slds-grid slds-grid--align-spread slds-grid--vertical-align-center">
						<h2 className="slds-text-heading--medium">{this.props.title}</h2>
						<div className="slds-app-launcher__header-search">
							<Search
								id="app-launcher-search"
								onChange={this.props.onSearch}
								assistiveText={this.props.searchPlaceholderText}
								placeholder={this.props.searchPlaceholderText}
							/>
						</div>
						<Button
							label={this.props.buttonLabel}
							buttonOnClick
						/>
					</div>

					<div className="slds-modal__content slds-app-launcher__content slds-p-around--medium">
						{this.props.children}
					</div>
				</Modal>
			</div>
		);
	}
});

module.exports = AppLauncher;
