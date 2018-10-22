"use strict";

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _createReactClass = require("create-react-class");

var _createReactClass2 = _interopRequireDefault(_createReactClass);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react3 = require("@storybook/react");

var _addonActions = require("@storybook/addon-actions");

var _normalizr = require("normalizr");

var _iconSettings = require("../../icon-settings");

var _iconSettings2 = _interopRequireDefault(_iconSettings);

var _constants = require("../../../utilities/constants");

var _dynamicHashmap = require("./dynamic-hashmap");

var _dynamicHashmap2 = _interopRequireDefault(_dynamicHashmap);

var _tree = require("../../tree");

var _tree2 = _interopRequireDefault(_tree);

var _search = require("../../input/search");

var _search2 = _interopRequireDefault(_search);

var _default = require("../__examples__/default");

var _default2 = _interopRequireDefault(_default);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */

/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */
// View the generated hash map
// console.log(JSON.stringify(sampleNodesDynamicHashMap.base));
// console.log(JSON.stringify(sampleNodesDynamicHashMap.initialExpandedSelected));
// console.log(JSON.stringify(sampleNodesDynamicHashMap.large));
(0, _react3.storiesOf)(_constants.TREE, module).addDecorator(function (getStory) {
  return _react2.default.createElement("div", {
    className: "slds-p-around--medium"
  }, getStory());
}).add('Base', function () {
  return _react2.default.createElement(_default2.default, {
    nodes: _dynamicHashmap2.default.base,
    action: _addonActions.action
  });
}).add('Base with stencil', function () {
  return _react2.default.createElement(_default2.default, {
    action: _addonActions.action,
    loadingStencil: true
  });
}).add('Initial Expanded/Selected', function () {
  return _react2.default.createElement(_default2.default, {
    action: _addonActions.action,
    nodes: _dynamicHashmap2.default.initialExpandedSelected
  });
}).add('No Branch Select', function () {
  return _react2.default.createElement(_default2.default, {
    action: _addonActions.action,
    multipleSelection: true,
    noBranchSelection: true
  });
}).add('Multiple Selection', function () {
  return _react2.default.createElement(_default2.default, {
    action: _addonActions.action,
    multipleSelection: true
  });
}).add('Assistive Heading', function () {
  return _react2.default.createElement(_default2.default, {
    action: _addonActions.action,
    noHeading: true,
    assistiveText: {
      label: 'Miscellaneous Foods'
    }
  });
}).add('Overflow Hidden', function () {
  return _react2.default.createElement(_default2.default, {
    action: _addonActions.action,
    listStyle: {
      height: '300px',
      overflowY: 'auto'
    },
    nodes: _dynamicHashmap2.default.large
  });
}).add('Large dataset (300+)', function () {
  return _react2.default.createElement(_default2.default, {
    action: _addonActions.action,
    nodes: _dynamicHashmap2.default.large
  });
}).add('Highlighted Search', function () {
  return _react2.default.createElement(_default2.default, {
    action: _addonActions.action,
    searchable: true
  });
});