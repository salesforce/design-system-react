"use strict";

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _react3 = require("@storybook/react");

var _addonActions = require("@storybook/addon-actions");

var _iconSettings = require("../../../../../components/icon-settings");

var _iconSettings2 = _interopRequireDefault(_iconSettings);

var _constants = require("../../../../../utilities/constants");

var _inline = require("../../inline");

var _inline2 = _interopRequireDefault(_inline);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

var DemoInlineEdit =
/*#__PURE__*/
function (_React$Component) {
  _inherits(DemoInlineEdit, _React$Component);

  function DemoInlineEdit() {
    var _ref;

    var _temp, _this;

    _classCallCheck(this, DemoInlineEdit);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _possibleConstructorReturn(_this, (_temp = _this = _possibleConstructorReturn(this, (_ref = DemoInlineEdit.__proto__ || Object.getPrototypeOf(DemoInlineEdit)).call.apply(_ref, [this].concat(args))), Object.defineProperty(_assertThisInitialized(_this), "state", {
      configurable: true,
      enumerable: true,
      writable: true,
      value: {
        value: 'Edit me inline'
      }
    }), Object.defineProperty(_assertThisInitialized(_this), "handleChange", {
      configurable: true,
      enumerable: true,
      writable: true,
      value: function value(eventProps) {
        for (var _len2 = arguments.length, rest = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
          rest[_key2 - 1] = arguments[_key2];
        }

        (0, _addonActions.action)('change')(rest);

        if (eventProps.value === '') {
          _this.setState({
            value: 'Edit me inline'
          });
        } else {
          _this.setState({
            value: eventProps.value
          });
        }
      }
    }), _temp));
  }

  _createClass(DemoInlineEdit, [{
    key: "render",
    value: function render() {
      return _react2.default.createElement(_inline2.default, _extends({}, this.props, {
        value: this.state.value,
        onChange: this.handleChange
      }));
    }
  }]);

  return DemoInlineEdit;
}(_react2.default.Component);

Object.defineProperty(DemoInlineEdit, "displayName", {
  configurable: true,
  enumerable: true,
  writable: true,
  value: 'DemoInlineEdit'
});
(0, _react3.storiesOf)(_constants.FORMS_INLINE_EDIT, module).addDecorator(function (getStory) {
  return _react2.default.createElement("div", {
    className: "slds-p-around_medium"
  }, _react2.default.createElement(_iconSettings2.default, {
    iconPath: "/assets/icons"
  }, getStory()));
}).add('Base', function () {
  return _react2.default.createElement("section", null, _react2.default.createElement("h1", {
    className: "slds-text-title_caps slds-p-vertical_medium"
  }, "Base Inline Edit Input"), _react2.default.createElement(DemoInlineEdit, {
    name: "inline-edit-standard",
    id: "inline-edit-standard"
  }));
}).add('Disabled', function () {
  return _react2.default.createElement("section", null, _react2.default.createElement("h1", {
    className: "slds-text-title_caps slds-p-vertical_medium"
  }, "Disabled Inline Edit Input"), _react2.default.createElement(DemoInlineEdit, {
    name: "inline-edit-disabled",
    id: "inline-edit-disabled",
    disabled: true
  }));
});