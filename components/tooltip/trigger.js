define(['module', 'react', 'prop-types', 'react-dom'], function (module, _react, _propTypes, _reactDom) {
	'use strict';

	var _react2 = _interopRequireDefault(_react);

	var _propTypes2 = _interopRequireDefault(_propTypes);

	var _reactDom2 = _interopRequireDefault(_reactDom);

	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : {
			default: obj
		};
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

	var displayName = 'Tooltip.Trigger';
	var propTypes = {
		tooltip: _propTypes2.default.node
	};
	var defaultProps = {};

	/**
  * The Trigger component
  */

	var Trigger = function (_React$Component) {
		_inherits(Trigger, _React$Component);

		function Trigger(props) {
			_classCallCheck(this, Trigger);

			var _this = _possibleConstructorReturn(this, (Trigger.__proto__ || Object.getPrototypeOf(Trigger)).call(this, props));

			_this.handleTooltipMouseEnter = function () {
				_this.setState({
					isTooltipOpen: true,
					isTooltipClosing: false
				});
			};

			_this.handleTooltipMouseLeave = function () {
				if (_this.isUnmounting) return;
				_this.setState({ isTooltipClosing: true });
				var delay = _this.props.tooltip && _this.props.tooltip.props && _this.props.tooltip.props.hoverCloseDelay ? _this.props.tooltip.props.hoverCloseDelay : 0;
				setTimeout(function () {
					if (_this.state.isTooltipClosing) {
						_this.setState({
							isTooltipOpen: false,
							isTooltipClosing: false
						});
					}
				}, delay);
			};

			_this.state = {
				isTooltipClosing: false,
				isTooltipOpen: false
			};
			return _this;
		}

		_createClass(Trigger, [{
			key: 'componentDidMount',
			value: function componentDidMount() {
				if (this.props.tooltip) {
					this.addListeners();
				}
				var openByDefault = this.props && this.props.tooltip && this.props.tooltip.props && this.props.tooltip.props.openByDefault ? this.props.tooltip.props.openByDefault : false;
				this.setState({ // eslint-disable-line react/no-did-mount-set-state
					isTooltipOpen: openByDefault,
					tooltipTarget: _reactDom2.default.findDOMNode(this) // eslint-disable-line react/no-find-dom-node
				});
			}
		}, {
			key: 'addListeners',
			value: function addListeners() {
				_reactDom2.default.findDOMNode(this).addEventListener('mouseenter', this.handleTooltipMouseEnter.bind(this)); // eslint-disable-line react/no-find-dom-node
				_reactDom2.default.findDOMNode(this).addEventListener('focus', this.handleTooltipMouseEnter.bind(this)); // eslint-disable-line react/no-find-dom-node
				_reactDom2.default.findDOMNode(this).addEventListener('mouseleave', this.handleTooltipMouseLeave.bind(this)); // eslint-disable-line react/no-find-dom-node
				_reactDom2.default.findDOMNode(this).addEventListener('blur', this.handleTooltipMouseLeave.bind(this)); // eslint-disable-line react/no-find-dom-node
			}
		}, {
			key: 'componentWillUnmount',
			value: function componentWillUnmount() {
				this.isUnmounting = true;
				_reactDom2.default.findDOMNode(this).removeEventListener('mouseenter', this.handleTooltipMouseEnter.bind(this)); // eslint-disable-line react/no-find-dom-node
				_reactDom2.default.findDOMNode(this).removeEventListener('focus', this.handleTooltipMouseEnter.bind(this)); // eslint-disable-line react/no-find-dom-node
				_reactDom2.default.findDOMNode(this).removeEventListener('mouseleave', this.handleTooltipMouseLeave.bind(this)); // eslint-disable-line react/no-find-dom-node
				_reactDom2.default.findDOMNode(this).removeEventListener('blur', this.handleTooltipMouseLeave.bind(this)); // eslint-disable-line react/no-find-dom-node
			}
		}, {
			key: 'getMouseEventTarget',
			value: function getMouseEventTarget() {
				/* eslint-disable no-script-url */
				return this.props.disabled ? _react2.default.createElement(
					'a',
					{
						key: 'MouseEventTarget',
						href: 'javascript:void(0)',
						'aria-hidden': true,
						tabIndex: -1
						// inline style override
						, style: {
							backgroundColor: 'transparent',
							width: '100%',
							height: '100%',
							position: 'absolute',
							left: '0',
							top: '0'
						},
						onMouseOver: this.handleTooltipMouseEnter,
						onFocus: this.handleTooltipMouseEnter,
						onMouseOut: this.handleTooltipMouseLeave,
						onBlur: this.handleTooltipMouseLeave
					},
					_react2.default.createElement(
						'span',
						{ className: 'slds-assistive-text' },
						this.props.label || this.props.assistiveText
					)
				) : null;
				/* eslint-enable no-script-url */
			}
		}, {
			key: 'getTooltip',
			value: function getTooltip() {
				// eslint-disable-line consistent-return
				if (this.props.tooltip) {
					if (this.state.isTooltipOpen && this.state.tooltipTarget) {
						return [this.getMouseEventTarget(), _react2.default.cloneElement(this.props.tooltip, {
							key: 'tooltip',
							target: this.state.tooltipTarget,
							openByDefault: true
						})];
					}

					return this.getMouseEventTarget();
				}
			}
		}, {
			key: 'render',
			value: function render() {
				return _react2.default.createElement('span', null);
			}
		}]);

		return Trigger;
	}(_react2.default.Component);

	Trigger.displayName = displayName;
	Trigger.propTypes = propTypes;
	Trigger.defaultProps = defaultProps;

	module.exports = Trigger;
});