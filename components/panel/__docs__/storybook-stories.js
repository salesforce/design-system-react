"use strict";

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _react3 = require("@storybook/react");

var _iconSettings = require("../../icon-settings");

var _iconSettings2 = _interopRequireDefault(_iconSettings);

var _constants = require("../../../utilities/constants");

var _filtering = require("../__examples__/filtering");

var _filtering2 = _interopRequireDefault(_filtering);

var _filteringLocked = require("../__examples__/filtering-locked");

var _filteringLocked2 = _interopRequireDefault(_filteringLocked);

var _filteringError = require("../__examples__/filtering-error");

var _filteringError2 = _interopRequireDefault(_filteringError);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _react3.storiesOf)(_constants.PANEL, module).addDecorator(function (getStory) {
  return _react2.default.createElement("div", {
    className: "slds-grid",
    style: {
      backgroundColor: '#ccc',
      padding: '20px'
    }
  }, _react2.default.createElement("div", {
    className: "slds-col--bump-left",
    style: {
      width: '420px'
    }
  }, _react2.default.createElement(_iconSettings2.default, {
    iconPath: "/assets/icons"
  }, getStory())));
}).add('Filters', function () {
  return _react2.default.createElement(_filtering2.default, null);
}).add('Filters Locked', function () {
  return _react2.default.createElement(_filteringLocked2.default, null);
}).add('Filters Error', function () {
  return _react2.default.createElement(_filteringError2.default, null);
});