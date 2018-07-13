"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _createReactClass = require("create-react-class");

var _createReactClass2 = _interopRequireDefault(_createReactClass);

var _iconSettings = require("../../../../components/icon-settings");

var _iconSettings2 = _interopRequireDefault(_iconSettings);

var _progressIndicator = require("../../../../components/progress-indicator");

var _progressIndicator2 = _interopRequireDefault(_progressIndicator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// `~` is replaced with design-system-react at runtime
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

var handleStepEvent = function handleStepEvent(event, data) {
  console.log(data);
};

var Example = (0, _createReactClass2.default)({
  displayName: 'ProgressIndicatorDefault',
  render: function render() {
    return _react2.default.createElement(_iconSettings2.default, {
      iconPath: "/assets/icons"
    }, _react2.default.createElement("div", {
      style: {
        padding: '2rem 1rem 0px',
        background: this.props.variant === 'modal' ? 'rgb(244, 246, 249)' : ''
      }
    }, _react2.default.createElement(_progressIndicator2.default, {
      steps: steps,
      selectedStep: steps[0],
      onStepClick: handleStepEvent // tooltipIsOpenSteps={stepsBasic.slice(0, 2)}

    })));
  }
});
exports.default = Example; // export is replaced with `ReactDOM.render(<Example />, mountNode);` at runtime