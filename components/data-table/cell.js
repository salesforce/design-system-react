"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _cellContext = _interopRequireDefault(require("./private/cell-context"));

var _tableContext = _interopRequireDefault(require("./private/table-context"));

var _contextHelper = _interopRequireDefault(require("./private/context-helper"));

var _constants = require("../../utilities/constants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */

/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */
// ### React
// ### classNames
// ## Constants

/**
 * The default Cell renderer for the DataTable. Pass in any React component with the same `displayName` which takes the same props to provide custom rendering.
 */
var DataTableCell = function DataTableCell(props) {
  var tableContext = (0, _react.useContext)(_tableContext.default);
  var cellContext = (0, _react.useContext)(_cellContext.default);

  var _useContextHelper = (0, _contextHelper.default)(tableContext, cellContext, props.fixedLayout),
      tabIndex = _useContextHelper.tabIndex,
      hasFocus = _useContextHelper.hasFocus,
      handleFocus = _useContextHelper.handleFocus,
      handleKeyDown = _useContextHelper.handleKeyDown;

  var childText = /*#__PURE__*/_react.default.isValidElement(props.children) ? props.children.props.children : props.children;

  var contents = /*#__PURE__*/_react.default.createElement("div", {
    className: (0, _classnames.default)({
      'slds-truncate': props.fixedLayout
    }),
    title: props.title || childText
  }, props.children);

  var className = (0, _classnames.default)(props.className, {
    'slds-has-focus': hasFocus
  });

  var ref = function ref(node) {
    if (node && hasFocus) {
      node.focus();
    }
  };

  var cell =
  /*#__PURE__*/
  // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
  _react.default.createElement("td", {
    className: className,
    "data-label": props.label,
    onFocus: handleFocus,
    onKeyDown: handleKeyDown,
    ref: ref,
    role: props.fixedLayout ? 'gridcell' : null,
    style: props.width ? {
      width: props.width
    } : null,
    tabIndex: tabIndex,
    headers: props.headerId
  }, contents);

  if (props.primaryColumn) {
    cell = /*#__PURE__*/_react.default.createElement("th", {
      className: className,
      ref: ref,
      "data-label": props.label,
      role: props.fixedLayout ? 'gridcell' : null,
      tabIndex: tabIndex,
      style: props.width ? {
        width: props.width
      } : null,
      onFocus: handleFocus,
      onKeyDown: handleKeyDown
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