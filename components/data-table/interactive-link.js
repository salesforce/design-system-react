"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _interactiveElement = _interopRequireDefault(require("./interactive-element"));

var _link = _interopRequireDefault(require("./private/link"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = (0, _interactiveElement.default)(_link.default);

exports.default = _default;