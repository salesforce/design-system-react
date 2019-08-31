"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _hasChildrenWithoutDisplayNameOf = _interopRequireDefault(require("../../utilities/warning/has-children-without-display-name-of"));

var _getComponentDoc = _interopRequireDefault(require("../../utilities/get-component-doc"));

var _constants = require("../../utilities/constants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */

/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

/* eslint-disable import/no-mutable-exports */
var checkProps = function checkProps() {};

if (process.env.NODE_ENV !== 'production') {
  checkProps = function checkProps(COMPONENT, props, jsonDoc) {
    var createDocUrl = (0, _getComponentDoc.default)(jsonDoc);
    (0, _hasChildrenWithoutDisplayNameOf.default)(COMPONENT, props.children, _constants.SETUP_ASSISTANT_STEP, createDocUrl());
  };
}

var _default = checkProps;
exports.default = _default;