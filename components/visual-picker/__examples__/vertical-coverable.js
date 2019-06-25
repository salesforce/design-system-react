"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _visualPicker = _interopRequireDefault(require("../../../../components/visual-picker"));

var _components = require("../../../../components");

var _icon = _interopRequireDefault(require("../../../../components/icon"));

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
      var _this = this;

      return _react.default.createElement(_iconSettings.default, {
        iconPath: "/assets/icons"
      }, _react.default.createElement("div", {
        style: {
          padding: '4rem 1rem 0px',
          background: 'rgb(244, 246, 249)'
        }
      }, _react.default.createElement("h1", null, "Radio"), _react.default.createElement(_visualPicker.default, {
        label: "Select any one",
        coverable: true,
        vertical: true,
        id: "visual-picker-vertical-coverable-radio"
      }, _react.default.createElement(_components.Radio, {
        id: "visual-picker-vertical-coverable-radio-1",
        onRenderVisualPickerSelected: function onRenderVisualPickerSelected() {
          return _react.default.createElement(_icon.default, {
            assistiveText: {
              label: 'connected_apps_checked'
            },
            category: "utility",
            name: "check",
            colorVariant: "base",
            size: "large"
          });
        },
        onRenderVisualPickerNotSelected: function onRenderVisualPickerNotSelected() {
          return _react.default.createElement(_icon.default, {
            assistiveText: _this.props.assistiveText,
            category: "utility",
            name: "connected_apps",
            size: "large"
          });
        }
      }), _react.default.createElement(_components.Radio, {
        id: "visual-picker-vertical-coverable-radio-2",
        onRenderVisualPickerSelected: function onRenderVisualPickerSelected() {
          return _react.default.createElement(_icon.default, {
            assistiveText: {
              label: 'custom_apps_checked'
            },
            category: "utility",
            name: "check",
            colorVariant: "base",
            size: "large"
          });
        },
        onRenderVisualPickerNotSelected: function onRenderVisualPickerNotSelected() {
          return _react.default.createElement(_icon.default, {
            assistiveText: _this.props.assistiveText,
            category: "utility",
            name: "custom_apps",
            size: "large"
          });
        }
      })), _react.default.createElement("hr", null), _react.default.createElement("h1", null, "Checkbox"), _react.default.createElement(_visualPicker.default, {
        label: "Add the following object(s)",
        coverable: true,
        vertical: true,
        id: "visual-picker-vertical-coverable-checkbox"
      }, _react.default.createElement(_components.Checkbox, {
        label: "Account",
        id: "visual-picker-vertical-coverable-checkbox-1",
        onRenderVisualPickerSelected: function onRenderVisualPickerSelected() {
          return _react.default.createElement(_icon.default, {
            assistiveText: {
              label: 'account_checked'
            },
            category: "utility",
            name: "check",
            colorVariant: "base",
            size: "large"
          });
        },
        onRenderVisualPickerNotSelected: function onRenderVisualPickerNotSelected() {
          return _react.default.createElement(_icon.default, {
            assistiveText: _this.props.assistiveText,
            category: "standard",
            name: "account",
            size: "large"
          });
        }
      }), _react.default.createElement(_components.Checkbox, {
        label: "Lead",
        id: "visual-picker-vertical-coverable-checkbox-2",
        onRenderVisualPickerSelected: function onRenderVisualPickerSelected() {
          return _react.default.createElement(_icon.default, {
            assistiveText: {
              label: 'lead_checked'
            },
            category: "utility",
            name: "check",
            colorVariant: "base",
            size: "large"
          });
        },
        onRenderVisualPickerNotSelected: function onRenderVisualPickerNotSelected() {
          return _react.default.createElement(_icon.default, {
            assistiveText: _this.props.assistiveText,
            category: "standard",
            name: "lead",
            size: "large"
          });
        }
      }), _react.default.createElement(_components.Checkbox, {
        label: "Orders",
        id: "visual-picker-vertical-coverable-checkbox-3",
        onRenderVisualPickerSelected: function onRenderVisualPickerSelected() {
          return _react.default.createElement(_icon.default, {
            assistiveText: {
              label: 'orders_checked'
            },
            category: "utility",
            name: "check",
            colorVariant: "base",
            size: "large"
          });
        },
        onRenderVisualPickerNotSelected: function onRenderVisualPickerNotSelected() {
          return _react.default.createElement(_icon.default, {
            assistiveText: _this.props.assistiveText,
            category: "standard",
            name: "orders",
            size: "large"
          });
        }
      }))));
    }
  }]);

  return Example;
}(_react.default.Component);

Example.displayName = 'VisualPickerCoverable';
var _default = Example; // export is replaced with `ReactDOM.render(<Example />, mountNode);` at runtime

exports.default = _default;