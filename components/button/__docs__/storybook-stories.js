"use strict";

var _react = _interopRequireDefault(require("react"));

var _react2 = require("@storybook/react");

var _addonActions = require("@storybook/addon-actions");

var _iconSettings = _interopRequireDefault(require("../../icon-settings"));

var _constants = require("../../../utilities/constants");

var _button = _interopRequireDefault(require("../../button"));

var _baseNeutral = _interopRequireDefault(require("../__examples__/base-neutral"));

var _brandDisabledDestructiveInverse = _interopRequireDefault(require("../__examples__/brand-disabled-destructive-inverse"));

var _buttonIcons = _interopRequireDefault(require("../__examples__/button-icons"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var getButton = function getButton(props) {
  return _react.default.createElement(_button.default, _extends({}, props, {
    onClick: (0, _addonActions.action)('click')
  }));
};

var getIconButton = function getIconButton(props) {
  return getButton(_objectSpread({
    variant: 'icon'
  }, props));
};

(0, _react2.storiesOf)(_constants.BUTTON, module).addDecorator(function (getStory) {
  return _react.default.createElement("div", {
    className: "slds-p-around_medium"
  }, _react.default.createElement(_iconSettings.default, {
    iconPath: "/assets/icons"
  }, getStory()));
}).add('Base', function () {
  return getButton({
    label: 'Base',
    variant: 'base'
  });
}).add('Neutral', function () {
  return getButton({
    label: 'Neutral'
  });
}).add('Neutral with id', function () {
  return getButton({
    label: 'Neutral',
    id: 'custom-id'
  });
}).add('Neutral Icon', function () {
  return getButton({
    label: 'Neutral Icon',
    iconCategory: 'utility',
    iconName: 'download',
    iconPosition: 'left',
    onFocus: (0, _addonActions.action)('focus'),
    onKeyDown: (0, _addonActions.action)('keyDown')
  });
}).add('Disabled', function () {
  return getButton({
    label: 'Disabled',
    disabled: true
  });
}).add('Icon large', function () {
  return getIconButton({
    assistiveText: {
      icon: 'Icon'
    },
    iconSize: 'large',
    iconCategory: 'utility',
    iconName: 'answer',
    title: 'chat'
  });
}).add('Icon with external path', function () {
  return getIconButton({
    assistiveText: {
      icon: 'Icon'
    },
    iconSize: 'large',
    iconPath: '/assets/icons/utility-sprite/svg/symbols.svg#announcement',
    title: 'announcement'
  });
}).addDecorator(function (getStory) {
  return _react.default.createElement("div", {
    className: "slds-p-around_medium slds-hint-parent",
    style: {
      backgroundColor: '#16325c'
    }
  }, getStory());
}).add('Icon Container Small', function () {
  return getIconButton({
    assistiveText: {
      icon: 'Icon container small'
    },
    iconCategory: 'utility',
    iconName: 'settings',
    iconSize: 'large',
    iconVariant: 'border',
    inverse: true
  });
}).add('Dropdown Icon inverse', function () {
  return getIconButton({
    'aria-haspopup': true,
    assistiveText: {
      icon: 'Dropdown Icon inverse'
    },
    iconCategory: 'utility',
    iconName: 'settings',
    iconVariant: 'more',
    inverse: true
  });
}).addDecorator(function (getStory) {
  return _react.default.createElement("div", {
    className: "slds-hint-parent",
    style: {
      backgroundColor: '#16325c'
    }
  }, getStory());
}).add('Small Icon Hint inverse', function () {
  return getIconButton({
    assistiveText: {
      icon: 'Small icon hint inverse'
    },
    iconCategory: 'utility',
    iconName: 'down',
    iconVariant: 'border',
    iconSize: 'small',
    hint: true,
    inverse: true
  });
}).add('Outline brand button', function () {
  return getButton({
    label: 'Outline brand button',
    variant: 'outline-brand'
  });
}).add('Doc site Base Neutral', function () {
  return _react.default.createElement(_baseNeutral.default, null);
}).add('Doc site Brand Disabled', function () {
  return _react.default.createElement(_brandDisabledDestructiveInverse.default, null);
}).add('Doc site Button Icons', function () {
  return _react.default.createElement(_buttonIcons.default, null);
});