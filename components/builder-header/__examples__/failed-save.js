"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _iconSettings = _interopRequireDefault(require("../../icon-settings"));

var _button = _interopRequireDefault(require("../../button"));

var _buttonGroup = _interopRequireDefault(require("../../button-group"));

var _icon = _interopRequireDefault(require("../../icon"));

var _menuDropdown = _interopRequireDefault(require("../../menu-dropdown"));

var _tooltip = _interopRequireDefault(require("../../tooltip"));

var _ = _interopRequireDefault(require(".."));

var _nav = _interopRequireDefault(require("../nav"));

var _navLink = _interopRequireDefault(require("../nav-link"));

var _navDropdown = _interopRequireDefault(require("../nav-dropdown"));

var _toolbar = _interopRequireDefault(require("../toolbar"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Example = function Example(props) {
  return _react.default.createElement(_iconSettings.default, {
    iconPath: "/assets/icons"
  }, _react.default.createElement(_.default, {
    assistiveText: {
      backIcon: 'Back',
      helpIcon: 'Help',
      icon: 'Builder'
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
  })), _react.default.createElement(_toolbar.default, {
    assistiveText: {
      actions: 'Document Actions'
    },
    onRenderActions: function onRenderActions() {
      return _react.default.createElement("div", null, _react.default.createElement(_tooltip.default, {
        id: "status-tooltip",
        align: "bottom",
        content: "Last modified on June 1, 2018 by SysAdmin"
      }, _react.default.createElement("span", {
        className: "slds-color__text_gray-10 slds-align-middle slds-m-right_x-small"
      }, "Saved 45 mins ago")), _react.default.createElement(_icon.default, {
        category: "utility",
        className: "slds-m-right_xx-small",
        name: "warning",
        size: "x-small",
        style: {
          fill: '#FFB75D'
        }
      }), _react.default.createElement(_icon.default, {
        category: "utility",
        className: "slds-m-right_small",
        name: "error",
        size: "x-small",
        style: {
          fill: '#C23A34'
        }
      }), _react.default.createElement(_button.default, {
        iconCategory: "utility",
        iconName: "right",
        iconPosition: "left",
        label: "Run"
      }), _react.default.createElement(_button.default, {
        label: "Save As"
      }), _react.default.createElement(_button.default, {
        label: "Save",
        variant: "brand"
      }));
    }
  }, _react.default.createElement(_buttonGroup.default, {
    label: "Canvas Actions"
  }, _react.default.createElement(_button.default, {
    assistiveText: {
      icon: 'Undo'
    },
    iconCategory: "utility",
    iconName: "undo",
    iconVariant: "border",
    variant: "icon"
  }), _react.default.createElement(_button.default, {
    assistiveText: {
      icon: 'Redo'
    },
    iconCategory: "utility",
    iconName: "redo",
    iconVariant: "border",
    variant: "icon"
  })), _react.default.createElement(_buttonGroup.default, {
    label: "Edit Actions"
  }, _react.default.createElement(_button.default, {
    assistiveText: {
      icon: 'Cut'
    },
    iconCategory: "utility",
    iconName: "cut",
    iconVariant: "border",
    variant: "icon"
  }), _react.default.createElement(_button.default, {
    assistiveText: {
      icon: 'Copy'
    },
    iconCategory: "utility",
    iconName: "copy",
    iconVariant: "border",
    variant: "icon"
  }), _react.default.createElement(_button.default, {
    assistiveText: {
      icon: 'Paste'
    },
    iconCategory: "utility",
    iconName: "paste",
    iconVariant: "border",
    variant: "icon"
  })))));
};

Example.displayName = 'BuilderHeaderFailedSave';
var _default = Example; // export is replaced with `ReactDOM.render(<Example />, mountNode);` at runtime

exports.default = _default;