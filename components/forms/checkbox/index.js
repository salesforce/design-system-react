'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

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
   * The Checkbox is a controlled component, and will always be in this state. If checked is not defined, the state of the uncontrolled native `input` component will be used.
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
   * The Checkbox will be indeterminate if its state can not be figured out or is partially checked. Once a checkbox is indeterminate, a click should cause it to be checked. Since a user cannot put a checkbox into an indeterminate state, it is assumed you are controlling the value of `checked` with the parent, also, and that this is a controlled component.
   */
		indeterminate: _react2.default.PropTypes.bool,
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

	componentWillMount: function componentWillMount() {
		this.generatedId = _shortid2.default.generate();
	},


	// ### Render
	render: function render() {
		var _this = this;

		var _props = this.props,
		    assistiveText = _props.assistiveText,
		    checked = _props.checked,
		    className = _props.className,
		    disabled = _props.disabled,
		    id = _props.id,
		    errorText = _props.errorText,
		    indeterminate = _props.indeterminate,
		    label = _props.label,
		    name = _props.name,
		    onBlur = _props.onBlur,
		    onChange = _props.onChange,
		    onFocus = _props.onFocus,
		    onKeyDown = _props.onKeyDown,
		    onKeyPress = _props.onKeyPress,
		    onKeyUp = _props.onKeyUp,
		    readOnly = _props.readOnly,
		    required = _props.required,
		    role = _props.role,
		    props = _objectWithoutProperties(_props, ['assistiveText', 'checked', 'className', 'disabled', 'id', 'errorText', 'indeterminate', 'label', 'name', 'onBlur', 'onChange', 'onFocus', 'onKeyDown', 'onKeyPress', 'onKeyUp', 'readOnly', 'required', 'role']);

		return _react2.default.createElement(
			'div',
			{
				className: (0, _classnames2.default)('slds-form-element', {
					'is-required': required,
					'slds-has-error': errorText
				}, className)
			},
			_react2.default.createElement(
				'div',
				{ className: 'slds-form-element__control' },
				_react2.default.createElement(
					'span',
					{ className: 'slds-checkbox' },
					required ? _react2.default.createElement(
						'abbr',
						{ className: 'slds-required', title: 'required' },
						'*'
					) : null,
					_react2.default.createElement('input', {
						'aria-controls': this.props['aria-controls'],
						'aria-describedby': this.props['aria-describedby'],
						'aria-owns': this.props['aria-owns'],
						'aria-required': this.props['aria-required'],
						disabled: disabled,
						checked: checked,
						id: id || this.generatedId,
						name: name,
						onBlur: onBlur,
						onChange: this.handleChange,
						onFocus: onFocus,
						onKeyDown: onKeyDown,
						onKeyPress: onKeyPress,
						onKeyUp: onKeyUp,
						ref: function ref(component) {
							if (component) {
								component.indeterminate = indeterminate;
							}
							_this.input = component;
						},
						role: role,
						required: required,
						type: 'checkbox'
					}),
					_react2.default.createElement(
						'label',
						{ className: 'slds-checkbox__label', htmlFor: id || this.generatedId },
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
				)
			),
			errorText ? _react2.default.createElement(
				'div',
				{ className: 'slds-form-element__help' },
				errorText
			) : null
		);
	},
	handleChange: function handleChange(event) {
		var value = event.target.checked;
		var _props2 = this.props,
		    checked = _props2.checked,
		    indeterminate = _props2.indeterminate,
		    onChange = _props2.onChange;


		if ((0, _lodash2.default)(onChange)) {
			// `checked` is present twice to maintain backwards compatibility. Please remove first parameter `value` on the next breaking change.
			onChange(value, event, {
				checked: indeterminate ? true : !checked,
				indeterminate: false
			});
		}
	},
	handleKeyDown: function handleKeyDown(event) {
		if (event.keyCode) {
			if (event.keyCode === _utilities.KEYS.ENTER || event.keyCode === _utilities.KEYS.SPACE) {
				_utilities.EventUtil.trapImmediate(event);
				this.handleChange(event);
			}
		}
	}
});

exports.default = Checkbox;