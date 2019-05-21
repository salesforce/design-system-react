"use strict";

var _react = _interopRequireDefault(require("react"));

var _react2 = require("@storybook/react");

var _constants = require("../../../utilities/constants");

var _base = _interopRequireDefault(require("../__examples__/base"));

var _disabled = _interopRequireDefault(require("../__examples__/disabled"));

var _error = _interopRequireDefault(require("../__examples__/error"));

var _vertical = _interopRequireDefault(require("../__examples__/vertical"));

var _sizesXSmall = _interopRequireDefault(require("../__examples__/sizes-x-small"));

var _sizesSmall = _interopRequireDefault(require("../__examples__/sizes-small"));

var _sizesMedium = _interopRequireDefault(require("../__examples__/sizes-medium"));

var _sizesLarge = _interopRequireDefault(require("../__examples__/sizes-large"));

var _sizes = _interopRequireDefault(require("../__examples__/sizes"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _react2.storiesOf)(_constants.SLIDER, module).addDecorator(function (getStory) {
  return _react.default.createElement("div", {
    className: "slds-p-around_medium"
  }, getStory());
}).add('Slider', function () {
  return _react.default.createElement(_base.default, null);
}).add('Disabled', function () {
  return _react.default.createElement(_disabled.default, null);
}).add('Error', function () {
  return _react.default.createElement(_error.default, null);
}).add('Vertical', function () {
  return _react.default.createElement(_vertical.default, null);
}).add('Size: X-Small', function () {
  return _react.default.createElement(_sizesXSmall.default, null);
}).add('Size: Small', function () {
  return _react.default.createElement(_sizesSmall.default, null);
}).add('Size: Medium', function () {
  return _react.default.createElement(_sizesMedium.default, null);
}).add('Size: Large', function () {
  return _react.default.createElement(_sizesLarge.default, null);
}).add('Docs site Sizes', function () {
  return _react.default.createElement(_sizes.default, null);
});