"use strict";

var _react = _interopRequireDefault(require("react"));

var _react2 = require("@storybook/react");

var _constants = require("../../../utilities/constants");

var _info = _interopRequireDefault(require("../__examples__/info"));

var _success = _interopRequireDefault(require("../__examples__/success"));

var _warning = _interopRequireDefault(require("../__examples__/warning"));

var _error = _interopRequireDefault(require("../__examples__/error"));

var _errorWithDetails = _interopRequireDefault(require("../__examples__/error-with-details"));

var _closeToast = _interopRequireDefault(require("../__examples__/close-toast"));

var _durationToast = _interopRequireDefault(require("../__examples__/duration-toast"));

var _customClassName = _interopRequireDefault(require("../__examples__/custom-class-name"));

var _customStyle = _interopRequireDefault(require("../__examples__/custom-style"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable react/display-name */
(0, _react2.storiesOf)(_constants.TOAST, module).addDecorator(function (getStory) {
  return _react.default.createElement("div", {
    className: "slds-p-around_medium"
  }, getStory());
}).add('Info', function () {
  return _react.default.createElement(_info.default, null);
}).add('Success', function () {
  return _react.default.createElement(_success.default, null);
}).add('Warning', function () {
  return _react.default.createElement(_warning.default, null);
}).add('Error', function () {
  return _react.default.createElement(_error.default, null);
}).add('Error With Details', function () {
  return _react.default.createElement(_errorWithDetails.default, null);
}).add('Close Toast', function () {
  return _react.default.createElement(_closeToast.default, null);
}).add('Duration Toast', function () {
  return _react.default.createElement(_durationToast.default, null);
}).add('Custom Class Names', function () {
  return _react.default.createElement(_customClassName.default, null);
}).add('Custom Style', function () {
  return _react.default.createElement(_customStyle.default, null);
});