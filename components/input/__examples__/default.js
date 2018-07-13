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

var _input = require("../../../../components/input");

var _input2 = _interopRequireDefault(_input);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// `~` is replaced with design-system-react at runtime
var Example = (0, _createReactClass2.default)({
  displayName: 'BaseInputExample',
  render: function render() {
    return _react2.default.createElement(_iconSettings2.default, {
      iconPath: "/assets/icons"
    }, _react2.default.createElement("section", {
      className: "slds-grid slds-grid--pull-padded slds-grid--vertical-align-center"
    }, _react2.default.createElement("div", {
      className: "slds-col--padded"
    }, _react2.default.createElement("h1", {
      className: "slds-text-title_caps slds-p-vertical--medium"
    }, "Base Input with visible label"), _react2.default.createElement(_input2.default, {
      id: "base-id",
      label: "My Label",
      placeholder: "My placeholder"
    })), _react2.default.createElement("div", {
      className: "slds-col--padded"
    }, _react2.default.createElement("h1", {
      className: "slds-text-title_caps slds-p-vertical--medium"
    }, "Base Input with hidden label (assistive text)"), _react2.default.createElement(_input2.default, {
      assistiveText: {
        label: 'My label'
      },
      id: "assistiveLabel-id",
      placeholder: "My placeholder"
    })), _react2.default.createElement("div", {
      className: "slds-col--padded"
    }, _react2.default.createElement("h1", {
      className: "slds-text-title_caps slds-p-vertical--medium"
    }, "Base Input with Fixed Text"), _react2.default.createElement(_input2.default, {
      id: "fixed-text-id",
      fixedTextLeft: "$",
      label: "Total amount",
      placeholder: "Enter amount in USD"
    }))));
  }
});
exports.default = Example; // export is replaced with `ReactDOM.render(<Example />, mountNode);` at runtime