"use strict";

var _react = _interopRequireDefault(require("react"));

var _react2 = require("@storybook/react");

var _addonActions = require("@storybook/addon-actions");

var _base = _interopRequireDefault(require("../__examples__/base"));

var _baseWithToolbar = _interopRequireDefault(require("../__examples__/base-with-toolbar"));

var _successfulSave = _interopRequireDefault(require("../__examples__/successful-save"));

var _afterSuccessfulSave = _interopRequireDefault(require("../__examples__/after-successful-save"));

var _failedSave = _interopRequireDefault(require("../__examples__/failed-save"));

var _constants = require("../../../utilities/constants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _react2.storiesOf)(_constants.BUILDER_HEADER, module).addDecorator(function (getStory) {
  return _react.default.createElement("div", {
    className: "slds-p-around_medium"
  }, getStory());
}).add('Base', function () {
  return _react.default.createElement(_base.default, null);
}).add('Base with Toolbar', function () {
  return _react.default.createElement(_baseWithToolbar.default, null);
}).add('Successful Save', function () {
  return _react.default.createElement(_successfulSave.default, null);
}).add('After Successful Save', function () {
  return _react.default.createElement(_afterSuccessfulSave.default, null);
}).add('Failed Save', function () {
  return _react.default.createElement(_failedSave.default, null);
});