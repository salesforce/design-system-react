"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _index = require("./index");

var _index2 = _interopRequireDefault(_index);

var _inputIcon = require("../icon/input-icon");

var _inputIcon2 = _interopRequireDefault(_inputIcon);

var _checkProps = require("./check-props");

var _checkProps2 = _interopRequireDefault(_checkProps);

var _keyCode = require("../../utilities/key-code");

var _keyCode2 = _interopRequireDefault(_keyCode);

var _event = require("../../utilities/event");

var _event2 = _interopRequireDefault(_event);

var _constants = require("../../utilities/constants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

var handleKeyDown = function handleKeyDown(event, onSearch) {
  if (event.keyCode === _keyCode2.default.ENTER) {
    _event2.default.trapImmediate(event);

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

  (0, _checkProps2.default)(_constants.FORMS_SEARCH, props);
  var assistiveText = typeof props.assistiveText === 'string' ? props.assistiveText : _objectSpread({}, defaultProps.assistiveText, props.assistiveText).label;
  return _react2.default.createElement(_index2.default, _extends({
    assistiveText: {
      label: assistiveText
    },
    iconLeft: _react2.default.createElement(_inputIcon2.default, {
      assistiveText: {
        icon: 'Search'
      },
      category: "utility",
      name: "search",
      onClick: onSearch
    }),
    iconRight: clearable ? _react2.default.createElement(_inputIcon2.default, {
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

Search.displayName = _constants.FORMS_SEARCH;
Search.propTypes = {
  /**
   * **Assistive text for accessibility.**
   * This object is merged with the default props object on every render.
   * * `label`: Assistive text to search input
   */
  assistiveText: _propTypes2.default.shape({
    label: _propTypes2.default.string
  }),

  /**
   * Adds a clear button to right side of the input
   */
  clearable: _propTypes2.default.bool,

  /**
   * Triggers when the clear button is clicked
   */
  onClear: _propTypes2.default.func,

  /**
   * This event fires when enter is pressed in the `input` or the search button is clicked.
   */
  onSearch: _propTypes2.default.func,

  /**
   * Placeholder for the input
   */
  placeholder: _propTypes2.default.string
};
Search.defaultProps = defaultProps;
exports.default = Search;