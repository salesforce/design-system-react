"use strict";

var _react = _interopRequireDefault(require("react"));

var _react2 = require("@storybook/react");

var _addonActions = require("@storybook/addon-actions");

var _iconSettings = _interopRequireDefault(require("../../icon-settings"));

var _constants = require("../../../utilities/constants");

var _buttonStateful = _interopRequireDefault(require("../../button-stateful"));

var _iconText = _interopRequireDefault(require("../__examples__/icon-text"));

var _icon = _interopRequireDefault(require("../__examples__/icon"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var getButtonStateful = function getButtonStateful(props) {
  return _react.default.createElement(_buttonStateful.default, _extends({}, props, {
    onClick: (0, _addonActions.action)('click')
  }));
};

(0, _react2.storiesOf)(_constants.BUTTON_STATEFUL, module).addDecorator(function (getStory) {
  return _react.default.createElement("div", {
    className: "slds-p-around_medium"
  }, _react.default.createElement(_iconSettings.default, {
    iconPath: "/assets/icons"
  }, getStory()));
}).add('Base', function () {
  return getButtonStateful();
}).add('Disabled', function () {
  return getButtonStateful({
    disabled: true
  });
}).add('Icon', function () {
  return getButtonStateful({
    assistiveText: {
      icon: 'Icon button'
    },
    variant: 'icon',
    label: 'Neutral Icon',
    iconName: 'check',
    onFocus: (0, _addonActions.action)('hover'),
    onMouseEnter: function onMouseEnter(e) {
      console.log('target is ', e.target);
    }
  });
}).add('Doc site Icon Text Button', function () {
  return _react.default.createElement(_iconText.default, null);
}).add('Doc site Icon Button', function () {
  return _react.default.createElement(_icon.default, null);
});