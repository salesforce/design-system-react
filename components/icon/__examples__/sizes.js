define(['exports', 'react', 'create-react-class', '../../../../components/icon-settings', '../../../../components/icon'], function (exports, _react, _createReactClass, _iconSettings, _icon) {
	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _react2 = _interopRequireDefault(_react);

	var _createReactClass2 = _interopRequireDefault(_createReactClass);

	var _iconSettings2 = _interopRequireDefault(_iconSettings);

	var _icon2 = _interopRequireDefault(_icon);

	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	// `~` is replaced with design-system-react at runtime

	var Example = (0, _createReactClass2.default)({
		displayName: 'IconExample',

		render: function render() {
			return _react2.default.createElement(
				_iconSettings2.default,
				{ iconPath: '/assets/icons' },
				_react2.default.createElement(
					'div',
					{ className: 'slds-grid slds-grid--pull-padded slds-grid--vertical-align-center' },
					_react2.default.createElement(
						'div',
						{ className: 'slds-col--padded' },
						_react2.default.createElement(_icon2.default, {
							assistiveText: 'Warning',
							category: 'utility',
							color: 'warning',
							name: 'warning',
							size: 'x-small'
						})
					),
					_react2.default.createElement(
						'div',
						{ className: 'slds-col--padded' },
						_react2.default.createElement(_icon2.default, {
							assistiveText: 'Case',
							category: 'standard',
							name: 'case',
							size: 'small'
						})
					),
					_react2.default.createElement(
						'div',
						{ className: 'slds-col--padded' },
						_react2.default.createElement(_icon2.default, {
							assistiveText: 'Case',
							category: 'standard',
							name: 'case',
							size: 'medium'
						})
					),
					_react2.default.createElement(
						'div',
						{ className: 'slds-col--padded' },
						_react2.default.createElement(_icon2.default, {
							assistiveText: 'Case',
							category: 'standard',
							name: 'case',
							size: 'large'
						})
					)
				)
			);
		}
	});

	exports.default = Example;
});