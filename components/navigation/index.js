"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _verticalNavigation = require("../vertical-navigation");

var _verticalNavigation2 = _interopRequireDefault(_verticalNavigation);

var _componentHasMoved = require("../../utilities/warning/component-has-moved");

var _componentHasMoved2 = _interopRequireDefault(_componentHasMoved);

var _constants = require("../../utilities/constants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */

/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */
// Alias
(0, _componentHasMoved2.default)(_constants.VERTICAL_NAVIGATION, {
  oldFileLocation: 'components/navigation',
  newFileLocation: 'components/vertical-navigation'
});
exports.default = _verticalNavigation2.default;