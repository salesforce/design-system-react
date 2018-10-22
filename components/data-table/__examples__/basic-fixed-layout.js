"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _createReactClass = require("create-react-class");

var _createReactClass2 = _interopRequireDefault(_createReactClass);

var _dataTable = require("../../../../components/data-table");

var _dataTable2 = _interopRequireDefault(_dataTable);

var _column = require("../../../../components/data-table/column");

var _column2 = _interopRequireDefault(_column);

var _cell = require("../../../../components/data-table/cell");

var _cell2 = _interopRequireDefault(_cell);

var _iconSettings = require("../../../../components/icon-settings");

var _iconSettings2 = _interopRequireDefault(_iconSettings);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// `~` is replaced with design-system-react at runtime
var columns = [_react2.default.createElement(_column2.default, {
  key: "opportunity",
  label: "Opportunity Name",
  property: "opportunityName",
  width: "6em"
}), _react2.default.createElement(_column2.default, {
  key: "account-name",
  label: "Account Name",
  property: "accountName",
  width: "5em"
}), _react2.default.createElement(_column2.default, {
  key: "close-date",
  label: "Close Date",
  property: "closeDate",
  width: "5em"
}), _react2.default.createElement(_column2.default, {
  key: "stage",
  label: "Stage",
  property: "stage",
  width: "5em"
}), _react2.default.createElement(_column2.default, {
  key: "confidence",
  label: "Confidence",
  property: "confidence",
  width: "5em"
}), _react2.default.createElement(_column2.default, {
  key: "amount",
  label: "Amount",
  property: "amount",
  width: "5em"
}), _react2.default.createElement(_column2.default, {
  key: "contact",
  label: "Contact",
  property: "contact",
  width: "6em"
})];
var Example = (0, _createReactClass2.default)({
  displayName: 'DataTableExample',
  getInitialState: function getInitialState() {
    return {
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
    };
  },
  render: function render() {
    return _react2.default.createElement(_iconSettings2.default, {
      iconPath: "/assets/icons"
    }, _react2.default.createElement("div", {
      style: {
        overflow: 'auto'
      }
    }, _react2.default.createElement("h3", {
      className: "slds-text-heading--medium slds-m-vertical--medium"
    }, "Basic Fixed Layout"), _react2.default.createElement(_dataTable2.default, {
      items: this.state.items,
      id: "DataTableExample-1-default",
      fixedLayout: true
    }, columns)));
  }
});
exports.default = Example; // export is replaced with `ReactDOM.render(<Example />, mountNode);` at runtime