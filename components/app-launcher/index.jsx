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
import Modal from '../modal';
// DO NOT REMOVE UNTIL THIS IS RESOLVED https://github.com/salesforce-ux/design-system-react-site/issues/56
import AppLauncherSection from './section'; // eslint-disable-line no-unused-vars
import AppLauncherTile from './tile'; // eslint-disable-line no-unused-vars
// //////////////////////////////////////////////////////////////////////////////////

// ## Constants
import { APP_LAUNCHER } from '../../utilities/constants';

/**
 * The App Launcher allows the user to quickly access all the apps and functionality with their organization.
 * The App Launcher should generally only be used as a sub-component of the [Global Navigation Bar](/components/global-navigation-bar)
 *
 * Also note: App Launcher is not included in the standard component export. To import it, you must reference it directly via its path.
 * Example:
 * ```
 * import AppLauncher from 'design-system-react/components/app-launcher';
 * import AppLauncherTile from 'design-system-react/components/app-launcher/tile';
 * import AppLauncherSection from 'design-system-react/components/app-launcher/section';
 * ```
 *
 * USAGE EXAMPLE:
 * ```
 * <AppLauncher>
 * 	<AppLauncherSection>
 * 		<AppLauncherTile />
 * 		<AppLauncherTile />
 * 		<AppLauncherTile />
 * 	</AppLauncherSection>
 * 	<AppLauncherSection>
 * 		<AppLauncherTile />
 * 		<AppLauncherTile />
 * 	</AppLauncherSection>
 * </AppLauncher>
 * ```
 */
const AppLauncher = React.createClass({
	// ### Display Name
	// Always use the canonical component name as the React display name.
	displayName: APP_LAUNCHER,

	// ### Prop Types
	propTypes: {
		/**
		 * One or more `<AppLauncherSection />`s each containing one or more `<AppLauncherTile />`s
		 */
		children: PropTypes.node.isRequired,
		/**
		 * Control the open/close state of the App Launcher
		 */
		isOpen: PropTypes.bool,
		/**
		 * Button that exists in the upper right hand corner of the App Launcher modal
		 */
		modalHeaderButton: PropTypes.node,
		/**
		 * Callback when the App Launcher Modal is closed
		 */
		onClose: PropTypes.func,
		/**
		 * Allows longer application names without truncating them.
		 */
		noTruncate: PropTypes.bool,
		/**
		 * Search bar for the Modal's header. Will typically be an instance of `design-system-react/forms/input/search`
		 */
		search: PropTypes.node,
		/**
		 * Set the App Launcher's title text (for localization)
		 */
		title: PropTypes.string,
		/**
		 * Assistive text for app launcher icon
		 */
		triggerAssistiveText: PropTypes.string,
		/**
		 * This is typically the name of the cloud or application
		 */
		triggerName: PropTypes.node,
		/**
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

	renderSearch () {
		let returnVal;

		if (this.props.search) {
			returnVal = (
				<div
					className="slds-app-launcher__header-search"
					ref={(component) => {
						if (component) {
							if (!this.focusedOnSearch) {
								const input = component.querySelector('input');
								if (input) {
									// push to end of stack so click event doesn't blur the focus
									setTimeout(() => {
										input.focus();
										this.focusedOnSearch = true;
									}, 0);
								}
							}
						} else {
							this.focusedOnSearch = false;
						}
					}}
				>
					{this.props.search}
				</div>
			);
		}

		return returnVal;
	},

	render () {
		const isOpen = this.props.isOpen !== undefined ? this.props.isOpen : this.state.isOpen;

		// Should be removed in the future by adding a reset class of some sort.
		const style = this.props.noTruncate ? { maxWidth: 'none' } : null;

		const customModalHeader = (
			<div className="slds-grid slds-grid--align-spread slds-grid--vertical-align-center">
				<h2 className="slds-text-heading--medium">{this.props.title}</h2>

				{this.renderSearch()}

				{
					this.props.modalHeaderButton
					? this.props.modalHeaderButton
					: <span className="slds-size--1-of-7"></span>
				}
			</div>
		);

		return (
			<div className="slds-context-bar__item slds-no-hover" style={style}>
				<div className="slds-context-bar__icon-action">
					<a
						href="javascript:void(0);" // eslint-disable-line no-script-url
						aria-haspopup="true"
						className="slds-icon-waffle_container slds-context-bar__button"
						onClick={this.openAppLauncher}
					>
						<div className="slds-icon-waffle">
							<div className="slds-r1"></div>
							<div className="slds-r2"></div>
							<div className="slds-r3"></div>
							<div className="slds-r4"></div>
							<div className="slds-r5"></div>
							<div className="slds-r6"></div>
							<div className="slds-r7"></div>
							<div className="slds-r8"></div>
							<div className="slds-r9"></div>
						</div>
						{this.props.triggerAssistiveText && <span className="slds-assistive-text">{this.props.triggerAssistiveText}</span>}
					</a>
				</div>
				<Modal
					isOpen={isOpen}
					onRequestClose={this.closeAppLauncher}
					containerClassName="app-launcher"
					size="large"
					header={customModalHeader}
					headerClassName="slds-app-launcher__header"
				>
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
