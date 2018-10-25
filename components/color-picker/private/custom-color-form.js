"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _classnames = require("classnames");

var _classnames2 = _interopRequireDefault(_classnames);

var _input = require("../../input");

var _input2 = _interopRequireDefault(_input);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CustomColorForm =
/*#__PURE__*/
function (_React$Component) {
  _inherits(CustomColorForm, _React$Component);

  function CustomColorForm() {
    _classCallCheck(this, CustomColorForm);

    return _possibleConstructorReturn(this, (CustomColorForm.__proto__ || Object.getPrototypeOf(CustomColorForm)).apply(this, arguments));
  }

  _createClass(CustomColorForm, [{
    key: "render",
    value: function render() {
      return _react2.default.createElement("div", {
        className: "slds-color-picker__custom-inputs"
      }, _react2.default.createElement(_input2.default, {
        "aria-describedby": "color-picker-custom-error-".concat(this.props.id),
        className: (0, _classnames2.default)('slds-color-picker__input-custom-hex', {
          'slds-has-error': this.props.color.errors && this.props.color.errors.hex
        }),
        id: "color-picker-input-hex-".concat(this.props.id),
        label: this.props.labels.hexLabel,
        maxLength: "7",
        onChange: this.props.onHexChange,
        value: this.props.color.hex
      }), _react2.default.createElement(_input2.default, {
        "aria-describedby": "color-picker-custom-error-".concat(this.props.id),
        className: (0, _classnames2.default)('slds-color-picker__input-custom-r', {
          'slds-has-error': this.props.color.errors && this.props.color.errors.red
        }),
        id: "color-picker-input-r-".concat(this.props.id),
        label: this.props.labels.redAbbreviated,
        onChange: this.props.onRedChange,
        maxLength: "3",
        value: String(this.props.color.rgb.red)
      }), _react2.default.createElement(_input2.default, {
        "aria-describedby": "color-picker-custom-error-".concat(this.props.id),
        className: (0, _classnames2.default)('slds-color-picker__input-custom-g', {
          'slds-has-error': this.props.color.errors && this.props.color.errors.green
        }),
        id: "color-picker-input-g-".concat(this.props.id),
        label: this.props.labels.greenAbbreviated,
        onChange: this.props.onGreenChange,
        maxLength: "3",
        value: String(this.props.color.rgb.green)
      }), _react2.default.createElement(_input2.default, {
        "aria-describedby": "color-picker-custom-error-".concat(this.props.id),
        className: (0, _classnames2.default)('slds-color-picker__input-custom-b', {
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
}(_react2.default.Component);

Object.defineProperty(CustomColorForm, "displayName", {
  configurable: true,
  enumerable: true,
  writable: true,
  value: 'SLDSCustomColorForm'
});
exports.default = CustomColorForm;