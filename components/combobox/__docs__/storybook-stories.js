"use strict";

var _react = _interopRequireDefault(require("react"));

var _react2 = require("@storybook/react");

var _addonActions = require("@storybook/addon-actions");

var _constants = require("../../../utilities/constants");

var _base = _interopRequireDefault(require("../__examples__/base"));

var _baseInlineHelpTooltip = _interopRequireDefault(require("../__examples__/base-inline-help-tooltip"));

var _baseMenuSubheader = _interopRequireDefault(require("../__examples__/base-menu-subheader"));

var _baseMenuSeparator = _interopRequireDefault(require("../__examples__/base-menu-separator"));

var _baseMenuItemDisabled = _interopRequireDefault(require("../__examples__/base-menu-item-disabled"));

var _baseMenuItemDisabledTooltipOpen = _interopRequireDefault(require("../__examples__/base-menu-item-disabled-tooltip-open"));

var _baseMenuItemDisabledTooltip = _interopRequireDefault(require("../__examples__/base-menu-item-disabled-tooltip"));

var _baseInheritMenuWidth = _interopRequireDefault(require("../__examples__/base-inherit-menu-width.jsx"));

var _baseInheritMenuWidthRTL = _interopRequireDefault(require("../__examples__/base-inherit-menu-width-RTL"));

var _dialog = _interopRequireDefault(require("../__examples__/dialog.jsx"));

var _requiredInputErrorState = _interopRequireDefault(require("../__examples__/required-input-error-state"));

var _basePredefinedOptionsOnly = _interopRequireDefault(require("../__examples__/base-predefined-options-only"));

var _inlineSingle = _interopRequireDefault(require("../__examples__/inline-single"));

var _inlineMultiple = _interopRequireDefault(require("../__examples__/inline-multiple"));

var _baseCustomMenuItem = _interopRequireDefault(require("../__examples__/base-custom-menu-item"));

var _baseCustomMenuItemDisabled = _interopRequireDefault(require("../__examples__/base-custom-menu-item-disabled"));

var _readonlySingle = _interopRequireDefault(require("../__examples__/readonly-single"));

var _readonlySingleRTL = _interopRequireDefault(require("../__examples__/readonly-single-RTL"));

var _readonlySingleDisabled = _interopRequireDefault(require("../__examples__/readonly-single-disabled"));

var _readonlyMenuItemDisabled = _interopRequireDefault(require("../__examples__/readonly-menu-item-disabled"));

var _readonlySingleSelectionCustomMenuItem = _interopRequireDefault(require("../__examples__/readonly-single-selection-custom-menu-item"));

var _readonlyMultiple = _interopRequireDefault(require("../__examples__/readonly-multiple"));

var _inputProp = _interopRequireDefault(require("../__examples__/input-prop"));

var _baseOpen = _interopRequireDefault(require("../__examples__/snapshot/base-open"));

var _baseOpenMenuSubHeader = _interopRequireDefault(require("../__examples__/snapshot/base-open-menu-sub-header"));

var _baseOpenMenuInheritWidthOf = _interopRequireDefault(require("../__examples__/snapshot/base-open-menu-inheritWidthOf"));

var _baseCustomMenuItemOpen = _interopRequireDefault(require("../__examples__/snapshot/base-custom-menu-item-open"));

var _baseSelected = _interopRequireDefault(require("../__examples__/snapshot/base-selected"));

var _dialogOpen = _interopRequireDefault(require("../__examples__/snapshot/dialog-open"));

var _inlineSingleSelection = _interopRequireDefault(require("../__examples__/snapshot/inline-single-selection"));

var _inlineSingleSelectionSelected = _interopRequireDefault(require("../__examples__/snapshot/inline-single-selection-selected"));

var _inlineMultipleSelection = _interopRequireDefault(require("../__examples__/snapshot/inline-multiple-selection"));

var _inlineMultipleSelectionSelected = _interopRequireDefault(require("../__examples__/snapshot/inline-multiple-selection-selected"));

var _readonlySingleSelection = _interopRequireDefault(require("../__examples__/snapshot/readonly-single-selection"));

var _readonlySingleSelectionDisabled = _interopRequireDefault(require("../__examples__/snapshot/readonly-single-selection-disabled"));

var _readonlySingleSelectionSelected = _interopRequireDefault(require("../__examples__/snapshot/readonly-single-selection-selected"));

var _readonlySingleSelectionSelectedOpen = _interopRequireDefault(require("../__examples__/snapshot/readonly-single-selection-selected-open"));

var _readonlyMultipleSelection = _interopRequireDefault(require("../__examples__/snapshot/readonly-multiple-selection"));

var _readonlyMultipleSelectionSingleItemSelected = _interopRequireDefault(require("../__examples__/snapshot/readonly-multiple-selection-single-item-selected"));

var _readonlyMultipleSelectionMultipleItemsSelected = _interopRequireDefault(require("../__examples__/snapshot/readonly-multiple-selection-multiple-items-selected"));

var _readonlySingleSelectionCustomMenuItem2 = _interopRequireDefault(require("../__examples__/snapshot/readonly-single-selection-custom-menu-item"));

var _baseLabelRequired = _interopRequireDefault(require("../__examples__/snapshot/base-label-required"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _react2.storiesOf)(_constants.COMBOBOX, module).addDecorator(function (getStory) {
  return _react.default.createElement("div", {
    className: "slds-p-around_medium"
  }, getStory());
}).add('Base', function () {
  return _react.default.createElement(_base.default, {
    action: _addonActions.action
  });
}).add('Base Pre-defined Options Only', function () {
  return _react.default.createElement(_basePredefinedOptionsOnly.default, {
    action: _addonActions.action
  });
}).add('Base Inline Help', function () {
  return _react.default.createElement("section", null, _react.default.createElement("h1", {
    className: "slds-text-title_caps slds-p-vertical_medium"
  }, "Field Level Help Tooltip"), _react.default.createElement(_baseInlineHelpTooltip.default, {
    action: _addonActions.action
  }));
}).add('Base Menu Item Disabled', function () {
  return _react.default.createElement(_baseMenuItemDisabled.default, {
    action: _addonActions.action
  });
}).add('Base Menu Item Disabled With Tooltip', function () {
  return _react.default.createElement(_baseMenuItemDisabledTooltip.default, {
    action: _addonActions.action
  });
}).add('Base Menu Item Disabled With Tooltip Open', function () {
  return _react.default.createElement(_baseMenuItemDisabledTooltipOpen.default, {
    action: _addonActions.action
  });
}).add('Inline Single Selection', function () {
  return _react.default.createElement(_inlineSingle.default, {
    action: _addonActions.action
  });
}).add('Inline Multiple Selection', function () {
  return _react.default.createElement(_inlineMultiple.default, {
    action: _addonActions.action
  });
}).add('Base Custom Menu Item', function () {
  return _react.default.createElement(_baseCustomMenuItem.default, {
    action: _addonActions.action
  });
}).add('Base Custom Menu Item Disabled', function () {
  return _react.default.createElement(_baseCustomMenuItemDisabled.default, {
    action: _addonActions.action
  });
}).add('Base Menu Sub Headers', function () {
  return _react.default.createElement(_baseMenuSubheader.default, {
    action: _addonActions.action
  });
}).add('Base Menu Separator', function () {
  return _react.default.createElement(_baseMenuSeparator.default, {
    action: _addonActions.action
  });
}).add('Base Inherit Menu Width', function () {
  return _react.default.createElement(_baseInheritMenuWidth.default, {
    action: _addonActions.action
  });
}).add('Base Inherit Menu Width - Right to Left (RTL)', function () {
  return _react.default.createElement(_baseInheritMenuWidthRTL.default, {
    action: _addonActions.action
  });
}).add('Dialog', function () {
  return _react.default.createElement(_dialog.default, {
    action: _addonActions.action
  });
}).add('Readonly Single Selection', function () {
  return _react.default.createElement(_readonlySingle.default, {
    action: _addonActions.action
  });
}).add('Readonly Single Selection - Right to Left (RTL)', function () {
  return _react.default.createElement(_readonlySingleRTL.default, {
    action: _addonActions.action
  });
}).add('Readonly Single Selection Disabled', function () {
  return _react.default.createElement(_readonlySingleDisabled.default, {
    action: _addonActions.action
  });
}).add('Readonly Single Menu Item Disabled', function () {
  return _react.default.createElement(_readonlyMenuItemDisabled.default, {
    action: _addonActions.action
  });
}).add('Readonly Multiple Selection', function () {
  return _react.default.createElement(_readonlyMultiple.default, {
    action: _addonActions.action
  });
}).add('Readonly Single Selection Custom Menu Item', function () {
  return _react.default.createElement(_readonlySingleSelectionCustomMenuItem.default, {
    action: _addonActions.action
  });
}).add('Required Input in Error State', function () {
  return _react.default.createElement(_requiredInputErrorState.default, {
    action: _addonActions.action
  });
}).add('Input Component as a Prop', function () {
  return _react.default.createElement(_inputProp.default, {
    action: _addonActions.action
  });
}).add('Snapshot Base Open', function () {
  return _react.default.createElement(_baseOpen.default, {
    action: _addonActions.action
  });
}).add('Snapshot Base Custom Menu Item Open', function () {
  return _react.default.createElement(_baseCustomMenuItemOpen.default, {
    action: _addonActions.action
  });
}).add('Snapshot Base Selected', function () {
  return _react.default.createElement(_baseSelected.default, {
    action: _addonActions.action
  });
}).add('Snapshot Base Label Required', function () {
  return _react.default.createElement(_baseLabelRequired.default, {
    action: _addonActions.action
  });
}).add('Snapshot Base Open Menu Sub Header Separator', function () {
  return _react.default.createElement(_baseOpenMenuSubHeader.default, {
    action: _addonActions.action
  });
}).add('Snapshot Base Open Menu inheritWidthOf prop', function () {
  return _react.default.createElement(_baseOpenMenuInheritWidthOf.default, {
    action: _addonActions.action
  });
}).add('Snapshot Dialog Open', function () {
  return _react.default.createElement(_dialogOpen.default, {
    action: _addonActions.action
  });
}).add('Snapshot Inline Single Selection', function () {
  return _react.default.createElement(_inlineSingleSelection.default, {
    action: _addonActions.action
  });
}).add('Snapshot Inline Single Selection Selected', function () {
  return _react.default.createElement(_inlineSingleSelectionSelected.default, {
    action: _addonActions.action
  });
}).add('Snapshot Inline Multiple Selection', function () {
  return _react.default.createElement(_inlineMultipleSelection.default, {
    action: _addonActions.action
  });
}).add('Snapshot Inline Multiple Selection Selected', function () {
  return _react.default.createElement(_inlineMultipleSelectionSelected.default, {
    action: _addonActions.action
  });
}).add('Snapshot Readonly Single Selection', function () {
  return _react.default.createElement(_readonlySingleSelection.default, {
    action: _addonActions.action
  });
}).add('Snapshot Readonly Single Selection Disabled', function () {
  return _react.default.createElement(_readonlySingleSelectionDisabled.default, {
    action: _addonActions.action
  });
}).add('Snapshot Readonly Single Selection Selected', function () {
  return _react.default.createElement(_readonlySingleSelectionSelected.default, {
    action: _addonActions.action
  });
}).add('Snapshot Readonly Single Selection Selected Open', function () {
  return _react.default.createElement(_readonlySingleSelectionSelectedOpen.default, {
    action: _addonActions.action
  });
}).add('Snapshot Readonly Multiple Selection', function () {
  return _react.default.createElement(_readonlyMultipleSelection.default, {
    action: _addonActions.action
  });
}).add('Snapshot Readonly Multiple Selection Single Item Selected', function () {
  return _react.default.createElement(_readonlyMultipleSelectionSingleItemSelected.default, {
    action: _addonActions.action
  });
}).add('Snapshot Readonly Multiple Selection Multiple Items Selected', function () {
  return _react.default.createElement(_readonlyMultipleSelectionMultipleItemsSelected.default, {
    action: _addonActions.action
  });
}).add('Snapshot Readonly Single Selection Custom Menu Item', function () {
  return _react.default.createElement(_readonlySingleSelectionCustomMenuItem2.default, {
    action: _addonActions.action
  });
});