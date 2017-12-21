define(['exports', 'react', 'create-react-class', '../../../../../components/icon-settings', '../../../../../components/forms/textarea'], function (exports, _react, _createReactClass, _iconSettings, _textarea) {
	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _react2 = _interopRequireDefault(_react);

	var _createReactClass2 = _interopRequireDefault(_createReactClass);

	var _iconSettings2 = _interopRequireDefault(_iconSettings);

	var _textarea2 = _interopRequireDefault(_textarea);

	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	// `~` is replaced with design-system-react at runtime

	var Example = (0, _createReactClass2.default)({
		displayName: 'TextareaExample',

		render: function render() {
			return _react2.default.createElement(
				_iconSettings2.default,
				{ iconPath: '/assets/icons' },
				_react2.default.createElement(_textarea2.default, {
					'aria-describedby': 'error-1',
					name: 'required-textarea-error',
					label: 'Textarea Label',
					required: true,
					errorText: 'Error Message',
					placeholder: 'Placeholder Text'
				})
			);
		}
	});

	exports.default = Example;
});