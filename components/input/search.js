"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _index = _interopRequireDefault(require("./index"));

var _inputIcon = _interopRequireDefault(require("../icon/input-icon"));

var _checkProps = _interopRequireDefault(require("./check-props"));

var _component = _interopRequireDefault(require("./component.json"));

var _keyCode = _interopRequireDefault(require("../../utilities/key-code"));

var _event = _interopRequireDefault(require("../../utilities/event"));

var _constants = require("../../utilities/constants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var handleKeyDown = function handleKeyDown(event, onSearch) {
  if (event.keyCode === _keyCode.default.ENTER) {
    _event.default.trapImmediate(event);

    onSearch(event);
  }
};

var defaultProps = {
  assistiveText: {}
};
/**
 * A `Search` is an `Input` which renders the search icon by default. It can be cleared, too. All `Input` props not specified as props already may be used with this component and will override defaults.
 */

var Search = function Search(_ref) {
  var clearable = _ref.clearable,
      onClear = _ref.onClear,
      onSearch = _ref.onSearch,
      placeholder = _ref.placeholder,
      props = _objectWithoutProperties(_ref, ["clearable", "onClear", "onSearch", "placeholder"]);

  (0, _checkProps.default)(_constants.SEARCH, props, _component.default);
  var assistiveText = typeof props.assistiveText === 'string' ? props.assistiveText : _objectSpread(_objectSpread({}, defaultProps.assistiveText), props.assistiveText).label;
  return /*#__PURE__*/_react.default.createElement(_index.default, _extends({
    assistiveText: {
      label: assistiveText
    },
    iconLeft: /*#__PURE__*/_react.default.createElement(_inputIcon.default, {
      assistiveText: {
        icon: 'Search'
      },
      category: "utility",
      name: "search",
      onClick: onSearch
    }),
    iconRight: clearable ? /*#__PURE__*/_react.default.createElement(_inputIcon.default, {
      assistiveText: {
        icon: 'Clear'
      },
      category: "utility",
      name: "clear",
      onClick: onClear
    }) : null,
    onKeyDown: onSearch ? function (event) {
      return handleKeyDown(event, onSearch);
    } : null,
    placeholder: placeholder
  }, props));
};

Search.displayName = _constants.SEARCH;
Search.propTypes = {
  /**
   * **Assistive text for accessibility.**
   * This object is merged with the default props object on every render.
   * * `label`: Assistive text to search input
   */
  assistiveText: _propTypes.default.shape({
    label: _propTypes.default.string
  }),

  /**
   * Adds a clear button to right side of the input
   */
  clearable: _propTypes.default.bool,

  /**
   * Triggers when the clear button is clicked
   */
  onClear: _propTypes.default.func,

  /**
   * This event fires when enter is pressed in the `input` or the search button is clicked.
   */
  onSearch: _propTypes.default.func,

  /**
   * Placeholder for the input
   */
  placeholder: _propTypes.default.string
};
Search.defaultProps = defaultProps;
var _default = Search;
exports.default = _default;