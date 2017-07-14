define(['module', 'react', 'prop-types', 'lodash.isfunction', '../../button', './index', '../../icon/input-icon', '../../../utilities/key-code', '../../../utilities/constants'], function (module, _react, _propTypes, _lodash, _button, _index, _inputIcon, _keyCode, _constants) {
	'use strict';

	var _react2 = _interopRequireDefault(_react);

	var _propTypes2 = _interopRequireDefault(_propTypes);

	var _lodash2 = _interopRequireDefault(_lodash);

	var _button2 = _interopRequireDefault(_button);

	var _index2 = _interopRequireDefault(_index);

	var _inputIcon2 = _interopRequireDefault(_inputIcon);

	var _keyCode2 = _interopRequireDefault(_keyCode);

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

	/**
  * An inline input is rendered as a label by default. When clicked (or tabbed in), it's rendered as an input. When the focus is lost, the current input value is saved and the input is rendered as a label again.
  */
	var InlineEdit = _react2.default.createClass({
		// ### Display Name
		// Always use the canonical component name as the React display name.
		displayName: _constants.FORMS_INLINE_EDIT,

		// ### Prop Types
		propTypes: {
			/**
    * Class names to be added to the outer container of the input.
    */
			className: _propTypes2.default.oneOfType([_propTypes2.default.array, _propTypes2.default.object, _propTypes2.default.string]),
			/**
    * Name of the submitted form parameter.
    */
			name: _propTypes2.default.string,
			/**
    * Disables the Inline Edit component and prevents editing the contents.
    */
			disabled: _propTypes2.default.bool,
			/**
    * Every Inline Edit component must have a unique ID in order to support keyboard navigation and ARIA support.
    */
			id: _propTypes2.default.string.isRequired,
			/**
    * This event fires when the input changes.
    */
			onChange: _propTypes2.default.func,
			/**
    * Typically an Inline Edit component will be of the type text, but like the Input element it includes support for all HTML5 types.
    */
			type: _propTypes2.default.oneOf(['text', 'password', 'datetime', 'datetime-local', 'date', 'month', 'time', 'week', 'number', 'email', 'url', 'search', 'tel', 'color']),
			/**
    * Inline Edit is a controlled component, and will always display this value.
    */
			value: _propTypes2.default.string.isRequired
		},

		getDefaultProps: function getDefaultProps() {
			return {
				type: 'text'
			};
		},
		getInitialState: function getInitialState() {
			return {
				isEditing: false,
				value: null
			};
		},
		render: function render() {
			var _this = this;

			var _props = this.props,
			    disabled = _props.disabled,
			    value = _props.value,
			    name = _props.name,
			    rest = _objectWithoutProperties(_props, ['disabled', 'value', 'name']);

			var inlineEditTrigger = _react2.default.createElement(_button2.default, {
				assistiveText: 'Edit',
				disabled: disabled,
				iconName: 'edit',
				iconPosition: 'right',
				iconSize: 'small',
				variant: 'icon'
			});

			return _react2.default.createElement(_index2.default, _extends({}, rest, {
				iconRight: this.state.isEditing ? _react2.default.createElement(_inputIcon2.default, {
					category: 'utility',
					name: 'close',
					position: 'right',
					onClick: this.endEditMode
				}) : null,
				disabled: disabled,
				inlineEditTrigger: inlineEditTrigger,
				onBlur: this.handleBlur,
				onChange: this.handleChange,
				onClick: !this.state.isEditing ? this.triggerEditMode : null,
				onKeyDown: this.handleKeyDown,
				readOnly: !this.state.isEditing,
				name: name,
				value: this.state.isEditing ? this.state.value : value,
				inputRef: function inputRef(input) {
					_this.inputNode = input;
				}
			}));
		},
		componentDidUpdate: function componentDidUpdate() {
			if (this.autoFocus) {
				// const input = ReactDOM.findDOMNode(this).getElementsByTagName('input')[0];

				if (this.inputNode) {
					this.inputNode.focus();
					this.inputNode.select();
				}

				this.autoFocus = false;
			}
		},
		triggerEditMode: function triggerEditMode() {
			if (!this.props.disabled) {
				this.autoFocus = true;
				this.setState({
					isEditing: true,
					value: this.props.value
				});
			}
		},
		saveEdits: function saveEdits() {
			if ((0, _lodash2.default)(this.props.onChange)) {
				this.props.onChange({
					value: this.state.value
				});
			}

			this.endEditMode();
		},
		endEditMode: function endEditMode() {
			if (this.willSave) {
				clearTimeout(this.willSave);
				delete this.willSave;
			}

			this.setState({
				isEditing: false,
				value: null
			});
		},
		handleBlur: function handleBlur() {
			if (!this.willSave) {
				this.willSave = setTimeout(this.saveEdits, 200);
			}
		},
		handleChange: function handleChange(event) {
			this.setState({
				value: event.target.value
			});
		},
		handleKeyDown: function handleKeyDown(event) {
			if (event.keyCode) {
				if (event.keyCode === _keyCode2.default.ESCAPE) {
					this.endEditMode();
				} else if (event.keyCode === _keyCode2.default.ENTER) {
					this.saveEdits();
				}
			}
		}
	});

	module.exports = InlineEdit;
});