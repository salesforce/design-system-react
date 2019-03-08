"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

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

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

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
    id: 1,
    label: 'All Products',
    value: 'all-products'
  }, {
    id: 2,
    label: 'All Wackamoles',
    value: 'all-Wackamoles'
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
        'show-me': {
          selectedItem: options['show-me'][0],
          isActive: true,
          comboboxSelection: [options['show-me'][0]]
        }
      }
    }), Object.defineProperty(_assertThisInitialized(_this), "onChangePredicate", {
      configurable: true,
      enumerable: true,
      writable: true,
      value: function value(event, _ref2) {
        var id = _ref2.id;
        var idSuffix = id.split('sample-panel-filtering-')[1];

        _this.setState(_defineProperty({}, idSuffix, _objectSpread({}, _this.state[idSuffix], {
          selectedItem: _this.state[idSuffix].comboboxSelection[0]
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

      return this.state['show-me'].isActive && _react2.default.createElement(_iconSettings2.default, {
        iconPath: "/assets/icons"
      }, _react2.default.createElement(_filter2.default, _extends({
        align: this.props.align,
        id: "sample-panel-filtering-show-me",
        onChange: this.onChangePredicate,
        onRemove: this.onRemove,
        property: "Show Me",
        predicate: this.state['show-me'].selectedItem.label
      }, this.props), _react2.default.createElement(_combobox2.default, {
        events: {
          onSelect: function onSelect(event, data) {
            _this2.setState({
              'show-me': _objectSpread({}, _this2.state['show-me'], {
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
  }], [{
    key: "propTypes",
    value: function propTypes() {
      return {
        align: _propTypes2.default.string
      };
    }
  }]);

  return Example;
}(_react2.default.Component);

Object.defineProperty(Example, "displayName", {
  configurable: true,
  enumerable: true,
  writable: true,
  value: 'FilterExample'
});
exports.default = Example; // export is replaced with `ReactDOM.render(<Example />, mountNode);` at runtime