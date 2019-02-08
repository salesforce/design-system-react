"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _index = require("../index");

var _index2 = _interopRequireDefault(_index);

var _object = require("../../../utilities/object");

var _object2 = _interopRequireDefault(_object);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var propTypes = {
  /*
   * Assistive Text object from parent component such as Input, Combobox, etc.
   */
  assistiveText: _propTypes2.default.shape({
    triggerLearnMoreIcon: _propTypes2.default.string
  }),

  /*
   * Tooltip from external prop
   */
  fieldLevelHelpTooltip: _propTypes2.default.node.isRequired
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
  return fieldLevelHelpTooltip ? _react2.default.createElement(_index2.default, _objectSpread({}, defaultProps, fieldLevelHelpTooltip.props, {
    // allow backwards compatibility with Input's
    // assistiveText.fieldLevelHelpButton
    // `Input` used to have an `assistiveText.fieldLevelHelpButton`
    // prop and that prop needs to override the default Tooltip
    // "Help" string.
    assistiveText: _objectSpread({}, fieldLevelHelpTooltip.props.assistiveText, _object2.default.removeUndefined(assistiveText))
  })) : null;
};

FieldLevelHelpTooltip.propTypes = propTypes;
FieldLevelHelpTooltip.displayName = 'FieldLevelHelpTooltip';
exports.default = FieldLevelHelpTooltip;