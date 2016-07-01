'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _lodash = require('lodash.assign');

var _lodash2 = _interopRequireDefault(_lodash);

var _menuDropdown = require('../menu-dropdown');

var _menuDropdown2 = _interopRequireDefault(_menuDropdown);

var _popover = require('../popover');

var _popover2 = _interopRequireDefault(_popover);

var _button = require('../button');

var _button2 = _interopRequireDefault(_button);

var _constants = require('../../utilities/constants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               Copyright (c) 2015, salesforce.com, inc. All rights reserved.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               Neither the name of salesforce.com, inc. nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               */

// # ContextBar Dropdown Component

// ## Dependencies

// ### React


// ### classNames


// ### assign


// ### Dropdown


// ## Children


// ## Constants


var defaultProps = (0, _lodash2.default)({}, _menuDropdown.defaultProps, { align: 'right' });

/**
 * This component extends `MenuDropdown` and modifies the `render` function to allow the markup to work within `ContextBar`. See the complete `MenuDropdown` for context.
 */

var ContextBarDropdown = function (_Dropdown) {
	_inherits(ContextBarDropdown, _Dropdown);

	function ContextBarDropdown() {
		_classCallCheck(this, ContextBarDropdown);

		return _possibleConstructorReturn(this, Object.getPrototypeOf(ContextBarDropdown).apply(this, arguments));
	}

	_createClass(ContextBarDropdown, [{
		key: 'getModalPopover',
		value: function getModalPopover() {
			var _this2 = this;

			return !this.props.disabled && this.state.isOpen ? _react2.default.createElement(
				_popover2.default,
				{
					className: (0, _classnames2.default)('slds-dropdown', 'slds-dropdown--menu', 'slds-dropdown--' + this.props.align, this.props.className),
					closeOnTabKey: true,
					dropClass: 'slds-picklist' // TODO: in next SLDS release, remove slds-picklist class because slds-dropdown--length-5 will be active.
					, horizontalAlign: this.props.align,
					flippable: true,
					onMouseEnter: this.props.openOn === 'hover' ? this.handleMouseEnter.bind(this) : null,
					onMouseLeave: this.props.openOn === 'hover' ? this.handleMouseLeave.bind(this) : null,
					onClose: function onClose() {
						return _this2.handleCancel();
					},
					targetElement: this.refs.trigger
				},
				this.getPopoverContent()
			) : null;
		}
	}, {
		key: 'render',
		value: function render() {
			var _props = this.props;
			var className = _props.className;
			var label = _props.label;
			var triggerIconCategory = _props.triggerIconCategory;
			var triggerIconName = _props.triggerIconName;

			// If no trigger was passed in, add the default ContextBar trigger so that
			// it overrides the button trigger that Dropdown usually defaults to.

			return _react2.default.createElement(
				'li',
				{
					className: (0, _classnames2.default)('slds-context-bar__item', 'slds-context-bar-action', 'slds-dropdown-trigger', className),
					onBlur: this.props.openOn === 'hover' ? this.handleBlur.bind(this) : null,
					onClick: this.props.openOn === 'click' ? this.handleClick.bind(this) : null,
					onFocus: this.props.openOn === 'hover' ? this.handleFocus.bind(this) : null
					/* TODO: Fix this when dropdown is updated to not use bind. */
					/* eslint-disable react/jsx-no-bind */
					, onMouseDown: this.props.openOn === 'click' ? this.handleMouseDown.bind(this) : null,
					onMouseEnter: this.props.openOn === 'hover' ? this.handleMouseEnter.bind(this) : null,
					onMouseLeave: this.props.openOn === 'hover' ? this.handleMouseLeave.bind(this) : null,
					ref: 'trigger'
				},
				_react2.default.createElement(
					'a',
					{ className: 'slds-context-bar__label-action' },
					label
				),
				_react2.default.createElement(
					'div',
					{ className: 'slds-context-bar__icon-action slds-p-left--none' },
					_react2.default.createElement(
						_button2.default,
						{
							'aria-haspopup': 'true',
							assistiveText: label,
							className: 'slds-context-bar__button slds-context-bar-action__trigger',
							disabled: this.props.disabled,
							hint: this.props.hint,
							iconCategory: triggerIconCategory || 'utility',
							iconName: triggerIconName || 'down',
							iconVariant: 'bare',
							iconSize: 'x-small',
							id: this.state.triggerId,
							onKeyDown: this.handleKeyDown.bind(this),
							ref: 'button',
							style: this.props.style,
							tabIndex: this.state.isOpen ? '-1' : '0',
							variant: 'icon',
							tooltip: this.props.tooltip
						},
						this.props.modal ? this.getModalPopover() : this.getSimplePopover()
					)
				)
			);
		}
	}]);

	return ContextBarDropdown;
}(_menuDropdown2.default);

ContextBarDropdown.defaultProps = defaultProps;
ContextBarDropdown.displayName = _constants.CONTEXT_BAR_DROPDOWN;

exports.default = ContextBarDropdown;