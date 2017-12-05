define(['exports', 'react', 'create-react-class', '../../../../components/date-picker/date-picker', '../../../../components/icon-settings'], function (exports, _react, _createReactClass, _datePicker, _iconSettings) {
	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _react2 = _interopRequireDefault(_react);

	var _createReactClass2 = _interopRequireDefault(_createReactClass);

	var _datePicker2 = _interopRequireDefault(_datePicker);

	var _iconSettings2 = _interopRequireDefault(_iconSettings);

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

	var Example = (0, _createReactClass2.default)({
		displayName: 'DatepickerExample',

		render: function render() {
			return _react2.default.createElement(
				_iconSettings2.default,
				{ iconPath: '/assets/icons' },
				_react2.default.createElement(_datePicker2.default, _extends({
					id: 'sample-datepicker',
					isOpen: true,
					menuPosition: 'relative',
					value: new Date(2014, 6, 23)
				}, this.props))
			);
		}
	});

	exports.default = Example;
});