"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _createReactClass = require("create-react-class");

var _createReactClass2 = _interopRequireDefault(_createReactClass);

var _iconSettings = require("../../../../../components/icon-settings");

var _iconSettings2 = _interopRequireDefault(_iconSettings);

var _checkbox = require("../../../../../components/forms/checkbox");

var _checkbox2 = _interopRequireDefault(_checkbox);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// `~` is replaced with design-system-react at runtime
var Example = (0, _createReactClass2.default)({
  displayName: 'CheckboxExample',
  render: function render() {
    return _react2.default.createElement(_iconSettings2.default, {
      iconPath: "/assets/icons"
    }, _react2.default.createElement("div", {
      className: "slds-grid slds-grid--pull-padded slds-grid--vertical-align-center"
    }, _react2.default.createElement("div", {
      className: "slds-col--padded"
    }, _react2.default.createElement(_checkbox2.default, {
      assistiveText: "Error state",
      errorText: "This field is required",
      label: "Checkbox Label"
    })), _react2.default.createElement("div", {
      className: "slds-col--padded"
    }, _react2.default.createElement(_checkbox2.default, {
      assistiveText: "Indeterminate",
      indeterminate: true,
      label: "Indeterminate"
    })), _react2.default.createElement("div", {
      className: "slds-col--padded"
    }, _react2.default.createElement(_checkbox2.default, {
      assistiveText: "Indeterminate",
      label: "Required",
      required: true
    })), _react2.default.createElement("div", {
      className: "slds-col--padded"
    }, _react2.default.createElement(_checkbox2.default, {
      assistiveText: "Disabled",
      label: "Disabled",
      disabled: true
    }))));
  }
});
exports.default = Example; // export is replaced with `ReactDOM.render(<Example />, mountNode);` at runtime