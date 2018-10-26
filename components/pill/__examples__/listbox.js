"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _pill = require("../../../../components/pill");

var _pill2 = _interopRequireDefault(_pill);

var _iconSettings = require("../../../../components/icon-settings");

var _iconSettings2 = _interopRequireDefault(_iconSettings);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

var noop = function noop() {
  return undefined;
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

    return _possibleConstructorReturn(_this, (_temp = _this = _possibleConstructorReturn(this, (_ref = Example.__proto__ || Object.getPrototypeOf(Example)).call.apply(_ref, [this].concat(args))), Object.defineProperty(_assertThisInitialized(_this), "onClick", {
      configurable: true,
      enumerable: true,
      writable: true,
      value: function value(event) {
        _this.props.action('onClick')(event);
      }
    }), Object.defineProperty(_assertThisInitialized(_this), "onRemove", {
      configurable: true,
      enumerable: true,
      writable: true,
      value: function value(event) {
        _this.props.action('onRemove')(event);
      }
    }), _temp));
  }

  _createClass(Example, [{
    key: "render",
    value: function render() {
      return _react2.default.createElement(_iconSettings2.default, {
        iconPath: "/assets/icons"
      }, _react2.default.createElement("div", null, _react2.default.createElement("div", {
        className: "slds-p-vertical_medium"
      }, _react2.default.createElement("h3", {
        className: "slds-text-heading_small"
      }, "Static Examples")), _react2.default.createElement("div", {
        className: "slds-grid slds-grid_vertical-align-start"
      }, _react2.default.createElement("div", {
        className: "slds-pill_container"
      }, _react2.default.createElement("ul", {
        className: "slds-listbox slds-listbox_horizontal slds-listbox_inline",
        role: "listbox",
        "aria-label": "Selected Options:",
        "aria-orientation": "horizontal"
      }, _react2.default.createElement("li", {
        className: "slds-listbox-item",
        role: "presentation"
      }, _react2.default.createElement(_pill2.default, {
        labels: {
          label: 'Pill Label',
          title: 'Full pill label verbiage mirrored here',
          removeTitle: 'Remove'
        },
        assistiveText: {
          remove: 'Press delete or backspace to remove'
        },
        variant: "option",
        tabIndex: "0",
        onClick: this.onClick,
        onRemove: this.onRemove
      })), _react2.default.createElement("li", {
        className: "slds-listbox-item",
        role: "presentation"
      }, _react2.default.createElement(_pill2.default, {
        labels: {
          label: 'Pill Label',
          title: 'Full pill label verbiage mirrored here',
          removeTitle: 'Remove'
        },
        assistiveText: {
          remove: 'Press delete or backspace to remove'
        },
        variant: "option",
        tabIndex: "0",
        onClick: this.onClick,
        onRemove: this.onRemove
      })))))));
    }
  }]);

  return Example;
}(_react2.default.Component);

Object.defineProperty(Example, "displayName", {
  configurable: true,
  enumerable: true,
  writable: true,
  value: 'PillListboxExample'
});
Object.defineProperty(Example, "propTypes", {
  configurable: true,
  enumerable: true,
  writable: true,
  value: {
    action: _propTypes2.default.func
  }
});
Object.defineProperty(Example, "defaultProps", {
  configurable: true,
  enumerable: true,
  writable: true,
  value: {
    action: function action() {
      return noop;
    }
  }
});
exports.default = Example; // export is replaced with `ReactDOM.render(<Example />, mountNode);` at runtime