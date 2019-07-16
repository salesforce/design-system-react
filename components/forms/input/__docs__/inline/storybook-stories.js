"use strict";

var _react = _interopRequireDefault(require("react"));

var _react2 = require("@storybook/react");

var _addonActions = require("@storybook/addon-actions");

var _iconSettings = _interopRequireDefault(require("../../../../../components/icon-settings"));

var _constants = require("../../../../../utilities/constants");

var _inline = _interopRequireDefault(require("../../inline"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var DemoInlineEdit =
/*#__PURE__*/
function (_React$Component) {
  _inherits(DemoInlineEdit, _React$Component);

  function DemoInlineEdit() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, DemoInlineEdit);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(DemoInlineEdit)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "state", {
      value: 'Edit me inline'
    });

    _defineProperty(_assertThisInitialized(_this), "handleChange", function (eventProps) {
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
    });

    return _this;
  }

  _createClass(DemoInlineEdit, [{
    key: "render",
    value: function render() {
      return _react.default.createElement(_inline.default, _extends({}, this.props, {
        value: this.state.value,
        onChange: this.handleChange
      }));
    }
  }]);

  return DemoInlineEdit;
}(_react.default.Component);

_defineProperty(DemoInlineEdit, "displayName", 'DemoInlineEdit');

(0, _react2.storiesOf)(_constants.FORMS_INLINE_EDIT, module).addDecorator(function (getStory) {
  return _react.default.createElement("div", {
    className: "slds-p-around_medium"
  }, _react.default.createElement(_iconSettings.default, {
    iconPath: "/assets/icons"
  }, getStory()));
}).add('Base', function () {
  return _react.default.createElement("section", null, _react.default.createElement("h1", {
    className: "slds-text-title_caps slds-p-vertical_medium"
  }, "Base Inline Edit Input"), _react.default.createElement(DemoInlineEdit, {
    name: "inline-edit-standard",
    id: "inline-edit-standard"
  }));
}).add('Disabled', function () {
  return _react.default.createElement("section", null, _react.default.createElement("h1", {
    className: "slds-text-title_caps slds-p-vertical_medium"
  }, "Disabled Inline Edit Input"), _react.default.createElement(DemoInlineEdit, {
    name: "inline-edit-disabled",
    id: "inline-edit-disabled",
    disabled: true
  }));
});