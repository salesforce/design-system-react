"use strict";

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _react3 = require("@storybook/react");

var _constants = require("../../../utilities/constants");

var _base = require("../__examples__/base");

var _base2 = _interopRequireDefault(_base);

var _oneItem = require("../__examples__/one-item");

var _oneItem2 = _interopRequireDefault(_oneItem);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _react3.storiesOf)(_constants.BREADCRUMB, module).addDecorator(function (getStory) {
  return _react2.default.createElement("div", {
    className: "slds-p-around--medium"
  }, getStory());
}).add('2 Items', function () {
  return _react2.default.createElement(_base2.default, null);
}).add('1 Item', function () {
  return _react2.default.createElement(_oneItem2.default, null);
});