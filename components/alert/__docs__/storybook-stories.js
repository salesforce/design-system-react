"use strict";

var _react = _interopRequireDefault(require("react"));

var _react2 = require("@storybook/react");

var _constants = require("../../../utilities/constants");

var _info = _interopRequireDefault(require("../__examples__/info"));

var _warning = _interopRequireDefault(require("../__examples__/warning"));

var _error = _interopRequireDefault(require("../__examples__/error"));

var _offline = _interopRequireDefault(require("../__examples__/offline"));

var _dismissable = _interopRequireDefault(require("../__examples__/dismissable"));

var _closeAlert = _interopRequireDefault(require("../__examples__/close-alert"));

var _customClassName = _interopRequireDefault(require("../__examples__/custom-class-name"));

var _customStyle = _interopRequireDefault(require("../__examples__/custom-style"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable react/display-name */
(0, _react2.storiesOf)(_constants.ALERT, module).addDecorator(function (getStory) {
  return _react.default.createElement("div", {
    className: "slds-p-around_medium slds-p-top_xx-large"
  }, getStory());
}).add('Info', function () {
  return _react.default.createElement(_info.default, null);
}).add('Warning', function () {
  return _react.default.createElement(_warning.default, null);
}).add('Error', function () {
  return _react.default.createElement(_error.default, null);
}).add('Offline', function () {
  return _react.default.createElement(_offline.default, null);
}).add('Dismissable', function () {
  return _react.default.createElement(_dismissable.default, null);
}).add('Close alert', function () {
  return _react.default.createElement(_closeAlert.default, null);
}).add('Custom Class Names', function () {
  return _react.default.createElement(_customClassName.default, null);
}).add('Custom Styles', function () {
  return _react.default.createElement(_customStyle.default, null);
});