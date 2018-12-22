"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _icon = require("../../../../components/icon");

var _icon2 = _interopRequireDefault(_icon);

var _iconSettings = require("../../../../components/icon-settings");

var _iconSettings2 = _interopRequireDefault(_iconSettings);

var _pillContainer = require("../../../../components/pill-container");

var _pillContainer2 = _interopRequireDefault(_pillContainer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

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

  function Example(props) {
    var _this;

    _classCallCheck(this, Example);

    _this = _possibleConstructorReturn(this, (Example.__proto__ || Object.getPrototypeOf(Example)).call(this, props));
    Object.defineProperty(_assertThisInitialized(_this), "onClickPill", {
      configurable: true,
      enumerable: true,
      writable: true,
      value: function value(event, data) {
        if (window && window.console && window.console.log) {
          console.log('onClickPill: ', event, data);
        }
      }
    });
    Object.defineProperty(_assertThisInitialized(_this), "onRequestRemovePill", {
      configurable: true,
      enumerable: true,
      writable: true,
      value: function value(event, data) {
        var options = _this.state.options.filter(function (option) {
          return option.id !== data.option.id;
        });

        _this.setState({
          options: options
        });

        if (window && window.console && window.console.log) {
          console.log('onRequestRemovePill: ', event, data);
        }
      }
    });
    _this.state = {
      options: [{
        icon: _react2.default.createElement(_icon2.default, {
          category: "standard",
          name: "account",
          title: "Account"
        }),
        id: '1',
        label: 'Pill Label 1',
        title: 'Full pill label verbiage mirrored here'
      }, {
        icon: _react2.default.createElement(_icon2.default, {
          category: "standard",
          name: "case",
          title: "Case"
        }),
        id: '2',
        label: 'Pill Label 2',
        title: 'Full pill label verbiage mirrored here'
      }, {
        icon: _react2.default.createElement(_icon2.default, {
          category: "utility",
          name: "retweet",
          title: "Retweet"
        }),
        id: '3',
        label: 'Pill Label 3',
        title: 'Full pill label verbiage mirrored here'
      }, {
        icon: _react2.default.createElement(_icon2.default, {
          category: "standard",
          name: "solution",
          title: "Solution"
        }),
        id: '4',
        label: 'Pill Label 4',
        title: 'Full pill label verbiage mirrored here'
      }, {
        icon: _react2.default.createElement(_icon2.default, {
          category: "standard",
          name: "custom_notification",
          title: "Custom Notification"
        }),
        id: '5',
        label: 'Pill Label 5',
        title: 'Full pill label verbiage mirrored here'
      }, {
        icon: _react2.default.createElement(_icon2.default, {
          category: "standard",
          name: "email",
          title: "Email"
        }),
        id: '6',
        label: 'Pill Label 6',
        title: 'Full pill label verbiage mirrored here'
      }, {
        icon: _react2.default.createElement(_icon2.default, {
          category: "standard",
          name: "endorsement",
          title: "Endorsement"
        }),
        id: '7',
        label: 'Pill Label 7',
        title: 'Full pill label verbiage mirrored here'
      }, {
        icon: _react2.default.createElement(_icon2.default, {
          category: "standard",
          name: "recent",
          title: "Recent"
        }),
        id: '8',
        label: 'Pill Label 8',
        title: 'Full pill label verbiage mirrored here'
      }, {
        icon: _react2.default.createElement(_icon2.default, {
          category: "custom",
          name: "custom31",
          title: "Custom 31"
        }),
        id: '9',
        label: 'Pill Label 9',
        title: 'Full pill label verbiage mirrored here'
      }]
    };
    return _this;
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
      }, _react2.default.createElement(_pillContainer2.default, {
        id: "pill-container-with-icons",
        options: this.state.options,
        onClickPill: this.onClickPill,
        onRequestRemovePill: this.onRequestRemovePill
      }))));
    }
  }]);

  return Example;
}(_react2.default.Component);

Object.defineProperty(Example, "displayName", {
  configurable: true,
  enumerable: true,
  writable: true,
  value: 'PillContainerWithIconsExample'
});
exports.default = Example; // export is replaced with `ReactDOM.render(<Example />, mountNode);` at runtime