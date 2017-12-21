define(['exports', 'react', 'create-react-class', '../../../../components/icon-settings', '../../../../components/popover', '../../../../components/button'], function (exports, _react, _createReactClass, _iconSettings, _popover, _button) {
	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _react2 = _interopRequireDefault(_react);

	var _createReactClass2 = _interopRequireDefault(_createReactClass);

	var _iconSettings2 = _interopRequireDefault(_iconSettings);

	var _popover2 = _interopRequireDefault(_popover);

	var _button2 = _interopRequireDefault(_button);

	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	var Example = (0, _createReactClass2.default)({
		displayName: 'PopoverExample',

		render: function render() {
			return _react2.default.createElement(
				_iconSettings2.default,
				{ iconPath: '/assets/icons' },
				_react2.default.createElement(
					'div',
					null,
					_react2.default.createElement(
						_popover2.default,
						{
							body: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
							heading: 'Header Title'
						},
						_react2.default.createElement(_button2.default, { label: 'Trigger Popover' })
					)
				)
			);
		}
	}); // `~` is replaced with design-system-react at runtime
	exports.default = Example;
});