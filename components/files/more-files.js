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

var displayName = _constants.FILES_MORE;
var propTypes = {
  /**
   * **Assistive text for accessibility**
   *  * count - description for the more files count
   *  * image - description for the image
   *  * link - description for the more files link
   */
  assistiveText: _propTypes.default.shape({
    count: _propTypes.default.string,
    image: _propTypes.default.string,
    link: _propTypes.default.string
  }),

  /**
   * CSS class names to be added to the container element. `array`, `object`, or `string` are accepted.
   */
  className: _propTypes.default.oneOfType([_propTypes.default.array, _propTypes.default.object, _propTypes.default.string]),

  /**
   * HTML id for component.
   */
  id: _propTypes.default.string,

  /**
   * Controls different cropping aspect ratios for the component
   */
  crop: _propTypes.default.oneOf(['16-by-9', '4-by-3', '1-by-1']),

  /**
   * Link to thumbnail image
   */
  image: _propTypes.default.string,

  /**
   * Controls the number of additional files that is displayed
   */
  count: _propTypes.default.string,

  /**
   * Href attribute for image
   */
  href: _propTypes.default.string
};
var defaultProps = {
  assistiveText: {
    count: 'more files',
    image: 'Show more files',
    link: 'Preview:'
  },
  crop: '16-by-9',
  href: '#'
};
/**
 * MoreFiles is a component that represents a number of file contents uploaded as an attachment.
 */

var MoreFiles = /*#__PURE__*/function (_React$Component) {
  _inherits(MoreFiles, _React$Component);

  var _super = _createSuper(MoreFiles);

  function MoreFiles(props) {
    var _this;

    _classCallCheck(this, MoreFiles);

    _this = _super.call(this, props);
    _this.generatedId = _shortid.default.generate();
    return _this;
  }

  _createClass(MoreFiles, [{
    key: "getId",
    value: function getId() {
      return this.props.id || this.generatedId;
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var assistiveText = _objectSpread(_objectSpread({}, defaultProps.assistiveText), this.props.assistiveText);

      return /*#__PURE__*/_react.default.createElement("div", {
        className: (0, _classnames.default)("slds-file slds-file_card", this.props.className),
        id: this.getId()
      }, /*#__PURE__*/_react.default.createElement("figure", null, /*#__PURE__*/_react.default.createElement("a", {
        href: this.props.href,
        className: (0, _classnames.default)('slds-file__crop', this.props.crop ? "slds-file__crop_".concat(this.props.crop) : null),
        onClick: function onClick(event) {
          return _this2.props.href === '#' && event.preventDefault();
        }
      }, /*#__PURE__*/_react.default.createElement("div", {
        className: "slds-file_overlay"
      }), /*#__PURE__*/_react.default.createElement("span", {
        className: "slds-assistive-text"
      }, assistiveText.link), /*#__PURE__*/_react.default.createElement("img", {
        src: this.props.image,
        alt: assistiveText.image
      })), /*#__PURE__*/_react.default.createElement("figcaption", {
        className: "slds-file__title slds-file__title_overlay slds-align_absolute-center slds-text-heading_large"
      }, /*#__PURE__*/_react.default.createElement("div", {
        className: "slds-media slds-media_small slds-media_center"
      }, /*#__PURE__*/_react.default.createElement("div", {
        className: "slds-media__figure slds-line-height_reset"
      }), /*#__PURE__*/_react.default.createElement("div", {
        className: "slds-media__body"
      }, /*#__PURE__*/_react.default.createElement("span", {
        className: "slds-file__text slds-truncate",
        title: this.props.count
      }, /*#__PURE__*/_react.default.createElement("span", null, this.props.count), /*#__PURE__*/_react.default.createElement("span", {
        className: "slds-assistive-text"
      }, assistiveText.count)))))));
    }
  }]);

  return MoreFiles;
}(_react.default.Component);

MoreFiles.displayName = displayName;
MoreFiles.propTypes = propTypes;
MoreFiles.defaultProps = defaultProps;
var _default = MoreFiles;
exports.default = _default;