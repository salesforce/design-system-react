'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _input = require('../../forms/input');

var _input2 = _interopRequireDefault(_input);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; } /*
                                                                                                                                                                                                                             Copyright (c) 2015, salesforce.com, inc. All rights reserved.
                                                                                                                                                                                                                             
                                                                                                                                                                                                                             Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:
                                                                                                                                                                                                                             Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
                                                                                                                                                                                                                             Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
                                                                                                                                                                                                                             Neither the name of salesforce.com, inc. nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.
                                                                                                                                                                                                                             
                                                                                                                                                                                                                             THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
                                                                                                                                                                                                                             */
/* eslint-disable indent */

// ### React
// React is an external dependency of the project.


// Removes the need for `PropTypes`.
var PropTypes = _react2.default.PropTypes;

// The component name will be used as the `DisplayName` and exported along with
// the component itself.

var COMPONENT = 'Filter';

/**
 * A default filter or search input for Cards that contain items.
 */
var Filter = _react2.default.createClass({
	// ### Display Name
	// Always use the canonical component name as the React display name.
	displayName: COMPONENT,

	// ### Prop Types
	propTypes: {
		/**
   * The HTML `id` from the card.
   */
		id: PropTypes.string,
		/**
   * This callback fires when the input changes.
   */
		onChange: PropTypes.func,
		/**
   * Text present in input until the user enters text
   */
		placeholder: PropTypes.string
	},

	// i18n
	getDefaultProps: function getDefaultProps() {
		return {
			placeholder: 'Find in List'
		};
	},
	render: function render() {
		var _props = this.props;
		var id = _props.id;
		var placeholder = _props.placeholder;
		var onChange = _props.onChange;

		var props = _objectWithoutProperties(_props, ['id', 'placeholder', 'onChange']);

		return _react2.default.createElement(_input2.default, _extends({}, props, {
			onChange: onChange,
			id: id,
			placeholder: placeholder,
			iconCategory: 'utility',
			iconName: 'search'
		}));
	}
});

module.exports = Filter;
module.exports.COMPONENT = COMPONENT;