"use strict";

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react2 = require("@storybook/react");

var _addonActions = require("@storybook/addon-actions");

var _constants = require("../../../utilities/constants");

var _appLauncher = _interopRequireDefault(require("../../app-launcher"));

var _link = _interopRequireDefault(require("../../app-launcher/link"));

var _tile = _interopRequireDefault(require("../../app-launcher/tile"));

var _expandableSection = _interopRequireDefault(require("../../app-launcher/expandable-section"));

var _icon = _interopRequireDefault(require("../../icon"));

var _button = _interopRequireDefault(require("../../button"));

var _search = _interopRequireDefault(require("../../input/search"));

var _globalNavigationBar = _interopRequireDefault(require("../../global-navigation-bar"));

var _region = _interopRequireDefault(require("../../global-navigation-bar/region"));

var _iconSettings = _interopRequireDefault(require("../../icon-settings"));

var _SLDSSettings = _interopRequireDefault(require("../../SLDSSettings"));

var _default = _interopRequireDefault(require("../__examples__/default"));

var _executionEnvironment = require("../../../utilities/execution-environment");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// used by Modal component
if (_executionEnvironment.canUseDOM && document.querySelector('#root')) {
  _SLDSSettings.default.setAppElement('#root');
} else {
  _SLDSSettings.default.setAppElement(document.createElement('div'));
}

var tileDemoStyles = {
  width: '20rem',
  paddingLeft: '.5rem',
  paddingRight: '.5rem'
};

var DemoAppLauncherTile =
/*#__PURE__*/
function (_React$Component) {
  _inherits(DemoAppLauncherTile, _React$Component);

  function DemoAppLauncherTile() {
    _classCallCheck(this, DemoAppLauncherTile);

    return _possibleConstructorReturn(this, _getPrototypeOf(DemoAppLauncherTile).apply(this, arguments));
  }

  _createClass(DemoAppLauncherTile, [{
    key: "render",
    value: function render() {
      return _react.default.createElement(_tile.default, {
        title: "Sales Cloud",
        iconText: "SC",
        description: "The primary internal Salesforce org. Used to run our online sales business and manage accounts.",
        href: "https://www.salesforce.com/",
        onClick: (0, _addonActions.action)('Tile clicked! Actual href should be ignored'),
        search: this.props.search
      });
    }
  }]);

  return DemoAppLauncherTile;
}(_react.default.Component);

_defineProperty(DemoAppLauncherTile, "displayName", _constants.APP_LAUNCHER_TILE);

_defineProperty(DemoAppLauncherTile, "propTypes", {
  search: _propTypes.default.string
});

DemoAppLauncherTile.displayName = _constants.APP_LAUNCHER_TILE;

var DemoAppLauncherTileWithIconNode =
/*#__PURE__*/
function (_React$Component2) {
  _inherits(DemoAppLauncherTileWithIconNode, _React$Component2);

  function DemoAppLauncherTileWithIconNode() {
    _classCallCheck(this, DemoAppLauncherTileWithIconNode);

    return _possibleConstructorReturn(this, _getPrototypeOf(DemoAppLauncherTileWithIconNode).apply(this, arguments));
  }

  _createClass(DemoAppLauncherTileWithIconNode, [{
    key: "render",
    value: function render() {
      var icon = _react.default.createElement(_icon.default, {
        name: "email_chatter",
        category: "standard",
        size: "large"
      });

      return _react.default.createElement(_tile.default, {
        title: "Marketing Cloud",
        description: "Salesforce Marketing Cloud lets businesses of any size engage with their customers through multiple channels of messaging.",
        href: "https://www.marketingcloud.com/",
        iconNode: icon,
        onClick: (0, _addonActions.action)('Tile with icon node clicked!'),
        search: this.props.search
      });
    }
  }]);

  return DemoAppLauncherTileWithIconNode;
}(_react.default.Component);

_defineProperty(DemoAppLauncherTileWithIconNode, "displayName", _constants.APP_LAUNCHER_TILE);

_defineProperty(DemoAppLauncherTileWithIconNode, "propTypes", {
  search: _propTypes.default.string
});

var DemoAppLauncherTileWithIconBackgroundColor =
/*#__PURE__*/
function (_React$Component3) {
  _inherits(DemoAppLauncherTileWithIconBackgroundColor, _React$Component3);

  function DemoAppLauncherTileWithIconBackgroundColor() {
    _classCallCheck(this, DemoAppLauncherTileWithIconBackgroundColor);

    return _possibleConstructorReturn(this, _getPrototypeOf(DemoAppLauncherTileWithIconBackgroundColor).apply(this, arguments));
  }

  _createClass(DemoAppLauncherTileWithIconBackgroundColor, [{
    key: "render",
    value: function render() {
      return _react.default.createElement(_tile.default, {
        description: "Manage your finances across multiple financial platforms and make the most of your capital.",
        iconBackgroundColor: "#73c07b",
        iconText: "MM",
        search: this.props.search,
        title: "My Money"
      });
    }
  }]);

  return DemoAppLauncherTileWithIconBackgroundColor;
}(_react.default.Component);

_defineProperty(DemoAppLauncherTileWithIconBackgroundColor, "displayName", _constants.APP_LAUNCHER_TILE);

_defineProperty(DemoAppLauncherTileWithIconBackgroundColor, "propTypes", {
  search: _propTypes.default.string
});

var DemoAppLauncherTileWithTruncatedText =
/*#__PURE__*/
function (_React$Component4) {
  _inherits(DemoAppLauncherTileWithTruncatedText, _React$Component4);

  function DemoAppLauncherTileWithTruncatedText() {
    _classCallCheck(this, DemoAppLauncherTileWithTruncatedText);

    return _possibleConstructorReturn(this, _getPrototypeOf(DemoAppLauncherTileWithTruncatedText).apply(this, arguments));
  }

  _createClass(DemoAppLauncherTileWithTruncatedText, [{
    key: "render",
    value: function render() {
      return _react.default.createElement(_tile.default, {
        title: "Call Center",
        description: "The key to call center and contact center management is more simple than you think with this amazing application!",
        iconText: "CC",
        onClick: (0, _addonActions.action)('Tile with icon text clicked!'),
        search: this.props.search
      });
    }
  }]);

  return DemoAppLauncherTileWithTruncatedText;
}(_react.default.Component);

_defineProperty(DemoAppLauncherTileWithTruncatedText, "displayName", _constants.APP_LAUNCHER_TILE);

_defineProperty(DemoAppLauncherTileWithTruncatedText, "propTypes", {
  search: _propTypes.default.string
});

var DemoAppLauncherTileWithSearchText =
/*#__PURE__*/
function (_React$Component5) {
  _inherits(DemoAppLauncherTileWithSearchText, _React$Component5);

  function DemoAppLauncherTileWithSearchText() {
    _classCallCheck(this, DemoAppLauncherTileWithSearchText);

    return _possibleConstructorReturn(this, _getPrototypeOf(DemoAppLauncherTileWithSearchText).apply(this, arguments));
  }

  _createClass(DemoAppLauncherTileWithSearchText, [{
    key: "render",
    value: function render() {
      return _react.default.createElement(DemoAppLauncherTileWithTruncatedText, {
        search: this.props.search
      });
    }
  }]);

  return DemoAppLauncherTileWithSearchText;
}(_react.default.Component);

_defineProperty(DemoAppLauncherTileWithSearchText, "displayName", _constants.APP_LAUNCHER_TILE);

_defineProperty(DemoAppLauncherTileWithSearchText, "propTypes", {
  search: _propTypes.default.string
});

_defineProperty(DemoAppLauncherTileWithSearchText, "defaultProps", {
  search: 'Call'
});

var DemoAppLauncherExpandableSection =
/*#__PURE__*/
function (_React$Component6) {
  _inherits(DemoAppLauncherExpandableSection, _React$Component6);

  function DemoAppLauncherExpandableSection() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, DemoAppLauncherExpandableSection);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(DemoAppLauncherExpandableSection)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "state", {
      allAppsOpen: true
    });

    return _this;
  }

  _createClass(DemoAppLauncherExpandableSection, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      return _react.default.createElement("div", null, _react.default.createElement(_expandableSection.default, {
        assistiveText: {
          toggleSection: 'Expand/Collapse Section'
        },
        isOpen: this.state.allAppsOpen,
        onToggleOpen: function onToggleOpen() {
          (0, _addonActions.action)('Section `All App` open -->');

          _this2.setState({
            allAppsOpen: !_this2.state.allAppsOpen
          });
        },
        title: "All Apps"
      }, _react.default.createElement(DemoAppLauncherTile, null), _react.default.createElement(DemoAppLauncherTileWithIconBackgroundColor, null), _react.default.createElement(DemoAppLauncherTileWithIconNode, null), _react.default.createElement(DemoAppLauncherTile, null), _react.default.createElement(DemoAppLauncherTileWithTruncatedText, null), _react.default.createElement(DemoAppLauncherTile, null)), _react.default.createElement(_expandableSection.default, {
        nonCollapsible: true,
        title: "All Items"
      }, _react.default.createElement(_link.default, null, "Accounts"), _react.default.createElement(_link.default, null, "Announcements"), _react.default.createElement(_link.default, null, "Approvals"), _react.default.createElement(_link.default, null, "Campaigns"), _react.default.createElement(_link.default, null, "Cases"), _react.default.createElement(_link.default, null, "Coaching"), _react.default.createElement(_link.default, null, "Contacts")));
    }
  }]);

  return DemoAppLauncherExpandableSection;
}(_react.default.Component);

_defineProperty(DemoAppLauncherExpandableSection, "displayName", 'DemoAppLauncherExpandableSection');

var DemoAppLauncher =
/*#__PURE__*/
function (_React$Component7) {
  _inherits(DemoAppLauncher, _React$Component7);

  function DemoAppLauncher() {
    var _getPrototypeOf3;

    var _this3;

    _classCallCheck(this, DemoAppLauncher);

    for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }

    _this3 = _possibleConstructorReturn(this, (_getPrototypeOf3 = _getPrototypeOf(DemoAppLauncher)).call.apply(_getPrototypeOf3, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this3), "state", {
      search: '',
      appLauncherOpen: _this3.props.isOpen || false,
      // eslint-disable-line react/prop-types
      allItemsSectionIsOpen: true
    });

    _defineProperty(_assertThisInitialized(_this3), "onClear", function () {
      _this3.setState({
        search: ''
      });
    });

    _defineProperty(_assertThisInitialized(_this3), "onSearch", function (event) {
      _this3.setState({
        search: event.target.value
      });
    });

    _defineProperty(_assertThisInitialized(_this3), "toggleAppLauncher", function () {
      _this3.setState({
        appLauncherOpen: !_this3.state.appLauncherOpen
      });
    });

    _defineProperty(_assertThisInitialized(_this3), "toggleSection", function () {
      _this3.setState({
        allItemsSectionIsOpen: !_this3.state.allItemsSectionIsOpen
      });
    });

    return _this3;
  }

  _createClass(DemoAppLauncher, [{
    key: "render",
    value: function render() {
      var search = _react.default.createElement(_search.default, {
        clearable: this.state.search !== '',
        onChange: this.onSearch,
        onClear: this.onClear,
        placeholder: "Find an app",
        assistiveText: {
          label: 'Find an app'
        },
        value: this.state.search
      });

      var modalHeaderButton = _react.default.createElement(_button.default, {
        label: "App Exchange",
        onClick: (0, _addonActions.action)('Modal Button clicked!')
      });

      return _react.default.createElement(_globalNavigationBar.default, null, _react.default.createElement(_region.default, {
        region: "primary"
      }, _react.default.createElement(_appLauncher.default, {
        assistiveText: {
          trigger: 'Open App Launcher'
        },
        triggerName: "App Name",
        search: search,
        modalClassName: "custom-modal-class",
        modalHeaderButton: modalHeaderButton,
        isOpen: this.state.appLauncherOpen,
        triggerOnClick: this.toggleAppLauncher,
        onClose: this.toggleAppLauncher
      }, _react.default.createElement(_expandableSection.default, {
        title: "All Apps",
        toggleable: true
      }, _react.default.createElement(DemoAppLauncherTile, {
        search: this.state.search
      }), _react.default.createElement(DemoAppLauncherTileWithIconNode, {
        search: this.state.search
      }), _react.default.createElement(DemoAppLauncherTileWithIconBackgroundColor, {
        search: this.state.search
      }), _react.default.createElement(DemoAppLauncherTile, {
        search: this.state.search
      }), _react.default.createElement(DemoAppLauncherTileWithTruncatedText, {
        search: this.state.search
      }), _react.default.createElement(DemoAppLauncherTile, {
        search: this.state.search
      })), _react.default.createElement("hr", null), _react.default.createElement(_expandableSection.default, {
        title: "All Items",
        isOpen: this.state.allItemsSectionIsOpen,
        onToggleOpen: this.toggleSection
      }, _react.default.createElement(_link.default, null, "Accounts"), _react.default.createElement(_link.default, null, "Announcements"), _react.default.createElement(_link.default, null, "Approvals"), _react.default.createElement(_link.default, null, "Campaigns"), _react.default.createElement(_link.default, null, "Cases"), _react.default.createElement(_link.default, null, "Coaching"), _react.default.createElement(_link.default, null, "Contacts")))));
    }
  }]);

  return DemoAppLauncher;
}(_react.default.Component);

_defineProperty(DemoAppLauncher, "displayName", 'DemoAppLauncher');

var DemoAppLauncherNoHeaderButton =
/*#__PURE__*/
function (_React$Component8) {
  _inherits(DemoAppLauncherNoHeaderButton, _React$Component8);

  function DemoAppLauncherNoHeaderButton() {
    var _getPrototypeOf4;

    var _this4;

    _classCallCheck(this, DemoAppLauncherNoHeaderButton);

    for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
      args[_key3] = arguments[_key3];
    }

    _this4 = _possibleConstructorReturn(this, (_getPrototypeOf4 = _getPrototypeOf(DemoAppLauncherNoHeaderButton)).call.apply(_getPrototypeOf4, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this4), "state", {
      search: '',
      appLauncherOpen: false,
      allItemsSectionIsOpen: false
    });

    _defineProperty(_assertThisInitialized(_this4), "onSearch", function (event) {
      _this4.setState({
        search: event.target.value
      });
    });

    _defineProperty(_assertThisInitialized(_this4), "toggleAppLauncher", function () {
      _this4.setState({
        appLauncherOpen: !_this4.state.appLauncherOpen
      });
    });

    return _this4;
  }

  _createClass(DemoAppLauncherNoHeaderButton, [{
    key: "render",
    value: function render() {
      var search = _react.default.createElement(_search.default, {
        onChange: this.onSearch,
        placeholder: "Find an app",
        assistiveText: {
          label: 'Find an app'
        }
      });

      return _react.default.createElement(_globalNavigationBar.default, null, _react.default.createElement(_region.default, {
        region: "primary"
      }, _react.default.createElement(_appLauncher.default, {
        triggerName: "App Name",
        search: search,
        isOpen: this.state.appLauncherOpen,
        triggerOnClick: this.toggleAppLauncher,
        onClose: this.toggleAppLauncher
      }, _react.default.createElement(_expandableSection.default, {
        toggleable: true,
        title: "All Items"
      }, _react.default.createElement(DemoAppLauncherTile, {
        search: this.state.search
      }), _react.default.createElement(DemoAppLauncherTileWithIconNode, {
        search: this.state.search
      }), _react.default.createElement(DemoAppLauncherTileWithIconBackgroundColor, {
        search: this.state.search
      })), _react.default.createElement(_expandableSection.default, {
        title: "All Apps",
        toggleable: true
      }, _react.default.createElement(DemoAppLauncherTile, {
        search: this.state.search
      }), _react.default.createElement(DemoAppLauncherTileWithTruncatedText, {
        search: this.state.search
      })))));
    }
  }]);

  return DemoAppLauncherNoHeaderButton;
}(_react.default.Component);

_defineProperty(DemoAppLauncherNoHeaderButton, "displayName", 'DemoAppLauncherNoHeaderButton');

var DemoAppLauncherNoSearch =
/*#__PURE__*/
function (_React$Component9) {
  _inherits(DemoAppLauncherNoSearch, _React$Component9);

  function DemoAppLauncherNoSearch() {
    var _getPrototypeOf5;

    var _this5;

    _classCallCheck(this, DemoAppLauncherNoSearch);

    for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
      args[_key4] = arguments[_key4];
    }

    _this5 = _possibleConstructorReturn(this, (_getPrototypeOf5 = _getPrototypeOf(DemoAppLauncherNoSearch)).call.apply(_getPrototypeOf5, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this5), "state", {
      appLauncherOpen: false,
      allItemsSectionIsOpen: false
    });

    _defineProperty(_assertThisInitialized(_this5), "toggleAppLauncher", function () {
      _this5.setState({
        appLauncherOpen: !_this5.state.appLauncherOpen
      });
    });

    return _this5;
  }

  _createClass(DemoAppLauncherNoSearch, [{
    key: "render",
    value: function render() {
      var modalHeaderButton = _react.default.createElement(_button.default, {
        label: "App Exchange",
        onclick: (0, _addonActions.action)('Modal Button clicked!')
      });

      return _react.default.createElement(_globalNavigationBar.default, null, _react.default.createElement(_region.default, {
        region: "primary"
      }, _react.default.createElement(_appLauncher.default, {
        triggerName: "App Name",
        modalHeaderButton: modalHeaderButton,
        isOpen: this.state.appLauncherOpen,
        triggerOnClick: this.toggleAppLauncher,
        onClose: this.toggleAppLauncher
      }, _react.default.createElement(_expandableSection.default, {
        toggleable: true,
        title: "All Items"
      }, _react.default.createElement(DemoAppLauncherTile, null), _react.default.createElement(DemoAppLauncherTileWithIconNode, null), _react.default.createElement(DemoAppLauncherTileWithIconBackgroundColor, null)), _react.default.createElement(_expandableSection.default, {
        title: "All Apps",
        toggleable: true
      }, _react.default.createElement(DemoAppLauncherTile, null), _react.default.createElement(DemoAppLauncherTileWithTruncatedText, null)))));
    }
  }]);

  return DemoAppLauncherNoSearch;
}(_react.default.Component);

_defineProperty(DemoAppLauncherNoSearch, "displayName", 'DemoAppLauncherNoSearch');

var DemoAppLauncherWithSeveralSections =
/*#__PURE__*/
function (_React$Component10) {
  _inherits(DemoAppLauncherWithSeveralSections, _React$Component10);

  function DemoAppLauncherWithSeveralSections() {
    var _getPrototypeOf6;

    var _this6;

    _classCallCheck(this, DemoAppLauncherWithSeveralSections);

    for (var _len5 = arguments.length, args = new Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
      args[_key5] = arguments[_key5];
    }

    _this6 = _possibleConstructorReturn(this, (_getPrototypeOf6 = _getPrototypeOf(DemoAppLauncherWithSeveralSections)).call.apply(_getPrototypeOf6, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this6), "onSearch", function () {// stub
    });

    return _this6;
  }

  _createClass(DemoAppLauncherWithSeveralSections, [{
    key: "render",
    value: function render() {
      var search = _react.default.createElement(_search.default, {
        onChange: this.onSearch,
        placeholder: "Find an app",
        assistiveText: {
          label: 'Find an app'
        }
      });

      var modalHeaderButton = _react.default.createElement(_button.default, {
        label: "App Exchange",
        onclick: (0, _addonActions.action)('Modal Button clicked!')
      });

      return _react.default.createElement(_globalNavigationBar.default, null, _react.default.createElement(_region.default, {
        region: "primary"
      }, _react.default.createElement(_appLauncher.default, {
        triggerName: "App Name",
        search: search,
        modalHeaderButton: modalHeaderButton
      }, _react.default.createElement(_expandableSection.default, {
        nonCollapsible: true,
        title: "First Section"
      }, _react.default.createElement(DemoAppLauncherTile, null), _react.default.createElement(DemoAppLauncherTileWithIconNode, null), _react.default.createElement(DemoAppLauncherTileWithTruncatedText, null)), _react.default.createElement(_expandableSection.default, {
        nonCollapsible: true,
        title: "Second Section"
      }, _react.default.createElement(DemoAppLauncherTile, null), _react.default.createElement(DemoAppLauncherTileWithIconNode, null), _react.default.createElement(DemoAppLauncherTileWithTruncatedText, null)), _react.default.createElement(_expandableSection.default, {
        nonCollapsible: true,
        title: "Third Section"
      }, _react.default.createElement(DemoAppLauncherTile, null), _react.default.createElement(DemoAppLauncherTileWithIconNode, null), _react.default.createElement(DemoAppLauncherTileWithTruncatedText, null)), _react.default.createElement(_expandableSection.default, {
        nonCollapsible: true,
        title: "Fourth Section"
      }, _react.default.createElement(DemoAppLauncherTile, null), _react.default.createElement(DemoAppLauncherTileWithIconNode, null), _react.default.createElement(DemoAppLauncherTileWithTruncatedText, null)), _react.default.createElement(_expandableSection.default, {
        nonCollapsible: true,
        title: "Fifth Section"
      }, _react.default.createElement(DemoAppLauncherTile, null), _react.default.createElement(DemoAppLauncherTileWithIconNode, null), _react.default.createElement(DemoAppLauncherTileWithTruncatedText, null)))));
    }
  }]);

  return DemoAppLauncherWithSeveralSections;
}(_react.default.Component);

_defineProperty(DemoAppLauncherWithSeveralSections, "displayName", 'DemoAppLauncherWithSeveralSections');

var DemoAppLauncherLink =
/*#__PURE__*/
function (_React$Component11) {
  _inherits(DemoAppLauncherLink, _React$Component11);

  function DemoAppLauncherLink() {
    _classCallCheck(this, DemoAppLauncherLink);

    return _possibleConstructorReturn(this, _getPrototypeOf(DemoAppLauncherLink).apply(this, arguments));
  }

  _createClass(DemoAppLauncherLink, [{
    key: "render",
    value: function render() {
      return _react.default.createElement("div", null, _react.default.createElement("div", null, _react.default.createElement(_link.default, null, "Accounts")), _react.default.createElement("div", null, _react.default.createElement(_link.default, {
        className: "custom-class"
      }, "Announcements")), _react.default.createElement("div", null, _react.default.createElement(_link.default, {
        href: "http://www.salesforce.com"
      }, "Approvals")), _react.default.createElement("div", null, _react.default.createElement(_link.default, {
        onClick: (0, _addonActions.action)('Link clicked!')
      }, "Campaigns")), _react.default.createElement("div", null, _react.default.createElement(_link.default, {
        search: "se"
      }, "Cases")), _react.default.createElement("div", null, _react.default.createElement(_link.default, {
        title: "Custom Title"
      }, "Coaching")), _react.default.createElement("div", null, _react.default.createElement(_link.default, null, "Contacts")));
    }
  }]);

  return DemoAppLauncherLink;
}(_react.default.Component);

_defineProperty(DemoAppLauncherLink, "displayName", 'DemoAppLauncherLink');

(0, _react2.storiesOf)(_constants.APP_LAUNCHER, module).addDecorator(function (getStory) {
  return _react.default.createElement("div", {
    className: "slds-p-around_medium"
  }, _react.default.createElement(_iconSettings.default, {
    iconPath: "/assets/icons"
  }, getStory()));
}).add('App Launcher', function () {
  return _react.default.createElement(DemoAppLauncher, null);
}).add('App Launcher (open)', function () {
  return _react.default.createElement(DemoAppLauncher, {
    isOpen: true
  });
}).add('App Launcher no header button', function () {
  return _react.default.createElement(DemoAppLauncherNoHeaderButton, null);
}).add('App Launcher no search', function () {
  return _react.default.createElement(DemoAppLauncherNoSearch, null);
}).add('App Launcher with several sections (non-collapsible)', function () {
  return _react.default.createElement(DemoAppLauncherWithSeveralSections, null);
}).add('Tile', function () {
  return _react.default.createElement("div", {
    style: tileDemoStyles
  }, _react.default.createElement(DemoAppLauncherTile, null));
}).add('Tile with Icon node', function () {
  return _react.default.createElement("div", {
    style: tileDemoStyles
  }, _react.default.createElement(DemoAppLauncherTileWithIconNode, null));
}).add('Tile with Icon background color', function () {
  return _react.default.createElement("div", {
    style: tileDemoStyles
  }, _react.default.createElement(DemoAppLauncherTileWithIconBackgroundColor, null));
}).add('Tile with search text', function () {
  return _react.default.createElement("div", {
    style: tileDemoStyles
  }, _react.default.createElement(DemoAppLauncherTileWithSearchText, null));
}).add('Tile with truncated text', function () {
  return _react.default.createElement("div", {
    style: tileDemoStyles
  }, _react.default.createElement(DemoAppLauncherTileWithTruncatedText, null));
}).add('Expandable Section', function () {
  return _react.default.createElement(DemoAppLauncherExpandableSection, null);
}).add('Link', function () {
  return _react.default.createElement(DemoAppLauncherLink, null);
}).add('Doc site example', function () {
  return _react.default.createElement(_default.default, null);
});