"use strict";

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _react3 = require("@storybook/react");

var _addonActions = require("@storybook/addon-actions");

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

var _tooltip = require("../../tooltip");

var _tooltip2 = _interopRequireDefault(_tooltip);

var _objectHome = require("../__examples__/object-home");

var _objectHome2 = _interopRequireDefault(_objectHome);

var _recordHome = require("../__examples__/record-home");

var _recordHome2 = _interopRequireDefault(_recordHome);

var _relatedList = require("../__examples__/related-list");

var _relatedList2 = _interopRequireDefault(_relatedList);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

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

var DemoPageHeader =
/*#__PURE__*/
function (_React$Component) {
  _inherits(DemoPageHeader, _React$Component);

  function DemoPageHeader() {
    var _ref;

    var _temp, _this;

    _classCallCheck(this, DemoPageHeader);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _possibleConstructorReturn(_this, (_temp = _this = _possibleConstructorReturn(this, (_ref = DemoPageHeader.__proto__ || Object.getPrototypeOf(DemoPageHeader)).call.apply(_ref, [this].concat(args))), Object.defineProperty(_assertThisInitialized(_this), "state", {
      configurable: true,
      enumerable: true,
      writable: true,
      value: {
        recordHomeDetails: recordHomeDetails2
      }
    }), Object.defineProperty(_assertThisInitialized(_this), "changeDescription", {
      configurable: true,
      enumerable: true,
      writable: true,
      value: function value() {
        if (_this.state.recordHomeDetails[0].content === 'hi') {
          _this.setState({
            recordHomeDetails: recordHomeDetails1
          });
        } else {
          _this.setState({
            recordHomeDetails: recordHomeDetails2
          });
        }
      }
    }), Object.defineProperty(_assertThisInitialized(_this), "handleSelect", {
      configurable: true,
      enumerable: true,
      writable: true,
      value: function value(selectedItem) {
        for (var _len2 = arguments.length, rest = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
          rest[_key2 - 1] = arguments[_key2];
        }

        (0, _addonActions.action)('select').apply(void 0, [selectedItem].concat(rest));

        _this.setState({
          currentSelected: _this.state.options.indexOf(selectedItem)
        });
      }
    }), _temp));
  }

  _createClass(DemoPageHeader, [{
    key: "render",
    value: function render() {
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
  }]);

  return DemoPageHeader;
}(_react2.default.Component);

Object.defineProperty(DemoPageHeader, "displayName", {
  configurable: true,
  enumerable: true,
  writable: true,
  value: 'DemoPageHeader'
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
    iconCategory: 'utility',
    iconName: 'check',
    label: 'Following'
  },
  stateThree: {
    iconCategory: 'utility',
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
  id: "page-header-dropdown-record-home-content-right",
  onSelect: (0, _addonActions.action)('select'),
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
  return _react2.default.createElement(_tooltip2.default, {
    align: "top",
    content: content,
    id: "page-header-truncate-tooltip",
    triggerStyle: {
      display: 'inline'
    }
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
  className: "slds-m-left_xx-small",
  assistiveText: {
    icon: 'Settings'
  }
}), _react2.default.createElement(_button2.default, {
  iconCategory: "utility",
  iconName: "table",
  variant: "icon",
  iconVariant: "more",
  className: "slds-m-left_xx-small",
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
  className: "slds-m-left_xx-small",
  assistiveText: {
    icon: 'Filter List'
  }
}), _react2.default.createElement(_menuDropdown2.default, {
  assistiveText: {
    icon: 'Sort'
  },
  buttonVariant: "icon",
  iconCategory: "utility",
  iconName: "sort",
  iconVariant: "more",
  id: "page-header-dropdown-object-home-content-right",
  onSelect: (0, _addonActions.action)('select'),
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
  id: "page-header-dropdown-object-home-nav-right",
  onSelect: (0, _addonActions.action)('select'),
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
  className: "slds-m-left_xx-small",
  assistiveText: {
    icon: 'Table'
  }
}), _react2.default.createElement(_buttonGroup2.default, null, _react2.default.createElement(_button2.default, {
  iconCategory: "utility",
  iconName: "chart",
  variant: "icon",
  iconVariant: "border",
  className: "slds-m-left_xx-small",
  assistiveText: {
    icon: 'Chart'
  }
}), _react2.default.createElement(_button2.default, {
  iconCategory: "utility",
  iconName: "filterList",
  variant: "icon",
  iconVariant: "border",
  className: "slds-m-left_xx-small",
  assistiveText: {
    icon: 'Filter List'
  }
}), _react2.default.createElement(_menuDropdown2.default, {
  assistiveText: {
    icon: 'Sort'
  },
  buttonVariant: "icon",
  iconCategory: "utility",
  iconName: "sort",
  iconVariant: "more",
  id: "page-header-dropdown-related-list-content-right",
  onSelect: (0, _addonActions.action)('select'),
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
  id: "page-header-dropdown-related-list-nav-right",
  onSelect: (0, _addonActions.action)('select'),
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
    className: "slds-p-around_medium"
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
}).add('Base with content right', function () {
  return getPageHeader({
    iconAssistiveText: 'Opportunity',
    iconCategory: 'standard',
    iconName: 'opportunity',
    title: 'Rohde Corp - 80,000 Widgets',
    info: 'Mark Jaeckal • Unlimited Customer • 11/13/15',
    navRight: objectHomeNavRight
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
}).add('Docs site RecordHome', function () {
  return _react2.default.createElement(_recordHome2.default, null);
}).add('Docs site RelatedList', function () {
  return _react2.default.createElement(_relatedList2.default, null);
});