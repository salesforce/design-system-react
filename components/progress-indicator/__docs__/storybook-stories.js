"use strict";

var _react = _interopRequireDefault(require("react"));

var _react2 = require("@storybook/react");

var _iconSettings = _interopRequireDefault(require("../../icon-settings"));

var _progressIndicator = _interopRequireDefault(require("../../../components/progress-indicator"));

var _constants = require("../../../utilities/constants");

var _default = _interopRequireDefault(require("../__examples__/default"));

var _modal = _interopRequireDefault(require("../__examples__/modal"));

var _stepError = _interopRequireDefault(require("../__examples__/step-error"));

var _vertical = _interopRequireDefault(require("../__examples__/vertical"));

var _setupAssistant = _interopRequireDefault(require("../__examples__/setup-assistant"));

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

var steps = [{
  id: 0,
  label: _react.default.createElement("i", null, "tooltip label #1"),
  assistiveText: 'This is custom text in the assistive text key'
}, {
  id: 1,
  label: 'tooltip label #2'
}, {
  id: 2,
  label: _react.default.createElement("strong", null, "tooltip label #3")
}, {
  id: 3,
  label: 'tooltip label #4'
}, {
  id: 4,
  label: 'tooltip label #5'
}];
var stepsDisabled = [{
  id: 3,
  label: 'tooltip label #4'
}, {
  id: 4,
  label: 'tooltip label #5'
}];
var manySteps = [{
  id: 'a',
  label: 'tooltip label #1'
}, {
  id: 'b',
  label: 'tooltip label #2'
}, {
  id: 'c',
  label: 'tooltip label #3'
}, {
  id: 'd',
  label: 'tooltip label #4'
}, {
  id: 'e',
  label: 'tooltip label #5'
}, {
  id: 'f',
  label: 'tooltip label #6'
}, {
  id: 'g',
  label: 'tooltip label #7'
}, {
  id: 'h',
  label: 'tooltip label #8'
}, {
  id: 'i',
  label: 'tooltip label #9'
}];

var ExampleProgressIndicator =
/*#__PURE__*/
function (_React$Component) {
  _inherits(ExampleProgressIndicator, _React$Component);

  function ExampleProgressIndicator() {
    _classCallCheck(this, ExampleProgressIndicator);

    return _possibleConstructorReturn(this, _getPrototypeOf(ExampleProgressIndicator).apply(this, arguments));
  }

  _createClass(ExampleProgressIndicator, [{
    key: "render",
    value: function render() {
      return _react.default.createElement("div", {
        style: {
          padding: '4rem 1rem 0px'
        }
      }, _react.default.createElement(_progressIndicator.default, {
        id: "example-progress-indicator",
        steps: this.props.steps,
        selectedStep: this.props.selectedStep,
        disabledSteps: this.props.disabledSteps,
        completedSteps: this.props.completedSteps,
        orientation: this.props.orientation,
        assistiveText: this.props.assistiveText,
        onStepClick: function onStepClick(event, data) {
          console.log(data);
        }
      }));
    }
  }]);

  return ExampleProgressIndicator;
}(_react.default.Component);

_defineProperty(ExampleProgressIndicator, "displayName", 'ProgressIndicatorDefault');

(0, _react2.storiesOf)(_constants.PROGRESS_INDICATOR, module).addDecorator(function (getStory) {
  return _react.default.createElement("div", {
    className: "slds-p-around_medium"
  }, _react.default.createElement(_iconSettings.default, {
    iconPath: "/assets/icons"
  }, getStory()));
}).add('Base', function () {
  return _react.default.createElement(_default.default, null);
}).add('Base With Many Steps', function () {
  return _react.default.createElement(ExampleProgressIndicator, {
    steps: manySteps,
    selectedStep: manySteps[4],
    completedSteps: manySteps.slice(0, 4) // tooltipIsOpenSteps={stepsBasic.slice(0, 2)}

  });
}).add('Base With Disabled Steps', function () {
  return _react.default.createElement(ExampleProgressIndicator, {
    steps: steps,
    disabledSteps: stepsDisabled,
    selectedStep: steps[2],
    completedSteps: steps.slice(0, 2)
  });
}).add('Step Error', function () {
  return _react.default.createElement(_stepError.default, {
    id: "example-progress-indicator",
    steps: steps,
    selectedStep: steps[1],
    completedSteps: steps.slice(0, 1),
    errorSteps: steps.slice(1, 2)
  });
}).add('In A Modal (With Step Error) - Needs DOM', function () {
  return typeof document !== 'undefined' ? _react.default.createElement(_modal.default, null) : null;
}).add('Completed Progress', function () {
  return _react.default.createElement(ExampleProgressIndicator, {
    steps: steps,
    selectedStep: steps[steps.length - 2],
    completedSteps: steps.slice(0, steps.length - 2),
    assistiveText: {
      completedStep: 'Finished this step.',
      disabledStep: 'Unable to proceed on this step.'
    }
  });
}).add('Vertical', function () {
  return _react.default.createElement(_vertical.default, null);
}).add('VerticalStepError', function () {
  return _react.default.createElement(_stepError.default, {
    id: "example-progress-indicator",
    steps: manySteps,
    completedSteps: manySteps.slice(0, 4),
    errorSteps: manySteps.slice(4, 5),
    orientation: "vertical"
  });
}).add('SetupAssistant', function () {
  return _react.default.createElement(_setupAssistant.default, null);
});