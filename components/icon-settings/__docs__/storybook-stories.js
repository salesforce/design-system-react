"use strict";

var _react = _interopRequireDefault(require("react"));

var _react2 = require("@storybook/react");

var _constants = require("../../../utilities/constants");

var _sprite = _interopRequireDefault(require("../__examples__/sprite"));

var _iconPath = _interopRequireDefault(require("../__examples__/icon-path"));

var _onRequestIconPath = _interopRequireDefault(require("../__examples__/on-request-icon-path"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _react2.storiesOf)(_constants.ICON_SETTINGS, module).addDecorator(function (getStory) {
  return _react.default.createElement("div", {
    className: "slds-p-around_medium"
  }, getStory());
}).add('Base: Icon path', function () {
  return _react.default.createElement(_iconPath.default, null);
}).add('Base: Sprite imports NoTest', function () {
  return _react.default.createElement(_sprite.default, null);
}).add('Base: OnRequestIconPath NoTest', function () {
  return _react.default.createElement(_onRequestIconPath.default, null);
});