"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _button = _interopRequireDefault(require("../../../../components/button"));

var _checkbox = _interopRequireDefault(require("../../../../components/checkbox"));

var _iconSettings = _interopRequireDefault(require("../../../../components/icon-settings"));

var _scopedNotification = _interopRequireDefault(require("../../../../components/scoped-notification"));

var _setupAssistant = _interopRequireDefault(require("../../../../components/setup-assistant"));

var _step = _interopRequireDefault(require("../../../../components/setup-assistant/step"));

var _progressBar = _interopRequireDefault(require("../../../../components/progress-bar"));

var _progressIndicator = _interopRequireDefault(require("../../../../components/progress-indicator"));

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

var subSteps = [{
  id: 0,
  label: 'Turn on Lightning for all users.',
  onRenderSetupAssistantAction: _react.default.createElement(_checkbox.default, {
    id: "substep-0-action",
    checked: true,
    oldEventParameterOrder: false,
    variant: "toggle"
  })
}, {
  id: 1,
  label: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  onRenderSetupAssistantAction: _react.default.createElement(_button.default, {
    id: "substep-1-action",
    label: "View in Trailhead",
    variant: "link"
  })
}, {
  id: 2,
  label: 'Lorem ipsum dolor sit amet, lorem ipsum dolor.',
  onRenderSetupAssistantAction: _react.default.createElement(_button.default, {
    id: "substep-2-action",
    label: "Add Users",
    variant: "outline-brand"
  })
}];
var subStepsComplete = [{
  id: 0,
  label: 'Turn on Lightning for all users.',
  onRenderSetupAssistantAction: _react.default.createElement(_checkbox.default, {
    id: "substep-complete-0-action",
    checked: true,
    oldEventParameterOrder: false,
    variant: "toggle"
  })
}, {
  id: 1,
  label: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  onRenderSetupAssistantAction: _react.default.createElement(_button.default, {
    id: "substep-complete-1-action",
    label: "View in Trailhead",
    variant: "link"
  })
}];
var subStepsIncomplete = [{
  id: 0,
  label: 'Turn on Lightning for all users.',
  onRenderSetupAssistantAction: _react.default.createElement(_checkbox.default, {
    id: "substep-incomplete-0-action",
    oldEventParameterOrder: false,
    variant: "toggle"
  })
}, {
  id: 1,
  label: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  onRenderSetupAssistantAction: _react.default.createElement(_button.default, {
    id: "substep-incomplete-1-action",
    label: "View in Trailhead",
    variant: "link"
  })
}];

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
        id: "card-setup-assistant",
        isCard: true,
        progressBar: _react.default.createElement(_progressBar.default, {
          color: "success",
          id: "card-setup-assistant-progress-bar",
          labels: {
            label: 'Complete all the steps below to finish setting up Einstein Visibility'
          },
          radius: "circular",
          value: 50,
          variant: "light"
        })
      }, _react.default.createElement(_step.default, {
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
        estimatedTime: "4 mins",
        heading: "Add Users to Your Org",
        id: "card-step-1",
        isExpandable: true,
        onRenderContent: function onRenderContent() {
          return _react.default.createElement(_progressIndicator.default, {
            completedSteps: subStepsComplete,
            id: "card-step-1-progress-indicator",
            orientation: "vertical",
            steps: subStepsComplete,
            variant: "setup-assistant"
          });
        },
        progress: 100
      }), _react.default.createElement(_step.default, {
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
        estimatedTime: "10 mins",
        heading: "Create Profiles for Your Users",
        id: "card-step-2",
        isExpandable: true,
        onRenderContent: function onRenderContent() {
          return _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_progressIndicator.default, {
            completedSteps: [subSteps[0]],
            id: "card-step-2-progress-indicator",
            orientation: "vertical",
            steps: subSteps,
            selectedStep: subSteps[1],
            variant: "setup-assistant"
          }), _react.default.createElement(_scopedNotification.default, {
            id: "card-step-2-scoped-notification",
            theme: "light"
          }, _react.default.createElement("p", null, "It looks as if duplicates exist for this lead.", ' ', _react.default.createElement("a", {
            href: "javascript:void(0);"
          }, "View Duplicates."))));
        },
        progress: 33
      }), _react.default.createElement(_step.default, {
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
        estimatedTime: "15 mins",
        heading: "Learn How to Use Profiles to control Visibility",
        id: "card-step-3",
        isExpandable: true,
        onRenderContent: function onRenderContent() {
          return _react.default.createElement(_progressIndicator.default, {
            completedSteps: subStepsComplete,
            id: "card-step-3-progress-indicator",
            orientation: "vertical",
            steps: subStepsComplete,
            variant: "setup-assistant"
          });
        },
        progress: 100
      }), _react.default.createElement(_step.default, {
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
        estimatedTime: "10 mins",
        heading: "Turn on tracking for profiles",
        id: "card-step-4",
        isExpandable: true,
        onRenderContent: function onRenderContent() {
          return _react.default.createElement(_progressIndicator.default, {
            id: "card-step-4-progress-indicator",
            orientation: "vertical",
            steps: subStepsIncomplete,
            selectedStep: subStepsIncomplete[0],
            variant: "setup-assistant"
          });
        },
        progress: 0
      }), _react.default.createElement(_step.default, {
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
        estimatedTime: "10 mins",
        heading: "Setup Einstein Visibility for Admins",
        id: "card-step-5",
        isExpandable: true,
        onRenderContent: function onRenderContent() {
          return _react.default.createElement(_progressIndicator.default, {
            id: "card-step-5-progress-indicator",
            orientation: "vertical",
            steps: subStepsIncomplete,
            selectedStep: subStepsIncomplete[0],
            variant: "setup-assistant"
          });
        },
        progress: 0
      })));
    }
  }]);

  return Example;
}(_react.default.Component);

_defineProperty(Example, "displayName", 'SetupAssistantInACardExample');

var _default = Example;
exports.default = _default;