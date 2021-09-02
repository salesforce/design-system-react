"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _checkProps = _interopRequireDefault(require("./check-props"));

var _constants = require("../../utilities/constants");

var _component = _interopRequireDefault(require("./component.json"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// ### Prop Types
var propTypes = {
  /**
   * **Assistive text for accessibility.**
   * This object is merged with the default props object on every render.
   * * `label`: Assistive text that is read out loud to screen readers.
   */
  assistiveText: _propTypes.default.shape({
    label: _propTypes.default.string
  }),

  /**
   * Custom css classes applied to Spinner container
   */
  containerClassName: _propTypes.default.string,

  /**
   * Custom css properties applied to Spinner container
   */
  containerStyle: _propTypes.default.object,

  /**
   * Render the spinner inside of a container.
   */
  hasContainer: _propTypes.default.bool,

  /**
   * Unique html id placed on div with role="status".
   */
  id: _propTypes.default.string,

  /**
   * Adds delay of 300ms to the spinner
   */
  isDelayed: _propTypes.default.bool,

  /**
   * Add styling to support a spinner inside an input field.
   */
  isInput: _propTypes.default.bool,

  /**
   * Add styling to support an inline spinner inside of the document flow.
   */
  isInline: _propTypes.default.bool,

  /**
   * Determines the size of the spinner
   */
  size: _propTypes.default.oneOf(['xx-small', 'x-small', 'small', 'medium', 'large']),

  /**
   * Determines the color of the spinner: `base` is gray, `brand` is blue, and `inverse` is white.
   */
  variant: _propTypes.default.oneOf(['base', 'brand', 'inverse'])
};
var defaultProps = {
  assistiveText: {
    label: 'Loading...'
  },
  isDelayed: false,
  isInline: false,
  isInput: false,
  hasContainer: true,
  size: 'medium',
  variant: 'base'
};
/**
 * Spinners are CSS loading indicators that should be shown when retrieving data or performing slow computations. In some cases, the first time a parent component loads, a stencil is preferred to indicate network activity.
 */

var Spinner = function Spinner(props) {
  (0, _checkProps.default)(_constants.SPINNER, props, _component.default);
  var containerClassName = props.containerClassName,
      containerStyle = props.containerStyle,
      id = props.id,
      isDelayed = props.isDelayed,
      isInline = props.isInline,
      isInput = props.isInput,
      hasContainer = props.hasContainer,
      size = props.size,
      variant = props.variant;
  var assistiveText = typeof props.assistiveText === 'string' ? props.assistiveText : _objectSpread(_objectSpread({}, defaultProps.assistiveText), props.assistiveText).label;
  var spinnerClassName = (0, _classnames.default)('slds-spinner', _defineProperty({
    'slds-spinner_inline': isInline,
    'slds-input__spinner': isInput,
    'slds-spinner_brand': variant === 'brand',
    'slds-spinner_inverse': variant === 'inverse',
    'slds-spinner_delayed': isDelayed
  }, "slds-spinner_".concat(size), size));

  var spinner = /*#__PURE__*/_react.default.createElement("div", {
    "aria-hidden": "false",
    className: spinnerClassName,
    id: id,
    role: "status"
  }, assistiveText && /*#__PURE__*/_react.default.createElement("span", {
    className: "slds-assistive-text"
  }, assistiveText), /*#__PURE__*/_react.default.createElement("div", {
    className: "slds-spinner__dot-a"
  }), /*#__PURE__*/_react.default.createElement("div", {
    className: "slds-spinner__dot-b"
  }));

  return hasContainer ? /*#__PURE__*/_react.default.createElement("div", {
    className: (0, _classnames.default)(containerClassName, 'slds-spinner_container'),
    style: containerStyle
  }, spinner) : spinner;
};

Spinner.displayName = _constants.SPINNER;
Spinner.propTypes = propTypes;
Spinner.defaultProps = defaultProps;
var _default = Spinner;
exports.default = _default;