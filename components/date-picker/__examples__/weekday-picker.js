define(['exports', 'react', 'create-react-class', '../../../../components/date-picker'], function (exports, _react, _createReactClass, _datePicker) {
	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _react2 = _interopRequireDefault(_react);

	var _createReactClass2 = _interopRequireDefault(_createReactClass);

	var _datePicker2 = _interopRequireDefault(_datePicker);

	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	var Example = (0, _createReactClass2.default)({
		displayName: 'DatepickerExample',

		render: function render() {
			return _react2.default.createElement(_datePicker2.default, {
				dateDisabled: function dateDisabled(_ref) {
					var date = _ref.date;
					return date.getDay() > 5 || date.getDay() < 1;
				}
			});
		}
	}); /* eslint-disable no-console, react/prop-types */
	exports.default = Example;
});