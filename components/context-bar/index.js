'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _constants = require('../../utilities/constants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Context Bar represents a list of links that either take the user to another page or parts of the page the user is in.
 */


// ### classNames
var ContextBar = _react2.default.createClass({
	// ### Display Name
	// Always use the canonical component name as the React display name.
	displayName: _constants.CONTEXT_BAR,

	// ### Prop Types
	propTypes: {
		/**
   * The items to be displayed in the ContextBar.
   */
		children: _react.PropTypes.node,
		/**
   * CSS class names to be added to the container element.
   */
		className: _react.PropTypes.oneOfType([_react.PropTypes.array, _react.PropTypes.object, _react.PropTypes.string]),
		/**
   * Typically the cloud name (e.g.- "sales" or "marketing"). This primarily changes the background color.
   */
		cloud: _react.PropTypes.string,
		/**
   * Transforms text and interactions (such as hover) to be more visually accessible.
   */
		theme: _react.PropTypes.oneOf(['light', 'dark'])
	},

	getDefaultProps: function getDefaultProps() {
		return {
			cloud: 'default',
			theme: 'dark'
		};
	},


	// ### Render
	render: function render() {
		var cloudClass = 'slds-context-bar--theme-' + this.props.cloud;
		var themeClass = 'slds-context-bar--theme-' + this.props.theme;
		return _react2.default.createElement(
			'div',
			{ className: (0, _classnames2.default)('slds-context-bar', cloudClass, themeClass, this.props.className) },
			this.props.children
		);
	}
});

// ## Constants
/*
Copyright (c) 2015, salesforce.com, inc. All rights reserved.

Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:
Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
Neither the name of salesforce.com, inc. nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

// # Context Bar Component

// Implements the [Context Bar design pattern](https://www.lightningdesignsystem.com/components/context-bar/) in React.

// ## Dependencies

// ### React


module.exports = ContextBar;