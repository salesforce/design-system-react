"use strict";

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _react3 = require("@storybook/react");

var _iconSettings = require("../../icon-settings");

var _iconSettings2 = _interopRequireDefault(_iconSettings);

var _constants = require("../../../utilities/constants");

var _notification = require("../../notification");

var _notification2 = _interopRequireDefault(_notification);

var _alerts = require("../__examples__/alerts");

var _alerts2 = _interopRequireDefault(_alerts);

var _toasts = require("../__examples__/toasts");

var _toasts2 = _interopRequireDefault(_toasts);

var _withinModal = require("../__examples__/within-modal");

var _withinModal2 = _interopRequireDefault(_withinModal);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _react3.storiesOf)(_constants.NOTIFICATION, module).addDecorator(function (getStory) {
  return _react2.default.createElement("div", {
    className: "slds-p-around_medium"
  }, _react2.default.createElement(_iconSettings2.default, {
    iconPath: "/assets/icons"
  }, getStory()));
}).add('Base: Alert', function () {
  return _react2.default.createElement(_notification2.default, {
    content: ['Your new contact ', _react2.default.createElement("a", {
      href: "javascript:void(0);",
      key: "0123"
    }, "Sara Smith"), ' was successfully created.'],
    iconName: "notification",
    isOpen: true,
    onDismiss: function onDismiss() {
      console.log('dismiss alert');
    },
    texture: true,
    theme: "success",
    variant: "alert"
  });
}).add('Base: Toast', function () {
  return _react2.default.createElement(_notification2.default, {
    content: "toast notification",
    inverse: true,
    isOpen: true,
    name: "account",
    onDismiss: function onDismiss() {
      console.log('dismiss toast');
    },
    theme: "error",
    variant: "toast"
  });
}).add('Docs site Alerts', function () {
  return _react2.default.createElement(_alerts2.default, null);
}).add('Docs site Toasts', function () {
  return _react2.default.createElement(_toasts2.default, null);
}).add('Docs site WithinModal', function () {
  return _react2.default.createElement(_withinModal2.default, null);
});