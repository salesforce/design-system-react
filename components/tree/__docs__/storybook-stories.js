"use strict";

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react2 = require("@storybook/react");

var _addonActions = require("@storybook/addon-actions");

var _normalizr = require("normalizr");

var _iconSettings = _interopRequireDefault(require("../../icon-settings"));

var _constants = require("../../../utilities/constants");

var _dynamicHashmap = _interopRequireDefault(require("./dynamic-hashmap"));

var _tree = _interopRequireDefault(require("../../tree"));

var _search = _interopRequireDefault(require("../../input/search"));

var _default = _interopRequireDefault(require("../__examples__/default"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */

/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */
// View the generated hash map
// console.log(JSON.stringify(sampleNodesDynamicHashMap.base));
// console.log(JSON.stringify(sampleNodesDynamicHashMap.initialExpandedSelected));
// console.log(JSON.stringify(sampleNodesDynamicHashMap.large));
(0, _react2.storiesOf)(_constants.TREE, module).addDecorator(function (getStory) {
  return _react.default.createElement("div", {
    className: "slds-p-around_medium"
  }, getStory());
}).add('Base', function () {
  return _react.default.createElement(_default.default, {
    nodes: _dynamicHashmap.default.base,
    action: _addonActions.action
  });
}).add('Base with stencil', function () {
  return _react.default.createElement(_default.default, {
    action: _addonActions.action,
    loadingStencil: true
  });
}).add('Initial Expanded/Selected', function () {
  return _react.default.createElement(_default.default, {
    action: _addonActions.action,
    nodes: _dynamicHashmap.default.initialExpandedSelected
  });
}).add('No Branch Select', function () {
  return _react.default.createElement(_default.default, {
    action: _addonActions.action,
    noBranchSelection: true
  });
}).add('Multiple Selection', function () {
  return _react.default.createElement(_default.default, {
    action: _addonActions.action,
    multipleSelection: true
  });
}).add('Assistive Heading', function () {
  return _react.default.createElement(_default.default, {
    action: _addonActions.action,
    noHeading: true,
    assistiveText: {
      label: 'Miscellaneous Foods'
    }
  });
}).add('Overflow Hidden', function () {
  return _react.default.createElement(_default.default, {
    action: _addonActions.action,
    listStyle: {
      height: '300px',
      overflowY: 'auto'
    },
    nodes: _dynamicHashmap.default.large
  });
}).add('Large dataset (300+) NoTest', function () {
  return _react.default.createElement(_default.default, {
    action: _addonActions.action,
    nodes: _dynamicHashmap.default.large
  });
}).add('Highlighted Search', function () {
  return _react.default.createElement(_default.default, {
    action: _addonActions.action,
    searchable: true
  });
});