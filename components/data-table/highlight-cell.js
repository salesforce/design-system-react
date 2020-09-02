"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _cell = _interopRequireDefault(require("./cell"));

var _highlighter = _interopRequireDefault(require("../utilities/highlighter"));

var _constants = require("../../utilities/constants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */

/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */
// ### React
// ## Children
// ## Constants

/**
 * A Cell renderer for the DataTable that automatically highlights search text.
 */
var DataTableHighlightCell = function DataTableHighlightCell(props) {
  return /*#__PURE__*/_react.default.createElement(_cell.default, props, /*#__PURE__*/_react.default.createElement(_highlighter.default, {
    search: props.search
  }, props.children));
}; // ### Display Name
// The DataTable looks for components with this name to determine what it should use to render a given column's cells.


DataTableHighlightCell.displayName = _constants.DATA_TABLE_CELL; // ### Prop Types

DataTableHighlightCell.propTypes = {
  /**
   * The contents of the cell. Equivalent to `props.item[props.property]`
   */
  children: _propTypes.default.oneOfType([_propTypes.default.node, _propTypes.default.string]),

  /**
   * The string of text (or Regular Expression) to highlight.
   */
  search: _propTypes.default.any
};
var _default = DataTableHighlightCell;
exports.default = _default;