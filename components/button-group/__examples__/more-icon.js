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

var _button = require("../../../../components/button");

var _button2 = _interopRequireDefault(_button);

var _menuDropdown = require("../../../../components/menu-dropdown");

var _menuDropdown2 = _interopRequireDefault(_menuDropdown);

var _iconSettings = require("../../../../components/icon-settings");

var _iconSettings2 = _interopRequireDefault(_iconSettings);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Example = (0, _createReactClass2.default)({
  displayName: 'ButtonGroupExample',
  render: function render() {
    return _react2.default.createElement(_iconSettings2.default, {
      iconPath: "/assets/icons"
    }, _react2.default.createElement(_buttonGroup2.default, null, _react2.default.createElement(_button2.default, {
      label: "Refresh"
    }), _react2.default.createElement(_button2.default, {
      label: "Edit"
    }), _react2.default.createElement(_button2.default, {
      label: "Save"
    }), _react2.default.createElement(_menuDropdown2.default, {
      id: "ButtonGroupExampleDropdown",
      assistiveText: {
        icon: 'More Options'
      },
      buttonVariant: "icon",
      iconCategory: "utility",
      iconName: "down",
      iconVariant: "border-filled",
      onSelect: function onSelect(item) {
        console.log(item.label, 'selected');
      },
      openOn: "click",
      options: [{
        label: 'undo',
        value: 'A0'
      }, {
        label: 'redo',
        value: 'B0'
      }, {
        label: 'activate',
        value: 'C0'
      }]
    })));
  }
});
exports.default = Example; // export is replaced with `ReactDOM.render(<Example />, mountNode);` at runtime