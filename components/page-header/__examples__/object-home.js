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
      var navRight = _react2.default.createElement("div", null, _react2.default.createElement(_buttonGroup2.default, null, _react2.default.createElement(_button2.default, {
        label: "New Lead"
      }), _react2.default.createElement(_button2.default, {
        label: "Import Leads"
      }), _react2.default.createElement(_menuDropdown2.default, {
        align: "right",
        assistiveText: {
          icon: 'More Options'
        },
        iconCategory: "utility",
        iconName: "down",
        iconVariant: "border-filled",
        id: "page-header-dropdown-object-home-nav-right",
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

      var contentRight = _react2.default.createElement("div", null, _react2.default.createElement(_menuDropdown2.default, {
        align: "right",
        id: "page-header-dropdown-object-home-content-right",
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
          icon: 'List View Controls'
        },
        className: "slds-m-right_xx-small",
        iconCategory: "utility",
        iconName: "settings",
        iconVariant: "more"
      }))), _react2.default.createElement(_menuDropdown2.default, {
        align: "right",
        assistiveText: {
          icon: 'Change view'
        },
        iconCategory: "utility",
        iconName: "settings",
        iconVariant: "more",
        id: "page-header-dropdown-object-home-content-right-2",
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
      }))), _react2.default.createElement(_button2.default, {
        assistiveText: {
          icon: 'Edit List'
        },
        iconCategory: "utility",
        iconName: "edit",
        iconVariant: "border",
        variant: "icon"
      }), _react2.default.createElement(_button2.default, {
        assistiveText: {
          icon: 'Refresh'
        },
        iconCategory: "utility",
        iconName: "refresh",
        iconVariant: "border",
        variant: "icon"
      }), _react2.default.createElement("div", null, _react2.default.createElement(_buttonGroup2.default, null, _react2.default.createElement(_button2.default, {
        assistiveText: {
          icon: 'Charts'
        },
        iconCategory: "utility",
        iconName: "chart",
        iconVariant: "border",
        variant: "icon"
      }), _react2.default.createElement(_button2.default, {
        assistiveText: {
          icon: 'Filters'
        },
        iconCategory: "utility",
        iconName: "filterList",
        iconVariant: "border",
        variant: "icon"
      }))));

      return _react2.default.createElement(_iconSettings2.default, {
        iconPath: "/assets/icons"
      }, _react2.default.createElement(_pageHeader2.default, {
        contentRight: contentRight,
        iconAssistiveText: "User",
        iconCategory: "standard",
        iconName: "lead",
        info: "10 items \u2022 sorted by name",
        label: "Leads",
        navRight: navRight,
        title: _react2.default.createElement("h1", {
          className: "slds-page-header__title slds-p-right_x-small"
        }, _react2.default.createElement(_menuDropdown2.default, {
          id: "page-header-dropdown-object-home-header",
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
          className: "slds-button_reset slds-type-focus",
          iconCategory: "utility",
          iconName: "down",
          iconPosition: "right",
          label: "Dropdown",
          responsive: true,
          variant: "base"
        })))),
        truncate: true,
        variant: "objectHome"
      }));
    }
  }]);

  return Example;
}(_react2.default.Component);

Object.defineProperty(Example, "displayName", {
  configurable: true,
  enumerable: true,
  writable: true,
  value: 'ObjectHomePageHeaderExample'
});
exports.default = Example; // export is replaced with `ReactDOM.render(<Example />, mountNode);` at runtime