"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _iconSettings = require("../../../../components/icon-settings");

var _iconSettings2 = _interopRequireDefault(_iconSettings);

var _pageHeader = require("../../../../components/page-header");

var _pageHeader2 = _interopRequireDefault(_pageHeader);

var _button = require("../../../../components/button");

var _button2 = _interopRequireDefault(_button);

var _buttonGroup = require("../../../../components/button-group");

var _buttonGroup2 = _interopRequireDefault(_buttonGroup);

var _menuDropdown = require("../../../../components/menu-dropdown");

var _menuDropdown2 = _interopRequireDefault(_menuDropdown);

var _buttonTrigger = require("../../../../components/menu-dropdown/button-trigger");

var _buttonTrigger2 = _interopRequireDefault(_buttonTrigger);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Example =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Example, _React$Component);

  function Example() {
    _classCallCheck(this, Example);

    return _possibleConstructorReturn(this, (Example.__proto__ || Object.getPrototypeOf(Example)).apply(this, arguments));
  }

  _createClass(Example, [{
    key: "render",
    value: function render() {
      var navRight = _react2.default.createElement("div", {
        className: "slds-button-group",
        role: "group"
      }, _react2.default.createElement("button", {
        className: "slds-button slds-button_neutral"
      }, "Add Contact"), _react2.default.createElement("div", {
        className: "slds-button_last"
      }, _react2.default.createElement(_button2.default, {
        iconCategory: "utility",
        iconName: "down",
        variant: "icon",
        iconVariant: "border-filled",
        assistiveText: {
          icon: 'More Actions'
        }
      })));

      var contentRight = _react2.default.createElement("div", null, _react2.default.createElement(_menuDropdown2.default, {
        align: "right",
        assistiveText: {
          icon: 'Change view'
        },
        iconCategory: "utility",
        iconName: "settings",
        iconVariant: "more",
        id: "content-right-dropdown",
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
        className: "slds-m-right_xx-small",
        iconCategory: "utility",
        iconName: "table",
        iconVariant: "more",
        variant: "icon"
      }))), _react2.default.createElement(_buttonGroup2.default, null, _react2.default.createElement(_button2.default, {
        iconCategory: "utility",
        iconName: "chart",
        variant: "icon",
        iconVariant: "border",
        className: "slds-m-left_xx-small",
        assistiveText: {
          icon: 'Chart'
        }
      }), _react2.default.createElement(_button2.default, {
        iconCategory: "utility",
        iconName: "filterList",
        variant: "icon",
        iconVariant: "border",
        className: "slds-m-left_xx-small",
        assistiveText: {
          icon: 'Filter List'
        }
      }), _react2.default.createElement(_menuDropdown2.default, {
        triggerClassname: true,
        align: "right",
        assistiveText: {
          icon: 'List View Controls'
        },
        iconCategory: "utility",
        iconName: "sort",
        iconVariant: "more",
        id: "content-right-dropdown-2",
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
  }]);

  return Example;
}(_react2.default.Component);

Object.defineProperty(Example, "displayName", {
  configurable: true,
  enumerable: true,
  writable: true,
  value: 'RelatedListPageHeaderExample'
});
exports.default = Example; // export is replaced with `ReactDOM.render(<Example />, mountNode);` at runtime