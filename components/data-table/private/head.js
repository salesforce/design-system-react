"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _cellFixed = _interopRequireDefault(require("./cell-fixed"));

var _checkbox = _interopRequireDefault(require("../../checkbox"));

var _headerCell = _interopRequireDefault(require("./header-cell"));

var _interactiveElement = _interopRequireDefault(require("../interactive-element"));

var _cellContext = _interopRequireDefault(require("../private/cell-context"));

var _tableContext = _interopRequireDefault(require("../private/table-context"));

var _contextHelper3 = _interopRequireDefault(require("./context-helper"));

var _constants = require("../../../utilities/constants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var InteractiveCheckbox = (0, _interactiveElement.default)(_checkbox.default);
/**
 * Used internally, provides header row rendering to the DataTable.
 */

var DataTableHead = /*#__PURE__*/function (_React$Component) {
  _inherits(DataTableHead, _React$Component);

  var _super = _createSuper(DataTableHead);

  function DataTableHead() {
    var _this;

    _classCallCheck(this, DataTableHead);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));

    _defineProperty(_assertThisInitialized(_this), "getActionsHeader", function () {
      var fixedHeader = _this.props.fixedHeader;

      var getContent = function getContent(style) {
        return /*#__PURE__*/_react.default.createElement("div", {
          className: "slds-th__action",
          style: style
        }, /*#__PURE__*/_react.default.createElement("span", {
          className: "slds-assistive-text"
        }, _this.props.assistiveText.actionsHeader));
      };

      var actionsHeader = null;

      if (_this.props.showRowActions) {
        actionsHeader = /*#__PURE__*/_react.default.createElement(_tableContext.default.Consumer, null, function (tableContext) {
          var columnIndex = _this.props.canSelectRows ? _this.props.columns.length + 1 : _this.props.columns.length;
          var cellContext = {
            columnIndex: columnIndex,
            rowIndex: 0
          };

          var _contextHelper = (0, _contextHelper3.default)(tableContext, cellContext, _this.props.fixedLayout),
              tabIndex = _contextHelper.tabIndex,
              hasFocus = _contextHelper.hasFocus,
              handleFocus = _contextHelper.handleFocus,
              handleKeyDown = _contextHelper.handleKeyDown;

          return /*#__PURE__*/_react.default.createElement("th", {
            className: (0, _classnames.default)({
              'slds-has-focus': hasFocus
            }),
            ref: function ref(_ref) {
              if (_this.props.headerRefs) {
                _this.props.headerRefs(_ref, 'action');
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
        });
      }

      return actionsHeader;
    });

    _defineProperty(_assertThisInitialized(_this), "getSelectHeader", function () {
      var _this$props = _this.props,
          canSelectRows = _this$props.canSelectRows,
          fixedHeader = _this$props.fixedHeader;

      var getContent = function getContent(idSuffix, style, ariaHidden) {
        var render = null;

        if (canSelectRows === 'radio') {
          render = /*#__PURE__*/_react.default.createElement("div", {
            className: "slds-truncate slds-assistive-text",
            id: "".concat(_this.props.id, "-column-group-header-row-select"),
            title: _this.props.assistiveText.selectRowGroup
          }, _this.props.assistiveText.selectRowGroup);
        } else if (canSelectRows === true || canSelectRows === 'checkbox') {
          render = /*#__PURE__*/_react.default.createElement("div", {
            className: "slds-th__action slds-th__action_form",
            "aria-hidden": ariaHidden && true,
            style: style
          }, !ariaHidden ? /*#__PURE__*/_react.default.createElement("span", {
            id: "".concat(_this.props.id, "-column-group-header-row-select"),
            className: "slds-assistive-text"
          }, _this.props.assistiveText.selectAllRows) : null, /*#__PURE__*/_react.default.createElement(InteractiveCheckbox, {
            assistiveText: {
              label: _this.props.assistiveText.selectAllRows
            },
            checked: _this.props.allSelected,
            indeterminate: _this.props.indeterminateSelected,
            id: "".concat(_this.props.id, "-").concat(idSuffix) // There is a checkbox for user interaction and a checkbox for positioning. ariaHidden is for the checkbox for positioning and it should be removed from the accessibility tree.
            ,
            name: !ariaHidden ? 'SelectAll' : undefined,
            onChange: _this.props.onToggleAll
          }));
        }

        return render;
      };

      var selectHeader = null;

      if (canSelectRows) {
        selectHeader = /*#__PURE__*/_react.default.createElement(_tableContext.default.Consumer, null, function (tableContext) {
          var cellContext = {
            columnIndex: 0,
            rowIndex: 0
          };

          var _contextHelper2 = (0, _contextHelper3.default)(tableContext, cellContext, _this.props.fixedLayout),
              tabIndex = _contextHelper2.tabIndex,
              hasFocus = _contextHelper2.hasFocus,
              handleFocus = _contextHelper2.handleFocus,
              handleKeyDown = _contextHelper2.handleKeyDown;

          return /*#__PURE__*/_react.default.createElement("th", {
            className: (0, _classnames.default)('slds-text-align_right', {
              'slds-has-focus': hasFocus
            }),
            ref: function ref(_ref2) {
              if (_this.props.headerRefs) {
                _this.props.headerRefs(_ref2, 'select');
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
        });
      }

      return selectHeader;
    });

    return _this;
  }

  _createClass(DataTableHead, [{
    key: "render",
    value: // ### Render
    function render() {
      var _this2 = this;

      var actionsHeader = this.getActionsHeader();
      var selectHeader = this.getSelectHeader();
      return /*#__PURE__*/_react.default.createElement("thead", null, /*#__PURE__*/_react.default.createElement("tr", {
        className: "slds-line-height_reset"
      }, selectHeader, this.props.columns.map(function (column, index) {
        return /*#__PURE__*/_react.default.createElement(_cellContext.default.Provider, {
          key: "".concat(_this2.props.id, "-").concat(column.props.property),
          value: {
            columnIndex: _this2.props.canSelectRows ? index + 1 : index,
            rowIndex: 0
          }
        }, /*#__PURE__*/_react.default.createElement(_headerCell.default, _extends({
          assistiveText: _this2.props.assistiveText,
          cellRef: function cellRef(ref) {
            if (_this2.props.headerRefs) {
              _this2.props.headerRefs(ref, index);
            }
          },
          fixedHeader: _this2.props.fixedHeader,
          id: "".concat(_this2.props.id, "-").concat(column.props.property),
          onSort: _this2.props.onSort
        }, column.props)));
      }), actionsHeader));
    }
  }]);

  return DataTableHead;
}(_react.default.Component);

_defineProperty(DataTableHead, "displayName", _constants.DATA_TABLE_HEAD);

_defineProperty(DataTableHead, "propTypes", {
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
  indeterminateSelected: _propTypes.default.bool,
  canSelectRows: _propTypes.default.oneOfType([_propTypes.default.bool, _propTypes.default.oneOf(['checkbox', 'radio'])]),
  columns: _propTypes.default.arrayOf(_propTypes.default.shape({
    Cell: _propTypes.default.func,
    props: _propTypes.default.object
  })),
  fixedHeader: _propTypes.default.bool,
  id: _propTypes.default.string,
  onToggleAll: _propTypes.default.func,
  onSort: _propTypes.default.func,
  showRowActions: _propTypes.default.bool
});

var _default = DataTableHead;
exports.default = _default;