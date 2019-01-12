"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _iconSettings = require("../../../../components/icon-settings");

var _iconSettings2 = _interopRequireDefault(_iconSettings);

var _verticalNavigation = require("../../../../components/vertical-navigation");

var _verticalNavigation2 = _interopRequireDefault(_verticalNavigation);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

var sampleSearchCategories = [{
  id: 'search_results',
  label: 'Search Results',
  items: [{
    id: 'top',
    label: 'Top Results'
  }, {
    id: 'accounts',
    label: 'Accounts'
  }, {
    id: 'contacts',
    label: 'Contacts'
  }, {
    id: 'opportunities',
    label: 'Opportunities'
  }, {
    id: 'leads',
    label: 'Leads'
  }, {
    id: 'groups',
    label: 'Groups'
  }, {
    id: 'files',
    label: 'Files'
  }, {
    id: 'dashboards',
    label: 'Dashboards'
  }, {
    id: 'reports',
    label: 'Reports'
  }, {
    id: 'feeds',
    label: 'Feeds'
  }]
}, {
  id: 'external_results',
  label: 'External Results',
  items: [{
    id: 'app_one',
    label: 'App One'
  }, {
    id: 'app_two',
    label: 'App Two'
  }, {
    id: 'app_three',
    label: 'App Three'
  }]
}];

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
        selectedId: 'top'
      }
    }), _temp));
  }

  _createClass(Example, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      return _react2.default.createElement(_iconSettings2.default, {
        iconPath: "/assets/icons"
      }, _react2.default.createElement("div", {
        style: {
          width: '320px',
          backgroundColor: '#FAFAFB'
        }
      }, _react2.default.createElement(_verticalNavigation2.default, {
        id: "sample-navigation",
        variant: "shade",
        categories: sampleSearchCategories,
        selectedId: this.state.selectedId,
        onSelect: function onSelect(event, data) {
          _this2.setState({
            selectedId: data.item.id
          });

          if (_this2.props.action) {
            var dataAsArray = Object.keys(data).map(function (key) {
              return data[key];
            });

            _this2.props.action('onSelect').apply(void 0, [event, data].concat(_toConsumableArray(dataAsArray)));
          } else if (console) {
            console.log('[onSelect] (event, data)', event, data);
          }
        }
      })));
    }
  }]);

  return Example;
}(_react2.default.Component);

Object.defineProperty(Example, "displayName", {
  configurable: true,
  enumerable: true,
  writable: true,
  value: 'NavigationExample'
});
exports.default = Example; // export is replaced with `ReactDOM.render(<Example />, mountNode);` at runtime