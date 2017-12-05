define(['exports', 'react', 'create-react-class', '../../../../components/icon', '../../../../components/icon-settings', '@salesforce-ux/design-system/assets/icons/action-sprite/svg/symbols.svg', '@salesforce-ux/design-system/assets/icons/custom-sprite/svg/symbols.svg', '@salesforce-ux/design-system/assets/icons/utility-sprite/svg/symbols.svg', '@salesforce-ux/design-system/assets/icons/standard-sprite/svg/symbols.svg', '@salesforce-ux/design-system/assets/icons/doctype-sprite/svg/symbols.svg'], function (exports, _react, _createReactClass, _icon, _iconSettings, _symbols, _symbols3, _symbols5, _symbols7, _symbols9) {
	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _react2 = _interopRequireDefault(_react);

	var _createReactClass2 = _interopRequireDefault(_createReactClass);

	var _icon2 = _interopRequireDefault(_icon);

	var _iconSettings2 = _interopRequireDefault(_iconSettings);

	var _symbols2 = _interopRequireDefault(_symbols);

	var _symbols4 = _interopRequireDefault(_symbols3);

	var _symbols6 = _interopRequireDefault(_symbols5);

	var _symbols8 = _interopRequireDefault(_symbols7);

	var _symbols10 = _interopRequireDefault(_symbols9);

	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	// `~` is replaced with design-system-react at runtime
	var Example = (0, _createReactClass2.default)({
		displayName: 'IconSettingsExample',

		render: function render() {
			return _react2.default.createElement(
				_iconSettings2.default,
				{ standardSprite: _symbols8.default, utilitySprite: _symbols6.default, actionSprite: _symbols2.default, doctypeSprite: _symbols10.default, customSprite: _symbols4.default },
				_react2.default.createElement(
					'div',
					{ className: 'slds-grid slds-grid--pull-padded slds-grid--vertical-align-center' },
					_react2.default.createElement(
						'div',
						{ className: 'slds-col--padded' },
						_react2.default.createElement(_icon2.default, {
							assistiveText: 'Account',
							category: 'standard',
							name: 'account',
							size: 'small'
						})
					),
					_react2.default.createElement(
						'div',
						{ className: 'slds-col--padded' },
						_react2.default.createElement(_icon2.default, {
							assistiveText: 'Announcement',
							category: 'utility',
							name: 'announcement',
							size: 'small'
						})
					),
					_react2.default.createElement(
						'div',
						{ className: 'slds-col--padded' },
						_react2.default.createElement(_icon2.default, {
							assistiveText: 'Description',
							category: 'action',
							name: 'description',
							size: 'small'
						})
					),
					_react2.default.createElement(
						'div',
						{ className: 'slds-col--padded' },
						_react2.default.createElement(_icon2.default, {
							assistiveText: 'XML',
							category: 'doctype',
							name: 'xml',
							size: 'small'
						})
					),
					_react2.default.createElement(
						'div',
						{ className: 'slds-col--padded' },
						_react2.default.createElement(_icon2.default, {
							assistiveText: 'custom5',
							category: 'custom',
							name: 'custom5',
							size: 'small'
						})
					)
				)
			);
		}
	});

	exports.default = Example;
});