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
  displayName: 'InactiveInputExamples',
  render: function render() {
    return _react2.default.createElement(_iconSettings2.default, {
      iconPath: "/assets/icons"
    }, _react2.default.createElement("section", {
      className: "slds-grid slds-grid--pull-padded slds-grid--vertical-align-center"
    }, _react2.default.createElement("div", {
      className: "slds-col--padded"
    }, _react2.default.createElement("h1", {
      className: "slds-text-title_caps slds-p-vertical--medium"
    }, "Disabled Input"), _react2.default.createElement(_input2.default, {
      id: "disabled-input-id",
      label: "My Label",
      disabled: true,
      value: "Disabled value"
    })), _react2.default.createElement("div", {
      className: "slds-col--padded"
    }, _react2.default.createElement("h1", {
      className: "slds-text-title_caps slds-p-vertical--medium"
    }, "ReadOnly Input"), _react2.default.createElement(_input2.default, {
      id: "unique-id-3",
      label: "Input Label",
      readOnly: true,
      value: "Read Only Value"
    })), _react2.default.createElement("div", {
      className: "slds-col--padded"
    }, _react2.default.createElement("h1", {
      className: "slds-text-title_caps slds-p-vertical--medium"
    }, "Static Input"), _react2.default.createElement(_input2.default, {
      id: "unique-id-3",
      label: "Input Label",
      isStatic: true,
      value: "Read Only Value"
    }))));
  }
});
exports.default = Example; // export is replaced with `ReactDOM.render(<Example />, mountNode);` at runtime