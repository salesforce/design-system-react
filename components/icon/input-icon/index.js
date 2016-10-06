'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _lodash = require('lodash.isfunction');

var _lodash2 = _interopRequireDefault(_lodash);

var _utilityIcon = require('../../utilities/utility-icon');

var _utilityIcon2 = _interopRequireDefault(_utilityIcon);

var _button = require('../../button');

var _button2 = _interopRequireDefault(_button);

var _constants = require('../../../utilities/constants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; } /*
                                                                                                                                                                                                                             Copyright (c) 2015, salesforce.com, inc. All rights reserved.
                                                                                                                                                                                                                             
                                                                                                                                                                                                                             Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:
                                                                                                                                                                                                                             Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
                                                                                                                                                                                                                             Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
                                                                                                                                                                                                                             Neither the name of salesforce.com, inc. nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.
                                                                                                                                                                                                                             
                                                                                                                                                                                                                             THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS 'AS IS' AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
                                                                                                                                                                                                                             */

// ### React


// ### classNames
// [github.com/JedWatson/classnames](https://github.com/JedWatson/classnames)
// A simple javascript utility for conditionally joining classNames together.


// ### isFunction


// ## Children


// ## Constants


/**
 * A wrapper for icons that will be rendered inside of an Input
 *
 * If the `onClick` function prop is provided, the `design-system-react/components/button` component is used.
 * If not, the icon will be an instance of `design-system-react/components/utilities/utility-icon`.
 * Checkout out the appropriate component to see what props can be passed along via the `{...props}` rest operator
 */
var InputIcon = function InputIcon(props) {
	var category = props.category;
	var iconPosition = props.iconPosition;
	var name = props.name;
	var onClick = props.onClick;

	var rest = _objectWithoutProperties(props, ['category', 'iconPosition', 'name', 'onClick']);

	return (0, _lodash2.default)(onClick) ? _react2.default.createElement(_button2.default, _extends({
		className: (0, _classnames2.default)('slds-input__icon', _defineProperty({}, 'slds-input__icon--' + iconPosition, iconPosition)),
		iconCategory: category,
		iconName: name,
		onClick: onClick,
		variant: 'icon'
	}, rest)) : _react2.default.createElement(_utilityIcon2.default, _extends({
		'aria-hidden': true,
		category: category,
		className: (0, _classnames2.default)('slds-input__icon slds-icon-text-default', _defineProperty({}, 'slds-input__icon--' + iconPosition, iconPosition)),
		name: name
	}, rest));
};

InputIcon.displayName = _constants.ICON_INPUT;

InputIcon.propTypes = {
	/**
  * Icon category from [lightningdesignsystem.com/icons/](https://www.lightningdesignsystem.com/icons/)
  */
	category: _react.PropTypes.string,
	/**
  * This is only needed if an input contains two icons, the Input component handles this prop for you.
  */
	iconPosition: _react.PropTypes.oneOf(['left', 'right']),
	/**
  * Name of the icon. Visit <a href='http://www.lightningdesignsystem.com/resources/icons'>Lightning Design System Icons</a> to reference icon names.
  */
	name: _react.PropTypes.string,
	/**
  * This event fires when the icon is clicked.
  */
	onClick: _react.PropTypes.func
};

InputIcon.defaultProps = {
	category: 'utility'
};

module.exports = InputIcon;