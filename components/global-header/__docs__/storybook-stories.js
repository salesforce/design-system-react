"use strict";

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _react3 = require("@storybook/react");

var _iconSettings = require("../../icon-settings");

var _iconSettings2 = _interopRequireDefault(_iconSettings);

var _avatar = require("../../avatar");

var _avatar2 = _interopRequireDefault(_avatar);

var _globalHeader = require("../../global-header");

var _globalHeader2 = _interopRequireDefault(_globalHeader);

var _button = require("../../global-header/button");

var _button2 = _interopRequireDefault(_button);

var _dropdown = require("../../global-header/dropdown");

var _dropdown2 = _interopRequireDefault(_dropdown);

var _profile = require("../../global-header/profile");

var _profile2 = _interopRequireDefault(_profile);

var _search = require("../../global-header/search");

var _search2 = _interopRequireDefault(_search);

var _constants = require("../../../utilities/constants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import globalNavigationBar from '../../global-navigation-bar/__docs__/storybook-stories';

/* eslint-disable react/prop-types */

/* eslint-disable no-script-url */

/* eslint-disable react/display-name */
var HeaderProfileCustomContent = function HeaderProfileCustomContent(props) {
  return _react2.default.createElement("div", {
    id: "custom-dropdown-menu-content"
  }, _react2.default.createElement("div", {
    className: "slds-m-around--medium"
  }, _react2.default.createElement("div", {
    className: "slds-tile slds-tile--board slds-m-horizontal--small"
  }, _react2.default.createElement("p", {
    className: "tile__title slds-text-heading--small"
  }, "Art Vandelay"), _react2.default.createElement("div", {
    className: "slds-tile__detail"
  }, _react2.default.createElement("p", {
    className: "slds-truncate"
  }, _react2.default.createElement("a", {
    className: "slds-m-right--medium",
    href: "javascript:void(0)",
    onClick: props.onClick
  }, "Settings"), _react2.default.createElement("a", {
    href: "javascript:void(0)",
    onClick: props.onClick
  }, "Log Out"))))));
};
/* eslint-disable react/display-name */


var GlobalHeaderDemo = function GlobalHeaderDemo(props) {
  return _react2.default.createElement(_globalHeader2.default, {
    onSkipToContent: (0, _react3.action)('Skip to Main Content'),
    onSkipToNav: (0, _react3.action)('Skip to Navigation') // Add back for visual review with navigation present.
    // The presence of React Modal in App Launcher in Global Navigation prevents Jest (node) testing.
    // navigation={globalNavigationBar(props)}
    ,
    assistiveText: {
      skipToContent: 'Skip to Main Content',
      skipToNavAssistiveText: 'Skip to Navigation'
    }
  }, _react2.default.createElement(_search2.default, {
    onSelect: (0, _react3.action)('Search Selected'),
    placeholder: "Search Salesforce",
    options: [{
      label: 'Email'
    }, {
      label: 'Mobile'
    }]
  }), _react2.default.createElement(_button2.default, {
    className: "slds-m-right--small",
    iconVariant: null,
    label: "Feedback",
    onClick: (0, _react3.action)('Feedback Clicked'),
    variant: "neutral"
  }), _react2.default.createElement(_dropdown2.default, {
    openOn: props.openOn,
    assistiveText: {
      icon: 'Global Actions'
    },
    globalAction: true,
    iconCategory: "utility",
    iconName: "add",
    id: "global-header-dropdown-example",
    onSelect: (0, _react3.action)('Action Selected'),
    options: [{
      label: 'New Note',
      rightIcon: {
        category: 'standard',
        name: 'note',
        size: 'small'
      }
    }, {
      label: 'Log a Call',
      rightIcon: {
        category: 'standard',
        name: 'log_a_call',
        size: 'small'
      }
    }]
  }), _react2.default.createElement(_button2.default, {
    assistiveText: {
      icon: 'Help and Training'
    },
    iconName: "question",
    onClick: (0, _react3.action)('Help Clicked')
  }), _react2.default.createElement(_dropdown2.default, {
    openOn: props.openOn,
    assistiveText: {
      icon: 'Setup'
    },
    iconName: "setup",
    id: "global-header-dropdown-example",
    onSelect: (0, _react3.action)('Action Selected'),
    options: [{
      label: 'Global Setup'
    }, {
      label: 'Permissions'
    }]
  }), _react2.default.createElement(_button2.default, {
    assistiveText: {
      icon: 'Notifications'
    },
    iconName: "Notification",
    onClick: (0, _react3.action)('Notifications Clicked')
  }), _react2.default.createElement(_profile2.default, {
    id: "global-header-dropdown-profile-example",
    openOn: props.openOn,
    onClick: (0, _react3.action)('Profile Clicked'),
    onSelect: (0, _react3.action)('Profile Selected'),
    avatar: props.avatar
  }, _react2.default.createElement(HeaderProfileCustomContent, null)));
};

(0, _react3.storiesOf)(_constants.GLOBAL_HEADER, module).addDecorator(function (getStory) {
  return _react2.default.createElement("div", {
    className: "slds-p-around--medium"
  }, _react2.default.createElement(_iconSettings2.default, {
    iconPath: "/assets/icons"
  }, getStory()));
}).add('Search + Navigation', function () {
  return _react2.default.createElement(GlobalHeaderDemo, null);
}).add('Open on Hybrid', function () {
  return _react2.default.createElement(GlobalHeaderDemo, {
    openOn: "hybrid"
  });
}).add('Fewer Elements', function () {
  return _react2.default.createElement(_globalHeader2.default, {
    logoSrc: "/assets/images/global-header/logo.svg"
  }, _react2.default.createElement(_dropdown2.default, {
    assistiveText: {
      icon: 'Setup'
    },
    iconName: "setup",
    id: "global-header-dropdown-example",
    onSelect: (0, _react3.action)('Action Selected'),
    options: [{
      label: 'Global Setup'
    }, {
      label: 'Permissions'
    }]
  }), _react2.default.createElement(_profile2.default, {
    id: "global-header-dropdown-profile-example",
    onClick: (0, _react3.action)('Profile Clicked'),
    onSelect: (0, _react3.action)('Profile Selected'),
    options: [{
      label: 'Profile Menu'
    }]
  }));
}).add('With custom <Avatar/>', function () {
  return _react2.default.createElement(GlobalHeaderDemo, {
    avatar: _react2.default.createElement(_avatar2.default, {
      variant: "user",
      label: "Art Vandelay"
    })
  });
});