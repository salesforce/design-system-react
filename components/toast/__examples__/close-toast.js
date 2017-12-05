'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _toast = require('../../../../components/toast');

var _toast2 = _interopRequireDefault(_toast);

var _container = require('../../../../components/toast/container');

var _container2 = _interopRequireDefault(_container);

var _icon = require('../../../../components/icon');

var _icon2 = _interopRequireDefault(_icon);

var _button = require('../../../../components/button');

var _button2 = _interopRequireDefault(_button);

var _iconSettings = require('../../../../components/icon-settings');

var _iconSettings2 = _interopRequireDefault(_iconSettings);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // `~` is replaced with design-system-react at runtime
// `~` is replaced with design-system-react at runtime
// `~` is replaced with design-system-react at runtime
// `~` is replaced with design-system-react at runtime


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
					'div',
					null,
					_react2.default.createElement(
						_container2.default,
						null,
						this.state.isOpen ? _react2.default.createElement(_toast2.default, {
							labels: {
								heading: '26 potential duplicate leads were found.',
								headingLink: 'Select Leads to Merge'
							},
							onClickHeadingLink: function onClickHeadingLink() {
								console.log('Link clicked.');
							},
							onRequestClose: function onRequestClose() {
								_this2.setState({ isOpen: false });
							}
						}) : null
					),
					_react2.default.createElement(_button2.default, {
						label: 'Toggle toast',
						onClick: function onClick() {
							_this2.setState(function (prevState) {
								return { isOpen: !prevState.isOpen };
							});
						}
					})
				)
			);
		}
	}]);

	return Example;
}(_react2.default.Component);

Example.displayName = 'ToastExample';

exports.default = Example; // export is replaced with `ReactDOM.render(<Example />, mountNode);` at runtime