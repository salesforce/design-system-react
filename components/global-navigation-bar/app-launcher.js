'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _lodash = require('lodash.isfunction');

var _lodash2 = _interopRequireDefault(_lodash);

var _icon = require('../icon');

var _icon2 = _interopRequireDefault(_icon);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _utilities = require('../../utilities');

var _constants = require('../../utilities/constants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// ### Event Utilities
// Used for trapping events


// ### Child Components
/*
Copyright (c) 2015, salesforce.com, inc. All rights reserved.

Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:
Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
Neither the name of salesforce.com, inc. nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

// # GlobalNavigationBar App Launcher Trigger

// ## Dependencies

// ### React


var AppLauncher = _react2.default.createClass({
	displayName: _constants.GLOBAL_NAVIGATION_BAR_APPLICATION_NAME,
	propTypes: {
		/**
   * Label given to "app" icon for users of assistive technology.
   */
		assistiveText: _react.PropTypes.string.isRequired,
		/**
   * Helpful if you need an application name with custom markup.
   */
		children: _react.PropTypes.node,
		/**
   * HTML `id` that will be added to the "app icon" link. Helpful for assistive technology if `onClick` triggers a dropdown menu.
   */
		id: _react.PropTypes.string.isRequired,
		/**
   * This is typically the name of the cloud or application. `name` and `children` should not both be passed in.
   */
		name: _react.PropTypes.string,
		/**
   * Function triggered when "app" icon or application name is clicked.
   */
		onClick: _react.PropTypes.func,
		/**
   * Allows longer application names without truncating them.
   */
		noTruncate: _react.PropTypes.bool
	},

	handleClick: function handleClick(event) {
		if ((0, _lodash2.default)(this.props.onClick)) {
			_utilities.EventUtil.trap(event);
			this.props.onClick(event);
		}
	},
	render: function render() {
		var _props = this.props;
		var assistiveText = _props.assistiveText;
		var children = _props.children;
		var id = _props.id;
		var name = _props.name;
		var noTruncate = _props.noTruncate;

		// Should be removed in the future by adding a reset class of some sort.

		var style = noTruncate ? { maxWidth: 'none' } : null;

		return _react2.default.createElement(
			'div',
			{ className: 'slds-context-bar__item', style: style, onClick: this.handleClick },
			_react2.default.createElement(
				'div',
				{ className: 'slds-context-bar__icon-action' },
				_react2.default.createElement(
					'a',
					{ id: id, href: '#', 'aria-haspopup': 'true', className: 'slds-button slds-button--icon slds-context-bar__button' },
					_react2.default.createElement(_icon2.default, {
						category: 'utility',
						name: 'apps',
						inverse: true,
						className: 'slds-icon--small',
						assistiveText: assistiveText
					})
				)
			),
			_react2.default.createElement(
				'span',
				{ className: 'slds-context-bar__label-action slds-context-bar__app-name' },
				name ? _react2.default.createElement(
					'span',
					{ className: (0, _classnames2.default)({ 'slds-truncate': !noTruncate }) },
					name
				) : null,
				children
			)
		);
	}
});

// ## Constants


// ### classNames


module.exports = AppLauncher;