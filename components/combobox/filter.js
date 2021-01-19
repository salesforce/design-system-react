"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _lodash = _interopRequireDefault(require("lodash.escaperegexp"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */

/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

/**
 * SLDS recommends auto-complete/search inputs menus have a limit of 10 items.
 */
var filter = function filter(_ref) {
  var inputValue = _ref.inputValue,
      _ref$limit = _ref.limit,
      limit = _ref$limit === void 0 ? 10 : _ref$limit,
      options = _ref.options,
      selection = _ref.selection;
  var inputValueRegExp = new RegExp((0, _lodash.default)(inputValue), 'ig'); // eslint-disable-next-line fp/no-mutating-methods

  return options.filter(function (option) {
    var searchTermFoundInLabel = option.label ? option.label.match(inputValueRegExp) : false;
    var searchTermFoundInSubtitle = option.subTitle ? option.subTitle.match(inputValueRegExp) : false;
    var isSeparator = option.type === 'separator';
    var notAlreadySelected = !selection.some(function (sel) {
      return sel.id === option.id;
    });
    return (!inputValue || isSeparator || searchTermFoundInLabel || searchTermFoundInSubtitle) && notAlreadySelected;
  }).splice(0, limit);
};

var _default = filter;
exports.default = _default;