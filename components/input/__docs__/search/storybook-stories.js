"use strict";

var _react = _interopRequireDefault(require("react"));

var _react2 = require("@storybook/react");

var _addonActions = require("@storybook/addon-actions");

var _iconSettings = _interopRequireDefault(require("../../../icon-settings"));

var _constants = require("../../../../utilities/constants");

var _search = _interopRequireDefault(require("../../search"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _react2.storiesOf)(_constants.SEARCH, module).addDecorator(function (getStory) {
  return _react.default.createElement("div", {
    className: "slds-p-around_medium"
  }, _react.default.createElement(_iconSettings.default, {
    iconPath: "/assets/icons"
  }, getStory()));
}).add('Standard', function () {
  return _react.default.createElement(_search.default, {
    assistiveText: {
      label: 'Search'
    },
    placeholder: "Search",
    name: "search-input",
    onChange: (0, _addonActions.action)('change'),
    onSearch: (0, _addonActions.action)('search')
  });
});