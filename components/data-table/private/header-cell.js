"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require("classnames");

var _classnames2 = _interopRequireDefault(_classnames);

var _lodash = require("lodash.isfunction");

var _lodash2 = _interopRequireDefault(_lodash);

var _icon = require("../../icon");

var _icon2 = _interopRequireDefault(_icon);

var _columnCheckProps = require("../column-check-props");

var _columnCheckProps2 = _interopRequireDefault(_columnCheckProps);

var _constants = require("../../../utilities/constants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

/**
 * Used internally, renders each individual column heading.
 */
var DataTableHeaderCell =
/*#__PURE__*/
function (_React$Component) {
  _inherits(DataTableHeaderCell, _React$Component);

  function DataTableHeaderCell() {
    var _ref;

    var _temp, _this;

    _classCallCheck(this, DataTableHeaderCell);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _possibleConstructorReturn(_this, (_temp = _this = _possibleConstructorReturn(this, (_ref = DataTableHeaderCell.__proto__ || Object.getPrototypeOf(DataTableHeaderCell)).call.apply(_ref, [this].concat(args))), Object.defineProperty(_assertThisInitialized(_this), "state", {
      configurable: true,
      enumerable: true,
      writable: true,
      value: {
        sortDirection: null
      }
    }), Object.defineProperty(_assertThisInitialized(_this), "handleSort", {
      configurable: true,
      enumerable: true,
      writable: true,
      value: function value(e) {
        var oldSortDirection = _this.props.sortDirection || _this.state.sortDirection;
        var sortDirection = oldSortDirection === 'asc' ? 'desc' : 'asc';
        var data = {
          property: _this.props.property,
          sortDirection: sortDirection
        };

        _this.setState({
          sortDirection: sortDirection
        });

        if ((0, _lodash2.default)(_this.props.onSort)) {
          _this.props.onSort(data, e);
        }
      }
    }), _temp));
  }

  _createClass(DataTableHeaderCell, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      (0, _columnCheckProps2.default)(_constants.DATA_TABLE_COLUMN, this.props);
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
      var _classNames;

      var _props = this.props,
          isSorted = _props.isSorted,
          label = _props.label,
          sortable = _props.sortable,
          width = _props.width;

      var labelType = _typeof(label);

      var sortDirection = this.props.sortDirection || this.state.sortDirection;
      var expandedSortDirection = sortDirection === 'desc' ? 'descending' : 'ascending';
      var ariaSort = isSorted ? expandedSortDirection : 'none';
      var fixedLayoutSubRenders = {
        sortable: _react2.default.createElement("a", {
          href: "javascript:void(0)" // eslint-disable-line no-script-url
          ,
          className: "slds-th__action slds-text-link_reset",
          onClick: this.handleSort,
          role: "button",
          tabIndex: "0"
        }, _react2.default.createElement("span", {
          className: "slds-assistive-text"
        }, this.props.assistiveTextForColumnSort || this.props.assistiveText.columnSort, ' '), _react2.default.createElement("span", {
          className: "slds-truncate",
          title: labelType === 'string' ? label : undefined
        }, label), _react2.default.createElement(_icon2.default, {
          className: "slds-is-sortable__icon",
          category: "utility",
          name: sortDirection === 'desc' ? 'arrowdown' : 'arrowup',
          size: "x-small"
        }), sortDirection ? _react2.default.createElement("span", {
          className: "slds-assistive-text",
          "aria-live": "assertive",
          "aria-atomic": "true"
        }, sortDirection === 'asc' ? this.props.assistiveTextForColumnSortedAscending || this.props.assistiveText.columnSortedAscending : this.props.assistiveTextForColumnSortedDescending || this.props.assistiveText.columnSortedDescending) : null),
        notSortable: _react2.default.createElement("span", {
          className: "slds-p-horizontal_x-small",
          style: {
            display: 'flex'
          }
        }, _react2.default.createElement("span", {
          className: "slds-truncate",
          title: labelType === 'string' ? label : undefined
        }, label))
      };
      return _react2.default.createElement("th", {
        "aria-label": labelType === 'string' ? label : undefined,
        "aria-sort": ariaSort,
        className: (0, _classnames2.default)((_classNames = {
          'slds-is-sortable': sortable,
          'slds-is-sorted': isSorted
        }, _defineProperty(_classNames, "slds-is-sorted_".concat(sortDirection), sortDirection), _defineProperty(_classNames, 'slds-is-sorted_asc', isSorted && !sortDirection), _classNames), 'slds-text-title_caps'),
        scope: "col",
        style: width ? {
          width: width
        } : null
      }, this.props.fixedLayout ? fixedLayoutSubRenders[sortable ? 'sortable' : 'notSortable'] : _react2.default.createElement("div", {
        className: "slds-truncate",
        title: labelType === 'string' ? label : undefined
      }, label));
    }
  }]);

  return DataTableHeaderCell;
}(_react2.default.Component);

Object.defineProperty(DataTableHeaderCell, "displayName", {
  configurable: true,
  enumerable: true,
  writable: true,
  value: _constants.DATA_TABLE_HEADER_CELL
});
Object.defineProperty(DataTableHeaderCell, "propTypes", {
  configurable: true,
  enumerable: true,
  writable: true,
  value: {
    assistiveText: _propTypes2.default.shape({
      actionsHeader: _propTypes2.default.string,
      columnSort: _propTypes2.default.string,
      columnSortedAscending: _propTypes2.default.string,
      columnSortedDescending: _propTypes2.default.string,
      selectAllRows: _propTypes2.default.string,
      selectRow: _propTypes2.default.string
    }),
    id: _propTypes2.default.string.isRequired,

    /**
     * Indicates if column is sorted.
     */
    isSorted: _propTypes2.default.bool,

    /**
     * The column label.
     */
    label: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.node]),

    /**
     * The function to execute on sort.
     */
    onSort: _propTypes2.default.func,

    /**
     * The property which corresponds to this column.
     */
    property: _propTypes2.default.string,

    /**
     * Whether or not the column is sortable.
     */
    sortable: _propTypes2.default.bool,

    /**
     * The current sort direction.
     */
    sortDirection: _propTypes2.default.oneOf(['desc', 'asc']),

    /**
     * Width of column. This is required for advanced/fixed layout tables. Please provide units. (`rems` are recommended)
     */
    width: _propTypes2.default.string
  }
});
exports.default = DataTableHeaderCell;