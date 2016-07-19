'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _menuDropdown = require('../menu-dropdown');

var _menuDropdown2 = _interopRequireDefault(_menuDropdown);

var _dropdownTrigger = require('./dropdown-trigger');

var _dropdownTrigger2 = _interopRequireDefault(_dropdownTrigger);

var _constants = require('../../utilities/constants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * This component is an implementation of `MenuDropdown` with a custom trigger. All the properties listed below are provided to the `MenuDropdown` component. Any additional properties are provided to the Custom Trigger (that is the `Button` or `li` tag).
 */
/*
Copyright (c) 2015, salesforce.com, inc. All rights reserved.

Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:
Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
Neither the name of salesforce.com, inc. nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

// # Global Navigation Dropdown Component

// ## Dependencies

// ### React
var GlobalNavigationBarDropdown = function GlobalNavigationBarDropdown(props) {
	return _react2.default.createElement(
		_menuDropdown2.default,
		props,
		_react2.default.createElement(_dropdownTrigger2.default, { assistiveText: props.assistiveText })
	);
};

// ### Display Name
// Always use the canonical component name (set in the core) as the React
// display name.


// ## Constants


// ### Dropdown
GlobalNavigationBarDropdown.displayName = _constants.GLOBAL_NAVIGATION_BAR_DROPDOWN;

// ### Prop Types
GlobalNavigationBarDropdown.propTypes = {
	/**
  * Text that is visually hidden but read aloud by screenreaders to tell the user what the icon means.
  */
	assistiveText: _react.PropTypes.string.isRequired,
	/**
  * Aligns the right or left side of the menu with the respective side of the trigger. This is not intended for use with `nubbinPosition`.
  */
	align: _react.PropTypes.oneOf(['left', 'right']),
	/**
  * Extra classnames to apply to the dropdown menu.
  */
	className: _react.PropTypes.string,
	/**
  * CSS classes to be added to `li` element.
  */
	buttonClassName: _react.PropTypes.oneOfType([_react.PropTypes.array, _react.PropTypes.object, _react.PropTypes.string]),
	/**
 * A unique ID is needed in order to support keyboard navigation, ARIA support, and connect the dropdown to the triggering button.
 */
	id: _react.PropTypes.string,
	/**
  *  Offset adds pixels to the absolutely positioned dropdown menu in the format: ([vertical]px [horizontal]px).
  */
	offset: _react.PropTypes.string,
	/**
  * Triggered when an item in the menu is clicked.
  */
	onSelect: _react.PropTypes.func,
	/**
  * An array of menu item.
  */
	options: _react.PropTypes.array.isRequired
};

// ### Default Props
GlobalNavigationBarDropdown.defaultProps = {
	align: 'right'
};

module.exports = GlobalNavigationBarDropdown;