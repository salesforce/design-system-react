define(['exports', 'react', 'create-react-class', '../../../../components/button-group', '../../../../components/button', '../../../../components/menu-dropdown', '../../../../components/icon-settings'], function (exports, _react, _createReactClass, _buttonGroup, _button, _menuDropdown, _iconSettings) {
	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _react2 = _interopRequireDefault(_react);

	var _createReactClass2 = _interopRequireDefault(_createReactClass);

	var _buttonGroup2 = _interopRequireDefault(_buttonGroup);

	var _button2 = _interopRequireDefault(_button);

	var _menuDropdown2 = _interopRequireDefault(_menuDropdown);

	var _iconSettings2 = _interopRequireDefault(_iconSettings);

	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	var Example = (0, _createReactClass2.default)({
		displayName: 'ButtonGroupExample',

		render: function render() {
			return _react2.default.createElement(
				_iconSettings2.default,
				{ iconPath: '/assets/icons' },
				_react2.default.createElement(
					_buttonGroup2.default,
					null,
					_react2.default.createElement(_button2.default, { label: 'Refresh' }),
					_react2.default.createElement(_button2.default, { label: 'Edit' }),
					_react2.default.createElement(_button2.default, { label: 'Save' }),
					_react2.default.createElement(_menuDropdown2.default, {
						id: 'ButtonGroupExampleDropdown',
						assistiveText: 'More Options',
						buttonVariant: 'icon',
						iconName: 'down',
						iconVariant: 'border-filled',
						onSelect: function onSelect() {
							console.log(item.label, 'selected');
						},
						openOn: 'click',
						options: [{ label: 'undo', value: 'A0' }, { label: 'redo', value: 'B0' }, { label: 'activate', value: 'C0' }]
					})
				)
			);
		}
	});

	exports.default = Example;
});