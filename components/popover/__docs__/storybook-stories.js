"use strict";

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _react3 = require("@storybook/react");

var _addonActions = require("@storybook/addon-actions");

var _iconSettings = require("../../icon-settings");

var _iconSettings2 = _interopRequireDefault(_iconSettings);

var _constants = require("../../../utilities/constants");

var _header = require("../__examples__/header");

var _header2 = _interopRequireDefault(_header);

var _error = require("../__examples__/error");

var _error2 = _interopRequireDefault(_error);

var _warning = require("../__examples__/warning");

var _warning2 = _interopRequireDefault(_warning);

var _alternativeHeader = require("../__examples__/alternative-header");

var _alternativeHeader2 = _interopRequireDefault(_alternativeHeader);

var _controlledWithFooter = require("../__examples__/controlled-with-footer");

var _controlledWithFooter2 = _interopRequireDefault(_controlledWithFooter);

var _popover = require("../../popover");

var _popover2 = _interopRequireDefault(_popover);

var _button = require("../../button");

var _button2 = _interopRequireDefault(_button);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var getPopover = function getPopover(props) {
  return _react2.default.createElement("div", null, _react2.default.createElement(_popover2.default, props, _react2.default.createElement(_button2.default, {
    label: "Trigger Popover"
  })));
};

var getPopoverNubbins = function getPopoverNubbins(props) {
  /* eslint-disable react/prop-types */
  var children = [];
  var align = ['top', 'top right', 'top left', 'right', 'right top', 'right bottom', 'bottom', 'bottom left', 'bottom right', 'left', 'left top', 'left bottom'];
  align.forEach(function (value) {
    children.push(_react2.default.createElement("div", {
      key: value,
      style: {
        margin: '150px auto'
      }
    }, _react2.default.createElement(_popover2.default, _extends({
      align: value,
      assistiveText: {
        closeButton: 'This is a popover.'
      },
      body: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      hasStaticAlignment: true,
      heading: "My Popover",
      id: value,
      isOpen: true,
      position: "overflowBoundaryElement"
    }, props), props.trigger)));
  });
  return _react2.default.createElement("div", {
    key: "container"
  }, children);
};

var bodyContent = 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.';
var popoverBackgroundColor = 'rgb(255, 80, 121)';
var containerBackgroundColor = 'rgb(255, 127, 80)';
(0, _react3.storiesOf)(_constants.POPOVER, module).addDecorator(function (getStory) {
  return _react2.default.createElement("div", {
    className: "slds-p-around_medium slds-m-horizontal_x-large",
    style: {
      margin: '300px auto',
      width: '500px'
    }
  }, _react2.default.createElement(_iconSettings2.default, {
    iconPath: "/assets/icons"
  }, getStory()));
}).add('Header', function () {
  return _react2.default.createElement(_header2.default, null);
}).add('Controlled w/ Footer', function () {
  return _react2.default.createElement(_controlledWithFooter2.default, {
    log: _addonActions.action
  });
}).add('AlternativeHeader', function () {
  return _react2.default.createElement(_alternativeHeader2.default, null);
}).add('Alignment (Button)', function () {
  return getPopoverNubbins({
    trigger: _react2.default.createElement(_button2.default, {
      label: "Trigger Popover",
      tabIndex: "0"
    })
  });
}).add('Alignment (ButtonIcon)', function () {
  return getPopoverNubbins({
    body: bodyContent,
    hasStaticAlignment: true,
    heading: 'My Popover',
    id: 'myPopoverId',
    isOpen: true,
    trigger: _react2.default.createElement(_button2.default, {
      assistiveText: {
        icon: 'Case Icon'
      },
      iconCategory: "utility",
      iconName: "filter",
      iconSize: "small",
      iconVariant: "border",
      variant: "icon"
    })
  });
}).add('Styling (dev-only)', function () {
  return getPopover({
    body: bodyContent,
    heading: 'My Popover',
    id: 'myPopoverId',
    isOpen: true,
    className: 'sample-classname',
    assistiveText: {
      closeButton: 'Shut it now!'
    },
    containerClassName: 'sample-container-classname',
    containerStyle: {
      background: containerBackgroundColor
    },
    style: {
      background: popoverBackgroundColor
    }
  });
}).add('Error', function () {
  return _react2.default.createElement(_error2.default, null);
}).add('Error - Open', function () {
  return _react2.default.createElement(_error2.default, {
    isOpen: true
  });
}).add('Warning', function () {
  return _react2.default.createElement(_warning2.default, null);
}).add('Warning  - Open', function () {
  return _react2.default.createElement(_warning2.default, {
    isOpen: true
  });
});