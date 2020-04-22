"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _input = _interopRequireDefault(require("../../input"));

var _componentHasMoved = _interopRequireDefault(require("../../../utilities/warning/component-has-moved"));

var _constants = require("../../../utilities/constants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */

/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */
// Alias
(0, _componentHasMoved.default)(_constants.INPUT, {
  oldFileLocation: 'components/forms/input',
  newFileLocation: 'components/input'
});
var _default = _input.default;
exports.default = _default;