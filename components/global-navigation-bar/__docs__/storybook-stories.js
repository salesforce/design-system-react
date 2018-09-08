"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _react3 = require("@storybook/react");

var _iconSettings = require("../../icon-settings");

var _iconSettings2 = _interopRequireDefault(_iconSettings);

var _constants = require("../../../utilities/constants");

var _globalNavigationBar = require("../../../utilities/sample-data/global-navigation-bar");

var _globalNavigationBar2 = require("../../global-navigation-bar");

var _globalNavigationBar3 = _interopRequireDefault(_globalNavigationBar2);

var _region = require("../../global-navigation-bar/region");

var _region2 = _interopRequireDefault(_region);

var _dropdown = require("../../global-navigation-bar/dropdown");

var _dropdown2 = _interopRequireDefault(_dropdown);

var _link = require("../../global-navigation-bar/link");

var _link2 = _interopRequireDefault(_link);

var _label = require("../../global-navigation-bar/label");

var _label2 = _interopRequireDefault(_label);

var _button = require("../../global-navigation-bar/button");

var _button2 = _interopRequireDefault(_button);

var _appLauncher = require("../../app-launcher");

var _appLauncher2 = _interopRequireDefault(_appLauncher);

var _section = require("../../app-launcher/section");

var _section2 = _interopRequireDefault(_section);

var _tile = require("../../app-launcher/tile");

var _tile2 = _interopRequireDefault(_tile);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

// aliased to allow copy and paste from component tests
var buttonClicked = _react3.action;
var dropdownItemClicked = _react3.action;
var linkClicked = _react3.action;
var searchClicked = _react3.action;
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
  return _react2.default.createElement(_globalNavigationBar3.default, props, _react2.default.createElement(_region2.default, _extends({
    region: "primary"
  }, primaryRegionProps), _react2.default.createElement(_appLauncher2.default, {
    onSearch: searchClicked('App Launcher searched'),
    assistiveText: {
      trigger: 'Open App Launcher'
    },
    id: "app-launcher-trigger",
    triggerName: "App Name"
  }, _react2.default.createElement(_section2.default, {
    title: "All Items"
  }, _react2.default.createElement(_tile2.default, {
    title: "Marketing Cloud",
    iconText: "MC",
    description: "Send emails, track emails, read emails! Emails!",
    onClick: (0, _react3.action)('Tile clicked!')
  })))), _react2.default.createElement(_region2.default, {
    region: "secondary",
    navigation: true
  }, _react2.default.createElement(_link2.default // will actually go to website
  , {
    href: "https://www.lightningdesignsystem.com/",
    label: "Home",
    id: "home-link",
    onClick: linkClicked('Home link clicked. Actual href should be ignored'),
    onKeyDown: function onKeyDown(e) {
      console.log(e.target);
    }
  }), _react2.default.createElement(_dropdown2.default, {
    assistiveText: {
      icon: 'Open Menu Item 1'
    },
    id: "primaryDropdown",
    label: "Menu Item",
    openOn: props.openOn || undefined,
    onSelect: dropdownItemClicked('Dropdown Menu Item clicked'),
    options: dropdownCollection
  }), _react2.default.createElement(_link2.default, {
    href: "https://www.lightningdesignsystem.com/",
    label: "Menu Item"
  }), _react2.default.createElement(_link2.default, {
    active: true,
    label: "Menu Item",
    onClick: linkClicked('Link clicked')
  }), _react2.default.createElement(_link2.default, {
    label: "Menu Item",
    onClick: linkClicked('Link clicked')
  })), _react2.default.createElement(_region2.default, {
    region: "tertiary"
  }, _react2.default.createElement(_button2.default, {
    label: "Button",
    onClick: buttonClicked('Button clicked')
  }), _react2.default.createElement(_link2.default, {
    label: "Actions",
    onClick: buttonClicked('Link clicked')
  }), _react2.default.createElement(_label2.default, {
    dividerPosition: "left",
    label: "Vandelay Enterprises"
  })));
};

var getGlobalNavigationBarCustomCloud = function getGlobalNavigationBarCustomCloud(props, primaryRegionProps) {
  return _react2.default.createElement(_globalNavigationBar3.default, props, _react2.default.createElement(_region2.default, _extends({
    region: "primary"
  }, primaryRegionProps), _react2.default.createElement(_appLauncher2.default, _extends({
    onSearch: searchClicked('App Launcher searched')
  }, primaryRegionProps.appLauncher), _react2.default.createElement(_section2.default, {
    title: "All Items"
  }, _react2.default.createElement(_tile2.default, {
    title: "Marketing Cloud",
    iconText: "MC",
    description: "Send emails, track emails, read emails! Emails!",
    onClick: (0, _react3.action)('Tile clicked!')
  })))), _react2.default.createElement(_region2.default, {
    region: "secondary",
    navigation: true
  }, _react2.default.createElement(_link2.default, {
    label: "Overview",
    id: "overview-link",
    onClick: linkClicked('Overview link clicked')
  }), _react2.default.createElement(_dropdown2.default, {
    id: "contentDropdown",
    label: "Content",
    onSelect: dropdownItemClicked('Content Menu Item clicked'),
    options: dropdownCollection
  }), _react2.default.createElement(_dropdown2.default, {
    id: "subscribersDropdown",
    label: "Subscribers",
    onSelect: dropdownItemClicked('Subscribers Menu Item clicked'),
    options: dropdownCollection
  }), _react2.default.createElement(_dropdown2.default, {
    id: "interactionDropdown",
    label: "Interaction",
    onSelect: dropdownItemClicked('Interaction Menu Item clicked'),
    options: dropdownCollection
  }), _react2.default.createElement(_link2.default, {
    label: "A/B Testing",
    onClick: linkClicked('A/B Testing Link clicked')
  }), _react2.default.createElement(_dropdown2.default, {
    id: "trackingDropdown",
    label: "Tracking",
    onSelect: dropdownItemClicked('Tracking Menu Item clicked'),
    options: dropdownCollection
  }), _react2.default.createElement(_link2.default, {
    label: "Admin",
    onClick: linkClicked('Admin Link clicked')
  }), _react2.default.createElement(_link2.default, {
    label: "Audience Builder",
    onClick: linkClicked('Audience Builder Link clicked')
  })), _react2.default.createElement(_region2.default, {
    region: "tertiary"
  }, _react2.default.createElement(_link2.default, {
    label: "Actions",
    onClick: linkClicked('Link clicked')
  })));
};

var getGlobalNavigationBarCustomCloudOverviewActive = function getGlobalNavigationBarCustomCloudOverviewActive(props, primaryRegionProps) {
  return _react2.default.createElement(_globalNavigationBar3.default, props, _react2.default.createElement(_region2.default, {
    region: "primary"
  }, _react2.default.createElement(_appLauncher2.default, _extends({
    onSearch: searchClicked('App Launcher searched')
  }, primaryRegionProps.appLauncher), _react2.default.createElement(_section2.default, {
    title: "All Items"
  }, _react2.default.createElement(_tile2.default, {
    title: "Marketing Cloud",
    iconText: "MC",
    description: "Send emails, track emails, read emails! Emails!",
    onClick: (0, _react3.action)('Tile clicked!')
  })))), _react2.default.createElement(_region2.default, {
    region: "secondary",
    navigation: true
  }, _react2.default.createElement(_link2.default, {
    label: "Overview",
    id: "overview-link",
    active: true,
    activeBackgroundColor: "#ffffff",
    onClick: linkClicked('Overview link clicked')
  }), _react2.default.createElement(_dropdown2.default, {
    id: "contentDropdown",
    label: "Content",
    onSelect: dropdownItemClicked('Content Menu Item clicked'),
    options: dropdownCollection
  }), _react2.default.createElement(_dropdown2.default, {
    id: "subscribersDropdown",
    label: "Subscribers",
    onSelect: dropdownItemClicked('Subscribers Menu Item clicked'),
    options: dropdownCollection
  }), _react2.default.createElement(_dropdown2.default, {
    active: true,
    activeBackgroundColor: "#ffffff",
    id: "interactionDropdown",
    label: "Interaction",
    onSelect: dropdownItemClicked('Interaction Menu Item clicked'),
    options: dropdownCollection
  }), _react2.default.createElement(_link2.default, {
    label: "A/B Testing",
    onClick: linkClicked('A/B Testing Link clicked')
  }), _react2.default.createElement(_dropdown2.default, {
    id: "trackingDropdown",
    label: "Tracking",
    onSelect: dropdownItemClicked('Tracking Menu Item clicked'),
    options: dropdownCollection
  }), _react2.default.createElement(_link2.default, {
    label: "Admin",
    onClick: linkClicked('Admin Link clicked')
  }), _react2.default.createElement(_link2.default, {
    label: "Audience Builder",
    onClick: linkClicked('Audience Builder Link clicked')
  })), _react2.default.createElement(_region2.default, {
    region: "tertiary"
  }, _react2.default.createElement(_link2.default, {
    label: "Actions",
    onClick: linkClicked('Link clicked')
  })));
};

var getGlobalNavigationBarNoNav = function getGlobalNavigationBarNoNav(props, primaryRegionProps) {
  return _react2.default.createElement(_globalNavigationBar3.default, props, _react2.default.createElement(_region2.default, _extends({
    region: "primary"
  }, primaryRegionProps), _react2.default.createElement(_appLauncher2.default, {
    onSearch: searchClicked('App Launcher searched'),
    assistiveText: {
      trigger: 'Open App Launcher'
    },
    id: "app-launcher-trigger",
    triggerName: "App Name"
  }, _react2.default.createElement(_section2.default, {
    title: "All Items"
  }, _react2.default.createElement(_tile2.default, {
    title: "Marketing Cloud",
    iconText: "MC",
    description: "Send emails, track emails, read emails! Emails!",
    onClick: (0, _react3.action)('Tile clicked!')
  })))));
};

(0, _react3.storiesOf)(_constants.GLOBAL_NAVIGATION_BAR, module).addDecorator(function (getStory) {
  return _react2.default.createElement("div", {
    className: "slds-p-around--medium"
  }, _react2.default.createElement(_iconSettings2.default, {
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
});
exports.default = getGlobalNavigationBar;