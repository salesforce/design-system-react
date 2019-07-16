"use strict";

var _react = _interopRequireDefault(require("react"));

var _react2 = require("@storybook/react");

var _addonActions = require("@storybook/addon-actions");

var _iconSettings = _interopRequireDefault(require("../../icon-settings"));

var _datePicker = _interopRequireDefault(require("../../date-picker"));

var _constants = require("../../../utilities/constants");

var _default = _interopRequireDefault(require("../__examples__/default"));

var _isoWeekday = _interopRequireDefault(require("../__examples__/iso-weekday"));

var _customInput = _interopRequireDefault(require("../__examples__/custom-input"));

var _snapshotDefault = _interopRequireDefault(require("../__examples__/snapshot-default"));

var _weekdayPicker = _interopRequireDefault(require("../__examples__/weekday-picker"));

var _UNSAFE_direction = _interopRequireDefault(require("../../utilities/UNSAFE_direction"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// eslint-disable-next-line camelcase
var makeRtl = function makeRtl(component) {
  return (// eslint-disable-next-line
    _react.default.createElement(_UNSAFE_direction.default.Provider, {
      value: "rtl"
    }, _react.default.createElement("div", {
      dir: "rtl"
    }, component))
  );
};

(0, _react2.storiesOf)(_constants.DATE_PICKER, module).addDecorator(function (getStory) {
  return _react.default.createElement("div", {
    className: "slds-p-around_medium"
  }, _react.default.createElement(_iconSettings.default, {
    iconPath: "/assets/icons"
  }, getStory()));
}).add('Default', function () {
  return _react.default.createElement(_default.default, {
    action: _addonActions.action
  });
}).add('Default - Right to Left (RTL)', function () {
  return makeRtl(_react.default.createElement(_default.default, {
    action: _addonActions.action
  }));
}).add('ISO weekdays', function () {
  return _react.default.createElement(_isoWeekday.default, {
    action: _addonActions.action
  });
}).add('Custom Input', function () {
  return _react.default.createElement(_customInput.default, {
    action: _addonActions.action
  });
}).add('Inline menu', function () {
  return _react.default.createElement(_datePicker.default, {
    labels: {
      label: 'Date'
    },
    menuPosition: "relative"
  });
}).add('DOM Snapshot', function () {
  return _react.default.createElement(_snapshotDefault.default, null);
}).add('Weekday picker', function () {
  return _react.default.createElement(_weekdayPicker.default, null);
});