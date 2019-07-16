"use strict";

var _react = _interopRequireDefault(require("react"));

var _react2 = require("@storybook/react");

var _iconSettings = _interopRequireDefault(require("../../icon-settings"));

var _constants = require("../../../utilities/constants");

var _filtering = _interopRequireDefault(require("../__examples__/filtering"));

var _filteringLocked = _interopRequireDefault(require("../__examples__/filtering-locked"));

var _filteringError = _interopRequireDefault(require("../__examples__/filtering-error"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _react2.storiesOf)(_constants.PANEL, module).addDecorator(function (getStory) {
  return _react.default.createElement("div", {
    className: "slds-grid",
    style: {
      backgroundColor: '#ccc',
      padding: '20px'
    }
  }, _react.default.createElement("div", {
    className: "slds-col_bump-left",
    style: {
      width: '420px'
    }
  }, _react.default.createElement(_iconSettings.default, {
    iconPath: "/assets/icons"
  }, getStory())));
}).add('Filters', function () {
  return _react.default.createElement(_filtering.default, null);
}).add('Filters Locked', function () {
  return _react.default.createElement(_filteringLocked.default, null);
}).add('Filters Error', function () {
  return _react.default.createElement(_filteringError.default, null);
});