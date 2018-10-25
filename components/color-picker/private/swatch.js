"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Swatch = function Swatch(_ref) {
  var color = _ref.color,
      style = _ref.style,
      label = _ref.label;

  var innerStyle = _objectSpread({
    backgroundColor: color,
    border: '1px solid #cccccc'
  }, style);

  if (!color) {
    innerStyle.backgroundImage = 'linear-gradient(-45deg, white 47%, #870500 0, #870500 53%, white 0)';
  }

  return _react2.default.createElement("span", {
    className: "slds-swatch",
    style: innerStyle
  }, _react2.default.createElement("span", {
    className: "slds-assistive-text"
  }, label || color));
};

Swatch.propTypes = {
  color: _propTypes2.default.string.isRequired
};
exports.default = Swatch;