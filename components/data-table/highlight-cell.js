"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _cell = require("./cell");

var _cell2 = _interopRequireDefault(_cell);

var _highlighter = require("../utilities/highlighter");

var _highlighter2 = _interopRequireDefault(_highlighter);

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
  return _react2.default.createElement(_cell2.default, props, _react2.default.createElement(_highlighter2.default, {
    search: props.search
  }, props.children));
}; // ### Display Name
// The DataTable looks for components with this name to determine what it should use to render a given column's cells.


DataTableHighlightCell.displayName = _constants.DATA_TABLE_CELL; // ### Prop Types

DataTableHighlightCell.propTypes = {
  /**
   * The contents of the cell. Equivalent to `props.item[props.property]`
   */
  children: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number, _propTypes2.default.bool]),

  /**
   * The string of text (or Regular Expression) to highlight.
   */
  search: _propTypes2.default.any
};
exports.default = DataTableHighlightCell;