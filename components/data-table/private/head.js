"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _cellFixed = require("./cell-fixed");

var _cellFixed2 = _interopRequireDefault(_cellFixed);

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

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

/**
 * Used internally, provides header row rendering to the DataTable.
 */
var DataTableHead =
/*#__PURE__*/
function (_React$Component) {
  _inherits(DataTableHead, _React$Component);

  function DataTableHead() {
    var _ref;

    var _temp, _this;

    _classCallCheck(this, DataTableHead);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _possibleConstructorReturn(_this, (_temp = _this = _possibleConstructorReturn(this, (_ref = DataTableHead.__proto__ || Object.getPrototypeOf(DataTableHead)).call.apply(_ref, [this].concat(args))), Object.defineProperty(_assertThisInitialized(_this), "getActionsHeader", {
      configurable: true,
      enumerable: true,
      writable: true,
      value: function value() {
        var fixedHeader = _this.props.fixedHeader;

        var getContent = function getContent(style) {
          return _react2.default.createElement("div", {
            className: "slds-th__action",
            style: style
          }, _react2.default.createElement("span", {
            className: "slds-assistive-text"
          }, _this.props.assistiveText.actionsHeader));
        };

        var actionsHeader = null;

        if (_this.props.showRowActions) {
          actionsHeader = _react2.default.createElement("th", {
            ref: function ref(_ref2) {
              if (_this.props.headerRefs) {
                _this.props.headerRefs(_ref2, 'action');
              }
            },
            scope: "col",
            style: {
              height: fixedHeader ? 0 : null,
              lineHeight: fixedHeader ? 0 : null,
              width: '3.25rem'
            }
          }, getContent(fixedHeader ? {
            height: 0,
            overflow: 'hidden',
            paddingBottom: 0,
            paddingTop: 0,
            visibility: 'hidden'
          } : null), fixedHeader ? _react2.default.createElement(_cellFixed2.default, null, getContent({
            lineHeight: 1,
            width: '100%'
          })) : null);
        }

        return actionsHeader;
      }
    }), Object.defineProperty(_assertThisInitialized(_this), "getSelectHeader", {
      configurable: true,
      enumerable: true,
      writable: true,
      value: function value() {
        var _this$props = _this.props,
            canSelectRows = _this$props.canSelectRows,
            fixedHeader = _this$props.fixedHeader;

        var getContent = function getContent(idSuffix, style) {
          return canSelectRows !== 'radio' ? _react2.default.createElement("div", {
            className: "slds-th__action slds-th__action_form",
            style: style
          }, _react2.default.createElement(_checkbox2.default, {
            assistiveText: {
              label: _this.props.assistiveText.selectAllRows
            },
            checked: _this.props.allSelected,
            indeterminate: _this.props.indeterminateSelected,
            id: "".concat(_this.props.id, "-").concat(idSuffix),
            name: "SelectAll",
            onChange: _this.props.onToggleAll
          })) : null;
        };

        var selectHeader = null;

        if (canSelectRows) {
          selectHeader = _react2.default.createElement("th", {
            className: "slds-text-align_right",
            ref: function ref(_ref3) {
              if (_this.props.headerRefs) {
                _this.props.headerRefs(_ref3, 'select');
              }
            },
            scope: "col",
            style: {
              height: fixedHeader ? 0 : null,
              lineHeight: fixedHeader ? 0 : null,
              width: '3.25rem'
            }
          }, getContent('SelectAll', fixedHeader ? {
            display: 'flex',
            height: 0,
            overflow: 'hidden',
            paddingBottom: 0,
            paddingTop: 0,
            visibility: 'hidden'
          } : null), fixedHeader ? _react2.default.createElement(_cellFixed2.default, null, getContent('SelectAll-fixedHeader', {
            display: 'flex',
            justifyContent: 'flex-end',
            lineHeight: 1,
            width: '100%'
          })) : null);
        }

        return selectHeader;
      }
    }), _temp));
  }

  _createClass(DataTableHead, [{
    key: "componentWillMount",
    value: function componentWillMount() {}
  }, {
    key: "render",
    // ### Render
    value: function render() {
      var _this2 = this;

      var actionsHeader = this.getActionsHeader();
      var selectHeader = this.getSelectHeader();
      return _react2.default.createElement("thead", null, _react2.default.createElement("tr", {
        className: "slds-line-height_reset"
      }, selectHeader, this.props.columns.map(function (column, index) {
        return _react2.default.createElement(_headerCell2.default, _extends({
          assistiveText: _this2.props.assistiveText,
          cellRef: function cellRef(ref) {
            if (_this2.props.headerRefs) {
              _this2.props.headerRefs(ref, index);
            }
          },
          fixedHeader: _this2.props.fixedHeader,
          id: "".concat(_this2.props.id, "-").concat(column.props.property),
          key: "".concat(_this2.props.id, "-").concat(column.props.property),
          onSort: _this2.props.onSort
        }, column.props));
      }), actionsHeader));
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
    headerRefs: _propTypes2.default.func,
    indeterminateSelected: _propTypes2.default.bool,
    canSelectRows: _propTypes2.default.oneOfType([_propTypes2.default.bool, _propTypes2.default.oneOf(['checkbox', 'radio'])]),
    columns: _propTypes2.default.arrayOf(_propTypes2.default.shape({
      Cell: _propTypes2.default.func,
      props: _propTypes2.default.object
    })),
    fixedHeader: _propTypes2.default.bool,
    id: _propTypes2.default.string,
    onToggleAll: _propTypes2.default.func,
    onSort: _propTypes2.default.func,
    showRowActions: _propTypes2.default.bool
  }
});
exports.default = DataTableHead;