"use strict";

var _react = _interopRequireDefault(require("react"));

var _addonActions = require("@storybook/addon-actions");

var _react2 = require("@storybook/react");

var _base = _interopRequireDefault(require("../__examples__/base"));

var _card = _interopRequireDefault(require("../__examples__/card"));

var _hubExpandableSteps = _interopRequireDefault(require("../__examples__/hub-expandable-steps"));

var _stepProgress = _interopRequireDefault(require("../__examples__/step-progress"));

var _constants = require("../../../utilities/constants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _react2.storiesOf)(_constants.SETUP_ASSISTANT, module).addDecorator(function (getStory) {
  return _react.default.createElement("div", {
    className: "slds-p-around_medium"
  }, getStory());
}).add('Base Variant', function () {
  return _react.default.createElement(_base.default, {
    action: _addonActions.action
  });
}).add('With Step Progress', function () {
  return _react.default.createElement(_stepProgress.default, {
    action: _addonActions.action
  });
}).add('Hub with Expandable Steps', function () {
  return _react.default.createElement(_hubExpandableSteps.default, {
    action: _addonActions.action
  });
}).add('In a Card', function () {
  return _react.default.createElement(_card.default, {
    action: _addonActions.action
  });
});