"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _icon = _interopRequireDefault(require("../icon"));

var _component = _interopRequireDefault(require("./component.json"));

var _checkProps = _interopRequireDefault(require("./check-props"));

var _constants = require("../../utilities/constants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

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
   * **Assistive text for accessibility.**
   * * `icon`: The assistive text for the icon. Is overridden by `label` assistive text passed directly to an `Icon` component via the `icon` prop
   */
  assistiveText: _propTypes.default.shape({
    icon: _propTypes.default.string
  }),

  /**
   * CSS classes to be added to tag with `.slds-scoped-notification`. Uses `classNames` [API](https://github.com/JedWatson/classnames).
   */
  className: _propTypes.default.oneOfType([_propTypes.default.array, _propTypes.default.object, _propTypes.default.string]),

  /**
   *  The icon to be displayed in the scoped notification. Accepts an `Icon` component
   */
  icon: _propTypes.default.node,

  /**
   *  Theme for the scoped notification
   */
  theme: _propTypes.default.oneOf(['dark', 'light'])
};
var defaultProps = {};
/**
 * A Scoped Notification Component serve advisory information for the user that is not important enough to justify an alert.
 */

var ScopedNotification = /*#__PURE__*/function (_React$Component) {
  _inherits(ScopedNotification, _React$Component);

  var _super = _createSuper(ScopedNotification);

  function ScopedNotification(props) {
    var _this;

    _classCallCheck(this, ScopedNotification);

    _this = _super.call(this, props);
    (0, _checkProps.default)(_constants.SCOPED_NOTIFICATION, props, _component.default);
    return _this;
  }

  _createClass(ScopedNotification, [{
    key: "render",
    value: function render() {
      var icon;

      if (this.props.icon) {
        var iconAssistiveText = {};

        if (this.props.assistiveText && this.props.assistiveText.icon) {
          iconAssistiveText.label = this.props.assistiveText.icon;
        }

        if (this.props.icon.props.assistiveText) {
          iconAssistiveText = _objectSpread(_objectSpread({}, iconAssistiveText), this.props.icon.props.assistiveText);
        }

        icon = /*#__PURE__*/_react.default.cloneElement(this.props.icon, _objectSpread(_objectSpread({}, this.props.icon.props), {}, {
          assistiveText: iconAssistiveText
        }));
      } else {
        icon = /*#__PURE__*/_react.default.createElement(_icon.default, {
          assistiveText: {
            label: this.props.assistiveText && this.props.assistiveText.icon || 'Info'
          },
          category: "utility",
          name: this.props.iconName || 'info',
          colorVariant: this.props.theme === 'dark' ? 'base' : undefined,
          size: "small"
        });
      }

      return /*#__PURE__*/_react.default.createElement("div", {
        className: (0, _classnames.default)("slds-scoped-notification", "slds-media", "slds-media_center", {
          'slds-scoped-notification_light': this.props.theme === 'light',
          'slds-scoped-notification_dark': this.props.theme === 'dark'
        }, this.props.className),
        role: "status"
      }, /*#__PURE__*/_react.default.createElement("div", {
        className: "slds-media__figure"
      }, icon), /*#__PURE__*/_react.default.createElement("div", {
        className: "slds-media__body"
      }, this.props.children));
    }
  }]);

  return ScopedNotification;
}(_react.default.Component);

ScopedNotification.displayName = _constants.SCOPED_NOTIFICATION;
ScopedNotification.propTypes = propTypes;
ScopedNotification.defaultProps = defaultProps;
var _default = ScopedNotification;
exports.default = _default;