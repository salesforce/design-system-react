"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _iconSettings = _interopRequireDefault(require("../../../../components/icon-settings"));

var _pill = _interopRequireDefault(require("../../../../components/pill"));

var _icon = _interopRequireDefault(require("../../../../components/icon"));

var _avatar = _interopRequireDefault(require("../../../../components/avatar"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function noop() {}

var Example =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Example, _React$Component);

  function Example() {
    _classCallCheck(this, Example);

    return _possibleConstructorReturn(this, _getPrototypeOf(Example).apply(this, arguments));
  }

  _createClass(Example, [{
    key: "render",
    value: function render() {
      return _react.default.createElement(_iconSettings.default, {
        iconPath: "/assets/icons"
      }, _react.default.createElement("div", {
        className: "slds-grid slds-grid_pull-padded slds-grid_vertical-align-center"
      }, _react.default.createElement("div", {
        className: "slds-col_padded"
      }, _react.default.createElement(_pill.default, {
        labels: {
          label: 'Pill Label',
          title: 'Full pill label verbiage mirrored here',
          removeTitle: 'Remove'
        },
        onClick: noop,
        onRemove: noop
      })), _react.default.createElement("div", {
        className: "slds-col_padded"
      }, _react.default.createElement(_pill.default, {
        labels: {
          label: 'Pill Label',
          title: 'Full pill label verbiage mirrored here',
          removeTitle: 'Remove'
        },
        onRemove: noop
      })), _react.default.createElement("div", {
        className: "slds-col_padded"
      }, _react.default.createElement(_pill.default, {
        labels: {
          label: 'Pill Label',
          title: 'Full pill label verbiage mirrored here',
          removeTitle: 'Remove'
        },
        icon: _react.default.createElement(_icon.default, {
          title: "Account",
          category: "standard",
          name: "account"
        }),
        onClick: noop,
        onRemove: noop
      })), _react.default.createElement("div", {
        className: "slds-col_padded"
      }, _react.default.createElement(_pill.default, {
        labels: {
          label: 'Pill Label',
          title: 'Full pill label verbiage mirrored here',
          removeTitle: 'Remove'
        },
        avatar: _react.default.createElement(_avatar.default, {
          variant: "user",
          title: "User avatar",
          imgSrc: "https://lightningdesignsystem.com/assets/images/avatar2.jpg"
        }),
        onClick: noop,
        onRemove: noop
      })), _react.default.createElement("div", {
        className: "slds-col_padded"
      }, _react.default.createElement(_pill.default, {
        labels: {
          label: 'Pill Label',
          title: 'Full pill label verbiage mirrored here',
          removeTitle: 'Remove'
        },
        hasError: true,
        icon: _react.default.createElement(_icon.default, {
          title: "Error",
          category: "utility",
          name: "warning",
          className: "slds-icon-text-error"
        }),
        onClick: noop,
        onRemove: noop
      })), _react.default.createElement("div", {
        className: "slds-col_padded"
      }, _react.default.createElement(_pill.default, {
        labels: {
          label: 'Pill Label',
          title: 'Full pill label verbiage mirrored here',
          removeTitle: 'Remove'
        },
        assistiveText: {
          remove: 'Press delete or backspace to remove'
        },
        bare: true,
        variant: "option",
        tabIndex: "0",
        "aria-selected": "true",
        onRemove: noop
      }))));
    }
  }]);

  return Example;
}(_react.default.Component);

_defineProperty(Example, "displayName", 'PillExample');

var _default = Example; // export is replaced with `ReactDOM.render(<Example />, mountNode);` at runtime

exports.default = _default;