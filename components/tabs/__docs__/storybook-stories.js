"use strict";

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _createReactClass = require("create-react-class");

var _createReactClass2 = _interopRequireDefault(_createReactClass);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react3 = require("@storybook/react");

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

// Used in the Nested story
// Used in the Conditinal story
// Used in the outside control story
// Used in the custom content story

/* eslint-disable react/display-name */
var getTabs = function getTabs() {
  return _react2.default.createElement("div", null, _react2.default.createElement("h2", {
    className: "slds-text-heading--large"
  }, "Base Tabs Demo"), _react2.default.createElement(_tabs2.default, {
    id: "main-tabs-demo",
    className: "custom-class-is-custom",
    foo: "baz"
  }, _react2.default.createElement(_panel2.default, {
    label: "Tab 1"
  }, _react2.default.createElement("h2", {
    className: "slds-text-heading--medium"
  }, "This is my tab 1 contents!"), _react2.default.createElement("p", null, "And they\u2019re amazing."), _react2.default.createElement("p", null, "It\"s awesome."), _react2.default.createElement("p", null, "You can use your ", _react2.default.createElement("var", null, "TAB"), " and ", _react2.default.createElement("var", null, "ARROW"), " keys to navigate around. Try it!"), _react2.default.createElement("p", {
    className: "slds-box slds-theme--info slds-m-top--large"
  }, "(You might have to hit shift+tab to put the focus onto the tab bar ;)")), _react2.default.createElement(_panel2.default, {
    label: "Tab 2"
  }, _react2.default.createElement("h2", {
    className: "slds-text-heading--medium"
  }, "This is my tab 2 contents!"), _react2.default.createElement("p", null, "And they\u2019re also amazing.")), _react2.default.createElement(_panel2.default, {
    label: "Tab 3"
  }, _react2.default.createElement("h2", {
    className: "slds-text-heading--medium"
  }, "This is my tab 3 contents!"), _react2.default.createElement("p", null, "And they\u2019re quite spectacular."))));
};
/* eslint-enable react/display-name */

/* eslint-disable react/display-name */


var getTabsMoreThanOneAllowGeneratedID = function getTabsMoreThanOneAllowGeneratedID() {
  return _react2.default.createElement("div", null, _react2.default.createElement("h2", {
    className: "slds-text-heading--large"
  }, "Generated Unique IDs Demo"), _react2.default.createElement(_tabs2.default, null, _react2.default.createElement(_panel2.default, {
    label: "Only 1 Tab"
  }, _react2.default.createElement("h2", {
    className: "slds-text-heading--medium"
  }, "About this story"), _react2.default.createElement("p", null, "There should be two instances of Tabs in this story, and each should have a unique (generated) ID."))), _react2.default.createElement(_tabs2.default, null, _react2.default.createElement(_panel2.default, {
    label: "Only 1 Tab"
  }, _react2.default.createElement("h2", {
    className: "slds-text-heading--medium"
  }, "About this story"), _react2.default.createElement("p", null, "There should be two instances of Tabs in this story, and each should have a unique (generated) ID."))));
};
/* eslint-enable react/display-name */

/* eslint-disable react/display-name */


var getTabsNested = function getTabsNested() {
  return _react2.default.createElement("div", null, _react2.default.createElement("h2", {
    className: "slds-text-heading--large"
  }, "Nested Tabs Demo"), _react2.default.createElement(_tabs2.default, {
    id: "nested-tabs-demo"
  }, _react2.default.createElement(_panel2.default, {
    label: "Tab 1"
  }, _react2.default.createElement("h2", {
    className: "slds-text-heading--medium"
  }, "This is my tab 1 contents!"), _react2.default.createElement("p", null, "And they\u2019re ", _react2.default.createElement("a", {
    href: "#amazing"
  }, "amazing"), ".")), _react2.default.createElement(_panel2.default, {
    label: "Tab 2"
  }, _react2.default.createElement("h2", {
    className: "slds-text-heading--medium"
  }, "This is my tab 2 contents!"), _react2.default.createElement("p", null, "And they\u2019re also amazing."), _react2.default.createElement(_input2.default, {
    id: "unique-id-123",
    name: "left-clickable-icon",
    label: "Input Label",
    iconLeft: _react2.default.createElement(_inputIcon2.default, {
      name: "search",
      category: "utility",
      onClick: (0, _react3.action)('search icon clicked')
    }),
    placeholder: "You can tab onto this to focus it."
  })), _react2.default.createElement(_panel2.default, {
    label: "Tab 3 (has children)"
  }, _react2.default.createElement("h2", {
    className: "slds-text-heading--medium"
  }, "This is my tab 3 contents!"), _react2.default.createElement("p", null, "And they\u2019re tabceptionish."), _react2.default.createElement("div", {
    className: "slds-box slds-m-vertical--large"
  }, _react2.default.createElement(_tabs2.default, {
    defaultSelectedIndex: 0
  }, _react2.default.createElement(_panel2.default, {
    label: "Tab 1"
  }, _react2.default.createElement("h2", {
    className: "slds-text-heading--medium"
  }, "This is my tab 1 contents!"), _react2.default.createElement("p", null, "And they\u2019re amazing.")), _react2.default.createElement(_panel2.default, {
    label: "Tab 2"
  }, _react2.default.createElement("h2", {
    className: "slds-text-heading--medium"
  }, "This is my tab 2 contents!"), _react2.default.createElement("p", null, "And they\u2019re also amazing.")), _react2.default.createElement(_panel2.default, {
    label: "Tab 3 (Also has children!)"
  }, _react2.default.createElement("h2", {
    className: "slds-text-heading--medium"
  }, "This is my tab 3 contents!"), _react2.default.createElement("p", null, "And they\u2019re even ", _react2.default.createElement("em", null, "more"), " tabceptionish."), _react2.default.createElement("div", {
    className: "slds-box slds-m-vertical--large"
  }, _react2.default.createElement(_tabs2.default, {
    defaultSelectedIndex: 0
  }, _react2.default.createElement(_panel2.default, {
    label: "Tab 1 (no children!)"
  }, _react2.default.createElement("h2", {
    className: "slds-text-heading--medium"
  }, "This is my tab 1 contents!"), _react2.default.createElement("p", null, "And they\u2019re amazing."))))))))));
};
/* eslint-enable react/display-name */

/* eslint-disable react/display-name */


var getTabsScoped = function getTabsScoped() {
  return _react2.default.createElement("div", null, _react2.default.createElement("h2", {
    className: "slds-text-heading--large"
  }, "Scoped Tabs Demo"), _react2.default.createElement(_tabs2.default, {
    id: "scoped-tabs-demo",
    variant: "scoped"
  }, _react2.default.createElement(_panel2.default, {
    label: "Tab 1"
  }, _react2.default.createElement("h2", {
    className: "slds-text-heading--medium"
  }, "This is my tab 1 contents!"), _react2.default.createElement("p", null, "And they\u2019re amazing."), _react2.default.createElement("p", null, "It\"s awesome."), _react2.default.createElement("p", null, "You can use your ", _react2.default.createElement("var", null, "TAB"), " and ", _react2.default.createElement("var", null, "ARROW"), " keys to navigate around. Try it!"), _react2.default.createElement("p", {
    className: "slds-box slds-theme--info slds-m-top--large"
  }, "(You might have to hit shift+tab to put the focus onto the tab bar ;)")), _react2.default.createElement(_panel2.default, {
    label: "Tab 2"
  }, _react2.default.createElement("h2", {
    className: "slds-text-heading--medium"
  }, "This is my tab 2 contents!"), _react2.default.createElement("p", null, "And they\u2019re also amazing.")), _react2.default.createElement(_panel2.default, {
    label: "Tab 3"
  }, _react2.default.createElement("h2", {
    className: "slds-text-heading--medium"
  }, "This is my tab 3 contents!"), _react2.default.createElement("p", null, "And they\u2019re quite spectacular."))));
};
/* eslint-enable react/display-name */


var DemoTabsConditional = (0, _createReactClass2.default)({
  displayName: 'DemoTabsConditional',
  // ### Prop Types
  propTypes: {
    /**
     * Class names to be added to the container element and is passed along to its children.
     */
    className: _propTypes2.default.oneOfType([_propTypes2.default.array, _propTypes2.default.object, _propTypes2.default.string])
  },
  getInitialState: function getInitialState() {
    return {
      showA: true,
      showB: true,
      showC: true,
      disableA: false,
      disableB: true,
      disableC: true
    };
  },
  handleCheckClicked: function handleCheckClicked(checked, event) {
    var state = {};
    state[event.target.name] = checked;
    this.setState(state);
  },
  handleCheckClickedDisable: function handleCheckClickedDisable(checked, event) {
    var state = {};
    state[event.target.name] = checked;
    this.setState(state);
  },
  renderPaneA: function renderPaneA(disabled) {
    return _react2.default.createElement(_panel2.default, {
      label: "Tab A",
      disabled: disabled
    }, _react2.default.createElement("p", null, "This is tab A."), _react2.default.createElement("div", null, _react2.default.createElement(_checkbox2.default, {
      assistiveText: {
        label: 'Disable tab B'
      },
      checked: this.state.disableB,
      onChange: this.handleCheckClickedDisable,
      label: "Disable tab B",
      name: "disableB"
    }), _react2.default.createElement(_checkbox2.default, {
      assistiveText: {
        label: 'Disable tab C'
      },
      checked: this.state.disableC,
      onChange: this.handleCheckClickedDisable,
      label: "Disable tab C",
      name: "disableC"
    })));
  },
  render: function render() {
    return _react2.default.createElement("div", null, _react2.default.createElement("h2", {
      className: "slds-text-heading--large"
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
      className: (0, _classnames2.default)('slds-m-top--large', this.props.className),
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
});
var DemoTabsOutsideControl = (0, _createReactClass2.default)({
  displayName: 'DemoTabsOutsideControl',
  // ### Prop Types
  propTypes: {
    /**
     * Class names to be added to the container element and is passed along to its children.
     */
    className: _propTypes2.default.oneOfType([_propTypes2.default.array, _propTypes2.default.object, _propTypes2.default.string]),

    /**
     * The Tab (and corresponding TabPanel) that is selected when the component renders. Defaults to `0`.
     */
    whichOneSelectedYo: _propTypes2.default.number,
    prevOneSelectedYo: _propTypes2.default.number
  },
  getInitialState: function getInitialState() {
    return {
      whichOneSelectedYo: this.props.whichOneSelectedYo || 0,
      prevOneSelectedYo: this.props.prevOneSelectedYo || 0
    };
  },
  handleSelect: function handleSelect(index, last) {
    var toReturn = true;

    if (index === this.state.whichOneSelectedYo && last === this.state.prevOneSelectedYo) {
      toReturn = false;
    } else {
      (0, _react3.action)('handleSelect')(index, last);
      this.setState({
        whichOneSelectedYo: index,
        prevOneSelectedYo: last
      });
    }

    return toReturn;
  },
  showState: function showState() {
    (0, _react3.action)('showState (current)')(this.state.whichOneSelectedYo);
    (0, _react3.action)('showState (previous)')(this.state.prevOneSelectedYo);
  },
  handleButtonClicked: function handleButtonClicked(event) {
    var prevOneSelected = this.state.prevOneSelectedYo;
    var thisOneSelected = this.state.whichOneSelectedYo;
    (0, _react3.action)('handleButtonClicked')(event.currentTarget.id);

    switch (event.currentTarget.id) {
      case 'monday':
        this.handleSelect(0, thisOneSelected);
        break;

      case 'tuesday':
        this.handleSelect(1, thisOneSelected);
        break;

      case 'tuesday-alt':
        this.handleSelect(1, thisOneSelected);
        break;

      case 'wednesday':
        this.handleSelect(2, thisOneSelected);
        break;

      case 'thursday':
        this.handleSelect(3, thisOneSelected);
        break;

      case 'friday':
        this.handleSelect(4, thisOneSelected);
        break;

      case 'none':
        this.handleSelect(undefined, thisOneSelected);
        break;

      case 'previous':
        this.handleSelect(prevOneSelected, thisOneSelected);
        break;

      case 'show-state':
        this.showState();
        break;

      default:
        // Statements executed when none of the values match the value of the expression
        this.handleSelect(thisOneSelected, prevOneSelected);
    }
  },
  render: function render() {
    return _react2.default.createElement("div", null, _react2.default.createElement("h2", {
      className: "slds-text-heading--large"
    }, "Outside Tabs Demo"), _react2.default.createElement("p", null, "Here we have several buttons, which are used to pass a new", ' ', _react2.default.createElement("code", null, "selectedIndex"), " into the Tabs component."), _react2.default.createElement("p", {
      className: "slds-m-bottom--large"
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
      className: (0, _classnames2.default)('slds-m-top--large', this.props.className),
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
});
/* eslint-disable react/display-name */

var getTabsDisabled = function getTabsDisabled() {
  return _react2.default.createElement("div", null, _react2.default.createElement("h2", {
    className: "slds-text-heading--large"
  }, "Disabled Tabs Demo"), _react2.default.createElement(_tabs2.default, {
    id: "disabled-tabs-demo"
  }, _react2.default.createElement(_panel2.default, {
    label: "Tab 1"
  }, _react2.default.createElement("h2", {
    className: "slds-text-heading--medium"
  }, "This is my tab 1 contents!"), _react2.default.createElement("p", null, "And they\u2019re amazing."), _react2.default.createElement("p", null, "It\"s awesome."), _react2.default.createElement("p", null, "You can use your ", _react2.default.createElement("var", null, "TAB"), " and ", _react2.default.createElement("var", null, "ARROW"), " keys to navigate around. Try it!"), _react2.default.createElement("p", {
    className: "slds-box slds-theme--info slds-m-top--large"
  }, "(You might have to hit shift+tab to put the focus onto the tab bar ;)")), _react2.default.createElement(_panel2.default, {
    label: "Tab 2",
    disabled: true
  }, _react2.default.createElement("h2", {
    className: "slds-text-heading--medium"
  }, "This is my tab 2 contents!"), _react2.default.createElement("p", null, "And they\u2019re also amazing.")), _react2.default.createElement(_panel2.default, {
    label: "Tab 3"
  }, _react2.default.createElement("h2", {
    className: "slds-text-heading--medium"
  }, "This is my tab 3 contents!"), _react2.default.createElement("p", null, "And they\u2019re quite spectacular.")), _react2.default.createElement(_panel2.default, {
    label: "Tab 4"
  }, _react2.default.createElement("h2", {
    className: "slds-text-heading--medium"
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
    className: "slds-text-heading--large"
  }, "Custom Tab Contents Demo"), _react2.default.createElement(_tabs2.default, null, _react2.default.createElement(_panel2.default, {
    label: tab1Label
  }, _react2.default.createElement("h2", {
    className: "slds-text-heading--medium"
  }, "This is my first custom content tab!")), _react2.default.createElement(_panel2.default, {
    label: tab2Label
  }, _react2.default.createElement("h2", {
    className: "slds-text-heading--medium"
  }, "This is my second custom content tab!"))));
};
/* eslint-enable react/display-name */


var DemoTabsInterceptSelect = (0, _createReactClass2.default)({
  displayName: 'DemoTabsInterceptSelect',
  getInitialState: function getInitialState() {
    return {
      intercepts: 0
    };
  },
  handleTabSelect: function handleTabSelect(next, last) {
    (0, _react3.action)('handleTabSelect')(next, last);
    var intercepts = this.state.intercepts + 1;
    this.setState({
      intercepts: intercepts
    });
    return false;
  },
  render: function render() {
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
});
(0, _react3.storiesOf)(_constants.TABS, module).addDecorator(function (getStory) {
  return _react2.default.createElement("div", {
    className: "slds-p-around--medium"
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