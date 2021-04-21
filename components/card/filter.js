"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _input = _interopRequireDefault(require("../input"));

var _inputIcon = _interopRequireDefault(require("../icon/input-icon"));

var _constants = require("../../utilities/constants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

/**
 * A default filter or search input for Cards that contain items.
 */
var Filter = function Filter(props) {
  var id = props.id,
      placeholder = props.placeholder,
      onChange = props.onChange,
      rest = _objectWithoutProperties(props, ["id", "placeholder", "onChange"]);

  return /*#__PURE__*/_react.default.createElement(_input.default, _extends({}, rest, {
    assistiveText: {
      label: placeholder
    },
    iconLeft: /*#__PURE__*/_react.default.createElement(_inputIcon.default, {
      name: "search",
      category: "utility"
    }),
    id: id,
    onChange: onChange,
    placeholder: placeholder
  }));
}; // ### Display Name
// Always use the canonical component name as the React display name.


Filter.displayName = _constants.CARD_FILTER; // ### Prop Types

Filter.propTypes = {
  /**
   * The HTML `id` from the card with a suffixe.
   */
  id: _propTypes.default.string,

  /**
   * This callback fires when the input changes.
   */
  onChange: _propTypes.default.func,

  /**
   * Text present in input until the user enters text. This text will also be used for a visually hidden label on the filter `input` element for accessibility.
   */
  placeholder: _propTypes.default.string.isRequired
};
Filter.defaultProps = {
  placeholder: 'Find in List'
};
var _default = Filter;
exports.default = _default;