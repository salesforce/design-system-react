"use strict";

var _react = _interopRequireDefault(require("react"));

var _react2 = require("@storybook/react");

var _addonActions = require("@storybook/addon-actions");

var _iconSettings = _interopRequireDefault(require("../../icon-settings"));

var _constants = require("../../../utilities/constants");

var _timePicker = _interopRequireDefault(require("../../time-picker"));

var _default = _interopRequireDefault(require("../__examples__/default"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable indent */
var getTimepicker = function getTimepicker(props) {
  return _react.default.createElement(_timePicker.default, props);
};

(0, _react2.storiesOf)(_constants.TIME_PICKER, module).addDecorator(function (getStory) {
  return _react.default.createElement("div", {
    className: "slds-p-around_medium"
  }, _react.default.createElement(_iconSettings.default, {
    iconPath: "/assets/icons"
  }, getStory()));
}).add('Base', function () {
  return getTimepicker({
    label: 'Time',
    required: true,
    stepInMinutes: 30,
    onDateChange: (0, _addonActions.action)('onDateChange')
  });
}).add('Docs site Default', function () {
  return _react.default.createElement(_default.default, null);
});