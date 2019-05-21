"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _constants = require("../../utilities/constants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */

/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */
// ### React
// ### classNames
// ## Constants

/**
 * The default Cell renderer for the DataTable. Pass in any React component with the same `displayName` which takes the same props to provide custom rendering.
 */
var DataTableCell = function DataTableCell(props) {
  var childText = _react.default.isValidElement(props.children) ? props.children.props.children : props.children;

  var contents = _react.default.createElement("div", {
    className: (0, _classnames.default)({
      'slds-truncate': props.fixedLayout
    }),
    title: props.title || childText
  }, props.children);

  var cell = _react.default.createElement("td", {
    className: props.className,
    role: props.fixedLayout ? 'gridcell' : null,
    style: props.width ? {
      width: props.width
    } : null
  }, contents);

  if (props.primaryColumn) {
    cell = _react.default.createElement("th", {
      className: props.className,
      role: props.fixedLayout ? 'gridcell' : null,
      style: props.width ? {
        width: props.width
      } : null
    }, contents);
  }

  return cell;
}; // ### Display Name
// Always use the canonical component name as the React display name.


DataTableCell.displayName = _constants.DATA_TABLE_CELL; // ### Prop Types

DataTableCell.propTypes = {
  /**
   * The contents of the cell. This can be simple text or DOM nodes. Equivalent to `props.item[props.property]`
   */
  children: _propTypes.default.oneOfType([_propTypes.default.node, _propTypes.default.string]),

  /**
   * Class names to be added to the cell.
   */
  className: _propTypes.default.oneOfType([_propTypes.default.array, _propTypes.default.object, _propTypes.default.string]),

  /**
   * Use this if you are creating an advanced table (selectable, sortable, or resizable rows)
   */
  fixedLayout: _propTypes.default.bool,

  /**
   * The item from the items which represents this row.
   */
  item: _propTypes.default.object,

  /**
   * The primary column for a row. This is almost always the first column.
   */
  primaryColumn: _propTypes.default.bool,

  /**
   * The property of this item to display.
   */
  property: _propTypes.default.string,

  /**
   * Shows on hover. Useful for truncated cells.
   */
  title: _propTypes.default.string,

  /**
   * Width of column. This is required for advanced/fixed layout tables. Please provide units. (`rems` are recommended)
   */
  width: _propTypes.default.string
};
var _default = DataTableCell;
exports.default = _default;