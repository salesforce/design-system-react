"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */

/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */
function isReactComponent(object) {
  return object.$$typeof && object.$$typeof.toString() === 'Symbol(react.element)' || object.type && typeof object.type === 'function';
}

exports.default = isReactComponent;