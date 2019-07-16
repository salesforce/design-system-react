"use strict";

var _react = _interopRequireDefault(require("react"));

var _react2 = require("@storybook/react");

var _constants = require("../../../utilities/constants");

var _base = _interopRequireDefault(require("../__examples__/base"));

var _baseMultiple = _interopRequireDefault(require("../__examples__/base-multiple"));

var _externalState = _interopRequireDefault(require("../__examples__/external-state"));

var _customItemList = _interopRequireDefault(require("../__examples__/custom-Item-list"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _react2.storiesOf)(_constants.SPLIT_VIEW, module).addDecorator(function (getStory) {
  return _react.default.createElement("div", {
    className: "slds-p-around_medium"
  }, getStory());
}).add('Base: Open', function () {
  return _react.default.createElement(_base.default, null);
}).add('Base: Closed', function () {
  return _react.default.createElement(_base.default, {
    isOpen: false
  });
}).add('Base: Multiple', function () {
  return _react.default.createElement(_baseMultiple.default, null);
}).add('External State', function () {
  return _react.default.createElement(_externalState.default, null);
}).add('Custom List', function () {
  return _react.default.createElement(_customItemList.default, null);
});