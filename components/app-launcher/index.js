'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _lodash = require('lodash.isfunction');

var _lodash2 = _interopRequireDefault(_lodash);

var _checkProps = require('./check-props');

var _checkProps2 = _interopRequireDefault(_checkProps);

var _modal = require('../modal');

var _modal2 = _interopRequireDefault(_modal);

var _search = require('../forms/input/search');

var _search2 = _interopRequireDefault(_search);

var _constants = require('../../utilities/constants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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


// This component's `checkProps` which issues warnings to developers about properties when in development mode (similar to React's built in development tools)


// ### classNames
var AppLauncher = _react2.default.createClass({
	// ### Display Name
	// Always use the canonical component name as the React display name.
	displayName: _constants.APP_LAUNCHER,

	// ### Prop Types
	propTypes: {
		/*
   * All of the App Launcher's children
   */
		children: _react.PropTypes.node.isRequired,
		/*
   * Control the open/close state of the App Launcher
   */
		isOpen: _react.PropTypes.bool,
		/*
   * Button that exists in the upper right hand corner of the App Launcher modal
   */
		modalHeaderButton: _react.PropTypes.node,
		/*
   * Callback when the App Launcher Modal is closed
   */
		onClose: _react.PropTypes.func,
		/*
   * Callback fired when search value changes
   */
		onSearch: _react.PropTypes.func.isRequired,
		/**
   * Allows longer application names without truncating them.
   */
		noTruncate: _react.PropTypes.bool,
		/*
   * Set the search input's placeholder text (for localization)
   */
		searchPlaceholderText: _react.PropTypes.string,
		/*
   * Set the App Launcher's title text (for localization)
   */
		title: _react.PropTypes.string,
		/*
   * Assistive text for app launcher icon
   */
		triggerAssistiveText: _react.PropTypes.string,
		/**
   * This is typically the name of the cloud or application
   */
		triggerName: _react.PropTypes.node,
		/*
   * Callback when the App Launcher icon is clicked
   */
		triggerOnClick: _react.PropTypes.func
	},

	componentWillMount: function componentWillMount() {
		// `checkProps` issues warnings to developers about properties (similar to React's built in development tools)
		(0, _checkProps2.default)(_constants.APP_LAUNCHER, this.props);
	},
	getDefaultProps: function getDefaultProps() {
		return {
			triggerAssistiveText: 'Open App Launcher',
			searchPlaceholderText: 'Find an app',
			title: 'App Launcher'
		};
	},
	getInitialState: function getInitialState() {
		return {
			isOpen: false
		};
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
			_react2.default.createElement(
				'div',
				{ className: 'slds-app-launcher__header-search' },
				_react2.default.createElement(_search2.default, {
					id: 'app-launcher-search',
					onChange: this.props.onSearch,
					assistiveText: this.props.searchPlaceholderText,
					placeholder: this.props.searchPlaceholderText
				})
			),
			this.props.modalHeaderButton ? this.props.modalHeaderButton : _react2.default.createElement('span', { className: 'slds-size--1-of-7' })
		);

		return _react2.default.createElement(
			'div',
			{ className: 'slds-context-bar__item slds-no-hover', style: style },
			_react2.default.createElement(
				'div',
				{ className: 'slds-context-bar__icon-action' },
				_react2.default.createElement(
					'a',
					{
						href: 'javascript:void(0);' // eslint-disable-line no-script-url
						, 'aria-haspopup': 'true',
						className: 'slds-icon-waffle_container slds-context-bar__button',
						onClick: this.openAppLauncher
					},
					_react2.default.createElement(
						'div',
						{ className: 'slds-icon-waffle' },
						_react2.default.createElement('div', { className: 'slds-r1' }),
						_react2.default.createElement('div', { className: 'slds-r2' }),
						_react2.default.createElement('div', { className: 'slds-r3' }),
						_react2.default.createElement('div', { className: 'slds-r4' }),
						_react2.default.createElement('div', { className: 'slds-r5' }),
						_react2.default.createElement('div', { className: 'slds-r6' }),
						_react2.default.createElement('div', { className: 'slds-r7' }),
						_react2.default.createElement('div', { className: 'slds-r8' }),
						_react2.default.createElement('div', { className: 'slds-r9' })
					)
				)
			),
			_react2.default.createElement(
				_modal2.default,
				{
					isOpen: isOpen,
					onRequestClose: this.closeAppLauncher,
					containerClassName: 'app-launcher',
					size: 'large',
					header: customModalHeader,
					headerClassName: 'slds-app-launcher__header'
				},
				_react2.default.createElement(
					'div',
					{ className: 'slds-modal__content slds-app-launcher__content slds-p-around--medium' },
					this.props.children
				)
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


// ## Children


// ### isFunction
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


module.exports = AppLauncher;