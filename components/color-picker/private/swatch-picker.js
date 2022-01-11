"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _lodash = _interopRequireDefault(require("lodash.findindex"));

var _swatchOption = _interopRequireDefault(require("./swatch-option"));

var _keyCode = _interopRequireDefault(require("../../../utilities/key-code"));

var _event = _interopRequireDefault(require("../../../utilities/event"));

var _UNSAFE_direction = require("../../utilities/UNSAFE_direction");

var _languageDirection = _interopRequireDefault(require("../../utilities/UNSAFE_direction/private/language-direction"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

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

var SwatchPicker = /*#__PURE__*/function (_React$Component) {
  _inherits(SwatchPicker, _React$Component);

  var _super = _createSuper(SwatchPicker);

  function SwatchPicker(_props) {
    var _this;

    _classCallCheck(this, SwatchPicker);

    _this = _super.call(this, _props);

    _defineProperty(_assertThisInitialized(_this), "selectPreviousColor", function (event, props) {
      var index = (0, _lodash.default)(props.swatchColors, function (item) {
        return item === props.color.hex;
      });
      var nextIndex = index === -1 || index === props.swatchColors.length - 1 ? 0 : index + 1;
      var prevColor = props.swatchColors[nextIndex];
      props.onSelect(event, {
        hex: prevColor
      });

      _this.swatchColorRefs[prevColor].focus();
    });

    _defineProperty(_assertThisInitialized(_this), "selectNextColor", function (event, props) {
      var index = (0, _lodash.default)(props.swatchColors, function (item) {
        return item === props.color.hex;
      });
      var prevIndex;

      if (index === 0) {
        prevIndex = props.swatchColors.length - 1;
      } else if (index === -1) {
        prevIndex = 0;
      } else {
        prevIndex = index - 1;
      }

      var nextColor = props.swatchColors[prevIndex];
      props.onSelect(event, {
        hex: nextColor
      });

      _this.swatchColorRefs[nextColor].focus();
    });

    _defineProperty(_assertThisInitialized(_this), "handleKeyDown", function (event, props) {
      var _keyDownCallbacks;

      var keyDownCallbacks = (_keyDownCallbacks = {}, _defineProperty(_keyDownCallbacks, _keyCode.default.RIGHT, function () {
        if (props.direction === _UNSAFE_direction.DIRECTIONS.RTL) {
          _this.selectNextColor(event, props);
        } else {
          _this.selectPreviousColor(event, props);
        }
      }), _defineProperty(_keyDownCallbacks, _keyCode.default.DOWN, function () {
        _this.selectPreviousColor(event, props);
      }), _defineProperty(_keyDownCallbacks, _keyCode.default.LEFT, function () {
        if (props.direction === _UNSAFE_direction.DIRECTIONS.RTL) {
          _this.selectPreviousColor(event, props);
        } else {
          _this.selectNextColor(event, props);
        }
      }), _defineProperty(_keyDownCallbacks, _keyCode.default.UP, function () {
        _this.selectNextColor(event, props);
      }), _keyDownCallbacks);

      if (event.keyCode) {
        if (keyDownCallbacks[event.keyCode]) {
          _event.default.trapEvent(event);

          keyDownCallbacks[event.keyCode]();
        }
      }
    });

    _defineProperty(_assertThisInitialized(_this), "addRef", function (color) {
      return function (el) {
        _this.swatchColorRefs[color] = el;
      };
    });

    _this.swatchColorRefs = {};
    return _this;
  }

  _createClass(SwatchPicker, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      var isSelectedColorInSwatch = this.props.swatchColors.includes(this.props.color.hex);
      return /*#__PURE__*/_react.default.createElement("ul", {
        className: "slds-color-picker__swatches",
        role: "listbox",
        onKeyDown: function onKeyDown(event) {
          _this2.handleKeyDown(event, _objectSpread({}, _this2.props));
        }
      }, this.props.swatchColors.map(function (color, index) {
        return /*#__PURE__*/_react.default.createElement(_swatchOption.default, {
          color: color,
          key: color,
          labels: _this2.props.labels,
          onSelect: _this2.props.onSelect,
          swatchOptionRef: _this2.addRef(color),
          workingColor: _this2.props.color,
          tabIndex: _this2.props.color && _this2.props.color.hex === color || index === 0 && !isSelectedColorInSwatch ? 0 : -1
        });
      }));
    }
  }]);

  return SwatchPicker;
}(_react.default.Component);

_defineProperty(SwatchPicker, "displayName", 'SLDSSwatchPicker');

var _default = (0, _languageDirection.default)(SwatchPicker);

exports.default = _default;