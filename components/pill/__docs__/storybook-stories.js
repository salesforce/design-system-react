define(['module', 'react', '@storybook/react', '@storybook/addon-actions', '../../../../utilities/constants', '../../../../components/icon-settings', '../__examples__/base', '../__examples__/icon', '../__examples__/container', '../__examples__/listbox-bare', '../__examples__/listbox', '../__examples__/listbox-icon', '../__examples__/listbox-avatar'], function (module, _react, _react3, _addonActions, _constants, _iconSettings, _base, _icon, _container, _listboxBare, _listbox, _listboxIcon, _listboxAvatar) {
	'use strict';

	var _react2 = _interopRequireDefault(_react);

	var _iconSettings2 = _interopRequireDefault(_iconSettings);

	var _base2 = _interopRequireDefault(_base);

	var _icon2 = _interopRequireDefault(_icon);

	var _container2 = _interopRequireDefault(_container);

	var _listboxBare2 = _interopRequireDefault(_listboxBare);

	var _listbox2 = _interopRequireDefault(_listbox);

	var _listboxIcon2 = _interopRequireDefault(_listboxIcon);

	var _listboxAvatar2 = _interopRequireDefault(_listboxAvatar);

	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	(0, _react3.storiesOf)(_constants.PILL, module).addDecorator(function (getStory) {
		return _react2.default.createElement(
			'div',
			{ className: 'slds-p-around--medium' },
			_react2.default.createElement(
				_iconSettings2.default,
				{ iconPath: '/assets/icons' },
				getStory()
			)
		);
	}).add('Linked, Unlinked, Truncated', function () {
		return _react2.default.createElement(_base2.default, { action: _addonActions.action });
	}).add('Icon, Avatar, Error', function () {
		return _react2.default.createElement(_icon2.default, { action: _addonActions.action });
	}).add('Bare', function () {
		return _react2.default.createElement(_listboxBare2.default, { action: _addonActions.action });
	}).add('Pill Container', function () {
		return _react2.default.createElement(_container2.default, { action: _addonActions.action });
	}).add('Listbox Of Pill Options', function () {
		return _react2.default.createElement(_listbox2.default, { action: _addonActions.action });
	}).add('Listbox Of Pill Options With Icon', function () {
		return _react2.default.createElement(_listboxIcon2.default, { action: _addonActions.action });
	}).add('Listbox Of Pill Options With Avatar', function () {
		return _react2.default.createElement(_listboxAvatar2.default, { action: _addonActions.action });
	});
});