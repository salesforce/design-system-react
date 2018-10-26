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

var _icon = require("../../../../components/icon");

var _icon2 = _interopRequireDefault(_icon);

var _avatar = require("../../../../components/avatar");

var _avatar2 = _interopRequireDefault(_avatar);

var _iconSettings = require("../../../../components/icon-settings");

var _iconSettings2 = _interopRequireDefault(_iconSettings);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

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

    return _possibleConstructorReturn(_this, (_temp = _this = _possibleConstructorReturn(this, (_ref = Example.__proto__ || Object.getPrototypeOf(Example)).call.apply(_ref, [this].concat(args))), Object.defineProperty(_assertThisInitialized(_this), "state", {
      configurable: true,
      enumerable: true,
      writable: true,
      value: {
        pill1: true,
        pill2: true,
        pill3: true
      }
    }), Object.defineProperty(_assertThisInitialized(_this), "onClick", {
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
      value: function value(event, pill) {
        _this.props.action('onRemove')(event);

        _this.setState(_defineProperty({}, pill, false));
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
        className: "slds-grid slds-grid_pull-padded-medium"
      }, _react2.default.createElement("div", {
        className: "slds-p-horizontal_medium"
      }, this.state.pill1 ? _react2.default.createElement(_pill2.default, {
        labels: {
          label: 'Pill Label',
          title: 'Full pill label verbiage mirrored here',
          removeTitle: 'Remove'
        },
        icon: _react2.default.createElement(_icon2.default, {
          title: "Account",
          category: "standard",
          name: "account"
        }),
        onClick: this.onClick,
        onRemove: function onRemove(event) {
          return _this2.onRemove(event, 'pill1');
        }
      }) : null), _react2.default.createElement("div", {
        className: "slds-p-horizontal_medium"
      }, this.state.pill2 ? _react2.default.createElement(_pill2.default, {
        labels: {
          label: 'Pill Label',
          title: 'Full pill label verbiage mirrored here',
          removeTitle: 'Remove'
        },
        avatar: _react2.default.createElement(_avatar2.default, {
          variant: "user",
          title: "User avatar",
          imgSrc: "https://lightningdesignsystem.com/assets/images/avatar2.jpg"
        }),
        onClick: this.onClick,
        onRemove: function onRemove(event) {
          return _this2.onRemove(event, 'pill2');
        }
      }) : null), _react2.default.createElement("div", {
        className: "slds-p-horizontal_medium"
      }, this.state.pill3 ? _react2.default.createElement(_pill2.default, {
        labels: {
          label: 'Pill Label',
          title: 'Full pill label verbiage mirrored here',
          removeTitle: 'Remove'
        },
        hasError: true,
        icon: _react2.default.createElement(_icon2.default, {
          title: "Error",
          category: "utility",
          name: "warning",
          className: "slds-icon-text-error"
        }),
        onClick: this.onClick,
        onRemove: function onRemove(event) {
          return _this2.onRemove(event, 'pill3');
        }
      }) : null)));
    }
  }]);

  return Example;
}(_react2.default.Component);

Object.defineProperty(Example, "displayName", {
  configurable: true,
  enumerable: true,
  writable: true,
  value: 'PillWithIconExample'
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