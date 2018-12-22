"use strict";

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _react3 = require("@storybook/react");

var _constants = require("../../../utilities/constants");

var _default = require("../__examples__/default");

var _default2 = _interopRequireDefault(_default);

var _large = require("../__examples__/large");

var _large2 = _interopRequireDefault(_large);

var _lightningBlueTheme = require("../__examples__/lightning-blue-theme");

var _lightningBlueTheme2 = _interopRequireDefault(_lightningBlueTheme);

var _noImage = require("../__examples__/no-image");

var _noImage2 = _interopRequireDefault(_noImage);

var _small = require("../__examples__/small");

var _small2 = _interopRequireDefault(_small);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import IconSettings from '../../icon-settings';
(0, _react3.storiesOf)(_constants.BRAND_BAND, module).addDecorator(function (getStory) {
  return _react2.default.createElement("div", {
    style: {
      bottom: '1rem',
      left: '1rem',
      overflow: 'auto',
      position: 'absolute',
      right: '1rem',
      top: '1rem'
    }
  }, getStory());
}).add('Default (medium)', function () {
  return _react2.default.createElement(_default2.default, null);
}).add('Small', function () {
  return _react2.default.createElement(_small2.default, null);
}).add('Large', function () {
  return _react2.default.createElement(_large2.default, null);
}).add('No Image', function () {
  return _react2.default.createElement(_noImage2.default, null);
}).add('Lightning Blue Theme', function () {
  return _react2.default.createElement(_lightningBlueTheme2.default, null);
});