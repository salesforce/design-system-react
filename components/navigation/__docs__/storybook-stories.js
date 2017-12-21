define(['module', 'react', '@storybook/react', '../../icon-settings', '../../../utilities/constants', '../__examples__/default', '../__examples__/shade', '../__examples__/snapshot-default'], function (module, _react, _react3, _iconSettings, _constants, _default, _shade, _snapshotDefault) {
	'use strict';

	var _react2 = _interopRequireDefault(_react);

	var _iconSettings2 = _interopRequireDefault(_iconSettings);

	var _default2 = _interopRequireDefault(_default);

	var _shade2 = _interopRequireDefault(_shade);

	var _snapshotDefault2 = _interopRequireDefault(_snapshotDefault);

	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	(0, _react3.storiesOf)(_constants.NAVIGATION, module).addDecorator(function (getStory) {
		return _react2.default.createElement(
			'div',
			{ className: 'slds-p-around--medium' },
			_react2.default.createElement(
				_iconSettings2.default,
				{ iconPath: '/assets/icons' },
				getStory()
			)
		);
	}).add('Default', function () {
		return _react2.default.createElement(_default2.default, { action: _react3.action });
	}).add('Inverse', function () {
		return _react2.default.createElement(_shade2.default, { action: _react3.action });
	}).add('DOM Snapshot', function () {
		return _react2.default.createElement(_snapshotDefault2.default, null);
	});
});