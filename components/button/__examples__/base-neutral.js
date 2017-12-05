define(['exports', 'react', 'create-react-class', '../../../../components/icon-settings', '../../../../components/button'], function (exports, _react, _createReactClass, _iconSettings, _button) {
	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _react2 = _interopRequireDefault(_react);

	var _createReactClass2 = _interopRequireDefault(_createReactClass);

	var _iconSettings2 = _interopRequireDefault(_iconSettings);

	var _button2 = _interopRequireDefault(_button);

	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	// `~` is replaced with design-system-react at runtime

	var Example = (0, _createReactClass2.default)({
		displayName: 'ButtonExample',

		render: function render() {
			return _react2.default.createElement(
				_iconSettings2.default,
				{ iconPath: '/assets/icons' },
				_react2.default.createElement(
					'div',
					{ className: '-x-small-buttons--horizontal' },
					_react2.default.createElement(_button2.default, {
						label: 'Base',
						onClick: function onClick() {
							console.log('Base Button e.target:', e.target);
						},
						variant: 'base'
					}),
					_react2.default.createElement(_button2.default, {
						label: 'Neutral'
					}),
					_react2.default.createElement(_button2.default, {
						iconName: 'download',
						iconPosition: 'left',
						label: 'Neutral Icon'
					}),
					_react2.default.createElement(_button2.default, {
						label: 'Responsive',
						responsive: true
					})
				)
			);
		}
	});

	exports.default = Example;
});