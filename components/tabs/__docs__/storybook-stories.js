"use strict";

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react3 = require("@storybook/react");

var _addonActions = require("@storybook/addon-actions");

var _classnames = require("classnames");

var _classnames2 = _interopRequireDefault(_classnames);

var _iconSettings = require("../../icon-settings");

var _iconSettings2 = _interopRequireDefault(_iconSettings);

var _constants = require("../../../utilities/constants");

var _tabs = require("../../tabs");

var _tabs2 = _interopRequireDefault(_tabs);

var _panel = require("../../tabs/panel");

var _panel2 = _interopRequireDefault(_panel);

var _input = require("../../input");

var _input2 = _interopRequireDefault(_input);

var _inputIcon = require("../../icon/input-icon");

var _inputIcon2 = _interopRequireDefault(_inputIcon);

var _checkbox = require("../../checkbox");

var _checkbox2 = _interopRequireDefault(_checkbox);

var _button = require("../../button");

var _button2 = _interopRequireDefault(_button);

var _icon = require("../../icon");

var _icon2 = _interopRequireDefault(_icon);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

/* eslint-disable react/display-name */
var getTabs = function getTabs() {
  return _react2.default.createElement("div", null, _react2.default.createElement("h2", {
    className: "slds-text-heading_large"
  }, "Base Tabs Demo"), _react2.default.createElement(_tabs2.default, {
    id: "main-tabs-demo",
    className: "custom-class-is-custom",
    foo: "baz"
  }, _react2.default.createElement(_panel2.default, {
    label: "Tab 1"
  }, _react2.default.createElement("h2", {
    className: "slds-text-heading_medium"
  }, "This is my tab 1 contents!"), _react2.default.createElement("p", null, "And they\u2019re amazing."), _react2.default.createElement("p", null, "It\"s awesome."), _react2.default.createElement("p", null, "You can use your ", _react2.default.createElement("var", null, "TAB"), " and ", _react2.default.createElement("var", null, "ARROW"), " keys to navigate around. Try it!"), _react2.default.createElement("p", {
    className: "slds-box slds-theme_info slds-m-top_large"
  }, "(You might have to hit shift+tab to put the focus onto the tab bar ;)")), _react2.default.createElement(_panel2.default, {
    label: "Tab 2"
  }, _react2.default.createElement("h2", {
    className: "slds-text-heading_medium"
  }, "This is my tab 2 contents!"), _react2.default.createElement("p", null, "And they\u2019re also amazing.")), _react2.default.createElement(_panel2.default, {
    label: "Tab 3"
  }, _react2.default.createElement("h2", {
    className: "slds-text-heading_medium"
  }, "This is my tab 3 contents!"), _react2.default.createElement("p", null, "And they\u2019re quite spectacular."))));
};
/* eslint-enable react/display-name */

/* eslint-disable react/display-name */


var getTabsMoreThanOneAllowGeneratedID = function getTabsMoreThanOneAllowGeneratedID() {
  return _react2.default.createElement("div", null, _react2.default.createElement("h2", {
    className: "slds-text-heading_large"
  }, "Generated Unique IDs Demo"), _react2.default.createElement(_tabs2.default, null, _react2.default.createElement(_panel2.default, {
    label: "Only 1 Tab"
  }, _react2.default.createElement("h2", {
    className: "slds-text-heading_medium"
  }, "About this story"), _react2.default.createElement("p", null, "There should be two instances of Tabs in this story, and each should have a unique (generated) ID."))), _react2.default.createElement(_tabs2.default, null, _react2.default.createElement(_panel2.default, {
    label: "Only 1 Tab"
  }, _react2.default.createElement("h2", {
    className: "slds-text-heading_medium"
  }, "About this story"), _react2.default.createElement("p", null, "There should be two instances of Tabs in this story, and each should have a unique (generated) ID."))));
};
/* eslint-enable react/display-name */

/* eslint-disable react/display-name */


var getTabsNested = function getTabsNested() {
  return _react2.default.createElement("div", null, _react2.default.createElement("h2", {
    className: "slds-text-heading_large"
  }, "Nested Tabs Demo"), _react2.default.createElement(_tabs2.default, {
    id: "nested-tabs-demo"
  }, _react2.default.createElement(_panel2.default, {
    label: "Tab 1"
  }, _react2.default.createElement("h2", {
    className: "slds-text-heading_medium"
  }, "This is my tab 1 contents!"), _react2.default.createElement("p", null, "And they\u2019re ", _react2.default.createElement("a", {
    href: "#amazing"
  }, "amazing"), ".")), _react2.default.createElement(_panel2.default, {
    label: "Tab 2"
  }, _react2.default.createElement("h2", {
    className: "slds-text-heading_medium"
  }, "This is my tab 2 contents!"), _react2.default.createElement("p", null, "And they\u2019re also amazing."), _react2.default.createElement(_input2.default, {
    id: "unique-id-123",
    name: "left-clickable-icon",
    label: "Input Label",
    iconLeft: _react2.default.createElement(_inputIcon2.default, {
      name: "search",
      category: "utility",
      onClick: (0, _addonActions.action)('search icon clicked')
    }),
    placeholder: "You can tab onto this to focus it."
  })), _react2.default.createElement(_panel2.default, {
    label: "Tab 3 (has children)"
  }, _react2.default.createElement("h2", {
    className: "slds-text-heading_medium"
  }, "This is my tab 3 contents!"), _react2.default.createElement("p", null, "And they\u2019re tabceptionish."), _react2.default.createElement("div", {
    className: "slds-box slds-m-vertical_large"
  }, _react2.default.createElement(_tabs2.default, {
    defaultSelectedIndex: 0
  }, _react2.default.createElement(_panel2.default, {
    label: "Tab 1"
  }, _react2.default.createElement("h2", {
    className: "slds-text-heading_medium"
  }, "This is my tab 1 contents!"), _react2.default.createElement("p", null, "And they\u2019re amazing.")), _react2.default.createElement(_panel2.default, {
    label: "Tab 2"
  }, _react2.default.createElement("h2", {
    className: "slds-text-heading_medium"
  }, "This is my tab 2 contents!"), _react2.default.createElement("p", null, "And they\u2019re also amazing.")), _react2.default.createElement(_panel2.default, {
    label: "Tab 3 (Also has children!)"
  }, _react2.default.createElement("h2", {
    className: "slds-text-heading_medium"
  }, "This is my tab 3 contents!"), _react2.default.createElement("p", null, "And they\u2019re even ", _react2.default.createElement("em", null, "more"), " tabceptionish."), _react2.default.createElement("div", {
    className: "slds-box slds-m-vertical_large"
  }, _react2.default.createElement(_tabs2.default, {
    defaultSelectedIndex: 0
  }, _react2.default.createElement(_panel2.default, {
    label: "Tab 1 (no children!)"
  }, _react2.default.createElement("h2", {
    className: "slds-text-heading_medium"
  }, "This is my tab 1 contents!"), _react2.default.createElement("p", null, "And they\u2019re amazing."))))))))));
};
/* eslint-enable react/display-name */

/* eslint-disable react/display-name */


var getTabsScoped = function getTabsScoped() {
  return _react2.default.createElement("div", null, _react2.default.createElement("h2", {
    className: "slds-text-heading_large"
  }, "Scoped Tabs Demo"), _react2.default.createElement(_tabs2.default, {
    id: "scoped-tabs-demo",
    variant: "scoped"
  }, _react2.default.createElement(_panel2.default, {
    label: "Tab 1"
  }, _react2.default.createElement("h2", {
    className: "slds-text-heading_medium"
  }, "This is my tab 1 contents!"), _react2.default.createElement("p", null, "And they\u2019re amazing."), _react2.default.createElement("p", null, "It\"s awesome."), _react2.default.createElement("p", null, "You can use your ", _react2.default.createElement("var", null, "TAB"), " and ", _react2.default.createElement("var", null, "ARROW"), " keys to navigate around. Try it!"), _react2.default.createElement("p", {
    className: "slds-box slds-theme_info slds-m-top_large"
  }, "(You might have to hit shift+tab to put the focus onto the tab bar ;)")), _react2.default.createElement(_panel2.default, {
    label: "Tab 2"
  }, _react2.default.createElement("h2", {
    className: "slds-text-heading_medium"
  }, "This is my tab 2 contents!"), _react2.default.createElement("p", null, "And they\u2019re also amazing.")), _react2.default.createElement(_panel2.default, {
    label: "Tab 3"
  }, _react2.default.createElement("h2", {
    className: "slds-text-heading_medium"
  }, "This is my tab 3 contents!"), _react2.default.createElement("p", null, "And they\u2019re quite spectacular."))));
};
/* eslint-enable react/display-name */


var DemoTabsConditional =
/*#__PURE__*/
function (_React$Component) {
  _inherits(DemoTabsConditional, _React$Component);

  function DemoTabsConditional() {
    var _ref;

    var _temp, _this;

    _classCallCheck(this, DemoTabsConditional);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _possibleConstructorReturn(_this, (_temp = _this = _possibleConstructorReturn(this, (_ref = DemoTabsConditional.__proto__ || Object.getPrototypeOf(DemoTabsConditional)).call.apply(_ref, [this].concat(args))), Object.defineProperty(_assertThisInitialized(_this), "state", {
      configurable: true,
      enumerable: true,
      writable: true,
      value: {
        showA: true,
        showB: true,
        showC: true,
        disableA: false,
        disableB: true,
        disableC: true
      }
    }), Object.defineProperty(_assertThisInitialized(_this), "handleCheckClicked", {
      configurable: true,
      enumerable: true,
      writable: true,
      value: function value(checked, event) {
        var state = {};
        state[event.target.name] = checked;

        _this.setState(state);
      }
    }), Object.defineProperty(_assertThisInitialized(_this), "handleCheckClickedDisable", {
      configurable: true,
      enumerable: true,
      writable: true,
      value: function value(checked, event) {
        var state = {};
        state[event.target.name] = checked;

        _this.setState(state);
      }
    }), Object.defineProperty(_assertThisInitialized(_this), "renderPaneA", {
      configurable: true,
      enumerable: true,
      writable: true,
      value: function value(disabled) {
        return _react2.default.createElement(_panel2.default, {
          label: "Tab A",
          disabled: disabled
        }, _react2.default.createElement("p", null, "This is tab A."), _react2.default.createElement("div", null, _react2.default.createElement(_checkbox2.default, {
          assistiveText: {
            label: 'Disable tab B'
          },
          checked: _this.state.disableB,
          onChange: _this.handleCheckClickedDisable,
          label: "Disable tab B",
          name: "disableB"
        }), _react2.default.createElement(_checkbox2.default, {
          assistiveText: {
            label: 'Disable tab C'
          },
          checked: _this.state.disableC,
          onChange: _this.handleCheckClickedDisable,
          label: "Disable tab C",
          name: "disableC"
        })));
      }
    }), _temp));
  }

  _createClass(DemoTabsConditional, [{
    key: "render",
    value: function render() {
      return _react2.default.createElement("div", null, _react2.default.createElement("h2", {
        className: "slds-text-heading_large"
      }, "Conditional Tabs Demo"), _react2.default.createElement(_checkbox2.default, {
        assistiveText: {
          label: 'Show tab A'
        },
        checked: this.state.showA,
        onChange: this.handleCheckClicked,
        label: "Show tab A",
        name: "showA"
      }), _react2.default.createElement(_checkbox2.default, {
        assistiveText: {
          label: 'Show tab B'
        },
        checked: this.state.showB,
        onChange: this.handleCheckClicked,
        label: "Show tab B",
        name: "showB"
      }), _react2.default.createElement(_checkbox2.default, {
        checked: this.state.showC,
        onChange: this.handleCheckClicked,
        assistiveText: {
          label: 'Show tab C'
        },
        label: "Show tab C",
        name: "showC"
      }), _react2.default.createElement(_tabs2.default, {
        className: (0, _classnames2.default)('slds-m-top_large', this.props.className),
        onSelect: this.handleSelectNopesOnThree
      }, this.state.showA && this.renderPaneA(this.state.disableA), this.state.showB && this.state.disableB ? _react2.default.createElement(_panel2.default, {
        label: "Tab B",
        disabled: true
      }, _react2.default.createElement("p", null, "This is tab B.")) : this.state.showB && _react2.default.createElement(_panel2.default, {
        label: "Tab B"
      }, _react2.default.createElement("p", null, "This is tab B.")), this.state.showC && this.state.disableC ? _react2.default.createElement(_panel2.default, {
        label: "Tab C",
        disabled: true
      }, _react2.default.createElement("p", null, "This is tab C.")) : this.state.showC && _react2.default.createElement(_panel2.default, {
        label: "Tab C"
      }, _react2.default.createElement("p", null, "This is tab C."))));
    }
  }]);

  return DemoTabsConditional;
}(_react2.default.Component);

Object.defineProperty(DemoTabsConditional, "displayName", {
  configurable: true,
  enumerable: true,
  writable: true,
  value: 'DemoTabsConditional'
});
Object.defineProperty(DemoTabsConditional, "propTypes", {
  configurable: true,
  enumerable: true,
  writable: true,
  value: {
    /**
     * Class names to be added to the container element and is passed along to its children.
     */
    className: _propTypes2.default.oneOfType([_propTypes2.default.array, _propTypes2.default.object, _propTypes2.default.string])
  }
});

var DemoTabsOutsideControl =
/*#__PURE__*/
function (_React$Component2) {
  _inherits(DemoTabsOutsideControl, _React$Component2);

  function DemoTabsOutsideControl() {
    var _ref2;

    var _temp2, _this2;

    _classCallCheck(this, DemoTabsOutsideControl);

    for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }

    return _possibleConstructorReturn(_this2, (_temp2 = _this2 = _possibleConstructorReturn(this, (_ref2 = DemoTabsOutsideControl.__proto__ || Object.getPrototypeOf(DemoTabsOutsideControl)).call.apply(_ref2, [this].concat(args))), Object.defineProperty(_assertThisInitialized(_this2), "state", {
      configurable: true,
      enumerable: true,
      writable: true,
      value: {
        whichOneSelectedYo: _this2.props.whichOneSelectedYo || 0,
        prevOneSelectedYo: _this2.props.prevOneSelectedYo || 0
      }
    }), Object.defineProperty(_assertThisInitialized(_this2), "handleSelect", {
      configurable: true,
      enumerable: true,
      writable: true,
      value: function value(index, last) {
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
      }
    }), Object.defineProperty(_assertThisInitialized(_this2), "showState", {
      configurable: true,
      enumerable: true,
      writable: true,
      value: function value() {
        (0, _addonActions.action)('showState (current)')(_this2.state.whichOneSelectedYo);
        (0, _addonActions.action)('showState (previous)')(_this2.state.prevOneSelectedYo);
      }
    }), Object.defineProperty(_assertThisInitialized(_this2), "handleButtonClicked", {
      configurable: true,
      enumerable: true,
      writable: true,
      value: function value(event) {
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
      }
    }), _temp2));
  }

  _createClass(DemoTabsOutsideControl, [{
    key: "render",
    value: function render() {
      return _react2.default.createElement("div", null, _react2.default.createElement("h2", {
        className: "slds-text-heading_large"
      }, "Outside Tabs Demo"), _react2.default.createElement("p", null, "Here we have several buttons, which are used to pass a new", ' ', _react2.default.createElement("code", null, "selectedIndex"), " into the Tabs component."), _react2.default.createElement("p", {
        className: "slds-m-bottom_large"
      }, "This shows that you can pass a new selected index property into the component from the outside and have it re-render."), _react2.default.createElement(_button2.default, {
        id: "show-state",
        label: "Show State",
        onClick: this.showState
      }), _react2.default.createElement(_button2.default, {
        id: "monday",
        label: "Monday",
        onClick: this.handleButtonClicked
      }), _react2.default.createElement(_button2.default, {
        id: "tuesday",
        label: "Tuesday",
        onClick: this.handleButtonClicked
      }), _react2.default.createElement(_button2.default, {
        id: "wednesday",
        label: "Wednesday",
        onClick: this.handleButtonClicked
      }), _react2.default.createElement(_button2.default, {
        id: "thursday",
        label: "Thursday",
        onClick: this.handleButtonClicked
      }), _react2.default.createElement(_button2.default, {
        id: "friday",
        label: "Friday",
        onClick: this.handleButtonClicked
      }), _react2.default.createElement(_button2.default, {
        id: "none",
        label: "None",
        onClick: this.handleButtonClicked
      }), _react2.default.createElement(_button2.default, {
        id: "previous",
        label: "Previous",
        onClick: this.handleButtonClicked
      }), _react2.default.createElement(_tabs2.default, {
        className: (0, _classnames2.default)('slds-m-top_large', this.props.className),
        selectedIndex: this.state.whichOneSelectedYo,
        onSelect: this.handleSelect
      }, _react2.default.createElement(_panel2.default, {
        label: "Monday"
      }, _react2.default.createElement("p", null, "This is Monday\"s Pane."), _react2.default.createElement(_button2.default, {
        id: "tuesday-alt",
        label: "Submit and go to next tab",
        onClick: this.handleButtonClicked
      })), _react2.default.createElement(_panel2.default, {
        label: "Tuesday"
      }, _react2.default.createElement("p", null, "This is Tuesday\"s Pane.")), _react2.default.createElement(_panel2.default, {
        label: "Wednesday"
      }, _react2.default.createElement("p", null, "This is Wednesday\"s Pane.")), _react2.default.createElement(_panel2.default, {
        label: "Thursday"
      }, _react2.default.createElement("p", null, "Thursday\"s Pane has far to go.")), _react2.default.createElement(_panel2.default, {
        label: "Friday"
      }, _react2.default.createElement("p", null, "This is Friday\"s Pane."))));
    }
  }]);

  return DemoTabsOutsideControl;
}(_react2.default.Component);
/* eslint-disable react/display-name */


Object.defineProperty(DemoTabsOutsideControl, "displayName", {
  configurable: true,
  enumerable: true,
  writable: true,
  value: 'DemoTabsOutsideControl'
});
Object.defineProperty(DemoTabsOutsideControl, "propTypes", {
  configurable: true,
  enumerable: true,
  writable: true,
  value: {
    /**
     * Class names to be added to the container element and is passed along to its children.
     */
    className: _propTypes2.default.oneOfType([_propTypes2.default.array, _propTypes2.default.object, _propTypes2.default.string]),

    /**
     * The Tab (and corresponding TabPanel) that is selected when the component renders. Defaults to `0`.
     */
    whichOneSelectedYo: _propTypes2.default.number,
    prevOneSelectedYo: _propTypes2.default.number
  }
});

var getTabsDisabled = function getTabsDisabled() {
  return _react2.default.createElement("div", null, _react2.default.createElement("h2", {
    className: "slds-text-heading_large"
  }, "Disabled Tabs Demo"), _react2.default.createElement(_tabs2.default, {
    id: "disabled-tabs-demo"
  }, _react2.default.createElement(_panel2.default, {
    label: "Tab 1"
  }, _react2.default.createElement("h2", {
    className: "slds-text-heading_medium"
  }, "This is my tab 1 contents!"), _react2.default.createElement("p", null, "And they\u2019re amazing."), _react2.default.createElement("p", null, "It\"s awesome."), _react2.default.createElement("p", null, "You can use your ", _react2.default.createElement("var", null, "TAB"), " and ", _react2.default.createElement("var", null, "ARROW"), " keys to navigate around. Try it!"), _react2.default.createElement("p", {
    className: "slds-box slds-theme_info slds-m-top_large"
  }, "(You might have to hit shift+tab to put the focus onto the tab bar ;)")), _react2.default.createElement(_panel2.default, {
    label: "Tab 2",
    disabled: true
  }, _react2.default.createElement("h2", {
    className: "slds-text-heading_medium"
  }, "This is my tab 2 contents!"), _react2.default.createElement("p", null, "And they\u2019re also amazing.")), _react2.default.createElement(_panel2.default, {
    label: "Tab 3"
  }, _react2.default.createElement("h2", {
    className: "slds-text-heading_medium"
  }, "This is my tab 3 contents!"), _react2.default.createElement("p", null, "And they\u2019re quite spectacular.")), _react2.default.createElement(_panel2.default, {
    label: "Tab 4"
  }, _react2.default.createElement("h2", {
    className: "slds-text-heading_medium"
  }, "This is my tab 3 contents!"), _react2.default.createElement("p", null, "Note that using your arrow keys you can loop ", _react2.default.createElement("em", null, "around the tabs"), "! \uD83C\uDF89"))));
};
/* eslint-enable react/display-name */

/* eslint-disable react/display-name */


var getCustomContentTabs = function getCustomContentTabs() {
  var tab1Label = _react2.default.createElement("div", {
    "aria-label": "test accessibility!"
  }, _react2.default.createElement(_icon2.default, {
    category: "utility",
    name: "list",
    style: {
      marginRight: '.5rem'
    },
    size: "x-small"
  }), _react2.default.createElement("span", null, "my tab"));

  var tab2Label = _react2.default.createElement("span", {
    style: {
      color: 'red'
    }
  }, "my other tab");

  return _react2.default.createElement("div", null, _react2.default.createElement("h2", {
    className: "slds-text-heading_large"
  }, "Custom Tab Contents Demo"), _react2.default.createElement(_tabs2.default, null, _react2.default.createElement(_panel2.default, {
    label: tab1Label
  }, _react2.default.createElement("h2", {
    className: "slds-text-heading_medium"
  }, "This is my first custom content tab!")), _react2.default.createElement(_panel2.default, {
    label: tab2Label
  }, _react2.default.createElement("h2", {
    className: "slds-text-heading_medium"
  }, "This is my second custom content tab!"))));
};
/* eslint-enable react/display-name */


var DemoTabsInterceptSelect =
/*#__PURE__*/
function (_React$Component3) {
  _inherits(DemoTabsInterceptSelect, _React$Component3);

  function DemoTabsInterceptSelect() {
    var _ref3;

    var _temp3, _this3;

    _classCallCheck(this, DemoTabsInterceptSelect);

    for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
      args[_key3] = arguments[_key3];
    }

    return _possibleConstructorReturn(_this3, (_temp3 = _this3 = _possibleConstructorReturn(this, (_ref3 = DemoTabsInterceptSelect.__proto__ || Object.getPrototypeOf(DemoTabsInterceptSelect)).call.apply(_ref3, [this].concat(args))), Object.defineProperty(_assertThisInitialized(_this3), "state", {
      configurable: true,
      enumerable: true,
      writable: true,
      value: {
        intercepts: 0
      }
    }), Object.defineProperty(_assertThisInitialized(_this3), "handleTabSelect", {
      configurable: true,
      enumerable: true,
      writable: true,
      value: function value(next, last) {
        (0, _addonActions.action)('handleTabSelect')(next, last);
        var intercepts = _this3.state.intercepts + 1;

        _this3.setState({
          intercepts: intercepts
        });

        return false;
      }
    }), _temp3));
  }

  _createClass(DemoTabsInterceptSelect, [{
    key: "render",
    value: function render() {
      return _react2.default.createElement("div", null, _react2.default.createElement(_tabs2.default, {
        onSelect: this.handleTabSelect
      }, _react2.default.createElement(_panel2.default, {
        label: "Panel with intercept"
      }, _react2.default.createElement("p", null, "Default Panel"), this.state.intercepts > 0 && _react2.default.createElement("p", null, "We've intercepted navigation ".concat(this.state.intercepts, " time(s)"))), _react2.default.createElement(_panel2.default, {
        label: "Unreachable panel"
      }, _react2.default.createElement("p", null, "You should never see this message"))), _react2.default.createElement("div", {
        style: {
          height: '20px'
        }
      }), _react2.default.createElement(_tabs2.default, null, _react2.default.createElement(_panel2.default, {
        label: "Panel still working as intended"
      }, _react2.default.createElement("p", null, "Default Panel")), _react2.default.createElement(_panel2.default, {
        label: "Destination panel"
      }, _react2.default.createElement("p", null, "You should be able to reach this panel"))));
    }
  }]);

  return DemoTabsInterceptSelect;
}(_react2.default.Component);

Object.defineProperty(DemoTabsInterceptSelect, "displayName", {
  configurable: true,
  enumerable: true,
  writable: true,
  value: 'DemoTabsInterceptSelect'
});
(0, _react3.storiesOf)(_constants.TABS, module).addDecorator(function (getStory) {
  return _react2.default.createElement("div", {
    className: "slds-p-around_medium"
  }, _react2.default.createElement(_iconSettings2.default, {
    iconPath: "/assets/icons"
  }, getStory()));
}).add('Base', function () {
  return getTabs();
}).add('With disabled tab', function () {
  return getTabsDisabled();
}).add('Nested', function () {
  return getTabsNested();
}).add('Outside Control', function () {
  return _react2.default.createElement(DemoTabsOutsideControl, {
    className: "controlled-yo"
  });
}).add('Conditional', function () {
  return _react2.default.createElement(DemoTabsConditional, {
    className: "conditional-yo"
  });
}).add('Unique Generated IDs', function () {
  return getTabsMoreThanOneAllowGeneratedID();
}).add('Scoped', function () {
  return getTabsScoped();
}).add('Custom Tab Contents', function () {
  return getCustomContentTabs();
}).add('Tab Intercept Panel Select', function () {
  return _react2.default.createElement(DemoTabsInterceptSelect, null);
});