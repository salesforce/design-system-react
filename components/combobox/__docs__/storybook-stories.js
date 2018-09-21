"use strict";

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _react3 = require("@storybook/react");

var _constants = require("../../../utilities/constants");

var _base = require("../__examples__/base");

var _base2 = _interopRequireDefault(_base);

var _baseMenuSubheader = require("../__examples__/base-menu-subheader");

var _baseMenuSubheader2 = _interopRequireDefault(_baseMenuSubheader);

var _baseMenuSeparator = require("../__examples__/base-menu-separator");

var _baseMenuSeparator2 = _interopRequireDefault(_baseMenuSeparator);

var _baseInheritMenuWidth = require("../__examples__/base-inherit-menu-width.jsx");

var _baseInheritMenuWidth2 = _interopRequireDefault(_baseInheritMenuWidth);

var _requiredInputErrorState = require("../__examples__/required-input-error-state");

var _requiredInputErrorState2 = _interopRequireDefault(_requiredInputErrorState);

var _basePredefinedOptionsOnly = require("../__examples__/base-predefined-options-only");

var _basePredefinedOptionsOnly2 = _interopRequireDefault(_basePredefinedOptionsOnly);

var _inlineSingle = require("../__examples__/inline-single");

var _inlineSingle2 = _interopRequireDefault(_inlineSingle);

var _inlineMultiple = require("../__examples__/inline-multiple");

var _inlineMultiple2 = _interopRequireDefault(_inlineMultiple);

var _baseCustomMenuItem = require("../__examples__/base-custom-menu-item");

var _baseCustomMenuItem2 = _interopRequireDefault(_baseCustomMenuItem);

var _readonlySingle = require("../__examples__/readonly-single");

var _readonlySingle2 = _interopRequireDefault(_readonlySingle);

var _readonlySingleSelectionCustomMenuItem = require("../__examples__/readonly-single-selection-custom-menu-item");

var _readonlySingleSelectionCustomMenuItem2 = _interopRequireDefault(_readonlySingleSelectionCustomMenuItem);

var _readonlyMultiple = require("../__examples__/readonly-multiple");

var _readonlyMultiple2 = _interopRequireDefault(_readonlyMultiple);

var _baseOpen = require("../__examples__/snapshot/base-open");

var _baseOpen2 = _interopRequireDefault(_baseOpen);

var _baseOpenMenuSubHeader = require("../__examples__/snapshot/base-open-menu-sub-header");

var _baseOpenMenuSubHeader2 = _interopRequireDefault(_baseOpenMenuSubHeader);

var _baseOpenMenuInheritWidthOf = require("../__examples__/snapshot/base-open-menu-inheritWidthOf");

var _baseOpenMenuInheritWidthOf2 = _interopRequireDefault(_baseOpenMenuInheritWidthOf);

var _baseCustomMenuItemOpen = require("../__examples__/snapshot/base-custom-menu-item-open");

var _baseCustomMenuItemOpen2 = _interopRequireDefault(_baseCustomMenuItemOpen);

var _baseSelected = require("../__examples__/snapshot/base-selected");

var _baseSelected2 = _interopRequireDefault(_baseSelected);

var _inlineSingleSelection = require("../__examples__/snapshot/inline-single-selection");

var _inlineSingleSelection2 = _interopRequireDefault(_inlineSingleSelection);

var _inlineSingleSelectionSelected = require("../__examples__/snapshot/inline-single-selection-selected");

var _inlineSingleSelectionSelected2 = _interopRequireDefault(_inlineSingleSelectionSelected);

var _inlineMultipleSelection = require("../__examples__/snapshot/inline-multiple-selection");

var _inlineMultipleSelection2 = _interopRequireDefault(_inlineMultipleSelection);

var _inlineMultipleSelectionSelected = require("../__examples__/snapshot/inline-multiple-selection-selected");

var _inlineMultipleSelectionSelected2 = _interopRequireDefault(_inlineMultipleSelectionSelected);

var _readonlySingleSelection = require("../__examples__/snapshot/readonly-single-selection");

var _readonlySingleSelection2 = _interopRequireDefault(_readonlySingleSelection);

var _readonlySingleSelectionSelected = require("../__examples__/snapshot/readonly-single-selection-selected");

var _readonlySingleSelectionSelected2 = _interopRequireDefault(_readonlySingleSelectionSelected);

var _readonlySingleSelectionSelectedOpen = require("../__examples__/snapshot/readonly-single-selection-selected-open");

var _readonlySingleSelectionSelectedOpen2 = _interopRequireDefault(_readonlySingleSelectionSelectedOpen);

var _readonlyMultipleSelection = require("../__examples__/snapshot/readonly-multiple-selection");

var _readonlyMultipleSelection2 = _interopRequireDefault(_readonlyMultipleSelection);

var _readonlyMultipleSelectionSingleItemSelected = require("../__examples__/snapshot/readonly-multiple-selection-single-item-selected");

var _readonlyMultipleSelectionSingleItemSelected2 = _interopRequireDefault(_readonlyMultipleSelectionSingleItemSelected);

var _readonlyMultipleSelectionMultipleItemsSelected = require("../__examples__/snapshot/readonly-multiple-selection-multiple-items-selected");

var _readonlyMultipleSelectionMultipleItemsSelected2 = _interopRequireDefault(_readonlyMultipleSelectionMultipleItemsSelected);

var _readonlySingleSelectionCustomMenuItem3 = require("../__examples__/snapshot/readonly-single-selection-custom-menu-item");

var _readonlySingleSelectionCustomMenuItem4 = _interopRequireDefault(_readonlySingleSelectionCustomMenuItem3);

var _baseLabelRequired = require("../__examples__/snapshot/base-label-required");

var _baseLabelRequired2 = _interopRequireDefault(_baseLabelRequired);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _react3.storiesOf)(_constants.COMBOBOX, module).addDecorator(function (getStory) {
  return _react2.default.createElement("div", {
    className: "slds-p-around--medium"
  }, getStory());
}).add('Base', function () {
  return _react2.default.createElement(_base2.default, {
    action: _react3.action
  });
}).add('Base Pre-defined Options Only', function () {
  return _react2.default.createElement(_basePredefinedOptionsOnly2.default, {
    action: _react3.action
  });
}).add('Inline Single Selection', function () {
  return _react2.default.createElement(_inlineSingle2.default, {
    action: _react3.action
  });
}).add('Inline Multiple Selection', function () {
  return _react2.default.createElement(_inlineMultiple2.default, {
    action: _react3.action
  });
}).add('Base Custom Menu Item', function () {
  return _react2.default.createElement(_baseCustomMenuItem2.default, {
    action: _react3.action
  });
}).add('Base Menu Sub Headers', function () {
  return _react2.default.createElement(_baseMenuSubheader2.default, {
    action: _react3.action
  });
}).add('Base Menu Separator', function () {
  return _react2.default.createElement(_baseMenuSeparator2.default, {
    action: _react3.action
  });
}).add('Base Inherit Menu Width', function () {
  return _react2.default.createElement(_baseInheritMenuWidth2.default, {
    action: _react3.action
  });
}).add('Readonly Single Selection', function () {
  return _react2.default.createElement(_readonlySingle2.default, {
    action: _react3.action
  });
}).add('Readonly Multiple Selection', function () {
  return _react2.default.createElement(_readonlyMultiple2.default, {
    action: _react3.action
  });
}).add('Readonly Single Selection Custom Menu Item', function () {
  return _react2.default.createElement(_readonlySingleSelectionCustomMenuItem2.default, {
    action: _react3.action
  });
}).add('Required Input in Error State', function () {
  return _react2.default.createElement(_requiredInputErrorState2.default, {
    action: _react3.action
  });
}).add('Snapshot Base Open', function () {
  return _react2.default.createElement(_baseOpen2.default, {
    action: _react3.action
  });
}).add('Snapshot Base Custom Menu Item Open', function () {
  return _react2.default.createElement(_baseCustomMenuItemOpen2.default, {
    action: _react3.action
  });
}).add('Snapshot Base Selected', function () {
  return _react2.default.createElement(_baseSelected2.default, {
    action: _react3.action
  });
}).add('Snapshot Base Label Required', function () {
  return _react2.default.createElement(_baseLabelRequired2.default, {
    action: _react3.action
  });
}).add('Snapshot Base Open Menu Sub Header Separator', function () {
  return _react2.default.createElement(_baseOpenMenuSubHeader2.default, {
    action: _react3.action
  });
}).add('Snapshot Base Open Menu inheritWidthOf prop', function () {
  return _react2.default.createElement(_baseOpenMenuInheritWidthOf2.default, {
    action: _react3.action
  });
}).add('Snapshot Inline Single Selection', function () {
  return _react2.default.createElement(_inlineSingleSelection2.default, {
    action: _react3.action
  });
}).add('Snapshot Inline Single Selection Selected', function () {
  return _react2.default.createElement(_inlineSingleSelectionSelected2.default, {
    action: _react3.action
  });
}).add('Snapshot Inline Multiple Selection', function () {
  return _react2.default.createElement(_inlineMultipleSelection2.default, {
    action: _react3.action
  });
}).add('Snapshot Inline Multiple Selection Selected', function () {
  return _react2.default.createElement(_inlineMultipleSelectionSelected2.default, {
    action: _react3.action
  });
}).add('Snapshot Readonly Single Selection', function () {
  return _react2.default.createElement(_readonlySingleSelection2.default, {
    action: _react3.action
  });
}).add('Snapshot Readonly Single Selection Selected', function () {
  return _react2.default.createElement(_readonlySingleSelectionSelected2.default, {
    action: _react3.action
  });
}).add('Snapshot Readonly Single Selection Selected Open', function () {
  return _react2.default.createElement(_readonlySingleSelectionSelectedOpen2.default, {
    action: _react3.action
  });
}).add('Snapshot Readonly Multiple Selection', function () {
  return _react2.default.createElement(_readonlyMultipleSelection2.default, {
    action: _react3.action
  });
}).add('Snapshot Readonly Multiple Selection Single Item Selected', function () {
  return _react2.default.createElement(_readonlyMultipleSelectionSingleItemSelected2.default, {
    action: _react3.action
  });
}).add('Snapshot Readonly Multiple Selection Multiple Items Selected', function () {
  return _react2.default.createElement(_readonlyMultipleSelectionMultipleItemsSelected2.default, {
    action: _react3.action
  });
}).add('Snapshot Readonly Single Selection Custom Menu Item', function () {
  return _react2.default.createElement(_readonlySingleSelectionCustomMenuItem4.default, {
    action: _react3.action
  });
});