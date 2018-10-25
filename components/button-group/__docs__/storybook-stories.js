"use strict";

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _react3 = require("@storybook/react");

var _iconSettings = require("../../icon-settings");

var _iconSettings2 = _interopRequireDefault(_iconSettings);

var _constants = require("../../../utilities/constants");

var _moreIcon = require("../__examples__/more-icon");

var _moreIcon2 = _interopRequireDefault(_moreIcon);

var _iconGroup = require("../__examples__/icon-group");

var _iconGroup2 = _interopRequireDefault(_iconGroup);

var _checkbox = require("../__examples__/checkbox");

var _checkbox2 = _interopRequireDefault(_checkbox);

var _checkboxError = require("../__examples__/checkbox-error");

var _checkboxError2 = _interopRequireDefault(_checkboxError);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable react/display-name */
(0, _react3.storiesOf)(_constants.BUTTON_GROUP, module).addDecorator(function (getStory) {
  return _react2.default.createElement("div", {
    className: "slds-p-around--medium"
  }, _react2.default.createElement(_iconSettings2.default, {
    iconPath: "/assets/icons"
  }, getStory()));
}).add('More Icon', function () {
  return _react2.default.createElement(_moreIcon2.default, null);
}).add('Icon Group', function () {
  return _react2.default.createElement(_iconGroup2.default, null);
}).add('Checkbox', function () {
  return _react2.default.createElement(_checkbox2.default, null);
}).add('Checkbox Error', function () {
  return _react2.default.createElement(_checkboxError2.default, null);
});