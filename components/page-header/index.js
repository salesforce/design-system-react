"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "Info", {
  enumerable: true,
  get: function get() {
    return _info.default;
  }
});
Object.defineProperty(exports, "Title", {
  enumerable: true,
  get: function get() {
    return _title.default;
  }
});
Object.defineProperty(exports, "DetailRow", {
  enumerable: true,
  get: function get() {
    return _detailRow.default;
  }
});
Object.defineProperty(exports, "DetailBlock", {
  enumerable: true,
  get: function get() {
    return _detailBlock.default;
  }
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _checkProps = _interopRequireDefault(require("./check-props"));

var _component = _interopRequireDefault(require("./component.json"));

var _info = _interopRequireDefault(require("./private/info"));

var _title = _interopRequireDefault(require("./private/title"));

var _detailRow = _interopRequireDefault(require("./private/detail-row"));

var _detailBlock = _interopRequireDefault(require("./private/detail-block"));

var _base = _interopRequireDefault(require("./private/base"));

var _recordHome = _interopRequireDefault(require("./private/record-home"));

var _objectHome = _interopRequireDefault(require("./private/object-home"));

var _relatedList = _interopRequireDefault(require("./private/related-list"));

var _constants = require("../../utilities/constants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

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

var displayName = _constants.PAGE_HEADER;
var propTypes = {
  /**
   * Optional class name
   */
  className: _propTypes.default.oneOfType([_propTypes.default.array, _propTypes.default.object, _propTypes.default.string]),

  /**
   * An array of detail blocks (used in `recordHome` variant)
   */
  details: _propTypes.default.array,

  /**
   * The label property can be a string or a React element
   */
  label: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.element]),

  /**
   * The page header icon. Expects an Icon component
   */
  icon: _propTypes.default.element,

  /**
   * The info property can be a string or a React element. Can't be used with the `record-home` variant.
   */
  info: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.element]),

  /**
   * Makes PageHeader joinable with DataTable by adding appropriate classes/styling
   */
  joined: _propTypes.default.bool,

  /**
   * Used with the `object-home` variant. Accepts a node, typically a Dropdown component
   */
  nameSwitcherDropdown: _propTypes.default.node,

  /**
   * Actions content to appear on the upper right side of the page header.
   * Returned content must be either a SLDSPageHeaderControl component or an element/fragment with children that are all SLDSPageHeaderControl components.
   * Prop 'contentRight' will be deprecated soon, use 'onRenderActions' instead.
   */
  onRenderActions: _propTypes.default.func,

  /**
   * Controls content to appear on the lower right side of the page header.
   * Returned content must be either a SLDSPageHeaderControl component or an element/fragment with children that are all SLDSPageHeaderControl components.
   * Prop 'navRight' will be deprecated soon, use 'onRenderControls' instead.
   */
  onRenderControls: _propTypes.default.func,

  /**
   * The title property can be a string or a React element
   */
  title: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.element]),

  /**
   * An array of react elements presumably anchor <a> elements.
   */
  trail: _propTypes.default.array,

  /**
   * The type of component
   * Note: Extra options are added to make the version backward compatible
   */
  variant: _propTypes.default.oneOf(['base', 'object-home', 'record-home', 'related-list'])
};
var defaultProps = {
  variant: 'base'
};
/**
 * The PageHeader component adds PageHeader, PageHeader.Info, PageHeader.Title, PageHeader.DetailRow, and PageHeader.DetailBlock.
 */

var PageHeader = /*#__PURE__*/function (_Component) {
  _inherits(PageHeader, _Component);

  var _super = _createSuper(PageHeader);

  function PageHeader() {
    _classCallCheck(this, PageHeader);

    return _super.apply(this, arguments);
  }

  _createClass(PageHeader, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      (0, _checkProps.default)(_constants.PAGE_HEADER, this.props, _component.default);
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
          className = _this$props.className,
          variant = _this$props.variant;
      var classes = (0, _classnames.default)('slds-page-header', {
        'slds-page-header_record-home': variant === 'record-home' || variant === 'recordHome',
        'slds-page-header_related-list': variant === 'related-list' || variant === 'relatedList',
        'slds-page-header_joined': this.props.joined
      }, className);
      var Variant;

      switch (variant) {
        case 'object-home':
        case 'objectHome':
          // For backward compatibility
          Variant = _objectHome.default;
          break;

        case 'record-home':
        case 'recordHome':
          // For backward compatibility
          Variant = _recordHome.default;
          break;

        case 'related-list':
        case 'relatedList':
          // For backward compatibility
          Variant = _relatedList.default;
          break;

        default:
          Variant = _base.default;
      }

      return /*#__PURE__*/_react.default.createElement("div", {
        className: classes
      }, /*#__PURE__*/_react.default.createElement(Variant, this.props));
    }
  }]);

  return PageHeader;
}(_react.Component);

PageHeader.displayName = displayName;
PageHeader.propTypes = propTypes;
PageHeader.defaultProps = defaultProps;
var _default = PageHeader; // NOTE: these are private components and are prone to breaking changes.
// Do not use these in your app! These exports are for legacy use only.

exports.default = _default;