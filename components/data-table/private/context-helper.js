"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = useTableContextHelper;

var _react = require("react");

/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */

/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

/**
 * Calculates data table keyboard navigation state based on currently selected cell
 */
function useTableContextHelper(tableContext, cellContext, fixedLayout) {
  var isActive = tableContext.activeCell.rowIndex === cellContext.rowIndex && tableContext.activeCell.columnIndex === cellContext.columnIndex;
  var hasFocus = fixedLayout && tableContext.tableHasFocus && isActive;
  var changeActiveCell = tableContext.changeActiveCell,
      handleTableKeyDown = tableContext.handleKeyDown;
  var handleFocus = (0, _react.useCallback)(function () {
    if (fixedLayout && tableContext.allowKeyboardNavigation) {
      changeActiveCell(cellContext.rowIndex, cellContext.columnIndex);
    }
  }, [fixedLayout, tableContext.allowKeyboardNavigation, changeActiveCell, cellContext.rowIndex, cellContext.columnIndex]);
  var handleKeyDown = (0, _react.useCallback)(function (event) {
    if (fixedLayout && tableContext.allowKeyboardNavigation) {
      handleTableKeyDown(event);
    }
  }, [fixedLayout, tableContext.allowKeyboardNavigation, handleTableKeyDown]);
  var tabIndex = fixedLayout && isActive && !tableContext.activeElement && tableContext.allowKeyboardNavigation ? '0' : undefined;
  return {
    tabIndex: tabIndex,
    hasFocus: hasFocus,
    handleFocus: handleFocus,
    handleKeyDown: handleKeyDown
  };
}