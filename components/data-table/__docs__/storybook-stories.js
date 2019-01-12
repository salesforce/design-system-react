"use strict";

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _react3 = require("@storybook/react");

var _addonActions = require("@storybook/addon-actions");

var _iconSettings = require("../../icon-settings");

var _iconSettings2 = _interopRequireDefault(_iconSettings);

var _constants = require("../../../utilities/constants");

var _advanced = require("../__examples__/advanced");

var _advanced2 = _interopRequireDefault(_advanced);

var _advancedSingleSelect = require("../__examples__/advanced-single-select");

var _advancedSingleSelect2 = _interopRequireDefault(_advancedSingleSelect);

var _advancedSingleSelectFixedHeader = require("../__examples__/advanced-single-select-fixed-header");

var _advancedSingleSelectFixedHeader2 = _interopRequireDefault(_advancedSingleSelectFixedHeader);

var _basic = require("../__examples__/basic");

var _basic2 = _interopRequireDefault(_basic);

var _basicFixedLayout = require("../__examples__/basic-fixed-layout");

var _basicFixedLayout2 = _interopRequireDefault(_basicFixedLayout);

var _fixedHeader = require("../__examples__/fixed-header");

var _fixedHeader2 = _interopRequireDefault(_fixedHeader);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _react3.storiesOf)(_constants.DATA_TABLE, module).addDecorator(function (getStory) {
  return _react2.default.createElement("div", {
    className: "slds-p-around_medium"
  }, _react2.default.createElement(_iconSettings2.default, {
    iconPath: "/assets/icons"
  }, getStory()));
}).add('Basic (Fluid Layout)', function () {
  return _react2.default.createElement(_basic2.default, null);
}).add('Basic (Fixed Layout)', function () {
  return _react2.default.createElement(_basicFixedLayout2.default, null);
}).add('Advanced (Fixed Layout)', function () {
  return _react2.default.createElement(_advanced2.default, {
    log: _addonActions.action
  });
}).add('Advanced Single Select (Fixed Layout)', function () {
  return _react2.default.createElement(_advancedSingleSelect2.default, {
    log: _addonActions.action
  });
}).add('Advanced Single Select (Fixed Header)', function () {
  return _react2.default.createElement(_advancedSingleSelectFixedHeader2.default, {
    log: _addonActions.action
  });
}).add('Fixed Header', function () {
  return _react2.default.createElement(_fixedHeader2.default, null);
});