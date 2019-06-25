"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _visualPicker = _interopRequireDefault(require("../../../../components/visual-picker"));

var _components = require("../../../../components");

var _iconSettings = _interopRequireDefault(require("../../../../components/icon-settings"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var Example =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Example, _React$Component);

  function Example() {
    _classCallCheck(this, Example);

    return _possibleConstructorReturn(this, _getPrototypeOf(Example).apply(this, arguments));
  }

  _createClass(Example, [{
    key: "render",
    value: function render() {
      return _react.default.createElement(_iconSettings.default, {
        iconPath: "/assets/icons"
      }, _react.default.createElement("div", {
        style: {
          padding: '4rem 1rem 0px',
          background: 'rgb(244, 246, 249)'
        }
      }, _react.default.createElement("h1", null, "Radio"), _react.default.createElement(_visualPicker.default, {
        label: "Please Select Any One",
        id: "visual-picker-non-coverable-radio"
      }, _react.default.createElement(_components.Radio, {
        labels: {
          heading: 'Lightning Professional',
          label: 'Complete service CRM for teams of any size'
        },
        id: "visual-picker-non-coverable-radio-1",
        value: "30",
        onRenderVisualPicker: function onRenderVisualPicker() {
          return _react.default.createElement("span", null, _react.default.createElement("span", {
            className: "slds-text-heading_large"
          }, "$30"), _react.default.createElement("span", {
            className: "slds-text-title"
          }, "USD/user/month *"));
        }
      }), _react.default.createElement(_components.Radio, {
        labels: {
          heading: 'Lightning Enterprise',
          label: 'Everything you need to take support to the next level'
        },
        id: "visual-picker-non-coverable-radio-2",
        value: "150",
        onRenderVisualPicker: function onRenderVisualPicker() {
          return _react.default.createElement("span", null, _react.default.createElement("span", {
            className: "slds-text-heading_large"
          }, "$150"), _react.default.createElement("span", {
            className: "slds-text-title"
          }, "USD/user/month *"));
        }
      }), _react.default.createElement(_components.Radio, {
        labels: {
          heading: 'Lightning Ultimate',
          label: 'Complete support with enterprise-grade customization'
        },
        id: "visual-picker-non-coverable-radio-3",
        disabled: true,
        value: "300",
        onRenderVisualPicker: function onRenderVisualPicker() {
          return _react.default.createElement("span", null, _react.default.createElement("span", {
            className: "slds-text-heading_large"
          }, "$300"), _react.default.createElement("span", {
            className: "slds-text-title"
          }, "USD/user/month *"));
        }
      })), _react.default.createElement("hr", null), _react.default.createElement("h1", null, "Checkbox"), _react.default.createElement(_visualPicker.default, {
        label: "Add the following object(s)",
        id: "visual-picker-non-coverable-checkbox"
      }, _react.default.createElement(_components.Checkbox, {
        labels: {
          heading: 'Lightning Professional',
          label: 'Complete service CRM for teams of any size'
        },
        id: "visual-picker-non-coverable-checkbox-1",
        value: "30",
        onRenderVisualPicker: function onRenderVisualPicker() {
          return _react.default.createElement("span", null, _react.default.createElement("span", {
            className: "slds-text-heading_large"
          }, "$30"), _react.default.createElement("span", {
            className: "slds-text-title"
          }, "USD/user/month *"));
        }
      }), _react.default.createElement(_components.Checkbox, {
        labels: {
          heading: 'Lightning Enterprise',
          label: 'Everything you need to take support to the next level'
        },
        id: "visual-picker-non-coverable-checkbox-2",
        value: "150",
        onRenderVisualPicker: function onRenderVisualPicker() {
          return _react.default.createElement("span", null, _react.default.createElement("span", {
            className: "slds-text-heading_large"
          }, "$150"), _react.default.createElement("span", {
            className: "slds-text-title"
          }, "USD/user/month *"));
        }
      }), _react.default.createElement(_components.Checkbox, {
        labels: {
          heading: 'Lightning Ultimate',
          label: 'Complete support with enterprise-grade customization'
        },
        id: "visual-picker-non-coverable-checkbox-3",
        disabled: true,
        value: "300",
        onRenderVisualPicker: function onRenderVisualPicker() {
          return _react.default.createElement("span", null, _react.default.createElement("span", {
            className: "slds-text-heading_large"
          }, "$300"), _react.default.createElement("span", {
            className: "slds-text-title"
          }, "USD/user/month *"));
        }
      }))));
    }
  }]);

  return Example;
}(_react.default.Component);

Example.displayName = 'VisualPickerNonCoverable';
var _default = Example; // export is replaced with `ReactDOM.render(<Example />, mountNode);` at runtime

exports.default = _default;