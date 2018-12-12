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

var Example = (0, _createReactClass2.default)({
  displayName: 'SliderExample',
  render: function render() {
    return _react2.default.createElement(_slider2.default, {
      id: "medium-id",
      label: "Slider Label",
      size: "medium"
    });
  }
});
exports.default = Example;