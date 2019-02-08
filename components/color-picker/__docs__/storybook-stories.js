"use strict";

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _react3 = require("@storybook/react");

var _addonActions = require("@storybook/addon-actions");

var _iconSettings = require("../../icon-settings");

var _iconSettings2 = _interopRequireDefault(_iconSettings);

var _colorPicker = require("../../color-picker");

var _colorPicker2 = _interopRequireDefault(_colorPicker);

var _constants = require("../../../utilities/constants");

var _default = require("../__examples__/default");

var _default2 = _interopRequireDefault(_default);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var HEX_REGEX_6_DIGITS = /^#([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i;

var handleChange = function handleChange(event, data) {
  var dataAsArray = Object.keys(data).map(function (key) {
    return data[key];
  });
  (0, _addonActions.action)('onChange').apply(void 0, [event, data].concat(_toConsumableArray(dataAsArray)));
};

var customOuterInputValidator = function customOuterInputValidator(hex) {
  return !hex || HEX_REGEX_6_DIGITS.test(hex);
};

(0, _react3.storiesOf)(_constants.COLOR_PICKER, module).addDecorator(function (getStory) {
  return _react2.default.createElement("div", {
    className: "slds-p-around_medium"
  }, _react2.default.createElement(_iconSettings2.default, {
    iconPath: "/assets/icons"
  }, getStory()));
}).add('Default', function () {
  return _react2.default.createElement(_colorPicker2.default, {
    className: "test_class_name",
    events: {
      onChange: handleChange
    },
    labels: {
      label: 'Choose Color'
    },
    id: "default-color-picker"
  });
}).add('Custom Only', function () {
  return _react2.default.createElement(_colorPicker2.default, {
    events: {
      onChange: handleChange
    },
    id: "custom-only-color-picker",
    labels: {
      label: 'Choose Color'
    },
    variant: "custom"
  });
}).add('Swatch Only', function () {
  return _react2.default.createElement(_colorPicker2.default, {
    events: {
      onChange: handleChange
    },
    id: "swatch-only-color-picker",
    labels: {
      label: 'Choose Color'
    },
    variant: "swatches"
  });
}).add('Predefined Colors', function () {
  return _react2.default.createElement(_colorPicker2.default, {
    events: {
      onChange: handleChange
    },
    id: "predefined-color-picker",
    labels: {
      label: 'Choose Color'
    },
    swatchColors: ['#000000', '#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff', '#ffffff', ''],
    value: "#000000"
  });
}).add('Predefined Colors Only', function () {
  return _react2.default.createElement(_colorPicker2.default, {
    value: "#000000",
    events: {
      onChange: handleChange
    },
    id: "predefined-only-color-picker",
    labels: {
      label: 'Choose Color'
    },
    swatchColors: ['#000000', '#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff', '#ffffff', ''],
    variant: "swatches"
  });
}).add('Hidden Input', function () {
  return _react2.default.createElement(_colorPicker2.default, {
    events: {
      onChange: handleChange
    },
    hideInput: true,
    id: "hidden-input-color-picker",
    labels: {
      label: 'Choose Color'
    }
  });
}).add('Custom Tab Selected', function () {
  return _react2.default.createElement(_colorPicker2.default, {
    defaultSelectedTab: "custom",
    events: {
      onChange: handleChange
    },
    id: "Custom-tab-default-color-picker",
    labels: {
      label: 'Choose Color'
    }
  });
}).add('Outer Input in Error State', function () {
  return _react2.default.createElement(_colorPicker2.default, {
    events: {
      onChange: handleChange
    },
    errorText: "Hex is invalid. Please correct this field.",
    id: "outer-input-error-state-color-picker",
    labels: {
      label: 'Choose Color'
    },
    value: "#invalid"
  });
}).add('Working Color Input in Error State', function () {
  return _react2.default.createElement(_colorPicker2.default, {
    events: {
      onChange: handleChange
    },
    errorTextWorkingColor: "Hex is invalid. Please correct this field.",
    id: "working-color-error-state-color-picker",
    labels: {
      label: 'Choose Color'
    },
    valueWorking: "#f",
    variant: "custom"
  });
}).add('Custom Validator', function () {
  return (// Example of a custom validator that support hex color with strictly 6 digits.
    _react2.default.createElement(_colorPicker2.default, {
      events: {
        onChange: handleChange,
        onValidateColor: customOuterInputValidator,
        onValidateWorkingColor: customOuterInputValidator
      },
      id: "custom-validator-color-picker",
      labels: {
        label: 'Choose Color'
      }
    })
  );
}).add('Color Picker Disabled', function () {
  return _react2.default.createElement(_colorPicker2.default, {
    id: "color-picker",
    disabled: true,
    labels: {
      label: 'Choose Color'
    }
  });
}).add('ColorPicker Menu Open', function () {
  return _react2.default.createElement(_colorPicker2.default, {
    id: "color-picker",
    classNameMenu: "test_class_name_menu",
    isOpen: true,
    labels: {
      label: 'Choose Color'
    }
  });
}).add('Doc site Default', function () {
  return _react2.default.createElement(_default2.default, null);
});