"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _trialBar = _interopRequireDefault(require("../../../../components/trial-bar"));

var _dropdown = _interopRequireDefault(require("../../../../components/trial-bar/dropdown"));

var _button = _interopRequireDefault(require("../../../../components/trial-bar/button"));

var _iconSettings = _interopRequireDefault(require("../../../../components/icon-settings"));

var _button2 = _interopRequireDefault(require("../../../../components/button"));

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
      }, _react.default.createElement("div", null, _react.default.createElement(_trialBar.default, {
        labels: {
          timeLeft: '30',
          timeLeftUnit: 'days'
        },
        onRenderActions: function onRenderActions() {
          return _react.default.createElement(_button2.default, {
            variant: "success",
            label: "Subscribe Now"
          });
        }
      }, _react.default.createElement(_button.default, {
        label: "Take the salesforce tour"
      }), _react.default.createElement(_dropdown.default, {
        assistiveText: {
          icon: 'Dropdown'
        },
        id: "dropdown",
        label: "Choose your tour",
        options: [{
          label: 'Conquer Your Cases',
          value: 'item1'
        }, {
          label: 'Automate For Speed',
          value: 'item2'
        }, {
          label: 'Share Your Knowledge',
          value: 'item3'
        }, {
          label: 'Finish it up in a Flash',
          value: 'item4'
        }, {
          type: 'divider'
        }, {
          label: 'Import Contacts and Accounts',
          value: 'item5',
          leftIcon: {
            name: 'upload',
            category: 'utility'
          }
        }],
        value: ['item1']
      }))));
    }
  }]);

  return Example;
}(_react.default.Component);

Example.displayName = 'TrialBarDefault';
var _default = Example; // export is replaced with `ReactDOM.render(<Example />, mountNode);` at runtime

exports.default = _default;