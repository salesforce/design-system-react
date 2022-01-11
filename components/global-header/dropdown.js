"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _menuDropdown = _interopRequireDefault(require("../menu-dropdown"));

var _dropdownTrigger = _interopRequireDefault(require("./private/dropdown-trigger"));

var _checkProps = _interopRequireDefault(require("./check-props"));

var _constants = require("../../utilities/constants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

/**
 * This component is an implementation of `MenuDropdown` with a custom trigger. All the properties listed below are provided to the `MenuDropdown` component. Any additional properties are provided to the Custom Trigger (that is the `Button` or `li` tag).
 */
var GlobalHeaderDropdown = function GlobalHeaderDropdown(props) {
  (0, _checkProps.default)(_constants.GLOBAL_HEADER_DROPDOWN, props);

  var globalAction = props.globalAction,
      iconVariant = props.iconVariant,
      rest = _objectWithoutProperties(props, ["globalAction", "iconVariant"]);

  var iconVariantOverride;

  if (globalAction) {
    iconVariantOverride = 'container';
  }

  return /*#__PURE__*/_react.default.createElement(_menuDropdown.default, _extends({
    nubbinPosition: "top right"
  }, rest), /*#__PURE__*/_react.default.createElement(_dropdownTrigger.default, {
    globalAction: globalAction,
    iconSize: globalAction && 'small',
    iconVariant: iconVariantOverride || iconVariant
  }));
}; // ### Display Name
// Always use the canonical component name (set in the core) as the React
// display name.


GlobalHeaderDropdown.displayName = _constants.GLOBAL_HEADER_TOOL; // ### Prop Types

GlobalHeaderDropdown.propTypes = {
  /**
   * Aligns the right or left side of the menu with the respective side of the trigger. This is not intended for use with `nubbinPosition`.
   */
  align: _propTypes.default.oneOf(['left', 'right']),

  /**
   * Extra classnames to apply to the dropdown menu.
   */
  className: _propTypes.default.string,

  /**
   * CSS classes to be added to `li` element.
   */
  buttonClassName: _propTypes.default.oneOfType([_propTypes.default.array, _propTypes.default.object, _propTypes.default.string]),

  /**
   * Name of the icon. Visit <a href="http://www.lightningdesignsystem.com/resources/icons">Lightning Design System Icons</a> to reference icon names.
   */
  iconName: _propTypes.default.string,

  /**
   * For icon variants, please reference <a href="http://www.lightningdesignsystem.com/components/buttons/#icon">Lightning Design System Icons</a>.
   */
  iconVariant: _propTypes.default.oneOf(['bare', 'container', 'border', 'border-filled', 'more', 'global-header']),

  /**
   * A unique ID is needed in order to support keyboard navigation, ARIA support, and connect the dropdown to the triggering button.
   */
  id: _propTypes.default.string,

  /**
   * Adds custom styling such as inverse fill and special sizing/spacing
   */
  globalAction: _propTypes.default.bool,

  /**
   * Positions dropdown menu with a nubbin--that is the arrow notch. The placement options correspond to the placement of the nubbin. This is implemeted with CSS classes and is best used with a `Button` with "icon container" styling. Dropdown menus will still be contained to the closest scrolling parent.
   */
  nubbinPosition: _propTypes.default.oneOf(['top left', 'top', 'top right', 'bottom left', 'bottom', 'bottom right']),

  /**
   *  Offset adds pixels to the absolutely positioned dropdown menu in the format: ([vertical]px [horizontal]px).
   */
  offset: _propTypes.default.string,

  /**
   * Triggered when an item in the menu is clicked.
   */
  onSelect: _propTypes.default.func,

  /**
   * An array of menu item.
   */
  options: _propTypes.default.array.isRequired
}; // ### Default Props

GlobalHeaderDropdown.defaultProps = {
  align: 'right',
  buttonVariant: 'icon',
  iconVariant: 'global-header',
  nubbinPosition: 'top right'
};
var _default = GlobalHeaderDropdown;
exports.default = _default;