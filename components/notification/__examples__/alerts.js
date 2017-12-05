define(['exports', 'react', 'create-react-class', '../../../../components/icon-settings', '../../../../components/notification', '../../../../components/button'], function (exports, _react, _createReactClass, _iconSettings, _notification, _button) {
	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _react2 = _interopRequireDefault(_react);

	var _createReactClass2 = _interopRequireDefault(_createReactClass);

	var _iconSettings2 = _interopRequireDefault(_iconSettings);

	var _notification2 = _interopRequireDefault(_notification);

	var _button2 = _interopRequireDefault(_button);

	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	function _defineProperty(obj, key, value) {
		if (key in obj) {
			Object.defineProperty(obj, key, {
				value: value,
				enumerable: true,
				configurable: true,
				writable: true
			});
		} else {
			obj[key] = value;
		}

		return obj;
	}

	var Example = (0, _createReactClass2.default)({
		displayName: 'NotificationExample',

		getInitialState: function getInitialState() {
			return {
				baseIsOpen: false,
				successIsOpen: false,
				errorIsOpen: false,
				offlineIsOpen: false
			};
		},
		toggleOpen: function toggleOpen(event, theme) {
			this.setState(_defineProperty({}, theme + 'IsOpen', !this.state[theme + 'IsOpen']));
		},
		render: function render() {
			var _this = this;

			return _react2.default.createElement(
				_iconSettings2.default,
				{ iconPath: '/assets/icons' },
				_react2.default.createElement(
					'div',
					null,
					_react2.default.createElement(_button2.default, {
						label: 'Open base alert',
						onClick: function onClick(event) {
							_this.toggleOpen(event, 'base');
						}
					}),
					_react2.default.createElement(_notification2.default, {
						content: ['Base System Alert'],
						isOpen: this.state.baseIsOpen,
						onDismiss: function onDismiss(event) {
							_this.toggleOpen(event, 'base');
						},
						texture: true,
						variant: 'alert'
					}),
					_react2.default.createElement('span', null),
					_react2.default.createElement(_button2.default, {
						label: 'Open success alert',
						onClick: function onClick(event) {
							_this.toggleOpen(event, 'success');
						}
					}),
					_react2.default.createElement(_notification2.default, {
						content: [_react2.default.createElement(
							'span',
							{ key: 'maintenance' },
							'Scheduled Maintenance Notification: Sunday March 15, 8:00 AM\u201310:00 PST ',
							_react2.default.createElement(
								'a',
								{ href: 'javascript:void(0);' },
								'More Information'
							)
						)],
						iconName: 'notification',
						isOpen: this.state.successIsOpen,
						onDismiss: function onDismiss(event) {
							_this.toggleOpen(event, 'success');
						},
						texture: true,
						theme: 'success',
						variant: 'alert'
					}),
					_react2.default.createElement('span', null),
					_react2.default.createElement(_button2.default, {
						label: 'Open error alert',
						onClick: function onClick(event) {
							_this.toggleOpen(event, 'error');
						}
					}),
					_react2.default.createElement(_notification2.default, {
						content: [_react2.default.createElement(
							'span',
							{ key: 'browser' },
							'Your browser is currently not supported. Your Salesforce may be degraded. ',
							_react2.default.createElement(
								'a',
								{ href: 'javascript:void(0);' },
								'More Information'
							)
						)],
						iconName: 'ban',
						isOpen: this.state.errorIsOpen,
						onDismiss: function onDismiss(event) {
							_this.toggleOpen(event, 'error');
						},
						texture: true,
						theme: 'error',
						variant: 'alert'
					}),
					_react2.default.createElement('span', null),
					_react2.default.createElement(_button2.default, {
						label: 'Open offline alert',
						onClick: function onClick(event) {
							_this.toggleOpen(event, 'offline');
						}
					}),
					_react2.default.createElement(_notification2.default, {
						content: [_react2.default.createElement(
							'span',
							{ key: 'offline' },
							'You are in offline mode ',
							_react2.default.createElement(
								'a',
								{ href: 'javascript:void(0);' },
								'More Information'
							)
						)],
						iconName: 'offline',
						isOpen: this.state.offlineIsOpen,
						onDismiss: function onDismiss(event) {
							_this.toggleOpen(event, 'offline');
						},
						texture: true,
						theme: 'offline',
						variant: 'alert'
					})
				)
			);
		}
	});

	exports.default = Example;
});