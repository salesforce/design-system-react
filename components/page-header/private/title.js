define(['exports', 'react', 'prop-types', 'classnames'], function (exports, _react, _propTypes, _classnames2) {
	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _react2 = _interopRequireDefault(_react);

	var _propTypes2 = _interopRequireDefault(_propTypes);

	var _classnames3 = _interopRequireDefault(_classnames2);

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

	var displayName = 'PageHeaderTitle';
	var propTypes = {
		/**
   * Sets whether the title will truncate its content responsively.
   */
		truncate: _propTypes2.default.bool,
		/**
   * Sets the vertical alignment on the title
   */
		align: _propTypes2.default.oneOf(['top', 'middle', 'bottom']),
		/**
   * The title string (required)
   */
		title: _propTypes2.default.string.isRequired,
		/**
   * Optional class name
   */
		className: _propTypes2.default.string
	};
	var defaultProps = {
		truncate: true,
		align: 'middle',
		title: 'Page Header Title',
		className: ''
	};

	var Title = function (_Component) {
		_inherits(Title, _Component);

		function Title() {
			_classCallCheck(this, Title);

			return _possibleConstructorReturn(this, (Title.__proto__ || Object.getPrototypeOf(Title)).apply(this, arguments));
		}

		_createClass(Title, [{
			key: 'render',
			value: function render() {
				var _props = this.props,
				    children = _props.children,
				    title = _props.title,
				    truncate = _props.truncate,
				    align = _props.align,
				    className = _props.className;

				var classes = this._getClassNames(truncate, align, className);

				return _react2.default.createElement(
					'h1',
					{ className: classes, title: title },
					title,
					children
				);
			}
		}, {
			key: '_getClassNames',
			value: function _getClassNames(truncate, align, className) {
				// eslint-disable-line class-methods-use-this
				return (0, _classnames3.default)('slds-page-header__title slds-m-right--small', className, _defineProperty({
					'slds-truncate': truncate
				}, 'slds-align-' + align, align));
			}
		}]);

		return Title;
	}(_react.Component);

	Title.displayName = displayName;
	Title.propTypes = propTypes;
	Title.defaultProps = defaultProps;

	exports.default = Title;
});