"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _createReactClass = require("create-react-class");

var _createReactClass2 = _interopRequireDefault(_createReactClass);

var _progressIndicator = require("../../../../components/progress-indicator");

var _progressIndicator2 = _interopRequireDefault(_progressIndicator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// `~` is replaced with design-system-react at runtime
var Example = (0, _createReactClass2.default)({
  displayName: 'ProgressIndicatorStepError',
  render: function render() {
    return _react2.default.createElement("div", {
      style: {
        padding: '2rem 1rem 0px'
      }
    }, _react2.default.createElement(_progressIndicator2.default, this.props));
  }
});
exports.default = Example; // export is replaced with `ReactDOM.render(<Example />, mountNode);` at runtime