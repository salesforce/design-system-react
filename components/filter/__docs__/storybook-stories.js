"use strict";

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _react3 = require("@storybook/react");

var _iconSettings = require("../../icon-settings");

var _iconSettings2 = _interopRequireDefault(_iconSettings);

var _constants = require("../../../utilities/constants");

var _default = require("../__examples__/default");

var _default2 = _interopRequireDefault(_default);

var _new = require("../__examples__/new");

var _new2 = _interopRequireDefault(_new);

var _locked = require("../__examples__/locked");

var _locked2 = _interopRequireDefault(_locked);

var _permanant = require("../__examples__/permanant");

var _permanant2 = _interopRequireDefault(_permanant);

var _error = require("../__examples__/error");

var _error2 = _interopRequireDefault(_error);

var _assistiveText = require("../__examples__/assistive-text");

var _assistiveText2 = _interopRequireDefault(_assistiveText);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable react/display-name */

/* eslint-disable react/prop-types */
var CustomAlignment = function CustomAlignment(_ref) {
  var children = _ref.children,
      align = _ref.align;
  return _react2.default.createElement("div", {
    className: "slds-grid slds-m-around--xx-large"
  }, _react2.default.createElement("div", {
    className: "slds-col--bump-".concat(align),
    style: {
      width: '420px'
    }
  }, children));
};

CustomAlignment.defaultProps = {
  align: 'left'
};
(0, _react3.storiesOf)(_constants.FILTER, module).addDecorator(function (getStory) {
  return _react2.default.createElement("div", {
    className: "slds-p-around--medium"
  }, _react2.default.createElement(_iconSettings2.default, {
    iconPath: "/assets/icons"
  }, getStory()));
}).add('Filter', function () {
  return _react2.default.createElement(CustomAlignment, null, _react2.default.createElement(_default2.default, null));
}).add('New Filter', function () {
  return _react2.default.createElement(CustomAlignment, null, _react2.default.createElement(_new2.default, null));
}).add('Locked Filter', function () {
  return _react2.default.createElement(CustomAlignment, null, _react2.default.createElement(_locked2.default, null));
}).add('Permanant Filter', function () {
  return _react2.default.createElement(CustomAlignment, null, _react2.default.createElement(_permanant2.default, null));
}).add('Filter Align Right', function () {
  return _react2.default.createElement(CustomAlignment, {
    align: "right"
  }, _react2.default.createElement(_default2.default, {
    align: "right"
  }));
}).add('AssistiveTextFilter', function () {
  return _react2.default.createElement(CustomAlignment, null, _react2.default.createElement(_assistiveText2.default, null));
}).add('ErrorFilter', function () {
  return _react2.default.createElement(CustomAlignment, null, _react2.default.createElement(_error2.default, null));
});