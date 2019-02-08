"use strict";

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _react3 = require("@storybook/react");

var _addonActions = require("@storybook/addon-actions");

var _iconSettings = require("../../icon-settings");

var _iconSettings2 = _interopRequireDefault(_iconSettings);

var _constants = require("../../../utilities/constants");

var _timePicker = require("../../time-picker");

var _timePicker2 = _interopRequireDefault(_timePicker);

var _default = require("../__examples__/default");

var _default2 = _interopRequireDefault(_default);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable indent */
var getTimepicker = function getTimepicker(props) {
  return _react2.default.createElement(_timePicker2.default, props);
};

(0, _react3.storiesOf)(_constants.TIME_PICKER, module).addDecorator(function (getStory) {
  return _react2.default.createElement("div", {
    className: "slds-p-around_medium"
  }, _react2.default.createElement(_iconSettings2.default, {
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
  return _react2.default.createElement(_default2.default, null);
});