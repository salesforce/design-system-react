"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

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

var _iconSettings = require("../../../../components/icon-settings");

var _iconSettings2 = _interopRequireDefault(_iconSettings);

var _menuPicklist = require("../../../../components/menu-picklist");

var _menuPicklist2 = _interopRequireDefault(_menuPicklist);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

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
  }],
  new: [{
    label: 'less than "1000"',
    value: 'less-than-1000'
  }, {
    label: 'less than "800"',
    value: 'less-than-800'
  }]
};

var Example =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Example, _React$Component);

  function Example() {
    var _ref;

    var _temp, _this;

    _classCallCheck(this, Example);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _possibleConstructorReturn(_this, (_temp = _this = _possibleConstructorReturn(this, (_ref = Example.__proto__ || Object.getPrototypeOf(Example)).call.apply(_ref, [this].concat(args))), Object.defineProperty(_assertThisInitialized(_this), "state", {
      configurable: true,
      enumerable: true,
      writable: true,
      value: {
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
        },
        new: {}
      }
    }), Object.defineProperty(_assertThisInitialized(_this), "onChangePredicate", {
      configurable: true,
      enumerable: true,
      writable: true,
      value: function value(event, _ref2) {
        var id = _ref2.id;
        var idSuffix = id.split('sample-panel-filtering-')[1];

        _this.setState(_defineProperty({
          modifiedPanel: _this.state[idSuffix].selectedItem !== _this.state[idSuffix].selectedPicklistItem
        }, idSuffix, _objectSpread({}, _this.state[idSuffix], {
          selectedItem: _this.state[idSuffix].selectedPicklistItem
        })));
      }
    }), Object.defineProperty(_assertThisInitialized(_this), "onSelectPicklist", {
      configurable: true,
      enumerable: true,
      writable: true,
      value: function value(selectedItem, id) {
        _this.setState(_defineProperty({}, id, _objectSpread({}, _this.state[id], {
          selectedPicklistItem: selectedItem
        })));
      }
    }), Object.defineProperty(_assertThisInitialized(_this), "onRemove", {
      configurable: true,
      enumerable: true,
      writable: true,
      value: function value(event, _ref3) {
        var id = _ref3.id;
        var idSuffix = id.split('sample-panel-filtering-')[1];

        _this.setState(_defineProperty({}, idSuffix, _objectSpread({}, _this.state[idSuffix], {
          isActive: false
        })));
      }
    }), _temp));
  }

  _createClass(Example, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      var hasActiveFilters = this.state['created-date'].isActive || this.state['list-price'].isActive || this.state.new.isActive;
      return _react2.default.createElement(_iconSettings2.default, {
        iconPath: "/assets/icons"
      }, _react2.default.createElement(_panel2.default, {
        variant: "filters"
      }, _react2.default.createElement(_group2.default, {
        assistiveText: {
          closeButton: 'Close Panel'
        },
        modified: this.state.modifiedPanel,
        onClickAdd: function onClickAdd() {
          _this2.setState({
            modifiedPanel: true,
            new: {
              isActive: true,
              new: true
            }
          });
        },
        onClickRemoveAll: function onClickRemoveAll() {
          _this2.onRemove(null, {
            id: 'sample-panel-filtering-created-date'
          });

          _this2.onRemove(null, {
            id: 'sample-panel-filtering-list-price'
          });

          _this2.onRemove(null, {
            id: 'sample-panel-filtering-new'
          });
        },
        onRequestCancel: function onRequestCancel() {
          _this2.setState({
            modifiedPanel: false
          });
        },
        onRequestClose: function onRequestClose() {
          console.log('Request filtering panel to close');
        },
        onRequestSave: function onRequestSave() {
          _this2.setState({
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
          _this2.onSelectPicklist(selectedItem, 'show-me');
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
          _this2.onSelectPicklist(selectedItem, 'created-date');
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
          _this2.onSelectPicklist(selectedItem, 'list-price');
        },
        options: options['list-price'],
        placeholder: "Select a price",
        value: this.state['list-price'].selectedPicklistItem.value
      })) : null, this.state.new.isActive ? _react2.default.createElement(_filter2.default, {
        id: "sample-panel-filtering-new",
        isNew: this.state.new.new && this.state.modifiedPanel,
        onChange: this.onChangePredicate,
        onRemove: this.onRemove,
        predicate: this.state.new.selectedItem && this.state.new.selectedItem.label,
        property: this.state.new.selectedItem && this.state.new.selectedItem.label && 'List Price'
      }, _react2.default.createElement(_menuPicklist2.default, {
        isInline: true,
        label: "List Price",
        onSelect: function onSelect(selectedItem) {
          _this2.onSelectPicklist(selectedItem, 'new');
        },
        options: options.new,
        placeholder: "Select Criteria",
        value: this.state.new.selectedPicklistItem && this.state.new.selectedPicklistItem.value
      })) : null) : null)));
    }
  }]);

  return Example;
}(_react2.default.Component);

Object.defineProperty(Example, "displayName", {
  configurable: true,
  enumerable: true,
  writable: true,
  value: 'PanelExample'
});
exports.default = Example; // export is replaced with `ReactDOM.render(<Example />, mountNode);` at runtime