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

var _buttonStateful = require("../../../../components/button-stateful");

var _buttonStateful2 = _interopRequireDefault(_buttonStateful);

var _menuDropdown = require("../../../../components/menu-dropdown");

var _menuDropdown2 = _interopRequireDefault(_menuDropdown);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// `~` is replaced with design-system-react at runtime
var Example = (0, _createReactClass2.default)({
  displayName: 'PageHeaderExample',
  render: function render() {
    var contentRight = _react2.default.createElement("div", null, _react2.default.createElement(_buttonStateful2.default, {
      key: "PageHeaderFollowButton",
      iconSize: "medium",
      stateOne: {
        iconName: 'add',
        label: 'Follow'
      },
      stateTwo: {
        iconName: 'check',
        label: 'Following'
      },
      stateThree: {
        iconName: 'close',
        label: 'Unfollow'
      }
    }), _react2.default.createElement(_buttonGroup2.default, null, _react2.default.createElement(_button2.default, {
      label: "Edit"
    }), _react2.default.createElement(_button2.default, {
      label: "Delete"
    }), _react2.default.createElement(_button2.default, {
      label: "Clone"
    }), _react2.default.createElement(_menuDropdown2.default, {
      align: "right",
      assistiveText: {
        icon: 'More Options'
      },
      iconCategory: "utility",
      iconName: "down",
      iconVariant: "border-filled",
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

    var details = [{
      label: 'Field 1',
      content: 'Description that demonstrates truncation with content. Description that demonstrates truncation with content.',
      truncate: true
    }, {
      label: 'Field 2',
      content: 'Multiple Values'
    }, {
      label: 'Field 3',
      content: _react2.default.createElement("a", {
        href: "javascript:void(0);"
      }, "Hyperlink")
    }, {
      label: 'Field 4',
      content: 'Description (2-line truncation)',
      truncate: true
    }];
    return _react2.default.createElement(_iconSettings2.default, {
      iconPath: "/assets/icons"
    }, _react2.default.createElement(_pageHeader2.default, {
      contentRight: contentRight,
      details: details,
      iconAssistiveText: {
        icon: 'User'
      },
      iconCategory: "standard",
      iconName: "user",
      label: "Record Type",
      title: "Record Title",
      variant: "recordHome"
    }));
  }
});
exports.default = Example; // export is replaced with `ReactDOM.render(<Example />, mountNode);` at runtime