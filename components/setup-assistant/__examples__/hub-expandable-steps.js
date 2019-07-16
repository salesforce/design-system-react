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

var _progressIndicator = _interopRequireDefault(require("../../../../components/progress-indicator"));

var _log = _interopRequireDefault(require("../../../../utilities/log"));

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

  function Example(props) {
    var _this;

    _classCallCheck(this, Example);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Example).call(this, props));
    _this.state = {
      expandedSteps: {
        1: true
      },
      stepTwoCompletedSubSteps: [],
      stepTwoCompletedSubStepsStatus: [false, false, false],
      stepTwoProgress: 0
    };
    _this.state.stepTwoSelectedSubStep = _this.getSubSteps()[0]; // eslint-disable-line prefer-destructuring

    return _this;
  }

  _createClass(Example, [{
    key: "getSubSteps",
    value: function getSubSteps() {
      var _this2 = this;

      return [{
        id: 0,
        label: 'Turn on Lightning for all users.',
        onRenderSetupAssistantAction: _react.default.createElement(_checkbox.default, {
          id: "substep-0-action",
          oldEventParameterOrder: false,
          onChange: function onChange(event) {
            _this2.toggleSubStepCompletion(0, event.target.checked);
          },
          variant: "toggle"
        })
      }, {
        id: 1,
        label: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        onRenderSetupAssistantAction: _react.default.createElement(_button.default, {
          disabled: !this.state.stepTwoCompletedSubStepsStatus[0],
          id: "substep-1-action",
          onClick: function onClick() {
            return [_this2.toggleSubStepCompletion(1, !_this2.state.stepTwoCompletedSubStepsStatus[1])];
          },
          label: "View in Trailhead",
          variant: "link"
        })
      }, {
        id: 2,
        label: 'Lorem ipsum dolor sit amet, lorem ipsum dolor.',
        onRenderSetupAssistantAction: _react.default.createElement(_button.default, {
          disabled: !this.state.stepTwoCompletedSubStepsStatus[0] || !this.state.stepTwoCompletedSubStepsStatus[1],
          id: "substep-2-action",
          onClick: function onClick() {
            return [_this2.toggleSubStepCompletion(2, !_this2.state.stepTwoCompletedSubStepsStatus[2])];
          },
          label: "Add Users",
          variant: "outline-brand"
        })
      }];
    }
  }, {
    key: "toggleSubStepCompletion",
    value: function toggleSubStepCompletion(subStepId, completed) {
      var stepTwoCompletedSubStepsStatus = this.state.stepTwoCompletedSubStepsStatus;
      var subSteps = this.getSubSteps();
      var stepsCompleted = 0;
      var stepTwoCompletedSubSteps = this.state.stepTwoCompletedSubSteps;
      var stepTwoSelectedSubStep;

      if (completed) {
        stepTwoCompletedSubSteps.push(subSteps[subStepId]);
        stepTwoCompletedSubStepsStatus[subStepId] = true;
      } else {
        stepTwoCompletedSubSteps = stepTwoCompletedSubSteps.filter(function (subStep) {
          return subStep.id !== subStepId;
        });
        stepTwoCompletedSubStepsStatus[subStepId] = false;
      }

      for (var i = 0; i < stepTwoCompletedSubStepsStatus.length; i += 1) {
        if (stepTwoCompletedSubStepsStatus[i]) {
          stepsCompleted += 1;
        }

        if (!stepTwoCompletedSubStepsStatus[i] && !stepTwoSelectedSubStep) {
          stepTwoSelectedSubStep = subSteps[i];
        }
      }

      this.setState({
        stepTwoCompletedSubSteps: stepTwoCompletedSubSteps,
        stepTwoCompletedSubStepsStatus: stepTwoCompletedSubStepsStatus,
        stepTwoProgress: Math.ceil(stepsCompleted / subSteps.length * 100),
        stepTwoSelectedSubStep: stepTwoSelectedSubStep
      });
      return false;
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      return _react.default.createElement(_iconSettings.default, {
        iconPath: "/assets/icons"
      }, _react.default.createElement(_setupAssistant.default, {
        id: "hub-expandable-steps-setup-assistant",
        onStepToggleIsOpen: function onStepToggleIsOpen(event, data) {
          (0, _log.default)({
            action: _this3.props.action,
            event: event,
            eventName: 'onStepToggleIsOpen',
            data: data
          });
          var expandedSteps = _this3.state.expandedSteps;
          expandedSteps[data.index] = !data.isOpen;

          _this3.setState({
            expandedSteps: expandedSteps
          });
        }
      }, _react.default.createElement(_step.default, {
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
        estimatedTime: "4 mins",
        heading: "Add Users to Your Org",
        id: "hub-expandable-step-1",
        isExpandable: true,
        isOpen: this.state.expandedSteps[0] || false,
        onRenderContent: function onRenderContent() {
          return _react.default.createElement(_progressIndicator.default, {
            completedSteps: subStepsComplete,
            id: "hub-expandable-step-1-progress-indicator",
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
        id: "hub-expandable-step-2",
        isExpandable: true,
        isOpen: this.state.expandedSteps[1] || false,
        onRenderContent: function onRenderContent() {
          return _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_progressIndicator.default, {
            completedSteps: _this3.state.stepTwoCompletedSubSteps,
            id: "hub-expandable-step-2-progress-indicator",
            orientation: "vertical",
            steps: _this3.getSubSteps(),
            selectedStep: _this3.state.stepTwoSelectedSubStep,
            variant: "setup-assistant"
          }), _react.default.createElement(_scopedNotification.default, {
            id: "hub-expandable-step-2-scoped-notification",
            theme: "light"
          }, _react.default.createElement("p", null, "It looks as if duplicates exist for this lead.", ' ', _react.default.createElement("a", {
            href: "javascript:void(0);"
          }, "View Duplicates."))));
        },
        progress: this.state.stepTwoProgress
      }), _react.default.createElement(_step.default, {
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
        estimatedTime: "15 mins",
        heading: "Learn How to Use Profiles to control Visibility",
        id: "hub-expandable-step-3",
        isExpandable: true,
        isOpen: this.state.expandedSteps[2] || false,
        onRenderContent: function onRenderContent() {
          return _react.default.createElement(_progressIndicator.default, {
            completedSteps: subStepsComplete,
            id: "hub-expandable-step-3-progress-indicator",
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
        id: "hub-expandable-step-4",
        isExpandable: true,
        isOpen: this.state.expandedSteps[3] || false,
        onRenderContent: function onRenderContent() {
          return _react.default.createElement(_progressIndicator.default, {
            id: "hub-expandable-step-4-progress-indicator",
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
        id: "hub-expandable-step-5",
        isExpandable: true,
        isOpen: this.state.expandedSteps[4] || false,
        onRenderContent: function onRenderContent() {
          return _react.default.createElement(_progressIndicator.default, {
            id: "hub-expandable-step-5-progress-indicator",
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

_defineProperty(Example, "displayName", 'SetupAssistantHubWithExpandableStepsExample');

var _default = Example;
exports.default = _default;