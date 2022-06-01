"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _checkProps = _interopRequireDefault(require("./check-props"));

var _component = _interopRequireDefault(require("./component.json"));

var _classNames2 = _interopRequireDefault(require("../../utilities/class-names"));

var _utilityIcon = _interopRequireDefault(require("../utilities/utility-icon"));

var _iconBackgrounds = _interopRequireDefault(require("../../utilities/product-tokens/icon-backgrounds"));

var _constants = require("../../utilities/constants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var defaultProps = {
  assistiveText: {},
  category: 'standard',
  colorVariant: 'default',
  size: 'medium'
};
/**
 * The Icon component is the Lightning Design System Icon component and should be used for naked icons. For icons that are buttons, use the <a href='/components/buttons/'>Button component</a> component with <code>variant='icon'</code>.
 */

var Icon = function Icon(props) {
  (0, _checkProps.default)(_constants.ICON, props, _component.default);
  var category = props.category,
      className = props.className,
      colorVariant = props.colorVariant,
      containerClassName = props.containerClassName,
      containerStyle = props.containerStyle,
      icon = props.icon,
      inverse = props.inverse,
      name = props.name,
      path = props.path,
      size = props.size,
      title = props.title,
      productTheme = props.productTheme;
  var style = props.style;

  if (productTheme) {
    style = _objectSpread({
      backgroundColor: _iconBackgrounds.default[productTheme]
    }, style);
  }

  var assistiveText = typeof props.assistiveText === 'string' ? props.assistiveText : _objectSpread(_objectSpread({}, defaultProps.assistiveText), props.assistiveText).label;
  var kababCaseName = name ? name.replace(/_/g, '-') : '';
  return /*#__PURE__*/_react.default.createElement("span", {
    className: (0, _classNames2.default)(_defineProperty({
      'slds-icon_container': category !== 'utility',
      'slds-icon_container_circle': category === 'action'
    }, "slds-icon-".concat(category, "-").concat(kababCaseName), category !== 'utility' && category !== 'doctype' && !path), containerClassName),
    style: containerStyle,
    title: title
  }, /*#__PURE__*/_react.default.createElement(_utilityIcon.default, {
    "aria-hidden": "true",
    category: category,
    className: (0, _classNames2.default)(className, 'slds-icon', {
      'slds-icon_xx-small': size === 'xx-small',
      'slds-icon_x-small': size === 'x-small',
      'slds-icon_small': size === 'small',
      // medium intentially not present
      'slds-icon_large': size === 'large',
      // if category is `utility` and `inverse` is false (default), icon will be dark // return true
      // if category is `utility` and `inverse` is true, icon will be light // return false
      // if category is NOT `utility` and `inverse` is false (default), icon will be light // return false
      // if category is NOT `utility` and `inverse` is true, icon will be dark // return true
      'slds-icon-text-default': colorVariant === 'default' && category === 'utility' ? !inverse : inverse,
      'slds-icon-text-success': colorVariant === 'success',
      'slds-icon-text-warning': colorVariant === 'warning',
      'slds-icon-text-error': colorVariant === 'error',
      'slds-icon-text-light': colorVariant === 'light'
    }),
    icon: icon,
    name: name,
    path: path,
    style: style
  }), assistiveText ? /*#__PURE__*/_react.default.createElement("span", {
    className: "slds-assistive-text"
  }, assistiveText) : '');
}; // ### Display Name
// Always use the canonical component name as the React display name.


Icon.displayName = _constants.ICON; // ### Prop Types

Icon.propTypes = {
  /**
   * **Assistive text for accessibility.**
   * This object is merged with the default props object on every render.
   * * `label`: Text that is visually hidden but read aloud by screenreaders to tell the user what the icon means. Naked icons must have assistive text, however, if you also have visible descriptive text with the icon, declare this prop as <code>assistiveText=''</code>.
   */
  assistiveText: _propTypes.default.shape({
    label: _propTypes.default.string
  }),

  /**
   * Icon category from [lightningdesignsystem.com/icons/](https://www.lightningdesignsystem.com/icons/)
   */
  category: _propTypes.default.oneOf(['action', 'custom', 'doctype', 'standard', 'utility']).isRequired,

  /**
   * CSS classes that are applied to the SVG.
   */
  className: _propTypes.default.oneOfType([_propTypes.default.array, _propTypes.default.object, _propTypes.default.string]),

  /**
   * CSS classes that are applied to the span.
   */
  containerClassName: _propTypes.default.oneOfType([_propTypes.default.array, _propTypes.default.object, _propTypes.default.string]),

  /**
   * Styles that are applied to the span.
   */
  containerStyle: _propTypes.default.object,

  /**
   * Icon color variants
   */
  colorVariant: _propTypes.default.oneOf(['base', 'default', 'error', 'light', 'warning', 'success']),

  /**
   * A custom SVG object to use instead of the supplied SLDS icons, look in `design-system-react/icons` for examples and syntax.
   */
  icon: _propTypes.default.object,

  /**
   * Setting `inverse` to true will switch the color of the icon: light to dark, dark to light.
   */
  inverse: _propTypes.default.bool,

  /**
   * Name of the icon. Visit <a href='http://www.lightningdesignsystem.com/resources/icons'>Lightning Design System Icons</a> to reference icon names.
   */
  name: _propTypes.default.string,

  /**
   * Path to the icon. This will override any global icon settings
   */
  path: _propTypes.default.string,

  /**
   * Background theme color for the icon. **Only compatible with icon category `standard`**
   */
  productTheme: _propTypes.default.oneOf(['global-setup', 'service-cloud', 'industry-cloud', 'sales-cloud', 'commerce-cloud', 'community-cloud', 'marketing-cloud', 'quip']),

  /**
   * Size of the icon. Visit [lightningdesignsystem.com/components/icons/#flavor-sizes](https://www.lightningdesignsystem.com/components/icons/#flavor-sizes)
   */
  size: _propTypes.default.oneOf(['xx-small', 'x-small', 'small', 'medium', 'large']),

  /**
   * Custom styles to be passed to the SVG. Could be used to change icon or background color.
   */
  style: _propTypes.default.object,

  /**
   * Title attribute for the icon container
   */
  title: _propTypes.default.string
};
Icon.defaultProps = defaultProps;
var _default = Icon;
exports.default = _default;