"use strict";

var _react = _interopRequireDefault(require("react"));

var _react2 = require("@storybook/react");

var _addonActions = require("@storybook/addon-actions");

var _constants = require("../../../utilities/constants");

var _iconSettings = _interopRequireDefault(require("../../icon-settings"));

var _base = _interopRequireDefault(require("../__examples__/base"));

var _icon = _interopRequireDefault(require("../__examples__/icon"));

var _snapshot = _interopRequireDefault(require("../__examples__/snapshot"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _react2.storiesOf)(_constants.PILL, module).addDecorator(function (getStory) {
  return _react.default.createElement("div", {
    className: "slds-p-around_medium"
  }, _react.default.createElement(_iconSettings.default, {
    iconPath: "/assets/icons"
  }, getStory()));
}).add('Linked, Unlinked, Truncated', function () {
  return _react.default.createElement(_base.default, {
    action: _addonActions.action
  });
}).add('Icon, Avatar, Error', function () {
  return _react.default.createElement(_icon.default, {
    action: _addonActions.action
  });
}).add('Docs site Snapshot', function () {
  return _react.default.createElement(_snapshot.default, null);
});