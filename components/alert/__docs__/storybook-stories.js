"use strict";

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _react3 = require("@storybook/react");

var _constants = require("../../../utilities/constants");

var _info = require("../__examples__/info");

var _info2 = _interopRequireDefault(_info);

var _warning = require("../__examples__/warning");

var _warning2 = _interopRequireDefault(_warning);

var _error = require("../__examples__/error");

var _error2 = _interopRequireDefault(_error);

var _offline = require("../__examples__/offline");

var _offline2 = _interopRequireDefault(_offline);

var _dismissable = require("../__examples__/dismissable");

var _dismissable2 = _interopRequireDefault(_dismissable);

var _closeAlert = require("../__examples__/close-alert");

var _closeAlert2 = _interopRequireDefault(_closeAlert);

var _customClassName = require("../__examples__/custom-class-name");

var _customClassName2 = _interopRequireDefault(_customClassName);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable react/display-name */
(0, _react3.storiesOf)(_constants.ALERT, module).addDecorator(function (getStory) {
  return _react2.default.createElement("div", {
    className: "slds-p-around--medium"
  }, getStory());
}).add('Info', function () {
  return _react2.default.createElement(_info2.default, null);
}).add('Warning', function () {
  return _react2.default.createElement(_warning2.default, null);
}).add('Error', function () {
  return _react2.default.createElement(_error2.default, null);
}).add('Offline', function () {
  return _react2.default.createElement(_offline2.default, null);
}).add('Dismissable', function () {
  return _react2.default.createElement(_dismissable2.default, null);
}).add('Close alert', function () {
  return _react2.default.createElement(_closeAlert2.default, null);
}).add('Custom Class Names', function () {
  return _react2.default.createElement(_customClassName2.default, null);
});