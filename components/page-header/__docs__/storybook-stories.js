"use strict";

var _react = _interopRequireDefault(require("react"));

var _react2 = require("@storybook/react");

var _addonActions = require("@storybook/addon-actions");

var _constants = require("../../../utilities/constants");

var _iconSettings = _interopRequireDefault(require("../../icon-settings"));

var _pageHeader = _interopRequireDefault(require("../../page-header"));

var _buttonStateful = _interopRequireDefault(require("../../button-stateful"));

var _buttonGroup = _interopRequireDefault(require("../../button-group"));

var _button = _interopRequireDefault(require("../../button"));

var _menuDropdown = _interopRequireDefault(require("../../menu-dropdown"));

var _tooltip = _interopRequireDefault(require("../../tooltip"));

var _objectHome = _interopRequireDefault(require("../__examples__/object-home"));

var _recordHome = _interopRequireDefault(require("../__examples__/record-home"));

var _relatedList = _interopRequireDefault(require("../__examples__/related-list"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

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
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, DemoPageHeader);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(DemoPageHeader)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "state", {
      recordHomeDetails: recordHomeDetails2
    });

    _defineProperty(_assertThisInitialized(_this), "changeDescription", function () {
      if (_this.state.recordHomeDetails[0].content === 'hi') {
        _this.setState({
          recordHomeDetails: recordHomeDetails1
        });
      } else {
        _this.setState({
          recordHomeDetails: recordHomeDetails2
        });
      }
    });

    _defineProperty(_assertThisInitialized(_this), "handleSelect", function (selectedItem) {
      for (var _len2 = arguments.length, rest = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
        rest[_key2 - 1] = arguments[_key2];
      }

      (0, _addonActions.action)('select').apply(void 0, [selectedItem].concat(rest));

      _this.setState({
        currentSelected: _this.state.options.indexOf(selectedItem)
      });
    });

    return _this;
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
        variant: 'record-home',
        details: this.state.recordHomeDetails
      };
      return _react.default.createElement("div", null, _react.default.createElement(_button.default, {
        onClick: this.changeDescription
      }, "Change Description"), _react.default.createElement(_pageHeader.default, defaultProps));
    }
  }]);

  return DemoPageHeader;
}(_react.default.Component);

_defineProperty(DemoPageHeader, "displayName", 'DemoPageHeader');

var getPageHeader = function getPageHeader(props) {
  return _react.default.createElement(_pageHeader.default, props);
};

var recordHomeActions = function recordHomeActions() {
  return _react.default.createElement("div", null, _react.default.createElement(_buttonStateful.default, {
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
  }), _react.default.createElement(_buttonGroup.default, {
    key: ""
  }, _react.default.createElement(_button.default, {
    label: "Edit"
  }), _react.default.createElement(_button.default, {
    label: "Delete"
  }), _react.default.createElement(_button.default, {
    label: "Clone"
  }), _react.default.createElement(_menuDropdown.default, {
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
};

var customTooltip = function customTooltip() {
  var content = 'here is a super long description that will truncate and the rest of it will show in the tooltip.';
  return _react.default.createElement(_tooltip.default, {
    align: "top",
    content: content,
    id: "page-header-truncate-tooltip",
    triggerStyle: {
      display: 'inline'
    }
  }, _react.default.createElement("p", {
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

var objectHomeActions = function objectHomeActions() {
  return _react.default.createElement("div", null, _react.default.createElement(_button.default, {
    iconCategory: "utility",
    iconName: "settings",
    variant: "icon",
    iconVariant: "more",
    className: "slds-m-left_xx-small",
    assistiveText: {
      icon: 'Settings'
    }
  }), _react.default.createElement(_button.default, {
    iconCategory: "utility",
    iconName: "table",
    variant: "icon",
    iconVariant: "more",
    className: "slds-m-left_xx-small",
    assistiveText: {
      icon: 'Table'
    }
  }), _react.default.createElement(_buttonGroup.default, null, _react.default.createElement(_button.default, {
    iconCategory: "utility",
    iconName: "chart",
    variant: "icon",
    iconVariant: "border",
    assistiveText: {
      icon: 'Chart'
    }
  }), _react.default.createElement(_button.default, {
    iconCategory: "utility",
    iconName: "filterList",
    variant: "icon",
    iconVariant: "border",
    className: "slds-m-left_xx-small",
    assistiveText: {
      icon: 'Filter List'
    }
  }), _react.default.createElement(_menuDropdown.default, {
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
};

var relatedListActions = function relatedListActions() {
  return _react.default.createElement("div", null, _react.default.createElement(_button.default, {
    iconCategory: "utility",
    iconName: "table",
    variant: "icon",
    iconVariant: "more",
    className: "slds-m-left_xx-small",
    assistiveText: {
      icon: 'Table'
    }
  }), _react.default.createElement(_buttonGroup.default, null, _react.default.createElement(_button.default, {
    iconCategory: "utility",
    iconName: "chart",
    variant: "icon",
    iconVariant: "border",
    className: "slds-m-left_xx-small",
    assistiveText: {
      icon: 'Chart'
    }
  }), _react.default.createElement(_button.default, {
    iconCategory: "utility",
    iconName: "filterList",
    variant: "icon",
    iconVariant: "border",
    className: "slds-m-left_xx-small",
    assistiveText: {
      icon: 'Filter List'
    }
  }), _react.default.createElement(_menuDropdown.default, {
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
};

var relatedListControls = function relatedListControls() {
  return _react.default.createElement(_buttonGroup.default, null, _react.default.createElement(_button.default, {
    label: "Add Contact",
    variant: "neutral"
  }), _react.default.createElement(_menuDropdown.default, {
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
};

var relatedListTrail = [_react.default.createElement("a", {
  href: "javascript:void(0);"
}, "Accounts"), _react.default.createElement("a", {
  href: "javascript:void(0);"
}, "Company One")];
(0, _react2.storiesOf)(_constants.PAGE_HEADER, module).addDecorator(function (getStory) {
  return _react.default.createElement("div", {
    className: "slds-p-around_medium"
  }, _react.default.createElement(_iconSettings.default, {
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
}).add('Base with actions', function () {
  return getPageHeader({
    iconAssistiveText: 'Opportunity',
    iconCategory: 'standard',
    iconName: 'opportunity',
    title: 'Rohde Corp - 80,000 Widgets',
    info: 'Mark Jaeckal • Unlimited Customer • 11/13/15',
    onRenderControls: objectHomeActions
  });
}).add('Record Home (truncates)', function () {
  return getPageHeader({
    iconAssistiveText: 'User',
    iconCategory: 'standard',
    iconName: 'user',
    label: 'Record Type',
    title: 'Record Title',
    variant: 'record-home',
    onRenderActions: recordHomeActions,
    details: recordHomeDetails
  });
}).add('Object Home', function () {
  return _react.default.createElement(_objectHome.default, null);
}).add('Related List', function () {
  return getPageHeader({
    title: 'Contacts',
    variant: 'object-home',
    info: '10 items • sorted by name',
    onRenderActions: relatedListActions,
    onRenderControls: relatedListControls,
    trail: relatedListTrail
  });
}).add('Record Home (field updates)', function () {
  return _react.default.createElement(DemoPageHeader, null);
}).add('Docs site RecordHome', function () {
  return _react.default.createElement(_recordHome.default, null);
}).add('Docs site RelatedList', function () {
  return _react.default.createElement(_relatedList.default, null);
});