"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _slider = _interopRequireDefault(require("../../../../components/slider"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var DemoSlider =
/*#__PURE__*/
function (_React$Component) {
  _inherits(DemoSlider, _React$Component);

  function DemoSlider() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, DemoSlider);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(DemoSlider)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "state", {
      value: _this.props.value
    });

    _defineProperty(_assertThisInitialized(_this), "handleChange", function (event, _ref) {
      var value = _ref.value;

      _this.setState({
        value: value
      });
    });

    return _this;
  }

  _createClass(DemoSlider, [{
    key: "render",
    value: function render() {
      return _react.default.createElement(_slider.default, _extends({}, this.props, {
        value: this.state.value,
        onChange: this.handleChange
      }));
    }
  }]);

  return DemoSlider;
}(_react.default.Component);

_defineProperty(DemoSlider, "displayName", 'DemoSlider');

var Example =
/*#__PURE__*/
function (_React$Component2) {
  _inherits(Example, _React$Component2);

  function Example() {
    _classCallCheck(this, Example);

    return _possibleConstructorReturn(this, _getPrototypeOf(Example).apply(this, arguments));
  }

  _createClass(Example, [{
    key: "render",
    value: function render() {
      return _react.default.createElement("section", null, _react.default.createElement("ol", null, _react.default.createElement("li", {
        className: "slds-p-bottom_large"
      }, _react.default.createElement("h1", {
        className: "slds-text-title_caps slds-p-vertical_medium"
      }, "1. Base Input with label"), _react.default.createElement(DemoSlider, {
        id: "base-id",
        label: "My Label",
        value: 0
      })), _react.default.createElement("li", {
        className: "slds-p-bottom_large"
      }, _react.default.createElement("h1", {
        className: "slds-text-title_caps slds-p-vertical_medium"
      }, "2. Base Input with no label (assistive text)"), _react.default.createElement(DemoSlider, {
        id: "assistiveText-id",
        assistiveText: {
          label: 'My Label'
        },
        value: 0
      })), _react.default.createElement("li", {
        className: "slds-p-bottom_large"
      }, _react.default.createElement("h1", {
        className: "slds-text-title_caps slds-p-vertical_medium"
      }, "3. Base Input with min and max."), _react.default.createElement(DemoSlider, {
        id: "min-max-id",
        label: "My Label",
        min: 0,
        max: 400,
        value: 200
      })), _react.default.createElement("li", {
        className: "slds-p-bottom_large"
      }, _react.default.createElement("h1", {
        className: "slds-text-title_caps slds-p-vertical_medium"
      }, "4. Base Input with min, max and step."), _react.default.createElement(DemoSlider, {
        id: "min-max-step-id",
        label: "My Label",
        min: 0,
        max: 400,
        step: 100,
        value: 200
      }))));
    }
  }]);

  return Example;
}(_react.default.Component);

_defineProperty(Example, "displayName", 'SliderExample');

var _default = Example;
exports.default = _default;