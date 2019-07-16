"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _avatar = _interopRequireDefault(require("../../../../components/avatar"));

var _iconSettings = _interopRequireDefault(require("../../../../components/icon-settings"));

var _pillContainer = _interopRequireDefault(require("../../../../components/pill-container"));

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

  function Example(props) {
    var _this;

    _classCallCheck(this, Example);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Example).call(this, props));

    _defineProperty(_assertThisInitialized(_this), "onClickPill", function (event, data) {
      if (window && window.console && window.console.log) {
        console.log('onClickPill: ', event, data);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "onRequestRemovePill", function (event, data) {
      var options = _this.state.options.filter(function (option) {
        return option.id !== data.option.id;
      });

      _this.setState({
        options: options
      });

      if (window && window.console && window.console.log) {
        console.log('onRequestRemovePill: ', event, data);
      }
    });

    _this.state = {
      options: [{
        avatar: _react.default.createElement(_avatar.default, {
          imgSrc: "https://lightningdesignsystem.com/assets/images/avatar1.jpg",
          title: "User 1",
          variant: "user"
        }),
        id: '1',
        label: 'Pill Label 1',
        title: 'Full pill label verbiage mirrored here'
      }, {
        avatar: _react.default.createElement(_avatar.default, {
          imgSrc: "https://lightningdesignsystem.com/assets/images/avatar2.jpg",
          title: "User 2",
          variant: "user"
        }),
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
      return _react.default.createElement(_iconSettings.default, {
        iconPath: "/assets/icons"
      }, _react.default.createElement("div", null, _react.default.createElement("div", {
        className: "slds-p-vertical_medium"
      }, _react.default.createElement("h3", {
        className: "slds-text-heading_small"
      }, "Static Examples")), _react.default.createElement("div", {
        className: "slds-grid slds-grid_vertical-align-start"
      }, _react.default.createElement(_pillContainer.default, {
        id: "pill-container-with-avatars",
        options: this.state.options,
        onClickPill: this.onClickPill,
        onRequestRemovePill: this.onRequestRemovePill
      }))));
    }
  }]);

  return Example;
}(_react.default.Component);

_defineProperty(Example, "displayName", 'PillContainerWithAvatarsExample');

var _default = Example; // export is replaced with `ReactDOM.render(<Example />, mountNode);` at runtime

exports.default = _default;