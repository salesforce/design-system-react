define(['module', 'react', 'classnames', '../popover-tooltip', 'lodash.omit'], function (module, _react, _classnames2, _popoverTooltip, _lodash) {
	'use strict';

	var _react2 = _interopRequireDefault(_react);

	var _classnames3 = _interopRequireDefault(_classnames2);

	var _popoverTooltip2 = _interopRequireDefault(_popoverTooltip);

	var _lodash2 = _interopRequireDefault(_lodash);

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

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
		return typeof obj;
	} : function (obj) {
		return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj;
	};

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

	var displayName = 'PageHeaderDetailRow';
	var propTypes = {
		/**
   * Optional class name
   */
		className: _react2.default.PropTypes.string,
		/**
   * label
   */
		label: _react2.default.PropTypes.oneOfType([_react2.default.PropTypes.string, _react2.default.PropTypes.element]),
		/**
   * The content property can be a string or a React element
   */
		content: _react2.default.PropTypes.oneOfType([_react2.default.PropTypes.string, _react2.default.PropTypes.element]),
		/**
   * Sets whether the fields truncate
   */
		truncate: _react2.default.PropTypes.bool,
		flavor: _react2.default.PropTypes.string
	};

	var defaultProps = {
		label: '',
		content: ''
	};

	var DetailBlock = function (_Component) {
		_inherits(DetailBlock, _Component);

		function DetailBlock(props) {
			_classCallCheck(this, DetailBlock);

			var _this = _possibleConstructorReturn(this, (DetailBlock.__proto__ || Object.getPrototypeOf(DetailBlock)).call(this, props));

			_this.state = { showTooltip: false };
			return _this;
		}

		_createClass(DetailBlock, [{
			key: 'componentDidMount',
			value: function componentDidMount() {
				this._renderFieldTruncation();
			}
		}, {
			key: 'componentDidUpdate',
			value: function componentDidUpdate(prevProps) {
				if (this.props.content !== prevProps.content) {
					this._renderFieldTruncation();
				}
			}
		}, {
			key: '_renderFieldTruncation',
			value: function _renderFieldTruncation() {
				var fieldContent = this.refs.fieldContent;
				var isTruncated = fieldContent && fieldContent.scrollWidth > fieldContent.offsetWidth;
				if (isTruncated) {
					this.setState({ showTooltip: true });
				} else {
					this.setState({ showTooltip: false });
				}
			}
		}, {
			key: '_getClassNames',
			value: function _getClassNames(className, flavor) {
				return (0, _classnames3.default)('slds-page-header__detail-block', className, _defineProperty({}, 'slds-size--' + flavor, flavor));
			}
		}, {
			key: 'render',
			value: function render() {
				var _props = this.props;
				var className = _props.className;
				var label = _props.label;
				var content = _props.content;
				var truncate = _props.truncate;
				var flavor = _props.flavor;


				var attr = (0, _lodash2.default)(['className', 'label', 'content', 'truncate', 'flavor'], this.props);

				var classes = this._getClassNames(className, flavor);
				var labelElement = void 0;
				var contentElement = void 0;

				/**
     * Render the label
     */
				var renderLabel = function renderLabel() {
					var type = typeof label === 'undefined' ? 'undefined' : _typeof(label);

					if (type === 'string') {
						var labelClasses = (0, _classnames3.default)('slds-text-title', {
							'slds-truncate': truncate
						});
						return _react2.default.createElement(
							'p',
							{ className: labelClasses, title: label },
							label
						);
					}
					return label;
				};

				/**
     * Render the content
     */
				var renderContent = function renderContent() {
					var type = typeof content === 'undefined' ? 'undefined' : _typeof(content);
					if (type === 'string') {
						var labelClasses = (0, _classnames3.default)('slds-text-body--regular', {
							'slds-truncate': truncate
						});
						return _react2.default.createElement(
							'p',
							{ ref: 'fieldContent', className: labelClasses, content: content },
							content
						);
					}
					return content;
				};

				/**
     * Render the content with a tooltip (for content that truncates)
     */
				var renderContentWithTooltip = function renderContentWithTooltip() {
					var labelClasses = (0, _classnames3.default)('slds-text-body--regular', {
						'slds-truncate': truncate
					});
					return _react2.default.createElement(
						_popoverTooltip2.default,
						{
							align: 'top',
							content: content
						},
						_react2.default.createElement(
							'p',
							{ tabIndex: '0', className: labelClasses },
							content
						)
					);
				};

				labelElement = renderLabel();
				contentElement = this.state.showTooltip ? renderContentWithTooltip() : renderContent();

				return _react2.default.createElement(
					'li',
					_extends({ className: classes }, attr),
					labelElement,
					contentElement
				);
			}
		}]);

		return DetailBlock;
	}(_react.Component);

	DetailBlock.displayName = displayName;
	DetailBlock.propTypes = propTypes;
	DetailBlock.defaultProps = defaultProps;

	module.exports = DetailBlock;
});