define(['exports', 'react', 'create-react-class', '../../../../components/icon-settings', '../../../../components/menu-picklist'], function (exports, _react, _createReactClass, _iconSettings, _menuPicklist) {
	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _react2 = _interopRequireDefault(_react);

	var _createReactClass2 = _interopRequireDefault(_createReactClass);

	var _iconSettings2 = _interopRequireDefault(_iconSettings);

	var _menuPicklist2 = _interopRequireDefault(_menuPicklist);

	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	/* eslint-disable no-console, react/prop-types */
	var Example = (0, _createReactClass2.default)({
		displayName: 'MenuPicklistExample',

		render: function render() {
			return _react2.default.createElement(
				_iconSettings2.default,
				{ iconPath: '/assets/icons' },
				_react2.default.createElement(_menuPicklist2.default, {
					id: 'sample-menu-picklist',
					isInline: true,
					label: 'Contacts',
					onSelect: function onSelect(value) {
						console.log('selected: ', value);
					},
					options: [{ label: 'Option A', value: 'A0' }, { label: 'Option B', value: 'B0' }, { label: 'Option C', value: 'C0' }, { label: 'Option D', value: 'D0' }, { label: 'Option E', value: 'E0' }, { label: 'Option FGHIJKLMNOPQRSTUVWXYZ', value: 'F0' }],
					placeholder: 'Select a contact',
					value: 'C0'
				})
			);
		}
	});

	// Higher Order Components such as `react-onclickoutside` use the DOM and Jest snapshot testing must be DOMless
	exports.default = Example;
});