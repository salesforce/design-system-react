"use strict";

var _react = _interopRequireDefault(require("react"));

var _react2 = require("@storybook/react");

var _constants = require("../../../utilities/constants");

var _default = _interopRequireDefault(require("../__examples__/default"));

var _large = _interopRequireDefault(require("../__examples__/large"));

var _lightningBlueTheme = _interopRequireDefault(require("../__examples__/lightning-blue-theme"));

var _noImage = _interopRequireDefault(require("../__examples__/no-image"));

var _small = _interopRequireDefault(require("../__examples__/small"));

var _backgroundCover = _interopRequireDefault(require("../__examples__/background-cover"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import IconSettings from '../../icon-settings';
(0, _react2.storiesOf)(_constants.BRAND_BAND, module).addDecorator(function (getStory) {
  return _react.default.createElement("div", {
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
  return _react.default.createElement(_default.default, null);
}).add('Small', function () {
  return _react.default.createElement(_small.default, null);
}).add('Large', function () {
  return _react.default.createElement(_large.default, null);
}).add('No Image', function () {
  return _react.default.createElement(_noImage.default, null);
}).add('Lightning Blue Theme', function () {
  return _react.default.createElement(_lightningBlueTheme.default, null);
}).add('Image with background size cover', function () {
  return _react.default.createElement(_backgroundCover.default, null);
});