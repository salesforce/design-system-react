"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _createReactClass = require("create-react-class");

var _createReactClass2 = _interopRequireDefault(_createReactClass);

var _react3 = require("@storybook/react");

var _progressIndicator = require("../../../../components/progress-indicator");

var _progressIndicator2 = _interopRequireDefault(_progressIndicator);

var _modal = require("../../../../components/modal");

var _modal2 = _interopRequireDefault(_modal);

var _button = require("../../../../components/button");

var _button2 = _interopRequireDefault(_button);

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

var getModal = function getModal(props) {
  return _react2.default.createElement(_modal2.default, props);
};

var modalFooter = function modalFooter(props) {
  return [_react2.default.createElement(_button2.default, {
    key: "modalBCancel",
    label: "Cancel"
  }), _react2.default.createElement(_progressIndicator2.default, {
    key: "modal-progress-indicator",
    variant: "modal",
    steps: steps,
    selectedStep: steps[2],
    completedSteps: steps.slice(0, 2),
    errorSteps: steps.slice(2, 3),
    onStepClick: handleStepEvent
  }), _react2.default.createElement(_button2.default, {
    key: "modalBSave",
    label: "Save",
    variant: "brand"
  })];
};

var modalContent = _react2.default.createElement("div", {
  className: "slds-modal__content slds-grow slds-p-around_medium",
  id: "modal-content-id-1",
  style: {
    height: '640px'
  }
});

var Example = (0, _createReactClass2.default)({
  displayName: 'ProgressIndicatorModal',
  render: function render() {
    return _react2.default.createElement("div", {
      style: {
        height: '640px'
      }
    }, getModal({
      isOpen: true,
      title: 'Modal Header',
      children: modalContent,
      onRequestClose: (0, _react3.action)('modal closed'),
      footer: modalFooter(this.props),
      size: 'large',
      footerClassNames: 'slds-grid slds-grid_align-spread'
    }));
  }
});
exports.default = Example; // export is replaced with `ReactDOM.render(<Example />, mountNode);` at runtime