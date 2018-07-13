"use strict";

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _react3 = require("@storybook/react");

var _constants = require("../../../utilities/constants");

var _base = require("../__examples__/base");

var _base2 = _interopRequireDefault(_base);

var _userIcon = require("../__examples__/user-icon.jsx");

var _userIcon2 = _interopRequireDefault(_userIcon);

var _userInitials = require("../__examples__/user-initials.jsx");

var _userInitials2 = _interopRequireDefault(_userInitials);

var _entityIcon = require("../__examples__/entity-icon.jsx");

var _entityIcon2 = _interopRequireDefault(_entityIcon);

var _entityInitials = require("../__examples__/entity-initials.jsx");

var _entityInitials2 = _interopRequireDefault(_entityInitials);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable react/display-name */
(0, _react3.storiesOf)(_constants.AVATAR, module).addDecorator(function (getStory) {
  return _react2.default.createElement("div", {
    className: "slds-p-around--medium"
  }, getStory());
}).add('Base', function () {
  return _react2.default.createElement("div", null, _react2.default.createElement("h1", {
    style: {
      marginBottom: '10px'
    }
  }, "Base Avatar"), _react2.default.createElement(_base2.default, null));
}).add('Entity Icon', function () {
  return _react2.default.createElement("div", null, _react2.default.createElement("h1", {
    style: {
      marginBottom: '10px'
    }
  }, "Entity Icon Avatar"), _react2.default.createElement(_entityIcon2.default, null));
}).add('Entity Initials', function () {
  return _react2.default.createElement("div", null, _react2.default.createElement("h1", {
    style: {
      marginBottom: '10px'
    }
  }, "Entity Initials Avatar"), _react2.default.createElement(_entityInitials2.default, null));
}).add('User Icon', function () {
  return _react2.default.createElement("div", null, _react2.default.createElement("h1", {
    style: {
      marginBottom: '10px'
    }
  }, "User Icon Avatar"), _react2.default.createElement(_userIcon2.default, null));
}).add('User Initials', function () {
  return _react2.default.createElement("div", null, _react2.default.createElement("h1", {
    style: {
      marginBottom: '10px'
    }
  }, "User Initials Avatar"), _react2.default.createElement(_userInitials2.default, null));
});