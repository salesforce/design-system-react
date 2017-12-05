'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _accordion = require('../../../../../components/accordion');

var _accordion2 = _interopRequireDefault(_accordion);

var _panel = require('../../../../../components/accordion/panel');

var _panel2 = _interopRequireDefault(_panel);

var _iconSettings = require('../../../../../components/icon-settings');

var _iconSettings2 = _interopRequireDefault(_iconSettings);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // `~` is replaced with design-system-react at runtime
// `~` is replaced with design-system-react at runtime


// `~` is replaced with design-system-react at runtime

var Example = function (_React$Component) {
	_inherits(Example, _React$Component);

	function Example(props) {
		_classCallCheck(this, Example);

		var _this = _possibleConstructorReturn(this, (Example.__proto__ || Object.getPrototypeOf(Example)).call(this, props));

		_this.state = {
			expandedPanels: {},
			items: [{
				id: '1',
				summary: 'Accordion Summary',
				details: 'Accordion details - A'
			}, {
				id: '2',
				summary: 'Accordion Summary',
				details: 'Accordion details - B'
			}]
		};
		return _this;
	}

	_createClass(Example, [{
		key: 'togglePanel',
		value: function togglePanel(event, data) {
			this.setState(function (state) {
				return _extends({}, state, {
					expandedPanels: _extends({}, state.expandedPanels, _defineProperty({}, data.id, !state.expandedPanels[data.id]))
				});
			});
			console.log('onClick', data);
		}
	}, {
		key: 'render',
		value: function render() {
			var _this2 = this;

			return _react2.default.createElement(
				_iconSettings2.default,
				{ iconPath: '/assets/icons' },
				_react2.default.createElement(
					_accordion2.default,
					{ id: 'base-example-accordion' },
					this.state.items.map(function (item) {
						return _react2.default.createElement(
							_panel2.default,
							{
								expanded: true,
								id: item.id,
								key: item.id,
								onTogglePanel: function onTogglePanel() {
									return _this2.togglePanel(event, item);
								},
								summary: item.summary
							},
							item.details
						);
					})
				)
			);
		}
	}]);

	return Example;
}(_react2.default.Component);

exports.default = Example;


Example.displayName = 'AccordionExample'; // export is replaced with `ReactDOM.render(<Example />, mountNode);` at runtime