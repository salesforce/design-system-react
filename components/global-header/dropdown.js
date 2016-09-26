'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _menuDropdown = require('../menu-dropdown');

var _menuDropdown2 = _interopRequireDefault(_menuDropdown);

var _dropdownTrigger = require('./dropdown-trigger');

var _dropdownTrigger2 = _interopRequireDefault(_dropdownTrigger);

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

// # Global Header Dropdown Component

// ## Dependencies

// ### React


// ### Dropdown


// ## Constants


/**
 * This component is an implementation of `MenuDropdown` with a custom trigger. All the properties listed below are provided to the `MenuDropdown` component. Any additional properties are provided to the Custom Trigger (that is the `Button` or `li` tag).
 */
var GlobalHeaderDropdown = function GlobalHeaderDropdown(props) {
	var globalAction = props.globalAction;
	var iconVariant = props.iconVariant;

	var rest = _objectWithoutProperties(props, ['globalAction', 'iconVariant']);

	var iconVariantOverride = void 0;

	if (globalAction) {
		iconVariantOverride = 'container';
	}

	return _react2.default.createElement(
		_menuDropdown2.default,
		rest,
		_react2.default.createElement(_dropdownTrigger2.default, {
			globalAction: globalAction,
			iconSize: globalAction && 'small',
			iconVariant: iconVariantOverride || iconVariant
		})
	);
};

// ### Display Name
// Always use the canonical component name (set in the core) as the React
// display name.
GlobalHeaderDropdown.displayName = _constants.GLOBAL_HEADER_TOOL;

// ### Prop Types
GlobalHeaderDropdown.propTypes = {
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
  * Name of the icon. Visit <a href="http://www.lightningdesignsystem.com/resources/icons">Lightning Design System Icons</a> to reference icon names.
  */
	iconName: _react.PropTypes.string,
	/**
  * For icon variants, please reference <a href="http://www.lightningdesignsystem.com/components/buttons/#icon">Lightning Design System Icons</a>.
  */
	iconVariant: _react.PropTypes.oneOf(['bare', 'container', 'border', 'border-filled', 'more', 'global-header']),
	/**
 * A unique ID is needed in order to support keyboard navigation, ARIA support, and connect the dropdown to the triggering button.
 */
	id: _react.PropTypes.string,
	/**
 * Adds custom styling such as inverse fill and special sizing/spacing
 */
	globalAction: _react.PropTypes.bool,
	/**
  * Positions dropdown menu with a nubbin--that is the arrow notch. The placement options correspond to the placement of the nubbin. This is implemeted with CSS classes and is best used with a `Button` with "icon container" styling. Dropdown menus will still be contained to the closest scrolling parent.
  */
	nubbinPosition: _react.PropTypes.oneOf(['top left', 'top', 'top right', 'bottom left', 'bottom', 'bottom right']),
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
GlobalHeaderDropdown.defaultProps = {
	align: 'right',
	buttonVariant: 'icon',
	iconVariant: 'global-header',
	nubbinPosition: 'top right',
	// TODO: Use design tokens to remove "magic numbers" that center nubbin under button
	offset: '-12px -16px'
};

module.exports = GlobalHeaderDropdown;