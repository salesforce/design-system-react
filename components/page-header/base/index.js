define(['module', 'react', 'classnames', 'lodash.omit'], function (module, _react, _classnames, _lodash) {
	'use strict';

	var _react2 = _interopRequireDefault(_react);

	var _classnames2 = _interopRequireDefault(_classnames);

	var _lodash2 = _interopRequireDefault(_lodash);

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

	var displayName = 'PageHeaderBase';
	var propTypes = {
		/**
   * Icon node passed by PageHeader
   */
		icon: _react2.default.PropTypes.node,
		/**
   * Title node passed by PageHeader
   */
		title: _react2.default.PropTypes.node,
		/**
   * Info node passed by PageHeader
   */
		info: _react2.default.PropTypes.node
	};
	var defaultProps = {};

	var Base = function (_Component) {
		_inherits(Base, _Component);

		function Base() {
			_classCallCheck(this, Base);

			return _possibleConstructorReturn(this, (Base.__proto__ || Object.getPrototypeOf(Base)).apply(this, arguments));
		}

		_createClass(Base, [{
			key: 'renderIcon',
			value: function renderIcon() {
				if (this.props.icon) {
					return _react2.default.createElement(
						'div',
						{ className: 'slds-media__figure' },
						this.props.icon
					);
				}
			}
		}, {
			key: 'render',
			value: function render() {
				return _react2.default.createElement(
					'div',
					{ className: 'slds-media slds-media--center' },
					this.renderIcon(),
					_react2.default.createElement(
						'div',
						{ className: 'slds-media__body' },
						this.props.title,
						this.props.info
					)
				);
			}
		}]);

		return Base;
	}(_react.Component);

	Base.displayName = displayName;
	Base.propTypes = propTypes;
	Base.defaultProps = defaultProps;

	module.exports = Base;
});