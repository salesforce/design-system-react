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

var _pageHeader = require("../../../../components/page-header");

var _pageHeader2 = _interopRequireDefault(_pageHeader);

var _button = require("../../../../components/button");

var _button2 = _interopRequireDefault(_button);

var _buttonGroup = require("../../../../components/button-group");

var _buttonGroup2 = _interopRequireDefault(_buttonGroup);

var _dropdown = require("../../../../components/dropdown");

var _dropdown2 = _interopRequireDefault(_dropdown);

var _buttonTrigger = require("../../../../components/menu-dropdown/button-trigger");

var _buttonTrigger2 = _interopRequireDefault(_buttonTrigger);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// `~` is replaced with design-system-react at runtime
var Example = (0, _createReactClass2.default)({
  displayName: 'PageHeaderExample',
  render: function render() {
    var navRight = _react2.default.createElement("div", {
      className: "slds-button-group",
      role: "group"
    }, _react2.default.createElement("button", {
      className: "slds-button slds-button--neutral"
    }, "Add Contact"), _react2.default.createElement("div", {
      className: "slds-button--last"
    }, _react2.default.createElement(_button2.default, {
      iconCategory: "utility",
      iconName: "down",
      variant: "icon",
      iconVariant: "border-filled",
      assistiveText: {
        icon: 'More Actions'
      }
    })));

    var contentRight = _react2.default.createElement("div", null, _react2.default.createElement(_dropdown2.default, {
      align: "right",
      assistiveText: {
        icon: 'Change view'
      },
      iconName: "settings",
      iconVariant: "more",
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
    }, _react2.default.createElement(_buttonTrigger2.default, null, _react2.default.createElement(_button2.default, {
      assistiveText: {
        icon: 'Change view'
      },
      className: "slds-m-right--xx-small",
      iconCategory: "utility",
      iconName: "table",
      iconVariant: "more",
      variant: "icon"
    }))), _react2.default.createElement(_buttonGroup2.default, null, _react2.default.createElement(_button2.default, {
      iconCategory: "utility",
      iconName: "chart",
      variant: "icon",
      iconVariant: "border",
      className: "slds-m-left--xx-small",
      assistiveText: {
        icon: 'Chart'
      }
    }), _react2.default.createElement(_button2.default, {
      iconCategory: "utility",
      iconName: "filterList",
      variant: "icon",
      iconVariant: "border",
      className: "slds-m-left--xx-small",
      assistiveText: {
        icon: 'Filter List'
      }
    }), _react2.default.createElement(_dropdown2.default, {
      triggerClassname: true,
      align: "right",
      assistiveText: {
        icon: 'List View Controls'
      },
      iconName: "sort",
      iconVariant: "more",
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
    })));

    var trail = [_react2.default.createElement("a", {
      href: "javascript:void(0);"
    }, "Accounts"), _react2.default.createElement("a", {
      href: "javascript:void(0);"
    }, "Company One")];
    return _react2.default.createElement(_iconSettings2.default, {
      iconPath: "/assets/icons"
    }, _react2.default.createElement(_pageHeader2.default, {
      title: "Contacts (will truncate)",
      navRight: navRight,
      contentRight: contentRight,
      variant: "objectHome",
      truncate: true,
      trail: trail,
      info: "10 items \u2022 sorted by name"
    }));
  }
});
exports.default = Example; // export is replaced with `ReactDOM.render(<Example />, mountNode);` at runtime