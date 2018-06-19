"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _createReactClass = require("create-react-class");

var _createReactClass2 = _interopRequireDefault(_createReactClass);

var _appLauncher = require("../../../../components/app-launcher");

var _appLauncher2 = _interopRequireDefault(_appLauncher);

var _tile = require("../../../../components/app-launcher/tile");

var _tile2 = _interopRequireDefault(_tile);

var _section = require("../../../../components/app-launcher/section");

var _section2 = _interopRequireDefault(_section);

var _globalNavigationBar = require("../../../../components/global-navigation-bar");

var _globalNavigationBar2 = _interopRequireDefault(_globalNavigationBar);

var _region = require("../../../../components/global-navigation-bar/region");

var _region2 = _interopRequireDefault(_region);

var _icon = require("../../../../components/icon");

var _icon2 = _interopRequireDefault(_icon);

var _button = require("../../../../components/button");

var _button2 = _interopRequireDefault(_button);

var _search = require("../../../../components/input/search");

var _search2 = _interopRequireDefault(_search);

var _iconSettings = require("../../../../components/icon-settings");

var _iconSettings2 = _interopRequireDefault(_iconSettings);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// `~` is replaced with design-system-react at runtime
var Example = (0, _createReactClass2.default)({
  displayName: 'AppLauncherExample',
  render: function render() {
    var search = _react2.default.createElement(_search2.default, {
      onChange: function onChange() {
        console.log('Search term:', event.target.value);
      },
      placeholder: "Find an app",
      assistiveText: "Find an app"
    });

    var headerButton = _react2.default.createElement(_button2.default, {
      label: "App Exchange"
    });

    return _react2.default.createElement(_iconSettings2.default, {
      iconPath: "/assets/icons"
    }, _react2.default.createElement(_globalNavigationBar2.default, null, _react2.default.createElement(_region2.default, {
      region: "primary"
    }, _react2.default.createElement(_appLauncher2.default, {
      triggerName: "App Name",
      search: search,
      modalHeaderButton: headerButton
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
    }))))));
  }
});
exports.default = Example; // export is replaced with `ReactDOM.render(<Example />, mountNode);` at runtime