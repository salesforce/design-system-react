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

var _menuDropdown = require("../../../../components/menu-dropdown");

var _menuDropdown2 = _interopRequireDefault(_menuDropdown);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// `~` is replaced with design-system-react at runtime
var Example = (0, _createReactClass2.default)({
  displayName: 'MediaObjectExample',
  render: function render() {
    return _react2.default.createElement(_iconSettings2.default, {
      iconPath: "/assets/icons"
    }, _react2.default.createElement("div", {
      className: "slds-grid slds-grid--pull-padded slds-grid--vertical-align-center"
    }, _react2.default.createElement("div", {
      className: "slds-col--padded"
    }, _react2.default.createElement("span", null, "Checkmark "), _react2.default.createElement(_menuDropdown2.default, {
      assistiveText: {
        icon: 'Checkmark'
      },
      checkmark: true,
      iconCategory: "utility",
      iconName: "down",
      iconVariant: "border-filled",
      onSelect: function onSelect(value) {
        console.log('selected: ', value);
      },
      options: [{
        label: 'Menu Item One',
        value: 'A0'
      }, {
        label: 'Menu Item Two',
        value: 'B0'
      }, {
        label: 'Menu Item Three',
        value: 'C0'
      }],
      value: "A0"
    })), _react2.default.createElement("div", {
      className: "slds-col--padded"
    }, _react2.default.createElement("span", null, "Checkmark with right icon "), _react2.default.createElement(_menuDropdown2.default, {
      assistiveText: {
        icon: 'Checkmark with right icon'
      },
      buttonVariant: "icon",
      checkmark: true,
      iconName: "settings",
      iconSize: "large",
      iconVariant: "more",
      onSelect: function onSelect(value) {
        console.log('selected: ', value);
      },
      options: [{
        label: 'Table View',
        value: 'A0',
        rightIcon: {
          category: 'utility',
          name: 'table'
        }
      }, {
        label: 'Kanban Board',
        value: 'A0',
        rightIcon: {
          category: 'utility',
          name: 'kanban'
        }
      }, {
        label: 'List View',
        value: 'A0',
        rightIcon: {
          category: 'utility',
          name: 'side_list'
        }
      }],
      value: "A0"
    }))));
  }
});
exports.default = Example; // export is replaced with `ReactDOM.render(<Example />, mountNode);` at runtime