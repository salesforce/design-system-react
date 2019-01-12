"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _customColorForm = require("./custom-color-form");

var _customColorForm2 = _interopRequireDefault(_customColorForm);

var _hsvColor = require("./hsv-color");

var _hsvColor2 = _interopRequireDefault(_hsvColor);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// using state to manage everything in here because multiple HSV coordinates
// can map to a single RGB coordinate and we lose that if we're always passing
// in a hex color
var CustomColor =
/*#__PURE__*/
function (_React$Component) {
  _inherits(CustomColor, _React$Component);

  function CustomColor() {
    _classCallCheck(this, CustomColor);

    return _possibleConstructorReturn(this, (CustomColor.__proto__ || Object.getPrototypeOf(CustomColor)).apply(this, arguments));
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

      return _react2.default.createElement("div", {
        className: "slds-color-picker__custom"
      }, _react2.default.createElement(_hsvColor2.default, {
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
      }), _react2.default.createElement(_customColorForm2.default, {
        color: this.props.color,
        id: this.props.id,
        labels: this.props.labels,
        onBlueChange: this.props.onBlueChange,
        onGreenChange: this.props.onGreenChange,
        onHexChange: this.props.onHexChange,
        onRedChange: this.props.onRedChange
      }), this.props.errorTextWorkingColor || this.props.color.errors ? _react2.default.createElement("p", {
        className: "slds-form-error slds-color-picker__input-custom-error",
        id: "color-picker-custom-error-".concat(this.props.id)
      }, errorText) : '');
    }
  }]);

  return CustomColor;
}(_react2.default.Component);

Object.defineProperty(CustomColor, "displayName", {
  configurable: true,
  enumerable: true,
  writable: true,
  value: 'SLDSCustomColor'
});
exports.default = CustomColor;