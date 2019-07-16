"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _button = _interopRequireDefault(require("../../../../components/button"));

var _welcomeMat = _interopRequireDefault(require("../../../../components/welcome-mat"));

var _tile = _interopRequireDefault(require("../../../../components/welcome-mat/tile"));

var _icon = _interopRequireDefault(require("../../../../components/icon"));

var _iconSettings = _interopRequireDefault(require("../../../../components/icon-settings"));

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
      isOpen: _this.props.isOpen || false
    });

    _defineProperty(_assertThisInitialized(_this), "toggleOpen", function () {
      _this.setState({
        isOpen: !_this.state.isOpen
      });
    });

    return _this;
  }

  _createClass(Example, [{
    key: "render",
    value: function render() {
      return _react.default.createElement(_iconSettings.default, {
        iconPath: "/assets/icons"
      }, _react.default.createElement(_button.default, {
        label: "Open Steps Complete WelcomeMat",
        onClick: this.toggleOpen
      }), _react.default.createElement("div", {
        style: {
          position: 'relative',
          height: '5rem'
        }
      }, _react.default.createElement("div", {
        style: {
          width: '20rem'
        }
      }, _react.default.createElement(_welcomeMat.default, {
        labels: {
          title: 'The Lightning Experience is here!',
          description: 'Welcome to Lightning Experience, the modern, beautiful user experience from Salesforce. With a sales-and service-centric mindset, we focused on reinventing the desktop environment to better support your business processes.'
        },
        id: "welcome-mat-steps-complete-example",
        isOpen: this.state.isOpen,
        onRequestClose: this.toggleOpen,
        variant: "steps"
      }, _react.default.createElement(_tile.default, {
        title: "Welcome to Salesforce!",
        description: "Lorem ipsum dolor sit amet, lorem ipsum dolor sit amet.",
        icon: _react.default.createElement(_icon.default, {
          category: "utility",
          name: "animal_and_nature"
        }),
        href: "javascript:void(0);",
        id: "welcome-mat-steps-tile-1",
        isComplete: true
      }), _react.default.createElement(_tile.default, {
        title: "Learn About OpenCTI!",
        description: "Lorem ipsum dolor sit amet, lorem ipsum dolor sit amet.",
        icon: _react.default.createElement(_icon.default, {
          category: "utility",
          name: "call"
        }),
        href: "javascript:void(0);",
        id: "welcome-mat-steps-tile-2",
        isComplete: true
      }), _react.default.createElement(_tile.default, {
        title: "Power Up the Utility Bar",
        description: "Tap into case history or share notes with fellow agents\u2014it all happens on the utility bar.",
        href: "javascript:void(0);",
        id: "welcome-mat-steps-tile-3",
        icon: _react.default.createElement(_icon.default, {
          category: "utility",
          name: "call"
        }),
        isComplete: true
      }), _react.default.createElement(_tile.default, {
        title: "Customize your view",
        description: "Tailor your cases to your team's workflow with custom list views.",
        href: "javascript:void(0);",
        id: "welcome-mat-steps-tile-4",
        icon: _react.default.createElement(_icon.default, {
          category: "utility",
          name: "upload"
        }),
        isComplete: true
      }), _react.default.createElement(_tile.default, {
        title: "Share the Knowledge",
        description: "Harness your team's collective know-how with our powerful knowledge base.",
        href: "javascript:void(0);",
        id: "welcome-mat-steps-tile-5",
        icon: _react.default.createElement(_icon.default, {
          category: "utility",
          name: "knowledge_base"
        }),
        isComplete: true
      })))));
    }
  }]);

  return Example;
}(_react.default.Component);

_defineProperty(Example, "displayName", 'welcomeMatExample');

var _default = Example;
exports.default = _default;