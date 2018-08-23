"use strict";

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _react3 = require("@storybook/react");

var _constants = require("../../../utilities/constants");

var _base = require("../__examples__/base");

var _base2 = _interopRequireDefault(_base);

var _baseMultiple = require("../__examples__/base-multiple");

var _baseMultiple2 = _interopRequireDefault(_baseMultiple);

var _externalState = require("../__examples__/external-state");

var _externalState2 = _interopRequireDefault(_externalState);

var _customItemList = require("../__examples__/custom-Item-list");

var _customItemList2 = _interopRequireDefault(_customItemList);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _react3.storiesOf)(_constants.SPLIT_VIEW, module).addDecorator(function (getStory) {
  return _react2.default.createElement("div", {
    className: "slds-p-around--medium"
  }, getStory());
}).add('Base: Open', function () {
  return _react2.default.createElement(_base2.default, null);
}).add('Base: Closed', function () {
  return _react2.default.createElement(_base2.default, {
    isOpen: false
  });
}).add('Base: Multiple', function () {
  return _react2.default.createElement(_baseMultiple2.default, null);
}).add('External State', function () {
  return _react2.default.createElement(_externalState2.default, null);
}).add('Custom List', function () {
  return _react2.default.createElement(_customItemList2.default, null);
});