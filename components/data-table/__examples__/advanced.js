"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _createReactClass = require("create-react-class");

var _createReactClass2 = _interopRequireDefault(_createReactClass);

var _menuDropdown = require("../../../../components/menu-dropdown");

var _menuDropdown2 = _interopRequireDefault(_menuDropdown);

var _dataTable = require("../../../../components/data-table");

var _dataTable2 = _interopRequireDefault(_dataTable);

var _column = require("../../../../components/data-table/column");

var _column2 = _interopRequireDefault(_column);

var _cell = require("../../../../components/data-table/cell");

var _cell2 = _interopRequireDefault(_cell);

var _rowActions = require("../../../../components/data-table/row-actions");

var _rowActions2 = _interopRequireDefault(_rowActions);

var _iconSettings = require("../../../../components/icon-settings");

var _iconSettings2 = _interopRequireDefault(_iconSettings);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

var CustomDataTableCell = function CustomDataTableCell(_ref) {
  var children = _ref.children,
      props = _objectWithoutProperties(_ref, ["children"]);

  return _react2.default.createElement(_cell2.default, _extends({
    title: children
  }, props), _react2.default.createElement("a", {
    href: "javascript:void(0);",
    onClick: function onClick(event) {
      event.preventDefault();
    }
  }, children));
};

CustomDataTableCell.displayName = _cell2.default.displayName;
var Example = (0, _createReactClass2.default)({
  displayName: 'DataTableExample',
  getInitialState: function getInitialState() {
    return {
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
    };
  },
  handleChanged: function handleChanged(selection) {
    this.setState({
      selection: selection
    });
  },
  handleRowAction: function handleRowAction(item, action) {
    console.log(item, action);
  },
  handleSort: function handleSort(sortColumn) {
    if (this.props.log) {
      for (var _len = arguments.length, rest = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        rest[_key - 1] = arguments[_key];
      }

      this.props.log('sort').apply(void 0, [sortColumn].concat(rest));
    }

    var sortProperty = sortColumn.property;
    var sortDirection = sortColumn.sortDirection;
    var newState = {
      sortColumn: sortProperty,
      sortColumnDirection: _defineProperty({}, sortProperty, sortDirection),
      items: _toConsumableArray(this.state.items)
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
    this.setState(newState);
  },
  render: function render() {
    return _react2.default.createElement("div", null, _react2.default.createElement(_iconSettings2.default, {
      iconPath: "/assets/icons"
    }, _react2.default.createElement(_dataTable2.default, {
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
      onChange: this.handleChanged,
      onSort: this.handleSort,
      selection: this.state.selection,
      selectRows: true
    }, _react2.default.createElement(_column2.default, {
      isSorted: this.state.sortColumn === 'opportunityName',
      label: "Name",
      primaryColumn: true,
      property: "opportunityName",
      sortable: true,
      sortDirection: this.state.sortColumnDirection.opportunityName,
      width: "10rem"
    }, _react2.default.createElement(CustomDataTableCell, null)), _react2.default.createElement(_column2.default, {
      label: "Account Name",
      property: "accountName",
      width: "8rem"
    }), _react2.default.createElement(_column2.default, {
      label: "Close Date",
      property: "closeDate"
    }), _react2.default.createElement(_column2.default, {
      label: "Stage",
      property: "stage"
    }), _react2.default.createElement(_column2.default, {
      isSorted: this.state.sortColumn === 'confidence',
      label: "Confidence",
      property: "confidence",
      sortable: true,
      sortDirection: this.state.sortColumnDirection.confidence
    }), _react2.default.createElement(_column2.default, {
      label: "Amount",
      property: "amount"
    }), _react2.default.createElement(_column2.default, {
      label: "Contact",
      property: "contact"
    }, _react2.default.createElement(CustomDataTableCell, null)), _react2.default.createElement(_rowActions2.default, {
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
      dropdown: _react2.default.createElement(_menuDropdown2.default, {
        length: "7"
      })
    }))));
  }
});
exports.default = Example; // export is replaced with `ReactDOM.render(<Example />, mountNode);` at runtime