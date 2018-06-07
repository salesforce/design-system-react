"use strict";

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _createReactClass = require("create-react-class");

var _createReactClass2 = _interopRequireDefault(_createReactClass);

var _react3 = require("@storybook/react");

var _iconSettings = require("../../../icon-settings");

var _iconSettings2 = _interopRequireDefault(_iconSettings);

var _constants = require("../../../../utilities/constants");

var _ = require("../");

var _2 = _interopRequireDefault(_);

var _button = require("../../../button");

var _button2 = _interopRequireDefault(_button);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CheckboxIndeterminate = (0, _createReactClass2.default)({
  displayName: "".concat(_constants.FORMS_CHECKBOX, "_INDETERMINATE"),
  getInitialState: function getInitialState() {
    return {
      indeterminate: true,
      checked: true,
      currentStateHelper: 'Indeterminate'
    };
  },
  handleChange: function handleChange(checked, event, data) {
    var checkedLabel = data.checked ? 'Checked' : 'Unchecked';
    this.setState({
      checked: data.checked,
      currentStateHelper: data.indeterminate ? 'Indeterminate' : checkedLabel,
      indeterminate: data.indeterminate
    });
    (0, _react3.action)('handleChange')(checked, event, "checked: ".concat(data.checked, ",\n\t\t\tindeterminate: ").concat(data.indeterminate));
  },
  changeToIndeterminate: function changeToIndeterminate(event) {
    this.setState({
      currentStateHelper: 'Indeterminate',
      checked: true,
      indeterminate: true
    });
    (0, _react3.action)('changeToIndeterminate')(event, 'checked: true, indeterminate: true');
  },
  changeToCheck: function changeToCheck(event) {
    this.setState({
      currentStateHelper: 'Checked',
      checked: true,
      indeterminate: false
    });
    (0, _react3.action)('changeToCheck')(event, 'checked: true, indeterminate: false');
  },
  changeToUnChecked: function changeToUnChecked(event) {
    this.setState({
      currentStateHelper: 'Unchecked',
      checked: false,
      indeterminate: false
    });
    (0, _react3.action)('changeToUnChecked')(event, 'checked: false, indeterminate: false');
  },
  render: function render() {
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
      assistiveText: "Checkbox (indeterminate)",
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
});
(0, _react3.storiesOf)(_constants.FORMS_CHECKBOX, module).addDecorator(function (getStory) {
  return _react2.default.createElement("div", {
    className: "slds-p-around--medium"
  }, _react2.default.createElement(_iconSettings2.default, {
    iconPath: "/assets/icons"
  }, getStory()));
}).add('Checkbox', function () {
  return _react2.default.createElement(_2.default, {
    label: "Checkbox Label",
    name: "checkbox-example-base",
    onChange: (0, _react3.action)('change'),
    onBlur: function onBlur(e) {
      console.log('bluring ', e.target);
    }
  });
}).add('Checkbox (with error)', function () {
  return _react2.default.createElement(_2.default, {
    label: "Checkbox Label",
    name: "checkbox-example-base-error",
    errorText: "This field has an error.",
    onChange: (0, _react3.action)('change'),
    onBlur: function onBlur(e) {
      console.log('bluring ', e.target);
    }
  });
}).add('Checkbox (required)', function () {
  return _react2.default.createElement(_2.default, {
    label: "Checkbox Label",
    name: "checkbox-example-base-required",
    onChange: (0, _react3.action)('change'),
    required: true
  });
}).add('Checkbox (disabled)', function () {
  return _react2.default.createElement(_2.default, {
    label: "Checkbox Label",
    name: "checkbox-example-base-disabled",
    onChange: (0, _react3.action)('change'),
    disabled: true
  });
}).add('Checkbox (assistive text)', function () {
  return _react2.default.createElement("div", null, _react2.default.createElement(_2.default, {
    assistiveText: "This is my checkbox. There are many like it, but this one is mine. My checkbox is my best friend. It is my life. I must master it as I must master my life. Without me, my checkbox is useless. Without my checkbox, I am useless. I must make my checkbox true. I must make it truer than my radio button who is trying to... ",
    label: "Checkbox Label",
    name: "checkbox-example-base-assistiveText",
    onChange: (0, _react3.action)('change')
  }), _react2.default.createElement("div", {
    className: "slds-box slds-text-longform slds-m-top--large"
  }, _react2.default.createElement("p", null, "This example has assistive text. In Safari on Mac you can turn assistive text on by using the keyboard combination:", _react2.default.createElement("strong", null, "Command + F5"), "."), _react2.default.createElement("p", null, "Once you have enabled it, use your tab key to focus on the checkbox input, and the system should read you what is supplied to the checkbox as the ", _react2.default.createElement("code", null, "assistiveText"), "property.")));
}).add('Checkbox (checked)', function () {
  return _react2.default.createElement(_2.default, {
    checked: true,
    label: "Checkbox Label",
    name: "checkbox-example-base-checked",
    onChange: (0, _react3.action)('change')
  });
}).add('Checkbox (indeterminate)', function () {
  return _react2.default.createElement(CheckboxIndeterminate, null);
}).add('Checkbox Toggle', function () {
  return _react2.default.createElement(_2.default, {
    label: "Checkbox Toggle Label",
    name: "checkbox-example-toggle",
    onChange: (0, _react3.action)('change'),
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
    onChange: (0, _react3.action)('change'),
    onBlur: function onBlur(e) {
      console.log('bluring ', e.target);
    },
    variant: "toggle"
  });
}).add('Checkbox Toggle (required)', function () {
  return _react2.default.createElement(_2.default, {
    label: "Checkbox Toggle Label",
    name: "checkbox-example-toggle-required",
    onChange: (0, _react3.action)('change'),
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
    onChange: (0, _react3.action)('change'),
    onBlur: function onBlur(e) {
      console.log('bluring ', e.target);
    },
    variant: "toggle",
    disabled: true
  });
}).add('Checkbox Toggle (assistive text)', function () {
  return _react2.default.createElement("div", null, _react2.default.createElement(_2.default, {
    assistiveText: "This is my checkbox. There are many like it, but this one is mine. My checkbox is my best friend. It is my life. I must master it as I must master my life. Without me, my checkbox is useless. Without my checkbox, I am useless. I must make my checkbox true. I must make it truer than my radio button who is trying to... ",
    label: "Checkbox Label",
    name: "checkbox-example-base-assistiveText",
    onChange: (0, _react3.action)('change'),
    variant: "toggle"
  }), _react2.default.createElement("div", {
    className: "slds-box slds-text-longform slds-m-top--large"
  }, _react2.default.createElement("p", null, "This example has assistive text. In Safari on Mac you can turn assistive text on by using the keyboard combination:", _react2.default.createElement("strong", null, "Command + F5"), "."), _react2.default.createElement("p", null, "Once you have enabled it, use your tab key to focus on the checkbox input, and the system should read you what is supplied to the checkbox as the ", _react2.default.createElement("code", null, "assistiveText"), "property.")));
}).add('Checkbox Toggle (checked)', function () {
  return _react2.default.createElement(_2.default, {
    checked: true,
    label: "Checkbox Label",
    name: "checkbox-example-toggle-checked",
    onChange: (0, _react3.action)('change'),
    variant: "toggle"
  });
});