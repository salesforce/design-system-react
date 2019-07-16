"use strict";

var _react = _interopRequireDefault(require("react"));

var _react2 = require("@storybook/react");

var _active = _interopRequireDefault(require("../__examples__/active"));

var _base = _interopRequireDefault(require("../__examples__/base"));

var _complete = _interopRequireDefault(require("../__examples__/complete"));

var _warning = _interopRequireDefault(require("../__examples__/warning"));

var _expired = _interopRequireDefault(require("../__examples__/expired"));

var _customIcon = _interopRequireDefault(require("../__examples__/customIcon"));

var _examples = _interopRequireDefault(require("../__examples__/examples"));

var _constants = require("../../../utilities/constants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _react2.storiesOf)(_constants.PROGRESS_RING, module).addDecorator(function (getStory) {
  return _react.default.createElement("div", {
    className: "slds-p-around_medium"
  }, getStory());
}).add('Base', function () {
  return _react.default.createElement(_base.default, null);
}).add('Theme: Active', function () {
  return _react.default.createElement(_active.default, null);
}).add('Theme: Complete', function () {
  return _react.default.createElement(_complete.default, null);
}).add('Theme: Warning', function () {
  return _react.default.createElement(_warning.default, null);
}).add('Theme: Expired', function () {
  return _react.default.createElement(_expired.default, null);
}).add('Custom Icon', function () {
  return _react.default.createElement(_customIcon.default, null);
}).add('Snapshot Test Examples', function () {
  return _react.default.createElement(_examples.default, null);
});