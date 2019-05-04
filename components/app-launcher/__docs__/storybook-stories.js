"use strict";

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react2 = require("@storybook/react");

var _addonActions = require("@storybook/addon-actions");

var _constants = require("../../../utilities/constants");

var _appLauncher = _interopRequireDefault(require("../../app-launcher"));

var _tile = _interopRequireDefault(require("../../app-launcher/tile"));

var _section = _interopRequireDefault(require("../../app-launcher/section"));

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

var standardTileDemoStyles = {
  width: '20rem',
  paddingLeft: '.5rem',
  paddingRight: '.5rem'
};
var smallTileDemoStyles = {
  width: '6rem',
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
        title: "Marketing Cloud",
        iconText: "MC",
        description: "Send emails, track emails, read emails! Emails!",
        href: "https://www.marketingcloud.com/",
        onClick: (0, _addonActions.action)('Tile clicked! Actual href should be ignored'),
        search: this.props.search,
        size: this.props.size
      });
    }
  }]);

  return DemoAppLauncherTile;
}(_react.default.Component);

_defineProperty(DemoAppLauncherTile, "displayName", 'DemoAppLauncherTile');

_defineProperty(DemoAppLauncherTile, "propTypes", {
  search: _propTypes.default.string,
  size: _propTypes.default.string
});

var DemoAppLauncherSmallTile =
/*#__PURE__*/
function (_React$Component2) {
  _inherits(DemoAppLauncherSmallTile, _React$Component2);

  function DemoAppLauncherSmallTile() {
    _classCallCheck(this, DemoAppLauncherSmallTile);

    return _possibleConstructorReturn(this, _getPrototypeOf(DemoAppLauncherSmallTile).apply(this, arguments));
  }

  _createClass(DemoAppLauncherSmallTile, [{
    key: "render",
    value: function render() {
      return _react.default.createElement(_tile.default, {
        title: "Journey Builder",
        iconText: "JB",
        size: "small",
        onClick: (0, _addonActions.action)('Tiny tile clicked!')
      });
    }
  }]);

  return DemoAppLauncherSmallTile;
}(_react.default.Component);

_defineProperty(DemoAppLauncherSmallTile, "displayName", 'DemoAppLauncherSmallTile');

var DemoAppLauncherTileWithIconNode =
/*#__PURE__*/
function (_React$Component3) {
  _inherits(DemoAppLauncherTileWithIconNode, _React$Component3);

  function DemoAppLauncherTileWithIconNode() {
    _classCallCheck(this, DemoAppLauncherTileWithIconNode);

    return _possibleConstructorReturn(this, _getPrototypeOf(DemoAppLauncherTileWithIconNode).apply(this, arguments));
  }

  _createClass(DemoAppLauncherTileWithIconNode, [{
    key: "render",
    value: function render() {
      var icon = _react.default.createElement(_icon.default, {
        name: "campaign",
        category: "standard",
        size: "large"
      });

      return _react.default.createElement(_tile.default, {
        title: "Sales Cloud",
        description: "The primary internal Salesforce org.",
        href: "https://www.salesforce.com/",
        iconNode: icon,
        onClick: (0, _addonActions.action)('Tile with icon node clicked!'),
        search: this.props.search,
        size: this.props.size
      });
    }
  }]);

  return DemoAppLauncherTileWithIconNode;
}(_react.default.Component);

_defineProperty(DemoAppLauncherTileWithIconNode, "displayName", 'DemoAppLauncherTileWithIconNode');

_defineProperty(DemoAppLauncherTileWithIconNode, "propTypes", {
  search: _propTypes.default.string,
  size: _propTypes.default.string
});

var DemoAppLauncherTileWithIconText =
/*#__PURE__*/
function (_React$Component4) {
  _inherits(DemoAppLauncherTileWithIconText, _React$Component4);

  function DemoAppLauncherTileWithIconText() {
    _classCallCheck(this, DemoAppLauncherTileWithIconText);

    return _possibleConstructorReturn(this, _getPrototypeOf(DemoAppLauncherTileWithIconText).apply(this, arguments));
  }

  _createClass(DemoAppLauncherTileWithIconText, [{
    key: "render",
    value: function render() {
      return _react.default.createElement(_tile.default, {
        title: "Sales Cloud",
        description: "The primary internal Salesforce org.",
        iconText: "SC",
        onClick: (0, _addonActions.action)('Tile with icon text clicked!'),
        search: this.props.search,
        size: this.props.size
      });
    }
  }]);

  return DemoAppLauncherTileWithIconText;
}(_react.default.Component);

_defineProperty(DemoAppLauncherTileWithIconText, "displayName", 'DemoAppLauncherTileWithIconText');

_defineProperty(DemoAppLauncherTileWithIconText, "propTypes", {
  search: _propTypes.default.string,
  size: _propTypes.default.string
});

var DemoAppLauncherTileWithTruncatedText =
/*#__PURE__*/
function (_React$Component5) {
  _inherits(DemoAppLauncherTileWithTruncatedText, _React$Component5);

  function DemoAppLauncherTileWithTruncatedText() {
    _classCallCheck(this, DemoAppLauncherTileWithTruncatedText);

    return _possibleConstructorReturn(this, _getPrototypeOf(DemoAppLauncherTileWithTruncatedText).apply(this, arguments));
  }

  _createClass(DemoAppLauncherTileWithTruncatedText, [{
    key: "render",
    value: function render() {
      return _react.default.createElement(_tile.default, {
        title: "Call Center",
        description: "The key to call center and contact center is not to use too many words!",
        iconText: "CC",
        onClick: (0, _addonActions.action)('Tile with icon text clicked!'),
        search: this.props.search,
        size: this.props.size
      });
    }
  }]);

  return DemoAppLauncherTileWithTruncatedText;
}(_react.default.Component);

_defineProperty(DemoAppLauncherTileWithTruncatedText, "displayName", 'DemoAppLauncherTileWithTruncatedText');

_defineProperty(DemoAppLauncherTileWithTruncatedText, "propTypes", {
  search: _propTypes.default.string,
  size: _propTypes.default.string
});

var DemoAppLauncherTileWithDescriptionHeading =
/*#__PURE__*/
function (_React$Component6) {
  _inherits(DemoAppLauncherTileWithDescriptionHeading, _React$Component6);

  function DemoAppLauncherTileWithDescriptionHeading() {
    _classCallCheck(this, DemoAppLauncherTileWithDescriptionHeading);

    return _possibleConstructorReturn(this, _getPrototypeOf(DemoAppLauncherTileWithDescriptionHeading).apply(this, arguments));
  }

  _createClass(DemoAppLauncherTileWithDescriptionHeading, [{
    key: "render",
    value: function render() {
      return _react.default.createElement(_tile.default, {
        title: "Journey Builder",
        description: "Build 1:1 journeys blah blah blah and use way too many words",
        descriptionHeading: "Journey Builder",
        iconText: "JB",
        onClick: (0, _addonActions.action)('Tile with description heading clicked!'),
        search: this.props.search,
        size: this.props.size
      });
    }
  }]);

  return DemoAppLauncherTileWithDescriptionHeading;
}(_react.default.Component);

_defineProperty(DemoAppLauncherTileWithDescriptionHeading, "displayName", 'DemoAppLauncherTileWithDescriptionHeading');

_defineProperty(DemoAppLauncherTileWithDescriptionHeading, "propTypes", {
  search: _propTypes.default.string,
  size: _propTypes.default.string
});

_defineProperty(DemoAppLauncherTileWithDescriptionHeading, "defaultProps", {
  search: 'journey'
});

var DemoAppLauncherTileWithSearchText =
/*#__PURE__*/
function (_React$Component7) {
  _inherits(DemoAppLauncherTileWithSearchText, _React$Component7);

  function DemoAppLauncherTileWithSearchText() {
    _classCallCheck(this, DemoAppLauncherTileWithSearchText);

    return _possibleConstructorReturn(this, _getPrototypeOf(DemoAppLauncherTileWithSearchText).apply(this, arguments));
  }

  _createClass(DemoAppLauncherTileWithSearchText, [{
    key: "render",
    value: function render() {
      return _react.default.createElement(DemoAppLauncherTileWithTruncatedText, {
        search: this.props.search,
        size: this.props.size
      });
    }
  }]);

  return DemoAppLauncherTileWithSearchText;
}(_react.default.Component);

_defineProperty(DemoAppLauncherTileWithSearchText, "displayName", 'DemoAppLauncherTileWithSearchText');

_defineProperty(DemoAppLauncherTileWithSearchText, "propTypes", {
  search: _propTypes.default.string,
  size: _propTypes.default.string
});

_defineProperty(DemoAppLauncherTileWithSearchText, "defaultProps", {
  search: 'Call'
});

var DemoAppLauncherSection =
/*#__PURE__*/
function (_React$Component8) {
  _inherits(DemoAppLauncherSection, _React$Component8);

  function DemoAppLauncherSection() {
    _classCallCheck(this, DemoAppLauncherSection);

    return _possibleConstructorReturn(this, _getPrototypeOf(DemoAppLauncherSection).apply(this, arguments));
  }

  _createClass(DemoAppLauncherSection, [{
    key: "render",
    value: function render() {
      return _react.default.createElement("div", null, _react.default.createElement(_section.default, {
        assistiveText: {
          collapseSection: 'Collapse Section'
        },
        title: "All Items",
        toggleable: true,
        onToggleClick: (0, _addonActions.action)('Section `All Items` open -->')
      }, _react.default.createElement(DemoAppLauncherTile, null), _react.default.createElement(DemoAppLauncherTileWithIconText, null), _react.default.createElement(DemoAppLauncherTileWithIconNode, null)), _react.default.createElement(_section.default, {
        title: "All Apps",
        onToggleClick: (0, _addonActions.action)('Section `All App` open -->')
      }, _react.default.createElement(DemoAppLauncherTile, null), _react.default.createElement(DemoAppLauncherTileWithIconNode, null)));
    }
  }]);

  return DemoAppLauncherSection;
}(_react.default.Component);

_defineProperty(DemoAppLauncherSection, "displayName", 'DemoAppLauncherSection');

var DemoAppLauncherSectionWithSmallTiles =
/*#__PURE__*/
function (_React$Component9) {
  _inherits(DemoAppLauncherSectionWithSmallTiles, _React$Component9);

  function DemoAppLauncherSectionWithSmallTiles() {
    _classCallCheck(this, DemoAppLauncherSectionWithSmallTiles);

    return _possibleConstructorReturn(this, _getPrototypeOf(DemoAppLauncherSectionWithSmallTiles).apply(this, arguments));
  }

  _createClass(DemoAppLauncherSectionWithSmallTiles, [{
    key: "render",
    value: function render() {
      return _react.default.createElement("div", null, _react.default.createElement(_section.default, {
        title: "All Items",
        onToggleClick: (0, _addonActions.action)('Section `All Items` open -->')
      }, _react.default.createElement(DemoAppLauncherTile, null), _react.default.createElement(DemoAppLauncherTileWithIconText, null), _react.default.createElement(DemoAppLauncherTileWithIconNode, null)), _react.default.createElement(_section.default, {
        title: "All Apps",
        onToggleClick: (0, _addonActions.action)('Section `All App` open -->')
      }, _react.default.createElement(DemoAppLauncherTile, {
        size: "small"
      }), _react.default.createElement(DemoAppLauncherTileWithIconNode, {
        size: "small"
      })));
    }
  }]);

  return DemoAppLauncherSectionWithSmallTiles;
}(_react.default.Component);

_defineProperty(DemoAppLauncherSectionWithSmallTiles, "displayName", 'DemoAppLauncherSectionWithSmallTiles');

var DemoAppLauncher =
/*#__PURE__*/
function (_React$Component10) {
  _inherits(DemoAppLauncher, _React$Component10);

  function DemoAppLauncher() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, DemoAppLauncher);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(DemoAppLauncher)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "state", {
      search: '',
      appLauncherOpen: _this.props.isOpen || false,
      // eslint-disable-line react/prop-types
      allItemsSectionIsOpen: false
    });

    _defineProperty(_assertThisInitialized(_this), "onClear", function () {
      _this.setState({
        search: ''
      });
    });

    _defineProperty(_assertThisInitialized(_this), "onSearch", function (event) {
      _this.setState({
        search: event.target.value
      });
    });

    _defineProperty(_assertThisInitialized(_this), "toggleAppLauncher", function () {
      _this.setState({
        appLauncherOpen: !_this.state.appLauncherOpen
      });
    });

    _defineProperty(_assertThisInitialized(_this), "toggleSection", function () {
      _this.setState({
        allItemsSectionIsOpen: !_this.state.allItemsSectionIsOpen
      });
    });

    return _this;
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
      }, _react.default.createElement(_section.default, {
        toggleable: true,
        title: "All Items",
        isOpen: this.state.allItemsSectionIsOpen,
        onToggleClick: this.toggleSection
      }, _react.default.createElement(DemoAppLauncherTile, {
        search: this.state.search
      }), _react.default.createElement(DemoAppLauncherTileWithIconNode, {
        search: this.state.search
      }), _react.default.createElement(DemoAppLauncherTileWithIconText, {
        search: this.state.search
      }), _react.default.createElement(DemoAppLauncherTile, {
        search: this.state.search
      }), _react.default.createElement(DemoAppLauncherTileWithIconNode, {
        search: this.state.search
      }), _react.default.createElement(DemoAppLauncherTileWithIconText, {
        search: this.state.search
      })), _react.default.createElement(_section.default, {
        title: "All Apps",
        toggleable: true
      }, _react.default.createElement(DemoAppLauncherTile, {
        search: this.state.search
      }), _react.default.createElement(DemoAppLauncherTileWithTruncatedText, {
        search: this.state.search
      }), _react.default.createElement(DemoAppLauncherTileWithDescriptionHeading, {
        search: this.state.search
      }), _react.default.createElement(DemoAppLauncherTile, {
        search: this.state.search
      }), _react.default.createElement(DemoAppLauncherTileWithTruncatedText, {
        search: this.state.search
      }), _react.default.createElement(DemoAppLauncherTileWithDescriptionHeading, {
        search: this.state.search
      }), _react.default.createElement(DemoAppLauncherTile, {
        search: this.state.search
      }), _react.default.createElement(DemoAppLauncherTileWithTruncatedText, {
        search: this.state.search
      }), _react.default.createElement(DemoAppLauncherTileWithDescriptionHeading, {
        search: this.state.search
      })))));
    }
  }]);

  return DemoAppLauncher;
}(_react.default.Component);

_defineProperty(DemoAppLauncher, "displayName", 'DemoAppLauncher');

var DemoAppLauncherNoHeaderButton =
/*#__PURE__*/
function (_React$Component11) {
  _inherits(DemoAppLauncherNoHeaderButton, _React$Component11);

  function DemoAppLauncherNoHeaderButton() {
    var _getPrototypeOf3;

    var _this2;

    _classCallCheck(this, DemoAppLauncherNoHeaderButton);

    for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }

    _this2 = _possibleConstructorReturn(this, (_getPrototypeOf3 = _getPrototypeOf(DemoAppLauncherNoHeaderButton)).call.apply(_getPrototypeOf3, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this2), "state", {
      search: '',
      appLauncherOpen: false,
      allItemsSectionIsOpen: false
    });

    _defineProperty(_assertThisInitialized(_this2), "onSearch", function (event) {
      _this2.setState({
        search: event.target.value
      });
    });

    _defineProperty(_assertThisInitialized(_this2), "toggleAppLauncher", function () {
      _this2.setState({
        appLauncherOpen: !_this2.state.appLauncherOpen
      });
    });

    return _this2;
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
      }, _react.default.createElement(_section.default, {
        toggleable: true,
        title: "All Items"
      }, _react.default.createElement(DemoAppLauncherTile, {
        search: this.state.search
      }), _react.default.createElement(DemoAppLauncherTileWithIconNode, {
        search: this.state.search
      }), _react.default.createElement(DemoAppLauncherTileWithIconText, {
        search: this.state.search
      })), _react.default.createElement(_section.default, {
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
function (_React$Component12) {
  _inherits(DemoAppLauncherNoSearch, _React$Component12);

  function DemoAppLauncherNoSearch() {
    var _getPrototypeOf4;

    var _this3;

    _classCallCheck(this, DemoAppLauncherNoSearch);

    for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
      args[_key3] = arguments[_key3];
    }

    _this3 = _possibleConstructorReturn(this, (_getPrototypeOf4 = _getPrototypeOf(DemoAppLauncherNoSearch)).call.apply(_getPrototypeOf4, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this3), "state", {
      appLauncherOpen: false,
      allItemsSectionIsOpen: false
    });

    _defineProperty(_assertThisInitialized(_this3), "toggleAppLauncher", function () {
      _this3.setState({
        appLauncherOpen: !_this3.state.appLauncherOpen
      });
    });

    return _this3;
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
      }, _react.default.createElement(_section.default, {
        toggleable: true,
        title: "All Items"
      }, _react.default.createElement(DemoAppLauncherTile, null), _react.default.createElement(DemoAppLauncherTileWithIconNode, null), _react.default.createElement(DemoAppLauncherTileWithIconText, null)), _react.default.createElement(_section.default, {
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
function (_React$Component13) {
  _inherits(DemoAppLauncherWithSeveralSections, _React$Component13);

  function DemoAppLauncherWithSeveralSections() {
    var _getPrototypeOf5;

    var _this4;

    _classCallCheck(this, DemoAppLauncherWithSeveralSections);

    for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
      args[_key4] = arguments[_key4];
    }

    _this4 = _possibleConstructorReturn(this, (_getPrototypeOf5 = _getPrototypeOf(DemoAppLauncherWithSeveralSections)).call.apply(_getPrototypeOf5, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this4), "onSearch", function () {// stub
    });

    return _this4;
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
      }, _react.default.createElement(_section.default, {
        title: "First Section"
      }, _react.default.createElement(DemoAppLauncherTile, null), _react.default.createElement(DemoAppLauncherTileWithIconNode, null), _react.default.createElement(DemoAppLauncherTileWithTruncatedText, null)), _react.default.createElement(_section.default, {
        title: "Second Section"
      }, _react.default.createElement(DemoAppLauncherTile, null), _react.default.createElement(DemoAppLauncherTileWithIconNode, null), _react.default.createElement(DemoAppLauncherTileWithTruncatedText, null)), _react.default.createElement(_section.default, {
        title: "Third Section"
      }, _react.default.createElement(DemoAppLauncherTile, null), _react.default.createElement(DemoAppLauncherTileWithIconNode, null), _react.default.createElement(DemoAppLauncherTileWithTruncatedText, null)), _react.default.createElement(_section.default, {
        title: "Fourth Section"
      }, _react.default.createElement(DemoAppLauncherTile, null), _react.default.createElement(DemoAppLauncherTileWithIconNode, null), _react.default.createElement(DemoAppLauncherTileWithTruncatedText, null)), _react.default.createElement(_section.default, {
        title: "Fifth Section"
      }, _react.default.createElement(DemoAppLauncherTile, null), _react.default.createElement(DemoAppLauncherTileWithIconNode, null), _react.default.createElement(DemoAppLauncherTileWithTruncatedText, null)))));
    }
  }]);

  return DemoAppLauncherWithSeveralSections;
}(_react.default.Component);

_defineProperty(DemoAppLauncherWithSeveralSections, "displayName", 'DemoAppLauncherWithSeveralSections');

(0, _react2.storiesOf)(_constants.APP_LAUNCHER, module).addDecorator(function (getStory) {
  return _react.default.createElement("div", {
    className: "slds-p-around_medium"
  }, _react.default.createElement(_iconSettings.default, {
    iconPath: "/assets/icons"
  }, getStory()));
}).add('App Launcher (open)', function () {
  return _react.default.createElement(DemoAppLauncher, {
    isOpen: true
  });
}).add('App Launcher', function () {
  return _react.default.createElement(DemoAppLauncher, null);
}).add('App Launcher no header button', function () {
  return _react.default.createElement(DemoAppLauncherNoHeaderButton, null);
}).add('App Launcher no search', function () {
  return _react.default.createElement(DemoAppLauncherNoSearch, null);
}).add('App Launcher with several sections (no toggle)', function () {
  return _react.default.createElement(DemoAppLauncherWithSeveralSections, null);
}).add('Tile', function () {
  return _react.default.createElement("div", {
    style: standardTileDemoStyles
  }, _react.default.createElement(DemoAppLauncherTile, null));
}).add('Small Tile', function () {
  return _react.default.createElement("div", {
    style: smallTileDemoStyles
  }, _react.default.createElement(DemoAppLauncherSmallTile, null));
}).add('Tile with Icon node', function () {
  return _react.default.createElement("div", {
    style: standardTileDemoStyles
  }, _react.default.createElement(DemoAppLauncherTileWithIconNode, null));
}).add('Tile with icon text', function () {
  return _react.default.createElement("div", {
    style: standardTileDemoStyles
  }, _react.default.createElement(DemoAppLauncherTileWithIconText, null));
}).add('Tile with search text', function () {
  return _react.default.createElement("div", {
    style: standardTileDemoStyles
  }, _react.default.createElement(DemoAppLauncherTileWithSearchText, null));
}).add('Tile with truncated text', function () {
  return _react.default.createElement("div", {
    style: standardTileDemoStyles
  }, _react.default.createElement(DemoAppLauncherTileWithTruncatedText, null));
}).add('Tile with description heading', function () {
  return _react.default.createElement("div", {
    style: standardTileDemoStyles
  }, _react.default.createElement(DemoAppLauncherTileWithDescriptionHeading, null));
}).add('Section', function () {
  return _react.default.createElement(DemoAppLauncherSection, null);
}).add('Section with small tiles', function () {
  return _react.default.createElement(DemoAppLauncherSectionWithSmallTiles, null);
}).add('Doc site example', function () {
  return _react.default.createElement(_default.default, null);
});