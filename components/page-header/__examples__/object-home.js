define(['exports', 'react', 'create-react-class', '../../../../components/icon-settings', '../../../../components/page-header', '../../../../components/button', '../../../../components/button-group', '../../../../components/menu-dropdown', '../../../../components/menu-dropdown/button-trigger'], function (exports, _react, _createReactClass, _iconSettings, _pageHeader, _button, _buttonGroup, _menuDropdown, _buttonTrigger) {
	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _react2 = _interopRequireDefault(_react);

	var _createReactClass2 = _interopRequireDefault(_createReactClass);

	var _iconSettings2 = _interopRequireDefault(_iconSettings);

	var _pageHeader2 = _interopRequireDefault(_pageHeader);

	var _button2 = _interopRequireDefault(_button);

	var _buttonGroup2 = _interopRequireDefault(_buttonGroup);

	var _menuDropdown2 = _interopRequireDefault(_menuDropdown);

	var _buttonTrigger2 = _interopRequireDefault(_buttonTrigger);

	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	// `~` is replaced with design-system-react at runtime
	var Example = (0, _createReactClass2.default)({
		displayName: 'PageHeaderExample',

		render: function render() {
			var navRight = _react2.default.createElement(
				'div',
				null,
				_react2.default.createElement(
					_buttonGroup2.default,
					null,
					_react2.default.createElement(_button2.default, {
						label: 'New Lead'
					}),
					_react2.default.createElement(_button2.default, {
						label: 'Import Leads'
					}),
					_react2.default.createElement(_menuDropdown2.default, {
						align: 'right',
						assistiveText: 'More Options',
						iconName: 'down',
						iconVariant: 'border-filled',
						options: [{ label: 'Menu Item One', value: 'A0' }, { label: 'Menu Item Two', value: 'B0' }, { label: 'Menu Item Three', value: 'C0' }, { type: 'divider' }, { label: 'Menu Item Four', value: 'D0' }]
					})
				)
			);

			var contentRight = _react2.default.createElement(
				'div',
				null,
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
							assistiveText: 'List View Controls',
							className: 'slds-m-right--xx-small',
							iconName: 'settings',
							iconVariant: 'more'
						})
					)
				),
				_react2.default.createElement(
					_menuDropdown2.default,
					{
						align: 'right',
						assistiveText: 'Change view',
						iconName: 'settings',
						iconVariant: 'more',
						options: [{ label: 'Menu Item One', value: 'A0' }, { label: 'Menu Item Two', value: 'B0' }, { label: 'Menu Item Three', value: 'C0' }, { type: 'divider' }, { label: 'Menu Item Four', value: 'D0' }]
					},
					_react2.default.createElement(
						_buttonTrigger2.default,
						null,
						_react2.default.createElement(_button2.default, {
							assistiveText: 'Change view',
							className: 'slds-m-right--xx-small',
							iconName: 'table',
							iconVariant: 'more',
							variant: 'icon'
						})
					)
				),
				_react2.default.createElement(_button2.default, {
					assistiveText: 'Edit List',
					iconName: 'edit',
					iconVariant: 'border',
					variant: 'icon'
				}),
				_react2.default.createElement(_button2.default, {
					assistiveText: 'Refresh',
					iconName: 'refresh',
					iconVariant: 'border',
					variant: 'icon'
				}),
				_react2.default.createElement(
					'div',
					null,
					_react2.default.createElement(
						_buttonGroup2.default,
						null,
						_react2.default.createElement(_button2.default, {
							assistiveText: 'Charts',
							iconName: 'chart',
							iconVariant: 'border',
							variant: 'icon'
						}),
						_react2.default.createElement(_button2.default, {
							assistiveText: 'Filters',
							iconName: 'filterList',
							iconVariant: 'border',
							variant: 'icon'
						})
					)
				)
			);

			return _react2.default.createElement(
				_iconSettings2.default,
				{ iconPath: '/assets/icons' },
				_react2.default.createElement(_pageHeader2.default, {
					contentRight: contentRight,
					iconAssistiveText: 'User',
					iconCategory: 'standard',
					iconName: 'lead',
					info: '10 items \u2022 sorted by name',
					label: 'Leads',
					navRight: navRight,
					title: _react2.default.createElement(
						'h1',
						{ className: 'slds-page-header__title slds-p-right--x-small' },
						_react2.default.createElement(
							_menuDropdown2.default,
							{
								options: [{ label: 'Menu Item One', value: 'A0' }, { label: 'Menu Item Two', value: 'B0' }, { label: 'Menu Item Three', value: 'C0' }, { type: 'divider' }, { label: 'Menu Item Four', value: 'D0' }]
							},
							_react2.default.createElement(
								_buttonTrigger2.default,
								null,
								_react2.default.createElement(_button2.default, {
									className: 'slds-button--reset slds-type-focus',
									iconName: 'down',
									iconPosition: 'right',
									label: 'Dropdown',
									responsive: true,
									variant: 'base'
								})
							)
						)
					),
					truncate: true,
					variant: 'objectHome'
				})
			);
		}
	});

	exports.default = Example;
});