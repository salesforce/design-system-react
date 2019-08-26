/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

// # App Launcher Component
// Based on SLDS v2.1.0-rc.2

import React from 'react';
import PropTypes from 'prop-types';

import classNames from 'classnames';

import isFunction from 'lodash.isfunction';
import shortid from 'shortid';

// This component's `checkProps` which issues warnings to developers about properties when in development mode (similar to React's built in development tools)
import checkProps from './check-props';
import componentDoc from './component.json';

// ## Children
import Modal from '../modal';

import { APP_LAUNCHER } from '../../utilities/constants';

const defaultProps = {
	assistiveText: {
		trigger: 'Open App Launcher',
	},
	ariaHideApp: true,
	title: 'App Launcher',
};

/**
 * The App Launcher allows the user to quickly access all the apps and functionality with their organization.
 * The App Launcher should generally only be used as a sub-component of the [Global Navigation Bar](/components/global-navigation-bar)
 *
 * USAGE EXAMPLE:
 * ```
 * <AppLauncher>
 * 	<AppLauncherExpandableSection>
 * 		<AppLauncherTile />
 * 		<AppLauncherTile />
 * 		<AppLauncherTile />
 * 	</AppLauncherExpandableSection>
 * 	<AppLauncherExpandableSection>
 * 		<AppLauncherTile />
 * 		<AppLauncherTile />
 * 	</AppLauncherExpandableSection>
 * </AppLauncher>
 * ```
 *
 * By default, `Modal`, a child component of App Launcher, will add `aria-hidden=true` to the `body` tag, but this disables some assistive technologies. To prevent this you can add the following to your application with `#mount` being the root node of your application that you would like to hide from assistive technologies when the `Modal` is open.
 * ```
 * import settings from 'design-system-react/components/settings';
 * settings.setAppElement('#mount');
 * ```
 */
class AppLauncher extends React.Component {
	// ### Display Name
	// Always use the canonical component name as the React display name.
	static displayName = APP_LAUNCHER;

	// ### Prop Types
	static propTypes = {
		/**
		 * **Assistive text for accessibility.**
		 * This object is merged with the default props object on every render.
		 * * `trigger`: This is a visually hidden label for the app launcher icon.
		 */
		assistiveText: PropTypes.shape({
			trigger: PropTypes.string,
		}),
		/**
		 * Boolean indicating if the appElement should be hidden.
		 */
		ariaHideApp: PropTypes.bool,
		/**
		 * One or more `<AppLauncherExpandableSection />`s, each containing one or more `<AppLauncherTile />`s or `<AppLauncherLink />`s
		 */
		children: PropTypes.node.isRequired,
		/**
		 * The app launcher id. If not provided, one will be generated for accessibility
		 */
		id: PropTypes.string,
		/**
		 * Control the open/close state of the App Launcher
		 */
		isOpen: PropTypes.bool,
		/**
		 * CSS classes to be added to App Launcher Modal.
		 */
		modalClassName: PropTypes.oneOfType([
			PropTypes.array,
			PropTypes.object,
			PropTypes.string,
		]),
		/**
		 * Button that exists in the upper right hand corner of the App Launcher modal
		 */
		modalHeaderButton: PropTypes.node,
		/**
		 * Allows longer application names without truncating them.
		 */
		noTruncate: PropTypes.bool,
		/**
		 * Callback when the App Launcher Modal is closed
		 */
		onClose: PropTypes.func,
		/**
		 * Search bar for the Modal's header. Will typically be an instance of `design-system-react/input/search`
		 */
		search: PropTypes.node,
		/**
		 * Set the App Launcher's title text (for localization)
		 */
		title: PropTypes.string,
		/**
		 * This is typically the name of the cloud or application
		 */
		triggerName: PropTypes.node,
		/**
		 * Callback when the App Launcher icon is clicked
		 */
		triggerOnClick: PropTypes.func,
	};

	static defaultProps = defaultProps;

	constructor(props) {
		super(props);
		this.generatedId = shortid.generate();
		this.state = {
			isOpen: false,
		};

		// `checkProps` issues warnings to developers about properties (similar to React's built in development tools)
		checkProps(APP_LAUNCHER, props, componentDoc);
	}

	getId() {
		return this.props.id || this.generatedId;
	}

	openAppLauncher = (event) => {
		this.setState({ isOpen: true });

		if (isFunction(this.props.triggerOnClick)) {
			this.props.triggerOnClick(event, {});
		}
	};

	closeAppLauncher = (event) => {
		this.setState({ isOpen: false });

		if (isFunction(this.props.onClose)) {
			this.props.onClose(event, {});
		}
	};

	renderSearch = () => {
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
	};

	render() {
		const isOpen =
			this.props.isOpen !== undefined ? this.props.isOpen : this.state.isOpen;

		// Should be removed in the future by adding a reset class of some sort.
		const style = this.props.noTruncate ? { maxWidth: 'none' } : null;

		const customModalHeader = (
			<React.Fragment>
				<h2
					className="slds-text-heading_medium"
					id={`${this.getId()}-app-launcher-title`}
				>
					{this.props.title}
				</h2>

				{this.renderSearch()}

				{this.props.modalHeaderButton ? (
					this.props.modalHeaderButton
				) : (
					<span className="slds-size_1-of-7" />
				)}
			</React.Fragment>
		);

		// Not present in SLDS, but is consistent with other implementations of App Launcher. This also prevents resizing/jumping around when filtering. It will start clipping the modal close button at 600px viewport height.
		const modalContentStaticHeight = '90%';

		const assistiveText = {
			...defaultProps.assistiveText,
			...this.props.assistiveText,
		};
		const triggerAssistiveText =
			this.props.triggerAssistiveText || assistiveText.trigger;
		return (
			<div
				className="slds-context-bar__item slds-context-bar__dropdown-trigger slds-dropdown-trigger slds-dropdown-trigger_click slds-no-hover"
				style={style}
			>
				<div className="slds-context-bar__icon-action">
					<button
						aria-haspopup="true"
						className="slds-button slds-icon-waffle_container slds-context-bar__button"
						onClick={this.openAppLauncher}
						title={triggerAssistiveText}
						type="button"
					>
						<span className="slds-icon-waffle">
							<span className="slds-r1" />
							<span className="slds-r2" />
							<span className="slds-r3" />
							<span className="slds-r4" />
							<span className="slds-r5" />
							<span className="slds-r6" />
							<span className="slds-r7" />
							<span className="slds-r8" />
							<span className="slds-r9" />
						</span>
						{triggerAssistiveText && (
							<span className="slds-assistive-text">
								{triggerAssistiveText}
							</span>
						)}
					</button>
				</div>
				<Modal
					ariaHideApp={this.props.ariaHideApp}
					assistiveText={{
						dialogLabelledBy: `${this.getId()}-app-launcher-title`,
					}}
					className={classNames('slds-app-launcher', this.props.modalClassName)}
					contentClassName="slds-app-launcher__content slds-p-around_medium"
					contentStyle={{ minHeight: modalContentStaticHeight }}
					isOpen={isOpen}
					onRequestClose={this.closeAppLauncher}
					size="large"
					header={customModalHeader}
					headerClassName="slds-grid slds-grid_align-spread slds-grid_vertical-align-center"
				>
					{this.props.children}
				</Modal>
				{this.props.triggerName ? (
					<span className="slds-context-bar__label-action slds-context-bar__app-name">
						{this.props.noTruncate ? (
							this.props.triggerName
						) : (
							<span className="slds-truncate" title={this.props.triggerName}>
								{this.props.triggerName}
							</span>
						)}
					</span>
				) : null}
			</div>
		);
	}
}

export default AppLauncher;
