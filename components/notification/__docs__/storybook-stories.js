"use strict";

var _react = _interopRequireDefault(require("react"));

var _react2 = require("@storybook/react");

var _iconSettings = _interopRequireDefault(require("../../icon-settings"));

var _constants = require("../../../utilities/constants");

var _notification = _interopRequireDefault(require("../../notification"));

var _alerts = _interopRequireDefault(require("../__examples__/alerts"));

var _toasts = _interopRequireDefault(require("../__examples__/toasts"));

var _withinModal = _interopRequireDefault(require("../__examples__/within-modal"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _react2.storiesOf)(_constants.NOTIFICATION, module).addDecorator(function (getStory) {
  return _react.default.createElement("div", {
    className: "slds-p-around_medium"
  }, _react.default.createElement(_iconSettings.default, {
    iconPath: "/assets/icons"
  }, getStory()));
}).add('Base: Alert', function () {
  return _react.default.createElement(_notification.default, {
    content: ['Your new contact ', _react.default.createElement("a", {
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
  return _react.default.createElement(_notification.default, {
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
  return _react.default.createElement(_alerts.default, null);
}).add('Docs site Toasts', function () {
  return _react.default.createElement(_toasts.default, null);
}).add('Docs site WithinModal', function () {
  return _react.default.createElement(_withinModal.default, null);
});