"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _lodash = require("lodash.findindex");

var _lodash2 = _interopRequireDefault(_lodash);

var _swatchOption = require("./swatch-option");

var _swatchOption2 = _interopRequireDefault(_swatchOption);

var _keyCode = require("../../../utilities/key-code");

var _keyCode2 = _interopRequireDefault(_keyCode);

var _event = require("../../../utilities/event");

var _event2 = _interopRequireDefault(_event);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

var SwatchPicker =
/*#__PURE__*/
function (_React$Component) {
  _inherits(SwatchPicker, _React$Component);

  function SwatchPicker(props) {
    var _this;

    _classCallCheck(this, SwatchPicker);

    _this = _possibleConstructorReturn(this, (SwatchPicker.__proto__ || Object.getPrototypeOf(SwatchPicker)).call(this, props));

    _initialiseProps.call(_assertThisInitialized(_this));

    _this.swatchColorRefs = {};
    return _this;
  }

  _createClass(SwatchPicker, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      var isSelectedColorInSwatch = this.props.swatchColors.includes(this.props.color.hex);
      return _react2.default.createElement("ul", {
        className: "slds-color-picker__swatches",
        role: "listbox",
        onKeyDown: function onKeyDown(event) {
          _this2.handleKeyDown(event, _objectSpread({}, _this2.props));
        }
      }, this.props.swatchColors.map(function (color, index) {
        return _react2.default.createElement(_swatchOption2.default, {
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
}(_react2.default.Component);

Object.defineProperty(SwatchPicker, "displayName", {
  configurable: true,
  enumerable: true,
  writable: true,
  value: 'SLDSSwatchPicker'
});

var _initialiseProps = function _initialiseProps() {
  var _this3 = this;

  Object.defineProperty(this, "selectPreviousColor", {
    configurable: true,
    enumerable: true,
    writable: true,
    value: function value(event, props) {
      var index = (0, _lodash2.default)(props.swatchColors, function (item) {
        return item === props.color.hex;
      });
      var nextIndex = index === -1 || index === props.swatchColors.length - 1 ? 0 : index + 1;
      var prevColor = props.swatchColors[nextIndex];
      props.onSelect(event, {
        hex: prevColor
      });

      _this3.swatchColorRefs[prevColor].focus();
    }
  });
  Object.defineProperty(this, "selectNextColor", {
    configurable: true,
    enumerable: true,
    writable: true,
    value: function value(event, props) {
      var index = (0, _lodash2.default)(props.swatchColors, function (item) {
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

      _this3.swatchColorRefs[nextColor].focus();
    }
  });
  Object.defineProperty(this, "handleKeyDown", {
    configurable: true,
    enumerable: true,
    writable: true,
    value: function value(event, props) {
      var _keyDownCallbacks;

      var keyDownCallbacks = (_keyDownCallbacks = {}, _defineProperty(_keyDownCallbacks, _keyCode2.default.RIGHT, function () {
        _this3.selectPreviousColor(event, props);
      }), _defineProperty(_keyDownCallbacks, _keyCode2.default.DOWN, function () {
        _this3.selectPreviousColor(event, props);
      }), _defineProperty(_keyDownCallbacks, _keyCode2.default.LEFT, function () {
        _this3.selectNextColor(event, props);
      }), _defineProperty(_keyDownCallbacks, _keyCode2.default.UP, function () {
        _this3.selectNextColor(event, props);
      }), _keyDownCallbacks);

      if (event.keyCode) {
        if (keyDownCallbacks[event.keyCode]) {
          _event2.default.trapEvent(event);

          keyDownCallbacks[event.keyCode]();
        }
      }
    }
  });
  Object.defineProperty(this, "addRef", {
    configurable: true,
    enumerable: true,
    writable: true,
    value: function value(color) {
      return function (el) {
        _this3.swatchColorRefs[color] = el;
      };
    }
  });
};

exports.default = SwatchPicker;