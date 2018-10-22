"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _createReactClass = require("create-react-class");

var _createReactClass2 = _interopRequireDefault(_createReactClass);

var _iconSettings = require("../../../../components/icon-settings");

var _iconSettings2 = _interopRequireDefault(_iconSettings);

var _popover = require("../../../../components/popover");

var _popover2 = _interopRequireDefault(_popover);

var _button = require("../../../../components/button");

var _button2 = _interopRequireDefault(_button);

var _icon = require("../../../../components/icon");

var _icon2 = _interopRequireDefault(_icon);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// `~` is replaced with design-system-react at runtime
var panelContent = _react2.default.createElement("div", null, _react2.default.createElement("dl", {
  className: "slds-popover__body-list"
}, _react2.default.createElement("dt", {
  className: "slds-m-bottom--small"
}, _react2.default.createElement("div", {
  className: "slds-media slds-media--center"
}, _react2.default.createElement("div", {
  className: "slds-media__figure"
}, _react2.default.createElement(_icon2.default, {
  assistiveText: {
    label: 'Opportunity Icon'
  },
  category: "standard",
  name: "opportunity",
  size: "small",
  tabIndex: "0"
})), _react2.default.createElement("div", {
  className: "slds-media__body"
}, _react2.default.createElement("p", {
  id: "ALTERNATIVE-HEADING",
  className: "slds-text-heading--small slds-hyphenate"
}, "Opportunities (1+)")))), _react2.default.createElement("dd", {
  className: "slds-tile"
}, _react2.default.createElement("p", {
  className: "slds-truncate",
  title: "Tesla - Mule ESB"
}, _react2.default.createElement("a", {
  href: "javascript:void(0);"
}, "Tesla - Mule ESB")), _react2.default.createElement("div", {
  className: "slds-tile__detail"
}, _react2.default.createElement("dl", {
  className: "slds-dl--horizontal slds-text-body--small"
}, _react2.default.createElement("dt", {
  className: "slds-dl--horizontal__label"
}, _react2.default.createElement("p", {
  className: "slds-truncate",
  title: "Value"
}, "Value")), _react2.default.createElement("dd", {
  className: "slds-dl--horizontal__detail slds-tile__meta"
}, _react2.default.createElement("p", {
  className: "slds-truncate",
  title: "$500,000"
}, "$500,000")), _react2.default.createElement("dt", {
  className: "slds-dl--horizontal__label"
}, _react2.default.createElement("p", {
  className: "slds-truncate",
  title: "Close Date"
}, "Close Date")), _react2.default.createElement("dd", {
  className: "slds-dl--horizontal__detail slds-tile__meta"
}, _react2.default.createElement("p", {
  className: "slds-truncate",
  title: "Dec 15, 2015"
}, "Dec 15, 2015"))))), _react2.default.createElement("dd", {
  className: "slds-m-top--x-small slds-text-align--right"
}, _react2.default.createElement("a", {
  href: "javascript:void(0);",
  title: "View all Opportunities"
}, "View All"))));

var Example = (0, _createReactClass2.default)({
  displayName: 'PopoverExample',
  render: function render() {
    return _react2.default.createElement(_iconSettings2.default, {
      iconPath: "/assets/icons"
    }, _react2.default.createElement("div", null, _react2.default.createElement(_popover2.default, {
      ariaLabelledby: "ALTERNATIVE-HEADING",
      body: panelContent
    }, _react2.default.createElement(_button2.default, {
      label: "Trigger Popover"
    }))));
  }
});
exports.default = Example; // export is replaced with `ReactDOM.render(<Example />, mountNode);` at runtime