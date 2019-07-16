"use strict";

var _react = _interopRequireDefault(require("react"));

var _react2 = require("@storybook/react");

var _addonActions = require("@storybook/addon-actions");

var _constants = require("../../../utilities/constants");

var _controlled = _interopRequireDefault(require("../__examples__/controlled"));

var _default = _interopRequireDefault(require("../__examples__/default"));

var _nonCollapsible = _interopRequireDefault(require("../__examples__/non-collapsible"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _react2.storiesOf)(_constants.EXPANDABLE_SECTION, module).addDecorator(function (getStory) {
  return _react.default.createElement("div", {
    className: "slds-p-around_medium"
  }, getStory());
}).add('Default', function () {
  return _react.default.createElement(_default.default, null);
}).add('Controlled', function () {
  return _react.default.createElement(_controlled.default, {
    action: _addonActions.action
  });
}).add('Non-collapsible', function () {
  return _react.default.createElement(_nonCollapsible.default, null);
});