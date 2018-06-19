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

var _button = require("../../../../components/button");

var _button2 = _interopRequireDefault(_button);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// `~` is replaced with design-system-react at runtime
var Example = (0, _createReactClass2.default)({
  displayName: 'ButtonExample',
  render: function render() {
    return _react2.default.createElement(_iconSettings2.default, {
      iconPath: "/assets/icons"
    }, _react2.default.createElement("div", {
      className: "-x-small-buttons--horizontal"
    }, _react2.default.createElement(_button2.default, {
      label: "Brand",
      variant: "brand"
    }), _react2.default.createElement(_button2.default, {
      disabled: true,
      label: "Disabled",
      onClick: function onClick() {
        console.log('Disabled Button Clicked');
      },
      variant: "brand"
    }), _react2.default.createElement(_button2.default, {
      label: "Destructive",
      variant: "destructive"
    }), _react2.default.createElement("div", {
      style: {
        backgroundColor: '#16325c',
        padding: '10px',
        display: 'inline-block'
      },
      className: "-m-horizontal--small"
    }, _react2.default.createElement(_button2.default, {
      inverse: true,
      label: "Inverse",
      variant: "base"
    }))));
  }
});
exports.default = Example; // export is replaced with `ReactDOM.render(<Example />, mountNode);` at runtime