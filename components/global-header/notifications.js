"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _lodash = _interopRequireDefault(require("lodash.assign"));

var _button = _interopRequireDefault(require("../button"));

var _popover = _interopRequireDefault(require("../popover"));

var _constants = require("../../utilities/constants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

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
   * **Assistive text for accessibility**
   * * `newNotificationsAfter`: Assistive text for when there are new notifications, after the notificationCount. The default is ' new notifications'.
   * * `newNotificationsBefore`: Assistive text for when there are new notifications, before the notificationCount. The default is ''.
   * * `noNotifications`: Assistive text for when there are no new notifications.
   */
  assistiveText: _propTypes.default.shape({
    newNotificationsAfter: _propTypes.default.string,
    newNotificationsBefore: _propTypes.default.string,
    noNotifications: _propTypes.default.string
  }),

  /**
   * Dictates the number of notifications shown in the new notifications badge.
   */
  notificationCount: _propTypes.default.number,

  /**
   * A `Popover` component. The props from this popover will be merged and override any default props. The `children` prop will be ignored.
   */
  popover: _propTypes.default.node
};
/**
 * A GlobalHeaderNotifications component. Notifications are a way to notify a user about a global change within the application.
 */

var GlobalHeaderNotifications = /*#__PURE__*/function (_React$Component) {
  _inherits(GlobalHeaderNotifications, _React$Component);

  var _super = _createSuper(GlobalHeaderNotifications);

  function GlobalHeaderNotifications() {
    _classCallCheck(this, GlobalHeaderNotifications);

    return _super.apply(this, arguments);
  }

  _createClass(GlobalHeaderNotifications, [{
    key: "render",
    value: function render() {
      var buttonAriaProps = {
        'aria-live': 'assertive'
      };
      var notificationCount = this.props.notificationCount;
      var popoverProps = (0, _lodash.default)({
        align: 'bottom right',
        body: /*#__PURE__*/_react.default.createElement("span", null),
        triggerClassName: 'slds-dropdown-trigger slds-dropdown-trigger_click'
      }, this.props.popover ? this.props.popover.props : {});
      var notificationsAssistiveText = this.props.assistiveText.noNotifications; // eslint-disable-next-line fp/no-delete

      delete popoverProps.children;

      if (notificationCount > 0) {
        notificationsAssistiveText = "".concat(this.props.assistiveText.newNotificationsBefore).concat(notificationCount).concat(this.props.assistiveText.newNotificationsAfter);
      } else {
        buttonAriaProps['aria-atomic'] = true;
      }

      return /*#__PURE__*/_react.default.createElement(_popover.default, popoverProps, /*#__PURE__*/_react.default.createElement(_button.default, _extends({
        assistiveText: {
          icon: notificationsAssistiveText
        },
        className: "slds-button_icon slds-global-actions__notifications slds-global-actions__item-action",
        iconCategory: "utility",
        iconClassName: "slds-global-header__icon",
        iconName: "notification",
        iconSize: "small",
        iconVariant: "container",
        title: notificationsAssistiveText,
        variant: "icon"
      }, buttonAriaProps)), notificationCount > 0 ? /*#__PURE__*/_react.default.createElement("span", {
        "aria-hidden": "true",
        className: "slds-notification-badge slds-incoming-notification slds-show-notification"
      }, notificationCount) : /*#__PURE__*/_react.default.createElement("span", {
        "aria-hidden": "true",
        className: "slds-notification-badge"
      }));
    }
  }]);

  return GlobalHeaderNotifications;
}(_react.default.Component);

GlobalHeaderNotifications.displayName = _constants.GLOBAL_HEADER_NOTIFICATIONS;
GlobalHeaderNotifications.defaultProps = {
  assistiveText: {
    newNotificationsAfter: ' new notifications',
    newNotificationsBefore: '',
    noNotifications: 'No new notifications'
  },
  notificationCount: 0
};
GlobalHeaderNotifications.propTypes = propTypes;
var _default = GlobalHeaderNotifications;
exports.default = _default;