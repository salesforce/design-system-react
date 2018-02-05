'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _createReactClass = require('create-react-class');

var _createReactClass2 = _interopRequireDefault(_createReactClass);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

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

/**
 * The ability to style checkboxes with CSS varies across browsers. Using this component ensures checkboxes look the same everywhere.
 */


// This component's `checkProps` which issues warnings to developers about properties when in development mode (similar to React's built in development tools)


// ### shortid
// [npmjs.com/package/shortid](https://www.npmjs.com/package/shortid)
// shortid is a short, non-sequential, url-friendly, unique id generator
/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

// # Checkbox Component

// Implements the [Checkbox design pattern](https://www.lightningdesignsystem.com/components/forms/#checkbox) in React.

// ### React
var Checkbox = (0, _createReactClass2.default)({
	// ### Display Name
	// Always use the canonical component name as the React display name.
	displayName: _constants.FORMS_CHECKBOX,

	// ### Prop Types
	propTypes: {
		'aria-controls': _propTypes2.default.string,
		'aria-describedby': _propTypes2.default.string,
		'aria-owns': _propTypes2.default.string,
		'aria-required': _propTypes2.default.bool,
		/**
   * Text that is visually hidden but read aloud by screenreaders to tell the user what the Checkbox is for.
   * If the Checkbox has a visible label, you can omit the <code>assistiveText</code> prop and use the <code>label</code> prop.
   */
		assistiveText: _propTypes2.default.string,
		/**
   * The Checkbox is a controlled component, and will always be in this state. If checked is not defined, the state of the uncontrolled native `input` component will be used.
   */
		checked: _propTypes2.default.bool,
		/**
   * Class names to be added to the outer container of the Checkbox.
   */
		className: _propTypes2.default.oneOfType([_propTypes2.default.array, _propTypes2.default.object, _propTypes2.default.string]),
		/**
   * Disables the Checkbox and prevents clicking it.
   */
		disabled: _propTypes2.default.bool,
		/**
   * Message to display when the Checkbox is in an error state. When this is present, also visually highlights the component as in error.
   */
		errorText: _propTypes2.default.string,
		/**
   * A unique ID is needed in order to support keyboard navigation and ARIA support. This ID is added to the `input` element
   */
		id: _propTypes2.default.string,
		/**
   * The Checkbox will be indeterminate if its state can not be figured out or is partially checked. Once a checkbox is indeterminate, a click should cause it to be checked. Since a user cannot put a checkbox into an indeterminate state, it is assumed you are controlling the value of `checked` with the parent, also, and that this is a controlled component. **Note:** `indeterminate` proptype does nothing in the `toggle` variant, as [SLDS does not support it](https://lightningdesignsystem.com/components/forms/#flavor-checkbox-toggle-checkbox-toggle).
   */
		indeterminate: _propTypes2.default.bool,
		/**
   * An optional label for the Checkbox.
   */
		label: _propTypes2.default.string,
		/**
   * Label for the _enabled_ state of the Toggle variant. Defaults to "Enabled".
   */
		labelToggleEnabled: _propTypes2.default.string,
		/**
   * Label for the _disabled_ state of the Toggle variant. Defaults to "Disabled". Note that this uses SLDS language, and meaning, of "Enabled" and "Disabled"; referring to the state of whatever the checkbox is _toggling_, not whether the checkbox itself is enabled or disabled.
   */
		labelToggleDisabled: _propTypes2.default.string,
		/**
   * Name of the submitted form parameter.
   */
		name: _propTypes2.default.string,
		/**
   * This event fires when the Checkbox focused is blurred.
   */
		onBlur: _propTypes2.default.func,
		/**
   * This event fires when the Checkbox changes.
   */
		onChange: _propTypes2.default.func,
		/**
   * This event fires when the Checkbox is focused.
   */
		onFocus: _propTypes2.default.func,
		/**
   * This event fires when a key is pressed down.
   */
		onKeyDown: _propTypes2.default.func,
		/**
   * This event fires when a character is typed. Probably. 👀 See [this article](http://www.bloggingdeveloper.com/post/KeyPress-KeyDown-KeyUp-The-Difference-Between-Javascript-Key-Events.aspx) for more information.
   */
		onKeyPress: _propTypes2.default.func,
		/**
   * This event fires when a pressed key is released.
   */
		onKeyUp: _propTypes2.default.func,
		/**
   * Displays the value of the input, but does not allow changes.
   */
		readOnly: _propTypes2.default.bool,
		/**
   * Highlights the Checkbox as a required field (does not perform any validation).
   */
		required: _propTypes2.default.bool,
		/**
   * The aria-role of the checkbox.
   */
		role: _propTypes2.default.string,
		/**
   * Which flavor of checkbox? Default is `base` while other option is `toggle`. (**Note:** `toggle` variant does not support the `indeterminate` feature, because [SLDS does not support it](https://lightningdesignsystem.com/components/forms/#flavor-checkbox-toggle-checkbox-toggle).)
   */
		variant: _propTypes2.default.oneOf(['base', 'toggle', 'button-group'])
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
	handleChange: function handleChange(event) {
		var value = event.target.checked;
		var _props = this.props,
		    checked = _props.checked,
		    indeterminate = _props.indeterminate,
		    onChange = _props.onChange;


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
	},
	renderButtonGroupVariant: function renderButtonGroupVariant(props) {
		var _this = this;

		return _react2.default.createElement(
			'span',
			{ className: 'slds-button slds-checkbox--button' },
			_react2.default.createElement('input', {
				'aria-controls': this.props['aria-controls'],
				'aria-describedby': this.props['aria-describedby'],
				'aria-owns': this.props['aria-owns'],
				'aria-required': this.props['aria-required'],
				disabled: props.disabled,
				checked: props.checked,
				id: this.getId(),
				name: props.name,
				onBlur: props.onBlur,
				onChange: this.handleChange,
				onFocus: props.onFocus,
				onKeyDown: props.onKeyDown,
				onKeyPress: props.onKeyPress,
				onKeyUp: props.onKeyUp,
				ref: function ref(component) {
					_this.input = component;
				},
				role: props.role,
				required: props.required,
				type: 'checkbox'
			}),
			_react2.default.createElement(
				'label',
				{ className: 'slds-checkbox--button__label', htmlFor: this.getId() },
				_react2.default.createElement(
					'span',
					{ className: 'slds-checkbox--faux' },
					props.label
				),
				props.assistiveText ? _react2.default.createElement(
					'span',
					{ className: 'slds-assistive-text' },
					props.assistiveText
				) : null
			)
		);
	},
	renderBaseVariant: function renderBaseVariant(props) {
		var _this2 = this;

		return _react2.default.createElement(
			'div',
			{
				className: (0, _classnames2.default)('slds-form-element', {
					'is-required': props.required,
					'slds-has-error': props.errorText
				}, props.className)
			},
			_react2.default.createElement(
				'div',
				{ className: 'slds-form-element__control' },
				_react2.default.createElement(
					'span',
					{ className: 'slds-checkbox' },
					props.required ? _react2.default.createElement(
						'abbr',
						{ className: 'slds-required', title: 'required' },
						'*'
					) : null,
					_react2.default.createElement('input', {
						'aria-controls': this.props['aria-controls'],
						'aria-describedby': this.props['aria-describedby'],
						'aria-owns': this.props['aria-owns'],
						'aria-required': this.props['aria-required'],
						disabled: props.disabled,
						checked: props.checked,
						id: this.getId(),
						name: props.name,
						onBlur: props.onBlur,
						onChange: this.handleChange,
						onFocus: props.onFocus,
						onKeyDown: props.onKeyDown,
						onKeyPress: props.onKeyPress,
						onKeyUp: props.onKeyUp,
						ref: function ref(component) {
							if (component) {
								component.indeterminate = props.indeterminate;
							}
							_this2.input = component;
						},
						role: props.role,
						required: props.required,
						type: 'checkbox'
					}),
					_react2.default.createElement(
						'label',
						{ className: 'slds-checkbox__label', htmlFor: this.getId() },
						_react2.default.createElement('span', { className: 'slds-checkbox--faux' }),
						props.label ? _react2.default.createElement(
							'span',
							{ className: 'slds-form-element__label' },
							props.label
						) : null,
						props.assistiveText ? _react2.default.createElement(
							'span',
							{ className: 'slds-assistive-text' },
							props.assistiveText
						) : null
					)
				)
			),
			props.errorText ? _react2.default.createElement(
				'div',
				{ className: 'slds-form-element__help' },
				props.errorText
			) : null
		);
	},
	renderToggleVariant: function renderToggleVariant(props) {
		var _this3 = this;

		return _react2.default.createElement(
			'div',
			{
				className: (0, _classnames2.default)('slds-form-element', {
					'is-required': props.required,
					'slds-has-error': props.errorText
				}, props.className)
			},
			_react2.default.createElement(
				'label',
				{
					className: 'slds-checkbox--toggle slds-grid',
					htmlFor: this.getId()
				},
				props.required ? _react2.default.createElement(
					'abbr',
					{ className: 'slds-required', title: 'required' },
					'*'
				) : null,
				props.label ? _react2.default.createElement(
					'span',
					{ className: 'slds-form-element__label slds-m-bottom--none' },
					props.label
				) : null,
				props.assistiveText ? _react2.default.createElement(
					'span',
					{ className: 'slds-assistive-text' },
					props.assistiveText
				) : null,
				_react2.default.createElement('input', {
					'aria-controls': this.props['aria-controls'],
					'aria-describedby': this.getId() + '-desc',
					'aria-owns': this.props['aria-owns'],
					'aria-required': this.props['aria-required'],
					disabled: props.disabled,
					id: this.getId(),
					checked: props.checked,
					name: props.name,
					onBlur: props.onBlur,
					onChange: this.handleChange,
					onFocus: props.onFocus,
					onKeyDown: props.onKeyDown,
					onKeyPress: props.onKeyPress,
					onKeyUp: props.onKeyUp,
					ref: function ref(component) {
						_this3.input = component;
					},
					role: props.role,
					required: props.required,
					type: 'checkbox'
				}),
				_react2.default.createElement(
					'span',
					{
						id: this.getId() + '-desc',
						className: 'slds-checkbox--faux_container',
						'aria-live': 'assertive'
					},
					_react2.default.createElement('span', { className: 'slds-checkbox--faux' }),
					_react2.default.createElement(
						'span',
						{ className: 'slds-checkbox--on' },
						props.labelToggleEnabled
					),
					_react2.default.createElement(
						'span',
						{ className: 'slds-checkbox--off' },
						props.labelToggleDisabled
					)
				)
			),
			props.errorText ? _react2.default.createElement(
				'div',
				{ className: 'slds-form-element__help' },
				props.errorText
			) : null
		);
	},


	// ### Render
	render: function render() {
		var renderer = void 0;
		switch (this.props.variant) {
			case 'toggle':
				renderer = this.renderToggleVariant(this.props);
				break;
			case 'button-group':
				renderer = this.renderButtonGroupVariant(this.props);
				break;
			default:
				renderer = this.renderBaseVariant(this.props);
		}
		return renderer;
	}
});

// ### classNames


// ### Event Helpers


// ### isFunction
exports.default = Checkbox;