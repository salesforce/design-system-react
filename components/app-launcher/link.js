"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _highlighter = _interopRequireDefault(require("../utilities/highlighter"));

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

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * App Launcher Link component creates simple links to be used in "All Items" sections
 */
var AppLauncherLink = /*#__PURE__*/function (_React$Component) {
  _inherits(AppLauncherLink, _React$Component);

  var _super = _createSuper(AppLauncherLink);

  function AppLauncherLink() {
    _classCallCheck(this, AppLauncherLink);

    return _super.apply(this, arguments);
  }

  _createClass(AppLauncherLink, [{
    key: "render",
    value: // ### Display Name
    // Always use the canonical component name as the React display name.
    // ### Prop Types
    // ### Default Props
    function render() {
      var _this = this;

      var title = this.props.title;

      if (!title && typeof this.props.children === 'string') {
        title = this.props.children;
      }

      return /*#__PURE__*/_react.default.createElement("a", {
        href: this.props.href,
        className: (0, _classnames.default)('slds-truncate', this.props.className),
        onClick: function onClick(event) {
          if (_this.props.href === '#') {
            event.preventDefault();
          }

          if (_this.props.onClick) {
            event.preventDefault();

            _this.props.onClick(event, {
              href: _this.props.href
            });
          }
        },
        title: title
      }, /*#__PURE__*/_react.default.createElement(_highlighter.default, {
        search: this.props.search
      }, this.props.children));
    }
  }]);

  return AppLauncherLink;
}(_react.default.Component);

_defineProperty(AppLauncherLink, "displayName", _constants.APP_LAUNCHER_LINK);

_defineProperty(AppLauncherLink, "propTypes", {
  /**
   * Contents of the link
   */
  children: _propTypes.default.node,

  /**
   * Classes to be applied to the link
   */
  className: _propTypes.default.oneOfType([_propTypes.default.array, _propTypes.default.object, _propTypes.default.string]),

  /**
   * The `href` attribute of the link. If the `onClick` callback is specified this URL will be prevented from changing the browser's location.
   */
  href: _propTypes.default.string,

  /**
   * Callback for when the link is clicked. Passes back event and data object with href prop. Prevents click from changing browser's location if set.
   */
  onClick: _propTypes.default.func,

  /**
   * Text used to highlight content in link
   */
  search: _propTypes.default.string,

  /**
   * The title for the link. If not provided it will attempt to use child content if that content is a string.
   */
  title: _propTypes.default.string
});

_defineProperty(AppLauncherLink, "defaultProps", {
  href: '#'
});

var _default = AppLauncherLink;
exports.default = _default;