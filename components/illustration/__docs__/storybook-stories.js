"use strict";

var _react = _interopRequireDefault(require("react"));

var _react2 = require("@storybook/react");

var _constants = require("../../../utilities/constants");

var _illustration = _interopRequireDefault(require("../../illustration"));

var _smallImageText = _interopRequireDefault(require("../__examples__/small-image-text.jsx"));

var _largeImageText = _interopRequireDefault(require("../__examples__/large-image-text.jsx"));

var _headingOnly = _interopRequireDefault(require("../__examples__/heading-only.jsx"));

var _messageOnly = _interopRequireDefault(require("../__examples__/message-only.jsx"));

var _headingMessage = _interopRequireDefault(require("../__examples__/heading-message.jsx"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _react2.storiesOf)(_constants.ILLUSTRATION, module).addDecorator(function (getStory) {
  return _react.default.createElement("div", {
    className: "slds-p-around_medium"
  }, getStory());
}).add('Small Image and Text', function () {
  return _react.default.createElement(_smallImageText.default, null);
}).add('Large Image and Text', function () {
  return _react.default.createElement(_largeImageText.default, null);
}).add('Heading Only', function () {
  return _react.default.createElement(_headingOnly.default, null);
}).add('Message Only', function () {
  return _react.default.createElement(_messageOnly.default, null);
}).add('Heading and Message', function () {
  return _react.default.createElement(_headingMessage.default, null);
});