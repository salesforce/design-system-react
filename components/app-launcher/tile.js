"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _checkProps = _interopRequireDefault(require("./check-props"));

var _component = _interopRequireDefault(require("./component.json"));

var _button = _interopRequireDefault(require("../button"));

var _highlighter = _interopRequireDefault(require("../utilities/highlighter"));

var _tooltip = _interopRequireDefault(require("../tooltip"));

var _truncate = _interopRequireDefault(require("../utilities/truncate"));

var _constants = require("../../utilities/constants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

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
   * **Assistive text for accessibility.**
   * * `dragIconText`: Text that describes the purpose of the drag handle icon.
   */
  assistiveText: _propTypes.default.shape({
    dragIconText: _propTypes.default.string
  }),

  /**
   * Class names to be added to the tile.
   */
  className: _propTypes.default.oneOfType([_propTypes.default.array, _propTypes.default.object, _propTypes.default.string]),

  /**
   * The description of the app. Not visible on small tiles.
   */
  description: _propTypes.default.string,

  /**
   * Heading for app description. NOTE: this prop is DEPRECATED and use should be avoided
   */
  descriptionHeading: _propTypes.default.string,

  /**
   * The `href` attribute of the tile. Please pass in bookmarkable URLs from your routing library. If the `onClick` callback is specified this URL will be prevented from changing the browser's location.
   */
  href: _propTypes.default.string,

  /**
   * Background color to be used on the icon. Only applied if iconNode is undefined
   */
  iconBackgroundColor: _propTypes.default.string,

  /**
   * Icon node for app tile. Takes priority over `iconText`
   */
  iconNode: _propTypes.default.node,

  /**
   * Text to be used as an icon. Only renders if iconNode is undefined
   */
  iconText: _propTypes.default.string,

  /**
   * Open the More Tooltip
   */
  isOpenTooltip: _propTypes.default.bool,

  /**
   * The localized text for the "More information" tooltip.
   */
  moreLabel: _propTypes.default.string,

  /**
   * Function that will be executed when clicking on a tile
   */
  onClick: _propTypes.default.func,

  /**
   * Text used to highlight content in app tiles
   */
  search: _propTypes.default.string,

  /**
   * App name for the tile's title.
   */
  title: _propTypes.default.string.isRequired // Future feature: add Highlighter to Truncate text (https://github.com/ShinyChang/React-Text-Truncate/issues/32)

};
var defaultProps = {
  assistiveText: {
    dragIconText: 'Reorder'
  },
  href: '#',
  moreLabel: ' More'
};
/**
 * App Launcher Tiles provide information and links to a user's apps
 */

var AppLauncherTile = /*#__PURE__*/function (_React$Component) {
  _inherits(AppLauncherTile, _React$Component);

  var _super = _createSuper(AppLauncherTile);

  function AppLauncherTile(props) {
    var _this;

    _classCallCheck(this, AppLauncherTile);

    _this = _super.call(this, props); // `checkProps` issues warnings to developers about properties (similar to React's built in development tools)

    _defineProperty(_assertThisInitialized(_this), "handleClick", function (event) {
      if (_this.props.onClick) {
        event.preventDefault();

        _this.props.onClick(event, {
          href: _this.props.href
        });
      }
    });

    (0, _checkProps.default)(_constants.APP_LAUNCHER_TILE, props, _component.default);
    return _this;
  }

  _createClass(AppLauncherTile, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      var dragButtonAriaProps = {
        'aria-pressed': false
      };
      var iconStyles = {};

      if (this.props.iconBackgroundColor) {
        iconStyles.backgroundColor = this.props.iconBackgroundColor;
      }

      return /*#__PURE__*/_react.default.createElement("div", {
        className: (0, _classnames.default)('slds-app-launcher__tile slds-text-link_reset slds-is-draggable', // NOTE: while the draggable class is here for stylistic purposes, the draggable attribute is not present as draggability has not been implemented yet
        this.props.className),
        onClick: this.handleClick,
        role: "button",
        tabIndex: "0"
      }, /*#__PURE__*/_react.default.createElement("div", {
        className: "slds-app-launcher__tile-figure"
      }, this.props.iconNode || /*#__PURE__*/_react.default.createElement("span", {
        className: "slds-avatar slds-avatar_large"
      }, /*#__PURE__*/_react.default.createElement("abbr", {
        className: "slds-avatar__initials slds-icon-custom-27",
        style: iconStyles,
        title: this.props.title
      }, this.props.iconText)), /*#__PURE__*/_react.default.createElement("div", {
        className: "slds-m-top_xxx-small"
      }, /*#__PURE__*/_react.default.createElement(_button.default, _extends({
        assistiveText: {
          icon: this.props.assistiveText.dragIconText
        },
        iconCategory: "utility",
        iconName: "rows",
        title: this.props.assistiveText.dragIconText,
        variant: "icon"
      }, dragButtonAriaProps)))), /*#__PURE__*/_react.default.createElement("div", {
        className: "slds-app-launcher__tile-body"
      }, /*#__PURE__*/_react.default.createElement("a", {
        href: this.props.href,
        onClick: function onClick(event) {
          return _this2.props.href === '#' && event.preventDefault();
        }
      }, /*#__PURE__*/_react.default.createElement(_highlighter.default, {
        search: this.props.search
      }, this.props.title)), /*#__PURE__*/_react.default.createElement(_truncate.default, {
        line: 2,
        prefix: this.props.descriptionHeading && this.props.descriptionHeading.toUpperCase(),
        suffix: this.props.moreLabel,
        text: this.props.description,
        textTruncateChild: /*#__PURE__*/_react.default.createElement(_tooltip.default, {
          align: "bottom",
          content: /*#__PURE__*/_react.default.createElement(_highlighter.default, {
            search: this.props.search
          }, this.props.description),
          isOpen: this.props.isOpenTooltip
        }, /*#__PURE__*/_react.default.createElement(_button.default, {
          className: "slds-button_reset slds-text-link",
          variant: "base"
        }, this.props.moreLabel)),
        wrapper: function wrapper(text, textTruncateChild) {
          return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, _this2.props.descriptionHeading &&
          /*#__PURE__*/
          // inline style override
          _react.default.createElement("div", {
            className: "slds-text-heading_label",
            style: {
              letterSpacing: '0.025rem'
            }
          }, _this2.props.descriptionHeading, ' '), /*#__PURE__*/_react.default.createElement(_highlighter.default, {
            search: _this2.props.search
          }, text), textTruncateChild && ' ', textTruncateChild);
        }
      })));
    }
  }]);

  return AppLauncherTile;
}(_react.default.Component);

AppLauncherTile.displayName = _constants.APP_LAUNCHER_TILE;
AppLauncherTile.defaultProps = defaultProps;
AppLauncherTile.propTypes = propTypes;
var _default = AppLauncherTile;
exports.default = _default;