"use strict";

var _react = _interopRequireDefault(require("react"));

var _react2 = require("@storybook/react");

var _iconSettings = _interopRequireDefault(require("../../icon-settings"));

var _constants = require("../../../utilities/constants");

var _spinner = _interopRequireDefault(require("../../spinner"));

var _default = _interopRequireDefault(require("../__examples__/default"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable indent */
var getSpinner = function getSpinner(props) {
  return _react.default.createElement(_spinner.default, props);
};

var inverseContainer = {
  backgroundColor: '#4bca81',
  position: 'absolute',
  width: '100%',
  height: '100%'
};
(0, _react2.storiesOf)(_constants.SPINNER, module).addDecorator(function (getStory) {
  return _react.default.createElement("div", {
    className: "slds-p-around_medium"
  }, _react.default.createElement(_iconSettings.default, {
    iconPath: "/assets/icons"
  }, getStory()));
}).add('Small', function () {
  return getSpinner({
    size: 'small',
    variant: 'base',
    assistiveText: {
      label: 'Small spinner'
    }
  });
}).add('Medium', function () {
  return getSpinner({
    size: 'medium',
    variant: 'base'
  });
}).add('Large', function () {
  return getSpinner({
    size: 'large',
    variant: 'base'
  });
}).add('Brand Small', function () {
  return getSpinner({
    size: 'small',
    variant: 'brand'
  });
}).add('Brand Medium', function () {
  return getSpinner({
    size: 'medium',
    variant: 'brand'
  });
}).add('Brand Large', function () {
  return getSpinner({
    size: 'large',
    variant: 'brand',
    containerClassName: 'my-custom-classname'
  });
}).add('Large with 300ms delay', function () {
  return getSpinner({
    size: 'large',
    variant: 'base',
    isDelayed: true
  });
}).addDecorator(function (getStory) {
  return _react.default.createElement("div", {
    className: "slds-p-around_medium",
    style: inverseContainer
  }, getStory());
}).add('Inverse Small', function () {
  return getSpinner({
    size: 'small',
    variant: 'inverse'
  });
}).add('Inverse Medium', function () {
  return getSpinner({
    size: 'medium',
    variant: 'inverse'
  });
}).add('Inverse Large', function () {
  return getSpinner({
    size: 'large',
    variant: 'inverse'
  });
}).add('Docs site Default', function () {
  return _react.default.createElement(_default.default, null);
});