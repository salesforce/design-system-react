define(['exports', 'react', '../../../../components/alert', '../../../../components/alert/container', '../../../../components/icon', '../../../../components/button', '../../../../components/icon-settings'], function (exports, _react, _alert, _container, _icon, _button, _iconSettings) {
	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _react2 = _interopRequireDefault(_react);

	var _alert2 = _interopRequireDefault(_alert);

	var _container2 = _interopRequireDefault(_container);

	var _icon2 = _interopRequireDefault(_icon);

	var _button2 = _interopRequireDefault(_button);

	var _iconSettings2 = _interopRequireDefault(_iconSettings);

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

			_this.state = {
				isOpen: false
			};
			return _this;
		}

		_createClass(Example, [{
			key: 'render',
			value: function render() {
				var _this2 = this;

				return _react2.default.createElement(
					_iconSettings2.default,
					{ iconPath: '/assets/icons' },
					_react2.default.createElement(
						_container2.default,
						null,
						_react2.default.createElement(_alert2.default, {
							dismissible: true,
							icon: _react2.default.createElement(_icon2.default, { category: 'utility', name: 'user' }),
							labels: {
								heading: 'Logged in as John Smith (johnsmith@acme.com).',
								headingLink: 'Log out'
							},
							onClickHeadingLink: function onClickHeadingLink() {
								console.log('Link clicked.');
							},
							onRequestClose: function onRequestClose() {
								_this2.setState({ isOpen: false });
							}
						})
					)
				);
			}
		}]);

		return Example;
	}(_react2.default.Component);

	Example.displayName = 'AlertExample';

	exports.default = Example;
});