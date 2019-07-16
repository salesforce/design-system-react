"use strict";

var _react = _interopRequireDefault(require("react"));

var _react2 = require("@storybook/react");

var _constants = require("../../../utilities/constants");

var _default = _interopRequireDefault(require("../__examples__/default"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _react2.storiesOf)(_constants.TRIAL_BAR, module).addDecorator(function (getStory) {
  return _react.default.createElement("div", {
    className: "slds-p-around_medium"
  }, getStory());
}).add('Default', function () {
  return _react.default.createElement(_default.default, null);
});