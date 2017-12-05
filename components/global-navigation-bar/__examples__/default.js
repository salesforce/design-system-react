define(['exports', 'react', 'create-react-class', '../../../../components/icon-settings', '../../../../components/global-navigation-bar', '../../../../components/global-navigation-bar/region', '../../../../components/global-navigation-bar/dropdown', '../../../../components/global-navigation-bar/link', '../../../../components/button', '../../../../components/icon', '../../../../components/app-launcher', '../../../../components/app-launcher/section', '../../../../components/app-launcher/tile'], function (exports, _react, _createReactClass, _iconSettings, _globalNavigationBar, _region, _dropdown, _link, _button, _icon, _appLauncher, _section, _tile) {
	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _react2 = _interopRequireDefault(_react);

	var _createReactClass2 = _interopRequireDefault(_createReactClass);

	var _iconSettings2 = _interopRequireDefault(_iconSettings);

	var _globalNavigationBar2 = _interopRequireDefault(_globalNavigationBar);

	var _region2 = _interopRequireDefault(_region);

	var _dropdown2 = _interopRequireDefault(_dropdown);

	var _link2 = _interopRequireDefault(_link);

	var _button2 = _interopRequireDefault(_button);

	var _icon2 = _interopRequireDefault(_icon);

	var _appLauncher2 = _interopRequireDefault(_appLauncher);

	var _section2 = _interopRequireDefault(_section);

	var _tile2 = _interopRequireDefault(_tile);

	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	// `~` is replaced with design-system-react at runtime
	var Example = (0, _createReactClass2.default)({
		displayName: 'GlobalNavigationBarExample',

		render: function render() {
			var dropdownCollection = [{
				label: 'Menu Item One',
				value: '1',
				iconCategory: 'utility',
				iconName: 'table',
				href: 'http://www.google.com'
			}, {
				label: 'Menu Item Two',
				value: '2',
				iconCategory: 'utility',
				iconName: 'kanban',
				href: 'http://www.google.com'
			}, {
				label: 'Menu Item Three',
				value: '3',
				iconCategory: 'utility',
				iconName: 'side_list',
				href: 'http://www.google.com'
			}];

			return _react2.default.createElement(
				_iconSettings2.default,
				{ iconPath: '/assets/icons' },
				_react2.default.createElement(
					_globalNavigationBar2.default,
					null,
					_react2.default.createElement(
						_region2.default,
						{
							region: 'primary'
						},
						_react2.default.createElement(
							_appLauncher2.default,
							{
								triggerName: 'App Name',
								onSearch: function onSearch() {
									console.log('Search term:', event.target.value);
								},
								modalHeaderButton: _react2.default.createElement(_button2.default, { label: 'App Exchange' })
							},
							_react2.default.createElement(
								_section2.default,
								{ title: 'Tile Section' },
								_react2.default.createElement(_tile2.default, {
									title: 'Marketing Cloud',
									iconText: 'MC',
									description: 'Send emails, track emails, read emails! Emails!'
								}),
								_react2.default.createElement(_tile2.default, {
									title: 'Call Center',
									description: 'The key to call center and contact center is not to use too many words!',
									descriptionHeading: 'Call Center',
									iconText: 'CC'
								})
							),
							_react2.default.createElement(
								_section2.default,
								{ title: 'Small Tile Section' },
								_react2.default.createElement(_tile2.default, {
									title: 'Journey Builder',
									iconText: 'JB',
									size: 'small'
								}),
								_react2.default.createElement(_tile2.default, {
									title: 'Sales Cloud',
									iconNode: _react2.default.createElement(_icon2.default, { name: 'campaign', category: 'standard', size: 'large' }),
									size: 'small'
								})
							)
						)
					),
					_react2.default.createElement(
						_region2.default,
						{ region: 'secondary', navigation: true },
						_react2.default.createElement(_link2.default, {
							href: 'javascript:void(0);',
							label: 'Home',
							id: 'home-link'
						}),
						_react2.default.createElement(_dropdown2.default, {
							id: 'primaryDropdown',
							assistiveText: 'Context Menu Item 1',
							label: 'Context Menu Item',
							options: dropdownCollection
						}),
						_react2.default.createElement(_link2.default, {
							href: 'javascript:void(0);',
							label: 'Context Menu Item 2',
							active: true
						})
					),
					_react2.default.createElement(
						_region2.default,
						{ region: 'tertiary' },
						_react2.default.createElement(_link2.default, {
							href: 'javascript:void(0);',
							label: 'Actions'
						})
					)
				)
			);
		}
	});

	exports.default = Example;
});