'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _lodash = require('lodash.isfunction');

var _lodash2 = _interopRequireDefault(_lodash);

var _shortid = require('shortid');

var _shortid2 = _interopRequireDefault(_shortid);

var _utilities = require('../../../utilities');

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _constants = require('../../../utilities/constants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; } /*
                                                                                                                                                                                                                             Copyright (c) 2015, salesforce.com, inc. All rights reserved.
                                                                                                                                                                                                                             
                                                                                                                                                                                                                             Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:
                                                                                                                                                                                                                             Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
                                                                                                                                                                                                                             Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
                                                                                                                                                                                                                             Neither the name of salesforce.com, inc. nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.
                                                                                                                                                                                                                             
                                                                                                                                                                                                                             THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
                                                                                                                                                                                                                             */

// # Checkbox Component

// Implements the [Checkbox design pattern](https://www.lightningdesignsystem.com/components/forms/#checkbox) in React.

// ### React


// ### isFunction


// ### shortid
// [npmjs.com/package/shortid](https://www.npmjs.com/package/shortid)
// shortid is a short, non-sequential, url-friendly, unique id generator


// ### Event Helpers


// ### classNames


// Remove the need for `React.PropTypes`
var PropTypes = _react2.default.PropTypes;


/**
 * The ability to style checkboxes with CSS varies across browsers. Using this component ensures checkboxes look the same everywhere.
 */
var Checkbox = _react2.default.createClass({
	// ### Display Name
	// Always use the canonical component name as the React display name.
	displayName: _constants.FORMS_CHECKBOX,

	// ### Prop Types
	propTypes: {
		/**
   * Text that is visually hidden but read aloud by screenreaders to tell the user what the Checkbox is for.
   * If the Checkbox has a visible label, you can omit the <code>assistiveText</code> prop and use the <code>label</code> prop.
   */
		assistiveText: _react2.default.PropTypes.string,
		/**
   * The Checkbox is a controlled component, and will always be in this state.
   */
		checked: _react2.default.PropTypes.bool,
		/**
   * Class names to be added to the outer container of the Checkbox.
   */
		className: PropTypes.oneOfType([PropTypes.array, PropTypes.object, PropTypes.string]),
		/**
   * Disables the Checkbox and prevents clicking it.
   */
		disabled: PropTypes.bool,
		/**
   * Message to display when the Checkbox is in an error state. When this is present, also visually highlights the component as in error.
   */
		errorText: _react2.default.PropTypes.string,
		/**
   * A unique ID is needed in order to support keyboard navigation and ARIA support.
   */
		id: PropTypes.string,
		/**
   * An optional label for the Checkbox.
   */
		label: _react2.default.PropTypes.string,
		/**
   * Name of the submitted form parameter.
   */
		name: PropTypes.string,
		/**
   * This event fires when the Checkbox changes.
   */
		onChange: PropTypes.func,
		/**
   * Highlights the Checkbox as a required field (does not perform any validation).
   */
		required: PropTypes.bool
	},

	getDefaultProps: function getDefaultProps() {
		return {
			id: _shortid2.default.generate()
		};
	},


	// ### Render
	render: function render() {
		var _props = this.props;
		var assistiveText = _props.assistiveText;
		var checked = _props.checked;
		var className = _props.className;
		var disabled = _props.disabled;
		var errorText = _props.errorText;
		var label = _props.label;
		var name = _props.name;
		var onChange = _props.onChange;
		var // eslint-disable-line no-unused-vars
		required = _props.required;

		var props = _objectWithoutProperties(_props, ['assistiveText', 'checked', 'className', 'disabled', 'errorText', 'label', 'name', 'onChange', 'required']);

		return _react2.default.createElement(
			'div',
			{
				className: (0, _classnames2.default)('slds-form-element', {
					'is-required': required,
					'slds-has-error': errorText
				}, className),
				onKeyDown: this.handleKeyDown
			},
			_react2.default.createElement(
				'div',
				{ className: 'slds-form-element__control' },
				_react2.default.createElement(
					'label',
					{ className: 'slds-checkbox' },
					required ? _react2.default.createElement(
						'abbr',
						{ className: 'slds-required', title: 'required' },
						'*'
					) : null,
					_react2.default.createElement('input', _extends({}, props, {
						checked: checked,
						name: name,
						disabled: disabled,
						onChange: this.handleChange,
						type: 'checkbox'
					})),
					_react2.default.createElement('span', { className: 'slds-checkbox--faux' }),
					label ? _react2.default.createElement(
						'span',
						{ className: 'slds-form-element__label' },
						label
					) : null,
					assistiveText ? _react2.default.createElement(
						'span',
						{ className: 'slds-assistive-text' },
						assistiveText
					) : null
				)
			),
			errorText ? _react2.default.createElement(
				'div',
				{ className: 'slds-form-element__help' },
				errorText
			) : null
		);
	},
	handleChange: function handleChange(e) {
		if ((0, _lodash2.default)(this.props.onChange)) {
			this.props.onChange(!this.props.checked, e);
		}
	},
	handleKeyDown: function handleKeyDown(e) {
		if (e.keyCode) {
			if (e.keyCode === _utilities.KEYS.ENTER || e.keyCode === _utilities.KEYS.SPACE) {
				_utilities.EventUtil.trapImmediate(e);
				this.handleChange(e);
			}
		}
	}
});

exports.default = Checkbox;