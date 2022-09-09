"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _radioGroup = _interopRequireDefault(require("../radio-group"));

var _constants = require("../../utilities/constants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var propTypes = {
  /**
   * **Assistive text for accessibility**
   * * `label`: This label appears in the legend.
   */
  assistiveText: _propTypes.default.shape({
    label: _propTypes.default.string
  }),

  /**
   * Children are expected to be Radio components.
   */
  children: _propTypes.default.node.isRequired,

  /**
   * Custom CSS classes added to `slds-radio_button-group` node.
   */
  className: _propTypes.default.oneOfType([_propTypes.default.array, _propTypes.default.object, _propTypes.default.string]),

  /**
   * **Text labels for internationalization**
   * This object is merged with the default props object on every render.
   * * `error`: Message to display when any of Checkboxes are in an error state.
   * * `label`: This label appears above the button group.
   */
  labels: _propTypes.default.shape({
    error: _propTypes.default.string,
    label: _propTypes.default.string
  }),

  /**
   * This event fires when the radio selection changes.
   */
  onChange: _propTypes.default.func,

  /**
   * Disable all radio inputs.
   */
  disabled: _propTypes.default.bool,

  /**
   * Adds an indicator that this field is required.
   */
  required: _propTypes.default.bool,

  /**
   * The name of this radio group.
   */
  name: _propTypes.default.string,

  /**
   * The ID of the error message, for linking to radio inputs with aria-describedby.
   */
  errorId: _propTypes.default.string
};
var defaultProps = {
  labels: {},
  assistiveText: {}
};
/**
 * A styled select list that can have a single entry checked at any one time.
 * The RadioButtonGroup component wraps [Radio](/components/radios) components, which should be used as children.
 */

var RadioButtonGroup = function RadioButtonGroup(props) {
  // Separate props we care about in order to pass others along passively to the dropdown component
  var variant = props.variant,
      rest = _objectWithoutProperties(props, ["variant"]);

  return /*#__PURE__*/_react.default.createElement(_radioGroup.default, _extends({
    variant: "button-group"
  }, rest));
};

RadioButtonGroup.displayName = _constants.RADIO_BUTTON_GROUP;
RadioButtonGroup.propTypes = propTypes;
RadioButtonGroup.defaultProps = defaultProps;
var _default = RadioButtonGroup;
exports.default = _default;