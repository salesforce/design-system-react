define(['exports', 'react', 'create-react-class', 'prop-types', 'classnames', 'shortid', './check-props', '../../../utilities/constants'], function (exports, _react, _createReactClass, _propTypes, _classnames, _shortid, _checkProps, _constants) {
	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _react2 = _interopRequireDefault(_react);

	var _createReactClass2 = _interopRequireDefault(_createReactClass);

	var _propTypes2 = _interopRequireDefault(_propTypes);

	var _classnames2 = _interopRequireDefault(_classnames);

	var _shortid2 = _interopRequireDefault(_shortid);

	var _checkProps2 = _interopRequireDefault(_checkProps);

	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	// ## TextareaDefinition


	// ## Children
	// This component's `checkProps` which issues warnings to developers about properties when in development mode (similar to React's built in development tools)


	// ### classNames
	// [github.com/JedWatson/classnames](https://github.com/JedWatson/classnames)
	// This project uses `classnames`, "a simple javascript utility for conditionally
	// joining classNames together."
	var Textarea = (0, _createReactClass2.default)({
		// ### Display Name
		// Always use the canonical component name as the React display name.
		displayName: _constants.FORMS_TEXTAREA,
		// ### Prop Types
		propTypes: {
			'aria-activedescendant': _propTypes2.default.string,
			/**
    * An HTML ID that is shared with ARIA-supported devices with the
    * `aria-controls` attribute in order to relate the textarea with
    * another region of the page. An example would be a select box
    * that shows or hides a panel.
    */
			'aria-controls': _propTypes2.default.string,
			'aria-describedby': _propTypes2.default.string,
			'aria-expanded': _propTypes2.default.bool,
			'aria-haspopup': _propTypes2.default.bool,
			'aria-labelledby': _propTypes2.default.string,
			/**
    * An HTML ID that is shared with ARIA-supported devices with the
    * `aria-controls` attribute in order to relate the textarea with
    * another region of the page. An example would be a search field
    * that shows search results.
    */
			'aria-owns': _propTypes2.default.string,
			'aria-required': _propTypes2.default.bool,
			/**
    * Specifies is the textarea should automatically get focus when the page loads.
    */
			autoFocus: _propTypes2.default.bool,
			/**
    * If present, the label associated with this `textarea` is overwritten
    * by this text and is visually not shown.
    */
			assistiveText: _propTypes2.default.string,
			children: _propTypes2.default.node,
			/**
    * Class names to be added to the textarea component.
    */
			className: _propTypes2.default.oneOfType([_propTypes2.default.array, _propTypes2.default.object, _propTypes2.default.string]),
			/** Allows for ability to apply classNames to outer textarea div.
    */
			classNameContainer: _propTypes2.default.oneOfType([_propTypes2.default.array, _propTypes2.default.object, _propTypes2.default.string]),
			/**
    * Message to display when the textarea is in an error state. When this is present, also visually highlights the component as in error.
    */
			errorText: _propTypes2.default.string,
			/**
    * Every textarea must have a unique ID in order to support keyboard navigation and ARIA support.
    */
			id: _propTypes2.default.string,
			/**
    * This callback exposes the textarea reference / DOM node to parent components. `<Parent textareaRef={(textareaComponent) => this.textarea = textareaComponent} />
    */
			textareaRef: _propTypes2.default.func,
			/**
    * This label appears above the textarea.
    */
			label: _propTypes2.default.string,
			onBlur: _propTypes2.default.func,
			/**
    * This callback fires when the textarea changes. The synthetic React event will be the first parameter to the callback. You will probably want to reference `event.target.value` in your callback. No custom data object is provided.
    */
			onChange: _propTypes2.default.func,
			/**
    * This event fires when the textarea is clicked.
    */
			onClick: _propTypes2.default.func,
			onFocus: _propTypes2.default.func,
			onInput: _propTypes2.default.func,
			onInvalid: _propTypes2.default.func,
			onKeyDown: _propTypes2.default.func,
			onKeyPress: _propTypes2.default.func,
			onKeyUp: _propTypes2.default.func,
			onSelect: _propTypes2.default.func,
			onSubmit: _propTypes2.default.func,

			/**
    * Disables the textarea and prevents editing the contents.
    */
			disabled: _propTypes2.default.bool,
			/**
    * Maximum number of characters allowed.
    */
			maxLength: _propTypes2.default.string,
			/**
    * Name of the submitted form parameter.
    */
			name: _propTypes2.default.string,
			/**
    * Text that will appear in an empty textarea.
    */
			placeholder: _propTypes2.default.string,
			/**
    * Highlights the textarea as a required field (does not perform any validation).
    */
			required: _propTypes2.default.bool,
			/**
    * The textarea is a controlled component, and will always display this value.
    */
			value: _propTypes2.default.string,
			/**
    * Specifies how the text in a text area is to be wrapped when submitted in a form.
    */
			wrap: _propTypes2.default.oneOf(['soft', 'hard'])
		},

		componentWillMount: function componentWillMount() {
			// `checkProps` issues warnings to developers about properties (similar to React's built in development tools)
			(0, _checkProps2.default)(_constants.FORMS_TEXTAREA, this.props);

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
		render: function render() {
			var _props = this.props,
			    autoFocus = _props.autoFocus,
			    assistiveText = _props.assistiveText,
			    children = _props.children,
			    className = _props.className,
			    classNameContainer = _props.classNameContainer,
			    disabled = _props.disabled,
			    errorText = _props.errorText,
			    textareaRef = _props.textareaRef,
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
			    maxLength = _props.maxLength,
			    name = _props.name,
			    placeholder = _props.placeholder,
			    required = _props.required,
			    role = _props.role,
			    value = _props.value,
			    wrap = _props.wrap;


			var labelText = label || assistiveText; // One of these is required to pass accessibility tests

			return _react2.default.createElement(
				'div',
				{
					className: (0, _classnames2.default)('slds-form-element', {
						'slds-has-error': errorText
					}, classNameContainer)
				},
				labelText && _react2.default.createElement(
					'label',
					{
						className: (0, _classnames2.default)('slds-form-element__label', {
							'slds-assistive-text': assistiveText && !label
						}),
						htmlFor: this.getId()
					},
					required && _react2.default.createElement(
						'abbr',
						{ className: 'slds-required', title: 'required' },
						'*'
					),
					labelText
				),
				_react2.default.createElement(
					'div',
					{ className: (0, _classnames2.default)('slds-form-element__control') },
					_react2.default.createElement('textarea', {
						'aria-activedescendant': this.props['aria-activedescendant'],
						'aria-controls': this.props['aria-controls'],
						'aria-labelledby': this.props['aria-labelledby'],
						'aria-describedby': this.getErrorId(),
						'aria-expanded': this.props['aria-expanded'],
						'aria-owns': this.props['aria-owns'],
						'aria-required': this.props['aria-required'],
						className: (0, _classnames2.default)('slds-textarea', className),
						autoFocus: autoFocus,
						disabled: disabled,
						id: this.getId(),
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
						ref: textareaRef,
						role: role,
						required: required,
						wrap: wrap,
						value: value
					})
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

	// ### shortid
	// [npmjs.com/package/shortid](https://www.npmjs.com/package/shortid)
	// shortid is a short, non-sequential, url-friendly, unique id generator
	/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
	/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

	/* eslint-disable jsx-a11y/no-autofocus */

	// # Textarea Component

	// Implements the [Textarea design pattern](https://lightningdesignsystem.com/components/textarea).
	// Based on SLDS v2.4.0
	//

	// ### React
	exports.default = Textarea;
});