"use strict";

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _react3 = require("@storybook/react");

var _addonActions = require("@storybook/addon-actions");

var _constants = require("../../../utilities/constants");

var _button = require("../../button");

var _button2 = _interopRequireDefault(_button);

var _iconSettings = require("../../icon-settings");

var _iconSettings2 = _interopRequireDefault(_iconSettings);

var _ = require("../");

var _2 = _interopRequireDefault(_);

var _tooltip = require("../../tooltip");

var _tooltip2 = _interopRequireDefault(_tooltip);

var _inputIcon = require("../../icon/input-icon");

var _inputIcon2 = _interopRequireDefault(_inputIcon);

var _counterInput = require("../__examples__/counter-input");

var _counterInput2 = _interopRequireDefault(_counterInput);

var _counterStaticInput = require("../__examples__/counter-static-input");

var _counterStaticInput2 = _interopRequireDefault(_counterStaticInput);

var _inlineHelp = require("../__examples__/inline-help");

var _inlineHelp2 = _interopRequireDefault(_inlineHelp);

var _fieldLevelHelp = require("../__examples__/field-level-help");

var _fieldLevelHelp2 = _interopRequireDefault(_fieldLevelHelp);

var _default = require("../__examples__/default");

var _default2 = _interopRequireDefault(_default);

var _error = require("../__examples__/error");

var _error2 = _interopRequireDefault(_error);

var _icons = require("../__examples__/icons");

var _icons2 = _interopRequireDefault(_icons);

var _inactiveInputs = require("../__examples__/inactiveInputs");

var _inactiveInputs2 = _interopRequireDefault(_inactiveInputs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var iconClicked = _addonActions.action;

var clearIcon = _react2.default.createElement(_inputIcon2.default, {
  assistiveText: {
    icon: 'clear'
  },
  name: "clear",
  category: "utility"
});

var clearIconClickable = _react2.default.createElement(_inputIcon2.default, {
  assistiveText: {
    icon: 'clear'
  },
  name: "clear",
  category: "utility",
  onClick: iconClicked('Clear icon clicked')
});

var searchIcon = _react2.default.createElement(_inputIcon2.default, {
  name: "search",
  category: "utility"
});

var searchIconClickable = _react2.default.createElement(_inputIcon2.default, {
  assistiveText: {
    icon: 'Search'
  },
  name: "search",
  category: "utility",
  onClick: iconClicked('Search icon clicked')
});

(0, _react3.storiesOf)(_constants.INPUT, module).addDecorator(function (getStory) {
  return _react2.default.createElement("div", {
    className: "slds-p-around_medium"
  }, getStory());
}).add('Base', function () {
  return _react2.default.createElement(_iconSettings2.default, {
    iconPath: "/assets/icons"
  }, _react2.default.createElement("section", null, _react2.default.createElement("ol", null, _react2.default.createElement("li", {
    className: "slds-p-bottom_large"
  }, _react2.default.createElement("h1", {
    className: "slds-text-title_caps slds-p-vertical_medium"
  }, "1. Base Input with visible label"), _react2.default.createElement(_2.default, {
    id: "base-id",
    label: "My Label",
    placeholder: "My placeholder"
  })), _react2.default.createElement("li", {
    className: "slds-p-bottom_large"
  }, _react2.default.createElement("h1", {
    className: "slds-text-title_caps slds-p-vertical_medium"
  }, "2. Base Input with hidden label (assistive text)"), _react2.default.createElement(_2.default, {
    assistiveText: {
      label: 'My label'
    },
    id: "assistiveLabel-id",
    placeholder: "My placeholder"
  })))));
}).add('Custom style and autocomplete', function () {
  return _react2.default.createElement(_iconSettings2.default, {
    iconPath: "/assets/icons"
  }, _react2.default.createElement("section", null, _react2.default.createElement("ol", null, _react2.default.createElement("li", {
    className: "slds-p-bottom_large"
  }, _react2.default.createElement("h1", {
    className: "slds-text-title_caps slds-p-vertical_medium"
  }, "Input with custom style"), _react2.default.createElement(_2.default, {
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
  return _react2.default.createElement(_iconSettings2.default, {
    iconPath: "/assets/icons"
  }, _react2.default.createElement("section", null, _react2.default.createElement("ol", null, _react2.default.createElement("li", {
    className: "slds-p-bottom_large"
  }, _react2.default.createElement("h1", {
    className: "slds-text-title_caps slds-p-vertical_medium"
  }, "1. Base Input with left icon"), _react2.default.createElement(_2.default, {
    id: "with-left-icon",
    label: "My label",
    iconLeft: searchIcon,
    placeholder: "My placeholder"
  })), _react2.default.createElement("li", {
    className: "slds-p-bottom_large"
  }, _react2.default.createElement("h1", {
    className: "slds-text-title_caps slds-p-vertical_medium"
  }, "2. Base Input with Clickable left icon"), _react2.default.createElement(_2.default, {
    id: "with-left-clickable-icon",
    label: "My Label",
    iconLeft: searchIconClickable,
    placeholder: "My placeholder"
  })), _react2.default.createElement("li", {
    className: "slds-p-bottom_large"
  }, _react2.default.createElement("h1", {
    className: "slds-text-title_caps slds-p-vertical_medium"
  }, "3. Base Input with right icon"), _react2.default.createElement(_2.default, {
    id: "with-right-icon",
    label: "My Label",
    iconRight: searchIcon,
    placeholder: "My placeholder"
  })), _react2.default.createElement("li", {
    className: "slds-p-bottom_large"
  }, _react2.default.createElement("h1", {
    className: "slds-text-title_caps slds-p-vertical_medium"
  }, "4. Base Input with Clickable right icon"), _react2.default.createElement(_2.default, {
    id: "with-right-clickable-icon",
    label: "My Label",
    iconRight: clearIconClickable,
    placeholder: "My placeholder"
  })), _react2.default.createElement("li", {
    className: "slds-p-bottom_large"
  }, _react2.default.createElement("h1", {
    className: "slds-text-title_caps slds-p-vertical_medium"
  }, "5. Base Input with left and right icons"), _react2.default.createElement(_2.default, {
    id: "with-left-and-right-icons",
    label: "My Label",
    iconLeft: searchIcon,
    iconRight: clearIcon,
    placeholder: "My placeholder"
  })), _react2.default.createElement("li", {
    className: "slds-p-bottom_large"
  }, _react2.default.createElement("h1", {
    className: "slds-text-title_caps slds-p-vertical_medium"
  }, "6. Base Input with Clickable left and right icon"), _react2.default.createElement(_2.default, {
    id: "with-clickable-left-and-right-icon",
    label: "My label",
    iconLeft: searchIconClickable,
    iconRight: clearIconClickable,
    placeholder: "My placeholder"
  })), _react2.default.createElement("li", {
    className: "slds-p-bottom_large"
  }, _react2.default.createElement("h1", {
    className: "slds-text-title_caps slds-p-vertical_medium"
  }, "7. Base Input with left and clickable right icon"), _react2.default.createElement(_2.default, {
    id: "with-left-and-clickable-right-icon",
    label: "My Label",
    iconLeft: searchIcon,
    iconRight: clearIconClickable,
    placeholder: "My placeholder"
  })), _react2.default.createElement("li", {
    className: "slds-p-bottom_large"
  }, _react2.default.createElement("h1", {
    className: "slds-text-title_caps slds-p-vertical_medium"
  }, "8. Base Input with left, clickable right icon, and loading spinner"), _react2.default.createElement(_2.default, {
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
  return _react2.default.createElement(_iconSettings2.default, {
    iconPath: "/assets/icons"
  }, _react2.default.createElement("section", null, _react2.default.createElement("h1", {
    className: "slds-text-title_caps slds-p-vertical_medium"
  }, "Input with Fixed Text"), _react2.default.createElement(_2.default, {
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
  return _react2.default.createElement(_iconSettings2.default, {
    iconPath: "/assets/icons"
  }, _react2.default.createElement("section", null, _react2.default.createElement("h1", {
    className: "slds-text-title_caps slds-p-vertical_medium"
  }, "Read only Input"), _react2.default.createElement(_2.default, {
    id: "read-only",
    name: "read-only",
    label: "My Label",
    readOnly: true,
    value: "Read Only Value"
  })));
}).add('Static Input', function () {
  return _react2.default.createElement(_iconSettings2.default, {
    iconPath: "/assets/icons"
  }, _react2.default.createElement("section", null, _react2.default.createElement("h1", {
    className: "slds-text-title_caps slds-p-vertical_medium"
  }, "Static Input"), _react2.default.createElement(_2.default, {
    id: "static-input",
    name: "static-input",
    label: "My Label",
    isStatic: true,
    value: "Static value"
  })));
}).add('Disabled Input', function () {
  return _react2.default.createElement(_iconSettings2.default, {
    iconPath: "/assets/icons"
  }, _react2.default.createElement("section", null, _react2.default.createElement("h1", {
    className: "slds-text-title_caps slds-p-vertical_medium"
  }, "Disabled Input"), _react2.default.createElement(_2.default, {
    id: "disabled-input",
    name: "disabled-input",
    label: "My Label",
    disabled: true,
    value: "Disabled value"
  })));
}).add('Required Input in Error State', function () {
  return _react2.default.createElement(_iconSettings2.default, {
    iconPath: "/assets/icons"
  }, _react2.default.createElement("section", null, _react2.default.createElement("h1", {
    className: "slds-text-title_caps slds-p-vertical_medium"
  }, "Example Button"), _react2.default.createElement(_button2.default, {
    label: "Test"
  }), _react2.default.createElement("h1", {
    className: "slds-text-title_caps slds-p-vertical_medium"
  }, "Required Input with Error"), _react2.default.createElement(_2.default, {
    id: "required-input-error",
    "aria-describedby": "error-1",
    name: "required-input-error",
    label: "My Label",
    required: true,
    errorText: "This field is required.",
    placeholder: "My placeholder"
  })));
}).add('Inline Help', function () {
  return _react2.default.createElement(_inlineHelp2.default, null);
}).add('Field Level Help', function () {
  return _react2.default.createElement(_fieldLevelHelp2.default, null);
}).add('Field Level Help, Tooltip Open', function () {
  return _react2.default.createElement(_fieldLevelHelp2.default, {
    tooltipOpen: true
  });
}).add('Counter Input', function () {
  return _react2.default.createElement(_counterInput2.default, null);
}).add('Counter Static Input', function () {
  return _react2.default.createElement(_counterStaticInput2.default, null);
}).add('Docs site Default', function () {
  return _react2.default.createElement(_default2.default, null);
}).add('Docs site Error', function () {
  return _react2.default.createElement(_error2.default, null);
}).add('Docs site Icons', function () {
  return _react2.default.createElement(_icons2.default, null);
}).add('Docs site InactiveInputs', function () {
  return _react2.default.createElement(_inactiveInputs2.default, null);
});