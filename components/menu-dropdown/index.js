"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _reactOnclickoutside = _interopRequireDefault(require("react-onclickoutside"));

var _menuDropdown = _interopRequireDefault(require("./menu-dropdown"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */

/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */
// ### onClickOutside
// Listen for clicks that occur somewhere in the document, outside of the element itself
var _default = (0, _reactOnclickoutside.default)(_menuDropdown.default);

exports.default = _default;