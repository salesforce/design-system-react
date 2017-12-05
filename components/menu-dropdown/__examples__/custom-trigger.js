define(['exports', 'react', 'create-react-class', '../../../../components/icon-settings', '../../../../components/menu-dropdown', '../../../../components/menu-dropdown/button-trigger', '../../../../components/button/'], function (exports, _react, _createReactClass, _iconSettings, _menuDropdown, _buttonTrigger, _button) {
	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _react2 = _interopRequireDefault(_react);

	var _createReactClass2 = _interopRequireDefault(_createReactClass);

	var _iconSettings2 = _interopRequireDefault(_iconSettings);

	var _menuDropdown2 = _interopRequireDefault(_menuDropdown);

	var _buttonTrigger2 = _interopRequireDefault(_buttonTrigger);

	var _button2 = _interopRequireDefault(_button);

	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	// `~` is replaced with design-system-react at runtime

	// `~` is replaced with design-system-react at runtime
	var Example = (0, _createReactClass2.default)({
		displayName: 'DropdownExample',

		render: function render() {
			return _react2.default.createElement(
				_iconSettings2.default,
				{ iconPath: '/assets/icons' },
				_react2.default.createElement(
					_menuDropdown2.default,
					{
						align: 'right',
						options: [{ label: 'Menu Item One', value: 'A0' }, { label: 'Menu Item Two', value: 'B0' }, { label: 'Menu Item Three', value: 'C0' }, { type: 'divider' }, { label: 'Menu Item Four', value: 'D0' }]
					},
					_react2.default.createElement(
						_buttonTrigger2.default,
						null,
						_react2.default.createElement(_button2.default, {
							iconName: 'down',
							iconPosition: 'right',
							label: 'Dropdown'
						})
					)
				)
			);
		}
	}); // `~` is replaced with design-system-react at runtime
	exports.default = Example;
});