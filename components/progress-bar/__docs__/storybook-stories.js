"use strict";

var _react = _interopRequireDefault(require("react"));

var _react2 = require("@storybook/react");

var _constants = require("../../../utilities/constants");

var _default = _interopRequireDefault(require("../__examples__/default"));

var _thickness = _interopRequireDefault(require("../__examples__/thickness"));

var _color = _interopRequireDefault(require("../__examples__/color"));

var _radius = _interopRequireDefault(require("../__examples__/radius"));

var _descriptive = _interopRequireDefault(require("../__examples__/descriptive"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _react2.storiesOf)(_constants.PROGRESS_BAR, module).addDecorator(function (getStory) {
  return _react.default.createElement("div", {
    className: "slds-p-around_medium"
  }, getStory());
}).add('Default', function () {
  return _react.default.createElement(_default.default, null);
}).add('Descriptive', function () {
  return _react.default.createElement(_descriptive.default, null);
}).add('Color', function () {
  return _react.default.createElement(_color.default, null);
}).add('Radius', function () {
  return _react.default.createElement(_radius.default, null);
}).add('Thickness', function () {
  return _react.default.createElement(_thickness.default, null);
});