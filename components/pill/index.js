define(['exports', 'react', 'prop-types', 'classnames', '../../utilities/constants', '../utilities/utility-icon', '../../utilities/key-code', '../../utilities/event', './check-props'], function (exports, _react, _propTypes, _classnames, _constants, _utilityIcon, _keyCode, _event, _checkProps) {
	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _react2 = _interopRequireDefault(_react);

	var _propTypes2 = _interopRequireDefault(_propTypes);

	var _classnames2 = _interopRequireDefault(_classnames);

	var _utilityIcon2 = _interopRequireDefault(_utilityIcon);

	var _keyCode2 = _interopRequireDefault(_keyCode);

	var _event2 = _interopRequireDefault(_event);

	var _checkProps2 = _interopRequireDefault(_checkProps);

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

	var propTypes = {
		/**
   * **Assistive text for accessibility**
   * This object is merged with the default props object on every render.
   * * `remove`: This is a visually hidden label for the close button.
   * _Tested with snapshot testing._
   */
		assistiveText: _propTypes2.default.shape({
			remove: _propTypes2.default.string
		}),
		/**
   * SLDSAvatar component to show on the left of the pill.
   * _Tested with Mocha framework._
   */
		avatar: _propTypes2.default.element,
		/**
   * Applies the bare style to the component.
   * _Tested with Mocha framework._
   */
		bare: _propTypes2.default.bool,
		/**
   * This is a way to specify custom contents for the pill in the case a simple text label is not enough.
   * _Tested with Mocha framework._
   */
		children: _propTypes2.default.node,
		/**
   * CSS classes to be added to tag with `.slds-pill`. Uses `classNames` [API](https://github.com/JedWatson/classnames).
   * _Tested with Mocha framework._
   */
		className: _propTypes2.default.oneOfType([_propTypes2.default.array, _propTypes2.default.object, _propTypes2.default.string]),
		/**
   * Applies the error style to the component.
   * _Tested with Mocha framework._
   */
		hasError: _propTypes2.default.bool,
		/**
   * An href to use if the pill is shown as a link.
   * _Tested with Mocha framework._
   */
		href: _propTypes2.default.string,
		/**
   * SLDSIcon component to show on the left of the pill.
   * _Tested with Mocha framework._
   */
		icon: _propTypes2.default.element,
		/**
   * **Text labels for internationalization**
   * This object is merged with the default props object on every render.
   * * `label`: Pill's label.
   * * `title`: Pill's title.
   * * `removeTitle`: A title to use for the remove icon.
   *
   * _Tested with snapshot testing._
   */
		labels: _propTypes2.default.shape({
			label: _propTypes2.default.string,
			title: _propTypes2.default.string,
			removeTitle: _propTypes2.default.string
		}),
		/**
   * `onBlur` callback executes when the component loses focus.
   * _Tested with Mocha framework._
   */
		onBlur: _propTypes2.default.func,
		/**
   * `onClick` callback executes when a user clicks on the pill or presses the Enter key.
   * _Tested with Mocha framework._
   */
		onClick: _propTypes2.default.func,
		/**
   * `onFocus` callback executes when the component receives focus.
   * _Tested with Mocha framework._
   */
		onFocus: _propTypes2.default.func,
		/**
   * `onKeyDown` callback executes when a user presses a key.
   * _Tested with Mocha framework._
   */
		onKeyDown: _propTypes2.default.func,
		/**
   * `onRemove` callback executes when a user clicks on the pill's remove icon or presses the delete or the backspace keys.
   * _Tested with Mocha framework._
   */
		onRemove: _propTypes2.default.func,
		/**
   * A variant of a pill
   * _Tested with Mocha framework._
   */
		variant: _propTypes2.default.oneOf(['link', 'option'])
	};

	/**
  * A pill represents an object that can be viewed with or without an icon.
  */

	var Pill = function (_React$Component) {
		_inherits(Pill, _React$Component);

		function Pill() {
			var _ref;

			var _temp, _this, _ret;

			_classCallCheck(this, Pill);

			for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
				args[_key] = arguments[_key];
			}

			return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Pill.__proto__ || Object.getPrototypeOf(Pill)).call.apply(_ref, [this].concat(args))), _this), _this.getHref = function () {
				return typeof _this.props.href === 'string' ? _this.props.href : 'javascript:void(0);';
			}, _this.blur = function () {
				_this.root.blur();
			}, _this.focus = function () {
				_this.root.focus();
			}, _this.handleKeyDown = function (event) {
				for (var _len2 = arguments.length, rest = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
					rest[_key2 - 1] = arguments[_key2];
				}

				if (typeof _this.props.onKeyDown === 'function') {
					var _this$props$onKeyDown;

					// Make a callback to onKeyDown.
					(_this$props$onKeyDown = _this.props.onKeyDown).call.apply(_this$props$onKeyDown, [null, event].concat(rest));
					// Cancel further handling if the default handling for the event was prevented.
					if (event.defaultPrevented) {
						return;
					}
				}

				switch (event.keyCode) {
					case _keyCode2.default.ENTER:
						if (typeof _this.props.onClick === 'function') {
							_event2.default.trap(event);
							_this.props.onClick();
						}
						break;

					case _keyCode2.default.BACKSPACE:
					case _keyCode2.default.DELETE:
						if (typeof _this.props.onRemove === 'function') {
							_event2.default.trap(event);
							_this.props.onRemove();
						}
						break;

					default:
						break;
				}
			}, _this.handleRef = function (root) {
				// Keeping the top-most element to support focus() and blur()
				_this.root = root;
			}, _this.restProps = function () {
				var _this$props = _this.props,
				    bare = _this$props.bare,
				    hasError = _this$props.hasError,
				    variant = _this$props.variant,
				    className = _this$props.className,
				    onClick = _this$props.onClick,
				    onRemove = _this$props.onRemove,
				    labels = _this$props.labels,
				    assistiveText = _this$props.assistiveText,
				    children = _this$props.children,
				    href = _this$props.href,
				    icon = _this$props.icon,
				    avatar = _this$props.avatar,
				    onKeyDown = _this$props.onKeyDown,
				    other = _objectWithoutProperties(_this$props, ['bare', 'hasError', 'variant', 'className', 'onClick', 'onRemove', 'labels', 'assistiveText', 'children', 'href', 'icon', 'avatar', 'onKeyDown']);

				return other;
			}, _this.renderIcon = function () {
				var icon = _this.props.icon || _this.props.avatar;
				if (icon) {
					return _react2.default.createElement(
						'span',
						{ className: 'slds-pill__icon_container' },
						icon
					);
				}
				return null;
			}, _this.renderLabel = function () {
				if (_this.props.labels.label) {
					if (_this.props.variant === 'link') {
						return _react2.default.createElement(
							'a',
							{
								href: _this.getHref(),
								className: 'slds-pill__action',
								title: _this.props.labels.title || _this.props.labels.label,
								onClick: _this.props.onClick
							},
							_react2.default.createElement(
								'span',
								{ className: 'slds-pill__label' },
								_this.props.labels.label
							)
						);
					}
					return _react2.default.createElement(
						'span',
						{
							className: 'slds-pill__label',
							title: _this.props.labels.title || _this.props.labels.label
						},
						_this.props.labels.label
					);
				}
				return _this.props.children;
			}, _this.renderRemoveIcon = function () {
				if (typeof _this.props.onRemove === 'function') {
					return _react2.default.createElement(
						'span',
						{ // eslint-disable-line jsx-a11y/interactive-supports-focus
							className: 'slds-icon_container slds-pill__remove',
							title: _this.props.labels.removeTitle,
							role: 'button',
							onClick: _this.props.onRemove
						},
						_react2.default.createElement(_utilityIcon2.default, {
							style: { cursor: 'pointer' } // remove when fixed by SLDS CSS
							, category: 'utility',
							className: 'slds-icon slds-icon--x-small slds-icon-text-default',
							name: 'close'
						}),
						_react2.default.createElement(
							'span',
							{ className: 'slds-assistive-text' },
							_this.props.assistiveText.remove || _this.props.labels.removeTitle
						)
					);
				}

				return null;
			}, _temp), _possibleConstructorReturn(_this, _ret);
		}

		_createClass(Pill, [{
			key: 'componentWillMount',
			value: function componentWillMount() {
				(0, _checkProps2.default)(_constants.PILL);
			}
		}, {
			key: 'render',
			value: function render() {
				var role = void 0;
				switch (this.props.variant) {
					case 'link':
						role = 'button';
						break;
					case 'option':
						role = 'option';
						break;
					default:
				}

				return (
					/* eslint-disable jsx-a11y/no-static-element-interactions */
					_react2.default.createElement(
						'span',
						_extends({}, this.restProps(), {
							role: role,
							className: (0, _classnames2.default)('slds-pill', {
								'slds-pill_link': this.props.variant === 'link',
								'slds-has-error': this.props.hasError,
								'slds-pill_bare': this.props.bare
							}, this.props.className),
							onClick: !this.props.labels.label || this.props.variant !== 'link' ? this.props.onClick : null,
							onKeyDown: typeof this.props.onRemove === 'function' ? this.handleKeyDown : null,
							ref: this.handleRef
						}),
						this.renderIcon(),
						this.renderLabel(),
						this.renderRemoveIcon()
					)
				);
			}
		}]);

		return Pill;
	}(_react2.default.Component);

	Pill.displayName = _constants.PILL;

	Pill.defaultProps = {
		variant: 'link',
		labels: {},
		assistiveText: {}
	};

	Pill.propTypes = propTypes;

	exports.default = Pill;
});