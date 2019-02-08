"use strict";

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _react3 = require("@storybook/react");

var _iconSettings = require("../../icon-settings");

var _iconSettings2 = _interopRequireDefault(_iconSettings);

var _progressIndicator = require("../../../components/progress-indicator");

var _progressIndicator2 = _interopRequireDefault(_progressIndicator);

var _constants = require("../../../utilities/constants");

var _default = require("../__examples__/default");

var _default2 = _interopRequireDefault(_default);

var _modal = require("../__examples__/modal");

var _modal2 = _interopRequireDefault(_modal);

var _stepError = require("../__examples__/step-error");

var _stepError2 = _interopRequireDefault(_stepError);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var steps = [{
  id: 0,
  label: _react2.default.createElement("i", null, "tooltip label #1"),
  assistiveText: 'This is custom text in the assistive text key'
}, {
  id: 1,
  label: 'tooltip label #2'
}, {
  id: 2,
  label: _react2.default.createElement("strong", null, "tooltip label #3")
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

    return _possibleConstructorReturn(this, (ExampleProgressIndicator.__proto__ || Object.getPrototypeOf(ExampleProgressIndicator)).apply(this, arguments));
  }

  _createClass(ExampleProgressIndicator, [{
    key: "render",
    value: function render() {
      return _react2.default.createElement("div", {
        style: {
          padding: '4rem 1rem 0px'
        }
      }, _react2.default.createElement(_progressIndicator2.default, {
        id: "example-progress-indicator",
        steps: this.props.steps,
        selectedStep: this.props.selectedStep,
        disabledSteps: this.props.disabledSteps,
        completedSteps: this.props.completedSteps,
        assistiveText: this.props.assistiveText,
        onStepClick: function onStepClick(event, data) {
          console.log(data);
        }
      }));
    }
  }]);

  return ExampleProgressIndicator;
}(_react2.default.Component);

Object.defineProperty(ExampleProgressIndicator, "displayName", {
  configurable: true,
  enumerable: true,
  writable: true,
  value: 'ProgressIndicatorDefault'
});
(0, _react3.storiesOf)(_constants.PROGRESS_INDICATOR, module).addDecorator(function (getStory) {
  return _react2.default.createElement("div", {
    className: "slds-p-around_medium"
  }, _react2.default.createElement(_iconSettings2.default, {
    iconPath: "/assets/icons"
  }, getStory()));
}).add('Base', function () {
  return _react2.default.createElement(_default2.default, null);
}).add('Base With Many Steps', function () {
  return _react2.default.createElement(ExampleProgressIndicator, {
    steps: manySteps,
    selectedStep: manySteps[4],
    completedSteps: manySteps.slice(0, 4) // tooltipIsOpenSteps={stepsBasic.slice(0, 2)}

  });
}).add('Base With Disabled Steps', function () {
  return _react2.default.createElement(ExampleProgressIndicator, {
    steps: steps,
    disabledSteps: stepsDisabled,
    selectedStep: steps[2],
    completedSteps: steps.slice(0, 2)
  });
}).add('Step Error', function () {
  return _react2.default.createElement(_stepError2.default, {
    id: "example-progress-indicator",
    steps: steps,
    selectedStep: steps[1],
    completedSteps: steps.slice(0, 1),
    errorSteps: steps.slice(1, 2)
  });
}).add('In A Modal (With Step Error) - Needs DOM', function () {
  return typeof document !== 'undefined' ? _react2.default.createElement(_modal2.default, null) : null;
}).add('Completed Progress', function () {
  return _react2.default.createElement(ExampleProgressIndicator, {
    steps: steps,
    selectedStep: steps[steps.length - 2],
    completedSteps: steps.slice(0, steps.length - 2),
    assistiveText: {
      completedStep: 'Finished this step.',
      disabledStep: 'Unable to proceed on this step.'
    }
  });
});