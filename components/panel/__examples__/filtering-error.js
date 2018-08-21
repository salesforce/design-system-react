"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _createReactClass = require("create-react-class");

var _createReactClass2 = _interopRequireDefault(_createReactClass);

var _iconSettings = require("../../../../components/icon-settings");

var _iconSettings2 = _interopRequireDefault(_iconSettings);

var _panel = require("../../../../components/panel");

var _panel2 = _interopRequireDefault(_panel);

var _group = require("../../../../components/panel/filtering/group");

var _group2 = _interopRequireDefault(_group);

var _list = require("../../../../components/panel/filtering/list");

var _list2 = _interopRequireDefault(_list);

var _listHeading = require("../../../../components/panel/filtering/list-heading");

var _listHeading2 = _interopRequireDefault(_listHeading);

var _filter = require("../../../../components/filter");

var _filter2 = _interopRequireDefault(_filter);

var _menuPicklist = require("../../../../components/menu-picklist");

var _menuPicklist2 = _interopRequireDefault(_menuPicklist);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var options = {
  'show-me': [{
    label: 'All Products',
    value: 'all-products'
  }, {
    label: 'All Wackamoles',
    value: 'all-Wackamoles'
  }],
  'created-date': [{
    label: 'equals THIS WEEK',
    value: 'this-week'
  }, {
    label: 'equals LAST WEEK',
    value: 'last-week'
  }],
  'list-price': [{
    label: 'greater than "500"',
    value: 'greater-than-500'
  }, {
    label: 'greater than "100"',
    value: 'greater-than-100'
  }]
};
var Example = (0, _createReactClass2.default)({
  displayName: 'PanelExample',
  getInitialState: function getInitialState() {
    return {
      modifiedPanel: false,
      'show-me': {
        selectedPicklistItem: options['show-me'][0],
        selectedItem: options['show-me'][0]
      },
      'created-date': {
        selectedPicklistItem: options['created-date'][0],
        selectedItem: options['created-date'][0],
        isActive: true
      },
      'list-price': {
        selectedPicklistItem: options['list-price'][0],
        selectedItem: options['list-price'][0],
        isActive: true
      }
    };
  },
  onChangePredicate: function onChangePredicate(event, _ref) {
    var id = _ref.id;
    var idSuffix = id.split('sample-panel-filtering-')[1];
    this.setState(_defineProperty({
      modifiedPanel: this.state[idSuffix].selectedItem !== this.state[idSuffix].selectedPicklistItem
    }, idSuffix, _objectSpread({}, this.state[idSuffix], {
      selectedItem: this.state[idSuffix].selectedPicklistItem
    })));
  },
  onSelectPicklist: function onSelectPicklist(selectedItem, id) {
    this.setState(_defineProperty({}, id, _objectSpread({}, this.state[id], {
      selectedPicklistItem: selectedItem
    })));
  },
  onRemove: function onRemove(event, _ref2) {
    var id = _ref2.id;
    var idSuffix = id.split('sample-panel-filtering-')[1];
    this.setState(_defineProperty({}, idSuffix, _objectSpread({}, this.state[idSuffix], {
      isActive: false
    })));
  },
  render: function render() {
    var _this = this;

    var hasActiveFilters = this.state['created-date'].isActive || this.state['list-price'].isActive || this.state.new.isActive;
    return _react2.default.createElement(_iconSettings2.default, {
      iconPath: "/assets/icons"
    }, _react2.default.createElement(_panel2.default, {
      variant: "filters"
    }, _react2.default.createElement(_group2.default, {
      errorLabel: "Filters could not be applied. Please fix the validation errors below.",
      modified: this.state.modifiedPanel,
      onClickAdd: function onClickAdd() {
        _this.setState({
          modifiedPanel: true,
          new: {
            isActive: true,
            new: true
          }
        });
      },
      onClickRemoveAll: function onClickRemoveAll() {
        _this.onRemove(null, {
          id: 'sample-panel-filtering-created-date'
        });

        _this.onRemove(null, {
          id: 'sample-panel-filtering-list-price'
        });

        _this.onRemove(null, {
          id: 'sample-panel-filtering-new'
        });
      },
      onRequestCancel: function onRequestCancel() {
        _this.setState({
          modifiedPanel: false
        });
      },
      onRequestClose: function onRequestClose() {
        console.log('Request filtering panel to close');
      },
      onRequestSave: function onRequestSave() {
        _this.setState({
          modifiedPanel: false
        });
      },
      variant: "panel"
    }, _react2.default.createElement(_list2.default, null, _react2.default.createElement(_filter2.default, {
      id: "sample-panel-filtering-show-me",
      isPermanent: true,
      onChange: this.onChangePredicate,
      property: "Show Me",
      predicate: this.state['show-me'].selectedItem.label
    }, _react2.default.createElement(_menuPicklist2.default, {
      isInline: true,
      label: "Show Me",
      onSelect: function onSelect(selectedItem) {
        _this.onSelectPicklist(selectedItem, 'show-me');
      },
      options: options['show-me'],
      placeholder: "Select record type",
      value: this.state['show-me'].selectedPicklistItem.value
    }))), hasActiveFilters ? _react2.default.createElement(_listHeading2.default, {
      label: "Matching all these filters"
    }) : null, hasActiveFilters ? _react2.default.createElement(_list2.default, null, this.state['created-date'].isActive ? _react2.default.createElement(_filter2.default, {
      id: "sample-panel-filtering-created-date",
      onChange: this.onChangePredicate,
      onRemove: this.onRemove,
      predicate: this.state['created-date'].selectedItem.label,
      property: "Created Date"
    }, _react2.default.createElement(_menuPicklist2.default, {
      isInline: true,
      label: "Created Date EQUALS",
      onSelect: function onSelect(selectedItem) {
        _this.onSelectPicklist(selectedItem, 'created-date');
      },
      options: options['created-date'],
      placeholder: "Select a time range",
      value: this.state['created-date'].selectedPicklistItem.value
    })) : null, this.state['list-price'].isActive ? _react2.default.createElement(_filter2.default, {
      id: "sample-panel-filtering-list-price",
      onChange: this.onChangePredicate,
      onRemove: this.onRemove,
      predicate: this.state['list-price'].selectedItem.label,
      property: "List Price"
    }, _react2.default.createElement(_menuPicklist2.default, {
      isInline: true,
      label: "List Price",
      onSelect: function onSelect(selectedItem) {
        _this.onSelectPicklist(selectedItem, 'list-price');
      },
      options: options['list-price'],
      placeholder: "Select a price",
      value: this.state['list-price'].selectedPicklistItem.value
    })) : null, _react2.default.createElement(_filter2.default, {
      errorLabel: "Error Message",
      id: "sample-panel-filtering-error",
      predicate: 'equals "Red"',
      property: "Stage"
    })) : null)));
  }
});
exports.default = Example; // export is replaced with `ReactDOM.render(<Example />, mountNode);` at runtime