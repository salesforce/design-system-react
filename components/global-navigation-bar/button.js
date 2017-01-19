'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _button = require('../button');

var _button2 = _interopRequireDefault(_button);

var _constants = require('../../utilities/constants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; } /*
                                                                                                                                                                                                                             Copyright (c) 2015, salesforce.com, inc. All rights reserved.
                                                                                                                                                                                                                             
                                                                                                                                                                                                                             Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:
                                                                                                                                                                                                                             Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
                                                                                                                                                                                                                             Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
                                                                                                                                                                                                                             Neither the name of salesforce.com, inc. nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.
                                                                                                                                                                                                                             
                                                                                                                                                                                                                             THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
                                                                                                                                                                                                                             */

// # Global Navigation Bar Button Component

// ## Dependencies

// ### React


// ### classNames


// ### Button


// ## Constants


/**
 * A helper component that renders a Button as an item in the Global Navigation Bar. All props are passed onto `Button` except `active` and `dividerPosition`.
 */
var GlobalNavigationButton = function GlobalNavigationButton(_ref) {
	var active = _ref.active;
	var dividerPosition = _ref.dividerPosition;

	var props = _objectWithoutProperties(_ref, ['active', 'dividerPosition']);

	return _react2.default.createElement(
		'li',
		{
			className: (0, _classnames2.default)('slds-context-bar__item', _defineProperty({ 'slds-is-active': active
			}, 'slds-context-bar__item--divider-' + dividerPosition, dividerPosition))
		},
		_react2.default.createElement(_button2.default, props)
	);
};

GlobalNavigationButton.displayName = _constants.GLOBAL_NAVIGATION_BAR_BUTTON;

// ### Prop Types
GlobalNavigationButton.propTypes = {
	/**
  * Whether the item is active or not.
  */
	active: _react.PropTypes.bool,
	/**
  * Determines position of separating bar.
  */
	dividerPosition: _react.PropTypes.oneOf(['left', 'right'])
};

// ### Default Props
GlobalNavigationButton.defaultProps = {
	className: 'slds-context-bar__label-action slds-text-body--regular',
	// This is a hack since buttons are not supported by Global Navigation
	// Bar and have different `font-size` and `line-height` than links or
	// dropdowns.
	style: { lineHeight: 'inherit' },
	variant: 'base'
};

exports.default = GlobalNavigationButton;