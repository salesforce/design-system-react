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

// `~` is replaced with design-system-react at runtime
var Example = (0, _createReactClass2.default)({
  displayName: 'GlobalHeaderExample',
  render: function render() {
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
      className: "slds-m-right--small",
      iconVariant: null,
      label: "Feedback",
      onClick: function onClick() {
        console.log('>>> onClick');
      },
      variant: "neutral"
    }), _react2.default.createElement(_dropdown2.default, {
      assistiveText: "Global Actions",
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
      iconName: "question",
      onClick: function onClick() {
        console.log('>>> onClick');
      }
    }), _react2.default.createElement(_button2.default, {
      assistiveText: {
        icon: 'Setup'
      },
      iconName: "settings",
      onClick: function onClick() {
        console.log('>>> onClick');
      }
    }), _react2.default.createElement(_profile2.default, {
      avatar: "/images/avatar2.jpg",
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
});
exports.default = Example; // export is replaced with `ReactDOM.render(<Example />, mountNode);` at runtime