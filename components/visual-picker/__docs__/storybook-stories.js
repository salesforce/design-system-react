"use strict";

var _react = _interopRequireDefault(require("react"));

var _react2 = require("@storybook/react");

var _constants = require("../../../utilities/constants");

var _nonCoverable = _interopRequireDefault(require("../__examples__/non-coverable"));

var _coverable = _interopRequireDefault(require("../__examples__/coverable"));

var _links = _interopRequireDefault(require("../__examples__/links"));

var _vertical = _interopRequireDefault(require("../__examples__/vertical"));

var _verticalCoverable = _interopRequireDefault(require("../__examples__/vertical-coverable"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _react2.storiesOf)(_constants.VISUAL_PICKER, module).addDecorator(function (getStory) {
  return _react.default.createElement("div", {
    className: "slds-p-around_medium"
  }, getStory());
}).add('Coverable', function () {
  return _react.default.createElement(_coverable.default, null);
}).add('Non-Coverable', function () {
  return _react.default.createElement(_nonCoverable.default, null);
}).add('Links', function () {
  return _react.default.createElement(_links.default, null);
}).add('Vertical', function () {
  return _react.default.createElement(_vertical.default, null);
}).add('Vertical Coverable', function () {
  return _react.default.createElement(_verticalCoverable.default, null);
});