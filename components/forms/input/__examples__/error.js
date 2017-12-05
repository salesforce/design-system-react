define(['exports', 'react', 'create-react-class', '../../../../../components/icon-settings', '../../../../../components/forms/input', '../../../../../components/icon/input-icon'], function (exports, _react, _createReactClass, _iconSettings, _input, _inputIcon) {
	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _react2 = _interopRequireDefault(_react);

	var _createReactClass2 = _interopRequireDefault(_createReactClass);

	var _iconSettings2 = _interopRequireDefault(_iconSettings);

	var _input2 = _interopRequireDefault(_input);

	var _inputIcon2 = _interopRequireDefault(_inputIcon);

	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	// `~` is replaced with design-system-react at runtime

	var Example = (0, _createReactClass2.default)({
		displayName: 'ErrorInputExample',

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
						_react2.default.createElement(_input2.default, {
							id: 'unique-id-4',
							label: 'Input Label',
							required: true,
							errorText: 'Error Message',
							placeholder: 'Placeholder Text'
						})
					),
					_react2.default.createElement(
						'div',
						{ className: 'slds-col--padded' },
						_react2.default.createElement(_input2.default, {
							iconLeft: _react2.default.createElement(_inputIcon2.default, {
								assistiveText: 'Search',
								name: 'warning',
								category: 'utility',
								color: 'warning',
								onClick: function onClick() {
									console.log('Icon Clicked');
								}
							}),
							id: 'unique-id-4',
							label: 'Input Label',
							required: true,
							errorText: 'Error Message',
							placeholder: 'Placeholder Text'
						})
					)
				)
			);
		}
	}); // `~` is replaced with design-system-react at runtime
	exports.default = Example;
});