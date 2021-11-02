"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _checkbox = _interopRequireDefault(require("../../checkbox"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var OldCheckbox = function OldCheckbox(props) {
  return /*#__PURE__*/_react.default.createElement(_checkbox.default, _extends({
    oldEventParameterOrder: true
  }, props));
};

var _default = OldCheckbox;
exports.default = _default;