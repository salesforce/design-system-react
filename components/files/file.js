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

var _fileFigure = _interopRequireDefault(require("./private/file-figure"));

var _fileActions = _interopRequireDefault(require("./private/file-actions"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

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

var displayName = _constants.FILES_FILE;
var propTypes = {
  /**
   * **Assistive text for accessibility**
   *  * download - description for the download button if present
   *  * image - description for the file image
   *  * link - description for the file link
   *  * loading - description for the loading spinner if present
   *  * moreActions - description for the more actions dropdown if present
   */
  assistiveText: _propTypes.default.shape({
    download: _propTypes.default.string,
    image: _propTypes.default.string,
    link: _propTypes.default.string,
    loading: _propTypes.default.string,
    moreActions: _propTypes.default.string
  }),

  /**
   * CSS class names to be added to the container element. `array`, `object`, or `string` are accepted.
   */
  className: _propTypes.default.oneOfType([_propTypes.default.array, _propTypes.default.object, _propTypes.default.string]),

  /**
   * Controls different cropping aspect ratios for the component
   */
  crop: _propTypes.default.oneOf(['16-by-9', '4-by-3', '1-by-1']),

  /**
   * HTML id for component.
   */
  id: _propTypes.default.string,

  /**
   * Action to be done on clicking download button; doesn't show download button if empty
   */
  onClickDownload: _propTypes.default.func,

  /**
   * Function that is called when image is clicked; can be used instead of href for more advanced event handling
   */
  onClickImage: _propTypes.default.func,

  /**
   * Dropdown for more actions button; doesn't show more actions button if empty
   */
  moreActionsDropdown: _propTypes.default.node,

  /**
   * Icon associated with the file. Accepts an Icon component
   */
  icon: _propTypes.default.node,

  /**
   * Icon to be shown in top left corner of File component. Accepts an Icon component
   */
  externalIcon: _propTypes.default.node,

  /**
   * Link to thumbnail image
   */
  image: _propTypes.default.string,

  /**
   * Controls whether file preview is loading
   */
  isLoading: _propTypes.default.bool,

  /**
   * Href attribute for image
   */
  href: _propTypes.default.string,

  /**
   * Labels for the File Component
   * * image - title for the file. Required.
   */
  labels: _propTypes.default.shape({
    title: _propTypes.default.string.isRequired
  }),

  /**
   *  Controls whether the file's title should be visible
   */
  hasNoVisibleTitle: _propTypes.default.bool
};
var defaultProps = {
  assistiveText: {
    download: 'download',
    link: 'Preview:',
    loading: 'loading',
    moreActions: 'more actions'
  },
  crop: '16-by-9',
  href: '#',
  isLoading: false,
  hasNoVisibleTitle: false
};
/**
 * File is a component that represents content uploaded as an attachment.
 */

var File = /*#__PURE__*/function (_React$Component) {
  _inherits(File, _React$Component);

  var _super = _createSuper(File);

  function File(props) {
    var _this;

    _classCallCheck(this, File);

    _this = _super.call(this, props);

    _defineProperty(_assertThisInitialized(_this), "handleOnClickImage", function (event) {
      if (_this.props.href === '#') {
        event.preventDefault();
      }

      if (_this.props.onClickImage) {
        _this.props.onClickImage(event);
      }
    });

    _this.generatedId = _shortid.default.generate();
    return _this;
  }
  /**
   * Get the File's HTML id. Generate a new one if no ID present.
   */


  _createClass(File, [{
    key: "getId",
    value: function getId() {
      return this.props.id || this.generatedId;
    }
  }, {
    key: "render",
    value: function render() {
      var assistiveText = _objectSpread(_objectSpread({}, defaultProps.assistiveText), this.props.assistiveText);

      return /*#__PURE__*/_react.default.createElement("div", {
        id: this.getId(),
        className: (0, _classnames.default)('slds-file', 'slds-file_card', !this.props.hasNoVisibleTitle ? 'slds-has-title' : null, this.props.className)
      }, /*#__PURE__*/_react.default.createElement("figure", null, /*#__PURE__*/_react.default.createElement("a", {
        href: this.props.href,
        className: (0, _classnames.default)('slds-file__crop', this.props.crop ? "slds-file__crop_".concat(this.props.crop) : null),
        onClick: this.handleOnClickImage
      }, /*#__PURE__*/_react.default.createElement(_fileFigure.default, {
        assistiveText: assistiveText,
        labels: {
          title: this.props.labels.title
        },
        isLoading: this.props.isLoading,
        image: this.props.image,
        icon: this.props.icon
      })), !this.props.hasNoVisibleTitle ? /*#__PURE__*/_react.default.createElement("figcaption", {
        className: "slds-file__title slds-file__title_card"
      }, /*#__PURE__*/_react.default.createElement("div", {
        className: "slds-media__figure slds-line-height_reset"
      }, this.props.icon ? /*#__PURE__*/_react.default.cloneElement(this.props.icon, {
        size: 'x-small'
      }) : null), /*#__PURE__*/_react.default.createElement("div", {
        className: "slds-media__body"
      }, /*#__PURE__*/_react.default.createElement("span", {
        className: "slds-file__text slds-truncate",
        title: this.props.labels.title
      }, this.props.labels.title))) : null), this.props.externalIcon ? /*#__PURE__*/_react.default.createElement("div", {
        className: "slds-file__external-icon"
      }, /*#__PURE__*/_react.default.cloneElement(this.props.externalIcon, {
        containerClassName: 'slds-file__icon slds-icon_container'
      })) : null, this.props.moreActionsDropdown ? File.injectMoreActionsStyles() : null, /*#__PURE__*/_react.default.createElement(_fileActions.default, {
        assistiveText: assistiveText,
        hasNoVisibleTitle: this.props.hasNoVisibleTitle,
        onClickDownload: this.props.onClickDownload,
        moreActionsDropdown: this.props.moreActionsDropdown
      }));
    }
  }], [{
    key: "injectMoreActionsStyles",
    value: function injectMoreActionsStyles() {
      return /*#__PURE__*/_react.default.createElement("style", null, "\n\t\t\t\t\t.dsr-file__more-actions-dropdown  ul.dropdown__list li.slds-dropdown__item > a:before\n\t\t\t\t\t{ background: none; }\n\t\t\t\t\t.dsr-file__more-actions-dropdown  ul.dropdown__list li.slds-dropdown__item > a:after\n\t\t\t\t\t{ background: none; }\n\t\t\t\t\t.dsr-file__more-actions > button:first-child\n\t\t\t\t\t{ border-radius: 0 0.25rem 0.25rem 0!important;}\n\t\t\t");
    }
  }]);

  return File;
}(_react.default.Component);

File.displayName = displayName;
File.propTypes = propTypes;
File.defaultProps = defaultProps;
var _default = File;
exports.default = _default;