"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _iconSettings = _interopRequireDefault(require("../../../../components/icon-settings"));

var _pageHeader = _interopRequireDefault(require("../../../../components/page-header"));

var _button = _interopRequireDefault(require("../../../../components/button"));

var _buttonGroup = _interopRequireDefault(require("../../../../components/button-group"));

var _menuDropdown = _interopRequireDefault(require("../../../../components/menu-dropdown"));

var _buttonTrigger = _interopRequireDefault(require("../../../../components/menu-dropdown/button-trigger"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Example =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Example, _React$Component);

  function Example() {
    _classCallCheck(this, Example);

    return _possibleConstructorReturn(this, _getPrototypeOf(Example).apply(this, arguments));
  }

  _createClass(Example, [{
    key: "render",
    value: function render() {
      var controls = function controls() {
        return _react.default.createElement("div", null, _react.default.createElement(_buttonGroup.default, null, _react.default.createElement(_button.default, {
          label: "New Lead"
        }), _react.default.createElement(_button.default, {
          label: "Import Leads"
        }), _react.default.createElement(_menuDropdown.default, {
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
      };

      var actions = function actions() {
        return _react.default.createElement("div", null, _react.default.createElement(_menuDropdown.default, {
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
        }, _react.default.createElement(_buttonTrigger.default, null, _react.default.createElement(_button.default, {
          assistiveText: {
            icon: 'List View Controls'
          },
          className: "slds-m-right_xx-small",
          iconCategory: "utility",
          iconName: "settings",
          iconVariant: "more"
        }))), _react.default.createElement(_menuDropdown.default, {
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
        }, _react.default.createElement(_buttonTrigger.default, null, _react.default.createElement(_button.default, {
          assistiveText: {
            icon: 'Change view'
          },
          className: "slds-m-right_xx-small",
          iconCategory: "utility",
          iconName: "table",
          iconVariant: "more",
          variant: "icon"
        }))), _react.default.createElement(_button.default, {
          assistiveText: {
            icon: 'Edit List'
          },
          iconCategory: "utility",
          iconName: "edit",
          iconVariant: "border",
          variant: "icon"
        }), _react.default.createElement(_button.default, {
          assistiveText: {
            icon: 'Refresh'
          },
          iconCategory: "utility",
          iconName: "refresh",
          iconVariant: "border",
          variant: "icon"
        }), _react.default.createElement(_buttonGroup.default, null, _react.default.createElement(_button.default, {
          assistiveText: {
            icon: 'Charts'
          },
          iconCategory: "utility",
          iconName: "chart",
          iconVariant: "border",
          variant: "icon"
        }), _react.default.createElement(_button.default, {
          assistiveText: {
            icon: 'Filters'
          },
          iconCategory: "utility",
          iconName: "filterList",
          iconVariant: "border",
          variant: "icon"
        })));
      };

      return _react.default.createElement(_iconSettings.default, {
        iconPath: "/assets/icons"
      }, _react.default.createElement(_pageHeader.default, {
        onRenderActions: actions,
        iconAssistiveText: "User",
        iconCategory: "standard",
        iconName: "lead",
        info: "10 items \u2022 sorted by name",
        label: "Leads",
        onRenderControls: controls,
        title: _react.default.createElement("h1", {
          className: "slds-page-header__title slds-p-right_x-small"
        }, _react.default.createElement(_menuDropdown.default, {
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
        }, _react.default.createElement(_buttonTrigger.default, null, _react.default.createElement(_button.default, {
          className: "slds-button_reset slds-type-focus",
          iconCategory: "utility",
          iconName: "down",
          iconPosition: "right",
          label: "Dropdown",
          responsive: true,
          variant: "base"
        })))),
        truncate: true,
        variant: "object-home"
      }));
    }
  }]);

  return Example;
}(_react.default.Component);

_defineProperty(Example, "displayName", 'ObjectHomePageHeaderExample');

var _default = Example; // export is replaced with `ReactDOM.render(<Example />, mountNode);` at runtime

exports.default = _default;