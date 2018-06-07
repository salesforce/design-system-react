"use strict";

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _react3 = require("@storybook/react");

var _constants = require("../../../utilities/constants");

var _base = require("../__examples__/base");

var _base2 = _interopRequireDefault(_base);

var _disabled = require("../__examples__/disabled");

var _disabled2 = _interopRequireDefault(_disabled);

var _error = require("../__examples__/error");

var _error2 = _interopRequireDefault(_error);

var _vertical = require("../__examples__/vertical");

var _vertical2 = _interopRequireDefault(_vertical);

var _sizesXSmall = require("../__examples__/sizes-x-small");

var _sizesXSmall2 = _interopRequireDefault(_sizesXSmall);

var _sizesSmall = require("../__examples__/sizes-small");

var _sizesSmall2 = _interopRequireDefault(_sizesSmall);

var _sizesMedium = require("../__examples__/sizes-medium");

var _sizesMedium2 = _interopRequireDefault(_sizesMedium);

var _sizesLarge = require("../__examples__/sizes-large");

var _sizesLarge2 = _interopRequireDefault(_sizesLarge);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _react3.storiesOf)(_constants.SLIDER, module).addDecorator(function (getStory) {
  return _react2.default.createElement("div", {
    className: "slds-p-around--medium"
  }, getStory());
}).add('Slider', function () {
  return _react2.default.createElement(_base2.default, null);
}).add('Disabled', function () {
  return _react2.default.createElement(_disabled2.default, null);
}).add('Error', function () {
  return _react2.default.createElement(_error2.default, null);
}).add('Vertical', function () {
  return _react2.default.createElement(_vertical2.default, null);
}).add('Size: X-Small', function () {
  return _react2.default.createElement(_sizesXSmall2.default, null);
}).add('Size: Small', function () {
  return _react2.default.createElement(_sizesSmall2.default, null);
}).add('Size: Medium', function () {
  return _react2.default.createElement(_sizesMedium2.default, null);
}).add('Size: Large', function () {
  return _react2.default.createElement(_sizesLarge2.default, null);
});