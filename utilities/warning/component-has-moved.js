"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _warning = require("warning");

var _warning2 = _interopRequireDefault(_warning);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */

/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

/* eslint-disable import/no-mutable-exports */
var hasMoved = function hasMoved() {};

if (process.env.NODE_ENV !== 'production') {
  var hasWarned = {};

  hasMoved = function hasMoved(control, _ref) {
    var oldFileLocation = _ref.oldFileLocation,
        newFileLocation = _ref.newFileLocation,
        comment = _ref.comment;
    var additionalComment = comment ? " ".concat(comment) : '';

    if (!hasWarned[control]) {
      /* eslint-disable max-len */
      (0, _warning2.default)(false, "[Design System React] ".concat(control, " file import path has changed. Old import path was `design-system-react/").concat(oldFileLocation, "`. New import path is `design-system-react/").concat(newFileLocation, "`.").concat(additionalComment));
      /* eslint-enable max-len */

      hasWarned[control] = true;
    }
  };
}

exports.default = hasMoved;