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

var _event = require('../../utilities/event');

var _event2 = _interopRequireDefault(_event);

var _constants = require('../../utilities/constants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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


// ### Event Helpers
var GlobalHeader = (0, _createReactClass2.default)({
	displayName: _constants.GLOBAL_HEADER,

	propTypes: {
		/**
   * See the component description, this accepts some combination of `SLDSGlobalHeaderSearch`, `SLDSGlobalHeaderButton`, `SLDSGlobalHeaderDropdown`, and `SLDSGlobalHeaderProfile` components.
   */
		children: _propTypes2.default.node,
		/**
   * The Salesforce logo to display in the header.
   */
		logoSrc: _propTypes2.default.string,
		/**
   * Pass in the Global Navigation Bar component
   */
		navigation: _propTypes2.default.node,
		/**
   * Required for accessibility. Should jump the user to the primary content area.
   */
		onSkipToContent: _propTypes2.default.func,
		/**
   * Required for accessibility. Should jump the user to the primary navigation.
   */
		onSkipToNav: _propTypes2.default.func,
		/**
   * The localized text that will be read back for the "Skip to Main Content" accessibility link.
   */
		skipToContentAssistiveText: _propTypes2.default.string,
		/**
   * The localized text that will be read back for the "Skip to Navigation" accessibility link.
   */
		skipToNavAssistiveText: _propTypes2.default.string
	},

	getDefaultProps: function getDefaultProps() {
		return {
			logoSrc: '/assets/images/logo.svg',
			skipToNavAssistiveText: 'Skip to Navigation',
			skipToContentAssistiveText: 'Skip to Main Content'
		};
	},
	render: function render() {
		var tools = void 0;
		var search = void 0;
		var profile = void 0;

		_react2.default.Children.forEach(this.props.children, function (child) {
			if (child && child.type.displayName === _constants.GLOBAL_HEADER_TOOL) {
				if (!tools) tools = [];
				tools.push(child);
			} else if (child && child.type.displayName === _constants.GLOBAL_HEADER_SEARCH) {
				search = child;
			} else if (child && child.type.displayName === _constants.GLOBAL_HEADER_PROFILE) {
				profile = child;
			}
		});

		/* eslint-disable max-len, no-script-url */
		return _react2.default.createElement(
			'header',
			{ className: 'slds-global-header_container' },
			this.props.onSkipToNav ? _react2.default.createElement(
				'a',
				{
					href: 'javascript:void(0);',
					className: 'slds-assistive-text slds-assistive-text--focus',
					onClick: this.handleSkipToNav
				},
				this.props.skipToNavAssistiveText
			) : null,
			this.props.onSkipToContent ? _react2.default.createElement(
				'a',
				{
					href: 'javascript:void(0);',
					className: 'slds-assistive-text slds-assistive-text--focus',
					onClick: this.handleSkipToContent
				},
				this.props.skipToContentAssistiveText
			) : null,
			_react2.default.createElement(
				'div',
				{ className: 'slds-global-header slds-grid slds-grid--align-spread' },
				_react2.default.createElement(
					'div',
					{ className: 'slds-global-header__item' },
					_react2.default.createElement(
						'div',
						{ className: 'slds-global-header__logo' },
						_react2.default.createElement('img', { src: this.props.logoSrc, alt: '' })
					)
				),
				search,
				_react2.default.createElement(
					'ul',
					{ className: 'slds-global-header__item slds-grid slds-grid--vertical-align-center' },
					tools,
					profile
				)
			),
			this.props.navigation
		);
		/* eslint-enable max-len, no-script-url */
	},
	handleSkipToContent: function handleSkipToContent(e) {
		_event2.default.trap(e);
		this.props.onSkipToContent(e);
	},
	handleSkipToNav: function handleSkipToNav(e) {
		_event2.default.trap(e);
		this.props.onSkipToNav(e);
	}
});

// ## Constants
/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

// # Global Header Component

// Implements the [Global Header design pattern](https://www.lightningdesignsystem.com/components/global-header) in React.
// Based on SLDS v2.1.0-rc.2

// ## Dependencies

// ### React
exports.default = GlobalHeader;