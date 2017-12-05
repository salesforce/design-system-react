define(['exports', 'react', 'prop-types', '../../../../components/radio-group', '../../../../components/radio-group/radio'], function (exports, _react, _propTypes, _radioGroup, _radio) {
	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _react2 = _interopRequireDefault(_react);

	var _propTypes2 = _interopRequireDefault(_propTypes);

	var _radioGroup2 = _interopRequireDefault(_radioGroup);

	var _radio2 = _interopRequireDefault(_radio);

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

	var Example = function (_React$Component) {
		_inherits(Example, _React$Component);

		function Example(props) {
			_classCallCheck(this, Example);

			var _this = _possibleConstructorReturn(this, (Example.__proto__ || Object.getPrototypeOf(Example)).call(this, props));

			_this.state = {};
			return _this;
		}

		_createClass(Example, [{
			key: 'render',
			value: function render() {
				var _this2 = this;

				var values = ['Radio Label One', 'Radio Label Two'];
				var labels = { label: 'Radio Group Label' };
				if (this.props.errorLabel) {
					labels.error = this.props.errorLabel;
				}
				return _react2.default.createElement(
					'div',
					null,
					_react2.default.createElement(
						_radioGroup2.default,
						{
							labels: labels,
							onChange: function onChange(event) {
								return _this2.setState({ checked: event.target.value });
							},
							disabled: this.props.disabled,
							required: this.props.required,
							name: this.props.name,
							errorId: this.props.errorId
						},
						values.map(function (value) {
							return _react2.default.createElement(_radio2.default, {
								key: value,
								id: value,
								label: value,
								value: value,
								checked: _this2.state.checked === value,
								variant: 'base'
							});
						})
					)
				);
			}
		}]);

		return Example;
	}(_react2.default.Component);

	Example.propTypes = {
		disabled: _propTypes2.default.bool,
		required: _propTypes2.default.bool,
		name: _propTypes2.default.string,
		errorId: _propTypes2.default.string,
		errorLabel: _propTypes2.default.string
	};

	Example.displayName = 'RadioGroupExample';

	exports.default = Example;
});