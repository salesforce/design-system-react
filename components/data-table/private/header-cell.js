"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _lodash = _interopRequireDefault(require("lodash.isfunction"));

var _cellFixed = _interopRequireDefault(require("./cell-fixed"));

var _icon = _interopRequireDefault(require("../../icon"));

var _columnCheckProps = _interopRequireDefault(require("../column-check-props"));

var _link = _interopRequireDefault(require("./link"));

var _interactiveLink = _interopRequireDefault(require("../interactive-link"));

var _cellContext = _interopRequireDefault(require("../private/cell-context"));

var _tableContext = _interopRequireDefault(require("../private/table-context"));

var _contextHelper = _interopRequireDefault(require("./context-helper"));

var _constants = require("../../../utilities/constants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr && (typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]); if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

// ### Prop Types
var propTypes = {
  assistiveText: _propTypes.default.shape({
    actionsHeader: _propTypes.default.string,
    columnSort: _propTypes.default.string,
    columnSortedAscending: _propTypes.default.string,
    columnSortedDescending: _propTypes.default.string,
    selectAllRows: _propTypes.default.string,
    selectRow: _propTypes.default.string
  }),
  cellRef: _propTypes.default.func,
  fixedHeader: _propTypes.default.bool,
  id: _propTypes.default.string.isRequired,

  /**
   * Some columns, such as "date last viewed" or "date recently updated," should sort descending first, since that is what the user probably wants. How often does one want to see their oldest files first in a table? If sortable and the `DataTable`'s parent has not defined the sort order, then ascending (A at the top to Z at the bottom) is the default sort order on first click.
   */
  isDefaultSortDescending: _propTypes.default.bool,

  /**
   * Indicates if column is sorted.
   */
  isSorted: _propTypes.default.bool,

  /**
   * The column label.
   */
  label: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.node]),

  /**
   * The function to execute on sort.
   */
  onSort: _propTypes.default.func,

  /**
   * The property which corresponds to this column.
   */
  property: _propTypes.default.string,

  /**
   * Whether or not the column is sortable.
   */
  sortable: _propTypes.default.bool,

  /**
   * The current sort direction.
   */
  sortDirection: _propTypes.default.oneOf(['desc', 'asc']),

  /**
   * Width of column. This is required for advanced/fixed layout tables. Please provide units. (`rems` are recommended)
   */
  width: _propTypes.default.string
};
/**
 * Used internally, renders each individual column heading.
 */

var DataTableHeaderCell = function DataTableHeaderCell(props) {
  var _classNames;

  var _useState = (0, _react.useState)(null),
      _useState2 = _slicedToArray(_useState, 2),
      sortDirection = _useState2[0],
      setSortDirection = _useState2[1];

  var prevIsSorted = (0, _react.useRef)(null);
  var tableContext = (0, _react.useContext)(_tableContext.default);
  var cellContext = (0, _react.useContext)(_cellContext.default);

  var _useContextHelper = (0, _contextHelper.default)(tableContext, cellContext, props.fixedLayout),
      tabIndex = _useContextHelper.tabIndex,
      hasFocus = _useContextHelper.hasFocus,
      handleFocus = _useContextHelper.handleFocus,
      handleKeyDown = _useContextHelper.handleKeyDown;

  (0, _react.useEffect)(function () {
    (0, _columnCheckProps.default)(_constants.DATA_TABLE_COLUMN, props); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  (0, _react.useEffect)(function () {
    if (prevIsSorted.current === true && props.isSorted === false) {
      setSortDirection(null);
    }

    prevIsSorted.current = props.isSorted;
  }, [props.isSorted]);

  var handleSort = function handleSort(e) {
    e.preventDefault();
    var oldSortDirection = props.sortDirection || sortDirection; // UX pattern: If sortable, and the DataTable's parent has not defined the sort order, then ascending (that is A->Z) is the default sort order on first click. Some columns, such as "last viewed" or "recently updated," should sort descending first, since that is what the user probably wants. Who wants to see the oldest files first?

    var newSortDirection = function sortDirectionFunction(direction, isDefaultSortDescending) {
      switch (direction) {
        case 'asc':
          return 'desc';

        case 'desc':
          return 'asc';

        case null:
          return isDefaultSortDescending ? 'desc' : 'asc';

        default:
          return 'asc';
      }
    }(oldSortDirection, props.isDefaultSortDescending);

    var data = {
      property: props.property,
      sortDirection: newSortDirection
    };
    setSortDirection(newSortDirection);

    if ((0, _lodash.default)(props.onSort)) {
      props.onSort(data, e);
    }
  };

  var fixedHeader = props.fixedHeader,
      isSorted = props.isSorted,
      label = props.label,
      sortable = props.sortable,
      width = props.width,
      property = props.property;

  var labelType = _typeof(label); // This decides which arrow to render--which is current sort order if the column is sorted OR the future sort order if the arrow is clicked in the future.


  var effectiveSortDirection = props.sortDirection || sortDirection || props.isDefaultSortDescending && 'desc';
  var expandedSortDirection = effectiveSortDirection === 'desc' ? 'descending' : 'ascending';
  var ariaSort = isSorted ? expandedSortDirection : 'none';

  var getFixedLayoutSubRenders = function getFixedLayoutSubRenders(isHidden) {
    if (sortable) {
      // Don't make the anchor interactable when it's hidden
      var SortLink = isHidden ? _link.default : _interactiveLink.default;
      return /*#__PURE__*/_react.default.createElement(SortLink, {
        href: "#",
        className: "slds-th__action slds-text-link_reset",
        onClick: handleSort,
        role: "button"
      }, /*#__PURE__*/_react.default.createElement("span", {
        className: "slds-assistive-text"
      }, props.assistiveTextForColumnSort || props.assistiveText.columnSort, ' '), /*#__PURE__*/_react.default.createElement("span", {
        className: "slds-truncate",
        title: labelType === 'string' ? label : undefined
      }, label), /*#__PURE__*/_react.default.createElement(_icon.default, {
        className: "slds-is-sortable__icon",
        category: "utility",
        name: effectiveSortDirection === 'desc' ? 'arrowdown' : 'arrowup',
        size: "x-small"
      }), effectiveSortDirection ? /*#__PURE__*/_react.default.createElement("span", {
        className: "slds-assistive-text",
        "aria-atomic": "true"
      }, effectiveSortDirection === 'asc' ? props.assistiveTextForColumnSortedAscending || props.assistiveText.columnSortedAscending : props.assistiveTextForColumnSortedDescending || props.assistiveText.columnSortedDescending) : null);
    }

    return /*#__PURE__*/_react.default.createElement("span", {
      className: "slds-p-horizontal_x-small slds-th__action",
      style: {
        display: 'flex'
      }
    }, /*#__PURE__*/_react.default.createElement("span", {
      className: "slds-truncate",
      title: labelType === 'string' ? label : undefined
    }, label));
  };

  var getHeaderCellContent = function getHeaderCellContent(isHidden) {
    return props.fixedLayout ? getFixedLayoutSubRenders(isHidden) : /*#__PURE__*/_react.default.createElement("div", {
      className: "slds-truncate",
      title: labelType === 'string' ? label : undefined
    }, label);
  };

  return /*#__PURE__*/_react.default.createElement("th", {
    id: "".concat(props.id, "-").concat(property, "-th"),
    "aria-label": labelType === 'string' ? label : undefined,
    "aria-sort": ariaSort,
    className: (0, _classnames.default)((_classNames = {
      'slds-is-sortable': sortable,
      'slds-is-sorted': isSorted
    }, _defineProperty(_classNames, "slds-is-sorted_".concat(effectiveSortDirection), effectiveSortDirection), _defineProperty(_classNames, 'slds-is-sorted_asc', isSorted && !effectiveSortDirection), _classNames)),
    onFocus: handleFocus,
    onKeyDown: handleKeyDown,
    ref: function ref(_ref) {
      if (props.cellRef) {
        props.cellRef(_ref);

        if (_ref && hasFocus) {
          _ref.focus();
        }
      }
    },
    scope: "col",
    style: fixedHeader || width ? {
      height: fixedHeader ? 0 : null,
      lineHeight: fixedHeader ? 0 : null,
      width: width || null
    } : null,
    tabIndex: tabIndex
  }, fixedHeader ? /*#__PURE__*/_react.default.cloneElement(getHeaderCellContent(true), {
    style: {
      display: 'flex',
      height: 0,
      overflow: 'hidden',
      paddingBottom: 0,
      paddingTop: 0,
      visibility: 'hidden'
    }
  }) : getHeaderCellContent(), fixedHeader ? /*#__PURE__*/_react.default.createElement(_cellFixed.default, null, /*#__PURE__*/_react.default.cloneElement(getHeaderCellContent(), {
    style: {
      alignItems: 'center',
      display: 'flex',
      flex: '1 1 auto',
      lineHeight: 1.25,
      width: '100%'
    },
    tabIndex: sortable ? 0 : null
  })) : null);
}; // ### Display Name
// Always use the canonical component name as the React display name.


DataTableHeaderCell.displayName = _constants.DATA_TABLE_HEADER_CELL;
DataTableHeaderCell.propTypes = propTypes;
var _default = DataTableHeaderCell;
exports.default = _default;