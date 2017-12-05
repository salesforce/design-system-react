define(['exports', 'react', 'create-react-class', '../../../../../components/icon-settings', '../../../../../components/forms/input/inline'], function (exports, _react, _createReactClass, _iconSettings, _inline) {
	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _react2 = _interopRequireDefault(_react);

	var _createReactClass2 = _interopRequireDefault(_createReactClass);

	var _iconSettings2 = _interopRequireDefault(_iconSettings);

	var _inline2 = _interopRequireDefault(_inline);

	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	// `~` is replaced with design-system-react at runtime

	var Example = (0, _createReactClass2.default)({
		displayName: 'InlineEditExample',

		getInitialState: function getInitialState() {
			return {
				value: 'Edit me inline'
			};
		},
		render: function render() {
			return _react2.default.createElement(
				_iconSettings2.default,
				{ iconPath: '/assets/icons' },
				_react2.default.createElement(
					'section',
					{ className: 'slds-grid slds-grid--pull-padded slds-grid--vertical-align-center' },
					_react2.default.createElement(
						'div',
						{ className: 'slds-col--padded' },
						_react2.default.createElement(
							'h1',
							{ className: 'slds-text-title_caps slds-p-vertical--medium' },
							'Base Input with visible label'
						),
						_react2.default.createElement(_inline2.default, {
							id: 'inline-edit-example-1',
							value: this.state.value,
							onChange: this.handleChange
						})
					),
					_react2.default.createElement(
						'div',
						{ className: 'slds-col--padded' },
						_react2.default.createElement(
							'h1',
							{ className: 'slds-text-title_caps slds-p-vertical--medium' },
							'Disabled Base Input'
						),
						_react2.default.createElement(_inline2.default, {
							disabled: true,
							id: 'inline-edit-example-2',
							value: this.state.value,
							onChange: this.handleChange
						})
					)
				)
			);
		},
		handleChange: function handleChange(eventProps) {
			this.setState({ value: eventProps.value });
		}
	});

	exports.default = Example;
});