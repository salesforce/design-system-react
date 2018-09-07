"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _createReactClass = require("create-react-class");

var _createReactClass2 = _interopRequireDefault(_createReactClass);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _checkbox = require("../../checkbox");

var _checkbox2 = _interopRequireDefault(_checkbox);

var _headerCell = require("./header-cell");

var _headerCell2 = _interopRequireDefault(_headerCell);

var _constants = require("../../../utilities/constants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

/**
 * Used internally, provides header row rendering to the DataTable.
 */
var DataTableHead = (0, _createReactClass2.default)({
  // ### Display Name
  // Always use the canonical component name as the React display name.
  displayName: _constants.DATA_TABLE_HEAD,
  // ### Prop Types
  propTypes: {
    assistiveText: _propTypes2.default.shape({
      actionsHeader: _propTypes2.default.string,
      columnSort: _propTypes2.default.string,
      columnSortedAscending: _propTypes2.default.string,
      columnSortedDescending: _propTypes2.default.string,
      selectAllRows: _propTypes2.default.string,
      selectRow: _propTypes2.default.string
    }),
    allSelected: _propTypes2.default.bool,
    indeterminateSelected: _propTypes2.default.bool,
    canSelectRows: _propTypes2.default.bool,
    columns: _propTypes2.default.arrayOf(_propTypes2.default.shape({
      Cell: _propTypes2.default.func,
      props: _propTypes2.default.object
    })),
    id: _propTypes2.default.string,
    onToggleAll: _propTypes2.default.func,
    onSort: _propTypes2.default.func,
    showRowActions: _propTypes2.default.bool
  },
  componentWillMount: function componentWillMount() {},
  // ### Render
  render: function render() {
    var _this = this;

    return _react2.default.createElement("thead", null, _react2.default.createElement("tr", {
      className: "slds-line-height_reset"
    }, this.props.canSelectRows ? _react2.default.createElement("th", {
      className: "slds-text-align_right",
      scope: "col",
      style: {
        width: '3.25rem'
      }
    }, _react2.default.createElement("div", {
      className: "slds-th__action slds-th__action--form"
    }, _react2.default.createElement(_checkbox2.default, {
      assistiveText: {
        label: this.props.assistiveText.selectAllRows
      },
      checked: this.props.allSelected,
      indeterminate: this.props.indeterminateSelected,
      id: "".concat(this.props.id, "-SelectAll"),
      name: "SelectAll",
      onChange: this.props.onToggleAll
    }))) : null, this.props.columns.map(function (column) {
      return _react2.default.createElement(_headerCell2.default, _extends({
        assistiveText: _this.props.assistiveText,
        id: "".concat(_this.props.id, "-").concat(column.props.property),
        key: "".concat(_this.props.id, "-").concat(column.props.property),
        onSort: _this.props.onSort
      }, column.props));
    }), this.props.showRowActions ? _react2.default.createElement("th", {
      scope: "col",
      style: {
        width: '3.25rem'
      }
    }, _react2.default.createElement("div", {
      className: "slds-th__action"
    }, _react2.default.createElement("span", {
      className: "slds-assistive-text"
    }, this.props.assistiveText.actionsHeader))) : null));
  }
});
exports.default = DataTableHead;