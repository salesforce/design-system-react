"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _dataTable = _interopRequireDefault(require("../../../../components/data-table"));

var _column = _interopRequireDefault(require("../../../../components/data-table/column"));

var _cell = _interopRequireDefault(require("../../../../components/data-table/cell"));

var _iconSettings = _interopRequireDefault(require("../../../../components/icon-settings"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var CustomDataTableCell = function CustomDataTableCell(_ref) {
  var children = _ref.children,
      props = _objectWithoutProperties(_ref, ["children"]);

  return _react.default.createElement(_cell.default, props, _react.default.createElement("a", {
    href: "javascript:void(0);",
    onClick: function onClick(event) {
      event.preventDefault();
    }
  }, children));
};

CustomDataTableCell.displayName = _cell.default.displayName;
var columns = [_react.default.createElement(_column.default, {
  key: "opportunity",
  label: "Opportunity Name",
  property: "opportunityName"
}, _react.default.createElement(CustomDataTableCell, null)), _react.default.createElement(_column.default, {
  key: "account-name",
  label: "Account Name",
  property: "accountName"
}), _react.default.createElement(_column.default, {
  key: "close-date",
  label: "Close Date",
  property: "closeDate"
}), _react.default.createElement(_column.default, {
  key: "stage",
  label: "Stage",
  property: "stage"
}), _react.default.createElement(_column.default, {
  key: "confidence",
  label: "Confidence",
  property: "confidence"
}), _react.default.createElement(_column.default, {
  key: "amount",
  label: "Amount",
  property: "amount"
}), _react.default.createElement(_column.default, {
  key: "contact",
  label: "Contact",
  property: "contact"
}, _react.default.createElement(CustomDataTableCell, null))];

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
      items: [{
        id: '8IKZHZZV80',
        opportunityName: 'Cloudhub',
        accountName: 'Cloudhub',
        closeDate: '4/14/2015',
        stage: 'Prospecting',
        confidence: '20%',
        amount: '$25k',
        contact: 'jrogers@cloudhub.com'
      }, {
        id: '5GJOOOPWU7',
        opportunityName: 'Cloudhub + Anypoint Connectors',
        accountName: 'Cloudhub',
        closeDate: '4/14/2015',
        stage: 'Prospecting',
        confidence: '20%',
        amount: '$25k',
        contact: 'jrogers@cloudhub.com'
      }, {
        id: '8IKZHZZV81',
        opportunityName: 'Cloudhub',
        accountName: 'Cloudhub',
        closeDate: '4/14/2015',
        stage: 'Prospecting',
        confidence: '20%',
        amount: '$25k',
        contact: 'jrogers@cloudhub.com'
      }]
    });

    return _this;
  }

  _createClass(Example, [{
    key: "render",
    value: function render() {
      return _react.default.createElement(_iconSettings.default, {
        iconPath: "/assets/icons"
      }, _react.default.createElement("div", {
        style: {
          overflow: 'auto'
        }
      }, _react.default.createElement("h3", {
        className: "slds-text-heading_medium slds-m-vertical_medium"
      }, "Basic Fluid Layout - Column Bordered"), _react.default.createElement(_dataTable.default, {
        columnBordered: true,
        items: this.state.items,
        id: "DataTableExample-columnBordered"
      }, columns)));
    }
  }]);

  return Example;
}(_react.default.Component);

_defineProperty(Example, "displayName", 'DataTableExample');

var _default = Example; // export is replaced with `ReactDOM.render(<Example />, mountNode);` at runtime

exports.default = _default;