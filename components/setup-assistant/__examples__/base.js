"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _button = _interopRequireDefault(require("../../../../components/button"));

var _checkbox = _interopRequireDefault(require("../../../../components/checkbox"));

var _iconSettings = _interopRequireDefault(require("../../../../components/icon-settings"));

var _setupAssistant = _interopRequireDefault(require("../../../../components/setup-assistant"));

var _step = _interopRequireDefault(require("../../../../components/setup-assistant/step"));

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
      }, _react.default.createElement(_setupAssistant.default, {
        id: "base-setup-assistant"
      }, _react.default.createElement(_step.default, {
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
        estimatedTime: "4 mins",
        heading: "Add Users to Your Org",
        id: "base-step-1",
        onRenderAction: function onRenderAction() {
          return _react.default.createElement(_button.default, {
            id: "base-step-1-action",
            label: "Add Users",
            variant: "outline-brand"
          });
        }
      }), _react.default.createElement(_step.default, {
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
        heading: "Create Profiles for Your Users",
        id: "base-step-2",
        onRenderAction: function onRenderAction() {
          return _react.default.createElement(_button.default, {
            id: "base-step-2-action",
            label: "Add Profiles",
            variant: "outline-brand"
          });
        }
      }), _react.default.createElement(_step.default, {
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
        estimatedTime: "15 mins",
        heading: "Learn How to Use Profiles to control Visibility",
        id: "base-step-3",
        onRenderAction: function onRenderAction() {
          return _react.default.createElement(_button.default, {
            id: "base-step-3-action",
            label: "View on Trailhead",
            variant: "link"
          });
        }
      }), _react.default.createElement(_step.default, {
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
        heading: "Turn on tracking for profiles",
        id: "base-step-4",
        onRenderAction: function onRenderAction() {
          return _react.default.createElement(_checkbox.default, {
            id: "base-step-4-action",
            oldEventParameterOrder: false,
            variant: "toggle"
          });
        }
      }), _react.default.createElement(_step.default, {
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
        heading: "Setup Einstein Visibility for Admins",
        id: "base-step-5",
        onRenderAction: function onRenderAction() {
          return _react.default.createElement(_button.default, {
            id: "base-step-5-action",
            label: "Watch Video",
            variant: "link"
          });
        }
      })));
    }
  }]);

  return Example;
}(_react.default.Component);

_defineProperty(Example, "displayName", 'SetupAssistantBaseExample');

var _default = Example;
exports.default = _default;