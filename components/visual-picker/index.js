"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _shortid = _interopRequireDefault(require("shortid"));

var _constants = require("../../utilities/constants");

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

var propTypes = {
  /**
   * HTML id for component.
   */
  id: _propTypes.default.string,

  /**
   * Visual Picker accepts `Checkbox`, `Radio` and `VisualPickerLink` components as children. Please see `Checkbox`, `Radio` and `VisualPickerLink` for props.
   */
  children: _propTypes.default.node,

  /**
   * CSS classes to be added to tag with `.slds-form-element`. Uses `classNames` [API](https://github.com/JedWatson/classnames).
   */
  className: _propTypes.default.oneOfType([_propTypes.default.array, _propTypes.default.object, _propTypes.default.string]),

  /**
   *  Label for the visual picker
   */
  label: _propTypes.default.string,

  /**
   *  Whether the visual picker is coverable on selection
   */
  coverable: _propTypes.default.bool,

  /**
   *  Whether the visual picker has a vertical layout
   */
  vertical: _propTypes.default.bool,

  /**
   * Whether the visual picker has links as children
   */
  links: _propTypes.default.bool,

  /**
   *  Size for visual picker
   */
  size: _propTypes.default.oneOf(['medium', 'large'])
};
var defaultProps = {
  size: 'medium',
  vertical: false,
  links: false
};
/**
 * Visual Picker Component
 */

var VisualPicker = /*#__PURE__*/function (_React$Component) {
  _inherits(VisualPicker, _React$Component);

  var _super = _createSuper(VisualPicker);

  function VisualPicker(props) {
    var _this;

    _classCallCheck(this, VisualPicker);

    _this = _super.call(this, props);
    _this.generatedId = _shortid.default.generate();
    return _this;
  }

  _createClass(VisualPicker, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      var options = _react.default.Children.map(this.props.children, function (option, index) {
        return /*#__PURE__*/_react.default.cloneElement(option, {
          index: "".concat(_this2.props.id || _this2.generatedId, "-").concat(index),
          coverable: _this2.props.coverable,
          variant: 'visual-picker',
          name: "".concat(_this2.props.id || _this2.generatedId, "_options"),
          size: _this2.props.size,
          vertical: !!_this2.props.vertical
        });
      });

      return this.props.links ? /*#__PURE__*/_react.default.createElement("div", {
        className: "slds-form-element__control"
      }, this.props.children) : /*#__PURE__*/_react.default.createElement("fieldset", {
        id: this.props.id,
        className: (0, _classnames.default)("slds-form-element", this.props.className)
      }, /*#__PURE__*/_react.default.createElement("legend", {
        className: "slds-form-element__legend slds-form-element__label"
      }, this.props.label), /*#__PURE__*/_react.default.createElement("div", {
        className: "slds-form-element__control"
      }, options));
    }
  }]);

  return VisualPicker;
}(_react.default.Component);

VisualPicker.displayName = _constants.VISUAL_PICKER;
VisualPicker.propTypes = propTypes;
VisualPicker.defaultProps = defaultProps;
var _default = VisualPicker;
exports.default = _default;