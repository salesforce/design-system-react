"use strict";

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _react3 = require("@storybook/react");

var _iconSettings = require("../../icon-settings");

var _iconSettings2 = _interopRequireDefault(_iconSettings);

var _constants = require("../../../utilities/constants");

var _advanced = require("../__examples__/advanced");

var _advanced2 = _interopRequireDefault(_advanced);

var _basic = require("../__examples__/basic");

var _basic2 = _interopRequireDefault(_basic);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _react3.storiesOf)(_constants.DATA_TABLE, module).addDecorator(function (getStory) {
  return _react2.default.createElement("div", {
    className: "slds-p-around--medium"
  }, _react2.default.createElement(_iconSettings2.default, {
    iconPath: "/assets/icons"
  }, getStory()));
}).add('Basic (Fluid Layout)', function () {
  return _react2.default.createElement(_basic2.default, null);
}).add('Advanced (Fixed Layout)', function () {
  return _react2.default.createElement(_advanced2.default, {
    log: _react3.action
  });
});