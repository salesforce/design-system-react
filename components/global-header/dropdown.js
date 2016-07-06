'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _menuDropdown = require('../menu-dropdown');

var _menuDropdown2 = _interopRequireDefault(_menuDropdown);

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

// # Global Header Button Component

// ## Dependencies

// ### React


// ### classNames


// ### MenuDropdown


// ## Constants


// Removes the need for `PropTypes`.
var PropTypes = _react2.default.PropTypes;

/**
 * A helper component that renders a MenuDropdown in the tools area of the Global Header. Currently defaults to a bare icon, but this can be overriden.
 */

var GlobalHeaderDropdown = function GlobalHeaderDropdown(props) {
	var align = props.align;
	var className = props.className;
	var dropdownClassName = props.dropdownClassName;

	var rest = _objectWithoutProperties(props, ['align', 'className', 'dropdownClassName']);

	return _react2.default.createElement(
		'li',
		{ className: (0, _classnames2.default)('slds-dropdown-trigger slds-dropdown-trigger--click', className) },
		_react2.default.createElement(_menuDropdown2.default, _extends({
			align: align,
			buttonVariant: 'icon',
			className: (0, _classnames2.default)('slds-nubbin--top-' + align, dropdownClassName),
			iconVariant: 'bare'
		}, rest))
	);
};

GlobalHeaderDropdown.displayName = _constants.GLOBAL_HEADER_TOOL;

GlobalHeaderDropdown.propTypes = {
	/**
  * The side of the triggering element that the menu should align itself with.
  */
	align: PropTypes.oneOf(['right', 'left']),
	/**
  * Extra classnames to apply to the `<li />`.
  */
	className: PropTypes.string,
	/**
  * Extra classnames to apply to the dropdown.
  */
	dropdownClassName: PropTypes.string
};

GlobalHeaderDropdown.defaultProps = {
	align: 'right'
};

exports.default = GlobalHeaderDropdown;