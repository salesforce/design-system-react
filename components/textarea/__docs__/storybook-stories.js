"use strict";

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _react3 = require("@storybook/react");

var _iconSettings = require("../../icon-settings");

var _iconSettings2 = _interopRequireDefault(_iconSettings);

var _constants = require("../../../utilities/constants");

var _ = require("../");

var _2 = _interopRequireDefault(_);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _react3.storiesOf)(_constants.FORMS_TEXTAREA, module).addDecorator(function (getStory) {
  return _react2.default.createElement("div", {
    className: "slds-p-around--medium"
  }, _react2.default.createElement(_iconSettings2.default, {
    iconPath: "/assets/icons"
  }, getStory()));
}).add('Standard', function () {
  return _react2.default.createElement(_2.default, {
    label: "Textarea Label",
    name: "standard-textarea",
    placeholder: "Placeholder Text"
  });
}).add('Disabled', function () {
  return _react2.default.createElement(_2.default, {
    name: "disabled",
    label: "Textarea Label",
    disabled: true,
    placeholder: "Placeholder Text"
  });
}).add('Required', function () {
  return _react2.default.createElement(_2.default, {
    "aria-describedby": "required-1",
    name: "required-textarea",
    assistiveText: {
      label: 'Textarea Label'
    },
    required: true,
    placeholder: "Placeholder Text"
  });
}).add('Error', function () {
  return _react2.default.createElement(_2.default, {
    "aria-describedby": "error-1",
    name: "required-textarea-error",
    label: "Textarea Label",
    required: true,
    errorText: "Error Message",
    placeholder: "Placeholder Text"
  });
});