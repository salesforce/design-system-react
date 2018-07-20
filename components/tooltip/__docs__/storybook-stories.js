"use strict";

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _react3 = require("@storybook/react");

var _iconSettings = require("../../icon-settings");

var _iconSettings2 = _interopRequireDefault(_iconSettings);

var _constants = require("../../../utilities/constants");

var _popoverTooltip = require("../../popover-tooltip");

var _popoverTooltip2 = _interopRequireDefault(_popoverTooltip);

var _buttonGroup = require("../__examples__/button-group");

var _buttonGroup2 = _interopRequireDefault(_buttonGroup);

var _button = require("../__examples__/button");

var _button2 = _interopRequireDefault(_button);

var _learnMore = require("../__examples__/learn-more");

var _learnMore2 = _interopRequireDefault(_learnMore);

var _icon = require("../../icon");

var _icon2 = _interopRequireDefault(_icon);

var _button3 = require("../../button");

var _button4 = _interopRequireDefault(_button3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var getPopoverTooltip = function getPopoverTooltip(props) {
  return _react2.default.createElement(_popoverTooltip2.default, props, _react2.default.createElement(_button4.default, {
    label: "Trigger Tooltip"
  }));
};

var getPopoverTooltipAlign = function getPopoverTooltipAlign(props) {
  /* eslint-disable react/prop-types */
  var children = [];
  var align = ['top', 'top left', 'top right', 'right', 'right top', 'right bottom', 'bottom', 'bottom left', 'bottom right', 'left', 'left top', 'left bottom'];
  align.forEach(function (value) {
    children.push(_react2.default.createElement("div", {
      key: value,
      style: {
        margin: '100px auto'
      }
    }, _react2.default.createElement(_popoverTooltip2.default, _extends({}, props, {
      align: value
    }), props.trigger)));
  });
  return _react2.default.createElement("div", {
    key: "container"
  }, children);
};

(0, _react3.storiesOf)(_constants.POPOVER_TOOLTIP, module).addDecorator(function (getStory) {
  return _react2.default.createElement("div", {
    className: "slds-p-around--medium slds-m-horizontal--x-large",
    style: {
      margin: '150px auto',
      width: '500px'
    }
  }, _react2.default.createElement(_iconSettings2.default, {
    iconPath: "/assets/icons"
  }, getStory()));
}).add('Base', function () {
  return getPopoverTooltip({
    align: 'bottom',
    id: 'myPopoverId',
    content: 'wjeifowejfiwoefjweoifjweiofjweiofwjefiowejfiowejfiowefjweiofjweiofjweiofjiwoefjowiefjoiwejfiowejfoie'
  });
}).add('Learn More', function () {
  return _react2.default.createElement(_learnMore2.default, null);
}).add('Button Group', function () {
  return _react2.default.createElement(_buttonGroup2.default, null);
}).add('Button', function () {
  return _react2.default.createElement(_button2.default, null);
}).add('Open', function () {
  return getPopoverTooltip({
    align: 'bottom',
    isOpen: true,
    id: 'myPopoverId',
    content: 'wjeifowejfiwoefjweoifjweiofjweiofwjefiowejfiowejfiowefjweiofjweiofjweiofjiwoefjowiefjoiwejfiowejfoie'
  });
}).add('Alignment (Button)', function () {
  return getPopoverTooltipAlign({
    id: 'myPopoverId',
    isOpen: true,
    content: 'wjeifowejfiwoefjweoifjweiofjweiofwjefiowejfiowejfiowefjweiofjweiofjweiofjiwoefjowiefjoiwejfiowejfoie',
    trigger: _react2.default.createElement(_button4.default, {
      label: "Trigger Tooltip"
    })
  });
}).add('Alignment (span)', function () {
  return getPopoverTooltipAlign({
    id: 'myPopoverId',
    isOpen: true,
    content: 'wjeifowejfiwoefjweoifjweiofjweiofwjefiowejfiowejfiowefjweiofjweiofjweiofjiwoefjowiefjoiwejfiowejfoie',
    trigger: _react2.default.createElement("span", {
      tabIndex: "0",
      key: "trigger"
    }, "Trigger Tooltip")
  });
}).add('Alignment (icon)', function () {
  return getPopoverTooltipAlign({
    id: 'myPopoverId',
    isOpen: true,
    content: _react2.default.createElement("span", null, _react2.default.createElement(_icon2.default, {
      category: "utility",
      inverse: true,
      name: "close",
      size: "x-small"
    }), "wjeifowejfiwoefjweoifjweiofjweiofwjefiowejfiowejfiowefjweiofjweiofjweiofjiwoefjowiefjoiwejfiowejfoie"),
    // react/no-unescaped-entities
    trigger: _react2.default.createElement(_icon2.default, {
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