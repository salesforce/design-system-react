"use strict";

var _react = _interopRequireDefault(require("react"));

var _react2 = require("@storybook/react");

var _addonActions = require("@storybook/addon-actions");

var _iconSettings = _interopRequireDefault(require("../../icon-settings"));

var _constants = require("../../../utilities/constants");

var _customTarget = _interopRequireDefault(require("../__examples__/custom-target"));

var _header = _interopRequireDefault(require("../__examples__/header"));

var _error = _interopRequireDefault(require("../__examples__/error"));

var _walkthrough = _interopRequireDefault(require("../__examples__/walkthrough"));

var _editDialog = _interopRequireDefault(require("../__examples__/edit-dialog"));

var _walkthroughAction = _interopRequireDefault(require("../__examples__/walkthrough-action"));

var _warning = _interopRequireDefault(require("../__examples__/warning"));

var _alternativeHeader = _interopRequireDefault(require("../__examples__/alternative-header"));

var _controlledWithFooter = _interopRequireDefault(require("../__examples__/controlled-with-footer"));

var _popover = _interopRequireDefault(require("../../popover"));

var _button = _interopRequireDefault(require("../../button"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var getPopover = function getPopover(props) {
  return _react.default.createElement("div", null, _react.default.createElement(_popover.default, props, _react.default.createElement(_button.default, {
    label: "Trigger Popover"
  })));
};

var getPopoverNubbins = function getPopoverNubbins(props) {
  /* eslint-disable react/prop-types */
  var children = [];
  var align = ['top', 'top right', 'top left', 'right', 'right top', 'right bottom', 'bottom', 'bottom left', 'bottom right', 'left', 'left top', 'left bottom'];
  align.forEach(function (value) {
    children.push(_react.default.createElement("div", {
      key: value,
      style: {
        margin: '150px auto'
      }
    }, _react.default.createElement(_popover.default, _extends({
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
  return _react.default.createElement("div", {
    key: "container"
  }, children);
};

var bodyContent = 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.';
var popoverBackgroundColor = 'rgb(255, 80, 121)';
var containerBackgroundColor = 'rgb(255, 127, 80)';
(0, _react2.storiesOf)(_constants.POPOVER, module).addDecorator(function (getStory) {
  return _react.default.createElement("div", {
    className: "slds-p-around_medium slds-m-horizontal_x-large",
    style: {
      margin: '300px auto',
      width: '500px'
    }
  }, _react.default.createElement(_iconSettings.default, {
    iconPath: "/assets/icons"
  }, getStory()));
}).add('Header', function () {
  return _react.default.createElement(_header.default, null);
}).add('Controlled w/ Footer', function () {
  return _react.default.createElement(_controlledWithFooter.default, {
    log: _addonActions.action
  });
}).add('AlternativeHeader', function () {
  return _react.default.createElement(_alternativeHeader.default, null);
}).add('Alignment (Button)', function () {
  return getPopoverNubbins({
    trigger: _react.default.createElement(_button.default, {
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
    trigger: _react.default.createElement(_button.default, {
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
}).add('Custom Target', function () {
  return _react.default.createElement(_customTarget.default, null);
}).add('Custom Target - Open', function () {
  return _react.default.createElement(_customTarget.default, {
    isOpen: true
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
  return _react.default.createElement(_error.default, null);
}).add('Error - Open', function () {
  return _react.default.createElement(_error.default, {
    isOpen: true
  });
}).add('Warning', function () {
  return _react.default.createElement(_warning.default, null);
}).add('Warning  - Open', function () {
  return _react.default.createElement(_warning.default, {
    isOpen: true
  });
}).add('Walkthrough', function () {
  return _react.default.createElement(_walkthrough.default, {
    action: _addonActions.action
  });
}).add('Walkthrough - Open', function () {
  return _react.default.createElement(_walkthrough.default, {
    action: _addonActions.action,
    isOpen: true
  });
}).add('Walkthrough Action', function () {
  return _react.default.createElement(_walkthroughAction.default, null);
}).add('Walkthrough Action - Open', function () {
  return _react.default.createElement(_walkthroughAction.default, {
    isOpen: true
  });
}).add('Edit Dialog', function () {
  return _react.default.createElement(_editDialog.default, null);
}).add('Edit Dialog  - Open', function () {
  return _react.default.createElement(_editDialog.default, {
    isOpen: true
  });
});