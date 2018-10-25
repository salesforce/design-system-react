"use strict";

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _createReactClass = require("create-react-class");

var _createReactClass2 = _interopRequireDefault(_createReactClass);

var _react3 = require("@storybook/react");

var _iconSettings = require("../../icon-settings");

var _iconSettings2 = _interopRequireDefault(_iconSettings);

var _constants = require("../../../utilities/constants");

var _lookup = require("../../lookup");

var _lookup2 = _interopRequireDefault(_lookup);

var _header = require("../../lookup/header");

var _header2 = _interopRequireDefault(_header);

var _footer = require("../../lookup/footer");

var _footer2 = _interopRequireDefault(_footer);

var _button = require("../../button");

var _button2 = _interopRequireDefault(_button);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var DemoLookup = (0, _createReactClass2.default)({
  displayName: 'DemoLookup',
  getInitialState: function getInitialState() {
    return {
      options: [{
        label: 'File 1'
      }, {
        label: 'File 2'
      }, {
        label: 'File 3'
      }, {
        label: 'File 4'
      }]
    };
  },
  clearSelected: function clearSelected() {
    this.setState({
      currentSelected: -1
    });
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
    return _react2.default.createElement("div", null, _react2.default.createElement("div", null, _react2.default.createElement(_button2.default, {
      onClick: this.clearSelected
    }, "Clear Selected")), _react2.default.createElement(_lookup2.default, _extends({}, this.props, {
      onChange: (0, _react3.action)('change'),
      onSelect: this.handleSelect,
      options: this.state.options,
      selectedItem: this.state.currentSelected
    })));
  }
});
var DemoLookupAccounts = (0, _createReactClass2.default)({
  displayName: 'DemoLookupAccounts',
  getInitialState: function getInitialState() {
    return {
      options: [{
        label: "Paddy's Pub",
        subTitle: 'Boston, MA'
      }, {
        label: 'Tyrell Corp',
        subTitle: 'San Francisco, CA'
      }, {
        label: 'Paper St. Soap Company',
        subTitle: 'Beloit, WI'
      }, {
        label: 'Nakatomi Investments',
        subTitle: 'Chicago, IL'
      }, {
        label: 'Acme Landscaping'
      }, {
        label: 'Acme Construction',
        subTitle: 'Grand Marais, MN'
      }]
    };
  },
  handleSelect: function handleSelect(selectedItem) {
    for (var _len2 = arguments.length, rest = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
      rest[_key2 - 1] = arguments[_key2];
    }

    (0, _react3.action)('select').apply(void 0, [selectedItem].concat(rest));
    this.setState({
      selectedItem: selectedItem
    });
  },
  render: function render() {
    return _react2.default.createElement(_lookup2.default, _extends({}, this.props, {
      footerRenderer: _footer2.default,
      headerRenderer: _header2.default,
      onChange: (0, _react3.action)('change'),
      onSelect: this.handleSelect,
      options: this.state.options
    }));
  }
});
(0, _react3.storiesOf)(_constants.LOOKUP, module).addDecorator(function (getStory) {
  return _react2.default.createElement("div", {
    className: "slds-p-around--medium"
  }, _react2.default.createElement(_iconSettings2.default, {
    iconPath: "/assets/icons"
  }, getStory()));
}).add('Standard', function () {
  return _react2.default.createElement(DemoLookup, {
    emptyMessage: "No Files found",
    hasError: false,
    iconCategory: "utility",
    iconName: "open_folder",
    isInline: true,
    label: "Files"
  });
}).add('Disabled', function () {
  return _react2.default.createElement(DemoLookup, {
    disabled: true
  });
}).add('Standard with Accounts', function () {
  return _react2.default.createElement(DemoLookupAccounts, {
    emptyMessage: "No Accounts found",
    hasError: false,
    iconCategory: "standard",
    iconName: "account",
    isInline: true,
    label: "Account"
  });
}).add('Custom Empty Message Content', function () {
  return _react2.default.createElement(DemoLookup, {
    emptyMessage: _react2.default.createElement("span", null, "No matches."),
    isInline: true
  });
});