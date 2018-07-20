"use strict";

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _react3 = require("@storybook/react");

var _iconSettings = require("../../icon-settings");

var _iconSettings2 = _interopRequireDefault(_iconSettings);

var _constants = require("../../../utilities/constants");

var _spinner = require("../../spinner");

var _spinner2 = _interopRequireDefault(_spinner);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable indent */
var getSpinner = function getSpinner(props) {
  return _react2.default.createElement(_spinner2.default, props);
};

var inverseContainer = {
  backgroundColor: '#4bca81',
  position: 'absolute',
  width: '100%',
  height: '100%'
};
(0, _react3.storiesOf)(_constants.SPINNER, module).addDecorator(function (getStory) {
  return _react2.default.createElement("div", {
    className: "slds-p-around--medium"
  }, _react2.default.createElement(_iconSettings2.default, {
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
}).addDecorator(function (getStory) {
  return _react2.default.createElement("div", {
    className: "slds-p-around--medium",
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
});