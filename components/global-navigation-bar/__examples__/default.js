"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _iconSettings = require("../../../../components/icon-settings");

var _iconSettings2 = _interopRequireDefault(_iconSettings);

var _globalNavigationBar = require("../../../../components/global-navigation-bar");

var _globalNavigationBar2 = _interopRequireDefault(_globalNavigationBar);

var _region = require("../../../../components/global-navigation-bar/region");

var _region2 = _interopRequireDefault(_region);

var _dropdown = require("../../../../components/global-navigation-bar/dropdown");

var _dropdown2 = _interopRequireDefault(_dropdown);

var _link = require("../../../../components/global-navigation-bar/link");

var _link2 = _interopRequireDefault(_link);

var _button = require("../../../../components/button");

var _button2 = _interopRequireDefault(_button);

var _icon = require("../../../../components/icon");

var _icon2 = _interopRequireDefault(_icon);

var _appLauncher = require("../../../../components/app-launcher");

var _appLauncher2 = _interopRequireDefault(_appLauncher);

var _section = require("../../../../components/app-launcher/section");

var _section2 = _interopRequireDefault(_section);

var _tile = require("../../../../components/app-launcher/tile");

var _tile2 = _interopRequireDefault(_tile);

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
      var dropdownCollection = [{
        label: 'Menu Item One',
        value: '1',
        iconCategory: 'utility',
        iconName: 'table',
        href: 'http://www.google.com'
      }, {
        label: 'Menu Item Two',
        value: '2',
        iconCategory: 'utility',
        iconName: 'kanban',
        href: 'http://www.google.com'
      }, {
        label: 'Menu Item Three',
        value: '3',
        iconCategory: 'utility',
        iconName: 'side_list',
        href: 'http://www.google.com'
      }];
      return _react2.default.createElement(_iconSettings2.default, {
        iconPath: "/assets/icons"
      }, _react2.default.createElement(_globalNavigationBar2.default, null, _react2.default.createElement(_region2.default, {
        region: "primary"
      }, _react2.default.createElement(_appLauncher2.default, {
        triggerName: "App Name",
        onSearch: function onSearch() {
          console.log('Search term:', event.target.value);
        },
        modalHeaderButton: _react2.default.createElement(_button2.default, {
          label: "App Exchange"
        })
      }, _react2.default.createElement(_section2.default, {
        title: "Tile Section"
      }, _react2.default.createElement(_tile2.default, {
        title: "Marketing Cloud",
        iconText: "MC",
        description: "Send emails, track emails, read emails! Emails!"
      }), _react2.default.createElement(_tile2.default, {
        title: "Call Center",
        description: "The key to call center and contact center is not to use too many words!",
        descriptionHeading: "Call Center",
        iconText: "CC"
      })), _react2.default.createElement(_section2.default, {
        title: "Small Tile Section"
      }, _react2.default.createElement(_tile2.default, {
        title: "Journey Builder",
        iconText: "JB",
        size: "small"
      }), _react2.default.createElement(_tile2.default, {
        title: "Sales Cloud",
        iconNode: _react2.default.createElement(_icon2.default, {
          name: "campaign",
          category: "standard",
          size: "large"
        }),
        size: "small"
      })))), _react2.default.createElement(_region2.default, {
        region: "secondary",
        navigation: true
      }, _react2.default.createElement(_link2.default, {
        href: "javascript:void(0);",
        label: "Home",
        id: "home-link"
      }), _react2.default.createElement(_dropdown2.default, {
        id: "primaryDropdown",
        assistiveText: {
          icon: 'Context Menu Item 1'
        },
        label: "Context Menu Item",
        options: dropdownCollection
      }), _react2.default.createElement(_link2.default, {
        href: "javascript:void(0);",
        label: "Context Menu Item 2",
        active: true
      })), _react2.default.createElement(_region2.default, {
        region: "tertiary"
      }, _react2.default.createElement(_link2.default, {
        href: "javascript:void(0);",
        label: "Actions"
      }))));
    }
  }]);

  return Example;
}(_react2.default.Component);

Object.defineProperty(Example, "displayName", {
  configurable: true,
  enumerable: true,
  writable: true,
  value: 'GlobalNavigationBarExample'
});
exports.default = Example; // export is replaced with `ReactDOM.render(<Example />, mountNode);` at runtime