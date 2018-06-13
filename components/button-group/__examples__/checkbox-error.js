"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _createReactClass = require("create-react-class");

var _createReactClass2 = _interopRequireDefault(_createReactClass);

var _buttonGroup = require("../../../../components/button-group");

var _buttonGroup2 = _interopRequireDefault(_buttonGroup);

var _checkbox = require("../../../../components/checkbox");

var _checkbox2 = _interopRequireDefault(_checkbox);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Example = (0, _createReactClass2.default)({
  displayName: 'ButtonGroupExample',
  render: function render() {
    return _react2.default.createElement(_buttonGroup2.default, {
      labels: {
        error: 'This field is required',
        label: 'Scheduled Day(s)'
      },
      variant: "checkbox"
    }, _react2.default.createElement(_checkbox2.default, {
      id: "ButtonGroupExampleMon",
      label: "Mon"
    }), _react2.default.createElement(_checkbox2.default, {
      id: "ButtonGroupExampleTue",
      label: "Tue"
    }), _react2.default.createElement(_checkbox2.default, {
      id: "ButtonGroupExampleWed",
      label: "Wed"
    }), _react2.default.createElement(_checkbox2.default, {
      id: "ButtonGroupExampleThu",
      label: "Thu"
    }), _react2.default.createElement(_checkbox2.default, {
      id: "ButtonGroupExampleFri",
      label: "Fri"
    }));
  }
});
exports.default = Example; // export is replaced with `ReactDOM.render(<Example />, mountNode);` at runtime