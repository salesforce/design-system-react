"use strict";

var _react = _interopRequireDefault(require("react"));

var _react2 = require("@storybook/react");

var _constants = require("../../../utilities/constants");

var _base = _interopRequireDefault(require("../__examples__/base"));

var _inverseUserInitials = _interopRequireDefault(require("../__examples__/inverse-user-initials.jsx"));

var _userIcon = _interopRequireDefault(require("../__examples__/user-icon.jsx"));

var _userInitials = _interopRequireDefault(require("../__examples__/user-initials.jsx"));

var _entityIcon = _interopRequireDefault(require("../__examples__/entity-icon.jsx"));

var _entityInitials = _interopRequireDefault(require("../__examples__/entity-initials.jsx"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable react/display-name */
(0, _react2.storiesOf)(_constants.AVATAR, module).addDecorator(function (getStory) {
  return _react.default.createElement("div", {
    className: "slds-p-around_medium"
  }, getStory());
}).add('Base', function () {
  return _react.default.createElement("div", null, _react.default.createElement("h1", {
    style: {
      marginBottom: '10px'
    }
  }, "Base Avatar"), _react.default.createElement(_base.default, null));
}).add('Entity Icon', function () {
  return _react.default.createElement("div", null, _react.default.createElement("h1", {
    style: {
      marginBottom: '10px'
    }
  }, "Entity Icon Avatar"), _react.default.createElement(_entityIcon.default, null));
}).add('Entity Initials', function () {
  return _react.default.createElement("div", null, _react.default.createElement("h1", {
    style: {
      marginBottom: '10px'
    }
  }, "Entity Initials Avatar"), _react.default.createElement(_entityInitials.default, null));
}).add('User Icon', function () {
  return _react.default.createElement("div", null, _react.default.createElement("h1", {
    style: {
      marginBottom: '10px'
    }
  }, "User Icon Avatar"), _react.default.createElement(_userIcon.default, null));
}).add('User Initials', function () {
  return _react.default.createElement("div", null, _react.default.createElement("h1", {
    style: {
      marginBottom: '10px'
    }
  }, "User Initials Avatar"), _react.default.createElement(_userInitials.default, null));
}).add('Inverse User Initials', function () {
  return _react.default.createElement("div", null, _react.default.createElement("h1", {
    style: {
      marginBottom: '10px'
    }
  }, "Inversed User Initials Avatar"), _react.default.createElement(_inverseUserInitials.default, null));
});