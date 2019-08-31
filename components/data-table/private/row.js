"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _lodash = _interopRequireDefault(require("lodash.find"));

var _checkbox = _interopRequireDefault(require("../../checkbox"));

var _radio = _interopRequireDefault(require("../../radio"));

var _constants = require("../../../utilities/constants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

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
 * Used internally, provides row rendering to the DataTable.
 */
var DataTableRow =
/*#__PURE__*/
function (_React$Component) {
  _inherits(DataTableRow, _React$Component);

  function DataTableRow() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, DataTableRow);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(DataTableRow)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "isSelected", function () {
      return !!(0, _lodash.default)(_this.props.selection, _this.props.item);
    });

    _defineProperty(_assertThisInitialized(_this), "handleToggle", function (e, _ref) {
      var checked = _ref.checked;
      return _this.props.onToggle(_this.props.item, checked, e);
    });

    return _this;
  }

  _createClass(DataTableRow, [{
    key: "render",
    // ### Render
    value: function render() {
      var _this2 = this;

      var ariaProps = {};
      var isSelected = this.isSelected();

      if (this.props.canSelectRows) {
        ariaProps['aria-selected'] = isSelected ? 'true' : 'false';
      } // i18n


      return _react.default.createElement("tr", _extends({}, ariaProps, {
        className: (0, _classnames.default)({
          'slds-hint-parent': this.props.rowActions,
          'slds-is-selected': this.props.canSelectRows && isSelected
        })
      }), this.props.canSelectRows ? _react.default.createElement("td", {
        role: this.props.fixedLayout ? 'gridcell' : null,
        className: "slds-text-align_right",
        "data-label": this.props.stacked ? 'Select Row' : undefined,
        style: {
          width: '3.25rem'
        }
      }, this.props.canSelectRows === 'radio' ? _react.default.createElement(_radio.default, {
        assistiveText: {
          label: "".concat(this.props.assistiveText.selectRow, " ").concat(Number(this.props.index) + 1)
        },
        "aria-labelledby": "".concat(this.props.id, "-SelectRow-label ").concat(this.props.tableId, "-SLDSDataTableHead-column-group-header-row-select"),
        checked: isSelected,
        className: "slds-m-right_x-small",
        id: "".concat(this.props.id, "-SelectRow"),
        labelId: "".concat(this.props.id, "-SelectRow-label"),
        name: "".concat(this.props.tableId, "-SelectRow"),
        onChange: this.handleToggle
      }) : _react.default.createElement(_checkbox.default, {
        assistiveText: {
          label: "".concat(this.props.assistiveText.selectRow, " ").concat(Number(this.props.index) + 1)
        },
        "aria-labelledby": "".concat(this.props.id, "-SelectRow-label ").concat(this.props.tableId, "-SLDSDataTableHead-column-group-header-row-select"),
        checked: isSelected,
        id: "".concat(this.props.id, "-SelectRow"),
        labelId: "".concat(this.props.id, "-SelectRow-label"),
        name: "SelectRow",
        onChange: this.handleToggle
      })) : null, this.props.columns.map(function (column) {
        var Cell = column.Cell;
        var cellId = "".concat(_this2.props.id, "-").concat(_constants.DATA_TABLE_CELL, "-").concat(column.props.property);
        return _react.default.createElement(Cell, _extends({}, column.props, {
          className: column.props.truncate ? 'slds-truncate' : null,
          fixedLayout: _this2.props.fixedLayout,
          rowHeader: column.props.primaryColumn,
          id: cellId,
          item: _this2.props.item,
          key: cellId,
          width: column.props.width
        }), _this2.props.item[column.props.property]);
      }), this.props.rowActions ? _react.default.cloneElement(this.props.rowActions, {
        id: "".concat(this.props.id, "-").concat(_constants.DATA_TABLE_ROW_ACTIONS),
        item: this.props.item
      }) : null);
    }
  }]);

  return DataTableRow;
}(_react.default.Component);

_defineProperty(DataTableRow, "displayName", _constants.DATA_TABLE_ROW);

_defineProperty(DataTableRow, "propTypes", {
  assistiveText: _propTypes.default.shape({
    actionsHeader: _propTypes.default.string,
    columnSort: _propTypes.default.string,
    columnSortedAscending: _propTypes.default.string,
    columnSortedDescending: _propTypes.default.string,
    selectAllRows: _propTypes.default.string,
    selectRow: _propTypes.default.string
  }),
  canSelectRows: _propTypes.default.oneOfType([_propTypes.default.bool, _propTypes.default.oneOf(['checkbox', 'radio'])]),
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
});

var _default = DataTableRow;
exports.default = _default;