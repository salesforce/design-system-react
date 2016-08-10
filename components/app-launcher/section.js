'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _lodash = require('lodash.isfunction');

var _lodash2 = _interopRequireDefault(_lodash);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _button = require('../button');

var _button2 = _interopRequireDefault(_button);

var _constants = require('../../utilities/constants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Removes the need for `React.PropTypes.prop`
var PropTypes = _react2.default.PropTypes;

// ### isFunction
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


// ### classNames
// [github.com/JedWatson/classnames](https://github.com/JedWatson/classnames)
// A simple javascript utility for conditionally joining classNames together.


// ## Children


// ## Constants

/**
 * App Launcher Sections allow users to categorize App Tiles as well as toggle their display
 */
var AppLauncherSection = _react2.default.createClass({
	// ### Display Name
	// Always use the canonical component name as the React display name.
	displayName: _constants.APP_LAUNCHER_SECTION,

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

	getDefaultProps: function getDefaultProps() {
		return {
			collapseSectionAssistiveText: 'Toggle visibility of section'
		};
	},
	getInitialState: function getInitialState() {
		return {
			isOpen: true
		};
	},
	toggleOpen: function toggleOpen(event) {
		this.setState({ isOpen: !this.state.isOpen });

		if ((0, _lodash2.default)(this.props.onToggleClick)) {
			this.props.onToggleClick(event);
		}
	},
	render: function render() {
		var isOpen = this.props.isOpen !== undefined ? this.props.isOpen : this.state.isOpen;
		var iconIsOpenClass = isOpen ? 'slds-is-open' : 'slds-is-close';
		var sectionIsOpenClass = isOpen ? 'slds-is-expanded' : 'slds-is-collapsed';

		return _react2.default.createElement(
			'div',
			{ className: (0, _classnames2.default)('slds-section', iconIsOpenClass) },
			_react2.default.createElement(
				'div',
				{ className: 'slds-section__title' },
				this.props.toggleable || this.props.onToggleClick ? _react2.default.createElement(_button2.default, {
					assistiveText: this.props.collapseSectionAssistiveText,
					iconName: 'switch',
					onClick: this.toggleOpen,
					className: 'slds-button--icon slds-m-right--small slds-is-open',
					variant: 'icon'
				}) : null,
				_react2.default.createElement(
					'h3',
					null,
					this.props.title
				)
			),
			_react2.default.createElement(
				'div',
				{ className: 'slds-section__content' },
				_react2.default.createElement(
					'ul',
					{ className: (0, _classnames2.default)('slds-grid slds-grid--pull-padded slds-wrap', sectionIsOpenClass) },
					_react2.default.Children.map(this.props.children, function (child) {
						return _react2.default.createElement(
							'li',
							{
								className: (0, _classnames2.default)('slds-col--padded slds-grow-none', child.props.size === 'small' ? 'slds-size--xx-small' : 'slds-size--1-of-1 slds-medium-size--1-of-3')
							},
							child
						);
					})
				)
			)
		);
	}
});

module.exports = AppLauncherSection;