"use strict";

var _react = _interopRequireDefault(require("react"));

var _react2 = require("@storybook/react");

var _iconSettings = _interopRequireDefault(require("../../icon-settings"));

var _constants = require("../../../utilities/constants");

var _ = _interopRequireDefault(require("../"));

var _default = _interopRequireDefault(require("../__examples__/default"));

var _disabled = _interopRequireDefault(require("../__examples__/disabled"));

var _error = _interopRequireDefault(require("../__examples__/error"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _react2.storiesOf)(_constants.TEXTAREA, module).addDecorator(function (getStory) {
  return _react.default.createElement("div", {
    className: "slds-p-around_medium"
  }, _react.default.createElement(_iconSettings.default, {
    iconPath: "/assets/icons"
  }, getStory()));
}).add('Standard', function () {
  return _react.default.createElement(_.default, {
    label: "Textarea Label",
    name: "standard-textarea",
    placeholder: "Placeholder Text"
  });
}).add('Disabled', function () {
  return _react.default.createElement(_.default, {
    name: "disabled",
    label: "Textarea Label",
    disabled: true,
    placeholder: "Placeholder Text"
  });
}).add('Required', function () {
  return _react.default.createElement(_.default, {
    "aria-describedby": "required-1",
    name: "required-textarea",
    assistiveText: {
      label: 'Textarea Label'
    },
    required: true,
    placeholder: "Placeholder Text"
  });
}).add('Error', function () {
  return _react.default.createElement(_.default, {
    "aria-describedby": "error-1",
    name: "required-textarea-error",
    label: "Textarea Label",
    required: true,
    errorText: "Error Message",
    placeholder: "Placeholder Text"
  });
}).add('Docs site Default', function () {
  return _react.default.createElement(_default.default, null);
}).add('Docs site Disabled', function () {
  return _react.default.createElement(_disabled.default, null);
}).add('Docs site Error', function () {
  return _react.default.createElement(_error.default, null);
});