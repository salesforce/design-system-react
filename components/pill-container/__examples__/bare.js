"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

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
        id: '1',
        label: 'Pill Label 1',
        title: 'Full pill label verbiage mirrored here'
      }, {
        id: '2',
        label: 'Pill Label 2',
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
        id: "bare-pill-container",
        options: this.state.options,
        onClickPill: this.onClickPill,
        onRequestRemovePill: this.onRequestRemovePill,
        variant: "bare"
      }))));
    }
  }]);

  return Example;
}(_react2.default.Component);

Object.defineProperty(Example, "displayName", {
  configurable: true,
  enumerable: true,
  writable: true,
  value: 'BarePillContainerExample'
});
exports.default = Example; // export is replaced with `ReactDOM.render(<Example />, mountNode);` at runtime