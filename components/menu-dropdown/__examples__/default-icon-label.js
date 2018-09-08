"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _createReactClass = require("create-react-class");

var _createReactClass2 = _interopRequireDefault(_createReactClass);

var _menuDropdown = require("../../../../components/menu-dropdown");

var _menuDropdown2 = _interopRequireDefault(_menuDropdown);

var _buttonTrigger = require("../../../../components/menu-dropdown/button-trigger");

var _buttonTrigger2 = _interopRequireDefault(_buttonTrigger);

var _button = require("../../../../components/button/");

var _button2 = _interopRequireDefault(_button);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// `~` is replaced with design-system-react at runtime
// `~` is replaced with design-system-react at runtime
// `~` is replaced with design-system-react at runtime
var Example = (0, _createReactClass2.default)({
  displayName: 'DropdownExample',
  render: function render() {
    return _react2.default.createElement(_menuDropdown2.default, {
      align: "right",
      iconCategory: "utility",
      iconName: "down",
      iconPosition: "right",
      label: "Dropdown",
      options: [{
        label: 'Menu Item One',
        value: 'A0'
      }, {
        label: 'Menu Item Two',
        value: 'B0'
      }, {
        label: 'Menu Item Three',
        value: 'C0'
      }, {
        type: 'divider'
      }, {
        label: 'Menu Item Four',
        value: 'D0'
      }]
    });
  }
});
exports.default = Example; // export is replaced with `ReactDOM.render(<Example />, mountNode);` at runtime