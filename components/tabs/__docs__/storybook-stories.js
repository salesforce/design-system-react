"use strict";

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react2 = require("@storybook/react");

var _addonActions = require("@storybook/addon-actions");

var _classnames = _interopRequireDefault(require("classnames"));

var _iconSettings = _interopRequireDefault(require("../../icon-settings"));

var _constants = require("../../../utilities/constants");

var _tabs = _interopRequireDefault(require("../../tabs"));

var _panel = _interopRequireDefault(require("../../tabs/panel"));

var _input = _interopRequireDefault(require("../../input"));

var _inputIcon = _interopRequireDefault(require("../../icon/input-icon"));

var _checkbox = _interopRequireDefault(require("../../checkbox"));

var _button = _interopRequireDefault(require("../../button"));

var _icon = _interopRequireDefault(require("../../icon"));

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

/* eslint-disable react/display-name */
var getTabs = function getTabs() {
  return _react.default.createElement("div", null, _react.default.createElement("h2", {
    className: "slds-text-heading_large"
  }, "Base Tabs Demo"), _react.default.createElement(_tabs.default, {
    id: "main-tabs-demo",
    className: "custom-class-is-custom",
    foo: "baz"
  }, _react.default.createElement(_panel.default, {
    label: "Tab 1"
  }, _react.default.createElement("h2", {
    className: "slds-text-heading_medium"
  }, "This is my tab 1 contents!"), _react.default.createElement("p", null, "And they\u2019re amazing."), _react.default.createElement("p", null, "It\"s awesome."), _react.default.createElement("p", null, "You can use your ", _react.default.createElement("var", null, "TAB"), " and ", _react.default.createElement("var", null, "ARROW"), " keys to navigate around. Try it!"), _react.default.createElement("p", {
    className: "slds-box slds-theme_info slds-m-top_large"
  }, "(You might have to hit shift+tab to put the focus onto the tab bar ;)")), _react.default.createElement(_panel.default, {
    label: "Tab 2"
  }, _react.default.createElement("h2", {
    className: "slds-text-heading_medium"
  }, "This is my tab 2 contents!"), _react.default.createElement("p", null, "And they\u2019re also amazing.")), _react.default.createElement(_panel.default, {
    label: "Tab 3"
  }, _react.default.createElement("h2", {
    className: "slds-text-heading_medium"
  }, "This is my tab 3 contents!"), _react.default.createElement("p", null, "And they\u2019re quite spectacular."))));
};
/* eslint-enable react/display-name */

/* eslint-disable react/display-name */


var getTabsMoreThanOneAllowGeneratedID = function getTabsMoreThanOneAllowGeneratedID() {
  return _react.default.createElement("div", null, _react.default.createElement("h2", {
    className: "slds-text-heading_large"
  }, "Generated Unique IDs Demo"), _react.default.createElement(_tabs.default, null, _react.default.createElement(_panel.default, {
    label: "Only 1 Tab"
  }, _react.default.createElement("h2", {
    className: "slds-text-heading_medium"
  }, "About this story"), _react.default.createElement("p", null, "There should be two instances of Tabs in this story, and each should have a unique (generated) ID."))), _react.default.createElement(_tabs.default, null, _react.default.createElement(_panel.default, {
    label: "Only 1 Tab"
  }, _react.default.createElement("h2", {
    className: "slds-text-heading_medium"
  }, "About this story"), _react.default.createElement("p", null, "There should be two instances of Tabs in this story, and each should have a unique (generated) ID."))));
};
/* eslint-enable react/display-name */

/* eslint-disable react/display-name */


var getTabsNested = function getTabsNested() {
  return _react.default.createElement("div", null, _react.default.createElement("h2", {
    className: "slds-text-heading_large"
  }, "Nested Tabs Demo"), _react.default.createElement(_tabs.default, {
    id: "nested-tabs-demo"
  }, _react.default.createElement(_panel.default, {
    label: "Tab 1"
  }, _react.default.createElement("h2", {
    className: "slds-text-heading_medium"
  }, "This is my tab 1 contents!"), _react.default.createElement("p", null, "And they\u2019re ", _react.default.createElement("a", {
    href: "#amazing"
  }, "amazing"), ".")), _react.default.createElement(_panel.default, {
    label: "Tab 2"
  }, _react.default.createElement("h2", {
    className: "slds-text-heading_medium"
  }, "This is my tab 2 contents!"), _react.default.createElement("p", null, "And they\u2019re also amazing."), _react.default.createElement(_input.default, {
    id: "unique-id-123",
    name: "left-clickable-icon",
    label: "Input Label",
    iconLeft: _react.default.createElement(_inputIcon.default, {
      name: "search",
      category: "utility",
      onClick: (0, _addonActions.action)('search icon clicked')
    }),
    placeholder: "You can tab onto this to focus it."
  })), _react.default.createElement(_panel.default, {
    label: "Tab 3 (has children)"
  }, _react.default.createElement("h2", {
    className: "slds-text-heading_medium"
  }, "This is my tab 3 contents!"), _react.default.createElement("p", null, "And they\u2019re tabceptionish."), _react.default.createElement("div", {
    className: "slds-box slds-m-vertical_large"
  }, _react.default.createElement(_tabs.default, {
    defaultSelectedIndex: 0
  }, _react.default.createElement(_panel.default, {
    label: "Tab 1"
  }, _react.default.createElement("h2", {
    className: "slds-text-heading_medium"
  }, "This is my tab 1 contents!"), _react.default.createElement("p", null, "And they\u2019re amazing.")), _react.default.createElement(_panel.default, {
    label: "Tab 2"
  }, _react.default.createElement("h2", {
    className: "slds-text-heading_medium"
  }, "This is my tab 2 contents!"), _react.default.createElement("p", null, "And they\u2019re also amazing.")), _react.default.createElement(_panel.default, {
    label: "Tab 3 (Also has children!)"
  }, _react.default.createElement("h2", {
    className: "slds-text-heading_medium"
  }, "This is my tab 3 contents!"), _react.default.createElement("p", null, "And they\u2019re even ", _react.default.createElement("em", null, "more"), " tabceptionish."), _react.default.createElement("div", {
    className: "slds-box slds-m-vertical_large"
  }, _react.default.createElement(_tabs.default, {
    defaultSelectedIndex: 0
  }, _react.default.createElement(_panel.default, {
    label: "Tab 1 (no children!)"
  }, _react.default.createElement("h2", {
    className: "slds-text-heading_medium"
  }, "This is my tab 1 contents!"), _react.default.createElement("p", null, "And they\u2019re amazing."))))))))));
};
/* eslint-enable react/display-name */

/* eslint-disable react/display-name */


var getTabsScoped = function getTabsScoped() {
  return _react.default.createElement("div", null, _react.default.createElement("h2", {
    className: "slds-text-heading_large"
  }, "Scoped Tabs Demo"), _react.default.createElement(_tabs.default, {
    id: "scoped-tabs-demo",
    variant: "scoped"
  }, _react.default.createElement(_panel.default, {
    label: "Tab 1"
  }, _react.default.createElement("h2", {
    className: "slds-text-heading_medium"
  }, "This is my tab 1 contents!"), _react.default.createElement("p", null, "And they\u2019re amazing."), _react.default.createElement("p", null, "It\"s awesome."), _react.default.createElement("p", null, "You can use your ", _react.default.createElement("var", null, "TAB"), " and ", _react.default.createElement("var", null, "ARROW"), " keys to navigate around. Try it!"), _react.default.createElement("p", {
    className: "slds-box slds-theme_info slds-m-top_large"
  }, "(You might have to hit shift+tab to put the focus onto the tab bar ;)")), _react.default.createElement(_panel.default, {
    label: "Tab 2"
  }, _react.default.createElement("h2", {
    className: "slds-text-heading_medium"
  }, "This is my tab 2 contents!"), _react.default.createElement("p", null, "And they\u2019re also amazing.")), _react.default.createElement(_panel.default, {
    label: "Tab 3"
  }, _react.default.createElement("h2", {
    className: "slds-text-heading_medium"
  }, "This is my tab 3 contents!"), _react.default.createElement("p", null, "And they\u2019re quite spectacular."))));
};
/* eslint-enable react/display-name */


var DemoTabsConditional =
/*#__PURE__*/
function (_React$Component) {
  _inherits(DemoTabsConditional, _React$Component);

  function DemoTabsConditional() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, DemoTabsConditional);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(DemoTabsConditional)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "state", {
      showA: true,
      showB: true,
      showC: true,
      disableA: false,
      disableB: true,
      disableC: true
    });

    _defineProperty(_assertThisInitialized(_this), "handleCheckClicked", function (checked, event) {
      var state = {};
      state[event.target.name] = checked;

      _this.setState(state);
    });

    _defineProperty(_assertThisInitialized(_this), "handleCheckClickedDisable", function (checked, event) {
      var state = {};
      state[event.target.name] = checked;

      _this.setState(state);
    });

    _defineProperty(_assertThisInitialized(_this), "renderPaneA", function (disabled) {
      return _react.default.createElement(_panel.default, {
        label: "Tab A",
        disabled: disabled
      }, _react.default.createElement("p", null, "This is tab A."), _react.default.createElement("div", null, _react.default.createElement(_checkbox.default, {
        assistiveText: {
          label: 'Disable tab B'
        },
        checked: _this.state.disableB,
        onChange: _this.handleCheckClickedDisable,
        label: "Disable tab B",
        name: "disableB"
      }), _react.default.createElement(_checkbox.default, {
        assistiveText: {
          label: 'Disable tab C'
        },
        checked: _this.state.disableC,
        onChange: _this.handleCheckClickedDisable,
        label: "Disable tab C",
        name: "disableC"
      })));
    });

    return _this;
  }

  _createClass(DemoTabsConditional, [{
    key: "render",
    value: function render() {
      return _react.default.createElement("div", null, _react.default.createElement("h2", {
        className: "slds-text-heading_large"
      }, "Conditional Tabs Demo"), _react.default.createElement(_checkbox.default, {
        assistiveText: {
          label: 'Show tab A'
        },
        checked: this.state.showA,
        onChange: this.handleCheckClicked,
        label: "Show tab A",
        name: "showA"
      }), _react.default.createElement(_checkbox.default, {
        assistiveText: {
          label: 'Show tab B'
        },
        checked: this.state.showB,
        onChange: this.handleCheckClicked,
        label: "Show tab B",
        name: "showB"
      }), _react.default.createElement(_checkbox.default, {
        checked: this.state.showC,
        onChange: this.handleCheckClicked,
        assistiveText: {
          label: 'Show tab C'
        },
        label: "Show tab C",
        name: "showC"
      }), _react.default.createElement(_tabs.default, {
        className: (0, _classnames.default)('slds-m-top_large', this.props.className),
        onSelect: this.handleSelectNopesOnThree
      }, this.state.showA && this.renderPaneA(this.state.disableA), this.state.showB && this.state.disableB ? _react.default.createElement(_panel.default, {
        label: "Tab B",
        disabled: true
      }, _react.default.createElement("p", null, "This is tab B.")) : this.state.showB && _react.default.createElement(_panel.default, {
        label: "Tab B"
      }, _react.default.createElement("p", null, "This is tab B.")), this.state.showC && this.state.disableC ? _react.default.createElement(_panel.default, {
        label: "Tab C",
        disabled: true
      }, _react.default.createElement("p", null, "This is tab C.")) : this.state.showC && _react.default.createElement(_panel.default, {
        label: "Tab C"
      }, _react.default.createElement("p", null, "This is tab C."))));
    }
  }]);

  return DemoTabsConditional;
}(_react.default.Component);

_defineProperty(DemoTabsConditional, "displayName", 'DemoTabsConditional');

_defineProperty(DemoTabsConditional, "propTypes", {
  /**
   * Class names to be added to the container element and is passed along to its children.
   */
  className: _propTypes.default.oneOfType([_propTypes.default.array, _propTypes.default.object, _propTypes.default.string])
});

var DemoTabsOutsideControl =
/*#__PURE__*/
function (_React$Component2) {
  _inherits(DemoTabsOutsideControl, _React$Component2);

  function DemoTabsOutsideControl() {
    var _getPrototypeOf3;

    var _this2;

    _classCallCheck(this, DemoTabsOutsideControl);

    for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }

    _this2 = _possibleConstructorReturn(this, (_getPrototypeOf3 = _getPrototypeOf(DemoTabsOutsideControl)).call.apply(_getPrototypeOf3, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this2), "state", {
      whichOneSelectedYo: _this2.props.whichOneSelectedYo || 0,
      prevOneSelectedYo: _this2.props.prevOneSelectedYo || 0
    });

    _defineProperty(_assertThisInitialized(_this2), "handleSelect", function (index, last) {
      var toReturn = true;

      if (index === _this2.state.whichOneSelectedYo && last === _this2.state.prevOneSelectedYo) {
        toReturn = false;
      } else {
        (0, _addonActions.action)('handleSelect')(index, last);

        _this2.setState({
          whichOneSelectedYo: index,
          prevOneSelectedYo: last
        });
      }

      return toReturn;
    });

    _defineProperty(_assertThisInitialized(_this2), "showState", function () {
      (0, _addonActions.action)('showState (current)')(_this2.state.whichOneSelectedYo);
      (0, _addonActions.action)('showState (previous)')(_this2.state.prevOneSelectedYo);
    });

    _defineProperty(_assertThisInitialized(_this2), "handleButtonClicked", function (event) {
      var prevOneSelected = _this2.state.prevOneSelectedYo;
      var thisOneSelected = _this2.state.whichOneSelectedYo;
      (0, _addonActions.action)('handleButtonClicked')(event.currentTarget.id);

      switch (event.currentTarget.id) {
        case 'monday':
          _this2.handleSelect(0, thisOneSelected);

          break;

        case 'tuesday':
          _this2.handleSelect(1, thisOneSelected);

          break;

        case 'tuesday-alt':
          _this2.handleSelect(1, thisOneSelected);

          break;

        case 'wednesday':
          _this2.handleSelect(2, thisOneSelected);

          break;

        case 'thursday':
          _this2.handleSelect(3, thisOneSelected);

          break;

        case 'friday':
          _this2.handleSelect(4, thisOneSelected);

          break;

        case 'none':
          _this2.handleSelect(undefined, thisOneSelected);

          break;

        case 'previous':
          _this2.handleSelect(prevOneSelected, thisOneSelected);

          break;

        case 'show-state':
          _this2.showState();

          break;

        default:
          // Statements executed when none of the values match the value of the expression
          _this2.handleSelect(thisOneSelected, prevOneSelected);

      }
    });

    return _this2;
  }

  _createClass(DemoTabsOutsideControl, [{
    key: "render",
    value: function render() {
      return _react.default.createElement("div", null, _react.default.createElement("h2", {
        className: "slds-text-heading_large"
      }, "Outside Tabs Demo"), _react.default.createElement("p", null, "Here we have several buttons, which are used to pass a new", ' ', _react.default.createElement("code", null, "selectedIndex"), " into the Tabs component."), _react.default.createElement("p", {
        className: "slds-m-bottom_large"
      }, "This shows that you can pass a new selected index property into the component from the outside and have it re-render."), _react.default.createElement(_button.default, {
        id: "show-state",
        label: "Show State",
        onClick: this.showState
      }), _react.default.createElement(_button.default, {
        id: "monday",
        label: "Monday",
        onClick: this.handleButtonClicked
      }), _react.default.createElement(_button.default, {
        id: "tuesday",
        label: "Tuesday",
        onClick: this.handleButtonClicked
      }), _react.default.createElement(_button.default, {
        id: "wednesday",
        label: "Wednesday",
        onClick: this.handleButtonClicked
      }), _react.default.createElement(_button.default, {
        id: "thursday",
        label: "Thursday",
        onClick: this.handleButtonClicked
      }), _react.default.createElement(_button.default, {
        id: "friday",
        label: "Friday",
        onClick: this.handleButtonClicked
      }), _react.default.createElement(_button.default, {
        id: "none",
        label: "None",
        onClick: this.handleButtonClicked
      }), _react.default.createElement(_button.default, {
        id: "previous",
        label: "Previous",
        onClick: this.handleButtonClicked
      }), _react.default.createElement(_tabs.default, {
        className: (0, _classnames.default)('slds-m-top_large', this.props.className),
        selectedIndex: this.state.whichOneSelectedYo,
        onSelect: this.handleSelect
      }, _react.default.createElement(_panel.default, {
        label: "Monday"
      }, _react.default.createElement("p", null, "This is Monday\"s Pane."), _react.default.createElement(_button.default, {
        id: "tuesday-alt",
        label: "Submit and go to next tab",
        onClick: this.handleButtonClicked
      })), _react.default.createElement(_panel.default, {
        label: "Tuesday"
      }, _react.default.createElement("p", null, "This is Tuesday\"s Pane.")), _react.default.createElement(_panel.default, {
        label: "Wednesday"
      }, _react.default.createElement("p", null, "This is Wednesday\"s Pane.")), _react.default.createElement(_panel.default, {
        label: "Thursday"
      }, _react.default.createElement("p", null, "Thursday\"s Pane has far to go.")), _react.default.createElement(_panel.default, {
        label: "Friday"
      }, _react.default.createElement("p", null, "This is Friday\"s Pane."))));
    }
  }]);

  return DemoTabsOutsideControl;
}(_react.default.Component);
/* eslint-disable react/display-name */


_defineProperty(DemoTabsOutsideControl, "displayName", 'DemoTabsOutsideControl');

_defineProperty(DemoTabsOutsideControl, "propTypes", {
  /**
   * Class names to be added to the container element and is passed along to its children.
   */
  className: _propTypes.default.oneOfType([_propTypes.default.array, _propTypes.default.object, _propTypes.default.string]),

  /**
   * The Tab (and corresponding TabPanel) that is selected when the component renders. Defaults to `0`.
   */
  whichOneSelectedYo: _propTypes.default.number,
  prevOneSelectedYo: _propTypes.default.number
});

var getTabsDisabled = function getTabsDisabled() {
  return _react.default.createElement("div", null, _react.default.createElement("h2", {
    className: "slds-text-heading_large"
  }, "Disabled Tabs Demo"), _react.default.createElement(_tabs.default, {
    id: "disabled-tabs-demo"
  }, _react.default.createElement(_panel.default, {
    label: "Tab 1"
  }, _react.default.createElement("h2", {
    className: "slds-text-heading_medium"
  }, "This is my tab 1 contents!"), _react.default.createElement("p", null, "And they\u2019re amazing."), _react.default.createElement("p", null, "It\"s awesome."), _react.default.createElement("p", null, "You can use your ", _react.default.createElement("var", null, "TAB"), " and ", _react.default.createElement("var", null, "ARROW"), " keys to navigate around. Try it!"), _react.default.createElement("p", {
    className: "slds-box slds-theme_info slds-m-top_large"
  }, "(You might have to hit shift+tab to put the focus onto the tab bar ;)")), _react.default.createElement(_panel.default, {
    label: "Tab 2",
    disabled: true
  }, _react.default.createElement("h2", {
    className: "slds-text-heading_medium"
  }, "This is my tab 2 contents!"), _react.default.createElement("p", null, "And they\u2019re also amazing.")), _react.default.createElement(_panel.default, {
    label: "Tab 3"
  }, _react.default.createElement("h2", {
    className: "slds-text-heading_medium"
  }, "This is my tab 3 contents!"), _react.default.createElement("p", null, "And they\u2019re quite spectacular.")), _react.default.createElement(_panel.default, {
    label: "Tab 4"
  }, _react.default.createElement("h2", {
    className: "slds-text-heading_medium"
  }, "This is my tab 3 contents!"), _react.default.createElement("p", null, "Note that using your arrow keys you can loop ", _react.default.createElement("em", null, "around the tabs"), "! \uD83C\uDF89"))));
};
/* eslint-enable react/display-name */

/* eslint-disable react/display-name */


var getCustomContentTabs = function getCustomContentTabs() {
  var tab1Label = _react.default.createElement("div", {
    "aria-label": "test accessibility!"
  }, _react.default.createElement(_icon.default, {
    category: "utility",
    name: "list",
    style: {
      marginRight: '.5rem'
    },
    size: "x-small"
  }), _react.default.createElement("span", null, "my tab"));

  var tab2Label = _react.default.createElement("span", {
    style: {
      color: 'red'
    }
  }, "my other tab");

  return _react.default.createElement("div", null, _react.default.createElement("h2", {
    className: "slds-text-heading_large"
  }, "Custom Tab Contents Demo"), _react.default.createElement(_tabs.default, null, _react.default.createElement(_panel.default, {
    label: tab1Label
  }, _react.default.createElement("h2", {
    className: "slds-text-heading_medium"
  }, "This is my first custom content tab!")), _react.default.createElement(_panel.default, {
    label: tab2Label
  }, _react.default.createElement("h2", {
    className: "slds-text-heading_medium"
  }, "This is my second custom content tab!"))));
};
/* eslint-enable react/display-name */


var DemoTabsInterceptSelect =
/*#__PURE__*/
function (_React$Component3) {
  _inherits(DemoTabsInterceptSelect, _React$Component3);

  function DemoTabsInterceptSelect() {
    var _getPrototypeOf4;

    var _this3;

    _classCallCheck(this, DemoTabsInterceptSelect);

    for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
      args[_key3] = arguments[_key3];
    }

    _this3 = _possibleConstructorReturn(this, (_getPrototypeOf4 = _getPrototypeOf(DemoTabsInterceptSelect)).call.apply(_getPrototypeOf4, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this3), "state", {
      intercepts: 0
    });

    _defineProperty(_assertThisInitialized(_this3), "handleTabSelect", function (next, last) {
      (0, _addonActions.action)('handleTabSelect')(next, last);
      var intercepts = _this3.state.intercepts + 1;

      _this3.setState({
        intercepts: intercepts
      });

      return false;
    });

    return _this3;
  }

  _createClass(DemoTabsInterceptSelect, [{
    key: "render",
    value: function render() {
      return _react.default.createElement("div", null, _react.default.createElement(_tabs.default, {
        onSelect: this.handleTabSelect
      }, _react.default.createElement(_panel.default, {
        label: "Panel with intercept"
      }, _react.default.createElement("p", null, "Default Panel"), this.state.intercepts > 0 && _react.default.createElement("p", null, "We've intercepted navigation ".concat(this.state.intercepts, " time(s)"))), _react.default.createElement(_panel.default, {
        label: "Unreachable panel"
      }, _react.default.createElement("p", null, "You should never see this message"))), _react.default.createElement("div", {
        style: {
          height: '20px'
        }
      }), _react.default.createElement(_tabs.default, null, _react.default.createElement(_panel.default, {
        label: "Panel still working as intended"
      }, _react.default.createElement("p", null, "Default Panel")), _react.default.createElement(_panel.default, {
        label: "Destination panel"
      }, _react.default.createElement("p", null, "You should be able to reach this panel"))));
    }
  }]);

  return DemoTabsInterceptSelect;
}(_react.default.Component);

_defineProperty(DemoTabsInterceptSelect, "displayName", 'DemoTabsInterceptSelect');

(0, _react2.storiesOf)(_constants.TABS, module).addDecorator(function (getStory) {
  return _react.default.createElement("div", {
    className: "slds-p-around_medium"
  }, _react.default.createElement(_iconSettings.default, {
    iconPath: "/assets/icons"
  }, getStory()));
}).add('Base', function () {
  return getTabs();
}).add('With disabled tab', function () {
  return getTabsDisabled();
}).add('Nested', function () {
  return getTabsNested();
}).add('Outside Control', function () {
  return _react.default.createElement(DemoTabsOutsideControl, {
    className: "controlled-yo"
  });
}).add('Conditional', function () {
  return _react.default.createElement(DemoTabsConditional, {
    className: "conditional-yo"
  });
}).add('Unique Generated IDs', function () {
  return getTabsMoreThanOneAllowGeneratedID();
}).add('Scoped', function () {
  return getTabsScoped();
}).add('Custom Tab Contents', function () {
  return getCustomContentTabs();
}).add('Tab Intercept Panel Select', function () {
  return _react.default.createElement(DemoTabsInterceptSelect, null);
});