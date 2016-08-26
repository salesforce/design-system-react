define(['module', 'react', 'classnames', 'lodash.isboolean', 'lodash.isfunction', 'lodash.omit', '../icon/button-icon', '../popover-tooltip/trigger', '../../utilities/constants'], function (module, _react, _classnames, _lodash, _lodash3, _lodash5, _buttonIcon, _trigger, _constants) {
	'use strict';

	var _react2 = _interopRequireDefault(_react);

	var _classnames2 = _interopRequireDefault(_classnames);

	var _lodash2 = _interopRequireDefault(_lodash);

	var _lodash4 = _interopRequireDefault(_lodash3);

	var _lodash6 = _interopRequireDefault(_lodash5);

	var _buttonIcon2 = _interopRequireDefault(_buttonIcon);

	var _trigger2 = _interopRequireDefault(_trigger);

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

	var _get = function get(object, property, receiver) {
		if (object === null) object = Function.prototype;
		var desc = Object.getOwnPropertyDescriptor(object, property);

		if (desc === undefined) {
			var parent = Object.getPrototypeOf(object);

			if (parent === null) {
				return undefined;
			} else {
				return get(parent, property, receiver);
			}
		} else if ("value" in desc) {
			return desc.value;
		} else {
			var getter = desc.get;

			if (getter === undefined) {
				return undefined;
			}

			return getter.call(receiver);
		}
	};

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

	var blurElement = function blurElement(e) {
		return e.currentTarget.blur();
	};

	var propTypes = {
		/**
   * Specifies the current state of the button. If set, the button will act as a ['controlled' component](https://facebook.github.io/react/docs/forms.html#controlled-components).
   */
		active: _react.PropTypes.bool,
		/**
   * Text that is visually hidden but read aloud by screenreaders to tell the user what the icon means.
   * If the button has an icon and a visible label, you can omit the <code>assistiveText</code> prop and use the <code>label</code> prop.
   */
		assistiveText: _react.PropTypes.string,
		disabled: _react.PropTypes.bool,
		/**
   * Name of the icon. Visit <a href='http://www.lightningdesignsystem.com/resources/icons'>Lightning Design System Icons</a> to reference icon names.
   */
		iconName: _react.PropTypes.string,
		iconSize: _react.PropTypes.oneOf(['x-small', 'small', 'medium', 'large']),
		/**
   * If true, button/icon is white. Meant for buttons or utility icons on dark backgrounds.
   */
		inverse: _react.PropTypes.bool,
		onClick: _react.PropTypes.func,
		/**
   * If true, button scales to 100% width on small form factors.
   */
		responsive: _react.PropTypes.bool,
		/**
   * Write <code>'-1'</code> if you don't want the user to tab to the button.
   */
		tabIndex: _react.PropTypes.string,
		/**
   * Initial label and icon (optional) of button.
   */
		stateOne: _react.PropTypes.object,
		/**
   * Selected label and icon (optional) of button.
   */
		stateTwo: _react.PropTypes.object,
		/**
   *	Deselect label and icon (optional) of button.
   */
		stateThree: _react.PropTypes.object,
		tooltip: _react.PropTypes.node,
		variant: _react.PropTypes.oneOf(['base', 'neutral', 'brand', 'destructive', 'icon'])
	};

	// i18n
	var defaultProps = {
		disabled: false,
		iconSize: 'medium',
		responsive: false,
		stateOne: { iconName: 'add', label: 'Follow' },
		stateTwo: { iconName: 'check', label: 'Following' },
		stateThree: { iconName: 'close', label: 'Unfollow' }
	};

	/**
  * The ButtonStateful component is a variant of the Lightning Design System Button component. It is used for buttons that have a state of unselected or selected.
  * For icon buttons, use <code>variant='icon'</code>. For buttons with labels or buttons with labels and icons, pass data to the state props (ie. <code>stateOne={{iconName: 'add', label: 'Join'}}</code>).
  */

	var ButtonStateful = function (_TooltipTrigger) {
		_inherits(ButtonStateful, _TooltipTrigger);

		function ButtonStateful(props) {
			_classCallCheck(this, ButtonStateful);

			var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(ButtonStateful).call(this, props));

			_this.state = { active: false };
			return _this;
		}

		_createClass(ButtonStateful, [{
			key: 'componentDidMount',
			value: function componentDidMount() {
				_get(Object.getPrototypeOf(ButtonStateful.prototype), 'componentDidMount', this).call(this);
			}
		}, {
			key: 'componentWillUnmount',
			value: function componentWillUnmount() {
				_get(Object.getPrototypeOf(ButtonStateful.prototype), 'componentWillUnmount', this).call(this);
			}
		}, {
			key: 'handleClick',
			value: function handleClick(e) {
				if ((0, _lodash4.default)(this.props.onClick)) this.props.onClick(e);
				if (!(0, _lodash2.default)(this.props.active)) this.setState({ active: !this.state.active });
			}
		}, {
			key: 'getClassName',
			value: function getClassName(active) {
				return (0, _classnames2.default)(this.props.className, 'slds-button', {
					'slds-button--neutral': this.props.variant !== 'icon',
					'slds-button--inverse': this.props.variant === 'inverse',
					'slds-not-selected': !active,
					'slds-is-selected': active,
					'slds-max-small-button--stretch': this.props.responsive,
					'slds-button--icon-border': this.props.variant === 'icon'
				});
			}
		}, {
			key: 'render',
			value: function render() {
				var props = (0, _lodash6.default)(this.props, ['className', 'label', 'onClick', 'type', 'active']);
				var active = (0, _lodash2.default)(this.props.active) ? this.props.active : this.state.active;

				if (this.props.variant === 'icon') {
					return _react2.default.createElement(
						'button',
						_extends({
							onMouseLeave: blurElement,
							className: this.getClassName(active),
							onClick: this.handleClick.bind(this)
						}, props, {
							'aria-live': 'polite'
						}),
						_react2.default.createElement(_buttonIcon2.default, {
							assistiveText: active ? this.props.assistiveText + ' selected' : this.props.assistiveText,
							disabled: this.props.disabled,
							name: this.props.iconName,
							size: this.props.iconSize,
							className: 'slds-button__icon--stateful'
						}),
						this.getTooltip()
					);
				}

				return _react2.default.createElement(
					'button',
					_extends({
						onMouseLeave: blurElement,
						className: this.getClassName(active),
						'aria-live': 'assertive',
						onClick: this.handleClick.bind(this)
					}, props),
					_react2.default.createElement(
						'span',
						{ className: 'slds-text-not-selected' },
						_react2.default.createElement(_buttonIcon2.default, {
							disabled: this.props.disabled,
							name: this.props.stateOne.iconName,
							size: 'small',
							position: 'left',
							className: 'slds-button__icon--stateful'
						}),
						this.props.stateOne.label
					),
					_react2.default.createElement(
						'span',
						{ className: 'slds-text-selected' },
						_react2.default.createElement(_buttonIcon2.default, {
							disabled: this.props.disabled,
							name: this.props.stateTwo.iconName,
							size: 'small', position: 'left',
							className: 'slds-button__icon--stateful'
						}),
						this.props.stateTwo.label
					),
					_react2.default.createElement(
						'span',
						{ className: 'slds-text-selected-focus' },
						_react2.default.createElement(_buttonIcon2.default, {
							disabled: this.props.disabled,
							name: this.props.stateThree.iconName,
							size: 'small',
							position: 'left',
							className: 'slds-button__icon--stateful'
						}),
						this.props.stateThree.label
					),
					this.getTooltip()
				);
			}
		}]);

		return ButtonStateful;
	}(_trigger2.default);

	ButtonStateful.displayName = _constants.BUTTON_STATEFUL;
	ButtonStateful.propTypes = propTypes;
	ButtonStateful.defaultProps = defaultProps;

	module.exports = ButtonStateful;
});