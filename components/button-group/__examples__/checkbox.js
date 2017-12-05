define(['exports', 'react', 'create-react-class', '../../../../components/button-group', '../../../../components/forms/checkbox'], function (exports, _react, _createReactClass, _buttonGroup, _checkbox) {
	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _react2 = _interopRequireDefault(_react);

	var _createReactClass2 = _interopRequireDefault(_createReactClass);

	var _buttonGroup2 = _interopRequireDefault(_buttonGroup);

	var _checkbox2 = _interopRequireDefault(_checkbox);

	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	var Example = (0, _createReactClass2.default)({
		displayName: 'ButtonGroupExample',

		render: function render() {
			return _react2.default.createElement(
				_buttonGroup2.default,
				{
					labels: {
						label: 'Scheduled Day(s)'
					},
					variant: 'checkbox'
				},
				_react2.default.createElement(_checkbox2.default, {
					id: 'ButtonGroupExampleMon',
					label: 'Mon'
				}),
				_react2.default.createElement(_checkbox2.default, {
					id: 'ButtonGroupExampleTue',
					label: 'Tue'
				}),
				_react2.default.createElement(_checkbox2.default, {
					id: 'ButtonGroupExampleWed',
					label: 'Wed'
				}),
				_react2.default.createElement(_checkbox2.default, {
					id: 'ButtonGroupExampleThu',
					label: 'Thu'
				}),
				_react2.default.createElement(_checkbox2.default, {
					id: 'ButtonGroupExampleFri',
					label: 'Fri'
				})
			);
		}
	});

	exports.default = Example;
});