"use strict";

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

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

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
  href: 'javascript:void(0);'
};
/**
 * MoreFiles is a component that represents multiple uploaded attachments
 */

var MoreFiles =
/*#__PURE__*/
function (_React$Component) {
  _inherits(MoreFiles, _React$Component);

  function MoreFiles() {
    _classCallCheck(this, MoreFiles);

    return _possibleConstructorReturn(this, _getPrototypeOf(MoreFiles).apply(this, arguments));
  }

  _createClass(MoreFiles, [{
    key: "componentWillMount",
    value: function componentWillMount() {
      this.generatedId = _shortid.default.generate();
    }
  }, {
    key: "getId",
    value: function getId() {
      return this.props.id || this.generatedId;
    }
  }, {
    key: "render",
    value: function render() {
      var assistiveText = _objectSpread({}, defaultProps.assistiveText, this.props.assistiveText);

      return _react.default.createElement("div", {
        className: (0, _classnames.default)("slds-file slds-file_card", this.props.className),
        id: this.getId()
      }, _react.default.createElement("figure", null, _react.default.createElement("a", {
        href: this.props.href,
        className: (0, _classnames.default)('slds-file__crop', this.props.crop ? "slds-file__crop_".concat(this.props.crop) : null)
      }, _react.default.createElement("div", {
        className: "slds-file_overlay"
      }), _react.default.createElement("span", {
        className: "slds-assistive-text"
      }, assistiveText.link), _react.default.createElement("img", {
        src: this.props.image,
        alt: assistiveText.image
      })), _react.default.createElement("figcaption", {
        className: "slds-file__title slds-file__title_overlay slds-align_absolute-center slds-text-heading_large"
      }, _react.default.createElement("div", {
        className: "slds-media slds-media_small slds-media_center"
      }, _react.default.createElement("div", {
        className: "slds-media__figure slds-line-height_reset"
      }), _react.default.createElement("div", {
        className: "slds-media__body"
      }, _react.default.createElement("span", {
        className: "slds-file__text slds-truncate",
        title: this.props.count
      }, _react.default.createElement("span", null, this.props.count), _react.default.createElement("span", {
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