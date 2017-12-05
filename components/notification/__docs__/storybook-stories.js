define(['module', 'react', '@storybook/react', '../../icon-settings', '../../../utilities/constants', '../../notification'], function (module, _react, _react3, _iconSettings, _constants, _notification) {
	'use strict';

	var _react2 = _interopRequireDefault(_react);

	var _iconSettings2 = _interopRequireDefault(_iconSettings);

	var _notification2 = _interopRequireDefault(_notification);

	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	(0, _react3.storiesOf)(_constants.NOTIFICATION, module).addDecorator(function (getStory) {
		return _react2.default.createElement(
			'div',
			{ className: 'slds-p-around--medium' },
			_react2.default.createElement(
				_iconSettings2.default,
				{ iconPath: '/assets/icons' },
				getStory()
			)
		);
	}).add('Base: Alert', function () {
		return _react2.default.createElement(_notification2.default, {
			content: ['Your new contact ', _react2.default.createElement(
				'a',
				{ href: 'javascript:void(0);', key: '0123' },
				'Sara Smith'
			), ' was successfully created.'],
			iconName: 'notification',
			isOpen: true,
			onDismiss: function onDismiss() {
				console.log('dismiss alert');
			},
			texture: true,
			theme: 'success',
			variant: 'alert'
		});
	}).add('Base: Toast', function () {
		return _react2.default.createElement(_notification2.default, {
			content: 'toast notification',
			inverse: true,
			isOpen: true,
			name: 'account',
			onDismiss: function onDismiss() {
				console.log('dismiss toast');
			},
			theme: 'error',
			variant: 'toast'
		});
	});
});