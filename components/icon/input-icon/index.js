"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _lodash = _interopRequireDefault(require("lodash.isfunction"));

var _utilityIcon = _interopRequireDefault(require("../../utilities/utility-icon"));

var _button = _interopRequireDefault(require("../../button"));

var _constants = require("../../../utilities/constants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

/**
 * A wrapper for icons that will be rendered inside of an Input
 *
 * If the `onClick` function prop is provided, the `design-system-react/components/button` component is used.
 * If not, the icon will be an instance of `design-system-react/components/utilities/utility-icon`.
 * Checkout out the appropriate component to see what props can be passed along via the `{...props}` rest operator
 */
var InputIcon = function InputIcon(props) {
  var category = props.category,
      iconPosition = props.iconPosition,
      name = props.name,
      path = props.path,
      onClick = props.onClick,
      variant = props.variant,
      rest = _objectWithoutProperties(props, ["category", "iconPosition", "name", "path", "onClick", "variant"]); // need to pass click event up on SVG


  var variants = {
    combobox: /*#__PURE__*/_react.default.createElement("span", {
      className: "slds-icon_container slds-input__icon slds-input__icon_right"
    }, /*#__PURE__*/_react.default.createElement(_utilityIcon.default, _extends({
      "aria-hidden": true,
      category: category,
      className: (0, _classnames.default)('slds-icon slds-icon_x-small slds-icon-text-default'),
      name: name,
      path: path
    }, rest))),
    base: /*#__PURE__*/_react.default.createElement(_utilityIcon.default, _extends({
      "aria-hidden": true,
      category: category,
      className: (0, _classnames.default)('slds-input__icon slds-icon-text-default', _defineProperty({}, "slds-input__icon_".concat(iconPosition), iconPosition)),
      name: name,
      path: path
    }, rest))
  };
  return (0, _lodash.default)(onClick) ? /*#__PURE__*/_react.default.createElement(_button.default, _extends({
    className: (0, _classnames.default)('slds-input__icon', _defineProperty({}, "slds-input__icon_".concat(iconPosition), iconPosition)),
    iconCategory: category,
    iconName: name,
    iconPath: path,
    onClick: onClick,
    variant: "icon"
  }, rest)) : variants[variant];
};

InputIcon.displayName = _constants.ICON_INPUT;
InputIcon.propTypes = {
  /**
   * Icon category from [lightningdesignsystem.com/icons/](https://www.lightningdesignsystem.com/icons/)
   */
  category: _propTypes.default.string,

  /**
   * This is only needed if an input contains two icons, the Input component handles this prop for you.
   */
  iconPosition: _propTypes.default.oneOf(['left', 'right']),

  /**
   * Name of the icon. Visit <a href='http://www.lightningdesignsystem.com/resources/icons'>Lightning Design System Icons</a> to reference icon names.
   */
  name: _propTypes.default.string,

  /**
   * Path to the icon. This will override any global icon settings.
   */
  path: _propTypes.default.string,

  /**
   * This event fires when the icon is clicked.
   */
  onClick: _propTypes.default.func,

  /**
   * Changes styles of the InputIcon.
   */
  variant: _propTypes.default.oneOf(['base', 'combobox'])
};
InputIcon.defaultProps = {
  category: 'utility',
  variant: 'base'
};
var _default = InputIcon;
exports.default = _default;