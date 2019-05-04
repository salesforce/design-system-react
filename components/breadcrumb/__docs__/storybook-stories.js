"use strict";

var _react = _interopRequireDefault(require("react"));

var _react2 = require("@storybook/react");

var _constants = require("../../../utilities/constants");

var _base = _interopRequireDefault(require("../__examples__/base"));

var _oneItem = _interopRequireDefault(require("../__examples__/one-item"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _react2.storiesOf)(_constants.BREADCRUMB, module).addDecorator(function (getStory) {
  return _react.default.createElement("div", {
    className: "slds-p-around_medium"
  }, getStory());
}).add('2 Items', function () {
  return _react.default.createElement(_base.default, null);
}).add('1 Item', function () {
  return _react.default.createElement(_oneItem.default, null);
});