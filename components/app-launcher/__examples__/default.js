"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _appLauncher = _interopRequireDefault(require("../../../../components/app-launcher"));

var _link = _interopRequireDefault(require("../../../../components/app-launcher/link"));

var _tile = _interopRequireDefault(require("../../../../components/app-launcher/tile"));

var _expandableSection = _interopRequireDefault(require("../../../../components/app-launcher/expandable-section"));

var _globalNavigationBar = _interopRequireDefault(require("../../../../components/global-navigation-bar"));

var _region = _interopRequireDefault(require("../../../../components/global-navigation-bar/region"));

var _button = _interopRequireDefault(require("../../../../components/button"));

var _search = _interopRequireDefault(require("../../../../components/input/search"));

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
      search: ''
    });

    _defineProperty(_assertThisInitialized(_this), "onSearch", function (event) {
      _this.setState({
        search: event.target.value
      });
    });

    return _this;
  }

  _createClass(Example, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      var search = _react.default.createElement(_search.default, {
        onChange: function onChange(event) {
          console.log('Search term:', event.target.value);

          _this2.onSearch(event);
        },
        placeholder: "Find an app",
        assistiveText: {
          label: 'Find an app'
        }
      });

      var headerButton = _react.default.createElement(_button.default, {
        label: "App Exchange"
      });

      return _react.default.createElement(_iconSettings.default, {
        iconPath: "/assets/icons"
      }, _react.default.createElement(_globalNavigationBar.default, null, _react.default.createElement(_region.default, {
        region: "primary"
      }, _react.default.createElement(_appLauncher.default, {
        triggerName: "App Name",
        search: search,
        modalHeaderButton: headerButton
      }, _react.default.createElement(_expandableSection.default, {
        title: "Tile Section"
      }, _react.default.createElement(_tile.default, {
        description: "The primary internal Salesforce org. Used to run our online sales business and manage accounts.",
        iconText: "SC",
        search: this.state.search,
        title: "Sales Cloud"
      }), _react.default.createElement(_tile.default, {
        description: "Salesforce Marketing Cloud lets businesses of any size engage with their customers through multiple channels of messaging.",
        iconBackgroundColor: "#e0cf76",
        iconText: "MC",
        search: this.state.search,
        title: "Marketing Cloud"
      }), _react.default.createElement(_tile.default, {
        description: "Community for managing employee benefits and time off.",
        iconBackgroundColor: "#6a8adc",
        iconText: "HR",
        search: this.state.search,
        title: "HR Concierge"
      }), _react.default.createElement(_tile.default, {
        description: "Manage your finances across multiple financial platforms and make the most of your capital.",
        iconBackgroundColor: "#73c07b",
        iconText: "MM",
        search: this.state.search,
        title: "My Money"
      }), _react.default.createElement(_tile.default, {
        description: "The key to call center and contact center management is more simple than you think with this amazing application!",
        iconBackgroundColor: "#b67e6a",
        iconText: "CC",
        search: this.state.search,
        title: "Call Center"
      }), _react.default.createElement(_tile.default, {
        description: "Areas of Focus are used to track customer support for your brand and ensure high quality support",
        iconBackgroundColor: "#69bad0",
        iconText: "CS",
        search: this.state.search,
        title: "Customer Support Community"
      })), _react.default.createElement("hr", null), _react.default.createElement(_expandableSection.default, {
        title: "All Items"
      }, _react.default.createElement(_link.default, {
        search: this.state.search
      }, "Accounts"), _react.default.createElement(_link.default, {
        search: this.state.search
      }, "Announcements"), _react.default.createElement(_link.default, {
        search: this.state.search
      }, "Approvals"), _react.default.createElement(_link.default, {
        search: this.state.search
      }, "Campaigns"), _react.default.createElement(_link.default, {
        search: this.state.search
      }, "Cases"), _react.default.createElement(_link.default, {
        search: this.state.search
      }, "Coaching"), _react.default.createElement(_link.default, {
        search: this.state.search
      }, "Contacts"))))));
    }
  }]);

  return Example;
}(_react.default.Component);

_defineProperty(Example, "displayName", 'AppLauncherExample');

var _default = Example; // export is replaced with `ReactDOM.render(<Example />, mountNode);` at runtime

exports.default = _default;