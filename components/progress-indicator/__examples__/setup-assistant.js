"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _iconSettings = _interopRequireDefault(require("../../../../components/icon-settings"));

var _progressIndicator = _interopRequireDefault(require("../../../../components/progress-indicator"));

var _button = _interopRequireDefault(require("../../../../components/button"));

var _checkbox = _interopRequireDefault(require("../../../../components/checkbox"));

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

var steps = [{
  id: 0,
  label: 'tooltip label #1',
  onRenderSetupAssistantAction: _react.default.createElement(_button.default, {
    label: "Brand",
    variant: "brand"
  }),
  setupAssistantEstimatedTime: '4 min'
}, {
  id: 1,
  label: 'tooltip label #2',
  onRenderSetupAssistantAction: _react.default.createElement(_button.default, {
    disabled: true,
    label: "Disabled",
    onClick: function onClick() {
      console.log('Disabled Button Clicked');
    },
    variant: "brand"
  }),
  setupAssistantEstimatedTime: '40 min'
}, {
  id: 2,
  label: 'tooltip label #3',
  onRenderSetupAssistantAction: _react.default.createElement(_button.default, {
    iconCategory: "utility",
    iconName: "download",
    iconPosition: "left",
    label: "Download"
  })
}, {
  id: 3,
  label: 'tooltip label #4',
  onRenderSetupAssistantAction: _react.default.createElement(_checkbox.default, {
    id: "checkbox-toggle-example--error",
    variant: "toggle"
  })
}, {
  id: 4,
  label: 'tooltip label #5',
  onRenderSetupAssistantAction: _react.default.createElement(_button.default, {
    label: "Done"
  }),
  setupAssistantEstimatedTime: '14 min'
}];
/*
 * This example allows you to select the next step and only the next step. Typically, Progress Indicator should be paired with a modal and form errors should be explained outside of this component.
 */

var Example =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Example, _React$Component);

  function Example(props) {
    var _this;

    _classCallCheck(this, Example);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Example).call(this, props));

    _defineProperty(_assertThisInitialized(_this), "handleStepEvent", function (event, data) {
      _this.setState({
        completedSteps: steps.slice(0, data.step.id),
        disabledSteps: data.step.id < steps.length ? steps.slice(data.step.id + 2, steps.length) : [],
        selectedStep: data.step
      });
    });

    _this.state = {
      steps: steps,
      completedSteps: [],
      disabledSteps: steps.slice(2, steps.length),
      selectedStep: steps[0]
    };
    return _this;
  }

  _createClass(Example, [{
    key: "render",
    value: function render() {
      return _react.default.createElement(_iconSettings.default, {
        iconPath: "/assets/icons"
      }, _react.default.createElement("div", {
        style: {
          padding: '4rem 1rem 0px',
          background: this.props.variant === 'modal' ? 'rgb(244, 246, 249)' : undefined
        }
      }, _react.default.createElement(_progressIndicator.default, {
        id: "setup-assistant-progress-indicator",
        completedSteps: this.state.completedSteps,
        disabledSteps: this.state.disabledSteps,
        onStepClick: this.handleStepEvent,
        orientation: "vertical",
        steps: this.state.steps,
        selectedStep: this.state.selectedStep,
        variant: "setup-assistant"
      })));
    }
  }]);

  return Example;
}(_react.default.Component);

Example.displayName = 'ProgressIndicatorSetupAssistant';
var _default = Example; // export is replaced with `ReactDOM.render(<Example />, mountNode);` at runtime

exports.default = _default;