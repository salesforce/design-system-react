"use strict";

var _react = _interopRequireDefault(require("react"));

var _react2 = require("@storybook/react");

var _addonActions = require("@storybook/addon-actions");

var _iconSettings = _interopRequireDefault(require("../../icon-settings"));

var _constants = require("../../../utilities/constants");

var _advanced = _interopRequireDefault(require("../__examples__/advanced"));

var _advancedSingleSelect = _interopRequireDefault(require("../__examples__/advanced-single-select"));

var _advancedSingleSelectFixedHeader = _interopRequireDefault(require("../__examples__/advanced-single-select-fixed-header"));

var _basicFixedLayout = _interopRequireDefault(require("../__examples__/basic-fixed-layout"));

var _basicFluid = _interopRequireDefault(require("../__examples__/basic-fluid"));

var _basicFluidColumnBordered = _interopRequireDefault(require("../__examples__/basic-fluid-column-bordered"));

var _basicFluidNoRowHover = _interopRequireDefault(require("../__examples__/basic-fluid-no-row-hover"));

var _basicFluidStriped = _interopRequireDefault(require("../__examples__/basic-fluid-striped"));

var _fixedHeader = _interopRequireDefault(require("../__examples__/fixed-header"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _react2.storiesOf)(_constants.DATA_TABLE, module).addDecorator(function (getStory) {
  return _react.default.createElement("div", {
    className: "slds-p-around_medium"
  }, _react.default.createElement(_iconSettings.default, {
    iconPath: "/assets/icons"
  }, getStory()));
}).add('Basic Fluid Layout (Default)', function () {
  return _react.default.createElement(_basicFluid.default, null);
}).add('Basic Fluid Layout - Striped', function () {
  return _react.default.createElement(_basicFluidStriped.default, null);
}).add('Basic Fluid Layout - No Row Hover', function () {
  return _react.default.createElement(_basicFluidNoRowHover.default, null);
}).add('Basic Fluid Layout - Column Bordered', function () {
  return _react.default.createElement(_basicFluidColumnBordered.default, null);
}).add('Basic Fixed Layout', function () {
  return _react.default.createElement(_basicFixedLayout.default, null);
}).add('Advanced (Fixed Layout)', function () {
  return _react.default.createElement(_advanced.default, {
    log: _addonActions.action
  });
}).add('Advanced Single Select (Fixed Layout)', function () {
  return _react.default.createElement(_advancedSingleSelect.default, {
    log: _addonActions.action
  });
}).add('Advanced Single Select (Fixed Header)', function () {
  return _react.default.createElement(_advancedSingleSelectFixedHeader.default, {
    log: _addonActions.action
  });
}).add('Fixed Header', function () {
  return _react.default.createElement(_fixedHeader.default, null);
});