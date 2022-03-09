"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _lodash = _interopRequireDefault(require("lodash.find"));

var _checkbox = _interopRequireDefault(require("../../checkbox"));

var _radio = _interopRequireDefault(require("../../radio"));

var _constants = require("../../../utilities/constants");

var _interactiveElement = _interopRequireDefault(require("../interactive-element"));

var _cellContext = _interopRequireDefault(require("../private/cell-context"));

var _tableContext = _interopRequireDefault(require("../private/table-context"));

var _contextHelper = _interopRequireDefault(require("./context-helper"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var InteractiveCheckbox = (0, _interactiveElement.default)(_checkbox.default);
var InteractiveRadio = (0, _interactiveElement.default)(_radio.default);
var propTypes = {
  assistiveText: _propTypes.default.shape({
    actionsHeader: _propTypes.default.string,
    columnSort: _propTypes.default.string,
    columnSortedAscending: _propTypes.default.string,
    columnSortedDescending: _propTypes.default.string,
    selectAllRows: _propTypes.default.string,
    selectRow: _propTypes.default.string
  }),
  canSelectRows: _propTypes.default.oneOfType([_propTypes.default.bool, _propTypes.default.oneOf(['checkbox', 'radio'])]),
  className: _propTypes.default.string,
  columns: _propTypes.default.arrayOf(_propTypes.default.shape({
    Cell: _propTypes.default.func,
    props: _propTypes.default.object
  })),

  /**
   * Use this if you are creating an advanced table (selectable, sortable, or resizable rows)
   */
  fixedLayout: _propTypes.default.bool,
  id: _propTypes.default.string.isRequired,
  item: _propTypes.default.object.isRequired,
  onToggle: _propTypes.default.func,
  rowActions: _propTypes.default.element,
  selection: _propTypes.default.array,
  tableId: _propTypes.default.string
};
/**
 * Used internally, provides row rendering to the DataTable.
 */

var DataTableRow = function DataTableRow(props) {
  var tableContext = (0, _react.useContext)(_tableContext.default);
  var selectRowCellContext = (0, _react.useMemo)(function () {
    return {
      rowIndex: props.rowIndex,
      columnIndex: 0
    };
  }, [props.rowIndex]);

  var _useContextHelper = (0, _contextHelper.default)(tableContext, selectRowCellContext, props.fixedLayout),
      tabIndex = _useContextHelper.tabIndex,
      hasFocus = _useContextHelper.hasFocus,
      handleFocus = _useContextHelper.handleFocus,
      handleKeyDown = _useContextHelper.handleKeyDown;

  var item = props.item,
      onToggle = props.onToggle;
  var handleToggle = (0, _react.useCallback)(function (e, _ref) {
    var checked = _ref.checked;
    return onToggle(item, checked, e);
  }, [item, onToggle]);
  var isSelected = !!(0, _lodash.default)(props.selection, item);
  var ariaProps = (0, _react.useMemo)(function () {
    var result = {};

    if (props.canSelectRows) {
      result['aria-selected'] = isSelected ? 'true' : 'false';
    }

    return result;
  }, [isSelected, props.canSelectRows]); // i18n

  return /*#__PURE__*/_react.default.createElement("tr", _extends({}, ariaProps, {
    className: (0, _classnames.default)(props.className, {
      'slds-hint-parent': props.rowActions,
      'slds-is-selected': props.canSelectRows && isSelected,
      'slds-has-focus': hasFocus
    })
  }), (0, _react.useMemo)(function () {
    return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, props.canSelectRows ?
    /*#__PURE__*/
    // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
    _react.default.createElement("td", {
      role: props.fixedLayout ? 'gridcell' : null,
      className: "slds-text-align_right",
      "data-label": props.stacked ? 'Select Row' : undefined,
      style: {
        width: '3.25rem'
      },
      onFocus: handleFocus,
      onKeyDown: handleKeyDown,
      ref: function ref(_ref2) {
        if (_ref2 && hasFocus) {
          _ref2.focus();
        }
      },
      tabIndex: tabIndex
    }, /*#__PURE__*/_react.default.createElement(_cellContext.default.Provider, {
      value: selectRowCellContext
    }, props.canSelectRows === 'radio' ? /*#__PURE__*/_react.default.createElement(InteractiveRadio, {
      assistiveText: {
        label: "".concat(props.assistiveText.selectRow, " ").concat(Number(props.index) + 1)
      },
      "aria-labelledby": "".concat(props.id, "-SelectRow-label ").concat(props.tableId, "-SLDSDataTableHead-column-group-header-row-select"),
      checked: isSelected,
      className: "slds-m-right_x-small",
      id: "".concat(props.id, "-SelectRow"),
      labelId: "".concat(props.id, "-SelectRow-label"),
      name: "".concat(props.tableId, "-SelectRow"),
      onChange: handleToggle
    }) : /*#__PURE__*/_react.default.createElement(InteractiveCheckbox, {
      assistiveText: {
        label: "".concat(props.assistiveText.selectRow, " ").concat(Number(props.index) + 1)
      },
      "aria-labelledby": "".concat(props.id, "-SelectRow-label ").concat(props.tableId, "-SLDSDataTableHead-column-group-header-row-select"),
      checked: isSelected,
      id: "".concat(props.id, "-SelectRow"),
      labelId: "".concat(props.id, "-SelectRow-label"),
      name: "SelectRow".concat(props.index + 1),
      onChange: handleToggle
    }))) : null, props.columns.map(function (column, index) {
      var Cell = column.Cell;
      var cellId = "".concat(props.id, "-").concat(_constants.DATA_TABLE_CELL, "-").concat(column.props.property);
      return /*#__PURE__*/_react.default.createElement(_cellContext.default.Provider, {
        key: cellId,
        value: {
          columnIndex: props.canSelectRows ? index + 1 : index,
          rowIndex: props.rowIndex
        }
      }, /*#__PURE__*/_react.default.createElement(Cell, _extends({}, column.props, {
        className: column.props.truncate ? 'slds-truncate' : null,
        fixedLayout: props.fixedLayout,
        rowHeader: column.props.primaryColumn,
        id: cellId,
        item: item,
        width: column.props.width,
        headerId: item.headerId,
        columns: props.columns
      }), item[column.props.property]));
    }), /*#__PURE__*/_react.default.createElement(_cellContext.default.Provider, {
      value: {
        columnIndex: props.canSelectRows ? props.columns.length + 1 : props.columns.length,
        rowIndex: props.rowIndex
      }
    }, props.rowActions ? /*#__PURE__*/_react.default.cloneElement(props.rowActions, {
      id: "".concat(props.id, "-").concat(_constants.DATA_TABLE_ROW_ACTIONS),
      item: item,
      fixedLayout: props.fixedLayout
    }) : null));
  }, [handleFocus, handleKeyDown, handleToggle, hasFocus, isSelected, item, tabIndex, props.assistiveText.selectRow, props.canSelectRows, props.columns, props.fixedLayout, props.id, props.index, props.rowActions, props.rowIndex, props.stacked, props.tableId, selectRowCellContext]));
};

DataTableRow.displayName = _constants.DATA_TABLE_ROW;
DataTableRow.propTypes = propTypes;
var _default = DataTableRow;
exports.default = _default;