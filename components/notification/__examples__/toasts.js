"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _iconSettings = _interopRequireDefault(require("../../../../components/icon-settings"));

var _notification = _interopRequireDefault(require("../../../../components/notification"));

var _button = _interopRequireDefault(require("../../../../components/button"));

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
      baseIsOpen: false,
      successIsOpen: false,
      warningIsOpen: false,
      errorIsOpen: false
    });

    _defineProperty(_assertThisInitialized(_this), "toggleOpen", function (event, theme) {
      _this.setState(_defineProperty({}, "".concat(theme, "IsOpen"), !_this.state["".concat(theme, "IsOpen")]));
    });

    return _this;
  }

  _createClass(Example, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      return _react.default.createElement(_iconSettings.default, {
        iconPath: "/assets/icons"
      }, _react.default.createElement("div", null, _react.default.createElement(_button.default, {
        label: "Open base toast",
        onClick: function onClick(event) {
          _this2.toggleOpen(event, 'base');
        }
      }), _react.default.createElement(_notification.default, {
        content: ['Base Toast'],
        isOpen: this.state.baseIsOpen,
        onDismiss: function onDismiss(event) {
          _this2.toggleOpen(event, 'base');
        },
        variant: "toast"
      }), _react.default.createElement("span", null), _react.default.createElement(_button.default, {
        label: "Open success toast",
        onClick: function onClick(event) {
          _this2.toggleOpen(event, 'success');
        }
      }), _react.default.createElement(_notification.default, {
        content: [_react.default.createElement("span", {
          key: "new-contact"
        }, "Your new contact ", _react.default.createElement("a", {
          href: "javascript:void(0);"
        }, "Sara Smith"), ' ', "was successfully created.")],
        iconName: "notification",
        isOpen: this.state.successIsOpen,
        onDismiss: function onDismiss(event) {
          _this2.toggleOpen(event, 'success');
        },
        theme: "success",
        variant: "toast"
      }), _react.default.createElement("span", null), _react.default.createElement(_button.default, {
        label: "Open warning toast",
        onClick: function onClick(event) {
          _this2.toggleOpen(event, 'warning');
        }
      }), _react.default.createElement(_notification.default, {
        content: [_react.default.createElement("span", {
          key: "required-fields"
        }, "Oops, you\"ve missed some required form inputs.")],
        isOpen: this.state.warningIsOpen,
        onDismiss: function onDismiss(event) {
          _this2.toggleOpen(event, 'warning');
        },
        theme: "warning",
        variant: "toast"
      }), _react.default.createElement("span", null), _react.default.createElement(_button.default, {
        label: "Open error toast",
        onClick: function onClick(event) {
          _this2.toggleOpen(event, 'error');
        }
      }), _react.default.createElement(_notification.default, {
        content: [_react.default.createElement("span", {
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
}(_react.default.Component);

_defineProperty(Example, "displayName", 'NotificationExample');

var _default = Example; // export is replaced with `ReactDOM.render(<Example />, mountNode);` at runtime

exports.default = _default;