"use strict";

var _react = _interopRequireDefault(require("react"));

var _react2 = require("@storybook/react");

var _iconSettings = _interopRequireDefault(require("../../icon-settings"));

var _constants = require("../../../utilities/constants");

var _default = _interopRequireDefault(require("../__examples__/default"));

var _new = _interopRequireDefault(require("../__examples__/new"));

var _locked = _interopRequireDefault(require("../__examples__/locked"));

var _permanant = _interopRequireDefault(require("../__examples__/permanant"));

var _error = _interopRequireDefault(require("../__examples__/error"));

var _assistiveText = _interopRequireDefault(require("../__examples__/assistive-text"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable react/display-name */

/* eslint-disable react/prop-types */
var CustomAlignment = function CustomAlignment(_ref) {
  var children = _ref.children,
      align = _ref.align;
  return _react.default.createElement("div", {
    className: "slds-grid slds-m-around_xx-large"
  }, _react.default.createElement("div", {
    className: "slds-col_bump-".concat(align),
    style: {
      width: '420px'
    }
  }, children));
};

CustomAlignment.defaultProps = {
  align: 'left'
};
(0, _react2.storiesOf)(_constants.FILTER, module).addDecorator(function (getStory) {
  return _react.default.createElement("div", {
    className: "slds-p-around_medium"
  }, _react.default.createElement(_iconSettings.default, {
    iconPath: "/assets/icons"
  }, getStory()));
}).add('Filter', function () {
  return _react.default.createElement(CustomAlignment, null, _react.default.createElement(_default.default, null));
}).add('New Filter', function () {
  return _react.default.createElement(CustomAlignment, null, _react.default.createElement(_new.default, null));
}).add('Locked Filter', function () {
  return _react.default.createElement(CustomAlignment, null, _react.default.createElement(_locked.default, null));
}).add('Permanant Filter', function () {
  return _react.default.createElement(CustomAlignment, null, _react.default.createElement(_permanant.default, null));
}).add('Filter Align Right', function () {
  return _react.default.createElement(CustomAlignment, {
    align: "right"
  }, _react.default.createElement(_default.default, {
    align: "right"
  }));
}).add('AssistiveTextFilter', function () {
  return _react.default.createElement(CustomAlignment, null, _react.default.createElement(_assistiveText.default, null));
}).add('ErrorFilter', function () {
  return _react.default.createElement(CustomAlignment, null, _react.default.createElement(_error.default, null));
});