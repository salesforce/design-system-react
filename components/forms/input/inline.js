define(['exports', 'react', 'prop-types', 'lodash.isfunction', '../../button', './index', '../../icon/input-icon', '../../../utilities/key-code', '../../../utilities/constants'], function (exports, _react, _propTypes, _lodash, _button, _index, _inputIcon, _keyCode, _constants) {
	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

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

	function _classCallCheck(instance, Constructor) {
		if (!(instance instanceof Constructor)) {
			throw new TypeError("Cannot call a class as a function");
		}
	}

	var _createClass = function () {
		function defineProperties(target, props) {
			for (var i = 0; i < props.length; i++) {
				var descriptor = props[i];
				descriptor.enumerable = descriptor.enumerable || false;
				descriptor.configurable = true;
				if ("value" in descriptor) descriptor.writable = true;
				Object.defineProperty(target, descriptor.key, descriptor);
			}
		}

		return function (Constructor, protoProps, staticProps) {
			if (protoProps) defineProperties(Constructor.prototype, protoProps);
			if (staticProps) defineProperties(Constructor, staticProps);
			return Constructor;
		};
	}();

	function _possibleConstructorReturn(self, call) {
		if (!self) {
			throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
		}

		return call && (typeof call === "object" || typeof call === "function") ? call : self;
	}

	function _inherits(subClass, superClass) {
		if (typeof superClass !== "function" && superClass !== null) {
			throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
		}

		subClass.prototype = Object.create(superClass && superClass.prototype, {
			constructor: {
				value: subClass,
				enumerable: false,
				writable: true,
				configurable: true
			}
		});
		if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
	}

	// ### Prop Types
	var propTypes = {
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
   * Function will run when keyup during text edit
   */
		onKeyUp: _propTypes2.default.func,
		/**
   * Function will run when we enter edit mode
   */
		onEnterEditMode: _propTypes2.default.func,
		/**
   * Function will run when we leave edit mode
   */
		onLeaveEditMode: _propTypes2.default.func,
		/**
   * Typically an Inline Edit component will be of the type text, but like the Input element it includes support for all HTML5 types.
   */
		type: _propTypes2.default.oneOf(['text', 'password', 'datetime', 'datetime-local', 'date', 'month', 'time', 'week', 'number', 'email', 'url', 'search', 'tel', 'color']),
		/**
   * Inline Edit is a controlled component, and will always display this value.
   */
		value: _propTypes2.default.string.isRequired
	};

	var defaultProps = {
		assistiveText: 'Edit text',
		type: 'text'
	};

	/**
  * An inline input is rendered as a label by default. When clicked (or tabbed in), it's rendered as an input. When the focus is lost, the current input value is saved and the input is rendered as a label again.
  */

	var InlineEdit = function (_React$Component) {
		_inherits(InlineEdit, _React$Component);

		function InlineEdit(props) {
			_classCallCheck(this, InlineEdit);

			var _this = _possibleConstructorReturn(this, (InlineEdit.__proto__ || Object.getPrototypeOf(InlineEdit)).call(this, props));

			_this.triggerEditMode = function () {
				if (!_this.props.disabled) {
					_this.autoFocus = true;
					_this.setState({
						isEditing: true,
						value: _this.props.value
					});
					if ((0, _lodash2.default)(_this.props.onEnterEditMode)) {
						_this.props.onEnterEditMode();
					}
				}
			};

			_this.saveEdits = function (option) {
				if (!(option && option.cancel === true)) {
					if ((0, _lodash2.default)(_this.props.onChange)) {
						_this.props.onChange({
							value: _this.state.value
						});
					}
				}
				_this.endEditMode(option);
			};

			_this.endEditMode = function (option) {
				if (_this.willSave) {
					clearTimeout(_this.willSave);
					delete _this.willSave;
				}

				_this.setState({
					isEditing: false,
					value: null
				});

				if (_this.props.onLeaveEditMode && (0, _lodash2.default)(_this.props.onLeaveEditMode)) {
					_this.props.onLeaveEditMode(undefined, option);
				}
			};

			_this.handleBlur = function () {
				if (!_this.willSave) {
					_this.willSave = setTimeout(_this.saveEdits, 200);
				}
				if (_this.props.onLeaveEditMode && (0, _lodash2.default)(_this.props.onLeaveEditMode)) {
					_this.props.onLeaveEditMode();
				}
			};

			_this.handleChange = function (event) {
				_this.setState({
					value: event.target.value
				});
			};

			_this.handleKeyDown = function (event) {
				if (event.keyCode) {
					if (event.keyCode === _keyCode2.default.ESCAPE) {
						_this.saveEdits({ cancel: true });
					} else if (event.keyCode === _keyCode2.default.ENTER) {
						_this.saveEdits();
					}
				}
			};

			_this.handleKeyUp = function (event) {
				if (event.keyCode) {
					if (_this.props.onKeyUp && (0, _lodash2.default)(_this.props.onKeyUp)) {
						_this.props.onKeyUp(event, {
							value: _this.state.value
						});
					}
				}
			};

			_this.state = {
				isEditing: false,
				value: null
			};
			return _this;
		}

		_createClass(InlineEdit, [{
			key: 'componentDidUpdate',
			value: function componentDidUpdate() {
				if (this.autoFocus) {
					if (this.inputNode) {
						this.inputNode.focus();
						this.inputNode.select();
					}
					this.autoFocus = false;
				}
			}
		}, {
			key: 'render',
			value: function render() {
				var _this2 = this;

				var _props = this.props,
				    assistiveText = _props.assistiveText,
				    disabled = _props.disabled,
				    value = _props.value,
				    name = _props.name,
				    rest = _objectWithoutProperties(_props, ['assistiveText', 'disabled', 'value', 'name']);

				return _react2.default.createElement(_index2.default, _extends({}, rest, {
					iconRight: this.state.isEditing ? _react2.default.createElement(_inputIcon2.default, {
						category: 'utility',
						name: 'close',
						position: 'right',
						onClick: this.endEditMode,
						tabIndex: '-1'
					}) : null,
					disabled: disabled,
					inlineEditTrigger: _react2.default.createElement(_button2.default, {
						assistiveText: assistiveText,
						className: 'slds-m-left_x-small',
						disabled: disabled,
						iconName: 'edit',
						iconPosition: 'right',
						iconSize: 'small',
						variant: 'icon'
					}),
					onBlur: this.handleBlur,
					onChange: this.handleChange,
					onClick: !this.state.isEditing ? this.triggerEditMode : null,
					onKeyDown: this.handleKeyDown,
					onKeyUp: this.handleKeyUp,
					isStatic: !this.state.isEditing,
					name: name,
					value: this.state.isEditing ? this.state.value : value,
					inputRef: function inputRef(input) {
						_this2.inputNode = input;
					}
				}));
			}
		}]);

		return InlineEdit;
	}(_react2.default.Component);

	InlineEdit.displayName = _constants.FORMS_INLINE_EDIT;
	InlineEdit.propTypes = propTypes;
	InlineEdit.defaultProps = defaultProps;

	exports.default = InlineEdit;
});