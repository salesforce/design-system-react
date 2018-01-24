define(['exports', 'react', 'prop-types', 'classnames', '../button', '../icon', './check-props'], function (exports, _react, _propTypes, _classnames, _button, _icon, _checkProps) {
	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _react2 = _interopRequireDefault(_react);

	var _propTypes2 = _interopRequireDefault(_propTypes);

	var _classnames2 = _interopRequireDefault(_classnames);

	var _button2 = _interopRequireDefault(_button);

	var _icon2 = _interopRequireDefault(_icon);

	var _checkProps2 = _interopRequireDefault(_checkProps);

	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	function _defineProperty(obj, key, value) {
		if (key in obj) {
			Object.defineProperty(obj, key, {
				value: value,
				enumerable: true,
				configurable: true,
				writable: true
			});
		} else {
			obj[key] = value;
		}

		return obj;
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

	var displayName = 'Notification';
	var propTypes = {
		iconCategory: _propTypes2.default.string,
		/**
   * Custom classes applied to Notification element.
   */
		className: _propTypes2.default.string,
		/**
   * Message for Notification.
   */
		content: _propTypes2.default.node.isRequired,
		/**
   * If true, close button appears for users to dismiss Notification.
   */
		dismissible: _propTypes2.default.bool,
		/**
   * If duration exists, the Notification will disappear after that amount of time.
   */
		duration: _propTypes2.default.number,
		/**
   * Name of the icon. Visit <a href='http://www.lightningdesignsystem.com/resources/icons'>Lighning Design System Icons</a> to reference icon names.
   */
		iconName: _propTypes2.default.string,
		isOpen: _propTypes2.default.bool.isRequired,
		onDismiss: _propTypes2.default.func,
		/**
   * Styling for Notification background.
   */
		texture: _propTypes2.default.bool,
		/**
   * Styling for Notification background color. Please reference <a href='http://www.lightningdesignsystem.com/components/utilities/themes/#color'>Lighning Design System Themes > Color</a>.
   */
		theme: _propTypes2.default.oneOf(['success', 'warning', 'error', 'offline']),
		variant: _propTypes2.default.oneOf(['alert', 'toast']).isRequired
	};

	var defaultProps = {
		iconCategory: 'utility',
		dismissible: true,
		isOpen: false,
		texture: false
	};

	/**
  * The Notification component is the Alert and Toast variants of the Lightning Design System Notification component. For prompt notifications, use the <a href='#/modal'>Modal</a> component with <code>prompt={true}</code>.
  * The Notification opens from a state change outside of the component itself (pass this state to the <code>isOpen</code> prop).
  */

	var Notification = function (_React$Component) {
		_inherits(Notification, _React$Component);

		function Notification(props) {
			_classCallCheck(this, Notification);

			var _this = _possibleConstructorReturn(this, (Notification.__proto__ || Object.getPrototypeOf(Notification)).call(this, props));

			_this.onDismiss = function () {
				if (_this.timeout) {
					clearTimeout(_this.timeout);
					_this.timeout = null;
				}

				if (_this.props.onDismiss) _this.props.onDismiss();
				if (_this.state.returnFocusTo && _this.state.returnFocusTo.focus) {
					_this.state.returnFocusTo.focus();
				}
			};

			_this.state = {};
			_this.timeout = null;
			return _this;
		}

		_createClass(Notification, [{
			key: 'componentDidMount',
			value: function componentDidMount() {
				var _this2 = this;

				(0, _checkProps2.default)('Notification', this.props);

				if (this.props.duration) {
					this.timeout = setTimeout(function () {
						_this2.onDismiss();
					}, this.props.duration);
				}
			}
		}, {
			key: 'componentWillReceiveProps',
			value: function componentWillReceiveProps(nextProps) {
				var _this3 = this;

				if (nextProps.duration) {
					if (this.timeout) {
						clearTimeout(this.timeout);
					}
					if (nextProps.isOpen) {
						this.timeout = setTimeout(function () {
							_this3.onDismiss();
						}, this.props.duration);
					}
				}
				if (nextProps.isOpen !== this.props.isOpen) {
					this.setState({ returnFocusTo: document.activeElement });
				}
			}
		}, {
			key: 'componentDidUpdate',
			value: function componentDidUpdate(prevProps) {
				if (prevProps.isOpen !== this.props.isOpen) {
					var btn = this.dismissBtnRef;
					if (btn) btn.focus();
				}
			}
		}, {
			key: 'renderIcon',
			value: function renderIcon() {
				if (this.props.iconName) {
					var classes = '';

					if (this.props.variant === 'alert') {
						classes = 'slds-m-right--x-small';
					} else if (this.props.variant === 'toast') {
						classes = 'slds-m-right--small slds-col slds-no-flex';
					}

					return _react2.default.createElement(_icon2.default, {
						category: this.props.iconCategory,
						className: classes,
						inverse: true,
						name: this.props.iconName,
						size: 'small'
					});
				}

				return null;
			}
		}, {
			key: 'renderClose',
			value: function renderClose() {
				var _this4 = this;

				if (this.props.dismissible) {
					var size = null;
					if (this.props.variant === 'toast') size = 'large';

					// i18n
					return _react2.default.createElement(_button2.default, {
						assistiveText: 'Dismiss Notification',
						iconName: 'close',
						iconSize: size,
						inverse: true,
						className: 'slds-notify__close',
						onClick: this.onDismiss,
						buttonRef: function buttonRef(dismissBtn) {
							_this4.dismissBtnRef = dismissBtn;
						},
						variant: 'icon'
					});
				}

				return null;
			}
		}, {
			key: 'renderAlertContent',
			value: function renderAlertContent() {
				return _react2.default.createElement(
					'h2',
					{ id: 'dialogTitle' },
					this.renderIcon(),
					this.props.content
				);
			}
		}, {
			key: 'renderToastContent',
			value: function renderToastContent() {
				return _react2.default.createElement(
					'section',
					{ className: 'notify__content slds-grid' },
					this.renderIcon(),
					_react2.default.createElement(
						'div',
						{ className: 'slds-col slds-align-middle' },
						_react2.default.createElement(
							'h2',
							{ id: 'dialogTitle', className: 'slds-text-heading--small' },
							this.props.content
						)
					)
				);
			}
		}, {
			key: 'getClassName',
			value: function getClassName() {
				var _classNames;

				return (0, _classnames2.default)(this.props.className, 'slds-notify', (_classNames = {}, _defineProperty(_classNames, 'slds-notify--' + this.props.variant, this.props.variant), _defineProperty(_classNames, 'slds-theme--' + this.props.theme, this.props.theme), _defineProperty(_classNames, 'slds-theme--alert-texture', this.props.texture), _classNames));
			}
		}, {
			key: 'renderContent',
			value: function renderContent() {
				return _react2.default.createElement(
					'div',
					null,
					_react2.default.createElement(
						'span',
						{ className: 'slds-assistive-text' },
						this.props.theme
					),
					this.renderClose(),
					this.props.variant === 'toast' ? this.renderToastContent() : null,
					this.props.variant === 'alert' ? this.renderAlertContent() : null
				);
			}
		}, {
			key: 'blankContent',
			value: function blankContent() {
				// eslint-disable-line class-methods-use-this
				return _react2.default.createElement('div', null);
			}
		}, {
			key: 'render',
			value: function render() {
				// TODO: If there are multiple notifications on a page, we must 'hide' the ones that aren't open.
				// Need to find a better way to do this than using width:0 to override slds-notify-container.
				var styles = void 0;
				if (!this.props.isOpen) {
					styles = { width: '0px' };
				} else {
					styles = this.props.variant === 'toast' ? { width: 'auto', left: '50%', transform: 'translateX(-50%)' } : { width: '100%' };
				}

				var alertStyles = !this.props.isOpen ? { display: 'none' } : null;
				return _react2.default.createElement(
					'div',
					{ className: 'slds-notify-container', style: styles },
					_react2.default.createElement(
						'div',
						{
							className: this.getClassName(),
							role: 'alertdialog',
							'aria-labelledby': 'dialogTitle',
							style: alertStyles
						},
						this.props.isOpen ? this.renderContent() : this.blankContent()
					)
				);
			}
		}]);

		return Notification;
	}(_react2.default.Component);

	Notification.displayName = displayName;
	Notification.propTypes = propTypes;
	Notification.defaultProps = defaultProps;

	exports.default = Notification;
});