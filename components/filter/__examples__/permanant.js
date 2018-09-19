"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _createReactClass = require("create-react-class");

var _createReactClass2 = _interopRequireDefault(_createReactClass);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

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

var _combobox = require("../../../../components/combobox");

var _combobox2 = _interopRequireDefault(_combobox);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var options = {
  'show-me': [{
    id: 1,
    label: 'All Products',
    value: 'all-products'
  }, {
    id: 2,
    label: 'All Wackamoles',
    value: 'all-Wackamoles'
  }]
};
var Example = (0, _createReactClass2.default)({
  displayName: 'FilterExample',
  propTypes: function propTypes() {
    return {
      align: _propTypes2.default.string
    };
  },
  getInitialState: function getInitialState() {
    return {
      'show-me': {
        comboboxSelection: [options['show-me'][0]],
        selectedItem: options['show-me'][0],
        isActive: true
      }
    };
  },
  onChangePredicate: function onChangePredicate(event, _ref) {
    var id = _ref.id;
    var idSuffix = id.split('sample-panel-filtering-')[1];
    this.setState(_defineProperty({}, idSuffix, _objectSpread({}, this.state[idSuffix], {
      selectedItem: this.state[idSuffix].comboboxSelection
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

    return this.state['show-me'].isActive && _react2.default.createElement(_iconSettings2.default, {
      iconPath: "/assets/icons"
    }, _react2.default.createElement(_filter2.default, {
      align: this.props.align,
      id: "sample-panel-filtering-show-me",
      isPermanent: true,
      onChange: this.onChangePredicate,
      onRemove: this.onRemove,
      property: "Show Me",
      predicate: this.state['show-me'].selectedItem.label
    }, _react2.default.createElement(_combobox2.default, {
      events: {
        onSelect: function onSelect(event, data) {
          _this.setState({
            'show-me': _objectSpread({}, _this.state['show-me'], {
              comboboxSelection: data.selection
            })
          });
        }
      },
      labels: {
        label: 'Show Me',
        placeholder: 'Select record type'
      },
      menuPosition: "relative",
      options: options['show-me'],
      selection: this.state['show-me'].comboboxSelection,
      variant: "readonly"
    })));
  }
});
exports.default = Example; // export is replaced with `ReactDOM.render(<Example />, mountNode);` at runtime