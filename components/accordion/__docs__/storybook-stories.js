"use strict";

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _react3 = require("@storybook/react");

var _addonActions = require("@storybook/addon-actions");

var _constants = require("../../../utilities/constants");

var _base = require("../__examples__/base");

var _base2 = _interopRequireDefault(_base);

var _baseOpen = require("../__examples__/base-open");

var _baseOpen2 = _interopRequireDefault(_baseOpen);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _react3.storiesOf)(_constants.ACCORDION, module).addDecorator(function (getStory) {
  return _react2.default.createElement("div", {
    className: "slds-p-around_medium"
  }, getStory());
}).add('Base', function () {
  return _react2.default.createElement(_base2.default, {
    action: _addonActions.action
  });
}).add('Base Open', function () {
  return _react2.default.createElement(_baseOpen2.default, {
    action: _addonActions.action
  });
});