'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _utilities = require('../../utilities');

var _constants = require('../../utilities/constants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Removes the need for `PropTypes`.


// ### Event Helpers
var PropTypes = _react2.default.PropTypes;

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


// ## Constants
/*
Copyright (c) 2015, salesforce.com, inc. All rights reserved.

Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:
Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
Neither the name of salesforce.com, inc. nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

// # Global Header Component

// Implements the [Global Header design pattern](https://www.lightningdesignsystem.com/components/global-header) in React.
// Based on SLDS v2.1.0-rc.2

// ## Dependencies

// ### React

var GlobalHeader = _react2.default.createClass({
	displayName: _constants.GLOBAL_HEADER,

	propTypes: {
		/**
   * See the component description, this accepts some combination of `SLDSGlobalHeaderSearch`, `SLDSGlobalHeaderButton`, `SLDSGlobalHeaderDropdown`, and `SLDSGlobalHeaderProfile` components.
   */
		children: PropTypes.node,
		/**
   * The Salesforce logo to display in the header.
   */
		logoSrc: PropTypes.string,
		/**
   * Required for accessibility. Should jump the user to the primary content area.
   */
		onSkipToContent: PropTypes.func,
		/**
   * Required for accessibility. Should jump the user to the primary navigation.
   */
		onSkipToNav: PropTypes.func,
		/**
   * The localized text that will be read back for the "Skip to Main Content" accessibility link.
   */
		skipToContentAssistiveText: PropTypes.string,
		/**
   * The localized text that will be read back for the "Skip to Navigation" accessibility link.
   */
		skipToNavAssistiveText: PropTypes.string
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
				{ href: 'javascript:void(0);', className: 'slds-assistive-text slds-assistive-text--focus', onClick: this.handleSkipToNav },
				this.props.skipToNavAssistiveText
			) : null,
			' ',
			this.props.onSkipToContent ? _react2.default.createElement(
				'a',
				{ href: 'javascript:void(0);', className: 'slds-assistive-text slds-assistive-text--focus', onClick: this.handleSkipToContent },
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
			)
		);
		/* eslint-enable max-len, no-script-url */
	},
	handleSkipToContent: function handleSkipToContent(e) {
		_utilities.EventUtil.trap(e);
		this.props.onSkipToContent(e);
	},
	handleSkipToNav: function handleSkipToNav(e) {
		_utilities.EventUtil.trap(e);
		this.props.onSkipToNav(e);
	}
});

exports.default = GlobalHeader;