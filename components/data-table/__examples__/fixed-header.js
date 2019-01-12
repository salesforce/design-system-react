"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

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

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

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

var Example =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Example, _React$Component);

  function Example() {
    var _ref2;

    var _temp, _this;

    _classCallCheck(this, Example);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _possibleConstructorReturn(_this, (_temp = _this = _possibleConstructorReturn(this, (_ref2 = Example.__proto__ || Object.getPrototypeOf(Example)).call.apply(_ref2, [this].concat(args))), Object.defineProperty(_assertThisInitialized(_this), "state", {
      configurable: true,
      enumerable: true,
      writable: true,
      value: {
        sortColumn: 'opportunityName',
        sortColumnDirection: {
          opportunityName: 'asc'
        },
        items: [{
          id: '896a6a60',
          opportunityName: 'Acme - 1,200 Widgets',
          accountName: 'Acme',
          closeDate: '4/10/15',
          stage: 'Value Proposition',
          confidence: '70%',
          amount: '$25,000,000',
          contact: 'jrogers@acme.com'
        }, {
          id: '44da9dcd',
          opportunityName: 'Acme - 200 Widgets',
          accountName: 'Acme',
          closeDate: '1/31/15',
          stage: 'Prospecting',
          confidence: '30%',
          amount: '$5,000,000',
          contact: 'bob@acme.com'
        }, {
          id: 'f988a721',
          opportunityName: 'salesforce.com - 1,000 Widgets',
          accountName: 'salesforce.com',
          closeDate: '1/31/15 3:45PM',
          stage: 'Id. Decision Makers',
          confidence: '60%',
          amount: '$25,000',
          contact: 'nathan@salesforce.com'
        }, {
          id: 'd7679cdd',
          opportunityName: 'Acme - 800 Widgets',
          accountName: 'Acme',
          closeDate: '6/11/18',
          stage: 'Value Proposition',
          confidence: '85%',
          amount: '$970,000',
          contact: 'jrogers@acme.com'
        }, {
          id: '0085f7a0',
          opportunityName: 'Acme - 744 Widgets',
          accountName: 'Acme',
          closeDate: '4/15/17',
          stage: 'Prospecting',
          confidence: '56%',
          amount: '$3,110,000',
          contact: 'bob@acme.com'
        }, {
          id: 'b7acc778',
          opportunityName: 'salesforce.com - 847 Widgets',
          accountName: 'salesforce.com',
          closeDate: '5/23/18 1:02PM',
          stage: 'Id. Decision Makers',
          confidence: '62%',
          amount: '$18,000',
          contact: 'nathan@salesforce.com'
        }, {
          id: '17991de5',
          opportunityName: 'Acme - 1,621 Widgets',
          accountName: 'Acme',
          closeDate: '5/16/17',
          stage: 'Value Proposition',
          confidence: '70%',
          amount: '$23,600,000',
          contact: 'jrogers@acme.com'
        }, {
          id: '09b2cee9',
          opportunityName: 'Acme - 430 Widgets',
          accountName: 'Acme',
          closeDate: '6/12/18',
          stage: 'Prospecting',
          confidence: '42%',
          amount: '$4,222,222',
          contact: 'bob@acme.com'
        }, {
          id: 'd0035700',
          opportunityName: 'salesforce.com - 677 Widgets',
          accountName: 'salesforce.com',
          closeDate: '7/21/17 10:11AM',
          stage: 'Id. Decision Makers',
          confidence: '42%',
          amount: '$24,200',
          contact: 'nathan@salesforce.com'
        }, {
          id: '4a526f0c',
          opportunityName: 'Acme - 1,444 Widgets',
          accountName: 'Acme',
          closeDate: '3/18/18',
          stage: 'Value Proposition',
          confidence: '66%',
          amount: '$22,000,000',
          contact: 'jrogers@acme.com'
        }, {
          id: '9a5dbdb2',
          opportunityName: 'Acme - 320 Widgets',
          accountName: 'Acme',
          closeDate: '1/31/18',
          stage: 'Prospecting',
          confidence: '36%',
          amount: '$4,322,000',
          contact: 'bob@acme.com'
        }, {
          id: '356dbb52',
          opportunityName: 'salesforce.com - 4,000 Widgets',
          accountName: 'salesforce.com',
          closeDate: '2/21/17 8:33PM',
          stage: 'Id. Decision Makers',
          confidence: '72%',
          amount: '$15,000',
          contact: 'nathan@salesforce.com'
        }],
        selection: []
      }
    }), Object.defineProperty(_assertThisInitialized(_this), "handleChanged", {
      configurable: true,
      enumerable: true,
      writable: true,
      value: function value(event, data) {
        _this.setState({
          selection: data.selection
        });

        console.log(event, data);
      }
    }), Object.defineProperty(_assertThisInitialized(_this), "handleRowAction", {
      configurable: true,
      enumerable: true,
      writable: true,
      value: function value(item, action) {
        console.log(item, action);
      }
    }), Object.defineProperty(_assertThisInitialized(_this), "handleSort", {
      configurable: true,
      enumerable: true,
      writable: true,
      value: function value(sortColumn) {
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
      }
    }), _temp));
  }

  _createClass(Example, [{
    key: "render",
    value: function render() {
      return _react2.default.createElement("div", {
        style: {
          height: '200px',
          width: '100%'
        }
      }, _react2.default.createElement(_iconSettings2.default, {
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
        fixedHeader: true,
        fixedLayout: true,
        items: this.state.items,
        id: "DataTableExample-FixedHeaders",
        onRowChange: this.handleChanged,
        onSort: this.handleSort,
        selection: this.state.selection,
        selectRows: "checkbox"
      }, _react2.default.createElement(_column2.default, {
        isSorted: this.state.sortColumn === 'opportunityName',
        label: "Name",
        primaryColumn: true,
        property: "opportunityName",
        sortable: true,
        sortDirection: this.state.sortColumnDirection.opportunityName
      }, _react2.default.createElement(CustomDataTableCell, null)), _react2.default.createElement(_column2.default, {
        label: "Account Name",
        property: "accountName"
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
        menuPosition: "overflowBoundaryElement",
        onAction: this.handleRowAction,
        dropdown: _react2.default.createElement(_menuDropdown2.default, {
          length: "7"
        })
      }))));
    }
  }]);

  return Example;
}(_react2.default.Component);

Object.defineProperty(Example, "displayName", {
  configurable: true,
  enumerable: true,
  writable: true,
  value: 'DataTableExample'
});
exports.default = Example; // export is replaced with `ReactDOM.render(<Example />, mountNode);` at runtime