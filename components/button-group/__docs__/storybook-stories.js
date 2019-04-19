"use strict";

var _react = _interopRequireDefault(require("react"));

var _react2 = require("@storybook/react");

var _iconSettings = _interopRequireDefault(require("../../icon-settings"));

var _constants = require("../../../utilities/constants");

var _moreIcon = _interopRequireDefault(require("../__examples__/more-icon"));

var _iconGroup = _interopRequireDefault(require("../__examples__/icon-group"));

var _checkbox = _interopRequireDefault(require("../__examples__/checkbox"));

var _checkboxError = _interopRequireDefault(require("../__examples__/checkbox-error"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable react/display-name */
(0, _react2.storiesOf)(_constants.BUTTON_GROUP, module).addDecorator(function (getStory) {
  return _react.default.createElement("div", {
    className: "slds-p-around_medium"
  }, _react.default.createElement(_iconSettings.default, {
    iconPath: "/assets/icons"
  }, getStory()));
}).add('More Icon', function () {
  return _react.default.createElement(_moreIcon.default, null);
}).add('Icon Group', function () {
  return _react.default.createElement(_iconGroup.default, null);
}).add('Checkbox', function () {
  return _react.default.createElement(_checkbox.default, null);
}).add('Checkbox Error', function () {
  return _react.default.createElement(_checkboxError.default, null);
});