"use strict";

var _react = _interopRequireDefault(require("react"));

var _react2 = require("@storybook/react");

var _addonActions = require("@storybook/addon-actions");

var _constants = require("../../../utilities/constants");

var _iconSettings = _interopRequireDefault(require("../../icon-settings"));

var _base = _interopRequireDefault(require("../__examples__/base"));

var _icons = _interopRequireDefault(require("../__examples__/icons"));

var _avatars = _interopRequireDefault(require("../__examples__/avatars"));

var _bare = _interopRequireDefault(require("../__examples__/bare"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _react2.storiesOf)(_constants.PILL_CONTAINER, module).addDecorator(function (getStory) {
  return _react.default.createElement("div", {
    className: "slds-p-around_medium"
  }, _react.default.createElement(_iconSettings.default, {
    iconPath: "/assets/icons"
  }, getStory()));
}).add('Base Pill Container', function () {
  return _react.default.createElement(_base.default, {
    action: _addonActions.action
  });
}).add('Pill Container With Icons', function () {
  return _react.default.createElement(_icons.default, {
    action: _addonActions.action
  });
}).add('Pill Container With Avatars', function () {
  return _react.default.createElement(_avatars.default, {
    action: _addonActions.action
  });
}).add('Bare Pill Container', function () {
  return _react.default.createElement(_bare.default, {
    action: _addonActions.action
  });
});