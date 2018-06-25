"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _createReactClass = require("create-react-class");

var _createReactClass2 = _interopRequireDefault(_createReactClass);

var _iconSettings = require("../../../../components/icon-settings");

var _iconSettings2 = _interopRequireDefault(_iconSettings);

var _notification = require("../../../../components/notification");

var _notification2 = _interopRequireDefault(_notification);

var _button = require("../../../../components/button");

var _button2 = _interopRequireDefault(_button);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Example = (0, _createReactClass2.default)({
  displayName: 'NotificationExample',
  getInitialState: function getInitialState() {
    return {
      baseIsOpen: false,
      successIsOpen: false,
      warningIsOpen: false,
      errorIsOpen: false
    };
  },
  toggleOpen: function toggleOpen(event, theme) {
    this.setState(_defineProperty({}, "".concat(theme, "IsOpen"), !this.state["".concat(theme, "IsOpen")]));
  },
  render: function render() {
    var _this = this;

    return _react2.default.createElement(_iconSettings2.default, {
      iconPath: "/assets/icons"
    }, _react2.default.createElement("div", null, _react2.default.createElement(_button2.default, {
      label: "Open base toast",
      onClick: function onClick(event) {
        _this.toggleOpen(event, 'base');
      }
    }), _react2.default.createElement(_notification2.default, {
      content: ['Base Toast'],
      isOpen: this.state.baseIsOpen,
      onDismiss: function onDismiss(event) {
        _this.toggleOpen(event, 'base');
      },
      variant: "toast"
    }), _react2.default.createElement("span", null), _react2.default.createElement(_button2.default, {
      label: "Open success toast",
      onClick: function onClick(event) {
        _this.toggleOpen(event, 'success');
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
        _this.toggleOpen(event, 'success');
      },
      theme: "success",
      variant: "toast"
    }), _react2.default.createElement("span", null), _react2.default.createElement(_button2.default, {
      label: "Open warning toast",
      onClick: function onClick(event) {
        _this.toggleOpen(event, 'warning');
      }
    }), _react2.default.createElement(_notification2.default, {
      content: [_react2.default.createElement("span", {
        key: "required-fields"
      }, "Oops, you\"ve missed some required form inputs.")],
      isOpen: this.state.warningIsOpen,
      onDismiss: function onDismiss(event) {
        _this.toggleOpen(event, 'warning');
      },
      theme: "warning",
      variant: "toast"
    }), _react2.default.createElement("span", null), _react2.default.createElement(_button2.default, {
      label: "Open error toast",
      onClick: function onClick(event) {
        _this.toggleOpen(event, 'error');
      }
    }), _react2.default.createElement(_notification2.default, {
      content: [_react2.default.createElement("span", {
        key: "required-fields"
      }, "You encountered some errors when trying to save edits to Samuel Smith.")],
      iconName: "warning",
      isOpen: this.state.errorIsOpen,
      onDismiss: function onDismiss(event) {
        _this.toggleOpen(event, 'error');
      },
      theme: "error",
      variant: "toast"
    })));
  }
});
exports.default = Example; // export is replaced with `ReactDOM.render(<Example />, mountNode);` at runtime