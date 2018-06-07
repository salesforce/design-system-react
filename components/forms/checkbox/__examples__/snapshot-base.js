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
      label: "Checkbox",
      id: "checkbox-base-example"
    })), _react2.default.createElement("div", {
      className: "slds-col--padded"
    }, _react2.default.createElement(_checkbox2.default, {
      label: "Checkbox",
      id: "checkbox-base-example--error",
      errorText: "This field has an error"
    })), _react2.default.createElement("div", {
      className: "slds-col--padded"
    }, _react2.default.createElement(_checkbox2.default, {
      label: "Checkbox (disabled)",
      id: "checkbox-base-example--disabled",
      disabled: true
    })), _react2.default.createElement("div", {
      className: "slds-col--padded"
    }, _react2.default.createElement(_checkbox2.default, {
      label: "Checkbox (required)",
      id: "checkbox-base-example--required",
      required: true
    })), _react2.default.createElement("div", {
      className: "slds-col--padded"
    }, _react2.default.createElement(_checkbox2.default, {
      assistiveText: "Checkbox (with assistive text)",
      id: "checkbox-base-example--assistive-text"
    })), _react2.default.createElement("div", {
      className: "slds-col--padded"
    }, _react2.default.createElement(_checkbox2.default, {
      label: "Checkbox (checked)",
      id: "checkbox-base-example--checked",
      checked: true
    })), _react2.default.createElement("div", {
      className: "slds-col--padded"
    }, _react2.default.createElement(_checkbox2.default, {
      label: "Checkbox (checked + disabled)",
      id: "checkbox-base-example--checked-disabled",
      checked: true,
      disabled: true
    })), _react2.default.createElement("div", {
      className: "slds-col--padded"
    }, _react2.default.createElement(_checkbox2.default, {
      label: "Checkbox (indeterminate)",
      id: "checkbox-base-example--indeterminate",
      indeterminate: true
    })));
  }
});
exports.default = Example; // export is replaced with `ReactDOM.render(<Example />, mountNode);` at runtime