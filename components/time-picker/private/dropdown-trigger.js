"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _input = _interopRequireDefault(require("../../input"));

var _keyCode = _interopRequireDefault(require("../../../utilities/key-code"));

var _constants = require("../../../utilities/constants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

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

/**
 *  Component description.
 */
var TimepickerDropdownTrigger = /*#__PURE__*/function (_React$Component) {
  _inherits(TimepickerDropdownTrigger, _React$Component);

  var _super = _createSuper(TimepickerDropdownTrigger);

  function TimepickerDropdownTrigger() {
    var _this;

    _classCallCheck(this, TimepickerDropdownTrigger);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));

    _defineProperty(_assertThisInitialized(_this), "handleKeyDown", function (event) {
      if (_this.props.onKeyDown && event.keyCode) {
        if (event.keyCode === _keyCode.default.ENTER || event.keyCode === _keyCode.default.DOWN || event.keyCode === _keyCode.default.UP || event.keyCode === _keyCode.default.ESCAPE) {
          _this.props.onKeyDown(event);
        }
      }
    });

    return _this;
  }

  _createClass(TimepickerDropdownTrigger, [{
    key: "render",
    value: // ### Render
    function render() {
      var _this$props = this.props,
          iconRight = _this$props.iconRight,
          menu = _this$props.menu,
          onBlur = _this$props.onBlur,
          onFocus = _this$props.onFocus,
          onKeyDown = _this$props.onKeyDown,
          onMouseDown = _this$props.onMouseDown,
          triggerRef = _this$props.triggerRef,
          props = _objectWithoutProperties(_this$props, ["iconRight", "menu", "onBlur", "onFocus", "onKeyDown", "onMouseDown", "triggerRef"]);

      return (
        /*#__PURE__*/

        /* eslint-disable jsx-a11y/no-static-element-interactions */
        _react.default.createElement("div", {
          onBlur: onBlur,
          onFocus: onFocus,
          onKeyDown: this.handleKeyDown,
          onMouseDown: onMouseDown
        }, /*#__PURE__*/_react.default.createElement(_input.default, _extends({
          iconRight: iconRight
        }, props, {
          inputRef: triggerRef
        }), menu))
      );
    }
  }]);

  return TimepickerDropdownTrigger;
}(_react.default.Component);

_defineProperty(TimepickerDropdownTrigger, "displayName", _constants.MENU_DROPDOWN_TRIGGER);

_defineProperty(TimepickerDropdownTrigger, "propTypes", {
  /**
   * Icon for right side of trigger
   */
  iconRight: _propTypes.default.node,

  /**
   * A unique ID is needed in order to support keyboard navigation, ARIA support, and connect the dropdown to the triggering input.
   */
  id: _propTypes.default.string,

  /**
   * This label appears above the input.
   */
  label: _propTypes.default.string,

  /**
   * The dropdown menu.
   */
  menu: _propTypes.default.node,

  /**
   * Is only called when `openOn` is set to `hover` and when the triggering input loses focus.
   */
  onBlur: _propTypes.default.func,

  /**
   * This prop is passed onto the triggering `Input`. Triggered when the trigger input is clicked.
   */
  onClick: _propTypes.default.func,

  /**
   * Is only called when `openOn` is set to `hover` and when the triggering input gains focus.
   */
  onFocus: _propTypes.default.func,

  /**
   * Called when a key pressed.
   */
  onKeyDown: _propTypes.default.func,

  /**
   * Called when mouse clicks down on the trigger input.
   */
  onMouseDown: _propTypes.default.func,

  /**
   * The ref of the actual triggering input.
   */
  triggerRef: _propTypes.default.func,

  /**
   * Date
   */
  value: _propTypes.default.string
});

var _default = TimepickerDropdownTrigger;
exports.default = _default;