"use strict";

var _react = _interopRequireDefault(require("react"));

var _addonActions = require("@storybook/addon-actions");

var _react2 = require("@storybook/react");

var _default = _interopRequireDefault(require("../__examples__/default"));

var _defaultWithAutoplay = _interopRequireDefault(require("../__examples__/default-with-autoplay"));

var _defaultWithNavigation = _interopRequireDefault(require("../__examples__/default-with-navigation"));

var _fiveItems = _interopRequireDefault(require("../__examples__/five-items"));

var _threeItems = _interopRequireDefault(require("../__examples__/three-items"));

var _threeItemsWithAutoplay = _interopRequireDefault(require("../__examples__/three-items-with-autoplay"));

var _withCustomItems = _interopRequireDefault(require("../__examples__/with-custom-items"));

var _constants = require("../../../utilities/constants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _react2.storiesOf)(_constants.CAROUSEL, module).add('Default (1 item) NoImageTest', function () {
  return _react.default.createElement(_default.default, {
    action: _addonActions.action
  });
}).add('Default with navigation indicators NoImageTest', function () {
  return _react.default.createElement(_defaultWithNavigation.default, {
    action: _addonActions.action
  });
}).add('Default with AutoPlay NoImageTest', function () {
  return _react.default.createElement(_defaultWithAutoplay.default, {
    action: _addonActions.action
  });
}).add('3 items NoImageTest', function () {
  return _react.default.createElement(_threeItems.default, {
    action: _addonActions.action
  });
}).add('3 items with AutoPlay NoImageTest', function () {
  return _react.default.createElement(_threeItemsWithAutoplay.default, {
    action: _addonActions.action
  });
}).add('5 items NoImageTest', function () {
  return _react.default.createElement(_fiveItems.default, {
    action: _addonActions.action
  });
}).add('With custom items NoImageTest', function () {
  return _react.default.createElement(_withCustomItems.default, {
    action: _addonActions.action
  });
});