"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */

/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

/**
 * Calculates data table keyboard navigation state based on currently selected cell
 */
var _default = function _default(tableContext, cellContext, fixedLayout) {
  var isActive = tableContext.activeCell.rowIndex === cellContext.rowIndex && tableContext.activeCell.columnIndex === cellContext.columnIndex;
  var hasFocus = fixedLayout && tableContext.tableHasFocus && isActive;

  var handleFocus = function handleFocus() {
    if (fixedLayout && tableContext.allowKeyboardNavigation) {
      tableContext.changeActiveCell(cellContext.rowIndex, cellContext.columnIndex);
    }
  };

  var handleKeyDown = function handleKeyDown(event) {
    if (fixedLayout && tableContext.allowKeyboardNavigation) {
      tableContext.handleKeyDown(event);
    }
  };

  var tabIndex = fixedLayout && isActive && !tableContext.activeElement && tableContext.allowKeyboardNavigation ? '0' : undefined;
  return {
    tabIndex: tabIndex,
    hasFocus: hasFocus,
    handleFocus: handleFocus,
    handleKeyDown: handleKeyDown
  };
};

exports.default = _default;