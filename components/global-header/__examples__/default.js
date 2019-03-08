"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _iconSettings = require("../../../../components/icon-settings");

var _iconSettings2 = _interopRequireDefault(_iconSettings);

var _globalHeader = require("../../../../components/global-header");

var _globalHeader2 = _interopRequireDefault(_globalHeader);

var _button = require("../../../../components/global-header/button");

var _button2 = _interopRequireDefault(_button);

var _dropdown = require("../../../../components/global-header/dropdown");

var _dropdown2 = _interopRequireDefault(_dropdown);

var _profile = require("../../../../components/global-header/profile");

var _profile2 = _interopRequireDefault(_profile);

var _search = require("../../../../components/global-header/search");

var _search2 = _interopRequireDefault(_search);

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
      return _react2.default.createElement(_iconSettings2.default, {
        iconPath: "/assets/icons"
      }, _react2.default.createElement(_globalHeader2.default, {
        logoSrc: "/images/logo.svg",
        onSkipToContent: function onSkipToContent() {
          console.log('>>> Skip to Content Clicked');
        },
        onSkipToNav: function onSkipToNav() {
          console.log('>>> Skip to Nav Clicked');
        }
      }, _react2.default.createElement(_search2.default, {
        placeholder: "Search Salesforce",
        onSelect: function onSelect() {
          console.log('>>> onSelect');
        },
        options: [{
          label: 'Email'
        }, {
          label: 'Mobile'
        }]
      }), _react2.default.createElement(_button2.default, {
        className: "slds-m-right_small",
        iconVariant: null,
        label: "Feedback",
        onClick: function onClick() {
          console.log('>>> onClick');
        },
        variant: "neutral"
      }), _react2.default.createElement(_dropdown2.default, {
        assistiveText: {
          icon: 'Global Actions'
        },
        id: "global-header-dropdown-example",
        iconCategory: "utility",
        iconName: "add",
        onSelect: function onSelect() {
          console.log('>>> onSelect');
        },
        options: [{
          label: 'New Note'
        }, {
          label: 'Log a Call'
        }]
      }), _react2.default.createElement(_button2.default, {
        assistiveText: {
          icon: 'Help and Training'
        },
        iconCategory: "utility",
        iconName: "question",
        onClick: function onClick() {
          console.log('>>> onClick');
        }
      }), _react2.default.createElement(_button2.default, {
        assistiveText: {
          icon: 'Setup'
        },
        iconCategory: "utility",
        iconName: "settings",
        onClick: function onClick() {
          console.log('>>> onClick');
        }
      }), _react2.default.createElement(_profile2.default, {
        avatar: "/images/avatar2.jpg",
        id: "global-header-profile-example",
        onClick: function onClick() {
          console.log('>>> onClick');
        },
        onSelect: function onSelect() {
          console.log('>>> onSelect');
        },
        options: [{
          label: 'Profile Menu'
        }]
      })));
    }
  }]);

  return Example;
}(_react2.default.Component);

Object.defineProperty(Example, "displayName", {
  configurable: true,
  enumerable: true,
  writable: true,
  value: 'GlobalHeaderExample'
});
exports.default = Example; // export is replaced with `ReactDOM.render(<Example />, mountNode);` at runtime