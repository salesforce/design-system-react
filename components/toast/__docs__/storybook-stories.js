"use strict";

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _react3 = require("@storybook/react");

var _constants = require("../../../utilities/constants");

var _info = require("../__examples__/info");

var _info2 = _interopRequireDefault(_info);

var _success = require("../__examples__/success");

var _success2 = _interopRequireDefault(_success);

var _warning = require("../__examples__/warning");

var _warning2 = _interopRequireDefault(_warning);

var _error = require("../__examples__/error");

var _error2 = _interopRequireDefault(_error);

var _errorWithDetails = require("../__examples__/error-with-details");

var _errorWithDetails2 = _interopRequireDefault(_errorWithDetails);

var _closeToast = require("../__examples__/close-toast");

var _closeToast2 = _interopRequireDefault(_closeToast);

var _durationToast = require("../__examples__/duration-toast");

var _durationToast2 = _interopRequireDefault(_durationToast);

var _customClassName = require("../__examples__/custom-class-name");

var _customClassName2 = _interopRequireDefault(_customClassName);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable react/display-name */
(0, _react3.storiesOf)(_constants.TOAST, module).addDecorator(function (getStory) {
  return _react2.default.createElement("div", {
    className: "slds-p-around--medium"
  }, getStory());
}).add('Info', function () {
  return _react2.default.createElement(_info2.default, null);
}).add('Success', function () {
  return _react2.default.createElement(_success2.default, null);
}).add('Warning', function () {
  return _react2.default.createElement(_warning2.default, null);
}).add('Error', function () {
  return _react2.default.createElement(_error2.default, null);
}).add('Error With Details', function () {
  return _react2.default.createElement(_errorWithDetails2.default, null);
}).add('Close Toast', function () {
  return _react2.default.createElement(_closeToast2.default, null);
}).add('Duration Toast', function () {
  return _react2.default.createElement(_durationToast2.default, null);
}).add('Custom Class Names', function () {
  return _react2.default.createElement(_customClassName2.default, null);
});