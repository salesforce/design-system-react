/*
Copyright (c) 2015, salesforce.com, inc. All rights reserved.

Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:
Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
Neither the name of salesforce.com, inc. nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

// # App Launcher Component

// Based on SLDS v2.1.0-rc.2

// ## Dependencies

// ### React
import React, { PropTypes } from 'react';

// ### classNames
import classNames from 'classnames';

// ### isFunction
import isFunction from 'lodash.isfunction';

// This component's `checkProps` which issues warnings to developers about properties when in development mode (similar to React's built in development tools)
import checkProps from './check-props';

// ## Children
import Icon from '../icon';
import Modal from '../modal';
import Search from '../forms/input/search';

// ## Constants
import { APP_LAUNCHER } from '../../utilities/constants';

/**
 * The App Launcher allows the user to quickly access all the apps and functionality with their organization.
 *
 * USAGE EXAMPLE:
	<AppLauncher>
		<AppLauncherSection>
			<AppLauncherTile />
			<AppLauncherTile />
			<AppLauncherTile />
		</AppLauncherSection>
		<AppLauncherSection>
			<AppLauncherTile />
			<AppLauncherTile />
		</AppLauncherSection>
	</AppLauncher>
 */
const AppLauncher = React.createClass({
	// ### Display Name
	// Always use the canonical component name as the React display name.
	displayName: APP_LAUNCHER,

	// ### Prop Types
	propTypes: {
		/*
		 * All of the App Launcher's children
		 */
		children: PropTypes.node.isRequired,
		/*
		 * Control the open/close state of the App Launcher
		 */
		isOpen: PropTypes.bool,
		/*
		 * Button that exists in the upper right hand corner of the App Launcher modal
		 */
		modalHeaderButton: PropTypes.node,
		/*
		 * Callback when the App Launcher Modal is closed
		 */
		onClose: PropTypes.func,
		/*
		 * Callback fired when search value changes
		 */
		onSearch: PropTypes.func.isRequired,
		/**
		 * Allows longer application names without truncating them.
		 */
		noTruncate: PropTypes.bool,
		/*
		 * Set the search input's placeholder text (for localization)
		 */
		searchPlaceholderText: PropTypes.string,
		/*
		 * Set the App Launcher's title text (for localization)
		 */
		title: PropTypes.string,
		/*
		 * Assistive text for app launcher icon
		 */
		triggerAssistiveText: PropTypes.string,
		/**
		 * This is typically the name of the cloud or application
		 */
		triggerName: PropTypes.node,
		/*
		 * Callback when the App Launcher icon is clicked
		 */
		triggerOnClick: PropTypes.func
	},

	componentWillMount () {
		// `checkProps` issues warnings to developers about properties (similar to React's built in development tools)
		checkProps(APP_LAUNCHER, this.props);
	},

	getDefaultProps () {
		return {
			triggerAssistiveText: 'Open App Launcher',
			searchPlaceholderText: 'Find an app',
			title: 'App Launcher'
		};
	},

	getInitialState () {
		return {
			isOpen: false
		};
	},

	openAppLauncher (event) {
		this.setState({ isOpen: true });

		if (isFunction(this.props.triggerOnClick)) {
			this.props.triggerOnClick(event);
		}
	},

	closeAppLauncher (event) {
		this.setState({ isOpen: false });

		if (isFunction(this.props.onClose)) {
			this.props.onClose(event);
		}
	},

	render () {
		const isOpen = this.props.isOpen !== undefined ? this.props.isOpen : this.state.isOpen;

		// Should be removed in the future by adding a reset class of some sort.
		const style = this.props.noTruncate ? { maxWidth: 'none' } : null;

		return (
			<div className="app-launcher-wrapper slds-context-bar__item slds-no-hover" style={style}>
				<div className="slds-context-bar__icon-action">
					<a
						href="javascript:void(0);" // eslint-disable-line no-script-url
						aria-haspopup="true"
						className="slds-button slds-button--icon slds-context-bar__button"
						onClick={this.openAppLauncher}
					>
						<Icon
							category="utility"
							name="apps"
							size="small"
							assistiveText={this.props.triggerAssistiveText}
						/>
					</a>
				</div>
				<Modal
					isOpen={isOpen}
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
						{this.props.modalHeaderButton}
					</div>

					<div className="slds-modal__content slds-app-launcher__content slds-p-around--medium">
						{this.props.children}
					</div>
				</Modal>
				{this.props.triggerName
					? <span
						className={classNames(
							'slds-context-bar__label-action slds-context-bar__app-name',
							{ 'slds-truncate': !this.props.noTruncate })
						}
					>
						{this.props.triggerName}
					</span>
					: null
				}
			</div>
		);
	}
});

module.exports = AppLauncher;
