"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _swatch = require("./swatch");

var _swatch2 = _interopRequireDefault(_swatch);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var handleClick = function handleClick(event, _ref) {
  var hex = _ref.hex,
      onSelect = _ref.onSelect;
  event.preventDefault();
  onSelect(event, {
    hex: hex
  });
};

var selectedStyle = {
  border: '1px solid #9e9e9e',
  boxShadow: 'rgb(117, 112, 112) 1px 1px 1px',
  margin: '3px'
};

var SwatchOption =
/*#__PURE__*/
function (_React$Component) {
  _inherits(SwatchOption, _React$Component);

  function SwatchOption() {
    _classCallCheck(this, SwatchOption);

    return _possibleConstructorReturn(this, (SwatchOption.__proto__ || Object.getPrototypeOf(SwatchOption)).apply(this, arguments));
  }

  _createClass(SwatchOption, [{
    key: "render",
    value: function render() {
      var _this = this;

      return _react2.default.createElement("li", {
        className: "slds-color-picker__swatch",
        style: this.props.workingColor && this.props.workingColor.hex === this.props.color ? selectedStyle : {},
        role: "presentation"
      }, _react2.default.createElement("a", {
        "aria-selected": this.props.workingColor && this.props.workingColor.hex === this.props.color,
        className: "slds-color-picker__swatch-trigger",
        onClick: function onClick(event) {
          handleClick(event, {
            hex: _this.props.color,
            onSelect: _this.props.onSelect
          });
        },
        ref: this.props.swatchOptionRef,
        role: "option",
        tabIndex: this.props.tabIndex
      }, _react2.default.createElement(_swatch2.default, {
        color: this.props.color,
        labels: this.props.labels
      })));
    }
  }]);

  return SwatchOption;
}(_react2.default.Component);

Object.defineProperty(SwatchOption, "displayName", {
  configurable: true,
  enumerable: true,
  writable: true,
  value: 'SLDSSwatchOption'
});
exports.default = SwatchOption;