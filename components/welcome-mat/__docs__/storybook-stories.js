"use strict";

var _react = _interopRequireDefault(require("react"));

var _react2 = require("@storybook/react");

var _constants = require("../../../utilities/constants");

var _default = _interopRequireDefault(require("../__examples__/default"));

var _stepsComplete = _interopRequireDefault(require("../__examples__/steps-complete"));

var _splash = _interopRequireDefault(require("../__examples__/splash"));

var _infoOnly = _interopRequireDefault(require("../__examples__/info-only"));

var _trailhead = _interopRequireDefault(require("../__examples__/trailhead"));

var _trailheadComplete = _interopRequireDefault(require("../__examples__/trailhead-complete"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _react2.storiesOf)(_constants.WELCOME_MAT, module).addDecorator(function (getStory) {
  return _react.default.createElement("div", {
    className: "slds-p-around_medium"
  }, getStory());
}).add('Default', function () {
  return _react.default.createElement(_default.default, {
    isOpen: true
  });
}).add('Steps Complete', function () {
  return _react.default.createElement(_stepsComplete.default, {
    isOpen: true
  });
}).add('Info Only', function () {
  return _react.default.createElement(_infoOnly.default, {
    isOpen: true
  });
}).add('Splash', function () {
  return _react.default.createElement(_splash.default, {
    isOpen: true
  });
}).add('Trailhead', function () {
  return _react.default.createElement(_trailhead.default, {
    isOpen: true
  });
}).add('Trailhead Complete', function () {
  return _react.default.createElement(_trailheadComplete.default, {
    isOpen: true
  });
});