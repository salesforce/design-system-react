"use strict";

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _react3 = require("@storybook/react");

var _constants = require("../../../utilities/constants");

var _illustration = require("../../illustration");

var _illustration2 = _interopRequireDefault(_illustration);

var _smallImageText = require("../__examples__/small-image-text.jsx");

var _smallImageText2 = _interopRequireDefault(_smallImageText);

var _largeImageText = require("../__examples__/large-image-text.jsx");

var _largeImageText2 = _interopRequireDefault(_largeImageText);

var _headingOnly = require("../__examples__/heading-only.jsx");

var _headingOnly2 = _interopRequireDefault(_headingOnly);

var _messageOnly = require("../__examples__/message-only.jsx");

var _messageOnly2 = _interopRequireDefault(_messageOnly);

var _headingMessage = require("../__examples__/heading-message.jsx");

var _headingMessage2 = _interopRequireDefault(_headingMessage);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _react3.storiesOf)(_constants.ILLUSTRATION, module).addDecorator(function (getStory) {
  return _react2.default.createElement("div", {
    className: "slds-p-around--medium"
  }, getStory());
}).add('Small Image and Text', function () {
  return _react2.default.createElement(_smallImageText2.default, null);
}).add('Large Image and Text', function () {
  return _react2.default.createElement(_largeImageText2.default, null);
}).add('Heading Only', function () {
  return _react2.default.createElement(_headingOnly2.default, null);
}).add('Message Only', function () {
  return _react2.default.createElement(_messageOnly2.default, null);
}).add('Heading and Message', function () {
  return _react2.default.createElement(_headingMessage2.default, null);
});