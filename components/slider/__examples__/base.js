"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _createReactClass = require("create-react-class");

var _createReactClass2 = _interopRequireDefault(_createReactClass);

var _slider = require("../../../../components/slider");

var _slider2 = _interopRequireDefault(_slider);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var DemoSlider = (0, _createReactClass2.default)({
  displayName: 'DemoSlider',
  getInitialState: function getInitialState() {
    return {
      value: this.props.value
    };
  },
  handleChange: function handleChange(event, _ref) {
    var value = _ref.value;
    this.setState({
      value: value
    });
  },
  render: function render() {
    return _react2.default.createElement(_slider2.default, _extends({}, this.props, {
      value: this.state.value,
      onChange: this.handleChange
    }));
  }
});
var Example = (0, _createReactClass2.default)({
  displayName: 'SliderExample',
  render: function render() {
    return _react2.default.createElement("section", null, _react2.default.createElement("ol", null, _react2.default.createElement("li", {
      className: "slds-p-bottom--large"
    }, _react2.default.createElement("h1", {
      className: "slds-text-title_caps slds-p-vertical--medium"
    }, "1. Base Input with label"), _react2.default.createElement(DemoSlider, {
      id: "base-id",
      label: "My Label",
      value: 0
    })), _react2.default.createElement("li", {
      className: "slds-p-bottom--large"
    }, _react2.default.createElement("h1", {
      className: "slds-text-title_caps slds-p-vertical--medium"
    }, "2. Base Input with no label (assistive text)"), _react2.default.createElement(DemoSlider, {
      id: "assistiveText-id",
      assistiveText: {
        label: 'My Label'
      },
      value: 0
    })), _react2.default.createElement("li", {
      className: "slds-p-bottom--large"
    }, _react2.default.createElement("h1", {
      className: "slds-text-title_caps slds-p-vertical--medium"
    }, "3. Base Input with min and max."), _react2.default.createElement(DemoSlider, {
      id: "min-max-id",
      label: "My Label",
      min: 0,
      max: 400,
      value: 200
    })), _react2.default.createElement("li", {
      className: "slds-p-bottom--large"
    }, _react2.default.createElement("h1", {
      className: "slds-text-title_caps slds-p-vertical--medium"
    }, "4. Base Input with min, max and step."), _react2.default.createElement(DemoSlider, {
      id: "min-max-step-id",
      label: "My Label",
      min: 0,
      max: 400,
      step: 100,
      value: 200
    }))));
  }
});
exports.default = Example;