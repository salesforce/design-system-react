"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _createReactClass = require("create-react-class");

var _createReactClass2 = _interopRequireDefault(_createReactClass);

var _checkbox = require("../../../../../components/forms/checkbox");

var _checkbox2 = _interopRequireDefault(_checkbox);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// `~` is replaced with design-system-react at runtime
var Example = (0, _createReactClass2.default)({
  displayName: 'CheckboxExample',
  render: function render() {
    return _react2.default.createElement("div", {
      className: "slds-grid slds-grid--pull-padded slds-grid--vertical-align-center"
    }, _react2.default.createElement("div", {
      className: "slds-col--padded"
    }, _react2.default.createElement(_checkbox2.default, {
      label: "Toggle",
      id: "checkbox-toggle-example",
      variant: "toggle"
    })), _react2.default.createElement("div", {
      className: "slds-col--padded"
    }, _react2.default.createElement(_checkbox2.default, {
      label: "Toggle",
      id: "checkbox-toggle-example--error",
      errorText: "This field has an error",
      variant: "toggle"
    })), _react2.default.createElement("div", {
      className: "slds-col--padded"
    }, _react2.default.createElement(_checkbox2.default, {
      label: "Toggle (disabled)",
      id: "checkbox-toggle-example--disabled",
      variant: "toggle",
      disabled: true
    })), _react2.default.createElement("div", {
      className: "slds-col--padded"
    }, _react2.default.createElement(_checkbox2.default, {
      label: "Toggle (required)",
      id: "checkbox-toggle-example--required",
      variant: "toggle",
      required: true
    })), _react2.default.createElement("div", {
      className: "slds-col--padded"
    }, _react2.default.createElement(_checkbox2.default, {
      assistiveText: "Toggle (with assistive text)",
      id: "checkbox-toggle-example--assitive-text",
      variant: "toggle"
    })), _react2.default.createElement("div", {
      className: "slds-col--padded"
    }, _react2.default.createElement(_checkbox2.default, {
      label: "Toggle (checked)",
      id: "checkbox-toggle-example--checked",
      variant: "toggle",
      checked: true
    })), _react2.default.createElement("div", {
      className: "slds-col--padded"
    }, _react2.default.createElement(_checkbox2.default, {
      id: "checkbox-toggle-example--checked-disabled",
      label: "Toggle (checked + disabled)",
      variant: "toggle",
      checked: true,
      disabled: true
    })));
  }
});
exports.default = Example; // export is replaced with `ReactDOM.render(<Example />, mountNode);` at runtime