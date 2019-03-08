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

var _lodash = require("lodash.find");

var _lodash2 = _interopRequireDefault(_lodash);

var _checkbox = require("../../checkbox");

var _checkbox2 = _interopRequireDefault(_checkbox);

var _radio = require("../../radio");

var _radio2 = _interopRequireDefault(_radio);

var _constants = require("../../../utilities/constants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

/**
 * Used internally, provides row rendering to the DataTable.
 */
var DataTableRow =
/*#__PURE__*/
function (_React$Component) {
  _inherits(DataTableRow, _React$Component);

  function DataTableRow() {
    var _ref;

    var _temp, _this;

    _classCallCheck(this, DataTableRow);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _possibleConstructorReturn(_this, (_temp = _this = _possibleConstructorReturn(this, (_ref = DataTableRow.__proto__ || Object.getPrototypeOf(DataTableRow)).call.apply(_ref, [this].concat(args))), Object.defineProperty(_assertThisInitialized(_this), "isSelected", {
      configurable: true,
      enumerable: true,
      writable: true,
      value: function value() {
        return !!(0, _lodash2.default)(_this.props.selection, _this.props.item);
      }
    }), Object.defineProperty(_assertThisInitialized(_this), "handleToggle", {
      configurable: true,
      enumerable: true,
      writable: true,
      value: function value(e, _ref2) {
        var checked = _ref2.checked;
        return _this.props.onToggle(_this.props.item, checked, e);
      }
    }), _temp));
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


      return _react2.default.createElement("tr", _extends({}, ariaProps, {
        className: (0, _classnames2.default)({
          'slds-hint-parent': this.props.rowActions,
          'slds-is-selected': this.props.canSelectRows && isSelected
        })
      }), this.props.canSelectRows ? _react2.default.createElement("td", {
        role: this.props.fixedLayout ? 'gridcell' : null,
        className: "slds-text-align_right",
        "data-label": this.props.stacked ? 'Select Row' : undefined,
        style: {
          width: '3.25rem'
        }
      }, this.props.canSelectRows === 'radio' ? _react2.default.createElement(_radio2.default, {
        assistiveText: {
          label: this.props.assistiveText.selectRow
        },
        checked: isSelected,
        className: "slds-m-right_x-small",
        id: "".concat(this.props.id, "-SelectRow"),
        label: "",
        name: "".concat(this.props.tableId, "-SelectRow"),
        onChange: this.handleToggle
      }) : _react2.default.createElement(_checkbox2.default, {
        assistiveText: {
          label: this.props.assistiveText.selectRow
        },
        checked: isSelected,
        id: "".concat(this.props.id, "-SelectRow"),
        name: "SelectRow",
        onChange: this.handleToggle
      })) : null, this.props.columns.map(function (column) {
        var Cell = column.Cell;
        var cellId = "".concat(_this2.props.id, "-").concat(_constants.DATA_TABLE_CELL, "-").concat(column.props.property);
        return _react2.default.createElement(Cell, _extends({}, column.props, {
          className: column.props.truncate ? 'slds-truncate' : null,
          fixedLayout: _this2.props.fixedLayout,
          rowHeader: column.props.primaryColumn,
          id: cellId,
          item: _this2.props.item,
          key: cellId,
          width: column.props.width
        }), _this2.props.item[column.props.property]);
      }), this.props.rowActions ? _react2.default.cloneElement(this.props.rowActions, {
        id: "".concat(this.props.id, "-").concat(_constants.DATA_TABLE_ROW_ACTIONS),
        item: this.props.item
      }) : null);
    }
  }]);

  return DataTableRow;
}(_react2.default.Component);

Object.defineProperty(DataTableRow, "displayName", {
  configurable: true,
  enumerable: true,
  writable: true,
  value: _constants.DATA_TABLE_ROW
});
Object.defineProperty(DataTableRow, "propTypes", {
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
    canSelectRows: _propTypes2.default.oneOfType([_propTypes2.default.bool, _propTypes2.default.oneOf(['checkbox', 'radio'])]),
    columns: _propTypes2.default.arrayOf(_propTypes2.default.shape({
      Cell: _propTypes2.default.func,
      props: _propTypes2.default.object
    })),

    /**
     * Use this if you are creating an advanced table (selectable, sortable, or resizable rows)
     */
    fixedLayout: _propTypes2.default.bool,
    id: _propTypes2.default.string.isRequired,
    item: _propTypes2.default.object.isRequired,
    onToggle: _propTypes2.default.func,
    rowActions: _propTypes2.default.element,
    selection: _propTypes2.default.array,
    tableId: _propTypes2.default.string
  }
});
exports.default = DataTableRow;