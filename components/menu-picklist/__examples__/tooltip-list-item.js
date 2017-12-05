define(['exports', 'react', 'create-react-class', '../../../../components/icon-settings', '../../../../components/menu-picklist', '../../../../components/popover-tooltip'], function (exports, _react, _createReactClass, _iconSettings, _menuPicklist, _popoverTooltip) {
	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _react2 = _interopRequireDefault(_react);

	var _createReactClass2 = _interopRequireDefault(_createReactClass);

	var _iconSettings2 = _interopRequireDefault(_iconSettings);

	var _menuPicklist2 = _interopRequireDefault(_menuPicklist);

	var _popoverTooltip2 = _interopRequireDefault(_popoverTooltip);

	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	var ListItemRenderer = function ListItemRenderer(props) {
		return _react2.default.createElement(
			_popoverTooltip2.default,
			{
				openByDefault: props.isHighlighted,
				align: 'bottom left',
				content: props.label + ' tooltip on bottom left'
			},
			_react2.default.createElement(
				'p',
				{ className: 'slds-truncate' },
				props.label,
				' (Hover for tooltip)'
			)
		);
	}; // `~` is replaced with design-system-react at runtime


	var Example = (0, _createReactClass2.default)({
		displayName: 'PicklistExample',

		render: function render() {
			return _react2.default.createElement(
				_iconSettings2.default,
				{ iconPath: '/assets/icons' },
				_react2.default.createElement(_menuPicklist2.default, {
					listItemRenderer: ListItemRenderer,
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

	exports.default = Example;
});