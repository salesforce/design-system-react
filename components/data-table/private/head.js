"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _checkbox = require("../../checkbox");

var _checkbox2 = _interopRequireDefault(_checkbox);

var _headerCell = require("./header-cell");

var _headerCell2 = _interopRequireDefault(_headerCell);

var _constants = require("../../../utilities/constants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Used internally, provides header row rendering to the DataTable.
 */
var DataTableHead =
/*#__PURE__*/
function (_React$Component) {
  _inherits(DataTableHead, _React$Component);

  function DataTableHead() {
    _classCallCheck(this, DataTableHead);

    return _possibleConstructorReturn(this, (DataTableHead.__proto__ || Object.getPrototypeOf(DataTableHead)).apply(this, arguments));
  }

  _createClass(DataTableHead, [{
    key: "componentWillMount",
    // ### Display Name
    // Always use the canonical component name as the React display name.
    // ### Prop Types
    value: function componentWillMount() {} // ### Render

  }, {
    key: "render",
    value: function render() {
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
        className: "slds-th__action slds-th__action_form"
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
  }]);

  return DataTableHead;
}(_react2.default.Component);

Object.defineProperty(DataTableHead, "displayName", {
  configurable: true,
  enumerable: true,
  writable: true,
  value: _constants.DATA_TABLE_HEAD
});
Object.defineProperty(DataTableHead, "propTypes", {
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
  }
});
exports.default = DataTableHead;