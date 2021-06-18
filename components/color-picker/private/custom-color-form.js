"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _classnames = _interopRequireDefault(require("classnames"));

var _input = _interopRequireDefault(require("../../input"));

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

var CustomColorForm = /*#__PURE__*/function (_React$Component) {
  _inherits(CustomColorForm, _React$Component);

  var _super = _createSuper(CustomColorForm);

  function CustomColorForm() {
    _classCallCheck(this, CustomColorForm);

    return _super.apply(this, arguments);
  }

  _createClass(CustomColorForm, [{
    key: "render",
    value: function render() {
      var describedBy;

      if (this.props.errorTextWorkingColor || this.props.color.errors) {
        describedBy = "color-picker-custom-error-".concat(this.props.id);
      }

      return /*#__PURE__*/_react.default.createElement("div", {
        className: "slds-color-picker__custom-inputs"
      }, /*#__PURE__*/_react.default.createElement(_input.default, {
        "aria-describedby": describedBy,
        className: (0, _classnames.default)('slds-color-picker__input-custom-hex', {
          'slds-has-error': this.props.color.errors && this.props.color.errors.hex
        }),
        id: "color-picker-input-hex-".concat(this.props.id),
        label: this.props.labels.hexLabel,
        maxLength: "7",
        onChange: this.props.onHexChange,
        value: this.props.color.hex
      }), /*#__PURE__*/_react.default.createElement(_input.default, {
        "aria-describedby": describedBy,
        className: (0, _classnames.default)('slds-color-picker__input-custom-r', {
          'slds-has-error': this.props.color.errors && this.props.color.errors.red
        }),
        id: "color-picker-input-r-".concat(this.props.id),
        label: this.props.labels.redAbbreviated,
        onChange: this.props.onRedChange,
        maxLength: "3",
        value: String(this.props.color.rgb.red)
      }), /*#__PURE__*/_react.default.createElement(_input.default, {
        "aria-describedby": describedBy,
        className: (0, _classnames.default)('slds-color-picker__input-custom-g', {
          'slds-has-error': this.props.color.errors && this.props.color.errors.green
        }),
        id: "color-picker-input-g-".concat(this.props.id),
        label: this.props.labels.greenAbbreviated,
        onChange: this.props.onGreenChange,
        maxLength: "3",
        value: String(this.props.color.rgb.green)
      }), /*#__PURE__*/_react.default.createElement(_input.default, {
        "aria-describedby": describedBy,
        className: (0, _classnames.default)('slds-color-picker__input-custom-b', {
          'slds-has-error': this.props.color.errors && this.props.color.errors.blue
        }),
        id: "color-picker-input-b-".concat(this.props.id),
        label: this.props.labels.blueAbbreviated,
        onChange: this.props.onBlueChange,
        maxLength: "3",
        value: String(this.props.color.rgb.blue)
      }));
    }
  }]);

  return CustomColorForm;
}(_react.default.Component);

_defineProperty(CustomColorForm, "displayName", 'SLDSCustomColorForm');

var _default = CustomColorForm;
exports.default = _default;