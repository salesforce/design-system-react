"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _iconSettings = _interopRequireDefault(require("../../icon-settings"));

var _button = _interopRequireDefault(require("../../button"));

var _buttonGroup = _interopRequireDefault(require("../../button-group"));

var _menuDropdown = _interopRequireDefault(require("../../menu-dropdown"));

var _builderHeader = _interopRequireDefault(require("../../builder-header"));

var _nav = _interopRequireDefault(require("../../builder-header/nav"));

var _navDropdown = _interopRequireDefault(require("../../builder-header/nav-dropdown"));

var _navLink = _interopRequireDefault(require("../../builder-header/nav-link"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Example = function Example(props) {
  return _react.default.createElement(_iconSettings.default, {
    iconPath: "/assets/icons"
  }, _react.default.createElement(_builderHeader.default, {
    assistiveText: {
      icon: 'Builder',
      backIcon: 'Back',
      helpIcon: 'Help'
    },
    labels: {
      back: 'Back',
      help: 'Help',
      pageType: 'Page Type',
      title: 'App Name'
    },
    style: {
      position: 'relative'
    }
  }, _react.default.createElement(_nav.default, null, _react.default.createElement(_navLink.default, {
    assistiveText: {
      label: 'Link'
    },
    iconCategory: "utility",
    iconName: "settings",
    label: "Link"
  }), _react.default.createElement(_navDropdown.default, {
    assistiveText: {
      icon: 'Dropdown'
    },
    iconCategory: "utility",
    iconName: "page",
    id: "dropdown",
    label: "Dropdown",
    options: [{
      label: 'Menu Item One',
      value: 'A0'
    }, {
      label: 'Menu Item Two',
      value: 'B0'
    }]
  }))));
};

Example.displayName = 'BuilderHeaderBase';
var _default = Example; // export is replaced with `ReactDOM.render(<Example />, mountNode);` at runtime

exports.default = _default;