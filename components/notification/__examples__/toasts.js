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
        warningIsOpen: false,
        errorIsOpen: false
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
        label: "Open base toast",
        onClick: function onClick(event) {
          _this2.toggleOpen(event, 'base');
        }
      }), _react2.default.createElement(_notification2.default, {
        content: ['Base Toast'],
        isOpen: this.state.baseIsOpen,
        onDismiss: function onDismiss(event) {
          _this2.toggleOpen(event, 'base');
        },
        variant: "toast"
      }), _react2.default.createElement("span", null), _react2.default.createElement(_button2.default, {
        label: "Open success toast",
        onClick: function onClick(event) {
          _this2.toggleOpen(event, 'success');
        }
      }), _react2.default.createElement(_notification2.default, {
        content: [_react2.default.createElement("span", {
          key: "new-contact"
        }, "Your new contact ", _react2.default.createElement("a", {
          href: "javascript:void(0);"
        }, "Sara Smith"), ' ', "was successfully created.")],
        iconName: "notification",
        isOpen: this.state.successIsOpen,
        onDismiss: function onDismiss(event) {
          _this2.toggleOpen(event, 'success');
        },
        theme: "success",
        variant: "toast"
      }), _react2.default.createElement("span", null), _react2.default.createElement(_button2.default, {
        label: "Open warning toast",
        onClick: function onClick(event) {
          _this2.toggleOpen(event, 'warning');
        }
      }), _react2.default.createElement(_notification2.default, {
        content: [_react2.default.createElement("span", {
          key: "required-fields"
        }, "Oops, you\"ve missed some required form inputs.")],
        isOpen: this.state.warningIsOpen,
        onDismiss: function onDismiss(event) {
          _this2.toggleOpen(event, 'warning');
        },
        theme: "warning",
        variant: "toast"
      }), _react2.default.createElement("span", null), _react2.default.createElement(_button2.default, {
        label: "Open error toast",
        onClick: function onClick(event) {
          _this2.toggleOpen(event, 'error');
        }
      }), _react2.default.createElement(_notification2.default, {
        content: [_react2.default.createElement("span", {
          key: "required-fields"
        }, "You encountered some errors when trying to save edits to Samuel Smith.")],
        iconName: "warning",
        isOpen: this.state.errorIsOpen,
        onDismiss: function onDismiss(event) {
          _this2.toggleOpen(event, 'error');
        },
        theme: "error",
        variant: "toast"
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