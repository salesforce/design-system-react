"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _menuDropdown = _interopRequireDefault(require("../../../../components/menu-dropdown"));

var _dataTable = _interopRequireDefault(require("../../../../components/data-table"));

var _column = _interopRequireDefault(require("../../../../components/data-table/column"));

var _cell = _interopRequireDefault(require("../../../../components/data-table/cell"));

var _rowActions = _interopRequireDefault(require("../../../../components/data-table/row-actions"));

var _iconSettings = _interopRequireDefault(require("../../../../components/icon-settings"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var CustomDataTableCell = function CustomDataTableCell(_ref) {
  var children = _ref.children,
      props = _objectWithoutProperties(_ref, ["children"]);

  return _react.default.createElement(_cell.default, _extends({
    title: children
  }, props), _react.default.createElement("a", {
    href: "javascript:void(0);",
    onClick: function onClick(event) {
      event.preventDefault();
    }
  }, children));
};

CustomDataTableCell.displayName = _cell.default.displayName;

var Example =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Example, _React$Component);

  function Example() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, Example);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(Example)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "state", {
      sortColumn: 'opportunityName',
      sortColumnDirection: {
        opportunityName: 'asc'
      },
      items: [{
        id: '8IKZHZZV80',
        opportunityName: 'Acme - 1,200 Widgets',
        accountName: 'Acme',
        closeDate: '4/10/15',
        stage: 'Value Proposition',
        confidence: '70%',
        amount: '$25,000,000',
        contact: 'jrogers@acme.com'
      }, {
        id: '5GJOOOPWU7',
        opportunityName: 'Acme - 200 Widgets',
        accountName: 'Acme',
        closeDate: '1/31/15',
        stage: 'Prospecting',
        confidence: '30%',
        amount: '$5,000,000',
        contact: 'bob@acme.com'
      }, {
        id: '8IKZHZZV81',
        opportunityName: 'salesforce.com - 1,000 Widgets',
        accountName: 'salesforce.com',
        closeDate: '1/31/15 3:45PM',
        stage: 'Id. Decision Makers',
        confidence: '60%',
        amount: '$25,000',
        contact: 'nathan@salesforce.com'
      }],
      selection: [{
        id: '8IKZHZZV81',
        opportunityName: 'salesforce.com - 1,000 Widgets',
        accountName: 'salesforce.com',
        closeDate: '1/31/15 3:45PM',
        stage: 'Id. Decision Makers',
        confidence: '60%',
        amount: '$25,000',
        contact: 'nathan@salesforce.com'
      }]
    });

    _defineProperty(_assertThisInitialized(_this), "handleChanged", function (event, data) {
      _this.setState({
        selection: data.selection
      });

      console.log(event, data);
    });

    _defineProperty(_assertThisInitialized(_this), "handleRowAction", function (item, action) {
      console.log(item, action);
    });

    _defineProperty(_assertThisInitialized(_this), "handleSort", function (sortColumn) {
      if (_this.props.log) {
        for (var _len2 = arguments.length, rest = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
          rest[_key2 - 1] = arguments[_key2];
        }

        _this.props.log('sort').apply(void 0, [sortColumn].concat(rest));
      }

      var sortProperty = sortColumn.property;
      var sortDirection = sortColumn.sortDirection;
      var newState = {
        sortColumn: sortProperty,
        sortColumnDirection: _defineProperty({}, sortProperty, sortDirection),
        items: _toConsumableArray(_this.state.items)
      }; // needs to work in both directions

      newState.items = newState.items.sort(function (a, b) {
        var val = 0;

        if (a[sortProperty] > b[sortProperty]) {
          val = 1;
        }

        if (a[sortProperty] < b[sortProperty]) {
          val = -1;
        }

        if (sortDirection === 'desc') {
          val *= -1;
        }

        return val;
      });

      _this.setState(newState);
    });

    return _this;
  }

  _createClass(Example, [{
    key: "render",
    value: function render() {
      return _react.default.createElement("div", null, _react.default.createElement(_iconSettings.default, {
        iconPath: "/assets/icons"
      }, _react.default.createElement("h3", {
        className: "slds-text-heading_medium slds-m-vertical_medium"
      }, "Advanced (Fixed Layout)"), _react.default.createElement(_dataTable.default, {
        assistiveText: {
          actionsHeader: 'actions',
          columnSort: 'sort this column',
          columnSortedAscending: 'asc',
          columnSortedDescending: 'desc',
          selectAllRows: 'all rows',
          selectRow: 'select this row'
        },
        fixedLayout: true,
        items: this.state.items,
        id: "DataTableExample-2",
        onRowChange: this.handleChanged,
        onSort: this.handleSort,
        selection: this.state.selection,
        selectRows: "checkbox"
      }, _react.default.createElement(_column.default, {
        isSorted: this.state.sortColumn === 'opportunityName',
        label: "Name",
        primaryColumn: true,
        property: "opportunityName",
        sortable: true,
        sortDirection: this.state.sortColumnDirection.opportunityName,
        width: "10rem"
      }, _react.default.createElement(CustomDataTableCell, null)), _react.default.createElement(_column.default, {
        label: "Account Name",
        property: "accountName",
        width: "8rem"
      }), _react.default.createElement(_column.default, {
        sortable: true,
        isDefaultSortDescending: true,
        label: "Close Date",
        property: "closeDate"
      }), _react.default.createElement(_column.default, {
        label: "Stage",
        property: "stage"
      }), _react.default.createElement(_column.default, {
        isSorted: this.state.sortColumn === 'confidence',
        label: "Confidence",
        property: "confidence",
        sortable: true,
        sortDirection: this.state.sortColumnDirection.confidence
      }), _react.default.createElement(_column.default, {
        label: "Amount",
        property: "amount"
      }), _react.default.createElement(_column.default, {
        label: "Contact",
        property: "contact"
      }, _react.default.createElement(CustomDataTableCell, null)), _react.default.createElement(_rowActions.default, {
        options: [{
          id: 0,
          label: 'Add to Group',
          value: '1'
        }, {
          id: 1,
          label: 'Publish',
          value: '2'
        }, {
          id: 2,
          label: 'Third of Seven',
          value: '3'
        }, {
          id: 3,
          label: 'Fourth of Seven',
          value: '4'
        }, {
          id: 4,
          label: 'Fifth of Seven',
          value: '5'
        }, {
          id: 5,
          label: 'Sixth of Seven',
          value: '6'
        }, {
          id: 6,
          label: 'Seventh of Seven',
          value: '7'
        }],
        onAction: this.handleRowAction,
        dropdown: _react.default.createElement(_menuDropdown.default, {
          length: "7"
        })
      }))));
    }
  }]);

  return Example;
}(_react.default.Component);

_defineProperty(Example, "displayName", 'DataTableExample');

var _default = Example; // export is replaced with `ReactDOM.render(<Example />, mountNode);` at runtime

exports.default = _default;