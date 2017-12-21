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

	function _toConsumableArray(arr) {
		if (Array.isArray(arr)) {
			for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {
				arr2[i] = arr[i];
			}

			return arr2;
		} else {
			return Array.from(arr);
		}
	}

	var Example = (0, _createReactClass2.default)({
		displayName: 'DatepickerExample',

		render: function render() {
			var _this = this;

			return _react2.default.createElement(_datePicker2.default, {
				isIsoWeekday: true,
				onChange: function onChange(event, data) {
					if (_this.props.action) {
						var dataAsArray = Object.keys(data).map(function (key) {
							return data[key];
						});
						_this.props.action('onChange').apply(undefined, [event, data].concat(_toConsumableArray(dataAsArray)));
					} else if (console) {
						console.log('onChange', event, data);
					}
				}
			});
		}
	});

	exports.default = Example;
});