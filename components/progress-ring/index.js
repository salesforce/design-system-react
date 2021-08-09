"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.THEME_OPTIONS = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _constants = require("../../utilities/constants");

var _icon = _interopRequireDefault(require("../icon"));

var _ringShape = _interopRequireDefault(require("./private/ring-shape"));

var _THEME_CLASSES;

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
 * The themes available for the progress ring
 */
var THEME_OPTIONS = Object.freeze({
  ACTIVE: 'active',
  WARNING: 'warning',
  EXPIRED: 'expired',
  COMPLETE: 'complete'
});
/**
 * The CSS classes associated with each theme
 */

exports.THEME_OPTIONS = THEME_OPTIONS;
var THEME_CLASSES = (_THEME_CLASSES = {}, _defineProperty(_THEME_CLASSES, THEME_OPTIONS.ACTIVE, 'slds-progress-ring_active-step'), _defineProperty(_THEME_CLASSES, THEME_OPTIONS.WARNING, 'slds-progress-ring_warning'), _defineProperty(_THEME_CLASSES, THEME_OPTIONS.EXPIRED, 'slds-progress-ring_expired'), _defineProperty(_THEME_CLASSES, THEME_OPTIONS.COMPLETE, 'slds-progress-ring_complete'), _THEME_CLASSES);
var propTypes = {
  /**
   * HTML id for component.
   */
  id: _propTypes.default.string,

  /**
   * CSS classes to be added to tag with `.slds-progress-ring`. Uses `classNames` [API](https://github.com/JedWatson/classnames).
   */
  className: _propTypes.default.oneOfType([_propTypes.default.array, _propTypes.default.object, _propTypes.default.string]),

  /**
   * The theme applied to the ring.
   */
  theme: _propTypes.default.oneOf(['active', 'warning', 'expired', 'complete']),

  /**
   * Overrides the icon to be displayed.
   */
  icon: _propTypes.default.node,

  /**
   * Display the icon associated with the theme.
   */
  hasIcon: _propTypes.default.bool,

  /**
   * Percentage of progress completion, ranging [0, 100].
   */
  value: _propTypes.default.number.isRequired,

  /**
   * Direction that the progress ring "flows." Default is counter-clockwise, or `drain`. For clockwise flow, use `fill`
   */
  flowDirection: _propTypes.default.oneOf(['drain', 'fill']),

  /**
   * Size of the progress ring. Default is 'medium'
   */
  size: _propTypes.default.oneOf(['medium', 'large'])
};
var defaultProps = {
  flowDirection: 'drain',
  size: 'medium'
};
/**
 * Customizable and configurable progress ring. Will display progress in a circular progress bar factor, and is capable of displaying iconography inside of the ring structure.
 */

var ProgressRing = /*#__PURE__*/function (_React$Component) {
  _inherits(ProgressRing, _React$Component);

  var _super = _createSuper(ProgressRing);

  function ProgressRing() {
    _classCallCheck(this, ProgressRing);

    return _super.apply(this, arguments);
  }

  _createClass(ProgressRing, [{
    key: "icon",
    value:
    /**
     * Gets the icon to display
     * @returns {node} Icon
     */
    function icon() {
      var icon = '';

      if (this.props.hasIcon) {
        if (this.props.icon) {
          // eslint-disable-next-line prefer-destructuring
          icon = this.props.icon;
        } else if (this.props.theme === THEME_OPTIONS.WARNING) {
          icon = /*#__PURE__*/_react.default.createElement(_icon.default, {
            category: "utility",
            name: "warning",
            title: "Warning"
          });
        } else if (this.props.theme === THEME_OPTIONS.EXPIRED) {
          icon = /*#__PURE__*/_react.default.createElement(_icon.default, {
            category: "utility",
            name: "error",
            title: "Expired"
          });
        } else if (this.props.theme === THEME_OPTIONS.COMPLETE) {
          icon = /*#__PURE__*/_react.default.createElement(_icon.default, {
            category: "utility",
            name: "check",
            title: "Complete"
          });
        }
      }

      return icon;
    }
    /**
     * Percentage as a decimal
     * @returns {decimal} Percentage
     */

  }, {
    key: "percentDecimal",
    value: function percentDecimal() {
      return this.props.value / 100;
    }
    /**
     * Gets the theme CSS class
     * @returns {string} Class name
     */

  }, {
    key: "themeClass",
    value: function themeClass() {
      return THEME_CLASSES[this.props.theme] || '';
    }
  }, {
    key: "render",
    value: function render() {
      return /*#__PURE__*/_react.default.createElement(_ringShape.default, {
        id: this.props.id,
        size: this.props.size,
        className: (0, _classnames.default)(this.props.className, this.themeClass(), {
          'slds-progress-ring_large': this.props.size === 'large'
        }),
        fillPercentDecimal: this.percentDecimal(),
        flowDirection: this.props.flowDirection
      }, this.icon());
    }
  }]);

  return ProgressRing;
}(_react.default.Component);

ProgressRing.displayName = _constants.PROGRESS_RING;
ProgressRing.propTypes = propTypes;
ProgressRing.defaultProps = defaultProps;
var _default = ProgressRing;
exports.default = _default;