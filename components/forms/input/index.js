define(['module', 'react', 'classnames', 'shortid', '../../icon/input-icon', './check-props', '../../../utilities/constants'], function (module, _react, _classnames, _shortid, _inputIcon, _checkProps, _constants) {
	'use strict';

	var _react2 = _interopRequireDefault(_react);

	var _classnames2 = _interopRequireDefault(_classnames);

	var _shortid2 = _interopRequireDefault(_shortid);

	var _inputIcon2 = _interopRequireDefault(_inputIcon);

	var _checkProps2 = _interopRequireDefault(_checkProps);

	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	function _objectWithoutProperties(obj, keys) {
		var target = {};

		for (var i in obj) {
			if (keys.indexOf(i) >= 0) continue;
			if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;
			target[i] = obj[i];
		}

		return target;
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

	var PropTypes = _react2.default.PropTypes;


	// ## InputDefinition
	var Input = _react2.default.createClass({
		// ### Display Name
		// Always use the canonical component name as the React display name.
		displayName: _constants.FORMS_INPUT,
		// ### Prop Types
		propTypes: {
			'aria-activedescendant': PropTypes.string,
			'aria-autocomplete': PropTypes.string,
			/**
    * An HTML ID that is shared with ARIA-supported devices with the
    * `aria-controls` attribute in order to relate the input with
    * another region of the page. An example would be a select box
    * that shows or hides a panel.
    */
			'aria-controls': PropTypes.string,
			'aria-describedby': PropTypes.string,
			'aria-expanded': PropTypes.bool,
			'aria-haspopup': PropTypes.bool,
			'aria-labelledby': PropTypes.string,
			/**
    * An HTML ID that is shared with ARIA-supported devices with the
    * `aria-controls` attribute in order to relate the input with
    * another region of the page. An example would be a search field
    * that shows search results.
    */
			'aria-owns': PropTypes.string,
			'aria-required': PropTypes.bool,
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
    * Left aligned icon, must be instace of `design-system-react/components/icon/input-icon`
    */
			iconLeft: PropTypes.node,
			/**
    * Right aligned icon, must be instace of `design-system-react/components/icon/input-icon`
    */
			iconRight: PropTypes.node,
			/**
    * Every input must have a unique ID in order to support keyboard navigation and ARIA support.
    */
			id: PropTypes.string,
			/**
    * This callback exposes the input reference / DOM node to parent components. `<Parent inputRef={(inputComponent) => this.input = inputComponent} />
    */
			inputRef: PropTypes.func,
			/**
    * This label appears above the input.
    */
			label: PropTypes.string,
			onBlur: PropTypes.func,
			/**
    * This callback fires when the input changes. The synthetic React event will be the first parameter to the callback. You will probably want to reference `event.target.value` in your callback. No custom data object is provided.
    */
			onChange: PropTypes.func,
			/**
    * This event fires when the input is clicked.
    */
			onClick: PropTypes.func,
			onFocus: PropTypes.func,
			onInput: PropTypes.func,
			onInvalid: PropTypes.func,
			onKeyDown: PropTypes.func,
			onKeyPress: PropTypes.func,
			onKeyUp: PropTypes.func,
			onSelect: PropTypes.func,
			onSubmit: PropTypes.func,
			/**
    * Text that will appear in an empty input.
    */
			placeholder: PropTypes.string,
			minLength: PropTypes.string,
			maxLength: PropTypes.string,
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
				type: 'text'
			};
		},
		componentWillMount: function componentWillMount() {
			// `checkProps` issues warnings to developers about properties (similar to React's built in development tools)
			(0, _checkProps2.default)(_constants.FORMS_INPUT, this.props);

			this.generatedId = _shortid2.default.generate();
			if (this.props.errorText) {
				this.generatedErrorId = _shortid2.default.generate();
			}
		},
		getId: function getId() {
			return this.props.id || this.generatedId;
		},
		getErrorId: function getErrorId() {
			return this.props['aria-describedby'] || this.generatedErrorId;
		},
		getIconRender: function getIconRender(position, iconPositionProp) {
			var icon = void 0;

			/* eslint-disable react/prop-types */
			var deprecatedProps = {
				assistiveText: this.props[iconPositionProp] && this.props[iconPositionProp].props.assistiveText || this.props.iconAssistiveText,
				category: this.props[iconPositionProp] && this.props[iconPositionProp].props.category || this.props.iconCategory,
				name: this.props[iconPositionProp] && this.props[iconPositionProp].props.name || this.props.iconName,
				onClick: this.props[iconPositionProp] && this.props[iconPositionProp].props.onClick || this.props.onIconClick
			};
			/* eslint-enable react/prop-types */

			if (this.props[iconPositionProp] && position && this.props[iconPositionProp]) {
				icon = _react2.default.cloneElement(this.props[iconPositionProp], {
					iconPosition: '' + position
				});
			} else if (deprecatedProps.name) {
				icon = _react2.default.createElement(_inputIcon2.default, _extends({ iconPosition: position }, deprecatedProps));
			}

			return icon;
		},
		render: function render() {
			var _props = this.props,
			    assistiveText = _props.assistiveText,
			    children = _props.children,
			    className = _props.className,
			    disabled = _props.disabled,
			    errorText = _props.errorText,
			    iconLeft = _props.iconLeft,
			    iconRight = _props.iconRight,
			    inlineEditTrigger = _props.inlineEditTrigger,
			    inputRef = _props.inputRef,
			    label = _props.label,
			    onBlur = _props.onBlur,
			    onChange = _props.onChange,
			    onClick = _props.onClick,
			    onFocus = _props.onFocus,
			    onInput = _props.onInput,
			    onInvalid = _props.onInvalid,
			    onKeyDown = _props.onKeyDown,
			    onKeyPress = _props.onKeyPress,
			    onKeyUp = _props.onKeyUp,
			    onSelect = _props.onSelect,
			    onSubmit = _props.onSubmit,
			    minLength = _props.minLength,
			    maxLength = _props.maxLength,
			    name = _props.name,
			    placeholder = _props.placeholder,
			    readOnly = _props.readOnly,
			    required = _props.required,
			    role = _props.role,
			    type = _props.type,
			    value = _props.value,
			    props = _objectWithoutProperties(_props, ['assistiveText', 'children', 'className', 'disabled', 'errorText', 'iconLeft', 'iconRight', 'inlineEditTrigger', 'inputRef', 'label', 'onBlur', 'onChange', 'onClick', 'onFocus', 'onInput', 'onInvalid', 'onKeyDown', 'onKeyPress', 'onKeyUp', 'onSelect', 'onSubmit', 'minLength', 'maxLength', 'name', 'placeholder', 'readOnly', 'required', 'role', 'type', 'value']);

			var labelText = label || assistiveText; // One of these is required to pass accessibility tests

			// this is a hack to make left the default prop unless overwritten by `iconPosition="right"`
			var hasLeftIcon = !!iconLeft || (this.props.iconPosition === 'left' || this.props.iconPosition === undefined) && !!this.props.iconName;
			var hasRightIcon = !!iconRight || this.props.iconPosition === 'right' && !!this.props.iconName;

			return _react2.default.createElement(
				'div',
				{
					className: (0, _classnames2.default)('slds-form-element', {
						'slds-has-error': errorText
					}, className)
				},
				labelText && (readOnly ? _react2.default.createElement(
					'span',
					{ className: (0, _classnames2.default)('slds-form-element__label', { 'slds-assistive-text': assistiveText && !label }) },
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
						className: (0, _classnames2.default)('slds-form-element__control', {
							'slds-input-has-icon': hasLeftIcon || hasRightIcon,
							'slds-input-has-icon--left': hasLeftIcon && !hasRightIcon,
							'slds-input-has-icon--right': !hasLeftIcon && hasRightIcon,
							'slds-input-has-icon--left-right': hasLeftIcon && hasRightIcon,
							'slds-has-divider--bottom': readOnly && !inlineEditTrigger
						})
					},
					hasLeftIcon ? this.getIconRender('left', 'iconLeft') : null,
					!readOnly && _react2.default.createElement('input', {
						'aria-activedescendant': this.props['aria-activedescendant'],
						'aria-autocomplete': this.props['aria-autocomplete'],
						'aria-controls': this.props['aria-controls'],
						'aria-labelledby': this.props['aria-labelledby'],
						'aria-describedby': this.getErrorId(),
						'aria-expanded': this.props['aria-expanded'],
						'aria-owns': this.props['aria-owns'],
						'aria-required': this.props['aria-required'],
						className: 'slds-input',
						disabled: disabled,
						id: this.getId(),
						minLength: minLength,
						maxLength: maxLength,
						name: name,
						onBlur: onBlur,
						onChange: onChange,
						onClick: onClick,
						onFocus: onFocus,
						onInput: onInput,
						onInvalid: onInvalid,
						onKeyDown: onKeyDown,
						onKeyPress: onKeyPress,
						onKeyUp: onKeyUp,
						onSelect: onSelect,
						onSubmit: onSubmit,
						placeholder: placeholder,
						ref: inputRef,
						role: role,
						required: required,
						type: type,
						value: value
					}),
					hasRightIcon ? this.getIconRender('right', 'iconRight') : null,
					readOnly && _react2.default.createElement(
						'span',
						{ className: 'slds-form-element__static', onClick: onClick },
						value,
						inlineEditTrigger
					)
				),
				errorText && _react2.default.createElement(
					'div',
					{ id: this.getErrorId(), className: 'slds-form-element__help' },
					errorText
				),
				children
			);
		}
	});

	module.exports = Input;
});