"use strict";

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _react3 = require("@storybook/react");

var _constants = require("../../../utilities/constants");

var _sprite = require("../__examples__/sprite");

var _sprite2 = _interopRequireDefault(_sprite);

var _iconPath = require("../__examples__/icon-path");

var _iconPath2 = _interopRequireDefault(_iconPath);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _react3.storiesOf)(_constants.ICON_SETTINGS, module).addDecorator(function (getStory) {
  return _react2.default.createElement("div", {
    className: "slds-p-around--medium"
  }, getStory());
}).add('Base: Icon path', function () {
  return _react2.default.createElement(_iconPath2.default, null);
}).add('Base: Sprite imports', function () {
  return _react2.default.createElement(_sprite2.default, null);
});