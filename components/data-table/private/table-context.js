"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = /*#__PURE__*/_react.default.createContext({
  activeCell: {
    rowIndex: 0,
    columnIndex: 0
  },
  activeElement: null,
  mode: null,
  tableHasFocus: false,
  changeActiveCell: function changeActiveCell() {},
  changeActiveElement: function changeActiveElement() {},
  handleKeyDown: function handleKeyDown() {},
  registerInteractiveElement: function registerInteractiveElement() {},
  allowKeyboardNavigation: true,
  setAllowKeyboardNavigation: function setAllowKeyboardNavigation() {}
});

exports.default = _default;