"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.cssClasses = void 0;

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

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// Allow for predicatable DOM queries with `querySelectorAll(cssClasses.base)`
var cssClasses = {
  base: 'slds-media',
  figure: 'slds-media__figure',
  body: 'slds-media__body'
};
/**
 * When you need text and a figure next to each other, use a media object.
 */

exports.cssClasses = cssClasses;

var MediaObject = /*#__PURE__*/function (_React$Component) {
  _inherits(MediaObject, _React$Component);

  var _super = _createSuper(MediaObject);

  function MediaObject() {
    _classCallCheck(this, MediaObject);

    return _super.apply(this, arguments);
  }

  _createClass(MediaObject, [{
    key: "render",
    value: // ### Display Name
    // Always use the canonical component name as the React display name.
    // ### Prop Types
    function render() {
      return /*#__PURE__*/_react.default.createElement("div", {
        className: (0, _classnames.default)(cssClasses.base, {
          'slds-media_center': this.props.verticalCenter,
          'slds-has-flexi-truncate': this.props.canTruncate
        }, this.props.className)
      }, this.props.figure ? /*#__PURE__*/_react.default.createElement("div", {
        className: cssClasses.figure
      }, this.props.figure, " ") : null, /*#__PURE__*/_react.default.createElement("div", {
        className: cssClasses.body
      }, this.props.body));
    }
  }]);

  return MediaObject;
}(_react.default.Component);

_defineProperty(MediaObject, "displayName", _constants.MEDIA_OBJECT);

_defineProperty(MediaObject, "propTypes", {
  /**
   * Often the body may need to be truncated for correct layout. This is only applicable if using the component within a flexbox container.
   */
  canTruncate: _propTypes.default.bool,

  /**
   * Class names to be added to the component's HTML tag with `slds-media` class.
   */
  className: _propTypes.default.oneOfType([_propTypes.default.array, _propTypes.default.object, _propTypes.default.string]),

  /**
   * The body is often text such as a heading or paragraph.
   */
  body: _propTypes.default.node,

  /**
   * The figure is the optional visualization of the text within the body.
   */
  figure: _propTypes.default.node,

  /**
   * Vertically centers the body with the middle of the figure.
   */
  verticalCenter: _propTypes.default.bool
});

var _default = MediaObject;
exports.default = _default;