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

var _tabs = require("../../../../components/tabs");

var _tabs2 = _interopRequireDefault(_tabs);

var _panel = require("../../../../components/tabs/panel");

var _panel2 = _interopRequireDefault(_panel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// `~` is replaced with design-system-react at runtime
var Example = (0, _createReactClass2.default)({
  displayName: 'TabsExample',
  render: function render() {
    return _react2.default.createElement(_iconSettings2.default, {
      iconPath: "/assets/icons"
    }, _react2.default.createElement(_tabs2.default, {
      id: "tabs-example-default"
    }, _react2.default.createElement(_panel2.default, {
      label: "Item One"
    }, "Item One Content"), _react2.default.createElement(_panel2.default, {
      label: "Item Two"
    }, "Item Two Content"), _react2.default.createElement(_panel2.default, {
      label: "Item Three"
    }, "Item Three Content"), _react2.default.createElement(_panel2.default, {
      disabled: true,
      label: "Disabled"
    }, "Disabled Content")));
  }
});
exports.default = Example; // export is replaced with `ReactDOM.render(<Example />, mountNode);` at runtime