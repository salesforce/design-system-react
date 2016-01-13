"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _lodashEscaperegexp = require("lodash.escaperegexp");

var _lodashEscaperegexp2 = _interopRequireDefault(_lodashEscaperegexp);

/**
 * A function that takes a term string and an item and returns a truthy value if the item should be kept.
 */

exports["default"] = function (term, item) {
  if (!term) return true;
  return item.label.match(new RegExp((0, _lodashEscaperegexp2["default"])(term), "ig"));
};

module.exports = exports["default"];