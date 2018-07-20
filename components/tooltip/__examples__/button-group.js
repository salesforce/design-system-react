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

var _popoverTooltip = require("../../../../components/popover-tooltip");

var _popoverTooltip2 = _interopRequireDefault(_popoverTooltip);

var _buttonGroup = require("../../../../components/button-group");

var _buttonGroup2 = _interopRequireDefault(_buttonGroup);

var _button = require("../../../../components/button");

var _button2 = _interopRequireDefault(_button);

var _menuDropdown = require("../../../../components/menu-dropdown");

var _menuDropdown2 = _interopRequireDefault(_menuDropdown);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// `~` is replaced with design-system-react at runtime
var Example = (0, _createReactClass2.default)({
  displayName: 'TooltipExample',
  render: function render() {
    return _react2.default.createElement(_iconSettings2.default, {
      iconPath: "/assets/icons"
    }, _react2.default.createElement(_buttonGroup2.default, {
      className: "slds-p-bottom--medium"
    }, _react2.default.createElement(_popoverTooltip2.default, {
      align: "bottom",
      content: "Buttonbar Tooltip"
    }, _react2.default.createElement(_button2.default, {
      label: "Refresh"
    })), _react2.default.createElement(_popoverTooltip2.default, {
      align: "bottom right",
      content: "Buttonbar Tooltip"
    }, _react2.default.createElement(_button2.default, {
      label: "Edit"
    })), _react2.default.createElement(_menuDropdown2.default, {
      assistiveText: {
        icon: 'More Options'
      },
      buttonVariant: "icon",
      iconCategory: "utility",
      iconName: "down",
      iconVariant: "border-filled",
      onSelect: function onSelect(item) {
        return console.log('selected', item);
      },
      options: [{
        label: 'A Option',
        value: 'A0'
      }, {
        label: 'B Option',
        value: 'B0'
      }, {
        label: 'C Option',
        value: 'C0'
      }]
    })));
  }
});
exports.default = Example; // export is replaced with `ReactDOM.render(<Example />, mountNode);` at runtime