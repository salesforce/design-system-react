define(['module', 'react', '@storybook/react', '../../icon-settings', '../../date-picker', '../../../utilities/constants', '../__examples__/default', '../__examples__/iso-weekday', '../__examples__/custom-input', '../__examples__/snapshot-default', '../__examples__/weekday-picker'], function (module, _react, _react3, _iconSettings, _datePicker, _constants, _default, _isoWeekday, _customInput, _snapshotDefault, _weekdayPicker) {
	'use strict';

	var _react2 = _interopRequireDefault(_react);

	var _iconSettings2 = _interopRequireDefault(_iconSettings);

	var _datePicker2 = _interopRequireDefault(_datePicker);

	var _default2 = _interopRequireDefault(_default);

	var _isoWeekday2 = _interopRequireDefault(_isoWeekday);

	var _customInput2 = _interopRequireDefault(_customInput);

	var _snapshotDefault2 = _interopRequireDefault(_snapshotDefault);

	var _weekdayPicker2 = _interopRequireDefault(_weekdayPicker);

	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	(0, _react3.storiesOf)(_constants.DATE_PICKER, module).addDecorator(function (getStory) {
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
	}).add('ISO weekdays', function () {
		return _react2.default.createElement(_isoWeekday2.default, { action: _react3.action });
	}).add('Custom Input', function () {
		return _react2.default.createElement(_customInput2.default, { action: _react3.action });
	}).add('Inline menu', function () {
		return _react2.default.createElement(_datePicker2.default, { menuPosition: 'relative' });
	}).add('DOM Snapshot', function () {
		return _react2.default.createElement(_snapshotDefault2.default, null);
	}).add('Weekday picker', function () {
		return _react2.default.createElement(_weekdayPicker2.default, null);
	});
});