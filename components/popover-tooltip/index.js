define(['module', 'react', 'react-dom', '../../utilities/constants', './tooltip', './check-props', 'lodash.flatten', 'lodash.compact', 'shortid'], function (module, _react, _reactDom, _constants, _tooltip, _checkProps, _lodash, _lodash3, _shortid) {
	'use strict';

	var _react2 = _interopRequireDefault(_react);

	var _reactDom2 = _interopRequireDefault(_reactDom);

	var _tooltip2 = _interopRequireDefault(_tooltip);

	var _checkProps2 = _interopRequireDefault(_checkProps);

	var _lodash2 = _interopRequireDefault(_lodash);

	var _lodash4 = _interopRequireDefault(_lodash3);

	var _shortid2 = _interopRequireDefault(_shortid);

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

	// ### Display Name
	// Always use the canonical component name as the React display name.
	var displayName = _constants.POPOVER_TOOLTIP;

	var propTypes = {
		/**
   * Alignment of the Tooltip relative to the element that triggers it.
   */
		align: _react.PropTypes.oneOf(['top', 'top left', 'top right', 'right', 'right top', 'right bottom', 'bottom', 'bottom left', 'bottom right', 'left', 'left top', 'left bottom']).isRequired,
		/**
   * Pass the one element that triggers the Tooltip as a child. It must be an element with `tabIndex` or an element that already has a `tabIndex` set such as an anchor or a button, so that keyboard users can tab to it.
   */
		children: _react.PropTypes.node,
		/**
   * Content inside Tooltip.
   */
		content: _react.PropTypes.node.isRequired,
		/**
   * Constrains tooltip to window. If the tooltip is near the bottom, then it may appear about the trigger, despite the value of `align`.
   */
		flippable: _react.PropTypes.bool,
		/**
   * Delay on Tooltip closing.
   */
		hoverCloseDelay: _react.PropTypes.number,
		/**
  * A unique ID is needed in order to support keyboard navigation, ARIA support, and connect the popover to the triggering element.
  */
		id: _react.PropTypes.string,
		/**
  * Forces tooltip to be open. A value of `false` will disable any interaction with the tooltip.
  */
		isOpen: _react.PropTypes.bool,
		/**
  * This sets the location of the tooltip, if that location is different from the triggering node.
  */
		target: _react.PropTypes.node
	};

	var defaultProps = {
		align: 'top',
		content: _react2.default.createElement(
			'span',
			null,
			'Tooltip'
		),
		hoverCloseDelay: 50
	};

	/**
  * The PopoverTooltip component is variant of the Lightning Design System Popover component. This component wraps an element that triggers it to open. It must be a focusable child element (either a button or an anchor), so that keyboard users can navigate to it.
  */

	var PopoverTooltip = function (_React$Component) {
		_inherits(PopoverTooltip, _React$Component);

		function PopoverTooltip(props) {
			_classCallCheck(this, PopoverTooltip);

			var _this = _possibleConstructorReturn(this, (PopoverTooltip.__proto__ || Object.getPrototypeOf(PopoverTooltip)).call(this, props));

			_this.state = {
				isClosing: false,
				isOpen: false
			};
			return _this;
		}

		_createClass(PopoverTooltip, [{
			key: 'componentWillMount',
			value: function componentWillMount() {
				// `checkProps` issues warnings to developers about properties (similar to React's built in development tools)
				(0, _checkProps2.default)(_constants.POPOVER_TOOLTIP, this.props);

				this.generatedId = _shortid2.default.generate();
			}
		}, {
			key: 'componentDidMount',
			value: function componentDidMount() {
				this.setState({
					el: _reactDom2.default.findDOMNode(this)
				});
			}
		}, {
			key: 'componentDidUpdate',
			value: function componentDidUpdate(prevProps) {
				if (this.props.target && this.props.target !== prevProps.target) {
					this.setState({
						tooltipTarget: this.getTooltipTarget()
					});
				}
			}
		}, {
			key: 'componentWillUnmount',
			value: function componentWillUnmount() {
				this.isUnmounting = true;
			}
		}, {
			key: 'getId',
			value: function getId() {
				return this.props.id || this.generatedId;
			}
		}, {
			key: 'getTooltipTarget',
			value: function getTooltipTarget() {
				return this.props.target ? this.props.target : this.state.el;
			}
		}, {
			key: 'handleMouseEnter',
			value: function handleMouseEnter() {
				this.setState({
					isOpen: true,
					isClosing: false
				});
			}
		}, {
			key: 'handleMouseLeave',
			value: function handleMouseLeave() {
				var _this2 = this;

				this.setState({ isClosing: true });

				setTimeout(function () {
					if (!_this2.isUnmounting && _this2.state.isClosing) {
						_this2.setState({
							isOpen: false,
							isClosing: false
						});
					}
				}, this.props.hoverCloseDelay);
			}
		}, {
			key: 'getTooltipContent',
			value: function getTooltipContent() {
				return _react2.default.createElement(
					'div',
					{ className: 'slds-popover__body' },
					this.props.content
				);
			}
		}, {
			key: 'handleCancel',
			value: function handleCancel() {
				this.setState({
					isOpen: false,
					isClosing: false
				});
			}
		}, {
			key: 'getTooltip',
			value: function getTooltip() {
				var id = this.getId();
				var isOpen = this.props.isOpen === undefined ? this.state.isOpen : this.props.isOpen;

				return isOpen ? _tooltip2.default.getTooltip(id, this.props, this.getTooltipContent(), this.getTooltipTarget(), this.handleCancel.bind(this)) : _react2.default.createElement('span', null);
			}
		}, {
			key: 'renderAssistantText',
			value: function renderAssistantText() {
				return _react2.default.createElement(
					'span',
					{ className: 'slds-assistive-text' },
					this.props.content
				);
			}
		}, {
			key: 'decorateGrandKidsWithKeyToSilenceWarning',
			value: function decorateGrandKidsWithKeyToSilenceWarning(grandKids) {
				return _react2.default.Children.map(grandKids, function (component, i) {
					var decoratedComponent = _react2.default.isValidElement(component) ? _react2.default.cloneElement(component, { key: i }) : component;
					return decoratedComponent;
				});
			}
		}, {
			key: 'grandKidsWithAsstText',
			value: function grandKidsWithAsstText(child) {
				var _child$props = child.props;
				var props = _child$props === undefined ? {} : _child$props;

				var grandKids = (0, _lodash4.default)((0, _lodash2.default)([this.renderAssistantText()].concat(props.children)));
				return this.decorateGrandKidsWithKeyToSilenceWarning(grandKids);
			}
		}, {
			key: 'getContent',
			value: function getContent() {
				var _this3 = this;

				return _react2.default.Children.map(this.props.children, function (child, i) {
					return _react2.default.cloneElement(child, {
						key: i,
						'aria-describedby': _this3.getId(),
						onBlur: _this3.handleMouseLeave.bind(_this3),
						onFocus: _this3.handleMouseEnter.bind(_this3),
						onMouseEnter: _this3.handleMouseEnter.bind(_this3),
						onMouseLeave: _this3.handleMouseLeave.bind(_this3)
					}, _this3.grandKidsWithAsstText(child));
				});
			}
		}, {
			key: 'render',
			value: function render() {
				var containerStyles = { display: 'inline' };
				return _react2.default.createElement(
					'div',
					{
						style: containerStyles,
						ref: 'tooltipTarget'
					},
					this.getContent(),
					this.getTooltip()
				);
			}
		}]);

		return PopoverTooltip;
	}(_react2.default.Component);

	PopoverTooltip.displayName = displayName;
	PopoverTooltip.propTypes = propTypes;
	PopoverTooltip.defaultProps = defaultProps;

	module.exports = PopoverTooltip;
});