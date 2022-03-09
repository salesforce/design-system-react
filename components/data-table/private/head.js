"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _cellFixed = _interopRequireDefault(require("./cell-fixed"));

var _checkbox = _interopRequireDefault(require("../../checkbox"));

var _headerCell = _interopRequireDefault(require("./header-cell"));

var _interactiveElement = _interopRequireDefault(require("../interactive-element"));

var _cellContext = _interopRequireDefault(require("../private/cell-context"));

var _tableContext = _interopRequireDefault(require("../private/table-context"));

var _contextHelper = _interopRequireDefault(require("./context-helper"));

var _constants = require("../../../utilities/constants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var InteractiveCheckbox = (0, _interactiveElement.default)(_checkbox.default); // ### Prop Types

var propTypes = {
  assistiveText: _propTypes.default.shape({
    actionsHeader: _propTypes.default.string,
    columnSort: _propTypes.default.string,
    columnSortedAscending: _propTypes.default.string,
    columnSortedDescending: _propTypes.default.string,
    selectAllRows: _propTypes.default.string,
    selectRow: _propTypes.default.string
  }),
  allSelected: _propTypes.default.bool,
  headerRefs: _propTypes.default.func,
  isHidden: _propTypes.default.bool,
  indeterminateSelected: _propTypes.default.bool,
  canSelectRows: _propTypes.default.oneOfType([_propTypes.default.bool, _propTypes.default.oneOf(['checkbox', 'radio'])]),
  columns: _propTypes.default.arrayOf(_propTypes.default.shape({
    Cell: _propTypes.default.oneOfType([_propTypes.default.func, _propTypes.default.object]),
    props: _propTypes.default.object
  })),
  fixedHeader: _propTypes.default.bool,
  id: _propTypes.default.string,
  onToggleAll: _propTypes.default.func,
  onSort: _propTypes.default.func,
  showRowActions: _propTypes.default.bool
};

var ActionsHeader = function ActionsHeader(props) {
  var tableContext = (0, _react.useContext)(_tableContext.default);
  var cellContext = {
    columnIndex: props.columnIndex,
    rowIndex: 0
  };

  var _useContextHelper = (0, _contextHelper.default)(tableContext, cellContext, props.fixedLayout),
      tabIndex = _useContextHelper.tabIndex,
      hasFocus = _useContextHelper.hasFocus,
      handleFocus = _useContextHelper.handleFocus,
      handleKeyDown = _useContextHelper.handleKeyDown;

  var fixedHeader = props.fixedHeader;

  var getContent = function getContent(style) {
    return /*#__PURE__*/_react.default.createElement("div", {
      className: "slds-th__action",
      style: style
    }, /*#__PURE__*/_react.default.createElement("span", {
      className: "slds-assistive-text"
    }, props.assistiveText));
  };

  return /*#__PURE__*/_react.default.createElement("th", {
    className: (0, _classnames.default)({
      'slds-has-focus': hasFocus
    }),
    ref: function ref(_ref) {
      if (props.headerRefs) {
        props.headerRefs(_ref, 'action');
      }

      if (_ref && hasFocus) {
        _ref.focus();
      }
    },
    scope: "col",
    style: {
      height: fixedHeader ? 0 : null,
      lineHeight: fixedHeader ? 0 : null,
      width: '3.25rem'
    },
    onFocus: handleFocus,
    onKeyDown: handleKeyDown,
    tabIndex: tabIndex
  }, getContent(fixedHeader ? {
    height: 0,
    overflow: 'hidden',
    paddingBottom: 0,
    paddingTop: 0,
    visibility: 'hidden'
  } : null), fixedHeader ? /*#__PURE__*/_react.default.createElement(_cellFixed.default, null, getContent({
    lineHeight: 1,
    width: '100%'
  })) : null);
};

var SelectHeader = function SelectHeader(props) {
  var tableContext = (0, _react.useContext)(_tableContext.default);
  var cellContext = {
    columnIndex: 0,
    rowIndex: 0
  };

  var _useContextHelper2 = (0, _contextHelper.default)(tableContext, cellContext, props.fixedLayout),
      tabIndex = _useContextHelper2.tabIndex,
      hasFocus = _useContextHelper2.hasFocus,
      handleFocus = _useContextHelper2.handleFocus,
      handleKeyDown = _useContextHelper2.handleKeyDown;

  var fixedHeader = props.fixedHeader,
      canSelectRows = props.canSelectRows;

  var getContent = function getContent(idSuffix, style, ariaHidden) {
    var render = null;

    if (canSelectRows === 'radio') {
      render = !ariaHidden ? /*#__PURE__*/_react.default.createElement("div", {
        className: "slds-truncate slds-assistive-text",
        id: "".concat(props.id, "-column-group-header-row-select"),
        title: props.assistiveText.selectRowGroup
      }, props.assistiveText.selectRowGroup) : null;
    } else if (canSelectRows === true || canSelectRows === 'checkbox') {
      render = /*#__PURE__*/_react.default.createElement("div", {
        className: "slds-th__action slds-th__action_form",
        "aria-hidden": ariaHidden && true,
        style: style
      }, !ariaHidden ? /*#__PURE__*/_react.default.createElement("span", {
        id: "".concat(props.id, "-column-group-header-row-select"),
        className: "slds-assistive-text"
      }, props.assistiveText.selectAllRows) : null, /*#__PURE__*/_react.default.createElement(InteractiveCheckbox, {
        assistiveText: {
          label: props.assistiveText.selectAllRows
        },
        checked: props.allSelected,
        indeterminate: props.indeterminateSelected,
        id: "".concat(props.id, "-").concat(idSuffix) // There is a checkbox for user interaction and a checkbox for positioning. ariaHidden is for the checkbox for positioning and it should be removed from the accessibility tree.
        ,
        name: !ariaHidden ? 'SelectAll' : undefined,
        onChange: props.onToggleAll
      }));
    }

    return render;
  };

  return /*#__PURE__*/_react.default.createElement("th", {
    className: (0, _classnames.default)('slds-text-align_right', {
      'slds-has-focus': hasFocus
    }),
    ref: function ref(_ref2) {
      if (props.headerRefs) {
        props.headerRefs(_ref2, 'select');
      }

      if (_ref2 && hasFocus) {
        _ref2.focus();
      }
    },
    scope: "col",
    style: {
      height: fixedHeader ? 0 : null,
      lineHeight: fixedHeader ? 0 : null,
      width: '3.25rem'
    },
    onFocus: handleFocus,
    onKeyDown: handleKeyDown,
    tabIndex: tabIndex
  }, /*#__PURE__*/_react.default.createElement(_cellContext.default.Provider, {
    value: cellContext
  }, getContent('SelectAll-fixed-header', fixedHeader ? {
    display: 'flex',
    height: 0,
    overflow: 'hidden',
    paddingBottom: 0,
    paddingTop: 0,
    visibility: 'hidden'
  } : null, fixedHeader && 'ariaHidden'), fixedHeader ? /*#__PURE__*/_react.default.createElement(_cellFixed.default, null, getContent('SelectAll', {
    display: 'flex',
    justifyContent: 'flex-end',
    lineHeight: 1,
    width: '100%'
  })) : null));
};
/**
 * Used internally, provides header row rendering to the DataTable.
 */


var DataTableHead = function DataTableHead(props) {
  var getActionsHeader = function getActionsHeader() {
    var actionsHeader = null;

    if (props.showRowActions) {
      actionsHeader = /*#__PURE__*/_react.default.createElement(ActionsHeader, {
        assistiveText: props.assistiveText.actionsHeader,
        columnIndex: props.canSelectRows ? props.columns.length + 1 : props.columns.length,
        fixedLayout: props.fixedLayout,
        fixedHeader: props.fixedHeader,
        headerRefs: props.headerRefs
      });
    }

    return actionsHeader;
  };

  var getSelectHeader = function getSelectHeader() {
    var canSelectRows = props.canSelectRows;
    var selectHeader = null;

    if (canSelectRows) {
      selectHeader = /*#__PURE__*/_react.default.createElement(SelectHeader, {
        allSelected: props.allSelected,
        assistiveText: {
          selectAllRows: props.assistiveText.selectAllRows,
          selectRowGroup: props.assistiveText.selectRowGroup
        },
        canSelectRows: canSelectRows,
        fixedHeader: props.fixedHeader,
        fixedLayout: props.fixedLayout,
        headerRefs: props.headerRefs,
        id: props.id,
        indeterminateSelected: props.indeterminateSelected,
        onToggleAll: props.onToggleAll
      });
    }

    return selectHeader;
  };

  var actionsHeader = getActionsHeader();
  var selectHeader = getSelectHeader();
  return /*#__PURE__*/_react.default.createElement("thead", {
    className: (0, _classnames.default)({
      'slds-assistive-text': props.isHidden
    })
  }, /*#__PURE__*/_react.default.createElement("tr", {
    className: "slds-line-height_reset"
  }, selectHeader, props.columns.map(function (column, index) {
    return /*#__PURE__*/_react.default.createElement(_cellContext.default.Provider, {
      key: "".concat(props.id, "-").concat(column.props.property),
      value: {
        columnIndex: props.canSelectRows ? index + 1 : index,
        rowIndex: 0
      }
    }, /*#__PURE__*/_react.default.createElement(_headerCell.default, _extends({
      assistiveText: props.assistiveText,
      cellRef: function cellRef(ref) {
        if (props.headerRefs) {
          props.headerRefs(ref, index);
        }
      },
      fixedHeader: props.fixedHeader,
      id: "".concat(props.id, "-").concat(column.props.property),
      onSort: props.onSort
    }, column.props)));
  }), actionsHeader));
}; // ### Display Name
// Always use the canonical component name as the React display name.


DataTableHead.displayName = _constants.DATA_TABLE_HEAD;
DataTableHead.propTypes = propTypes;
var _default = DataTableHead;
exports.default = _default;