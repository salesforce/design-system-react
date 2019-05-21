"use strict";

var _react = _interopRequireDefault(require("react"));

var _react2 = require("@storybook/react");

var _addonActions = require("@storybook/addon-actions");

var _constants = require("../../../utilities/constants");

var _button = _interopRequireDefault(require("../../button"));

var _iconSettings = _interopRequireDefault(require("../../icon-settings"));

var _ = _interopRequireDefault(require("../"));

var _tooltip = _interopRequireDefault(require("../../tooltip"));

var _inputIcon = _interopRequireDefault(require("../../icon/input-icon"));

var _counterInput = _interopRequireDefault(require("../__examples__/counter-input"));

var _counterStaticInput = _interopRequireDefault(require("../__examples__/counter-static-input"));

var _inlineHelp = _interopRequireDefault(require("../__examples__/inline-help"));

var _fieldLevelHelp = _interopRequireDefault(require("../__examples__/field-level-help"));

var _default = _interopRequireDefault(require("../__examples__/default"));

var _error = _interopRequireDefault(require("../__examples__/error"));

var _icons = _interopRequireDefault(require("../__examples__/icons"));

var _inactiveInputs = _interopRequireDefault(require("../__examples__/inactiveInputs"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var iconClicked = _addonActions.action;

var clearIcon = _react.default.createElement(_inputIcon.default, {
  assistiveText: {
    icon: 'clear'
  },
  name: "clear",
  category: "utility"
});

var clearIconClickable = _react.default.createElement(_inputIcon.default, {
  assistiveText: {
    icon: 'clear'
  },
  name: "clear",
  category: "utility",
  onClick: iconClicked('Clear icon clicked')
});

var searchIcon = _react.default.createElement(_inputIcon.default, {
  name: "search",
  category: "utility"
});

var searchIconClickable = _react.default.createElement(_inputIcon.default, {
  assistiveText: {
    icon: 'Search'
  },
  name: "search",
  category: "utility",
  onClick: iconClicked('Search icon clicked')
});

(0, _react2.storiesOf)(_constants.INPUT, module).addDecorator(function (getStory) {
  return _react.default.createElement("div", {
    className: "slds-p-around_medium"
  }, getStory());
}).add('Base', function () {
  return _react.default.createElement(_iconSettings.default, {
    iconPath: "/assets/icons"
  }, _react.default.createElement("section", null, _react.default.createElement("ol", null, _react.default.createElement("li", {
    className: "slds-p-bottom_large"
  }, _react.default.createElement("h1", {
    className: "slds-text-title_caps slds-p-vertical_medium"
  }, "1. Base Input with visible label"), _react.default.createElement(_.default, {
    id: "base-id",
    label: "My Label",
    placeholder: "My placeholder"
  })), _react.default.createElement("li", {
    className: "slds-p-bottom_large"
  }, _react.default.createElement("h1", {
    className: "slds-text-title_caps slds-p-vertical_medium"
  }, "2. Base Input with hidden label (assistive text)"), _react.default.createElement(_.default, {
    assistiveText: {
      label: 'My label'
    },
    id: "assistiveLabel-id",
    placeholder: "My placeholder"
  })))));
}).add('Custom style and autocomplete', function () {
  return _react.default.createElement(_iconSettings.default, {
    iconPath: "/assets/icons"
  }, _react.default.createElement("section", null, _react.default.createElement("ol", null, _react.default.createElement("li", {
    className: "slds-p-bottom_large"
  }, _react.default.createElement("h1", {
    className: "slds-text-title_caps slds-p-vertical_medium"
  }, "Input with custom style"), _react.default.createElement(_.default, {
    autoComplete: "off",
    styleInput: {
      width: 130,
      height: 30,
      background: '#efffff'
    },
    id: "custom-style",
    label: "My Label",
    placeholder: "My placeholder"
  })))));
}).add('Base with Icons', function () {
  return _react.default.createElement(_iconSettings.default, {
    iconPath: "/assets/icons"
  }, _react.default.createElement("section", null, _react.default.createElement("ol", null, _react.default.createElement("li", {
    className: "slds-p-bottom_large"
  }, _react.default.createElement("h1", {
    className: "slds-text-title_caps slds-p-vertical_medium"
  }, "1. Base Input with left icon"), _react.default.createElement(_.default, {
    id: "with-left-icon",
    label: "My label",
    iconLeft: searchIcon,
    placeholder: "My placeholder"
  })), _react.default.createElement("li", {
    className: "slds-p-bottom_large"
  }, _react.default.createElement("h1", {
    className: "slds-text-title_caps slds-p-vertical_medium"
  }, "2. Base Input with Clickable left icon"), _react.default.createElement(_.default, {
    id: "with-left-clickable-icon",
    label: "My Label",
    iconLeft: searchIconClickable,
    placeholder: "My placeholder"
  })), _react.default.createElement("li", {
    className: "slds-p-bottom_large"
  }, _react.default.createElement("h1", {
    className: "slds-text-title_caps slds-p-vertical_medium"
  }, "3. Base Input with right icon"), _react.default.createElement(_.default, {
    id: "with-right-icon",
    label: "My Label",
    iconRight: searchIcon,
    placeholder: "My placeholder"
  })), _react.default.createElement("li", {
    className: "slds-p-bottom_large"
  }, _react.default.createElement("h1", {
    className: "slds-text-title_caps slds-p-vertical_medium"
  }, "4. Base Input with Clickable right icon"), _react.default.createElement(_.default, {
    id: "with-right-clickable-icon",
    label: "My Label",
    iconRight: clearIconClickable,
    placeholder: "My placeholder"
  })), _react.default.createElement("li", {
    className: "slds-p-bottom_large"
  }, _react.default.createElement("h1", {
    className: "slds-text-title_caps slds-p-vertical_medium"
  }, "5. Base Input with left and right icons"), _react.default.createElement(_.default, {
    id: "with-left-and-right-icons",
    label: "My Label",
    iconLeft: searchIcon,
    iconRight: clearIcon,
    placeholder: "My placeholder"
  })), _react.default.createElement("li", {
    className: "slds-p-bottom_large"
  }, _react.default.createElement("h1", {
    className: "slds-text-title_caps slds-p-vertical_medium"
  }, "6. Base Input with Clickable left and right icon"), _react.default.createElement(_.default, {
    id: "with-clickable-left-and-right-icon",
    label: "My label",
    iconLeft: searchIconClickable,
    iconRight: clearIconClickable,
    placeholder: "My placeholder"
  })), _react.default.createElement("li", {
    className: "slds-p-bottom_large"
  }, _react.default.createElement("h1", {
    className: "slds-text-title_caps slds-p-vertical_medium"
  }, "7. Base Input with left and clickable right icon"), _react.default.createElement(_.default, {
    id: "with-left-and-clickable-right-icon",
    label: "My Label",
    iconLeft: searchIcon,
    iconRight: clearIconClickable,
    placeholder: "My placeholder"
  })), _react.default.createElement("li", {
    className: "slds-p-bottom_large"
  }, _react.default.createElement("h1", {
    className: "slds-text-title_caps slds-p-vertical_medium"
  }, "8. Base Input with left, clickable right icon, and loading spinner"), _react.default.createElement(_.default, {
    id: "with-left-clickable-right-and-spinner",
    assistiveText: {
      spinner: 'Field data is loading'
    },
    hasSpinner: true,
    iconLeft: searchIcon,
    iconRight: clearIconClickable,
    label: "My Label",
    name: "right-clickable-icon",
    placeholder: "My placeholder"
  })))));
}).add('Fixed Text', function () {
  return _react.default.createElement(_iconSettings.default, {
    iconPath: "/assets/icons"
  }, _react.default.createElement("section", null, _react.default.createElement("h1", {
    className: "slds-text-title_caps slds-p-vertical_medium"
  }, "Input with Fixed Text"), _react.default.createElement(_.default, {
    id: "fixed-text",
    assistiveText: {
      label: 'My Label'
    },
    name: "fixed-text",
    label: "My Label",
    fixedTextLeft: "$",
    placeholder: "My placeholder"
  })));
}).add('Read Only', function () {
  return _react.default.createElement(_iconSettings.default, {
    iconPath: "/assets/icons"
  }, _react.default.createElement("section", null, _react.default.createElement("h1", {
    className: "slds-text-title_caps slds-p-vertical_medium"
  }, "Read only Input"), _react.default.createElement(_.default, {
    id: "read-only",
    name: "read-only",
    label: "My Label",
    readOnly: true,
    value: "Read Only Value"
  })));
}).add('Static Input', function () {
  return _react.default.createElement(_iconSettings.default, {
    iconPath: "/assets/icons"
  }, _react.default.createElement("section", null, _react.default.createElement("h1", {
    className: "slds-text-title_caps slds-p-vertical_medium"
  }, "Static Input"), _react.default.createElement(_.default, {
    id: "static-input",
    name: "static-input",
    label: "My Label",
    isStatic: true,
    value: "Static value"
  })));
}).add('Disabled Input', function () {
  return _react.default.createElement(_iconSettings.default, {
    iconPath: "/assets/icons"
  }, _react.default.createElement("section", null, _react.default.createElement("h1", {
    className: "slds-text-title_caps slds-p-vertical_medium"
  }, "Disabled Input"), _react.default.createElement(_.default, {
    id: "disabled-input",
    name: "disabled-input",
    label: "My Label",
    disabled: true,
    value: "Disabled value"
  })));
}).add('Required Input in Error State', function () {
  return _react.default.createElement(_iconSettings.default, {
    iconPath: "/assets/icons"
  }, _react.default.createElement("section", null, _react.default.createElement("h1", {
    className: "slds-text-title_caps slds-p-vertical_medium"
  }, "Example Button"), _react.default.createElement(_button.default, {
    label: "Test"
  }), _react.default.createElement("h1", {
    className: "slds-text-title_caps slds-p-vertical_medium"
  }, "Required Input with Error"), _react.default.createElement(_.default, {
    id: "required-input-error",
    "aria-describedby": "error-1",
    name: "required-input-error",
    label: "My Label",
    required: true,
    errorText: "This field is required.",
    placeholder: "My placeholder"
  })));
}).add('Inline Help', function () {
  return _react.default.createElement(_inlineHelp.default, null);
}).add('Field Level Help', function () {
  return _react.default.createElement(_fieldLevelHelp.default, null);
}).add('Field Level Help, Tooltip Open', function () {
  return _react.default.createElement(_fieldLevelHelp.default, {
    tooltipOpen: true
  });
}).add('Counter Input', function () {
  return _react.default.createElement(_counterInput.default, null);
}).add('Counter Static Input', function () {
  return _react.default.createElement(_counterStaticInput.default, null);
}).add('Docs site Default', function () {
  return _react.default.createElement(_default.default, null);
}).add('Docs site Error', function () {
  return _react.default.createElement(_error.default, null);
}).add('Docs site Icons', function () {
  return _react.default.createElement(_icons.default, null);
}).add('Docs site InactiveInputs', function () {
  return _react.default.createElement(_inactiveInputs.default, null);
});