define(['exports', 'react', 'create-react-class', '../../../../components/button-group', '../../../../components/button-stateful', '../../../../components/menu-dropdown', '../../../../components/icon-settings'], function (exports, _react, _createReactClass, _buttonGroup, _buttonStateful, _menuDropdown, _iconSettings) {
	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _react2 = _interopRequireDefault(_react);

	var _createReactClass2 = _interopRequireDefault(_createReactClass);

	var _buttonGroup2 = _interopRequireDefault(_buttonGroup);

	var _buttonStateful2 = _interopRequireDefault(_buttonStateful);

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
					_react2.default.createElement(_buttonStateful2.default, {
						assistiveText: 'Show Chart',
						buttonVariant: 'icon',
						iconName: 'chart',
						iconVariant: 'border',
						variant: 'icon'
					}),
					_react2.default.createElement(_buttonStateful2.default, {
						assistiveText: 'Filter',
						iconName: 'filter',
						iconVariant: 'border',
						variant: 'icon'
					}),
					_react2.default.createElement(_menuDropdown2.default, {
						assistiveText: 'Sort',
						checkmark: true,
						iconName: 'sort',
						iconVariant: 'more',
						id: 'icon-dropdown-example',
						onSelect: function onSelect() {
							console.log(item.label, 'selected');
						},
						openOn: 'click',
						options: [{ label: 'Sort ascending', value: 'A0' }, { label: 'Sort descending', value: 'B0' }],
						value: 'A0',
						variant: 'icon'
					})
				)
			);
		}
	});

	exports.default = Example;
});