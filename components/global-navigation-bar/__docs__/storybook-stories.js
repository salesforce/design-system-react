"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _react2 = require("@storybook/react");

var _addonActions = require("@storybook/addon-actions");

var _iconSettings = _interopRequireDefault(require("../../icon-settings"));

var _constants = require("../../../utilities/constants");

var _globalNavigationBar = require("../../../utilities/sample-data/global-navigation-bar");

var _globalNavigationBar2 = _interopRequireDefault(require("../../global-navigation-bar"));

var _region = _interopRequireDefault(require("../../global-navigation-bar/region"));

var _dropdown = _interopRequireDefault(require("../../global-navigation-bar/dropdown"));

var _link = _interopRequireDefault(require("../../global-navigation-bar/link"));

var _label = _interopRequireDefault(require("../../global-navigation-bar/label"));

var _button = _interopRequireDefault(require("../../global-navigation-bar/button"));

var _appLauncher = _interopRequireDefault(require("../../app-launcher"));

var _section = _interopRequireDefault(require("../../app-launcher/section"));

var _tile = _interopRequireDefault(require("../../app-launcher/tile"));

var _default2 = _interopRequireDefault(require("../__examples__/default"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

// aliased to allow copy and paste from component tests
var buttonClicked = _addonActions.action;
var dropdownItemClicked = _addonActions.action;
var linkClicked = _addonActions.action;
var searchClicked = _addonActions.action;
var dropdownCollection = [{
  label: 'Main action',
  value: '0',
  iconCategory: 'utility',
  iconName: 'table',
  href: 'http://www.google.com'
}, {
  label: 'Menu Header',
  type: 'header',
  divider: 'top'
}, {
  label: 'Menu Item One',
  value: '1',
  iconCategory: 'utility',
  iconName: 'kanban',
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
}, {
  label: 'Menu Item Four',
  value: '4',
  iconCategory: 'utility',
  iconName: 'side_list',
  href: 'http://www.google.com'
}, {
  type: 'divider'
}, {
  label: 'Menu Item Five',
  value: '5',
  iconCategory: 'utility',
  iconName: 'side_list',
  href: 'http://www.google.com'
}];
/* eslint-disable react/display-name */

var getGlobalNavigationBar = function getGlobalNavigationBar(props, primaryRegionProps) {
  return _react.default.createElement(_globalNavigationBar2.default, props, _react.default.createElement(_region.default, _extends({
    region: "primary"
  }, primaryRegionProps), _react.default.createElement(_appLauncher.default, {
    onSearch: searchClicked('App Launcher searched'),
    assistiveText: {
      trigger: 'Open App Launcher'
    },
    id: "app-launcher-trigger",
    triggerName: "App Name"
  }, _react.default.createElement(_section.default, {
    title: "All Items"
  }, _react.default.createElement(_tile.default, {
    title: "Marketing Cloud",
    iconText: "MC",
    description: "Send emails, track emails, read emails! Emails!",
    onClick: (0, _addonActions.action)('Tile clicked!')
  })))), _react.default.createElement(_region.default, {
    region: "secondary",
    navigation: true
  }, _react.default.createElement(_link.default, {
    href: "https://www.lightningdesignsystem.com/",
    label: "Home",
    id: "home-link",
    onClick: linkClicked('Home link clicked. Actual href should be ignored'),
    onKeyDown: function onKeyDown(e) {
      console.log(e.target);
    }
  }), _react.default.createElement(_dropdown.default, {
    assistiveText: {
      icon: 'Open Menu Item 1'
    },
    id: "primaryDropdown",
    label: "Menu Item",
    openOn: props.openOn || undefined,
    onSelect: dropdownItemClicked('Dropdown Menu Item clicked'),
    options: dropdownCollection
  }), _react.default.createElement(_link.default // will actually go to website
  , {
    active: true,
    href: "https://www.lightningdesignsystem.com/",
    label: "Menu Item"
  })), _react.default.createElement(_region.default, {
    region: "tertiary"
  }, _react.default.createElement(_button.default, {
    label: "Button",
    onClick: buttonClicked('Button clicked')
  }), _react.default.createElement(_link.default, {
    label: "Actions",
    onClick: buttonClicked('Link clicked')
  }), _react.default.createElement(_label.default, {
    dividerPosition: "left",
    label: "Vandelay Enterprises"
  })));
};

var getGlobalNavigationBarCustomCloud = function getGlobalNavigationBarCustomCloud(props, primaryRegionProps) {
  return _react.default.createElement(_globalNavigationBar2.default, props, _react.default.createElement(_region.default, _extends({
    region: "primary"
  }, primaryRegionProps), _react.default.createElement(_appLauncher.default, _extends({
    onSearch: searchClicked('App Launcher searched')
  }, primaryRegionProps.appLauncher), _react.default.createElement(_section.default, {
    title: "All Items"
  }, _react.default.createElement(_tile.default, {
    title: "Marketing Cloud",
    iconText: "MC",
    description: "Send emails, track emails, read emails! Emails!",
    onClick: (0, _addonActions.action)('Tile clicked!')
  })))), _react.default.createElement(_region.default, {
    region: "secondary",
    navigation: true
  }, _react.default.createElement(_link.default, {
    label: "Overview",
    id: "overview-link",
    onClick: linkClicked('Overview link clicked')
  }), _react.default.createElement(_dropdown.default, {
    id: "contentDropdown",
    label: "Content",
    onSelect: dropdownItemClicked('Content Menu Item clicked'),
    options: dropdownCollection
  }), _react.default.createElement(_dropdown.default, {
    id: "subscribersDropdown",
    label: "Subscribers",
    onSelect: dropdownItemClicked('Subscribers Menu Item clicked'),
    options: dropdownCollection
  }), _react.default.createElement(_dropdown.default, {
    id: "interactionDropdown",
    label: "Interaction",
    onSelect: dropdownItemClicked('Interaction Menu Item clicked'),
    options: dropdownCollection
  }), _react.default.createElement(_link.default, {
    label: "A/B Testing",
    onClick: linkClicked('A/B Testing Link clicked')
  }), _react.default.createElement(_dropdown.default, {
    id: "trackingDropdown",
    label: "Tracking",
    onSelect: dropdownItemClicked('Tracking Menu Item clicked'),
    options: dropdownCollection
  }), _react.default.createElement(_link.default, {
    label: "Admin",
    onClick: linkClicked('Admin Link clicked')
  }), _react.default.createElement(_link.default, {
    label: "Audience Builder",
    onClick: linkClicked('Audience Builder Link clicked')
  })), _react.default.createElement(_region.default, {
    region: "tertiary"
  }, _react.default.createElement(_link.default, {
    label: "Actions",
    onClick: linkClicked('Link clicked')
  })));
};

var getGlobalNavigationBarCustomCloudOverviewActive = function getGlobalNavigationBarCustomCloudOverviewActive(props, primaryRegionProps) {
  return _react.default.createElement(_globalNavigationBar2.default, props, _react.default.createElement(_region.default, {
    region: "primary"
  }, _react.default.createElement(_appLauncher.default, _extends({
    onSearch: searchClicked('App Launcher searched')
  }, primaryRegionProps.appLauncher), _react.default.createElement(_section.default, {
    title: "All Items"
  }, _react.default.createElement(_tile.default, {
    title: "Marketing Cloud",
    iconText: "MC",
    description: "Send emails, track emails, read emails! Emails!",
    onClick: (0, _addonActions.action)('Tile clicked!')
  })))), _react.default.createElement(_region.default, {
    region: "secondary",
    navigation: true
  }, _react.default.createElement(_link.default, {
    label: "Overview",
    id: "overview-link",
    active: true,
    activeBackgroundColor: "#ffffff",
    onClick: linkClicked('Overview link clicked')
  }), _react.default.createElement(_dropdown.default, {
    id: "contentDropdown",
    label: "Content",
    onSelect: dropdownItemClicked('Content Menu Item clicked'),
    options: dropdownCollection
  }), _react.default.createElement(_dropdown.default, {
    id: "subscribersDropdown",
    label: "Subscribers",
    onSelect: dropdownItemClicked('Subscribers Menu Item clicked'),
    options: dropdownCollection
  }), _react.default.createElement(_dropdown.default, {
    active: true,
    activeBackgroundColor: "#ffffff",
    id: "interactionDropdown",
    label: "Interaction",
    onSelect: dropdownItemClicked('Interaction Menu Item clicked'),
    options: dropdownCollection
  }), _react.default.createElement(_link.default, {
    label: "A/B Testing",
    onClick: linkClicked('A/B Testing Link clicked')
  }), _react.default.createElement(_dropdown.default, {
    id: "trackingDropdown",
    label: "Tracking",
    onSelect: dropdownItemClicked('Tracking Menu Item clicked'),
    options: dropdownCollection
  }), _react.default.createElement(_link.default, {
    label: "Admin",
    onClick: linkClicked('Admin Link clicked')
  }), _react.default.createElement(_link.default, {
    label: "Audience Builder",
    onClick: linkClicked('Audience Builder Link clicked')
  })), _react.default.createElement(_region.default, {
    region: "tertiary"
  }, _react.default.createElement(_link.default, {
    label: "Actions",
    onClick: linkClicked('Link clicked')
  })));
};

var getGlobalNavigationBarNoNav = function getGlobalNavigationBarNoNav(props, primaryRegionProps) {
  return _react.default.createElement(_globalNavigationBar2.default, props, _react.default.createElement(_region.default, _extends({
    region: "primary"
  }, primaryRegionProps), _react.default.createElement(_appLauncher.default, {
    onSearch: searchClicked('App Launcher searched'),
    assistiveText: {
      trigger: 'Open App Launcher'
    },
    id: "app-launcher-trigger",
    triggerName: "App Name"
  }, _react.default.createElement(_section.default, {
    title: "All Items"
  }, _react.default.createElement(_tile.default, {
    title: "Marketing Cloud",
    iconText: "MC",
    description: "Send emails, track emails, read emails! Emails!",
    onClick: (0, _addonActions.action)('Tile clicked!')
  })))));
};

(0, _react2.storiesOf)(_constants.GLOBAL_NAVIGATION_BAR, module).addDecorator(function (getStory) {
  return _react.default.createElement("div", {
    className: "slds-p-around_medium"
  }, _react.default.createElement(_iconSettings.default, {
    iconPath: "/assets/icons"
  }, getStory()));
}).add('Base', function () {
  return getGlobalNavigationBar(_globalNavigationBar.propSets.base.props, _globalNavigationBar.propSets.base.primaryRegionProps);
}).add('Custom Cloud', function () {
  return getGlobalNavigationBarCustomCloud(_globalNavigationBar.propSets.customCloud.props, _globalNavigationBar.propSets.customCloud.primaryRegionProps);
}).add('Custom Cloud (Multiple active and white)', function () {
  return getGlobalNavigationBarCustomCloudOverviewActive(_globalNavigationBar.propSets.customCloud.props, _globalNavigationBar.propSets.customCloud.primaryRegionProps);
}).add('No Secondary Navigation', function () {
  return getGlobalNavigationBarNoNav(_globalNavigationBar.propSets.noNav.props, _globalNavigationBar.propSets.noNav.primaryRegionProps);
}).add('Hybrid Dropdown', function () {
  return getGlobalNavigationBar(_globalNavigationBar.propSets.hybrid.props, _globalNavigationBar.propSets.base.primaryRegionProps);
}).add('Doc site Default', function () {
  return _react.default.createElement(_default2.default, null);
});
var _default = getGlobalNavigationBar;
exports.default = _default;