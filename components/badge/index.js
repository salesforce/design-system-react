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

/**
 * Badges are labels which hold small amounts of information.
 */
var Badge = /*#__PURE__*/function (_React$Component) {
  _inherits(Badge, _React$Component);

  var _super = _createSuper(Badge);

  function Badge(props) {
    var _this;

    _classCallCheck(this, Badge);

    _this = _super.call(this, props);
    _this.generatedId = _shortid.default.generate();
    return _this;
  }
  /**
   * Get the Badge's HTML id. Generate a new one if no ID present.
   */


  _createClass(Badge, [{
    key: "getId",
    value: function getId() {
      return this.props.id || this.generatedId;
    }
  }, {
    key: "render",
    value: function render() {
      var icon = this.props.icon && /*#__PURE__*/_react.default.createElement("span", {
        className: (0, _classnames.default)('slds-badge__icon', "slds-badge__icon_".concat(this.props.iconAlignment)),
        style: this.props.style
      }, this.props.icon);

      return /*#__PURE__*/_react.default.createElement("span", {
        id: this.getId(),
        className: (0, _classnames.default)('slds-badge', {
          'slds-badge_inverse': this.props.color === 'inverse',
          'slds-badge_lightest': this.props.color === 'light',
          'slds-theme_success': this.props.color === 'success',
          'slds-theme_warning': this.props.color === 'warning',
          'slds-theme_error': this.props.color === 'error'
        }, this.props.className)
      }, this.props.iconAlignment === 'left' ? /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, icon, this.props.content) : /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, this.props.content, icon));
    }
  }]);

  return Badge;
}(_react.default.Component);

Badge.displayName = _constants.BADGE;
Badge.propTypes = {
  /**
   * CSS classes that are applied to the component
   */
  className: _propTypes.default.oneOfType([_propTypes.default.array, _propTypes.default.object, _propTypes.default.string]),

  /**
   * Id of component, if desired. If not provided an id is automatically generated
   */
  id: _propTypes.default.string,

  /**
   * Custom styles to be passed to the component
   */
  style: _propTypes.default.object,

  /**
   * Color variant for the badge component
   */
  color: _propTypes.default.oneOf(['default', 'inverse', 'light', 'success', 'warning', 'error']),

  /**
   * Icon alignment for the badge component
   */
  iconAlignment: _propTypes.default.oneOf(['left', 'right']),

  /**
   *  Content to be placed inside the badge component
   */
  content: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.node])
};
Badge.defaultProps = {
  iconAlignment: 'left',
  color: 'default'
};
var _default = Badge;
exports.default = _default;