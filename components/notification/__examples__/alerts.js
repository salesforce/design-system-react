"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _iconSettings = require("../../../../components/icon-settings");

var _iconSettings2 = _interopRequireDefault(_iconSettings);

var _notification = require("../../../../components/notification");

var _notification2 = _interopRequireDefault(_notification);

var _button = require("../../../../components/button");

var _button2 = _interopRequireDefault(_button);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

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
        baseIsOpen: false,
        successIsOpen: false,
        errorIsOpen: false,
        offlineIsOpen: false
      }
    }), Object.defineProperty(_assertThisInitialized(_this), "toggleOpen", {
      configurable: true,
      enumerable: true,
      writable: true,
      value: function value(event, theme) {
        _this.setState(_defineProperty({}, "".concat(theme, "IsOpen"), !_this.state["".concat(theme, "IsOpen")]));
      }
    }), _temp));
  }

  _createClass(Example, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      return _react2.default.createElement(_iconSettings2.default, {
        iconPath: "/assets/icons"
      }, _react2.default.createElement("div", null, _react2.default.createElement(_button2.default, {
        label: "Open base alert",
        onClick: function onClick(event) {
          _this2.toggleOpen(event, 'base');
        }
      }), _react2.default.createElement(_notification2.default, {
        content: ['Base System Alert'],
        isOpen: this.state.baseIsOpen,
        onDismiss: function onDismiss(event) {
          _this2.toggleOpen(event, 'base');
        },
        texture: true,
        variant: "alert"
      }), _react2.default.createElement("span", null), _react2.default.createElement(_button2.default, {
        label: "Open success alert",
        onClick: function onClick(event) {
          _this2.toggleOpen(event, 'success');
        }
      }), _react2.default.createElement(_notification2.default, {
        content: [_react2.default.createElement("span", {
          key: "maintenance"
        }, "Scheduled Maintenance Notification: Sunday March 15, 8:00 AM\u201310:00 PST ", _react2.default.createElement("a", {
          href: "javascript:void(0);"
        }, "More Information"))],
        iconName: "notification",
        isOpen: this.state.successIsOpen,
        onDismiss: function onDismiss(event) {
          _this2.toggleOpen(event, 'success');
        },
        texture: true,
        theme: "success",
        variant: "alert"
      }), _react2.default.createElement("span", null), _react2.default.createElement(_button2.default, {
        label: "Open error alert",
        onClick: function onClick(event) {
          _this2.toggleOpen(event, 'error');
        }
      }), _react2.default.createElement(_notification2.default, {
        content: [_react2.default.createElement("span", {
          key: "browser"
        }, "Your browser is currently not supported. Your Salesforce may be degraded. ", _react2.default.createElement("a", {
          href: "javascript:void(0);"
        }, "More Information"))],
        iconName: "ban",
        isOpen: this.state.errorIsOpen,
        onDismiss: function onDismiss(event) {
          _this2.toggleOpen(event, 'error');
        },
        texture: true,
        theme: "error",
        variant: "alert"
      }), _react2.default.createElement("span", null), _react2.default.createElement(_button2.default, {
        label: "Open offline alert",
        onClick: function onClick(event) {
          _this2.toggleOpen(event, 'offline');
        }
      }), _react2.default.createElement(_notification2.default, {
        content: [_react2.default.createElement("span", {
          key: "offline"
        }, "You are in offline mode", ' ', _react2.default.createElement("a", {
          href: "javascript:void(0);"
        }, "More Information"))],
        iconName: "offline",
        isOpen: this.state.offlineIsOpen,
        onDismiss: function onDismiss(event) {
          _this2.toggleOpen(event, 'offline');
        },
        texture: true,
        theme: "offline",
        variant: "alert"
      })));
    }
  }]);

  return Example;
}(_react2.default.Component);

Object.defineProperty(Example, "displayName", {
  configurable: true,
  enumerable: true,
  writable: true,
  value: 'NotificationExample'
});
exports.default = Example; // export is replaced with `ReactDOM.render(<Example />, mountNode);` at runtime