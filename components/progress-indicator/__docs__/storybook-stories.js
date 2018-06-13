"use strict";

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _createReactClass = require("create-react-class");

var _createReactClass2 = _interopRequireDefault(_createReactClass);

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
var ExampleProgressIndicator = (0, _createReactClass2.default)({
  displayName: 'ProgressIndicatorDefault',
  render: function render() {
    return _react2.default.createElement("div", {
      style: {
        padding: '2rem 1rem 0px'
      }
    }, _react2.default.createElement(_progressIndicator2.default, {
      steps: this.props.steps,
      selectedStep: this.props.selectedStep,
      onStepClick: function onStepClick(event, data) {
        console.log(data);
      }
    }));
  }
});
(0, _react3.storiesOf)(_constants.PROGRESS_INDICATOR, module).addDecorator(function (getStory) {
  return _react2.default.createElement("div", {
    className: "slds-p-around--medium"
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
    steps: steps,
    selectedStep: steps[1],
    completedSteps: steps.slice(0, 1),
    errorSteps: steps.slice(1, 2)
  });
}).add('In A Modal (With Step Error)', function () {
  return _react2.default.createElement(_modal2.default, null);
});