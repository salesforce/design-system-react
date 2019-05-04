"use strict";

var _react = _interopRequireDefault(require("react"));

var _react2 = require("@storybook/react");

var _constants = require("../../../utilities/constants");

var _ellie = _interopRequireDefault(require("../__examples__/ellie"));

var _eq = _interopRequireDefault(require("../__examples__/eq"));

var _score = _interopRequireDefault(require("../__examples__/score"));

var _strength = _interopRequireDefault(require("../__examples__/strength"));

var _trend = _interopRequireDefault(require("../__examples__/trend"));

var _typing = _interopRequireDefault(require("../__examples__/typing"));

var _waffle = _interopRequireDefault(require("../__examples__/waffle"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _react2.storiesOf)(_constants.DYNAMIC_ICON, module).addDecorator(function (getStory) {
  return _react.default.createElement("div", {
    className: "slds-p-around_medium"
  }, getStory());
}).add('Ellie', function () {
  return _react.default.createElement(_ellie.default, null);
}).add('Eq', function () {
  return _react.default.createElement(_eq.default, null);
}).add('Score', function () {
  return _react.default.createElement(_score.default, null);
}).add('Strength', function () {
  return _react.default.createElement(_strength.default, null);
}).add('Trend', function () {
  return _react.default.createElement(_trend.default, null);
}).add('Typing', function () {
  return _react.default.createElement(_typing.default, null);
}).add('Waffle', function () {
  return _react.default.createElement(_waffle.default, null);
});