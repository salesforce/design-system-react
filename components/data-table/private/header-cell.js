"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _lodash = _interopRequireDefault(require("lodash.isfunction"));

var _cellFixed = _interopRequireDefault(require("./cell-fixed"));

var _icon = _interopRequireDefault(require("../../icon"));

var _columnCheckProps = _interopRequireDefault(require("../column-check-props"));

var _constants = require("../../../utilities/constants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Used internally, renders each individual column heading.
 */
var DataTableHeaderCell =
/*#__PURE__*/
function (_React$Component) {
  _inherits(DataTableHeaderCell, _React$Component);

  function DataTableHeaderCell() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, DataTableHeaderCell);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(DataTableHeaderCell)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "state", {
      sortDirection: null
    });

    _defineProperty(_assertThisInitialized(_this), "handleSort", function (e) {
      var oldSortDirection = _this.props.sortDirection || _this.state.sortDirection; // UX pattern: If sortable, and the DataTable's parent has not defined the sort order, then ascending (that is A->Z) is the default sort order on first click. Some columns, such as "last viewed" or "recently updated," should sort descending first, since that is what the user probably wants. Who wants to see the oldest files first?

      var sortDirection = function sortDirectionFunction(direction, isDefaultSortDescending) {
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
      }(oldSortDirection, _this.props.isDefaultSortDescending);

      var data = {
        property: _this.props.property,
        sortDirection: sortDirection
      };

      _this.setState({
        sortDirection: sortDirection
      });

      if ((0, _lodash.default)(_this.props.onSort)) {
        _this.props.onSort(data, e);
      }
    });

    return _this;
  }

  _createClass(DataTableHeaderCell, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      (0, _columnCheckProps.default)(_constants.DATA_TABLE_COLUMN, this.props);
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      // reset sort state when another column is sorted
      if (prevProps.isSorted === true && this.props.isSorted === false) {
        this.setState({
          sortDirection: null
        }); // eslint-disable-line react/no-did-update-set-state
      }
    }
  }, {
    key: "render",
    // ### Render
    value: function render() {
      var _classNames,
          _this2 = this;

      var _this$props = this.props,
          fixedHeader = _this$props.fixedHeader,
          isSorted = _this$props.isSorted,
          label = _this$props.label,
          sortable = _this$props.sortable,
          width = _this$props.width;

      var labelType = _typeof(label); // This decides which arrow to render--which is current sort order if the column is sorted OR the future sort order if the arrow is clicked in the future.


      var sortDirection = this.props.sortDirection || this.state.sortDirection || this.props.isDefaultSortDescending && 'desc';
      var expandedSortDirection = sortDirection === 'desc' ? 'descending' : 'ascending';
      var ariaSort = isSorted ? expandedSortDirection : 'none';
      var fixedLayoutSubRenders = {
        sortable: _react.default.createElement("a", {
          href: "javascript:void(0)" // eslint-disable-line no-script-url
          ,
          className: "slds-th__action slds-text-link_reset",
          onClick: this.handleSort,
          role: "button",
          tabIndex: "0"
        }, _react.default.createElement("span", {
          className: "slds-assistive-text"
        }, this.props.assistiveTextForColumnSort || this.props.assistiveText.columnSort, ' '), _react.default.createElement("span", {
          className: "slds-truncate",
          title: labelType === 'string' ? label : undefined
        }, label), _react.default.createElement(_icon.default, {
          className: "slds-is-sortable__icon",
          category: "utility",
          name: sortDirection === 'desc' ? 'arrowdown' : 'arrowup',
          size: "x-small"
        }), sortDirection ? _react.default.createElement("span", {
          className: "slds-assistive-text",
          "aria-live": "assertive",
          "aria-atomic": "true"
        }, sortDirection === 'asc' ? this.props.assistiveTextForColumnSortedAscending || this.props.assistiveText.columnSortedAscending : this.props.assistiveTextForColumnSortedDescending || this.props.assistiveText.columnSortedDescending) : null),
        notSortable: _react.default.createElement("span", {
          className: "slds-p-horizontal_x-small",
          style: {
            display: 'flex'
          }
        }, _react.default.createElement("span", {
          className: "slds-truncate",
          title: labelType === 'string' ? label : undefined
        }, label))
      };
      var headerCellContent = this.props.fixedLayout ? fixedLayoutSubRenders[sortable ? 'sortable' : 'notSortable'] : _react.default.createElement("div", {
        className: "slds-truncate",
        title: labelType === 'string' ? label : undefined
      }, label);
      return _react.default.createElement("th", {
        "aria-label": labelType === 'string' ? label : undefined,
        "aria-sort": ariaSort,
        className: (0, _classnames.default)((_classNames = {
          'slds-is-sortable': sortable,
          'slds-is-sorted': isSorted
        }, _defineProperty(_classNames, "slds-is-sorted_".concat(sortDirection), sortDirection), _defineProperty(_classNames, 'slds-is-sorted_asc', isSorted && !sortDirection), _classNames)),
        ref: function ref(_ref) {
          if (_this2.props.cellRef) {
            _this2.props.cellRef(_ref);
          }
        },
        scope: "col",
        style: fixedHeader || width ? {
          height: fixedHeader ? 0 : null,
          lineHeight: fixedHeader ? 0 : null,
          width: width || null
        } : null
      }, fixedHeader ? _react.default.cloneElement(headerCellContent, {
        style: {
          display: 'flex',
          height: 0,
          overflow: 'hidden',
          paddingBottom: 0,
          paddingTop: 0,
          visibility: 'hidden'
        }
      }) : headerCellContent, fixedHeader ? _react.default.createElement(_cellFixed.default, null, _react.default.cloneElement(headerCellContent, {
        style: {
          alignItems: 'center',
          display: 'flex',
          flex: '1 1 auto',
          lineHeight: 1.25,
          width: '100%'
        },
        tabIndex: sortable ? 0 : null
      })) : null);
    }
  }]);

  return DataTableHeaderCell;
}(_react.default.Component);

_defineProperty(DataTableHeaderCell, "displayName", _constants.DATA_TABLE_HEADER_CELL);

_defineProperty(DataTableHeaderCell, "propTypes", {
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
});

var _default = DataTableHeaderCell;
exports.default = _default;