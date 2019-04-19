"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _iconSettings = _interopRequireDefault(require("../../../../components/icon-settings"));

var _panel = _interopRequireDefault(require("../../../../components/panel"));

var _group = _interopRequireDefault(require("../../../../components/panel/filtering/group"));

var _list = _interopRequireDefault(require("../../../../components/panel/filtering/list"));

var _listHeading = _interopRequireDefault(require("../../../../components/panel/filtering/list-heading"));

var _filter = _interopRequireDefault(require("../../../../components/filter"));

var _menuPicklist = _interopRequireDefault(require("../../../../components/menu-picklist"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

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
    });

    _defineProperty(_assertThisInitialized(_this), "onChangePredicate", function (event, _ref) {
      var id = _ref.id;
      var idSuffix = id.split('sample-panel-filtering-')[1];

      _this.setState(_defineProperty({
        modifiedPanel: _this.state[idSuffix].selectedItem !== _this.state[idSuffix].selectedPicklistItem
      }, idSuffix, _objectSpread({}, _this.state[idSuffix], {
        selectedItem: _this.state[idSuffix].selectedPicklistItem
      })));
    });

    _defineProperty(_assertThisInitialized(_this), "onSelectPicklist", function (selectedItem, id) {
      _this.setState(_defineProperty({}, id, _objectSpread({}, _this.state[id], {
        selectedPicklistItem: selectedItem
      })));
    });

    _defineProperty(_assertThisInitialized(_this), "onRemove", function (event, _ref2) {
      var id = _ref2.id;
      var idSuffix = id.split('sample-panel-filtering-')[1];

      _this.setState(_defineProperty({}, idSuffix, _objectSpread({}, _this.state[idSuffix], {
        isActive: false
      })));
    });

    return _this;
  }

  _createClass(Example, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      var hasActiveFilters = this.state['created-date'].isActive || this.state['list-price'].isActive || this.state.new.isActive;
      return _react.default.createElement(_iconSettings.default, {
        iconPath: "/assets/icons"
      }, _react.default.createElement(_panel.default, {
        variant: "filters"
      }, _react.default.createElement(_group.default, {
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
      }, _react.default.createElement(_list.default, null, _react.default.createElement(_filter.default, {
        id: "sample-panel-filtering-show-me",
        isPermanent: true,
        onChange: this.onChangePredicate,
        property: "Show Me",
        predicate: this.state['show-me'].selectedItem.label
      }, _react.default.createElement(_menuPicklist.default, {
        isInline: true,
        label: "Show Me",
        onSelect: function onSelect(selectedItem) {
          _this2.onSelectPicklist(selectedItem, 'show-me');
        },
        options: options['show-me'],
        placeholder: "Select record type",
        value: this.state['show-me'].selectedPicklistItem.value
      }))), hasActiveFilters ? _react.default.createElement(_listHeading.default, {
        label: "Matching all these filters"
      }) : null, hasActiveFilters ? _react.default.createElement(_list.default, null, this.state['created-date'].isActive ? _react.default.createElement(_filter.default, {
        id: "sample-panel-filtering-created-date",
        onChange: this.onChangePredicate,
        onRemove: this.onRemove,
        predicate: this.state['created-date'].selectedItem.label,
        property: "Created Date"
      }, _react.default.createElement(_menuPicklist.default, {
        isInline: true,
        label: "Created Date EQUALS",
        onSelect: function onSelect(selectedItem) {
          _this2.onSelectPicklist(selectedItem, 'created-date');
        },
        options: options['created-date'],
        placeholder: "Select a time range",
        value: this.state['created-date'].selectedPicklistItem.value
      })) : null, this.state['list-price'].isActive ? _react.default.createElement(_filter.default, {
        id: "sample-panel-filtering-list-price",
        onChange: this.onChangePredicate,
        onRemove: this.onRemove,
        predicate: this.state['list-price'].selectedItem.label,
        property: "List Price"
      }, _react.default.createElement(_menuPicklist.default, {
        isInline: true,
        label: "List Price",
        onSelect: function onSelect(selectedItem) {
          _this2.onSelectPicklist(selectedItem, 'list-price');
        },
        options: options['list-price'],
        placeholder: "Select a price",
        value: this.state['list-price'].selectedPicklistItem.value
      })) : null) : null, _react.default.createElement(_listHeading.default, {
        isLocked: true
      }), _react.default.createElement(_list.default, null, _react.default.createElement(_filter.default, {
        id: "sample-panel-filtering-name",
        isLocked: true,
        predicate: 'equals "ACME"',
        property: "Name"
      })))));
    }
  }]);

  return Example;
}(_react.default.Component);

_defineProperty(Example, "displayName", 'PanelExample');

var _default = Example; // export is replaced with `ReactDOM.render(<Example />, mountNode);` at runtime

exports.default = _default;