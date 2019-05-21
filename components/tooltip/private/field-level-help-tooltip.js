"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _index = _interopRequireDefault(require("../index"));

var _object = _interopRequireDefault(require("../../../utilities/object"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var propTypes = {
  /*
   * Assistive Text object from parent component such as Input, Combobox, etc.
   */
  assistiveText: _propTypes.default.shape({
    triggerLearnMoreIcon: _propTypes.default.string
  }),

  /*
   * Tooltip from external prop
   */
  fieldLevelHelpTooltip: _propTypes.default.node.isRequired
};
var defaultProps = {
  triggerClassName: 'slds-form-element__icon',
  // This allows `position: absolute` Tooltips to align properly.
  // If not present, tooltip will always be below the info icon // instead of above it.
  triggerStyle: {
    position: 'static'
  },
  variant: 'learnMore'
};

var FieldLevelHelpTooltip = function FieldLevelHelpTooltip(_ref) {
  var fieldLevelHelpTooltip = _ref.fieldLevelHelpTooltip,
      _ref$assistiveText = _ref.assistiveText,
      assistiveText = _ref$assistiveText === void 0 ? {} : _ref$assistiveText;
  return fieldLevelHelpTooltip ? _react.default.createElement(_index.default, _objectSpread({}, defaultProps, fieldLevelHelpTooltip.props, {
    // allow backwards compatibility with Input's
    // assistiveText.fieldLevelHelpButton
    // `Input` used to have an `assistiveText.fieldLevelHelpButton`
    // prop and that prop needs to override the default Tooltip
    // "Help" string.
    assistiveText: _objectSpread({}, fieldLevelHelpTooltip.props.assistiveText, _object.default.removeUndefined(assistiveText))
  })) : null;
};

FieldLevelHelpTooltip.propTypes = propTypes;
FieldLevelHelpTooltip.displayName = 'FieldLevelHelpTooltip';
var _default = FieldLevelHelpTooltip;
exports.default = _default;