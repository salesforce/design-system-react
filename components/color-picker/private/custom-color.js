"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _customColorForm = _interopRequireDefault(require("./custom-color-form"));

var _hsvColor = _interopRequireDefault(require("./hsv-color"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// using state to manage everything in here because multiple HSV coordinates
// can map to a single RGB coordinate and we lose that if we're always passing
// in a hex color
var CustomColor = /*#__PURE__*/function (_React$Component) {
  _inherits(CustomColor, _React$Component);

  var _super = _createSuper(CustomColor);

  function CustomColor() {
    _classCallCheck(this, CustomColor);

    return _super.apply(this, arguments);
  }

  _createClass(CustomColor, [{
    key: "render",
    value: function render() {
      var errorText;

      if (this.props.errorTextWorkingColor) {
        errorText = this.props.errorTextWorkingColor;
      } else if (this.props.color.errors && this.props.color.errors.hex) {
        errorText = this.props.labels.invalidColor;
      } else {
        errorText = this.props.labels.invalidComponent;
      }

      return /*#__PURE__*/_react.default.createElement("div", {
        className: "slds-color-picker__custom"
      }, /*#__PURE__*/_react.default.createElement(_hsvColor.default, {
        assistiveText: this.props.assistiveText,
        color: this.props.color,
        id: this.props.id,
        labels: this.props.labels,
        onHueChange: this.props.onHueChange,
        onSaturationValueChange: this.props.onSaturationValueChange,
        onSaturationNavigate: this.props.onSaturationNavigate,
        onValueNavigate: this.props.onValueNavigate,
        onSwatchChange: this.props.onSwatchChange,
        previousColor: this.props.previousColor
      }), /*#__PURE__*/_react.default.createElement(_customColorForm.default, {
        color: this.props.color,
        id: this.props.id,
        errorTextWorkingColor: this.props.errorTextWorkingColor,
        labels: this.props.labels,
        onBlueChange: this.props.onBlueChange,
        onGreenChange: this.props.onGreenChange,
        onHexChange: this.props.onHexChange,
        onRedChange: this.props.onRedChange
      }), this.props.errorTextWorkingColor || this.props.color.errors ? /*#__PURE__*/_react.default.createElement("p", {
        className: "slds-form-error slds-color-picker__input-custom-error",
        id: "color-picker-custom-error-".concat(this.props.id)
      }, errorText) : '');
    }
  }]);

  return CustomColor;
}(_react.default.Component);

_defineProperty(CustomColor, "displayName", 'SLDSCustomColor');

var _default = CustomColor;
exports.default = _default;