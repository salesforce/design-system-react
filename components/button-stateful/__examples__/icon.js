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

var _buttonStateful = require("../../../../components/button-stateful");

var _buttonStateful2 = _interopRequireDefault(_buttonStateful);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// `~` is replaced with design-system-react at runtime
var Example = (0, _createReactClass2.default)({
  displayName: 'ButtonStatefulExample',
  getInitialState: function getInitialState() {
    return {
      isActive: false
    };
  },
  handleOnclick: function handleOnclick() {
    this.setState({
      isActive: !this.state.isActive
    });
  },
  render: function render() {
    return _react2.default.createElement(_iconSettings2.default, {
      iconPath: "/assets/icons"
    }, _react2.default.createElement(_buttonStateful2.default, {
      assistiveText: {
        icon: this.state.isActive ? 'liked' : 'not liked'
      },
      iconName: "like",
      iconSize: "large",
      variant: "icon"
    }));
  }
});
exports.default = Example; // export is replaced with `ReactDOM.render(<Example />, mountNode);` at runtime