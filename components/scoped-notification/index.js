"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _icon = _interopRequireDefault(require("../icon"));

var _constants = require("../../utilities/constants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var propTypes = {
  /**
   * CSS classes to be added to tag with `.slds-scoped-notification`. Uses `classNames` [API](https://github.com/JedWatson/classnames).
   */
  className: _propTypes.default.oneOfType([_propTypes.default.array, _propTypes.default.object, _propTypes.default.string]),

  /**
   *  Theme for the scoped notification
   */
  theme: _propTypes.default.oneOf(['dark', 'light']),

  /**
   *  Icon for the scoped notification. This is currently limited to the utility set of icons.
   */
  iconName: _propTypes.default.string
};
var defaultProps = {
  iconName: 'info'
};
/**
 * A Scoped Notification Component serve advisory information for the user that is not important enough to justify an alert.
 */

var ScopedNotification =
/*#__PURE__*/
function (_React$Component) {
  _inherits(ScopedNotification, _React$Component);

  function ScopedNotification() {
    _classCallCheck(this, ScopedNotification);

    return _possibleConstructorReturn(this, _getPrototypeOf(ScopedNotification).apply(this, arguments));
  }

  _createClass(ScopedNotification, [{
    key: "render",
    value: function render() {
      return _react.default.createElement("div", {
        className: (0, _classnames.default)("slds-scoped-notification", "slds-media", "slds-media_center", {
          'slds-scoped-notification_light': this.props.theme === 'light',
          'slds-scoped-notification_dark': this.props.theme === 'dark'
        }, this.props.className),
        role: "status"
      }, _react.default.createElement("div", {
        className: "slds-media__figure"
      }, _react.default.createElement(_icon.default, {
        assistiveText: {
          icon: this.props.assistiveText && this.props.assistiveText.icon
        },
        category: "utility",
        name: this.props.iconName,
        colorVariant: this.props.theme === 'dark' ? 'base' : undefined,
        size: "small"
      })), _react.default.createElement("div", {
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