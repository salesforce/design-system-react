"use strict";

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _react3 = require("@storybook/react");

var _addonActions = require("@storybook/addon-actions");

var _iconSettings = require("../../icon-settings");

var _iconSettings2 = _interopRequireDefault(_iconSettings);

var _constants = require("../../../utilities/constants");

var _ = require("../");

var _2 = _interopRequireDefault(_);

var _button = require("../../button");

var _button2 = _interopRequireDefault(_button);

var _default = require("../__examples__/default");

var _default2 = _interopRequireDefault(_default);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

var CheckboxIndeterminate =
/*#__PURE__*/
function (_React$Component) {
  _inherits(CheckboxIndeterminate, _React$Component);

  function CheckboxIndeterminate() {
    var _ref;

    var _temp, _this;

    _classCallCheck(this, CheckboxIndeterminate);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _possibleConstructorReturn(_this, (_temp = _this = _possibleConstructorReturn(this, (_ref = CheckboxIndeterminate.__proto__ || Object.getPrototypeOf(CheckboxIndeterminate)).call.apply(_ref, [this].concat(args))), Object.defineProperty(_assertThisInitialized(_this), "state", {
      configurable: true,
      enumerable: true,
      writable: true,
      value: {
        indeterminate: true,
        checked: true,
        currentStateHelper: 'Indeterminate'
      }
    }), Object.defineProperty(_assertThisInitialized(_this), "handleChange", {
      configurable: true,
      enumerable: true,
      writable: true,
      value: function value(checked, event, data) {
        var checkedLabel = data.checked ? 'Checked' : 'Unchecked';

        _this.setState({
          checked: data.checked,
          currentStateHelper: data.indeterminate ? 'Indeterminate' : checkedLabel,
          indeterminate: data.indeterminate
        });

        (0, _addonActions.action)('handleChange')(checked, event, "checked: ".concat(data.checked, ",\n\t\t\tindeterminate: ").concat(data.indeterminate));
      }
    }), Object.defineProperty(_assertThisInitialized(_this), "changeToIndeterminate", {
      configurable: true,
      enumerable: true,
      writable: true,
      value: function value(event) {
        _this.setState({
          currentStateHelper: 'Indeterminate',
          checked: true,
          indeterminate: true
        });

        (0, _addonActions.action)('changeToIndeterminate')(event, 'checked: true, indeterminate: true');
      }
    }), Object.defineProperty(_assertThisInitialized(_this), "changeToCheck", {
      configurable: true,
      enumerable: true,
      writable: true,
      value: function value(event) {
        _this.setState({
          currentStateHelper: 'Checked',
          checked: true,
          indeterminate: false
        });

        (0, _addonActions.action)('changeToCheck')(event, 'checked: true, indeterminate: false');
      }
    }), Object.defineProperty(_assertThisInitialized(_this), "changeToUnChecked", {
      configurable: true,
      enumerable: true,
      writable: true,
      value: function value(event) {
        _this.setState({
          currentStateHelper: 'Unchecked',
          checked: false,
          indeterminate: false
        });

        (0, _addonActions.action)('changeToUnChecked')(event, 'checked: false, indeterminate: false');
      }
    }), _temp));
  }

  _createClass(CheckboxIndeterminate, [{
    key: "render",
    value: function render() {
      return _react2.default.createElement("div", null, _react2.default.createElement(_button2.default, {
        onClick: this.changeToIndeterminate,
        label: "Indeterminate"
      }), _react2.default.createElement(_button2.default, {
        onClick: this.changeToCheck,
        label: "Check"
      }), _react2.default.createElement(_button2.default, {
        onClick: this.changeToUnChecked,
        label: "Uncheck"
      }), _react2.default.createElement("p", null, _react2.default.createElement("strong", null, "Current State:"), " ", this.state.currentStateHelper), _react2.default.createElement(_2.default, {
        assistiveText: {
          label: 'Checkbox (indeterminate)'
        },
        label: "Checkbox Label",
        name: "checkbox-example-standard-indeterminate",
        checked: this.state.checked,
        indeterminate: this.state.indeterminate,
        onChange: this.handleChange
      }), _react2.default.createElement("div", {
        className: "slds-box slds-text-longform slds-m-top--large"
      }, _react2.default.createElement("p", null, "This example has an ", _react2.default.createElement("em", null, "indeterminate"), " checkbox."), _react2.default.createElement("p", null, "It is set by providing the ", _react2.default.createElement("code", null, "indeterminate"), " prop as", ' ', _react2.default.createElement("code", null, _react2.default.createElement("strong", null, "true")), "."), _react2.default.createElement("p", null, "Once it is clicked, there is no way to make it go ", _react2.default.createElement("em", null, "back"), " to the indeterminate state,", ' ', _react2.default.createElement("a", {
        href: "https://developer.mozilla.org/en-US/docs/Web/CSS/:indeterminate#Checkbox_radio_button"
      }, "it must be done programatically, through JavaScript"), ".")));
    }
  }]);

  return CheckboxIndeterminate;
}(_react2.default.Component);

Object.defineProperty(CheckboxIndeterminate, "displayName", {
  configurable: true,
  enumerable: true,
  writable: true,
  value: "".concat(_constants.FORMS_CHECKBOX, "_INDETERMINATE")
});
(0, _react3.storiesOf)(_constants.FORMS_CHECKBOX, module).addDecorator(function (getStory) {
  return _react2.default.createElement("div", {
    className: "slds-p-around--medium"
  }, _react2.default.createElement(_iconSettings2.default, {
    iconPath: "/assets/icons"
  }, getStory()));
}).add('Checkbox (default, indeterminate, required, disabled', function () {
  return _react2.default.createElement(_default2.default, null);
}).add('Checkbox (assistive text)', function () {
  return _react2.default.createElement("div", null, _react2.default.createElement(_2.default, {
    assistiveText: {
      label: "This is my checkbox.\n\t\t\t\t\t\t\tThere are many like it, but this one is mine.\n\t\t\t\t\t\t\tMy checkbox is my best friend.\n\t\t\t\t\t\t\tIt is my life.\n\t\t\t\t\t\t\tI must master it as I must master my life.\n\t\t\t\t\t\t\tWithout me, my checkbox is useless. Without my checkbox, I am useless.\n\t\t\t\t\t\t\tI must make my checkbox true.\n\t\t\t\t\t\t\tI must make it truer than my radio button who is trying to... "
    },
    label: "Checkbox Label",
    name: "checkbox-example-base-assistiveText",
    onChange: (0, _addonActions.action)('change')
  }), _react2.default.createElement("div", {
    className: "slds-box slds-text-longform slds-m-top--large"
  }, _react2.default.createElement("p", null, "This example has assistive text. In Safari on Mac you can turn assistive text on by using the keyboard combination:", _react2.default.createElement("strong", null, "Command + F5"), "."), _react2.default.createElement("p", null, "Once you have enabled it, use your tab key to focus on the checkbox input, and the system should read you what is supplied to the checkbox as the ", _react2.default.createElement("code", null, "assistiveText"), "property.")));
}).add('Checkbox (checked)', function () {
  return _react2.default.createElement(_2.default, {
    checked: true,
    label: "Checkbox Label",
    name: "checkbox-example-base-checked",
    onChange: (0, _addonActions.action)('change')
  });
}).add('Checkbox (indeterminate)', function () {
  return _react2.default.createElement(CheckboxIndeterminate, null);
}).add('Checkbox Toggle', function () {
  return _react2.default.createElement(_2.default, {
    label: "Checkbox Toggle Label",
    name: "checkbox-example-toggle",
    onChange: (0, _addonActions.action)('change'),
    onBlur: function onBlur(e) {
      console.log('bluring ', e.target);
    },
    variant: "toggle"
  });
}).add('Checkbox Toggle (with error)', function () {
  return _react2.default.createElement(_2.default, {
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
  return _react2.default.createElement(_2.default, {
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
  return _react2.default.createElement(_2.default, {
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
  return _react2.default.createElement("div", null, _react2.default.createElement(_2.default, {
    assistiveText: {
      label: "This is my checkbox.\n\t\t\t\t\t\t\tThere are many like it, but this one is mine.\n\t\t\t\t\t\t\tMy checkbox is my best friend.\n\t\t\t\t\t\t\tIt is my life.\n\t\t\t\t\t\t\tI must master it as I must master my life.\n\t\t\t\t\t\t\tWithout me, my checkbox is useless. Without my checkbox, I am useless.\n\t\t\t\t\t\t\tI must make my checkbox true.\n\t\t\t\t\t\t\tI must make it truer than my radio button who is trying to... "
    },
    label: "Checkbox Label",
    name: "checkbox-example-base-assistiveText",
    onChange: (0, _addonActions.action)('change'),
    variant: "toggle"
  }), _react2.default.createElement("div", {
    className: "slds-box slds-text-longform slds-m-top--large"
  }, _react2.default.createElement("p", null, "This example has assistive text. In Safari on Mac you can turn assistive text on by using the keyboard combination:", _react2.default.createElement("strong", null, "Command + F5"), "."), _react2.default.createElement("p", null, "Once you have enabled it, use your tab key to focus on the checkbox input, and the system should read you what is supplied to the checkbox as the ", _react2.default.createElement("code", null, "assistiveText"), "property.")));
}).add('Checkbox Toggle (checked)', function () {
  return _react2.default.createElement(_2.default, {
    checked: true,
    label: "Checkbox Label",
    name: "checkbox-example-toggle-checked",
    onChange: (0, _addonActions.action)('change'),
    variant: "toggle"
  });
});