define(['module', 'react', 'classnames', 'shortid', '../../icon/input-icon', './check-props', 'lodash.isfunction', '../../button', '../../../utilities/constants'], function (module, _react, _classnames, _shortid, _inputIcon, _checkProps, _lodash, _button, _constants) {
	'use strict';

	var _react2 = _interopRequireDefault(_react);

	var _classnames2 = _interopRequireDefault(_classnames);

	var _shortid2 = _interopRequireDefault(_shortid);

	var _inputIcon2 = _interopRequireDefault(_inputIcon);

	var _checkProps2 = _interopRequireDefault(_checkProps);

	var _lodash2 = _interopRequireDefault(_lodash);

	var _button2 = _interopRequireDefault(_button);

	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	var _extends = Object.assign || function (target) {
		for (var i = 1; i < arguments.length; i++) {
			var source = arguments[i];

			for (var key in source) {
				if (Object.prototype.hasOwnProperty.call(source, key)) {
					target[key] = source[key];
				}
			}
		}

		return target;
	};

	function _objectWithoutProperties(obj, keys) {
		var target = {};

		for (var i in obj) {
			if (keys.indexOf(i) >= 0) continue;
			if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;
			target[i] = obj[i];
		}

		return target;
	}

	var PropTypes = _react2.default.PropTypes;


	// ## InputDefinition
	var Input = _react2.default.createClass({
		// ### Display Name
		// Always use the canonical component name as the React display name.
		displayName: _constants.FORMS_INPUT,
		// ### Prop Types
		propTypes: {
			/**
    * An HTML ID that is shared with ARIA-supported devices with the
    * `aria-controls` attribute in order to relate the input with
    * another region of the page. An example would be a select box
    * that shows or hides a panel.
    */
			ariaControls: PropTypes.string,
			/**
    * An HTML ID that is shared with ARIA-supported devices with the
    * `aria-controls` attribute in order to relate the input with
    * another region of the page. An example would be a search field
    * that shows search results.
    */
			ariaOwns: PropTypes.string,
			/**
    * If present, the label associated with this `input` is overwritten
    * by this text and is visually not shown.
    */
			assistiveText: PropTypes.string,
			children: PropTypes.node,
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
			errorText: PropTypes.string,
			/**
    * Category of the icon.
    */
			iconCategory: PropTypes.oneOf(['action', 'custom', 'doctype', 'standard', 'utility']),
			/**
    * Name of the icon. Visit <a href='http://www.lightningdesignsystem.com/resources/icons'>Lightning Design System Icons</a> to reference icon names.
    */
			iconName: PropTypes.string,
			/**
    * Determines whether the input's icon will display that icon on the left or the right.
    */
			iconPosition: PropTypes.oneOf(['left', 'right']),
			/**
    * Set the assistive text for a clickable icon
    */
			iconAssistiveText: PropTypes.string,
			/**
    * Every input must have a unique ID in order to support keyboard navigation and ARIA support.
    */
			id: PropTypes.string,
			/**
    * This label appears above the input.
    */
			label: PropTypes.string,
			/**
    * This callback fires when the input changes. The synthetic React event will be the first parameter to the callback. You will probably want to reference `event.target.value` in your callback. No custom data object is provided.
    */
			onChange: PropTypes.func,
			/**
    * This event fires when the input is clicked.
    */
			onClick: PropTypes.func,
			/**
    * This event fires when the icon is clicked.
    */
			onIconClick: PropTypes.func,
			/**
    * Text that will appear in an empty input.
    */
			placeholder: PropTypes.string,
			/**
    * Name of the submitted form parameter.
    */
			name: PropTypes.string,
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
			type: PropTypes.oneOf(['text', 'password', 'datetime', 'datetime-local', 'date', 'month', 'time', 'week', 'number', 'email', 'url', 'search', 'tel', 'color']),
			/**
    * The input is a controlled component, and will always display this value.
    */
			value: PropTypes.string
		},

		getDefaultProps: function getDefaultProps() {
			return {
				iconPosition: 'left',
				type: 'text'
			};
		},
		componentWillMount: function componentWillMount() {
			// `checkProps` issues warnings to developers about properties (similar to React's built in development tools)
			(0, _checkProps2.default)(_constants.FORMS_INPUT, this.props);

			this.generatedId = _shortid2.default.generate();
		},
		getId: function getId() {
			return this.props.id || this.generatedId;
		},
		getIconRender: function getIconRender(position) {
			if (position !== this.props.iconPosition) return '';

			return (0, _lodash2.default)(this.props.onIconClick) ? _react2.default.createElement(_button2.default, {
				iconSize: 'small',
				variant: 'icon',
				className: 'slds-input__icon slds-button--icon',
				assistiveText: this.props.iconAssistiveText,
				iconName: this.props.iconName,
				iconCategory: this.props.iconCategory,
				onClick: this.props.onIconClick
			}) : _react2.default.createElement(_inputIcon2.default, {
				name: this.props.iconName,
				category: this.props.iconCategory
			});
		},
		render: function render() {
			var _props = this.props;
			var ariaControls = _props.ariaControls;
			var ariaOwns = _props.ariaOwns;
			var assistiveText = _props.assistiveText;
			var children = _props.children;
			var className = _props.className;
			var disabled = _props.disabled;
			var errorText = _props.errorText;
			var iconAssistiveText = _props.iconAssistiveText;
			var iconCategory = _props.iconCategory;
			var iconName = _props.iconName;
			var iconPosition = _props.iconPosition;
			var inlineEditTrigger = _props.inlineEditTrigger;
			var inputRef = _props.inputRef;
			var label = _props.label;
			var onChange = _props.onChange;
			var onClick = _props.onClick;
			var onIconClick = _props.onIconClick;
			var name = _props.name;
			var placeholder = _props.placeholder;
			var readOnly = _props.readOnly;
			var required = _props.required;
			var type = _props.type;
			var value = _props.value;

			var props = _objectWithoutProperties(_props, ['ariaControls', 'ariaOwns', 'assistiveText', 'children', 'className', 'disabled', 'errorText', 'iconAssistiveText', 'iconCategory', 'iconName', 'iconPosition', 'inlineEditTrigger', 'inputRef', 'label', 'onChange', 'onClick', 'onIconClick', 'name', 'placeholder', 'readOnly', 'required', 'type', 'value']);

			var hasIcon = iconCategory && iconName;

			// One of these is required to pass accessibility tests
			var labelText = label || assistiveText;

			return _react2.default.createElement(
				'div',
				{
					className: (0, _classnames2.default)('slds-form-element', {
						'is-required': required,
						'slds-has-error': errorText
					}, className)
				},
				labelText && (readOnly ? _react2.default.createElement(
					'span',
					{
						className: (0, _classnames2.default)('slds-form-element__label', { 'slds-assistive-text': assistiveText && !label })
					},
					labelText
				) : _react2.default.createElement(
					'label',
					{
						className: (0, _classnames2.default)('slds-form-element__label', { 'slds-assistive-text': assistiveText && !label }),
						htmlFor: this.getId()
					},
					required && _react2.default.createElement(
						'abbr',
						{ className: 'slds-required', title: 'required' },
						'*'
					),
					labelText
				)),
				_react2.default.createElement(
					'div',
					{
						className: (0, _classnames2.default)('slds-form-element__control', hasIcon && ['slds-input-has-icon', 'slds-input-has-icon--' + iconPosition], {
							'slds-has-divider--bottom': readOnly && !inlineEditTrigger
						})
					},
					hasIcon && this.getIconRender('left'),
					!readOnly && _react2.default.createElement('input', _extends({}, props, {
						'aria-controls': ariaControls,
						'aria-owns': ariaOwns,
						className: 'slds-input',
						disabled: disabled,
						id: this.getId(),
						onChange: onChange,
						onClick: onClick,
						name: name,
						placeholder: placeholder,
						ref: inputRef,
						required: required,
						type: type,
						value: value
					})),
					hasIcon && this.getIconRender('right'),
					readOnly && _react2.default.createElement(
						'span',
						{ className: 'slds-form-element__static', onClick: onClick },
						value,
						inlineEditTrigger
					)
				),
				errorText && _react2.default.createElement(
					'div',
					{ className: 'slds-form-element__help' },
					errorText
				),
				children
			);
		}
	});

	module.exports = Input;
});