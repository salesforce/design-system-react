"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _radio = _interopRequireDefault(require("../../radio"));

var _componentHasMoved = _interopRequireDefault(require("../../../utilities/warning/component-has-moved"));

var _constants = require("../../../utilities/constants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */

/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */
// Alias
(0, _componentHasMoved.default)(_constants.RADIO, {
  oldFileLocation: 'components/forms/radio',
  newFileLocation: 'components/radio'
});
var _default = _radio.default;
exports.default = _default;