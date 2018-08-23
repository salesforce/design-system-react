"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _reactOnclickoutside = require("react-onclickoutside");

var _reactOnclickoutside2 = _interopRequireDefault(_reactOnclickoutside);

var _menuDropdown = require("./menu-dropdown");

var _menuDropdown2 = _interopRequireDefault(_menuDropdown);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */

/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */
// ### onClickOutside
// Listen for clicks that occur somewhere in the document, outside of the element itself
exports.default = (0, _reactOnclickoutside2.default)(_menuDropdown2.default);