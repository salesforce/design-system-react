"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "DefaultFooter", {
  enumerable: true,
  get: function get() {
    return _defaultFooter.default;
  }
});
Object.defineProperty(exports, "DefaultHeader", {
  enumerable: true,
  get: function get() {
    return _defaultHeader.default;
  }
});
Object.defineProperty(exports, "DefaultSectionDivider", {
  enumerable: true,
  get: function get() {
    return _defaultSectionDivider.default;
  }
});
exports.default = void 0;

var _reactOnclickoutside = _interopRequireDefault(require("react-onclickoutside"));

var _defaultFooter = _interopRequireDefault(require("./menu/default-footer"));

var _defaultHeader = _interopRequireDefault(require("./menu/default-header"));

var _defaultSectionDivider = _interopRequireDefault(require("./menu/default-section-divider"));

var _lookup = _interopRequireDefault(require("./lookup"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */

/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */
// ### onClickOutside
// Listen for clicks that occur somewhere in the document, outside of the element itself
var _default = (0, _reactOnclickoutside.default)(_lookup.default, {
  excludeScrollbar: true
});

exports.default = _default;