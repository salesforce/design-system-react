"use strict";

var _react = _interopRequireDefault(require("react"));

var _react2 = require("@storybook/react");

var _iconSettings = _interopRequireDefault(require("../../icon-settings"));

var _constants = require("../../../utilities/constants");

var _tooltip = _interopRequireDefault(require("../../tooltip"));

var _base = _interopRequireDefault(require("../__examples__/base"));

var _buttonGroup = _interopRequireDefault(require("../__examples__/button-group"));

var _button = _interopRequireDefault(require("../__examples__/button"));

var _learnMore = _interopRequireDefault(require("../__examples__/learn-more"));

var _icon = _interopRequireDefault(require("../../icon"));

var _button2 = _interopRequireDefault(require("../../button"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var getPopoverTooltip = function getPopoverTooltip(props) {
  return _react.default.createElement(_tooltip.default, props, _react.default.createElement(_button2.default, {
    label: "Trigger Tooltip"
  }));
};

var getPopoverTooltipAlign = function getPopoverTooltipAlign(props) {
  /* eslint-disable react/prop-types */
  var children = [];
  var align = ['top', 'top left', 'top right', 'right', 'right top', 'right bottom', 'bottom', 'bottom left', 'bottom right', 'left', 'left top', 'left bottom'];
  align.forEach(function (value) {
    children.push(_react.default.createElement("div", {
      key: value,
      style: {
        margin: '100px auto'
      }
    }, _react.default.createElement(_tooltip.default, _extends({}, props, {
      align: value
    }), props.trigger)));
  });
  return _react.default.createElement("div", {
    key: "container"
  }, children);
};

var content = 'Sit nulla est ex deserunt exercitation anim occaecat. Nostrud ullamco deserunt aute id consequat veniam incididunt duis in sint irure nisi.';
(0, _react2.storiesOf)(_constants.POPOVER_TOOLTIP, module).addDecorator(function (getStory) {
  return _react.default.createElement("div", {
    className: "slds-p-around_medium slds-m-horizontal_x-large",
    style: {
      margin: '150px auto',
      width: '500px'
    }
  }, _react.default.createElement(_iconSettings.default, {
    iconPath: "/assets/icons"
  }, getStory()));
}).add('Base', function () {
  return _react.default.createElement(_base.default, null);
}).add('Learn More', function () {
  return _react.default.createElement(_learnMore.default, null);
}).add('Button Group', function () {
  return _react.default.createElement(_buttonGroup.default, null);
}).add('Button', function () {
  return _react.default.createElement(_button.default, null);
}).add('Open', function () {
  return getPopoverTooltip({
    align: 'bottom',
    isOpen: true,
    id: 'myPopoverId',
    dialogClassName: 'dialog-classname',
    content: content
  });
}).add('Alignment (Button)', function () {
  return getPopoverTooltipAlign({
    id: 'myPopoverId',
    isOpen: true,
    content: content,
    trigger: _react.default.createElement(_button2.default, {
      label: "Trigger Tooltip"
    })
  });
}).add('Alignment (span)', function () {
  return getPopoverTooltipAlign({
    id: 'myPopoverId',
    isOpen: true,
    content: content,
    trigger: _react.default.createElement("span", {
      tabIndex: "0",
      key: "trigger"
    }, "Trigger Tooltip")
  });
}).add('Alignment (icon)', function () {
  return getPopoverTooltipAlign({
    id: 'myPopoverId',
    isOpen: true,
    content: _react.default.createElement("span", null, content),
    // react/no-unescaped-entities
    trigger: _react.default.createElement(_icon.default, {
      assistiveText: {
        label: 'Case Icon'
      },
      category: "standard",
      name: "case",
      size: "small",
      tabIndex: "0"
    })
  });
});