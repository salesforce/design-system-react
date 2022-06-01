"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _lodash = _interopRequireDefault(require("lodash.assign"));

var _classNames = _interopRequireDefault(require("../../utilities/class-names"));

var _button = _interopRequireDefault(require("../button"));

var _icon = _interopRequireDefault(require("../icon"));

var _checkProps = _interopRequireDefault(require("./check-props"));

var _component = _interopRequireDefault(require("./component.json"));

var _constants = require("../../utilities/constants");

var _domElementFocus = _interopRequireDefault(require("../../utilities/dom-element-focus"));

var _event = _interopRequireDefault(require("../../utilities/event"));

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

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var propTypes = {
  /**
   * **Assistive text for accessibility**
   * This object is merged with the default props object on every render.
   * * `closeButton`: This is a visually hidden label for the close button.
   * _Tested with snapshot testing._
   */
  assistiveText: _propTypes.default.shape({
    closeButton: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.node])
  }),

  /**
   * CSS classes to be added to tag with `.slds-notify_alert`. Uses `classNames` [API](https://github.com/JedWatson/classnames).
   * _Tested with snapshot testing._
   */
  className: _propTypes.default.oneOfType([_propTypes.default.array, _propTypes.default.object, _propTypes.default.string]),

  /**
   * Allows user to click a close button. Banners should be dismissible only if they communicate future impact to the system,
   * _Tested with snapshot testing._
   */
  dismissible: _propTypes.default.bool,

  /**
   * Icon of type `~/components/icon`. This icon will be cloned and additional props appended. The default icons are:
   * * info variant: `utility:info`
   * * error variant: `utility:error`
   * * offline variant: `utility:offline`
   * * warning variant: `utility:warning`
   *
   * _Tested with snapshot testing._
   */
  icon: _propTypes.default.node,

  /**
   * **Text labels for internationalization**
   * This object is merged with the default props object on every render.
   * * `heading`: text within heading tag
   * * `headingLink`: Text of link that triggers `onClickHeadingLink`. Inline links should pass a keyed array of React components into `labels.heading`.
   *
   * _Tested with snapshot testing._
   */
  labels: _propTypes.default.shape({
    heading: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.node]),
    headingLink: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.node])
  }),

  /**
   * Triggered by link. _Tested with Mocha testing._
   */
  onClickHeadingLink: _propTypes.default.func,

  /**
   * Triggered by close button. This is a controlled component. _Tested with Mocha testing._
   */
  onRequestClose: _propTypes.default.func,

  /**
   * Custom styles to be passed to the component. _Tested with Mocha testing._
   */
  style: _propTypes.default.object,

  /**
   * The type of alert. _Tested with snapshot testing._
   */
  variant: _propTypes.default.oneOf(['error', 'info', 'offline', 'warning']).isRequired
};
var defaultProps = {
  assistiveText: {
    closeButton: 'Close'
  },
  labels: {},
  variant: 'info'
};
/**
 * Alert banners communicate a state that affects the entire system, not just a feature or page. It persists over a session and appears without the user initiating the action. View [banner guidelines](https://www.lightningdesignsystem.com/guidelines/messaging/components/banners/).
 */

var Alert = /*#__PURE__*/function (_React$Component) {
  _inherits(Alert, _React$Component);

  var _super = _createSuper(Alert);

  function Alert(props) {
    var _this;

    _classCallCheck(this, Alert);

    _this = _super.call(this, props);

    _defineProperty(_assertThisInitialized(_this), "saveButtonRef", function (component) {
      _this.closeButton = component;

      if (_this.state.isInitialRender) {
        _domElementFocus.default.storeActiveElement();

        if (_this.closeButton) {
          _this.closeButton.focus();
        }

        _this.setState({
          isInitialRender: false
        });
      }
    });

    _this.state = {
      isInitialRender: true
    }; // `checkProps` issues warnings to developers about properties (similar to React's built in development tools)

    (0, _checkProps.default)(_constants.ALERT, props, _component.default);
    return _this;
  }

  _createClass(Alert, [{
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      _domElementFocus.default.returnFocusToStoredElement();
    }
  }, {
    key: "render",
    value: function render() {
      // Merge objects of strings with their default object
      var assistiveText = (0, _lodash.default)({}, defaultProps.assistiveText, this.props.assistiveText);
      var labels = (0, _lodash.default)({}, defaultProps.labels, this.props.labels); // BACKWARD COMPATIBILITY WITH NOTIFICATION

      var heading = labels.heading || this.props.content; // eslint-disable-line react/prop-types

      var onRequestClose = this.props.onRequestClose || this.props.onDismiss; // eslint-disable-line react/prop-types

      var assistiveTextVariant = {
        info: 'info',
        warning: 'warning',
        error: 'error',
        offline: 'offline'
      };
      var defaultIcons = {
        info: /*#__PURE__*/_react.default.createElement(_icon.default, {
          category: "utility",
          name: "info"
        }),
        offline: /*#__PURE__*/_react.default.createElement(_icon.default, {
          category: "utility",
          name: "offline"
        }),
        warning: /*#__PURE__*/_react.default.createElement(_icon.default, {
          category: "utility",
          name: "warning"
        }),
        error: /*#__PURE__*/_react.default.createElement(_icon.default, {
          category: "utility",
          name: "error"
        })
      };
      var icon = this.props.icon ? this.props.icon : defaultIcons[this.props.variant]; // BACKWARD COMPATIBILITY WITH NOTIFICATION

      if (this.props.iconName && this.props.iconCategory) {
        // eslint-disable-line react/prop-types
        icon = /*#__PURE__*/_react.default.createElement(_icon.default, {
          category: this.props.iconCategory,
          name: this.props.iconName
        });
      }

      var clonedIcon = /*#__PURE__*/_react.default.cloneElement(icon, {
        containerClassName: 'slds-m-right_x-small',
        inverse: true,
        size: 'x-small'
      });

      return /*#__PURE__*/_react.default.createElement("div", {
        className: (0, _classNames.default)('slds-notify slds-notify_alert slds-theme_alert-texture', {
          'slds-theme_info': this.props.variant === 'info',
          'slds-theme_warning': this.props.variant === 'warning',
          'slds-theme_error': this.props.variant === 'error',
          'slds-theme_offline': this.props.variant === 'offline'
        }, this.props.className),
        role: "alert",
        style: this.props.style
      }, /*#__PURE__*/_react.default.createElement("span", {
        className: "slds-assistive-text"
      }, assistiveTextVariant[this.props.variant]), clonedIcon, /*#__PURE__*/_react.default.createElement("h2", null, heading, ' ', labels.headingLink ? /*#__PURE__*/_react.default.createElement("a", {
        onClick: _event.default.trappedHandler(this.props.onClickHeadingLink),
        href: "#"
      }, labels.headingLink) : null), this.props.dismissible ? /*#__PURE__*/_react.default.createElement(_button.default, {
        assistiveText: {
          icon: assistiveText.closeButton
        },
        buttonRef: this.saveButtonRef,
        className: "slds-notify__close",
        iconCategory: "utility",
        iconName: "close",
        iconSize: "medium",
        inverse: true,
        onClick: onRequestClose,
        title: assistiveText.closeButton,
        variant: "icon"
      }) : null);
    }
  }]);

  return Alert;
}(_react.default.Component);

Alert.defaultProps = defaultProps;
Alert.displayName = _constants.ALERT;
Alert.propTypes = propTypes;
var _default = Alert;
exports.default = _default;