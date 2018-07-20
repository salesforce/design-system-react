"use strict";

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _react3 = require("@storybook/react");

var _iconSettings = require("../../icon-settings");

var _iconSettings2 = _interopRequireDefault(_iconSettings);

var _constants = require("../../../utilities/constants");

var _default = require("../__examples__/default");

var _default2 = _interopRequireDefault(_default);

var _shade = require("../__examples__/shade");

var _shade2 = _interopRequireDefault(_shade);

var _snapshotDefault = require("../__examples__/snapshot-default");

var _snapshotDefault2 = _interopRequireDefault(_snapshotDefault);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _react3.storiesOf)(_constants.NAVIGATION, module).addDecorator(function (getStory) {
  return _react2.default.createElement("div", {
    className: "slds-p-around--medium"
  }, _react2.default.createElement(_iconSettings2.default, {
    iconPath: "/assets/icons"
  }, getStory()));
}).add('Default', function () {
  return _react2.default.createElement(_default2.default, {
    action: _react3.action
  });
}).add('Inverse', function () {
  return _react2.default.createElement(_shade2.default, {
    action: _react3.action
  });
}).add('DOM Snapshot', function () {
  return _react2.default.createElement(_snapshotDefault2.default, null);
});