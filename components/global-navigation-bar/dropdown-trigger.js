'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _button = require('../button');

var _button2 = _interopRequireDefault(_button);

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

// # Global Navigation Dropdown Component

// ## Dependencies

// ### React


// ### classNames


// ### Children


/**
*  The Dropdown Button Trigger renders the default trigger button for the dropdown menu. If this component has children, it does not render itself to the DOM. Instead, it renders its child element, `Button`, and all that child's properties. This component may be used as a template to create custom triggers that do not use `Button`.
*/
var GlobalNavigationDropdownTrigger = _react2.default.createClass({
	// ### Display Name
	// Always use the canonical component name (set in the core) as the React
	// display name.
	displayName: _constants.MENU_DROPDOWN_TRIGGER,

	// ### Prop Types
	propTypes: {
		/**
   * Text that is visually hidden but read aloud by screenreaders to tell the user what the icon means.
   * If the button has an icon and a visible label, you can omit the <code>assistiveText</code> prop and use the <code>label</code> prop.
   */
		assistiveText: _react.PropTypes.string.isRequired,
		/**
   * CSS classes to be added to the 'li'.
   */
		className: _react.PropTypes.oneOfType([_react.PropTypes.array, _react.PropTypes.object, _react.PropTypes.string]),
		/**
  * A unique ID is needed in order to support keyboard navigation, ARIA support, and connect the dropdown to the triggering button.
  */
		id: _react.PropTypes.string,
		/**
   * Visible label on the dropdown menu trigger button.
   */
		label: _react.PropTypes.string,
		/**
   * The dropdown menu.
   */
		menu: _react.PropTypes.node,
		/**
   * This prop is passed onto the triggering `li` element.
   */
		onClick: _react.PropTypes.func
	},

	// ### Render
	render: function render() {
		var _props = this.props;
		var className = _props.className;
		var id = _props.id;
		var label = _props.label;
		var menu = _props.menu;
		var onClick = _props.onClick;

		var rest = _objectWithoutProperties(_props, ['className', 'id', 'label', 'menu', 'onClick']);

		return _react2.default.createElement(
			'li',
			{
				'aria-haspopup': 'true',
				className: (0, _classnames2.default)('slds-context-bar__item', 'slds-context-bar-action', 'slds-dropdown-trigger', className),
				id: id,
				onClick: onClick
			},
			_react2.default.createElement(
				'a',
				{ className: 'slds-context-bar__label-action' },
				label
			),
			_react2.default.createElement(
				'div',
				{ className: 'slds-context-bar__icon-action slds-p-left--none' },
				_react2.default.createElement(_button2.default, _extends({
					assistiveText: this.props.assistiveText
				}, rest, {
					className: 'slds-context-bar__button slds-context-bar-action__trigger',
					'aria-haspopup': 'true',
					iconCategory: 'utility',
					iconName: 'down',
					iconVariant: 'bare',
					iconSize: 'x-small',
					variant: 'icon'
				})),
				menu
			)
		);
	}
});

module.exports = GlobalNavigationDropdownTrigger;