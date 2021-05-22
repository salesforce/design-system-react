"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _event = _interopRequireDefault(require("../../utilities/event"));

var _icon = _interopRequireDefault(require("../icon"));

var _constants = require("../../utilities/constants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var propTypes = {
  /**
   * **Assistive text for accessibility**
   * This object is merged with the default props object on every render.
   * * `icon`: Used for the icon next to the link text.
   * * _Tested with snapshot testing._
   */
  assistiveText: _propTypes.default.shape({
    icon: _propTypes.default.string
  }),

  /**
   * Name of the icon category. Visit <a href="http://www.lightningdesignsystem.com/resources/icons">Lightning Design System Icons</a> to reference icon categories.
   */
  iconCategory: _propTypes.default.oneOf(['action', 'custom', 'doctype', 'standard', 'utility']),

  /**
   * Name of the icon. Visit <a href="http://www.lightningdesignsystem.com/resources/icons">Lightning Design System Icons</a> to reference icon names.
   */
  iconName: _propTypes.default.string,

  /**
   * Path to the icon. This will override any global icon settings.
   */
  iconPath: _propTypes.default.string,

  /**
   * Text for the link.
   */
  label: _propTypes.default.string,

  /**
   * Triggered when the link is clicked.
   */
  onClick: _propTypes.default.func
};
var defaultProps = {
  assistiveText: {},
  iconCategory: '',
  iconName: '',
  label: ''
};
/**
 * A link within the navigation section of the header.
 */

var BuilderHeaderNavLink = function BuilderHeaderNavLink(props) {
  var assistiveText = _objectSpread(_objectSpread({}, defaultProps.assistiveText), props.assistiveText);

  return /*#__PURE__*/_react.default.createElement("a", {
    className: "slds-builder-header__item-action slds-media slds-media_center",
    href: "#",
    onClick: _event.default.trappedHandler(props.onClick)
  }, /*#__PURE__*/_react.default.createElement("span", {
    className: "slds-media__figure"
  }, /*#__PURE__*/_react.default.createElement(_icon.default, {
    assistiveText: {
      label: assistiveText.icon
    },
    category: props.iconCategory,
    containerClassName: "slds-icon_container slds-icon-utility-settings slds-current-color",
    name: props.iconName,
    path: props.iconPath,
    size: "x-small"
  })), /*#__PURE__*/_react.default.createElement("span", {
    className: "slds-media__body"
  }, /*#__PURE__*/_react.default.createElement("span", {
    className: "slds-truncate",
    title: props.label
  }, props.label)));
};

BuilderHeaderNavLink.displayName = _constants.BUILDER_HEADER_NAV_LINK;
BuilderHeaderNavLink.propTypes = propTypes;
var _default = BuilderHeaderNavLink;
exports.default = _default;