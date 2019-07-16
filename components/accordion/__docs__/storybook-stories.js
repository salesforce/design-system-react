"use strict";

var _react = _interopRequireDefault(require("react"));

var _react2 = require("@storybook/react");

var _addonActions = require("@storybook/addon-actions");

var _constants = require("../../../utilities/constants");

var _base = _interopRequireDefault(require("../__examples__/base"));

var _baseOpen = _interopRequireDefault(require("../__examples__/base-open"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _react2.storiesOf)(_constants.ACCORDION, module).addDecorator(function (getStory) {
  return _react.default.createElement("div", {
    className: "slds-p-around_medium"
  }, getStory());
}).add('Base', function () {
  return _react.default.createElement(_base.default, {
    action: _addonActions.action
  });
}).add('Base Open', function () {
  return _react.default.createElement(_baseOpen.default, {
    action: _addonActions.action
  });
});