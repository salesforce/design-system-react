"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

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
   * CSS classes to be added to tag with `.slds-form-element`. Uses `classNames` [API](https://github.com/JedWatson/classnames).
   */
  className: _propTypes.default.oneOfType([_propTypes.default.array, _propTypes.default.object, _propTypes.default.string]),

  /**
   * URL for the Link
   */
  href: _propTypes.default.string,

  /**
   * Icon node for the Link
   */
  icon: _propTypes.default.node,

  /**
   * Title for the Link
   */
  title: _propTypes.default.string,

  /**
   * Description for the Link
   */
  description: _propTypes.default.string
};
/**
 * Visual Picker Link Component
 */

var VisualPickerLink = /*#__PURE__*/function (_React$Component) {
  _inherits(VisualPickerLink, _React$Component);

  var _super = _createSuper(VisualPickerLink);

  function VisualPickerLink() {
    _classCallCheck(this, VisualPickerLink);

    return _super.apply(this, arguments);
  }

  _createClass(VisualPickerLink, [{
    key: "render",
    value: function render() {
      return /*#__PURE__*/_react.default.createElement("a", {
        href: this.props.href,
        id: this.props.id,
        className: (0, _classnames.default)('slds-box', 'slds-box_link', 'slds-theme_default', 'slds-box_x-small', 'slds-media', 'slds-visual-picker_vertical', this.props.className)
      }, /*#__PURE__*/_react.default.createElement("div", {
        className: "slds-media__figure slds-media__figure_fixed-width slds-align_absolute-center slds-m-left_xx-small"
      }, this.props.icon), /*#__PURE__*/_react.default.createElement("div", {
        className: "slds-media__body slds-border_left slds-p-around_small"
      }, /*#__PURE__*/_react.default.createElement("h2", {
        className: "slds-truncate slds-text-heading_small",
        title: this.props.title
      }, this.props.title), /*#__PURE__*/_react.default.createElement("p", {
        className: "slds-m-top_small"
      }, this.props.description)));
    }
  }]);

  return VisualPickerLink;
}(_react.default.Component);

VisualPickerLink.displayName = _constants.VISUAL_PICKER_LINK;
VisualPickerLink.propTypes = propTypes;
var _default = VisualPickerLink;
exports.default = _default;