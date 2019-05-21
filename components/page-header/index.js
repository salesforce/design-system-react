"use strict";

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

var _docs = _interopRequireDefault(require("./docs.json"));

var _info = _interopRequireDefault(require("./private/info"));

var _title = _interopRequireDefault(require("./private/title"));

var _detailRow = _interopRequireDefault(require("./private/detail-row"));

var _detailBlock = _interopRequireDefault(require("./private/detail-block"));

var _base = _interopRequireDefault(require("./private/base"));

var _recordHome = _interopRequireDefault(require("./private/record-home"));

var _objectHome = _interopRequireDefault(require("./private/object-home"));

var _relatedList = _interopRequireDefault(require("./private/related-list"));

var _icon = _interopRequireDefault(require("../icon"));

var _breadcrumb = _interopRequireDefault(require("../breadcrumb"));

var _constants = require("../../utilities/constants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var displayName = _constants.PAGE_HEADER;
var propTypes = {
  /**
   * Optional class name
   */
  className: _propTypes.default.string,

  /**
   * The type of component
   * Note: Extra options are added to make the version backward compatible
   */
  variant: _propTypes.default.oneOf(['base', 'object-home', 'record-home', 'related-list']),

  /**
   * The info property can be a string or a React element
   */
  label: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.element]),

  /**
   * The title property can be a string or a React element
   */
  title: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.element]),

  /**
   * The info property can be a string or a React element
   */
  info: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.element]),

  /**
   * The page header icon
   */
  icon: _propTypes.default.element,

  /**
   * Name of the icon. Visit <a href="http://www.lightningdesignsystem.com/resources/icons">Lightning Design System Icons</a> to reference icon names.
   */
  iconName: _propTypes.default.string,

  /**
   * The icons category
   */
  iconCategory: _propTypes.default.oneOf(['action', 'custom', 'doctype', 'standard', 'utility']),

  /**
   * If omitted, icon position is centered.
   */
  iconPosition: _propTypes.default.oneOf(['left', 'right']),

  /**
   * Determines the size of the icon.
   */
  iconSize: _propTypes.default.oneOf(['x-small', 'small', 'medium', 'large']),

  /**
   * For icon variants, please reference <a href='http://www.lightningdesignsystem.com/components/buttons/#icon'>Lightning Design System Icons</a>.
   */
  iconVariant: _propTypes.default.oneOf(['container', 'border', 'border-filled', 'small', 'more']),

  /**
   * Content to appear on the right hand side of the page header
   * prop 'contentRight' will be deprecated soon, use 'onRenderActions' instead
   */
  onRenderActions: _propTypes.default.func,

  /**
   * An array of buttons which appear on the component's right hand side.
   */
  details: _propTypes.default.array,

  /**
   * Nav content which appears in the upper right hand corner.
   * prop 'navRight' will be deprecated soon, use 'onRenderControls' instead
   */
  onRenderControls: _propTypes.default.func,

  /**
   * An array of react elements presumably anchor <a> elements.
   */
  trail: _propTypes.default.array
};
var defaultProps = {
  className: '',
  variant: 'base',
  details: [],
  trail: []
};
/**
 * The PageHeader component adds PageHeader, PageHeader.Info, PageHeader.Title, PageHeader.DetailRow, and PageHeader.DetailBlock.
 */

var PageHeader =
/*#__PURE__*/
function (_Component) {
  _inherits(PageHeader, _Component);

  function PageHeader() {
    _classCallCheck(this, PageHeader);

    return _possibleConstructorReturn(this, _getPrototypeOf(PageHeader).apply(this, arguments));
  }

  _createClass(PageHeader, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      (0, _checkProps.default)(_constants.PAGE_HEADER, this.props, _docs.default);
    }
  }, {
    key: "_getClassNames",
    value: function _getClassNames(className) {
      return (0, _classnames.default)('slds-page-header', {
        'slds-page-header_object-home': this.props.variant === 'object-home' || this.props.variant === 'objectHome'
      }, className);
    }
  }, {
    key: "render",
    value: function render() {
      /**
       * OPTIMIZE ES7 style object destructuring removes the need for _.omit.
       * Example: const {foo, ...bar} = this.props;
       */
      var _this$props = this.props,
          className = _this$props.className,
          contentRight = _this$props.contentRight,
          details = _this$props.details,
          icon = _this$props.icon,
          iconCategory = _this$props.iconCategory,
          iconName = _this$props.iconName,
          iconPosition = _this$props.iconPosition,
          iconSize = _this$props.iconSize,
          iconVariant = _this$props.iconVariant,
          info = _this$props.info,
          label = _this$props.label,
          navRight = _this$props.navRight,
          onRenderActions = _this$props.onRenderActions,
          onRenderControls = _this$props.onRenderControls,
          title = _this$props.title,
          trail = _this$props.trail,
          variant = _this$props.variant;

      var classes = this._getClassNames(className);
      /**
       * Render the icon
       */


      var renderIcon = function renderIcon() {
        if (iconName) {
          return _react.default.createElement(_icon.default, {
            name: iconName,
            category: iconCategory,
            position: iconPosition,
            size: iconSize,
            variant: iconVariant
          });
        }

        return icon;
      };
      /**
       * Render the label
       */


      var renderLabel = function renderLabel() {
        var type = _typeof(label);

        if (trail.length > 0) {
          return _react.default.createElement("nav", {
            className: "slds-m-bottom_xx-small",
            role: "navigation"
          }, _react.default.createElement(_breadcrumb.default, {
            trail: trail
          }));
        }

        if (type === 'string') {
          return _react.default.createElement("p", {
            className: "slds-line-height_reset"
          }, label);
        }

        return label;
      };
      /**
       * Render the title
       */


      var renderTitle = function renderTitle() {
        var type = _typeof(title);

        if (type === 'string') {
          return _react.default.createElement(_title.default, {
            title: title
          });
        }

        return title;
      };
      /**
       * Render info
       */


      var renderInfo = function renderInfo() {
        var type = _typeof(info);

        if (type === 'string') {
          return _react.default.createElement(_info.default, null, info);
        }

        return info;
      };
      /**
       * Handles onRenderActions
       */


      var renderOnRenderActions = function renderOnRenderActions() {
        if (onRenderActions) {
          var Actions = onRenderActions;
          return _react.default.createElement("div", {
            className: "slds-col slds-no-flex slds-grid slds-align-top"
          }, _react.default.createElement(Actions, null));
        }

        return null;
      };
      /**
       * Steal contentRight's children
       */


      var renderContentRight = function renderContentRight() {
        if (onRenderActions) {
          return '';
        } else if (contentRight) {
          var type = _typeof(contentRight);

          if (type !== 'string') {
            return _react.default.createElement("div", _extends({
              className: "slds-col slds-no-flex slds-grid slds-align-top"
            }, contentRight.props));
          }
        }

        return '';
      };
      /**
       * Handles onRenderControls
       */


      var renderOnRenderControls = function renderOnRenderControls() {
        if (onRenderControls) {
          var Controls = onRenderControls;
          return _react.default.createElement("div", {
            className: "slds-col slds-no-flex slds-grid slds-align-top"
          }, _react.default.createElement(Controls, null));
        }

        return null;
      };
      /**
       * Steal navRight's children
       * For backward compatibility, this function can be deleted once 'navRight' prop is deprecated
       */


      var renderNavRight = function renderNavRight() {
        if (onRenderControls) {
          return '';
        } else if (navRight) {
          var type = _typeof(navRight);

          if (type !== 'string') {
            return _react.default.createElement("div", _extends({
              className: "slds-col slds-no-flex slds-grid slds-align-top"
            }, navRight.props));
          }
        }

        return '';
      };

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

      return _react.default.createElement("div", {
        className: classes
      }, _react.default.createElement(Variant, {
        label: renderLabel(),
        icon: renderIcon(),
        title: renderTitle(),
        info: renderInfo(),
        contentRight: renderContentRight() // For backward compatibility, 'contentRight' prop will be deprecated sooon
        ,
        navRight: renderNavRight() // For backward compatibility, 'navRight' prop will be deprecate soon
        ,
        onRenderActions: renderOnRenderActions(),
        onRenderControls: renderOnRenderControls(),
        details: details
      }));
    }
  }]);

  return PageHeader;
}(_react.Component);

PageHeader.displayName = displayName;
PageHeader.propTypes = propTypes;
PageHeader.defaultProps = defaultProps;
var _default = PageHeader;
exports.default = _default;