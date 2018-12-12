"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _componentIsDeprecated = require("../../../utilities/warning/component-is-deprecated");

var _componentIsDeprecated2 = _interopRequireDefault(_componentIsDeprecated);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */

/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

/* eslint-disable import/no-mutable-exports */

/* eslint-disable max-len */
var checkProps = function checkProps() {};

if (process.env.NODE_ENV !== 'production') {
  checkProps = function checkProps(COMPONENT) {
    (0, _componentIsDeprecated2.default)(COMPONENT, 'For a multiple input form, please use the pattern located at https://www.lightningdesignsystem.com/components/form-element/#Record-Detail that swaps out a read-only `Input` with a base `Input`. For a single input, please use a `Popover` paired with `<Button	category="utility" iconName="edit" variant="icon" />` as the trigger.');
  };
}

exports.default = checkProps;