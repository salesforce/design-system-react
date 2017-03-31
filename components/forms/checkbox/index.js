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

var _keyCode = require('../../../utilities/key-code');

var _keyCode2 = _interopRequireDefault(_keyCode);

var _event = require('../../../utilities/event');

var _event2 = _interopRequireDefault(_event);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _checkProps = require('./check-props');

var _checkProps2 = _interopRequireDefault(_checkProps);

var _constants = require('../../../utilities/constants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Remove the need for `React.PropTypes`


// ### classNames


// ### Event Helpers


// ### isFunction
var PropTypes = _react2.default.PropTypes;

// This component's `checkProps` which issues warnings to developers about properties when in development mode (similar to React's built in development tools)


// ### shortid
// [npmjs.com/package/shortid](https://www.npmjs.com/package/shortid)
// shortid is a short, non-sequential, url-friendly, unique id generator
/*
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

/**
 * The ability to style checkboxes with CSS varies across browsers. Using this component ensures checkboxes look the same everywhere.
 */
var Checkbox = _react2.default.createClass({
	// ### Display Name
	// Always use the canonical component name as the React display name.
	displayName: _constants.FORMS_CHECKBOX,

	// ### Prop Types
	propTypes: {
		'aria-controls': PropTypes.string,
		'aria-describedby': PropTypes.string,
		'aria-owns': PropTypes.string,
		'aria-required': PropTypes.bool,
		/**
   * Text that is visually hidden but read aloud by screenreaders to tell the user what the Checkbox is for.
   * If the Checkbox has a visible label, you can omit the <code>assistiveText</code> prop and use the <code>label</code> prop.
   */
		assistiveText: PropTypes.string,
		/**
   * The Checkbox is a controlled component, and will always be in this state. If checked is not defined, the state of the uncontrolled native `input` component will be used.
   */
		checked: PropTypes.bool,
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
		errorText: PropTypes.string,
		/**
   * A unique ID is needed in order to support keyboard navigation and ARIA support. This ID is added to the `input` element
   */
		id: PropTypes.string,
		/**
   * The Checkbox will be indeterminate if its state can not be figured out or is partially checked. Once a checkbox is indeterminate, a click should cause it to be checked. Since a user cannot put a checkbox into an indeterminate state, it is assumed you are controlling the value of `checked` with the parent, also, and that this is a controlled component. **Note:** `indeterminate` proptype does nothing in the `toggle` variant, as [SLDS does not support it](https://lightningdesignsystem.com/components/forms/#flavor-checkbox-toggle-checkbox-toggle).
   */
		indeterminate: PropTypes.bool,
		/**
   * An optional label for the Checkbox.
   */
		label: PropTypes.string,
		/**
   * Label for the _enabled_ state of the Toggle variant. Defaults to "Enabled".
   */
		labelToggleEnabled: PropTypes.string,
		/**
   * Label for the _disabled_ state of the Toggle variant. Defaults to "Disabled". Note that this uses SLDS language, and meaning, of "Enabled" and "Disabled"; referring to the state of whatever the checkbox is _toggling_, not whether the checkbox itself is enabled or disabled.
   */
		labelToggleDisabled: PropTypes.string,
		/**
   * Name of the submitted form parameter.
   */
		name: PropTypes.string,
		/**
   * This event fires when the Checkbox focused is blurred.
   */
		onBlur: PropTypes.func,
		/**
   * This event fires when the Checkbox changes.
   */
		onChange: PropTypes.func,
		/**
   * This event fires when the Checkbox is focused.
   */
		onFocus: PropTypes.func,
		/**
   * This event fires when a key is pressed down.
   */
		onKeyDown: PropTypes.func,
		/**
   * This event fires when a character is typed. Probably. 👀 See [this article](http://www.bloggingdeveloper.com/post/KeyPress-KeyDown-KeyUp-The-Difference-Between-Javascript-Key-Events.aspx) for more information.
   */
		onKeyPress: PropTypes.func,
		/**
   * This event fires when a pressed key is released.
   */
		onKeyUp: PropTypes.func,
		/**
   * Displays the value of the input, but does not allow changes.
   */
		readOnly: PropTypes.bool,
		/**
   * Highlights the Checkbox as a required field (does not perform any validation).
   */
		required: PropTypes.bool,
		/**
   * The aria-role of the checkbox.
   */
		role: PropTypes.string,
		/**
   * Which flavor of checkbox? Default is `base` while other option is `toggle`. (**Note:** `toggle` variant does not support the `indeterminate` feature, because [SLDS does not support it](https://lightningdesignsystem.com/components/forms/#flavor-checkbox-toggle-checkbox-toggle).)
   */
		variant: PropTypes.oneOf(['base', 'toggle'])
	},

	getDefaultProps: function getDefaultProps() {
		return {
			variant: 'base',
			labelToggleEnabled: 'Enabled',
			labelToggleDisabled: 'Disabled'
		};
	},
	componentWillMount: function componentWillMount() {
		(0, _checkProps2.default)(_constants.FORMS_CHECKBOX, this.props);
		this.generatedId = _shortid2.default.generate();
	},
	getId: function getId() {
		return this.props.id || this.generatedId;
	},
	renderBaseVariant: function renderBaseVariant() {
		var _this = this;

		var _props = this.props,
		    assistiveText = _props.assistiveText,
		    checked = _props.checked,
		    className = _props.className,
		    disabled = _props.disabled,
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
		    required = _props.required,
		    role = _props.role;


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
						id: this.getId(),
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
						{ className: 'slds-checkbox__label', htmlFor: this.getId() },
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


	/* eslint-disable jsx-a11y/label-has-for */
	renderToggleVariant: function renderToggleVariant() {
		var _this2 = this;

		var _props2 = this.props,
		    assistiveText = _props2.assistiveText,
		    checked = _props2.checked,
		    className = _props2.className,
		    disabled = _props2.disabled,
		    errorText = _props2.errorText,
		    label = _props2.label,
		    labelToggleEnabled = _props2.labelToggleEnabled,
		    labelToggleDisabled = _props2.labelToggleDisabled,
		    name = _props2.name,
		    onBlur = _props2.onBlur,
		    onFocus = _props2.onFocus,
		    onKeyDown = _props2.onKeyDown,
		    onKeyPress = _props2.onKeyPress,
		    onKeyUp = _props2.onKeyUp,
		    required = _props2.required,
		    role = _props2.role;


		return _react2.default.createElement(
			'div',
			{
				className: (0, _classnames2.default)('slds-form-element', {
					'is-required': required,
					'slds-has-error': errorText
				}, className)
			},
			_react2.default.createElement(
				'label',
				{ className: 'slds-checkbox--toggle slds-grid', htmlFor: this.getId() },
				required ? _react2.default.createElement(
					'abbr',
					{ className: 'slds-required', title: 'required' },
					'*'
				) : null,
				label ? _react2.default.createElement(
					'span',
					{ className: 'slds-form-element__label slds-m-bottom--none' },
					label
				) : null,
				assistiveText ? _react2.default.createElement(
					'span',
					{ className: 'slds-assistive-text' },
					assistiveText
				) : null,
				_react2.default.createElement('input', {
					'aria-controls': this.props['aria-controls'],
					'aria-describedby': this.getId() + '-desc',
					'aria-owns': this.props['aria-owns'],
					'aria-required': this.props['aria-required'],
					disabled: disabled,
					id: this.getId(),
					checked: checked,
					name: name,
					onBlur: onBlur,
					onChange: this.handleChange,
					onFocus: onFocus,
					onKeyDown: onKeyDown,
					onKeyPress: onKeyPress,
					onKeyUp: onKeyUp,
					ref: function ref(component) {
						_this2.input = component;
					},
					role: role,
					required: required,
					type: 'checkbox'
				}),
				_react2.default.createElement(
					'span',
					{ id: this.getId() + '-desc', className: 'slds-checkbox--faux_container', 'aria-live': 'assertive' },
					_react2.default.createElement('span', { className: 'slds-checkbox--faux' }),
					_react2.default.createElement(
						'span',
						{ className: 'slds-checkbox--on' },
						labelToggleEnabled
					),
					_react2.default.createElement(
						'span',
						{ className: 'slds-checkbox--off' },
						labelToggleDisabled
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

	/* eslint-enable jsx-a11y/label-has-for */

	// ### Render
	render: function render() {
		return this.props.variant === 'toggle' ? this.renderToggleVariant() : this.renderBaseVariant();
	},
	handleChange: function handleChange(event) {
		var value = event.target.checked;
		var _props3 = this.props,
		    checked = _props3.checked,
		    indeterminate = _props3.indeterminate,
		    onChange = _props3.onChange;


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
			if (event.keyCode === _keyCode2.default.ENTER || event.keyCode === _keyCode2.default.SPACE) {
				_event2.default.trapImmediate(event);
				this.handleChange(event);
			}
		}
	}
});

exports.default = Checkbox;