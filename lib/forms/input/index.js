'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.COMPONENT = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _inputIcon = require('../../icon/input-icon');

var _inputIcon2 = _interopRequireDefault(_inputIcon);

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

// # Input Component

// Implements the [Input design pattern](https://www.lightningdesignsystem.com/components/forms/#input) in React.

// ### React
// React is an external dependency of the project.


// ### classNames
// [github.com/JedWatson/classnames](https://github.com/JedWatson/classnames)
// This project uses `classnames`, "a simple javascript utility for conditionally
// joining classNames together."


// ## Children


// Remove the need for `React.PropTypes`
var PropTypes = _react2.default.PropTypes;
var COMPONENT = exports.COMPONENT = 'Input';

// ## InputDefinition
var Input = _react2.default.createClass({
	// ### Display Name
	// Always use the canonical component name as the React display name.
	displayName: COMPONENT,

	// ### Prop Types
	propTypes: {
		/**
   * Class names to be added to the outer container of the input.
   */
		className: PropTypes.oneOfType([PropTypes.array, PropTypes.object, PropTypes.string]),
		/**
   * Disables the input and prevents editing the contents.
   */
		disabled: PropTypes.bool,
		/**
   * Message to display when the input is in an error state. When this is present, also visually highlights the component as in error.
   */
		errorText: _react2.default.PropTypes.string,
		/**
   * Category of the icon.
   */
		iconCategory: _react2.default.PropTypes.oneOf(['action', 'custom', 'doctype', 'standard', 'utility']),
		/**
   * Name of the icon. Visit <a href='http://www.lightningdesignsystem.com/resources/icons'>Lightning Design System Icons</a> to reference icon names.
   */
		iconName: _react2.default.PropTypes.string,
		/**
   * Determines whether the input's icon will display that icon on the left or the right.
   */
		iconPosition: _react2.default.PropTypes.oneOf(['left', 'right']),
		/**
   * Every input must have a unique ID in order to support keyboard navigation and ARIA support.
   */
		id: PropTypes.string.isRequired,
		/**
   * An optional label appearing above the input.
   */
		label: _react2.default.PropTypes.string,
		/**
   * This event fires when the input changes.
   */
		onChange: PropTypes.func,
		/**
   * This event fires when the icon is clicked.
   */
		onIconClick: PropTypes.func,
		/**
   * Text that will appear in an empty input.
   */
		placeholder: PropTypes.string,
		/**
   * Displays the value of the input statically.
   */
		readOnly: PropTypes.bool,
		/**
   * Highlights the input as a required field (does not perform any validation).
   */
		required: PropTypes.bool,
		/**
   * The `<Input>` element includes support for all HTML5 types.
   */
		type: _react2.default.PropTypes.oneOf(['text', 'password', 'datetime', 'datetime-local', 'date', 'month', 'time', 'week', 'number', 'email', 'url', 'search', 'tel', 'color']),
		/**
   * The input is a controlled component, and will always display this value.
   */
		value: _react2.default.PropTypes.string
	},

	getDefaultProps: function getDefaultProps() {
		return {
			iconPosition: 'left',
			type: 'text'
		};
	},


	// ### Render
	render: function render() {
		var _props = this.props;
		var className = _props.className;
		var disabled = _props.disabled;
		var errorText = _props.errorText;
		var iconCategory = _props.iconCategory;
		var iconName = _props.iconName;
		var iconPosition = _props.iconPosition;
		var id = _props.id;
		var label = _props.label;
		var onChange = _props.onChange;
		var onIconClick = _props.onIconClick;
		var placeholder = _props.placeholder;
		var readOnly = _props.readOnly;
		var required = _props.required;
		var type = _props.type;
		var value = _props.value;

		var props = _objectWithoutProperties(_props, ['className', 'disabled', 'errorText', 'iconCategory', 'iconName', 'iconPosition', 'id', 'label', 'onChange', 'onIconClick', 'placeholder', 'readOnly', 'required', 'type', 'value']);

		var hasIcon = iconCategory && iconName;

		return _react2.default.createElement(
			'div',
			{ className: (0, _classnames2.default)('slds-form-element', {
					'is-required': required,
					'slds-has-error': errorText
				}, className)
			},
			label && !readOnly && _react2.default.createElement(
				'label',
				{ className: 'slds-form-element__label', htmlFor: id },
				required && _react2.default.createElement(
					'abbr',
					{ className: 'slds-required', title: 'required' },
					'*'
				),
				label
			),
			label && readOnly && _react2.default.createElement(
				'span',
				{ className: 'slds-form-element__label' },
				label
			),
			_react2.default.createElement(
				'div',
				{ className: (0, _classnames2.default)('slds-form-element__control', hasIcon && ['slds-input-has-icon', 'slds-input-has-icon--' + iconPosition], {
						'slds-has-divider--bottom': readOnly
					})
				},
				hasIcon && _react2.default.createElement(_inputIcon2.default, {
					name: iconName,
					category: iconCategory,
					onClick: onIconClick
				}),
				!readOnly && _react2.default.createElement('input', _extends({}, props, {
					className: 'slds-input',
					disabled: disabled,
					id: id,
					onChange: onChange,
					placeholder: placeholder,
					required: required,
					type: type,
					value: value
				})),
				readOnly && _react2.default.createElement(
					'span',
					{ className: 'slds-form-element__static' },
					value
				)
			),
			errorText && _react2.default.createElement(
				'div',
				{ className: 'slds-form-element__help' },
				errorText
			)
		);
	}
});

exports.default = Input;