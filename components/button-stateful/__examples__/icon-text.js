define(['exports', 'react', 'create-react-class', '../../../../components/icon-settings', '../../../../components/button-stateful'], function (exports, _react, _createReactClass, _iconSettings, _buttonStateful) {
	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _react2 = _interopRequireDefault(_react);

	var _createReactClass2 = _interopRequireDefault(_createReactClass);

	var _iconSettings2 = _interopRequireDefault(_iconSettings);

	var _buttonStateful2 = _interopRequireDefault(_buttonStateful);

	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	// `~` is replaced with design-system-react at runtime

	var Example = (0, _createReactClass2.default)({
		displayName: 'ButtonStatefulExample',

		render: function render() {
			return _react2.default.createElement(
				_iconSettings2.default,
				{ iconPath: '/assets/icons' },
				_react2.default.createElement(
					'div',
					{ className: 'slds-x-small-buttons--horizontal' },
					_react2.default.createElement(_buttonStateful2.default, null),
					_react2.default.createElement(
						'div',
						{ style: { backgroundColor: '#16325c', padding: '10px', display: 'inline-block' }, className: 'slds-m-horizontal--small' },
						_react2.default.createElement(_buttonStateful2.default, {
							inverse: true,
							stateOne: { iconName: 'add', label: 'Join' },
							stateTwo: { iconName: 'check', label: 'Member' },
							stateThree: { iconName: 'close', label: 'Leave' }
						})
					)
				)
			);
		}
	});

	exports.default = Example;
});