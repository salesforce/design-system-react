"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require("classnames");

var _classnames2 = _interopRequireDefault(_classnames);

var _checkProps = require("./check-props");

var _checkProps2 = _interopRequireDefault(_checkProps);

var _constants = require("../../utilities/constants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// ### Prop Types
var PROP_TYPES = {
  /**
   * **Assistive text for accessibility.**
   * This object is merged with the default props object on every render.
   * * `label`: Assistive text that is read out loud to screen readers.
   */
  assistiveText: _propTypes2.default.shape({
    label: _propTypes2.default.string
  }),

  /**
   * Custom css classes applied to Spinner container
   */
  containerClassName: _propTypes2.default.string,

  /**
   * Unique html id placed on div with role="status".
   */
  id: _propTypes2.default.string,

  /**
   * Determines if spinner is inside input field
   */
  isInput: _propTypes2.default.bool,

  /**
   * Determines the size of the spinner
   */
  size: _propTypes2.default.oneOf(['x-small', 'small', 'medium', 'large']),

  /**
   * Determines the color of the spinner: `base` is gray, `brand` is blue, and `inverse` is white.
   */
  variant: _propTypes2.default.oneOf(['base', 'brand', 'inverse'])
};
var DEFAULT_PROPS = {
  assistiveText: {
    label: 'Loading...'
  },
  size: 'medium',
  variant: 'base'
}; // ## Spinner

var Spinner = function Spinner(props) {
  (0, _checkProps2.default)(_constants.SPINNER, props);
  var containerClassName = props.containerClassName,
      id = props.id,
      isInput = props.isInput,
      size = props.size,
      variant = props.variant;
  var assistiveText = typeof props.assistiveText === 'string' ? props.assistiveText : _objectSpread({}, DEFAULT_PROPS.assistiveText, props.assistiveText).label;
  var spinnerClassName = (0, _classnames2.default)('slds-spinner', _defineProperty({
    'slds-input__spinner': isInput,
    'slds-spinner_brand': variant === 'brand',
    'slds-spinner_inverse': variant === 'inverse'
  }, "slds-spinner_".concat(size), size));
  return _react2.default.createElement("div", {
    className: (0, _classnames2.default)(containerClassName, 'slds-spinner_container')
  }, _react2.default.createElement("div", {
    "aria-hidden": "false",
    className: spinnerClassName,
    id: id,
    role: "status"
  }, assistiveText && _react2.default.createElement("span", {
    className: "slds-assistive-text"
  }, assistiveText), _react2.default.createElement("div", {
    className: "slds-spinner__dot-a"
  }), _react2.default.createElement("div", {
    className: "slds-spinner__dot-b"
  })));
};

Spinner.displayName = _constants.SPINNER;
Spinner.propTypes = PROP_TYPES;
Spinner.defaultProps = DEFAULT_PROPS;
exports.default = Spinner;