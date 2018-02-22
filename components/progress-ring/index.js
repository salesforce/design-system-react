define(['exports', 'react', 'prop-types', 'classnames', '../../utilities/constants', '../icon', './private/ring-shape'], function (exports, _react, _propTypes, _classnames, _constants, _icon, _ringShape) {
	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.THEME_OPTIONS = undefined;

	var _react2 = _interopRequireDefault(_react);

	var _propTypes2 = _interopRequireDefault(_propTypes);

	var _classnames2 = _interopRequireDefault(_classnames);

	var _icon2 = _interopRequireDefault(_icon);

	var _ringShape2 = _interopRequireDefault(_ringShape);

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

	var _THEME_CLASSES;

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

	/**
  * The themes available for the progress ring
  */
	var THEME_OPTIONS = exports.THEME_OPTIONS = Object.freeze({
		WARNING: 'warning',
		EXPIRED: 'expired',
		COMPLETE: 'complete'
	});

	/**
  * The CSS classes associated with each theme
  */
	var THEME_CLASSES = (_THEME_CLASSES = {}, _defineProperty(_THEME_CLASSES, THEME_OPTIONS.COMPLETE, 'slds-progress-ring_complete'), _defineProperty(_THEME_CLASSES, THEME_OPTIONS.WARNING, 'slds-progress-ring_warning'), _defineProperty(_THEME_CLASSES, THEME_OPTIONS.EXPIRED, 'slds-progress-ring_expired'), _THEME_CLASSES);

	var propTypes = {
		/**
   * HTML id for component.
   */
		id: _propTypes2.default.string,
		/**
   * CSS classes to be added to tag with `.slds-progress-ring`. Uses `classNames` [API](https://github.com/JedWatson/classnames).
   */
		className: _propTypes2.default.oneOfType([_propTypes2.default.array, _propTypes2.default.object, _propTypes2.default.string]),
		/**
   * The theme applied to the ring.
   */
		theme: _propTypes2.default.oneOf(['warning', 'expired', 'complete']),
		/**
   * Overrides the icon to be displayed.
   */
		icon: _propTypes2.default.node,
		/**
   * Display the icon associated with the theme.
   */
		hasIcon: _propTypes2.default.bool,
		/**
   * Percentage of progress completion, ranging [0, 100].
   */
		value: _propTypes2.default.number.isRequired
	};

	var defaultProps = {};

	/**
  * Customizable and configurable progress ring. Will display progress in a circular progress bar factor, and is capable of displaying iconography inside of the ring structure.
  */

	var ProgressRing = function (_React$Component) {
		_inherits(ProgressRing, _React$Component);

		function ProgressRing() {
			_classCallCheck(this, ProgressRing);

			return _possibleConstructorReturn(this, (ProgressRing.__proto__ || Object.getPrototypeOf(ProgressRing)).apply(this, arguments));
		}

		_createClass(ProgressRing, [{
			key: 'icon',
			value: function icon() {
				var icon = '';

				if (this.props.hasIcon) {
					if (this.props.icon) {
						icon = this.props.icon;
					} else if (this.props.theme === THEME_OPTIONS.WARNING) {
						icon = _react2.default.createElement(_icon2.default, { category: 'utility', name: 'warning', title: 'Warning' });
					} else if (this.props.theme === THEME_OPTIONS.EXPIRED) {
						icon = _react2.default.createElement(_icon2.default, { category: 'utility', name: 'error', title: 'Expired' });
					} else if (this.props.theme === THEME_OPTIONS.COMPLETE) {
						icon = _react2.default.createElement(_icon2.default, { category: 'utility', name: 'check', title: 'complete' });
					}
				}

				return icon;
			}
		}, {
			key: 'percentDecimal',
			value: function percentDecimal() {
				return this.props.value / 100;
			}
		}, {
			key: 'themeClass',
			value: function themeClass() {
				return THEME_CLASSES[this.props.theme] || '';
			}
		}, {
			key: 'render',
			value: function render() {
				return _react2.default.createElement(
					_ringShape2.default,
					{
						id: this.props.id,
						className: (0, _classnames2.default)(this.props.className, this.themeClass()),
						fillPercentDecimal: this.percentDecimal()
					},
					this.icon()
				);
			}
		}]);

		return ProgressRing;
	}(_react2.default.Component);

	ProgressRing.displayName = _constants.PROGRESS_RING;
	ProgressRing.propTypes = propTypes;
	ProgressRing.defaultProps = defaultProps;

	exports.default = ProgressRing;
});