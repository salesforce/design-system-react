"use strict";

var _react = _interopRequireDefault(require("react"));

var _react2 = require("@storybook/react");

var _constants = require("../../../utilities/constants");

var _base = _interopRequireDefault(require("../__examples__/base"));

var _light = _interopRequireDefault(require("../__examples__/light"));

var _dark = _interopRequireDefault(require("../__examples__/dark"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _react2.storiesOf)(_constants.SCOPED_NOTIFICATION, module).addDecorator(function (getStory) {
  return _react.default.createElement("div", {
    className: "slds-p-around_medium"
  }, getStory());
}).add('Base', function () {
  return _react.default.createElement(_base.default, null);
}).add('Light', function () {
  return _react.default.createElement(_light.default, null);
}).add('Dark', function () {
  return _react.default.createElement(_dark.default, null);
});