"use strict";

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _createReactClass = require("create-react-class");

var _createReactClass2 = _interopRequireDefault(_createReactClass);

var _react3 = require("@storybook/react");

var _constants = require("../../../utilities/constants");

var _iconSettings = require("../../icon-settings");

var _iconSettings2 = _interopRequireDefault(_iconSettings);

var _pageHeader = require("../../page-header");

var _pageHeader2 = _interopRequireDefault(_pageHeader);

var _buttonStateful = require("../../button-stateful");

var _buttonStateful2 = _interopRequireDefault(_buttonStateful);

var _buttonGroup = require("../../button-group");

var _buttonGroup2 = _interopRequireDefault(_buttonGroup);

var _button = require("../../button");

var _button2 = _interopRequireDefault(_button);

var _menuDropdown = require("../../menu-dropdown");

var _menuDropdown2 = _interopRequireDefault(_menuDropdown);

var _popoverTooltip = require("../../popover-tooltip");

var _popoverTooltip2 = _interopRequireDefault(_popoverTooltip);

var _objectHome = require("../__examples__/object-home");

var _objectHome2 = _interopRequireDefault(_objectHome);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable indent, jsx-a11y/no-noninteractive-tabindex */
var recordHomeDetails1 = [{
  label: 'Field 1',
  content: 'Description that demonstrates truncation with content. Description that demonstrates truncation with content.',
  flavor: '1-of-4',
  truncate: true
}, {
  label: 'Field 2',
  content: 'Multiple Values'
}, {
  label: 'Field 3',
  content: 'Description (2-line truncation)'
}];
var recordHomeDetails2 = [{
  label: 'Field 1',
  content: 'hi',
  flavor: '1-of-4',
  truncate: true
}, {
  label: 'Field 2',
  content: 'Multiple Values'
}, {
  label: 'Field 3',
  content: 'Description (2-line truncation)'
}];
var DemoPageHeader = (0, _createReactClass2.default)({
  displayName: 'DemoPageHeader',
  getInitialState: function getInitialState() {
    return {
      recordHomeDetails: recordHomeDetails2
    };
  },
  changeDescription: function changeDescription() {
    if (this.state.recordHomeDetails[0].content === 'hi') {
      this.setState({
        recordHomeDetails: recordHomeDetails1
      });
    } else {
      this.setState({
        recordHomeDetails: recordHomeDetails2
      });
    }
  },
  handleSelect: function handleSelect(selectedItem) {
    for (var _len = arguments.length, rest = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      rest[_key - 1] = arguments[_key];
    }

    (0, _react3.action)('select').apply(void 0, [selectedItem].concat(rest));
    this.setState({
      currentSelected: this.state.options.indexOf(selectedItem)
    });
  },
  render: function render() {
    var defaultProps = {
      iconAssistiveText: 'User',
      iconCategory: 'standard',
      iconName: 'user',
      label: 'Record Type',
      title: 'Record Title',
      variant: 'recordHome',
      details: this.state.recordHomeDetails
    };
    return _react2.default.createElement("div", null, _react2.default.createElement(_button2.default, {
      onClick: this.changeDescription
    }, "Change Description"), _react2.default.createElement(_pageHeader2.default, defaultProps));
  }
});

var getPageHeader = function getPageHeader(props) {
  return _react2.default.createElement(_pageHeader2.default, props);
};

var recordHomeContentRight = _react2.default.createElement("div", null, _react2.default.createElement(_buttonStateful2.default, {
  key: "PageHeaderFollowButton",
  disabled: false,
  iconSize: "medium",
  responsive: false,
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
}), _react2.default.createElement(_buttonGroup2.default, {
  key: ""
}, _react2.default.createElement(_button2.default, {
  label: "Edit"
}), _react2.default.createElement(_button2.default, {
  label: "Delete"
}), _react2.default.createElement(_button2.default, {
  label: "Clone"
}), _react2.default.createElement(_menuDropdown2.default, {
  assistiveText: {
    icon: 'More Options'
  },
  buttonVariant: "icon",
  iconCategory: "utility",
  iconName: "down",
  iconVariant: "border-filled",
  onSelect: (0, _react3.action)('select'),
  openOn: "click",
  align: "right",
  options: [{
    label: 'Disable',
    value: 'A0'
  }, {
    label: 'Promote',
    value: 'C0'
  }]
})));

var customTooltip = function customTooltip() {
  var content = 'here is a super long description that will truncate and the rest of it will show in the tooltip.';
  return _react2.default.createElement(_popoverTooltip2.default, {
    align: "top",
    content: content
  }, _react2.default.createElement("p", {
    tabIndex: "0",
    className: "slds-truncate"
  }, content));
};

var recordHomeDetails = [{
  label: 'Field 1',
  content: 'Description that demonstrates truncation with content. Description that demonstrates truncation with content.',
  flavor: '1-of-4',
  truncate: true
}, {
  label: 'Field 2',
  content: 'Multiple Values'
}, {
  label: 'Field 3',
  content: customTooltip(),
  flavor: '1-of-4'
}, {
  label: 'Field 4',
  content: 'Description (2-line truncation)'
}];

var objectHomeContentRight = _react2.default.createElement("div", null, _react2.default.createElement(_button2.default, {
  iconCategory: "utility",
  iconName: "settings",
  variant: "icon",
  iconVariant: "more",
  className: "slds-m-left--xx-small",
  assistiveText: {
    icon: 'Settings'
  }
}), _react2.default.createElement(_button2.default, {
  iconCategory: "utility",
  iconName: "table",
  variant: "icon",
  iconVariant: "more",
  className: "slds-m-left--xx-small",
  assistiveText: {
    icon: 'Table'
  }
}), _react2.default.createElement(_buttonGroup2.default, null, _react2.default.createElement(_button2.default, {
  iconCategory: "utility",
  iconName: "chart",
  variant: "icon",
  iconVariant: "border",
  assistiveText: {
    icon: 'Chart'
  }
}), _react2.default.createElement(_button2.default, {
  iconCategory: "utility",
  iconName: "filterList",
  variant: "icon",
  iconVariant: "border",
  className: "slds-m-left--xx-small",
  assistiveText: {
    icon: 'Filter List'
  }
}), _react2.default.createElement(_menuDropdown2.default, {
  assistiveText: {
    icon: 'Sort'
  },
  buttonVariant: "icon",
  iconName: "sort",
  iconVariant: "more",
  onSelect: (0, _react3.action)('select'),
  openOn: "click",
  align: "right",
  options: [{
    label: 'Last Name (ascending)',
    value: 'LNA'
  }, {
    label: 'Last Name (descending)',
    value: 'LND'
  }, {
    label: 'Last Contacted (descending)',
    value: 'LCD'
  }, {
    label: 'Last Contacted (ascending)',
    value: 'LCA'
  }]
})));

var objectHomeNavRight = _react2.default.createElement(_buttonGroup2.default, null, _react2.default.createElement(_button2.default, {
  label: "New Lead",
  variant: "neutral"
}), _react2.default.createElement(_menuDropdown2.default, {
  align: "right",
  assistiveText: {
    icon: 'More Options'
  },
  iconCategory: "utility",
  iconName: "down",
  iconVariant: "border-filled",
  onSelect: (0, _react3.action)('select'),
  options: [{
    label: 'Refresh List',
    value: 'A0'
  }, {
    label: 'Duplicate Selected Leads',
    value: 'B0'
  }, {
    label: 'Disabled Selected Leads',
    value: 'C0'
  }]
}));

var relatedListContentRight = _react2.default.createElement("div", null, _react2.default.createElement(_button2.default, {
  iconCategory: "utility",
  iconName: "table",
  variant: "icon",
  iconVariant: "more",
  className: "slds-m-left--xx-small",
  assistiveText: {
    icon: 'Table'
  }
}), _react2.default.createElement(_buttonGroup2.default, null, _react2.default.createElement(_button2.default, {
  iconCategory: "utility",
  iconName: "chart",
  variant: "icon",
  iconVariant: "border",
  className: "slds-m-left--xx-small",
  assistiveText: {
    icon: 'Chart'
  }
}), _react2.default.createElement(_button2.default, {
  iconCategory: "utility",
  iconName: "filterList",
  variant: "icon",
  iconVariant: "border",
  className: "slds-m-left--xx-small",
  assistiveText: {
    icon: 'Filter List'
  }
}), _react2.default.createElement(_menuDropdown2.default, {
  assistiveText: {
    icon: 'Sort'
  },
  buttonVariant: "icon",
  iconName: "sort",
  iconVariant: "more",
  onSelect: (0, _react3.action)('select'),
  openOn: "click",
  align: "right",
  options: [{
    label: 'Last Name (ascending)',
    value: 'LNA'
  }, {
    label: 'Last Name (descending)',
    value: 'LND'
  }, {
    label: 'Last Contacted (descending)',
    value: 'LCD'
  }, {
    label: 'Last Contacted (ascending)',
    value: 'LCA'
  }]
})));

var relatedListNavRight = _react2.default.createElement(_buttonGroup2.default, null, _react2.default.createElement(_button2.default, {
  label: "Add Contact",
  variant: "neutral"
}), _react2.default.createElement(_menuDropdown2.default, {
  assistiveText: {
    icon: 'More Options'
  },
  buttonVariant: "icon",
  iconCategory: "utility",
  iconName: "down",
  iconVariant: "border-filled",
  onSelect: (0, _react3.action)('select'),
  openOn: "click",
  align: "right",
  options: [{
    label: 'Refresh List',
    value: 'A0'
  }, {
    label: 'Duplicate Selected Leads',
    value: 'B0'
  }, {
    label: 'Disabled Selected Leads',
    value: 'C0'
  }]
}));

var relatedListTrail = [_react2.default.createElement("a", {
  href: "javascript:void(0);"
}, "Accounts"), _react2.default.createElement("a", {
  href: "javascript:void(0);"
}, "Company One")];
(0, _react3.storiesOf)(_constants.PAGE_HEADER, module).addDecorator(function (getStory) {
  return _react2.default.createElement("div", {
    className: "slds-p-around--medium"
  }, _react2.default.createElement(_iconSettings2.default, {
    iconPath: "/assets/icons"
  }, getStory()));
}).add('Base', function () {
  return getPageHeader({
    iconAssistiveText: 'Opportunity',
    iconCategory: 'standard',
    iconName: 'opportunity',
    title: 'Rohde Corp - 80,000 Widgets',
    info: 'Mark Jaeckal • Unlimited Customer • 11/13/15'
  });
}).add('Record Home (truncates)', function () {
  return getPageHeader({
    iconAssistiveText: 'User',
    iconCategory: 'standard',
    iconName: 'user',
    label: 'Record Type',
    title: 'Record Title',
    variant: 'recordHome',
    contentRight: recordHomeContentRight,
    details: recordHomeDetails
  });
}).add('Object Home', function () {
  return _react2.default.createElement(_objectHome2.default, null);
}).add('Related List', function () {
  return getPageHeader({
    title: 'Contacts',
    variant: 'objectHome',
    info: '10 items • sorted by name',
    contentRight: relatedListContentRight,
    navRight: relatedListNavRight,
    trail: relatedListTrail
  });
}).add('Record Home (field updates)', function () {
  return _react2.default.createElement(DemoPageHeader, null);
});