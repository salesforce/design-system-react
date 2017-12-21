define(['exports', 'react', 'create-react-class', '../../../../components/icon', '../../../../components/icon-settings'], function (exports, _react, _createReactClass, _icon, _iconSettings) {
	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _react2 = _interopRequireDefault(_react);

	var _createReactClass2 = _interopRequireDefault(_createReactClass);

	var _icon2 = _interopRequireDefault(_icon);

	var _iconSettings2 = _interopRequireDefault(_iconSettings);

	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	var Example = (0, _createReactClass2.default)({
		displayName: 'IconExample',

		render: function render() {
			return _react2.default.createElement(
				_iconSettings2.default,
				{ iconPath: '/assets/icons' },
				_react2.default.createElement(_icon2.default, {
					assistiveText: 'Description of icon',
					category: 'utility',
					colorVariant: 'default',
					name: 'announcement',
					size: 'small',
					title: 'description of icon when needed'
				})
			);
		}
	}); // `~` is replaced with design-system-react at runtime
	exports.default = Example;
});