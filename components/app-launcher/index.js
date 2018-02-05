'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _createReactClass = require('create-react-class');

var _createReactClass2 = _interopRequireDefault(_createReactClass);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _lodash = require('lodash.isfunction');

var _lodash2 = _interopRequireDefault(_lodash);

var _checkProps = require('./check-props');

var _checkProps2 = _interopRequireDefault(_checkProps);

var _modal = require('../modal');

var _modal2 = _interopRequireDefault(_modal);

var _constants = require('../../utilities/constants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
 *
 * By default, `Modal`, a child component of App Launcher, will add `aria-hidden=true` to the `body` tag, but this disables some assistive technologies. To prevent this you can add the following to your application with `#mount` being the root node of your application that you would like to hide from assistive technologies when the `Modal` is open.
 * ```
 * import settings from 'design-system-react/components/settings';
 * settings.setAppElement('#mount');
 * ```
 */

// ## Children


// ### isFunction
/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

// # App Launcher Component

// Based on SLDS v2.1.0-rc.2

// ## Dependencies

// ### React
var AppLauncher = (0, _createReactClass2.default)({
	// ### Display Name
	// Always use the canonical component name as the React display name.
	displayName: _constants.APP_LAUNCHER,

	// ### Prop Types
	propTypes: {
		/**
   * One or more `<AppLauncherSection />`s each containing one or more `<AppLauncherTile />`s
   */
		children: _propTypes2.default.node.isRequired,
		/**
   * Control the open/close state of the App Launcher
   */
		isOpen: _propTypes2.default.bool,
		/**
   * CSS classes to be added to App Launcher Modal.
   */
		modalClassName: _propTypes2.default.oneOfType([_propTypes2.default.array, _propTypes2.default.object, _propTypes2.default.string]),
		/**
   * Button that exists in the upper right hand corner of the App Launcher modal
   */
		modalHeaderButton: _propTypes2.default.node,
		/**
   * Allows longer application names without truncating them.
   */
		noTruncate: _propTypes2.default.bool,
		/**
   * Callback when the App Launcher Modal is closed
   */
		onClose: _propTypes2.default.func,
		/**
   * Search bar for the Modal's header. Will typically be an instance of `design-system-react/forms/input/search`
   */
		search: _propTypes2.default.node,
		/**
   * Set the App Launcher's title text (for localization)
   */
		title: _propTypes2.default.string,
		/**
   * Assistive text for app launcher icon
   */
		triggerAssistiveText: _propTypes2.default.string,
		/**
   * This is typically the name of the cloud or application
   */
		triggerName: _propTypes2.default.node,
		/**
   * Callback when the App Launcher icon is clicked
   */
		triggerOnClick: _propTypes2.default.func
	},

	getDefaultProps: function getDefaultProps() {
		return {
			triggerAssistiveText: 'Open App Launcher',
			title: 'App Launcher'
		};
	},
	getInitialState: function getInitialState() {
		return {
			isOpen: false
		};
	},
	componentWillMount: function componentWillMount() {
		// `checkProps` issues warnings to developers about properties (similar to React's built in development tools)
		(0, _checkProps2.default)(_constants.APP_LAUNCHER, this.props);
	},
	openAppLauncher: function openAppLauncher(event) {
		this.setState({ isOpen: true });

		if ((0, _lodash2.default)(this.props.triggerOnClick)) {
			this.props.triggerOnClick(event);
		}
	},
	closeAppLauncher: function closeAppLauncher(event) {
		this.setState({ isOpen: false });

		if ((0, _lodash2.default)(this.props.onClose)) {
			this.props.onClose(event);
		}
	},
	renderSearch: function renderSearch() {
		var _this = this;

		var returnVal = void 0;

		if (this.props.search) {
			returnVal = _react2.default.createElement(
				'div',
				{
					className: 'slds-app-launcher__header-search',
					ref: function ref(component) {
						if (component) {
							if (!_this.focusedOnSearch) {
								var input = component.querySelector('input');
								if (input) {
									// push to end of stack so click event doesn't blur the focus
									setTimeout(function () {
										input.focus();
										_this.focusedOnSearch = true;
									}, 0);
								}
							}
						} else {
							_this.focusedOnSearch = false;
						}
					}
				},
				this.props.search
			);
		}

		return returnVal;
	},
	render: function render() {
		var isOpen = this.props.isOpen !== undefined ? this.props.isOpen : this.state.isOpen;

		// Should be removed in the future by adding a reset class of some sort.
		var style = this.props.noTruncate ? { maxWidth: 'none' } : null;

		var customModalHeader = _react2.default.createElement(
			'div',
			{ className: 'slds-grid slds-grid--align-spread slds-grid--vertical-align-center' },
			_react2.default.createElement(
				'h2',
				{ className: 'slds-text-heading--medium' },
				this.props.title
			),
			this.renderSearch(),
			this.props.modalHeaderButton ? this.props.modalHeaderButton : _react2.default.createElement('span', { className: 'slds-size--1-of-7' })
		);

		// Not present in SLDS, but is consistent with other implementations of App Launcher. This also prevents resizing/jumping around when filtering. It will start clipping the modal close button at 600px viewport height.
		var modalContentStaticHeight = '90%';

		return _react2.default.createElement(
			'div',
			{ className: 'slds-context-bar__item slds-no-hover', style: style },
			_react2.default.createElement(
				'div',
				{ className: 'slds-context-bar__icon-action' },
				_react2.default.createElement(
					'button',
					{
						'aria-haspopup': 'true',
						className: 'slds-button slds-icon-waffle_container slds-context-bar__button',
						onClick: this.openAppLauncher
					},
					_react2.default.createElement(
						'span',
						{ className: 'slds-icon-waffle' },
						_react2.default.createElement('span', { className: 'slds-r1' }),
						_react2.default.createElement('span', { className: 'slds-r2' }),
						_react2.default.createElement('span', { className: 'slds-r3' }),
						_react2.default.createElement('span', { className: 'slds-r4' }),
						_react2.default.createElement('span', { className: 'slds-r5' }),
						_react2.default.createElement('span', { className: 'slds-r6' }),
						_react2.default.createElement('span', { className: 'slds-r7' }),
						_react2.default.createElement('span', { className: 'slds-r8' }),
						_react2.default.createElement('span', { className: 'slds-r9' })
					),
					this.props.triggerAssistiveText && _react2.default.createElement(
						'span',
						{ className: 'slds-assistive-text' },
						this.props.triggerAssistiveText
					)
				)
			),
			_react2.default.createElement(
				_modal2.default,
				{
					contentClassName: 'slds-modal__content slds-app-launcher__content slds-p-around--medium',
					contentStyle: { minHeight: modalContentStaticHeight },
					isOpen: isOpen,
					onRequestClose: this.closeAppLauncher,
					containerClassName: (0, _classnames2.default)('app-launcher', this.props.modalClassName),
					size: 'large',
					header: customModalHeader,
					headerClassName: 'slds-app-launcher__header'
				},
				this.props.children
			),
			this.props.triggerName ? _react2.default.createElement(
				'span',
				{
					className: (0, _classnames2.default)('slds-context-bar__label-action slds-context-bar__app-name', { 'slds-truncate': !this.props.noTruncate })
				},
				this.props.triggerName
			) : null
		);
	}
});

// ## Constants


// This component's `checkProps` which issues warnings to developers about properties when in development mode (similar to React's built in development tools)


// ### classNames
exports.default = AppLauncher;