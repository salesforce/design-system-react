"use strict";

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _react3 = require("@storybook/react");

var _iconSettings = require("../../icon-settings");

var _iconSettings2 = _interopRequireDefault(_iconSettings);

var _constants = require("../../../utilities/constants");

var _button = require("../../button");

var _button2 = _interopRequireDefault(_button);

var _ = require("../");

var _2 = _interopRequireDefault(_);

var _inputIcon = require("../../icon/input-icon");

var _inputIcon2 = _interopRequireDefault(_inputIcon);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var iconClicked = _react3.action;

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

(0, _react3.storiesOf)(_constants.FORMS_INPUT, module).addDecorator(function (getStory) {
  return _react2.default.createElement("div", {
    className: "slds-p-around--medium"
  }, _react2.default.createElement(_iconSettings2.default, {
    iconPath: "/assets/icons"
  }, getStory()));
}).add('Base', function () {
  return _react2.default.createElement("section", null, _react2.default.createElement("ol", null, _react2.default.createElement("li", {
    className: "slds-p-bottom--large"
  }, _react2.default.createElement("h1", {
    className: "slds-text-title_caps slds-p-vertical--medium"
  }, "1. Base Input with visible label"), _react2.default.createElement(_2.default, {
    id: "base-id",
    label: "My Label",
    placeholder: "My placeholder"
  })), _react2.default.createElement("li", {
    className: "slds-p-bottom--large"
  }, _react2.default.createElement("h1", {
    className: "slds-text-title_caps slds-p-vertical--medium"
  }, "2. Base Input with hidden label (assistive text)"), _react2.default.createElement(_2.default, {
    assistiveText: {
      label: 'My label'
    },
    id: "assistiveLabel-id",
    placeholder: "My placeholder"
  }))));
}).add('Base with Icons', function () {
  return _react2.default.createElement("section", null, _react2.default.createElement("ol", null, _react2.default.createElement("li", {
    className: "slds-p-bottom--large"
  }, _react2.default.createElement("h1", {
    className: "slds-text-title_caps slds-p-vertical--medium"
  }, "1. Base Input with left icon"), _react2.default.createElement(_2.default, {
    id: "with-left-icon",
    label: "My label",
    iconLeft: searchIcon,
    placeholder: "My placeholder"
  })), _react2.default.createElement("li", {
    className: "slds-p-bottom--large"
  }, _react2.default.createElement("h1", {
    className: "slds-text-title_caps slds-p-vertical--medium"
  }, "2. Base Input with Clickable left icon"), _react2.default.createElement(_2.default, {
    id: "with-left-clickable-icon",
    label: "My Label",
    iconLeft: searchIconClickable,
    placeholder: "My placeholder"
  })), _react2.default.createElement("li", {
    className: "slds-p-bottom--large"
  }, _react2.default.createElement("h1", {
    className: "slds-text-title_caps slds-p-vertical--medium"
  }, "3. Base Input with right icon"), _react2.default.createElement(_2.default, {
    id: "with-right-icon",
    label: "My Label",
    iconRight: searchIcon,
    placeholder: "My placeholder"
  })), _react2.default.createElement("li", {
    className: "slds-p-bottom--large"
  }, _react2.default.createElement("h1", {
    className: "slds-text-title_caps slds-p-vertical--medium"
  }, "4. Base Input with Clickable right icon"), _react2.default.createElement(_2.default, {
    id: "with-right-clickable-icon",
    label: "My Label",
    iconRight: clearIconClickable,
    placeholder: "My placeholder"
  })), _react2.default.createElement("li", {
    className: "slds-p-bottom--large"
  }, _react2.default.createElement("h1", {
    className: "slds-text-title_caps slds-p-vertical--medium"
  }, "5. Base Input with left and right icons"), _react2.default.createElement(_2.default, {
    label: "My Label",
    iconLeft: searchIcon,
    iconRight: clearIcon,
    placeholder: "My placeholder"
  })), _react2.default.createElement("li", {
    className: "slds-p-bottom--large"
  }, _react2.default.createElement("h1", {
    className: "slds-text-title_caps slds-p-vertical--medium"
  }, "6. Base Input with Clickable left and right icon"), _react2.default.createElement(_2.default, {
    label: "My label",
    iconLeft: searchIconClickable,
    iconRight: clearIcon,
    placeholder: "My placeholder"
  })), _react2.default.createElement("li", {
    className: "slds-p-bottom--large"
  }, _react2.default.createElement("h1", {
    className: "slds-text-title_caps slds-p-vertical--medium"
  }, "7. Base Input with left and clickable right icon"), _react2.default.createElement(_2.default, {
    label: "My Label",
    iconLeft: searchIcon,
    iconRight: clearIconClickable,
    placeholder: "My placeholder"
  })), _react2.default.createElement("li", {
    className: "slds-p-bottom--large"
  }, _react2.default.createElement("h1", {
    className: "slds-text-title_caps slds-p-vertical--medium"
  }, "8. Base Input with left, clickable right icon, and loading spinner"), _react2.default.createElement(_2.default, {
    assistiveText: {
      spinner: 'Field data is loading'
    },
    hasSpinner: true,
    iconLeft: searchIcon,
    iconRight: clearIconClickable,
    label: "My Label",
    name: "right-clickable-icon",
    placeholder: "My placeholder"
  }))));
}).add('Fixed Text', function () {
  return _react2.default.createElement("section", null, _react2.default.createElement("h1", {
    className: "slds-text-title_caps slds-p-vertical--medium"
  }, "Input with Fixed Text"), _react2.default.createElement(_2.default, {
    assistiveText: {
      label: 'My Label'
    },
    name: "fixed-text",
    label: "My Label",
    fixedTextLeft: "$",
    placeholder: "My placeholder"
  }));
}).add('Read Only', function () {
  return _react2.default.createElement("section", null, _react2.default.createElement("h1", {
    className: "slds-text-title_caps slds-p-vertical--medium"
  }, "Read only Input"), _react2.default.createElement(_2.default, {
    name: "read-only",
    label: "My Label",
    readOnly: true,
    value: "Read Only Value"
  }));
}).add('Static Input', function () {
  return _react2.default.createElement("section", null, _react2.default.createElement("h1", {
    className: "slds-text-title_caps slds-p-vertical--medium"
  }, "Static Input"), _react2.default.createElement(_2.default, {
    name: "static-input",
    label: "My Label",
    isStatic: true,
    value: "Static value"
  }));
}).add('Disabled Input', function () {
  return _react2.default.createElement("section", null, _react2.default.createElement("h1", {
    className: "slds-text-title_caps slds-p-vertical--medium"
  }, "Disabled Input"), _react2.default.createElement(_2.default, {
    name: "disabled-input",
    label: "My Label",
    disabled: true,
    value: "Disabled value"
  }));
}).add('Required Input in Error State', function () {
  return _react2.default.createElement("section", null, _react2.default.createElement("h1", {
    className: "slds-text-title_caps slds-p-vertical--medium"
  }, "Example Button"), _react2.default.createElement(_button2.default, {
    label: "Test"
  }), _react2.default.createElement("h1", {
    className: "slds-text-title_caps slds-p-vertical--medium"
  }, "Required Input with Error"), _react2.default.createElement(_2.default, {
    "aria-describedby": "error-1",
    name: "required-input-error",
    label: "My Label",
    required: true,
    errorText: "This field is required.",
    placeholder: "My placeholder"
  }));
});