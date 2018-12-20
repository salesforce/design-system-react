"use strict";

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _react3 = require("@storybook/react");

var _addonActions = require("@storybook/addon-actions");

var _constants = require("../../../utilities/constants");

var _iconSettings = require("../../icon-settings");

var _iconSettings2 = _interopRequireDefault(_iconSettings);

var _base = require("../__examples__/base");

var _base2 = _interopRequireDefault(_base);

var _icons = require("../__examples__/icons");

var _icons2 = _interopRequireDefault(_icons);

var _avatars = require("../__examples__/avatars");

var _avatars2 = _interopRequireDefault(_avatars);

var _bare = require("../__examples__/bare");

var _bare2 = _interopRequireDefault(_bare);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _react3.storiesOf)(_constants.PILL_CONTAINER, module).addDecorator(function (getStory) {
  return _react2.default.createElement("div", {
    className: "slds-p-around_medium"
  }, _react2.default.createElement(_iconSettings2.default, {
    iconPath: "/assets/icons"
  }, getStory()));
}).add('Base Pill Container', function () {
  return _react2.default.createElement(_base2.default, {
    action: _addonActions.action
  });
}).add('Pill Container With Icons', function () {
  return _react2.default.createElement(_icons2.default, {
    action: _addonActions.action
  });
}).add('Pill Container With Avatars', function () {
  return _react2.default.createElement(_avatars2.default, {
    action: _addonActions.action
  });
}).add('Bare Pill Container', function () {
  return _react2.default.createElement(_bare2.default, {
    action: _addonActions.action
  });
});