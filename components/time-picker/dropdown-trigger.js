'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _input = require('../forms/input');

var _input2 = _interopRequireDefault(_input);

var _utilities = require('../../utilities');

var _constants = require('../../utilities/constants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; } /*
                                                                                                                                                                                                                             Copyright (c) 2015, salesforce.com, inc. All rights reserved.
                                                                                                                                                                                                                             
                                                                                                                                                                                                                             Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:
                                                                                                                                                                                                                             Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
                                                                                                                                                                                                                             Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
                                                                                                                                                                                                                             Neither the name of salesforce.com, inc. nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.
                                                                                                                                                                                                                             
                                                                                                                                                                                                                             THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
                                                                                                                                                                                                                             */

// # Timepicker Dropdown Trigger

// ## Dependencies

// ### React


// ### Children


// ## Constants


/**
*  Component description.
*/
var TimepickerDropdownTrigger = _react2.default.createClass({
	// ### Display Name
	// Always use the canonical component name (set in the core) as the React
	// display name.
	displayName: _constants.MENU_DROPDOWN_TRIGGER,

	// ### Prop Types
	propTypes: {
		/**
  * A unique ID is needed in order to support keyboard navigation, ARIA support, and connect the dropdown to the triggering input.
  */
		id: _react.PropTypes.string,
		/**
   * This label appears above the input.
   */
		label: _react.PropTypes.string,
		/**
   * The dropdown menu.
   */
		menu: _react.PropTypes.node,
		/**
   * Is only called when `openOn` is set to `hover` and when the triggering input loses focus.
   */
		onBlur: _react.PropTypes.func,
		/**
   * This prop is passed onto the triggering `Input`. Triggered when the trigger input is clicked.
   */
		onClick: _react.PropTypes.func,
		/**
   * Is only called when `openOn` is set to `hover` and when the triggering input gains focus.
   */
		onFocus: _react.PropTypes.func,
		/**
   * Called when a key pressed.
   */
		onKeyDown: _react.PropTypes.func,
		/**
   * Called when mouse clicks down on the trigger input.
   */
		onMouseDown: _react.PropTypes.func,
		/**
   * The ref of the actual triggering input.
   */
		triggerRef: _react.PropTypes.func,
		/**
   * Date
   */
		value: _react.PropTypes.string
	},

	// ### Render
	render: function render() {
		var _props = this.props;
		var menu = _props.menu;
		var onBlur = _props.onBlur;
		var onFocus = _props.onFocus;
		var onKeyDown = _props.onKeyDown;
		var onMouseDown = _props.onMouseDown;
		var triggerRef = _props.triggerRef;

		var props = _objectWithoutProperties(_props, ['menu', 'onBlur', 'onFocus', 'onKeyDown', 'onMouseDown', 'triggerRef']);

		return _react2.default.createElement(
			'div',
			{
				onBlur: onBlur,
				onFocus: onFocus,
				onKeyDown: this.handleKeyDown,
				onMouseDown: onMouseDown
			},
			_react2.default.createElement(
				_input2.default,
				_extends({}, props, { inputRef: triggerRef }),
				menu
			)
		);
	},
	handleKeyDown: function handleKeyDown(event) {
		if (this.props.onKeyDown && event.keyCode) {
			if (event.keyCode === _utilities.KEYS.ENTER || event.keyCode === _utilities.KEYS.DOWN || event.keyCode === _utilities.KEYS.UP || event.keyCode === _utilities.KEYS.ESCAPE) {
				this.props.onKeyDown(event);
			}
		}
	}
});

module.exports = TimepickerDropdownTrigger;