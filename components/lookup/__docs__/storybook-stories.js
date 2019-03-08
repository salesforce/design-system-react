"use strict";

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _react3 = require("@storybook/react");

var _addonActions = require("@storybook/addon-actions");

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

var _default = require("../__examples__/default");

var _default2 = _interopRequireDefault(_default);

var _files = require("../__examples__/files");

var _files2 = _interopRequireDefault(_files);

var _withSelection = require("../__examples__/with-selection");

var _withSelection2 = _interopRequireDefault(_withSelection);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

var DemoLookup =
/*#__PURE__*/
function (_React$Component) {
  _inherits(DemoLookup, _React$Component);

  function DemoLookup() {
    var _ref;

    var _temp, _this;

    _classCallCheck(this, DemoLookup);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _possibleConstructorReturn(_this, (_temp = _this = _possibleConstructorReturn(this, (_ref = DemoLookup.__proto__ || Object.getPrototypeOf(DemoLookup)).call.apply(_ref, [this].concat(args))), Object.defineProperty(_assertThisInitialized(_this), "state", {
      configurable: true,
      enumerable: true,
      writable: true,
      value: {
        options: [{
          label: 'File 1'
        }, {
          label: 'File 2'
        }, {
          label: 'File 3'
        }, {
          label: 'File 4'
        }]
      }
    }), Object.defineProperty(_assertThisInitialized(_this), "clearSelected", {
      configurable: true,
      enumerable: true,
      writable: true,
      value: function value() {
        _this.setState({
          currentSelected: -1
        });
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

  _createClass(DemoLookup, [{
    key: "render",
    value: function render() {
      return _react2.default.createElement("div", null, _react2.default.createElement("div", null, _react2.default.createElement(_button2.default, {
        onClick: this.clearSelected
      }, "Clear Selected")), _react2.default.createElement(_lookup2.default, _extends({}, this.props, {
        onChange: (0, _addonActions.action)('change'),
        onSelect: this.handleSelect,
        options: this.state.options,
        selectedItem: this.state.currentSelected
      })));
    }
  }]);

  return DemoLookup;
}(_react2.default.Component);

Object.defineProperty(DemoLookup, "displayName", {
  configurable: true,
  enumerable: true,
  writable: true,
  value: 'DemoLookup'
});

var DemoLookupAccounts =
/*#__PURE__*/
function (_React$Component2) {
  _inherits(DemoLookupAccounts, _React$Component2);

  function DemoLookupAccounts() {
    var _ref2;

    var _temp2, _this2;

    _classCallCheck(this, DemoLookupAccounts);

    for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
      args[_key3] = arguments[_key3];
    }

    return _possibleConstructorReturn(_this2, (_temp2 = _this2 = _possibleConstructorReturn(this, (_ref2 = DemoLookupAccounts.__proto__ || Object.getPrototypeOf(DemoLookupAccounts)).call.apply(_ref2, [this].concat(args))), Object.defineProperty(_assertThisInitialized(_this2), "state", {
      configurable: true,
      enumerable: true,
      writable: true,
      value: {
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
      }
    }), Object.defineProperty(_assertThisInitialized(_this2), "handleSelect", {
      configurable: true,
      enumerable: true,
      writable: true,
      value: function value(selectedItem) {
        for (var _len4 = arguments.length, rest = new Array(_len4 > 1 ? _len4 - 1 : 0), _key4 = 1; _key4 < _len4; _key4++) {
          rest[_key4 - 1] = arguments[_key4];
        }

        (0, _addonActions.action)('select').apply(void 0, [selectedItem].concat(rest));

        _this2.setState({
          selectedItem: selectedItem
        });
      }
    }), _temp2));
  }

  _createClass(DemoLookupAccounts, [{
    key: "render",
    value: function render() {
      return _react2.default.createElement(_lookup2.default, _extends({}, this.props, {
        footerRenderer: _footer2.default,
        headerRenderer: _header2.default,
        onChange: (0, _addonActions.action)('change'),
        onSelect: this.handleSelect,
        options: this.state.options
      }));
    }
  }]);

  return DemoLookupAccounts;
}(_react2.default.Component);

Object.defineProperty(DemoLookupAccounts, "displayName", {
  configurable: true,
  enumerable: true,
  writable: true,
  value: 'DemoLookupAccounts'
});
(0, _react3.storiesOf)(_constants.LOOKUP, module).addDecorator(function (getStory) {
  return _react2.default.createElement("div", {
    className: "slds-p-around_medium"
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
}).add('Docs site Default', function () {
  return _react2.default.createElement(_default2.default, null);
}).add('Docs site Files', function () {
  return _react2.default.createElement(_files2.default, null);
}).add('Docs site WithSelection', function () {
  return _react2.default.createElement(_withSelection2.default, null);
});