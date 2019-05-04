"use strict";

var _react = _interopRequireDefault(require("react"));

var _react2 = require("@storybook/react");

var _addonActions = require("@storybook/addon-actions");

var _iconSettings = _interopRequireDefault(require("../../icon-settings"));

var _constants = require("../../../utilities/constants");

var _ = _interopRequireDefault(require("../"));

var _button = _interopRequireDefault(require("../../button"));

var _default = _interopRequireDefault(require("../__examples__/default"));

var _error = _interopRequireDefault(require("../__examples__/error"));

var _snapshotBase = _interopRequireDefault(require("../__examples__/snapshot-base"));

var _snapshotToggle = _interopRequireDefault(require("../__examples__/snapshot-toggle"));

var _toggle = _interopRequireDefault(require("../__examples__/toggle"));

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

var CheckboxIndeterminate =
/*#__PURE__*/
function (_React$Component) {
  _inherits(CheckboxIndeterminate, _React$Component);

  function CheckboxIndeterminate() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, CheckboxIndeterminate);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(CheckboxIndeterminate)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "state", {
      indeterminate: true,
      checked: true,
      currentStateHelper: 'Indeterminate'
    });

    _defineProperty(_assertThisInitialized(_this), "handleChange", function (checked, event, data) {
      var checkedLabel = data.checked ? 'Checked' : 'Unchecked';

      _this.setState({
        checked: data.checked,
        currentStateHelper: data.indeterminate ? 'Indeterminate' : checkedLabel,
        indeterminate: data.indeterminate
      });

      (0, _addonActions.action)('handleChange')(checked, event, "checked: ".concat(data.checked, ",\n\t\t\tindeterminate: ").concat(data.indeterminate));
    });

    _defineProperty(_assertThisInitialized(_this), "changeToIndeterminate", function (event) {
      _this.setState({
        currentStateHelper: 'Indeterminate',
        checked: true,
        indeterminate: true
      });

      (0, _addonActions.action)('changeToIndeterminate')(event, 'checked: true, indeterminate: true');
    });

    _defineProperty(_assertThisInitialized(_this), "changeToCheck", function (event) {
      _this.setState({
        currentStateHelper: 'Checked',
        checked: true,
        indeterminate: false
      });

      (0, _addonActions.action)('changeToCheck')(event, 'checked: true, indeterminate: false');
    });

    _defineProperty(_assertThisInitialized(_this), "changeToUnChecked", function (event) {
      _this.setState({
        currentStateHelper: 'Unchecked',
        checked: false,
        indeterminate: false
      });

      (0, _addonActions.action)('changeToUnChecked')(event, 'checked: false, indeterminate: false');
    });

    return _this;
  }

  _createClass(CheckboxIndeterminate, [{
    key: "render",
    value: function render() {
      return _react.default.createElement("div", null, _react.default.createElement(_button.default, {
        onClick: this.changeToIndeterminate,
        label: "Indeterminate"
      }), _react.default.createElement(_button.default, {
        onClick: this.changeToCheck,
        label: "Check"
      }), _react.default.createElement(_button.default, {
        onClick: this.changeToUnChecked,
        label: "Uncheck"
      }), _react.default.createElement("p", null, _react.default.createElement("strong", null, "Current State:"), " ", this.state.currentStateHelper), _react.default.createElement(_.default, {
        assistiveText: {
          label: 'Checkbox (indeterminate)'
        },
        id: "checkbox-example-standard-indeterminate",
        label: "Checkbox Label",
        name: "checkbox-example-standard-indeterminate",
        checked: this.state.checked,
        indeterminate: this.state.indeterminate,
        onChange: this.handleChange
      }), _react.default.createElement("div", {
        className: "slds-box slds-text-longform slds-m-top_large"
      }, _react.default.createElement("p", null, "This example has an ", _react.default.createElement("em", null, "indeterminate"), " checkbox."), _react.default.createElement("p", null, "It is set by providing the ", _react.default.createElement("code", null, "indeterminate"), " prop as", ' ', _react.default.createElement("code", null, _react.default.createElement("strong", null, "true")), "."), _react.default.createElement("p", null, "Once it is clicked, there is no way to make it go ", _react.default.createElement("em", null, "back"), " to the indeterminate state,", ' ', _react.default.createElement("a", {
        href: "https://developer.mozilla.org/en-US/docs/Web/CSS/:indeterminate#Checkbox_radio_button"
      }, "it must be done programatically, through JavaScript"), ".")));
    }
  }]);

  return CheckboxIndeterminate;
}(_react.default.Component);

_defineProperty(CheckboxIndeterminate, "displayName", "".concat(_constants.CHECKBOX, "_INDETERMINATE"));

(0, _react2.storiesOf)(_constants.CHECKBOX, module).addDecorator(function (getStory) {
  return _react.default.createElement("div", {
    className: "slds-p-around_medium"
  }, _react.default.createElement(_iconSettings.default, {
    iconPath: "/assets/icons"
  }, getStory()));
}).add('Checkbox (default, indeterminate, required, disabled', function () {
  return _react.default.createElement(_default.default, null);
}).add('Checkbox (assistive text)', function () {
  return _react.default.createElement("div", null, _react.default.createElement(_.default, {
    assistiveText: {
      label: "This is my checkbox.\n\t\t\t\t\t\t\tThere are many like it, but this one is mine.\n\t\t\t\t\t\t\tMy checkbox is my best friend.\n\t\t\t\t\t\t\tIt is my life.\n\t\t\t\t\t\t\tI must master it as I must master my life.\n\t\t\t\t\t\t\tWithout me, my checkbox is useless. Without my checkbox, I am useless.\n\t\t\t\t\t\t\tI must make my checkbox true.\n\t\t\t\t\t\t\tI must make it truer than my radio button who is trying to... "
    },
    id: "checkbox-example-base-assistiveText",
    label: "Checkbox Label",
    name: "checkbox-example-base-assistiveText",
    onChange: (0, _addonActions.action)('change')
  }), _react.default.createElement("div", {
    className: "slds-box slds-text-longform slds-m-top_large"
  }, _react.default.createElement("p", null, "This example has assistive text. In Safari on Mac you can turn assistive text on by using the keyboard combination:", _react.default.createElement("strong", null, "Command + F5"), "."), _react.default.createElement("p", null, "Once you have enabled it, use your tab key to focus on the checkbox input, and the system should read you what is supplied to the checkbox as the ", _react.default.createElement("code", null, "assistiveText"), "property.")));
}).add('Checkbox (checked)', function () {
  return _react.default.createElement(_.default, {
    checked: true,
    id: "checkbox-example-base-checked",
    label: "Checkbox Label",
    name: "checkbox-example-base-checked",
    onChange: (0, _addonActions.action)('change')
  });
}).add('Checkbox (indeterminate)', function () {
  return _react.default.createElement(CheckboxIndeterminate, null);
}).add('Checkbox Toggle', function () {
  return _react.default.createElement(_.default, {
    id: "checkbox-example-toggle",
    label: "Checkbox Toggle Label",
    name: "checkbox-example-toggle",
    onChange: (0, _addonActions.action)('change'),
    onBlur: function onBlur(e) {
      console.log('bluring ', e.target);
    },
    variant: "toggle"
  });
}).add('Checkbox Toggle (with error)', function () {
  return _react.default.createElement(_.default, {
    id: "checkbox-example-toggle-error",
    label: "Checkbox Toggle Label",
    name: "checkbox-example-toggle-error",
    errorText: "This field has an error.",
    onChange: (0, _addonActions.action)('change'),
    onBlur: function onBlur(e) {
      console.log('bluring ', e.target);
    },
    variant: "toggle"
  });
}).add('Checkbox Toggle (required)', function () {
  return _react.default.createElement(_.default, {
    id: "checkbox-example-toggle-required",
    label: "Checkbox Toggle Label",
    name: "checkbox-example-toggle-required",
    onChange: (0, _addonActions.action)('change'),
    onBlur: function onBlur(e) {
      console.log('bluring ', e.target);
    },
    variant: "toggle",
    required: true
  });
}).add('Checkbox Toggle (disabled)', function () {
  return _react.default.createElement(_.default, {
    id: "checkbox-example-toggle-disabled",
    label: "Checkbox Toggle Label",
    name: "checkbox-example-toggle-disabled",
    onChange: (0, _addonActions.action)('change'),
    onBlur: function onBlur(e) {
      console.log('bluring ', e.target);
    },
    variant: "toggle",
    disabled: true
  });
}).add('Checkbox Toggle (assistive text)', function () {
  return _react.default.createElement("div", null, _react.default.createElement(_.default, {
    assistiveText: {
      label: "This is my checkbox.\n\t\t\t\t\t\t\tThere are many like it, but this one is mine.\n\t\t\t\t\t\t\tMy checkbox is my best friend.\n\t\t\t\t\t\t\tIt is my life.\n\t\t\t\t\t\t\tI must master it as I must master my life.\n\t\t\t\t\t\t\tWithout me, my checkbox is useless. Without my checkbox, I am useless.\n\t\t\t\t\t\t\tI must make my checkbox true.\n\t\t\t\t\t\t\tI must make it truer than my radio button who is trying to... "
    },
    id: "checkbox-example-base-assistiveText",
    label: "Checkbox Label",
    name: "checkbox-example-base-assistiveText",
    onChange: (0, _addonActions.action)('change'),
    variant: "toggle"
  }), _react.default.createElement("div", {
    className: "slds-box slds-text-longform slds-m-top_large"
  }, _react.default.createElement("p", null, "This example has assistive text. In Safari on Mac you can turn assistive text on by using the keyboard combination:", _react.default.createElement("strong", null, "Command + F5"), "."), _react.default.createElement("p", null, "Once you have enabled it, use your tab key to focus on the checkbox input, and the system should read you what is supplied to the checkbox as the ", _react.default.createElement("code", null, "assistiveText"), "property.")));
}).add('Checkbox Toggle (checked)', function () {
  return _react.default.createElement(_.default, {
    checked: true,
    id: "checkbox-example-toggle-checked",
    label: "Checkbox Label",
    name: "checkbox-example-toggle-checked",
    onChange: (0, _addonActions.action)('change'),
    variant: "toggle"
  });
}).add('Doc site Error', function () {
  return _react.default.createElement(_error.default, null);
}).add('Doc site Snapshot Base', function () {
  return _react.default.createElement(_snapshotBase.default, null);
}).add('Doc site Snapshot Toggle', function () {
  return _react.default.createElement(_snapshotToggle.default, null);
}).add('Doc site Toggle', function () {
  return _react.default.createElement(_toggle.default, null);
});