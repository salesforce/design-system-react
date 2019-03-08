"use strict";

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _react3 = require("@storybook/react");

var _addonActions = require("@storybook/addon-actions");

var _iconSettings = require("../../icon-settings");

var _iconSettings2 = _interopRequireDefault(_iconSettings);

var _constants = require("../../../utilities/constants");

var _buttonStateful = require("../../button-stateful");

var _buttonStateful2 = _interopRequireDefault(_buttonStateful);

var _iconText = require("../__examples__/icon-text");

var _iconText2 = _interopRequireDefault(_iconText);

var _icon = require("../__examples__/icon");

var _icon2 = _interopRequireDefault(_icon);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var getButtonStateful = function getButtonStateful(props) {
  return _react2.default.createElement(_buttonStateful2.default, _extends({}, props, {
    onClick: (0, _addonActions.action)('click')
  }));
};

(0, _react3.storiesOf)(_constants.BUTTON_STATEFUL, module).addDecorator(function (getStory) {
  return _react2.default.createElement("div", {
    className: "slds-p-around_medium"
  }, _react2.default.createElement(_iconSettings2.default, {
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
  return _react2.default.createElement(_iconText2.default, null);
}).add('Doc site Icon Button', function () {
  return _react2.default.createElement(_icon2.default, null);
});