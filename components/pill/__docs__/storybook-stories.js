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

var _icon = require("../__examples__/icon");

var _icon2 = _interopRequireDefault(_icon);

var _snapshot = require("../__examples__/snapshot");

var _snapshot2 = _interopRequireDefault(_snapshot);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _react3.storiesOf)(_constants.PILL, module).addDecorator(function (getStory) {
  return _react2.default.createElement("div", {
    className: "slds-p-around_medium"
  }, _react2.default.createElement(_iconSettings2.default, {
    iconPath: "/assets/icons"
  }, getStory()));
}).add('Linked, Unlinked, Truncated', function () {
  return _react2.default.createElement(_base2.default, {
    action: _addonActions.action
  });
}).add('Icon, Avatar, Error', function () {
  return _react2.default.createElement(_icon2.default, {
    action: _addonActions.action
  });
}).add('Docs site Snapshot', function () {
  return _react2.default.createElement(_snapshot2.default, null);
});