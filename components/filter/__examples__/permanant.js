"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _iconSettings = _interopRequireDefault(require("../../../../components/icon-settings"));

var _filter = _interopRequireDefault(require("../../../../components/filter"));

var _combobox = _interopRequireDefault(require("../../../../components/combobox"));

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
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, Example);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(Example)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "state", {
      'show-me': {
        comboboxSelection: [options['show-me'][0]],
        selectedItem: options['show-me'][0],
        isActive: true
      }
    });

    _defineProperty(_assertThisInitialized(_this), "onChangePredicate", function (event, _ref) {
      var id = _ref.id;
      var idSuffix = id.split('sample-panel-filtering-')[1];

      _this.setState(_defineProperty({}, idSuffix, _objectSpread({}, _this.state[idSuffix], {
        selectedItem: _this.state[idSuffix].comboboxSelection
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

      return this.state['show-me'].isActive && _react.default.createElement(_iconSettings.default, {
        iconPath: "/assets/icons"
      }, _react.default.createElement(_filter.default, {
        align: this.props.align,
        id: "sample-panel-filtering-show-me",
        isPermanent: true,
        onChange: this.onChangePredicate,
        onRemove: this.onRemove,
        property: "Show Me",
        predicate: this.state['show-me'].selectedItem.label
      }, _react.default.createElement(_combobox.default, {
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
        align: _propTypes.default.string
      };
    }
  }]);

  return Example;
}(_react.default.Component);

_defineProperty(Example, "displayName", 'FilterExample');

var _default = Example; // export is replaced with `ReactDOM.render(<Example />, mountNode);` at runtime

exports.default = _default;